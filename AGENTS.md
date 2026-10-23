# Geerams Cleaning Services — Project Operating Contract

## Product and source of truth
This is a customer-first cleaning-products and bulk hygiene supply PWA for Geerams Cleaning Services, P.O. Box M960, Kanye, Botswana. The product owner is the final reviewer. The actual repository, this file and project documentation are the source of truth. Do not carry source-business identity, contacts or data into this project.

## Customer journey
1. Browse the product catalogue (initial featured products: Dishwashing Liquid Essential 5L — P65; Multi-Purpose Cleaner 5L — P70; Premium Pine Gel 5L — P125; Liquid Bleach 5L — P50).
2. Add products and quantities to the basket.
3. Submit customer contact details, collection/delivery location, order notes and optional supporting media.
4. A Firebase guest session is created for the request; customers can link Google sign-in to revisit their own order history and make repeat orders easier.
5. Confirm success only after the configured Firestore write succeeds. An order request is not confirmed stock, delivery/collection, or payment.

## Existing functionality and data safety
- Preserve current Firebase Authentication, Firestore collections, customer order-request journey, Google account linking, admin authorization, product CRUD, announcements, product-highlight media, interest signals and follow-up notes unless explicitly authorized to change them.
- The current database schema uses services for product catalogue items and enquiries for customer order requests. Keep these collection names and schemas unless a deliberate migration is approved.
- Use UploadThing through the existing integration for media uploads. Do not add Firebase Storage rules or migrate storage.
- Do not open Firestore access to work around permission errors. Admin-only operations must remain authorized and secrets server-side.
- The existing server-side admin access route reads AFRICHIKO_ADMIN_WORD and FIREBASE_ADMIN_KEY; keep these server-only. Do not assume ADMIN_PASSWORD is read by the current route unless code/config is explicitly coordinated.
- The site lists Orange Money and FNB details for reference, but does not process payments. Do not claim payment, live stock, delivery or collection is confirmed.

## PWA installation — protected
The inherited installation mechanism in src/app/pwa-register.tsx is locked. Do not redesign, rewrite, refactor, replace, remove or change the beforeinstallprompt lifecycle, event listeners, state, install button action, dismissible card, responsive positioning, embedded-browser behaviour or service-worker behaviour. For unrelated edits, leave the installation implementation untouched. Branding text, palette and icon artwork may change only when that does not alter the installation mechanism.

## Chatbot — protected
Preserve the inherited chatbot implementation and behaviour if present. Change only its branding, wording and genuinely project-specific content unless the product owner explicitly authorizes a functional change.

## Identity and integrations
- Brand: Geerams Cleaning Services.
- Location: P.O. Box M960, Kanye, Botswana.
- WhatsApp: +267 78 805 187; call: +267 72 367 711; alternative: +267 548 0031.
- Firebase project: cleaning-c8a27.
- Brand colours: royal blue #1A3B8B, deep blue #1E2A5E, cyan #00A3E0, white.
- Keep UploadThing and Firebase Admin credentials out of Git.

## Verification and delivery
- Keep edits focused and preserve working features.
- Run npx tsc --noEmit, npm run lint and npm run build when a local environment is available; report only checks actually run.
- A GitHub push or successful build does not prove production deployment health.
- Never force-push or rewrite history.
- Checkpoint with repository, branch, commit, changed files, verification, required configuration, exact QA steps and deployment status.
