# Facilities

A customer-first facilities management and maintenance PWA for Botswana. It is intended for commercial properties, office complexes, schools, retail sites and hospitality facilities.

## Customer journey

1. Browse available services: commercial cleaning, planned maintenance, repairs and facilities support.
2. Select relevant services, or go straight to a maintenance request.
3. Share contact details, the property/site location, the issue, affected area, access requirements and optional supporting media.
4. Submit the request and receive confirmation only after the configured data write succeeds.
5. Optionally sign in with Google to keep requests associated with the same Firebase identity and revisit their status.

A submitted request is not a confirmed visit, work order or schedule. The facilities team reviews details and follows up before work is agreed.

## Admin journey

1. Open the discreet **Admin access** link in the footer.
2. Sign in through the existing server-verified access flow.
3. Review incoming requests and update their status, internal notes and follow-up date.
4. Manage available services, service announcements and published service updates from the dashboard.
5. Publish, hide or edit landing-page content; customer-facing content is shown only when active.

## Protected foundation

- Preserve the inherited PWA installation mechanism, event lifecycle, install button and dismissible card, embedded-browser behaviour, offline registration and service-worker behaviour. Only brand copy, colors and app identity may change without explicit authorization.
- Preserve the existing chatbot and its interaction.
- Keep the existing customer request, Google account and admin authorization behaviour intact during branding work.
- Use UploadThing for media where the existing integration is configured. Do not add Firebase Storage rules or migrate uploads without explicit authorization.
- Keep Firebase Admin credentials, UploadThing tokens and admin access words server-side and out of Git.

## Stack

- Next.js 15 / React 19 / TypeScript
- Firebase Authentication and Cloud Firestore
- UploadThing integration
- PWA service worker and install prompt
- Vercel Analytics and Speed Insights

## Development

```bash
npm install
npm run dev
```

Before release, run `npx tsc --noEmit`, `npm run lint` and `npm run build` where the environment permits. A GitHub push or successful build alone does not prove that the production deployment is healthy.
