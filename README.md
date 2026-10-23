# Geerams Cleaning Services

Customer-first cleaning-products catalogue and order-request PWA for Geerams Cleaning Services, based in Kanye, Botswana.

## Customer flow
- Browse products and add quantities to a basket.
- Submit an order request with contact details and collection/delivery information.
- A Firebase guest session is created for the request. Customers can link Google sign-in to revisit order history and make repeat orders easier.
- Orders are not paid online and are not confirmed until Geerams verifies stock, fulfilment arrangements and payment details.

## Admin flow
Use the discreet **Admin access** link at the bottom of the site. Authorized staff can create, edit, hide/restore and remove products; review customer order requests and contact details; update statuses and internal notes; publish announcements; and manage product highlights/media. Media uploads use the existing UploadThing integration.

## Configuration
- Firebase project: `cleaning-c8a27`
- Set the public Firebase web-app variables in the deployment environment.
- The admin access route uses server-only `FIREBASE_ADMIN_KEY` and inherited `AFRICHIKO_ADMIN_WORD` configuration. Keep both server-side and out of Git.
- Configure `UPLOADTHING_TOKEN` server-side; never commit real credentials.
- Set `NEXT_PUBLIC_BASE_URL` to the actual production domain before deployment.

## Preserved foundation
The installation component `src/app/pwa-register.tsx` was not changed. Keep its installation lifecycle and behaviour protected. The Phaser mini-game mechanics are preserved; only visible copy/theme has been rebranded.

## Firestore
Existing collection names and data schemas remain in place to avoid a migration: `services` (product catalogue), `enquiries` (order requests), `admins` (staff roles), `announcements`, `workFeed` (product highlights), and `workInterests`. Admin-only writes remain protected by Firestore rules.

## QA checklist
1. Add/remove products and change quantities; refresh and verify the basket persists.
2. Submit a valid order and verify success appears only after Firestore confirms the write.
3. Link Google sign-in and verify only the signed-in customer's order history is visible.
4. As an authorized admin, add/edit/hide/restore a product and confirm the public catalogue updates.
5. Change an order status and save internal notes; confirm they persist.
6. Publish/unpublish announcements and product highlights; check media uploads.
7. Verify phone/WhatsApp links, mobile layout, offline messaging and the existing install prompt without changing installation code.
