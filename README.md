# Supreme Steam booking project

The original visual design is preserved. The Google Calendar iframe was replaced
with the existing Readdy availability data so the app can capture the selected
date/time and send a proper booking confirmation.

## What the booking flow does

- Reads available dates and times from the existing Readdy calendar feed.
- Prevents a locally reserved slot from being selected twice.
- Sends separate confirmation emails to the client and organizer.
- Adds an ICS calendar invitation to both emails.
- Uses `sauravsarkar.developer@gmail.com` as the default organizer.
- Includes customer details, services, address, payment status, and price in the
  email and calendar event.
- Keeps SMTP credentials on the server; they are never bundled into the browser.

## Local setup

1. Configure `DATABASE_URL`, SMTP settings, and booking settings in
   `../../nestjs-boilerplate-prisma/.env`.
2. Apply the Prisma migrations from `../../nestjs-boilerplate-prisma`.
3. Start the NestJS backend separately:

```bash
cd ../../nestjs-boilerplate-prisma
npm run start:dev
```

4. In another terminal, start this frontend:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The frontend runs on port `3000` and securely proxies `/api` requests to the
separately running NestJS/Prisma backend on port `8787`.

Available dates load through `/api/timeslots`, which removes slots already
reserved in PostgreSQL before returning them to the scheduling screen.

## Production

Deploy the Vite `dist` directory as the frontend and run the sibling
`nestjs-boilerplate-prisma` app as a persistent Node service. Set
`VITE_BOOKING_API_URL` to the public `/api/bookings` URL before building.

Bookings are stored in the PostgreSQL database configured by the NestJS
backend's `DATABASE_URL`.

## Gmail security

Do not commit either project's private `.env` files. If a Gmail App Password
has been posted in chat or committed anywhere, revoke it and create a new one
before deployment.
