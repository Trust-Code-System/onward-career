# Landing-page review

Date: 8 October 2026.

**Verdict: READY for design review.** This verdict covers the authorised landing-page concept, not a live service launch.

## Verification

- Production build: `npm run build` passes with strict TypeScript.
- Measured Chrome viewport widths: 375, 768, and 1440px. No horizontal document overflow.
- Desktop hero, services, complete page, and mobile hero, packages, and intake dialog visually inspected. Screenshots saved in `artifacts/`.
- Mobile menu opens, closes, and navigates to page sections.
- CV comparison responds to mouse activation and arrow-key tab navigation; selected state and content agree.
- FAQs expand with correct `aria-expanded`, labelled regions, and readable answers.
- Package CTA preselects the corresponding package in the intake preview.
- Intake preview validates missing choices, accepts sample day/time selections, and shows an explicitly non-booked summary.
- Dialog supports Escape, focus return, background scroll locking, and restoration of the prior scroll position.
- Reduced-motion emulation: section content remains visible, hero animation resolves to `none`, and smooth scrolling is disabled.
- Contrast sampling of primary page copy, actions, labels, and footer text: no sampled text below 4.5:1 after refinement. This is not a complete WCAG certification.
- Final fresh-page console: no application-origin errors.
- Fonts reduced from six TTF files to three local WOFF2 files totalling approximately 68KB. Photography is local and below-the-fold images use lazy loading.

## Finish bar

1. Hierarchy: the hero headline dominates; CTA, collage, and supporting copy follow.
2. Type: upright Manrope with Instrument Serif emphasis. Labels, body, headings, and illustrative documents have distinct roles. Tabular numerals authored.
3. Surfaces: canvas, raised cards, dialog overlay, and dark process section are intentionally authored. A user-selectable dark theme is outside the brief.
4. Rhythm: shared spacing scale; section distance exceeds component spacing. Collage rotations and offsets are deliberate optical adjustments.
5. Icons: one Lucide family plus a brand-owned stair mark and illustration.
6. States: menu, tabs, accordion, package selection, slot selection, validation error, preview summary, dismissal. Remote loading/offline/conflict states are not applicable to this static concept.
7. Motion: staggered hero, once-only section reveals, press feedback, and short control transitions. Reduced-motion verified.
8. Voice: warm and concrete; one main conversion label. No fake outcomes, endorsements, prices, or booking confirmations.
9. Details: radius varies by role; layered floating shadows; no unintended horizontal overflow at tested widths.
10. Formatting: sample dates and times include year and West Africa Time (UTC+1). No unspecified currency or fabricated pricing.

## Detector and review notes

`ui-craft-detect` reported zero errors, with typography warnings. Its static count combines miniature CV artwork, viewport-specific sizes, and page typography. Its largest-size check omits the fluid `clamp()` hero size. These warnings are recorded rather than treated as evidence of a broken rendered hierarchy.

Visual refinement used the browser renderer (tier 3). The main improvements were hero fold spacing, mobile dialog scroll locking, and label contrast/readability. Final critical findings: none in the authorised scope. Confidence: full for the Chrome rendering inspected; other browsers and physical devices are not verified.

## Launch requirements remain separate

Confirm real brand, package scopes and prices, currency, customer market, contracts/policies, verified business details, real booking/payment providers, content and consent for supplied testimonials, portal requirements, and maintenance. The current intake interaction makes no external request and collects no personal information.

Resolved pipeline: brief, tokens, shape/spec, build, visual refinement, and verification. Design decisions remain in `.better-web-ui.md` and `.ui-craft/` for later pages.
