This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure (`src/` folder)

### Pages (App Routes)
- **src/app/page.jsx**  
  Home page; fetches and displays upcoming events in a grid.

- **src/app/events/page.jsx**  
  `/events` listing; shows all open events with cards linking to each detail.

- **src/app/events/[id]/page.jsx**  
  Event detail; displays full info, images, registration stats, and handles guest/member registration flows.

- **src/app/registrations/page.jsx**  
  Guest registration form; select event, view stats, and submit name/email/phone.

- **src/app/profile/page.jsx**  
  User profile; reads logged‑in user, fetches organized & registered events, and shows lists with links to edit or view.

- **src/app/profile/add-event/page.jsx**  
  Form to create a new event; uploads images and posts to `/api/profile/add-event`.

- **src/app/profile/edit-event/[id]/page.jsx**  
  Edit/delete an existing event; preloads event data, updates fields, and handles image uploads or deletion.

- **src/app/terms/page.jsx**  
  Terms & Conditions page; static content with navbar/footer.

### API Routes
- **src/app/api/events/route.js**  
  `GET /api/events`; returns all open events with counts and image URLs.

- **src/app/api/events/[id]/route.js**  
  `GET /api/events/:id`; returns detailed event info including member/guest counts and images.

- **src/app/api/registrations/route.js**  
  `POST /api/registrations`; handles guest signup.

- **src/app/api/registrations/member/route.js**  
  `POST /api/registrations/member`; handles member signup and prevents duplicates.

- **src/app/api/profile/[id]/route.js**  
  `GET /api/profile/:id`; returns organized and registered events for a user.

- **src/app/api/profile/edit-event/[id]/route.js**  
  `GET, PUT, DELETE /api/profile/edit-event/:id`; fetch, update fields & images, or delete an event.

### Utilities
- **src/utils/db.js**  
  Exports `mysqlPool` for database connections.
