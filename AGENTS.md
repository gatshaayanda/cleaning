# Facilities — Project Operating Contract

## Product and source of truth
This is a customer-first facilities management and maintenance PWA for Botswana, serving commercial properties, office complexes, schools, retail sites and hospitality facilities. The product owner is the final reviewer. The actual repository, this file and project documentation are the source of truth. Do not carry business identity, contacts or data over from the source foundation.

## Customer journey
1. Browse available service categories: commercial cleaning, planned maintenance, repairs and call-outs, and facilities support.
2. Select relevant services or start a maintenance request directly.
3. Submit contact details, property/site location, issue, affected area, access requirements, optional notes and supporting media.
4. Confirm success only after the configured data write succeeds. Preserve form details and report failure truthfully if it does not.
5. Allow optional Google sign-in for revisiting requests; do not force account creation before submission.

A request is not a confirmed visit, work order, schedule or service estimate. The facilities team reviews details before agreeing next steps.

## Existing functionality and data safety
- Preserve the current Firebase Authentication, Firestore collections, customer request journey, Google account linking, admin authorization, service CRUD, announcements, published service feed, interest signals and follow-up notes unless explicitly authorized to change them.
- Do not claim an operational scheduling, technician dispatch, inspection or work-order workflow exists unless implemented and verified.
- Do not open Firestore access to work around permission errors. Keep admin-only operations authorized and secrets server-side.
- Use UploadThing through the existing integration for media uploads. Do not add Firebase Storage rules or migrate storage without explicit authorization.
- The existing admin access code still reads the server-only `AFRICHIKO_ADMIN_WORD` environment variable. Keep it server-side; do not expose it through `NEXT_PUBLIC_*`. Rename only with an explicitly coordinated code/config change.

## PWA installation — protected
The inherited Africhiko installation mechanism is locked. Do not redesign, rewrite, refactor, replace, remove or change the `beforeinstallprompt` lifecycle, event listeners, state, install button action, dismissible card, responsive positioning, embedded-browser behaviour or service-worker behaviour. For unrelated edits, preserve those mechanics exactly. Branding text, palette, app identity, icon artwork and cache namespace may change without changing behaviour. On iOS, installation instructions must accurately describe Safari Share → Add to Home Screen.

## Chatbot — protected
Preserve the inherited chatbot implementation and behaviour. Change only its branding, wording and genuinely project-specific content unless the product owner explicitly authorizes a functional change.

## Identity and integrations
Use Facilities branding and the dedicated Firebase project `cleaning-c8a27` in app-facing metadata, docs, environment examples and Firebase CLI configuration. Do not reuse source business contacts, credentials or data. Keep real tokens and service-account JSON out of Git.

## Verification and delivery
- Preserve working functionality and keep edits focused.
- Run `npx tsc --noEmit`, `npm run lint` and `npm run build` when the environment permits; report only checks actually run.
- A GitHub push or successful build does not prove production deployment health.
- Never force-push or rewrite history.
- Checkpoint with repository, branch, commit, changed files, verification, required configuration, exact QA steps and deployment status.
