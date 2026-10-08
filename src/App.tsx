import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  Send,
  Video,
  Menu,
  X,
  CalendarDays,
  Clock3,
  MoveUpRight,
  CheckCheck,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";

const packages = [
  {
    name: "The fresh start",
    tag: "For a stronger first impression",
    description:
      "You know where you want to go. Let’s make your story stand out.",
    features: [
      "Personal career intake",
      "A thoughtfully rewritten CV",
      "Cover letter foundation",
      "LinkedIn profile recommendations",
    ],
    note: "CV & profile support",
    featured: false,
  },
  {
    name: "The search partner",
    tag: "For getting your time back",
    description:
      "A dedicated pair of hands for the part of job searching that takes over your life.",
    features: [
      "Everything in The fresh start",
      "A focused job-search strategy",
      "Applications handled for you",
      "Clear application progress updates",
    ],
    note: "Managed job-search support",
    featured: true,
  },
  {
    name: "The full picture",
    tag: "For support at every step",
    description:
      "From the first rewrite to walking into your interview with a plan.",
    features: [
      "Everything in The search partner",
      "Personal interview preparation",
      "Practice interviews & feedback",
      "Support with your next steps",
    ],
    note: "Complete career support",
    featured: false,
  },
];

const faqs = [
  {
    q: "Is Onward a job board?",
    a: "Onward is a personal job-search service. The service helps you tell your story through your CV, find suitable roles, manage applications, and prepare for interviews. You don’t have to scroll through another job board alone.",
  },
  {
    q: "Can you guarantee that I’ll get a job?",
    a: "No. Hiring decisions belong to employers, and no honest service can guarantee an offer. The work focuses on the parts we can support: a clearer CV, relevant applications, preparation, and consistent follow-through.",
  },
  {
    q: "How do you know which roles are right for me?",
    a: "The process begins with an intake conversation about your work history, target roles, preferences, and career goals. The search approach and service scope should be agreed with you before applications begin.",
  },
  {
    q: "Will I be able to see my application progress?",
    a: "Clear updates help you follow submitted applications, responses, and next steps. The progress view above is an example. How updates are shared should be agreed with you during your intake conversation.",
  },
  {
    q: "How much do the packages cost?",
    a: "The fees depend on the support and scope you choose. Your intro conversation is a chance to explore the options. The final deliverables, currency, and fees should be clearly agreed with you before you commit.",
  },
  {
    q: "What happens on the intro call?",
    a: "An intro call is a chance to talk about where you are now, what you’re aiming for, and what kind of support would be useful. The booking flow in this prototype is a preview; it does not schedule a real call.",
  },
];

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 26V16h10V6h14v20M14 26V16h14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CvPaper({
  miniature = false,
  after = true,
}: {
  miniature?: boolean;
  after?: boolean;
}) {
  return (
    <div
      className={`cv-paper ${miniature ? "cv-miniature" : ""} ${after ? "cv-after" : "cv-before"}`}
      aria-label={
        after ? "Illustrative rewritten CV" : "Illustrative original CV"
      }
    >
      <div className="cv-name">
        Alex Morgan<span>Product & operations professional</span>
      </div>
      <div className="cv-contact">
        Lagos, Nigeria <span>·</span> Available for new opportunities
      </div>
      <div className="cv-rule" />
      <span className="cv-section">
        {after ? "A clear professional story" : "Personal statement"}
      </span>
      <p>
        {miniature
          ? "A thoughtful operator who builds teams, improves processes, and delivers customer-focused projects."
          : after
            ? "Turning complex challenges into practical solutions. A thoughtful operator with experience building teams, improving processes, and delivering customer-focused projects."
            : "I am a hardworking and motivated professional looking for an opportunity to work in a good company and contribute my skills."}
      </p>
      <span className="cv-section">Experience</span>
      <div className="cv-role">
        Operations lead <span>2022–Present</span>
      </div>
      <p>
        {miniature
          ? "Built better workflows. Led cross-functional teams. Delivered customer-focused projects."
          : after
            ? "Led cross-functional projects, introduced repeatable workflows, and helped the team deliver a more consistent customer experience."
            : "Responsible for daily operations. Worked with different teams. Helped with projects and other duties as assigned."}
      </p>
      <div className="cv-lines">
        <i />
        <i />
        <i />
      </div>
      {!miniature && (
        <>
          <span className="cv-section">Core strengths</span>
          <div className="cv-skills">
            Project delivery <span>·</span> Team leadership <span>·</span>{" "}
            Process improvement
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvAfter, setCvAfter] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedPackage, setSelectedPackage] = useState("Help me choose");
  const [bookingStep, setBookingStep] = useState(1);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const scrollPosition = useRef(0);
  const dates = ["Mon, 12 Oct", "Tue, 13 Oct", "Wed, 14 Oct"];
  const times = ["10:00 AM", "12:30 PM", "3:00 PM"];

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  function openBooking(packageName = "Help me choose") {
    lastTrigger.current = document.activeElement as HTMLElement;
    setSelectedPackage(packageName);
    setBookingStep(1);
    setDay("");
    setTime("");
    setError("");
    setMenuOpen(false);
    scrollPosition.current = window.scrollY;
    document.body.classList.add("dialog-open");
    document.body.style.top = `-${scrollPosition.current}px`;
    dialog.current?.showModal();
  }
  function closeBooking() {
    dialog.current?.close();
  }
  function onDialogClose() {
    document.body.classList.remove("dialog-open");
    document.body.style.top = "";
    window.scrollTo({ top: scrollPosition.current, behavior: "instant" });
    lastTrigger.current?.focus({ preventScroll: true });
  }
  function continueBooking() {
    if (!day || !time) {
      setError("Choose a day and time to preview your call.");
      return;
    }
    setError("");
    setBookingStep(2);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header container">
        <a className="brand" href="#" aria-label="Onward home">
          <Mark />
          onward
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#services">What we do</a>
          <a href="#process">How it works</a>
          <a href="#packages">Our packages</a>
        </nav>
        <button
          className="button button-ink nav-cta"
          onClick={() => openBooking()}
        >
          Book an intro call <ArrowUpRight size={17} />
        </button>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <nav
            className="mobile-nav"
            id="mobile-nav"
            aria-label="Mobile navigation"
          >
            <a href="#services" onClick={() => setMenuOpen(false)}>
              What we do <ArrowUpRight />
            </a>
            <a href="#process" onClick={() => setMenuOpen(false)}>
              How it works <ArrowUpRight />
            </a>
            <a href="#packages" onClick={() => setMenuOpen(false)}>
              Our packages <ArrowUpRight />
            </a>
            <button
              className="button button-blue"
              onClick={() => openBooking()}
            >
              Book an intro call <ArrowUpRight size={18} />
            </button>
          </nav>
        )}
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-heading">
          <div className="hero-intro">
            <div className="eyebrow hero-enter">
              <svg
                className="little-star"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 1v18M1 10h18M3.6 3.6l12.8 12.8M3.6 16.4L16.4 3.6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>{" "}
              BIG AMBITIONS. A LITTLE BACKUP.
            </div>
            <h1 id="hero-heading" className="hero-enter">
              Your next <em>chapter.</em>
              <br />
              We’re on it<span className="blue-period">.</span>
            </h1>
            <p className="hero-description hero-enter">
              The CV. The applications. The interview prep.
              <br />A real team in your corner, so you can move forward.
            </p>
            <div className="hero-actions hero-enter">
              <button
                className="button button-blue"
                onClick={() => openBooking()}
              >
                Book an intro call <ArrowUpRight size={19} />
              </button>
              <a className="text-link" href="#services">
                Meet your backup <ArrowRight size={17} />
              </a>
            </div>
          </div>

          <div
            className="career-collage"
            aria-label="A little backup for every part of your job search"
          >
            <div className="collage-cv collage-enter">
              <div className="paper-label">
                <FileText size={15} /> A story worth telling.
              </div>
              <div className="hero-paper-wrapper">
                <CvPaper miniature />
                <span className="cv-approved">
                  <CheckCheck size={17} /> Ready for your next move
                </span>
              </div>
              <div className="collage-caption">
                Your experience. <em>Better expressed.</em>
              </div>
            </div>
            <div className="hero-photo collage-enter">
              <img
                src="/images/team.jpg"
                alt="Professionals enjoying a relaxed conversation around a laptop in a bright workspace"
                fetchPriority="high"
                width="1400"
                height="933"
              />
              <div className="photo-label">
                <span className="status-dot" /> Real people. On your side.
              </div>
              <div className="photo-caption">
                You do <em>you.</em>
                <br />
                We’ll do the groundwork.
              </div>
              <div className="application-note">
                <span className="note-icon">
                  <Check size={19} />
                </span>
                <div>
                  <strong>Another step forward.</strong>
                  <span>Application sent. You’re in the loop.</span>
                </div>
                <ArrowUpRight size={17} />
              </div>
            </div>
            <div className="collage-support collage-enter">
              <div className="support-top">
                <span>
                  THE NEXT CHAPTER
                  <br />
                  LOOKS GOOD ON YOU.
                </span>
                <ArrowUpRight size={23} />
              </div>
              <div className="support-art" aria-hidden="true">
                <div className="stair s1" />
                <div className="stair s2" />
                <div className="stair s3" />
                <MoveUpRight className="stairs-arrow" strokeWidth={1.5} />
              </div>
              <div className="support-bottom">
                A little less searching.
                <br />
                <em>A lot more living.</em>
              </div>
            </div>
          </div>
          <p className="illustration-note">
            A glimpse of the Onward experience. CV and application details are
            illustrative.
          </p>
        </section>

        <div className="scope-strip">
          <div className="container">
            <span>Your career deserves a little more care.</span>
            <div>
              <span>
                <FileText size={16} /> CVs with a point of view
              </span>
              <i />
              <span>
                <Send size={16} /> Thoughtful applications
              </span>
              <i />
              <span>
                <Video size={17} /> Confident conversations
              </span>
            </div>
          </div>
        </div>

        <section id="services" className="services container section-space">
          <div className="section-heading reveal">
            <h2>
              You bring the ambition.
              <br />
              We bring the <em>backup.</em>
            </h2>
            <p>
              Job searching can feel like a full-time job.
              <br />
              You don’t have to do every part of it alone.
            </p>
          </div>
          <div className="service-grid">
            <article className="cv-service reveal">
              <div className="service-card-heading">
                <span className="service-number">YOUR STORY</span>
                <ArrowUpRight size={24} />
              </div>
              <div className="cv-demo">
                <div
                  className="cv-tab-list"
                  role="tablist"
                  aria-label="CV comparison"
                  onKeyDown={(event) => {
                    if (
                      ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                        event.key,
                      )
                    ) {
                      event.preventDefault();
                      const next =
                        event.key === "Home"
                          ? false
                          : event.key === "End"
                            ? true
                            : !cvAfter;
                      setCvAfter(next);
                      event.currentTarget
                        .querySelector<HTMLButtonElement>(
                          next ? "#cv-after-tab" : "#cv-before-tab",
                        )
                        ?.focus();
                    }
                  }}
                >
                  <button
                    id="cv-before-tab"
                    role="tab"
                    aria-selected={!cvAfter}
                    tabIndex={cvAfter ? -1 : 0}
                    aria-controls="cv-panel"
                    onClick={() => setCvAfter(false)}
                  >
                    Before Onward
                  </button>
                  <button
                    id="cv-after-tab"
                    role="tab"
                    aria-selected={cvAfter}
                    tabIndex={cvAfter ? 0 : -1}
                    aria-controls="cv-panel"
                    onClick={() => setCvAfter(true)}
                  >
                    With Onward <Mark className="tiny-star" />
                  </button>
                </div>
                <div
                  role="tabpanel"
                  id="cv-panel"
                  aria-labelledby={cvAfter ? "cv-after-tab" : "cv-before-tab"}
                  tabIndex={0}
                >
                  <CvPaper after={cvAfter} />
                </div>
                <div className="editor-note">
                  <span>
                    <Check size={14} />{" "}
                    {cvAfter
                      ? "A clearer story. A stronger first impression."
                      : "Sound familiar? There’s a better way to tell it."}
                  </span>
                  <span>Sample CV</span>
                </div>
              </div>
              <div className="service-copy">
                <h3>
                  A CV that sounds like <em>you.</em>
                </h3>
                <p>
                  Not just a prettier document. We find the story in your
                  experience and turn it into a clear, compelling CV.
                </p>
              </div>
            </article>
            <article className="interview-service reveal">
              <div className="interview-photo">
                <img
                  src="/images/coach.jpg"
                  alt="A professional working confidently at her laptop"
                  loading="lazy"
                  width="900"
                  height="1125"
                />
                <div className="interview-sticker">
                  <Video size={18} />
                  <span>
                    Let’s practise your
                    <br />
                    <strong>next big conversation.</strong>
                  </span>
                </div>
              </div>
              <div className="service-copy">
                <span className="service-number">YOUR CONFIDENCE</span>
                <h3>
                  Walk in <em>ready.</em>
                </h3>
                <p>
                  Personal interview prep, honest feedback, and a chance to
                  practise before it really counts.
                </p>
              </div>
            </article>
            <article className="application-service reveal">
              <div>
                <span className="service-number">YOUR SEARCH</span>
                <h3>
                  Less busywork.
                  <br />
                  <em>More possibility.</em>
                </h3>
                <p>
                  We find relevant roles and handle the applications, with your
                  goals guiding every move.
                </p>
              </div>
              <div className="application-art" aria-hidden="true">
                <div className="envelope">
                  <Send size={32} strokeWidth={1.5} />
                </div>
                <div className="application-pill">
                  <Check size={14} /> Tailored. Checked. Sent.
                </div>
                <svg viewBox="0 0 240 160">
                  <path
                    d="M10 145 C20 10 150 170 220 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    fill="none"
                  />
                </svg>
              </div>
            </article>
          </div>
        </section>

        <section id="process" className="process-section">
          <div className="container">
            <div className="process-heading reveal">
              <span className="eyebrow">A PERSONAL PROCESS</span>
              <h2>
                A big move.
                <br />
                <em>Three small steps.</em>
              </h2>
              <p>
                Less figuring it all out.
                <br />
                More knowing what comes next.
              </p>
            </div>
            <div className="process-steps reveal">
              <article>
                <div className="step-top">
                  <span>01</span>
                  <Video size={23} />
                </div>
                <h3>First, we listen.</h3>
                <p>
                  A video call about you, your experience, and where you want to
                  go. No one-size-fits-all playbook.
                </p>
                <span className="step-tag">Your intake conversation</span>
              </article>
              <article>
                <div className="step-top">
                  <span>02</span>
                  <FileText size={23} />
                </div>
                <h3>Then, we make a plan.</h3>
                <p>
                  We agree the scope, put it in writing, and get your CV and
                  search strategy ready for the road ahead.
                </p>
                <span className="step-tag">Your personal game plan</span>
              </article>
              <article>
                <div className="step-top">
                  <span>03</span>
                  <ArrowUpRight size={25} />
                </div>
                <h3>And we get moving.</h3>
                <p>
                  Thoughtful applications. Clear updates. Interview practice. A
                  partner who stays with the process.
                </p>
                <span className="step-tag">Your next chapter, in motion</span>
              </article>
            </div>
            <div className="process-footer">
              <ShieldCheck size={17} />
              <p>
                Clear scope. Agreed fees. No promises of a job offer. Just a
                commitment to doing the work well.
              </p>
            </div>
          </div>
        </section>

        <section className="visibility-section container section-space">
          <div className="visibility-copy reveal">
            <span className="eyebrow">IN YOUR CORNER. IN THE LOOP.</span>
            <h2>
              Hand over the work.
              <br />
              <em>Keep the visibility.</em>
            </h2>
            <p>
              You shouldn’t have to wonder what’s happening with your search.
              Every application, every update, every next step. Easy to follow.
            </p>
            <div className="visibility-points">
              <span>
                <Check size={17} /> Know where your CV is going
              </span>
              <span>
                <Check size={17} /> See what’s moving forward
              </span>
              <span>
                <Check size={17} /> Get ready for the next conversation
              </span>
            </div>
            <a className="text-link" href="#packages">
              Find your kind of support <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="tracker-wrap reveal">
            <div className="tracker">
              <div className="tracker-top">
                <div>
                  <span className="tracker-label">YOUR NEXT CHAPTER</span>
                  <h3>Good things in progress.</h3>
                </div>
                <Mark />
              </div>
              <div className="tracker-summary">
                <span>Application overview</span>
                <span className="demo-tag">Illustrative preview</span>
              </div>
              <div className="tracker-row">
                <span className="company-icon company-1">N</span>
                <div>
                  <strong>Product operations lead</strong>
                  <span>Northstar Studio · Remote</span>
                </div>
                <span className="tracker-status status-interview">
                  Interview
                </span>
              </div>
              <div className="tracker-row">
                <span className="company-icon company-2">m.</span>
                <div>
                  <strong>Customer success manager</strong>
                  <span>Monday House · Hybrid</span>
                </div>
                <span className="tracker-status status-sent">
                  Applied <Check size={12} />
                </span>
              </div>
              <div className="tracker-row">
                <span className="company-icon company-3">
                  <Plus size={18} />
                </span>
                <div>
                  <strong>Project coordinator</strong>
                  <span>Common Ground · On-site</span>
                </div>
                <span className="tracker-status status-sent">
                  Applied <Check size={12} />
                </span>
              </div>
              <div className="tracker-update">
                <span className="coach-avatar">
                  <img
                    src="/images/avatar.jpg"
                    alt=""
                    loading="lazy"
                    width="160"
                    height="160"
                  />
                </span>
                <p>
                  <strong>A little update from your corner.</strong>
                  <br />
                  Your interview prep is the next step.
                </p>
                <span className="update-dot" />
              </div>
            </div>
            <p className="tracker-footnote">
              Illustrative example. These application details are not live.
            </p>
          </div>
        </section>

        <section id="packages" className="packages-section section-space">
          <div className="container">
            <div className="packages-heading reveal">
              <h2>
                A little help.
                <br />
                Or the <em>whole picture.</em>
              </h2>
              <p>
                Pick the support that meets you where you are.
                <br />
                We’ll work out the details together.
              </p>
            </div>
            <div className="package-grid">
              {packages.map((pkg, index) => (
                <article
                  className={`package-card reveal ${pkg.featured ? "package-featured" : ""}`}
                  key={pkg.name}
                >
                  <div className="package-topline">
                    <span>0{index + 1}</span>
                    {pkg.featured && (
                      <span className="package-recommendation">
                        A LITTLE MORE BACKUP
                      </span>
                    )}
                    <ArrowUpRight size={21} />
                  </div>
                  <span className="package-tag">{pkg.tag}</span>
                  <h3>{pkg.name}</h3>
                  <p className="package-description">{pkg.description}</p>
                  <div className="package-scope">
                    {pkg.note}
                    <span>Personalised scope & quote</span>
                  </div>
                  <button
                    className={`button ${pkg.featured ? "button-blue" : "button-outline"}`}
                    onClick={() => openBooking(pkg.name)}
                  >
                    Book an intro call <ArrowUpRight size={18} />
                  </button>
                  <div className="package-divider" />
                  <span className="included-label">
                    THE SUPPORT, AT A GLANCE
                  </span>
                  <ul>
                    {pkg.features.map((feature) => (
                      <li key={feature}>
                        <Check size={15} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="package-note">
              <span>
                Not sure what you need? That’s what the first conversation is
                for.
              </span>
              <button onClick={() => openBooking()} className="text-link">
                Let’s figure it out <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="faq-section container section-space">
          <div className="faq-intro reveal">
            <h2>
              A few things
              <br />
              you might be <em>wondering.</em>
            </h2>
            <p>
              A new chapter comes with questions.
              <br />
              Here are a few good places to start.
            </p>
          </div>
          <div className="faq-list reveal">
            {faqs.map((faq, index) => (
              <article
                className={`faq-item ${activeFaq === index ? "faq-open" : ""}`}
                key={faq.q}
              >
                <h3>
                  <button
                    id={`faq-trigger-${index}`}
                    aria-expanded={activeFaq === index}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? null : index)
                    }
                  >
                    {faq.q}
                    {activeFaq === index ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </button>
                </h3>
                <div
                  className="faq-answer"
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  hidden={activeFaq !== index}
                >
                  <p>{faq.a}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta container reveal">
          <div className="cta-orbit" aria-hidden="true">
            <Mark />
          </div>
          <span className="eyebrow">YOU DON’T HAVE TO DO IT ALONE.</span>
          <h2>
            The next chapter
            <br />
            has <em>your name on it.</em>
          </h2>
          <p>Let’s talk about where you want to go.</p>
          <button className="button button-white" onClick={() => openBooking()}>
            Book an intro call <ArrowUpRight size={19} />
          </button>
          <span className="cta-small">
            A conversation first. A plan that fits you.
          </span>
        </section>
      </main>

      <footer className="site-footer container">
        <div className="footer-main">
          <div>
            <a className="brand" href="#" aria-label="Onward home">
              <Mark />
              onward
            </a>
            <p>A little backup for your next big move.</p>
          </div>
          <div className="footer-links">
            <a href="#services">What we do</a>
            <a href="#process">How it works</a>
            <a href="#packages">Our packages</a>
            <button onClick={() => openBooking()}>
              Let’s talk <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Onward. A landing-page concept.</span>
          <span>Working brand · Illustrative content · Booking preview</span>
          <a href="#" className="back-top">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>

      <dialog
        ref={dialog}
        className="booking-dialog"
        aria-labelledby="booking-title"
        onClose={onDialogClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeBooking();
        }}
      >
        <div className="booking-content">
          <div className="booking-top">
            <span className="brand">
              <Mark />
              onward
            </span>
            <button
              className="close-dialog"
              aria-label="Close booking preview"
              autoFocus
              onClick={closeBooking}
            >
              <X size={21} />
            </button>
          </div>
          <div className="preview-banner">
            <span className="status-dot" /> Interactive preview. No real
            booking.
          </div>
          {bookingStep === 1 ? (
            <>
              <h2 id="booking-title">
                A little conversation.
                <br />
                <em>A good place to start.</em>
              </h2>
              <p className="booking-subtitle">
                Try the intake experience. Sample availability is shown below.
              </p>
              <label className="field-label" htmlFor="package-select">
                What kind of backup are you looking for?
              </label>
              <div className="select-wrap">
                <select
                  id="package-select"
                  value={selectedPackage}
                  onChange={(event) => setSelectedPackage(event.target.value)}
                >
                  <option>Help me choose</option>
                  {packages.map((pkg) => (
                    <option key={pkg.name}>{pkg.name}</option>
                  ))}
                </select>
                <ChevronDown size={17} />
              </div>
              <fieldset>
                <legend>
                  <CalendarDays size={17} /> Choose a sample day
                </legend>
                <div className="choice-grid">
                  {dates.map((date) => (
                    <button
                      key={date}
                      className={day === date ? "choice selected" : "choice"}
                      aria-pressed={day === date}
                      onClick={() => {
                        setDay(date);
                        setError("");
                      }}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <Clock3 size={17} /> Pick a time{" "}
                  <span>West Africa Time (UTC+1)</span>
                </legend>
                <div className="choice-grid">
                  {times.map((slot) => (
                    <button
                      key={slot}
                      className={time === slot ? "choice selected" : "choice"}
                      aria-pressed={time === slot}
                      onClick={() => {
                        setTime(slot);
                        setError("");
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </fieldset>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button
                className="button button-blue booking-next"
                onClick={continueBooking}
              >
                Preview my intro call <ArrowRight size={18} />
              </button>
              <p className="booking-privacy">
                No personal information, payment, or account needed.
              </p>
            </>
          ) : (
            <>
              <div className="booking-success-icon">
                <CheckCheck size={30} />
              </div>
              <h2 id="booking-title">
                That’s what your
                <br />
                <em>first step could look like.</em>
              </h2>
              <p className="booking-subtitle">
                This is a preview. No call has been booked.
              </p>
              <div className="booking-summary">
                <span>
                  Your kind of backup<strong>{selectedPackage}</strong>
                </span>
                <span>
                  Your sample conversation
                  <strong>
                    {day} 2026 · {time}
                  </strong>
                </span>
                <span>
                  Time zone<strong>West Africa Time (UTC+1)</strong>
                </span>
              </div>
              <p className="booking-integration-note">
                Booking is not available in this concept. No date or time has
                been reserved.
              </p>
              <button
                className="button button-blue booking-next"
                onClick={closeBooking}
              >
                Back to Onward <ArrowUpRight size={18} />
              </button>
              <button
                className="booking-back text-link"
                onClick={() => setBookingStep(1)}
              >
                Change my preview
              </button>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
