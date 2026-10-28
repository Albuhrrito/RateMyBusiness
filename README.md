# RateMyBusiness

Rate the hiring process at a company: how fast they replied, how the interviews went, and whether they ghosted you.

## Run it

You need [Node.js](https://nodejs.org) 20.9 or newer.

```bash
npm install
npm run setup
npm run dev
```

Open http://localhost:3000.

To write a review, sign in with **demo@ratemybusiness.test** and password **password123**, or create your own account.

## Commands

| Command            | What it does                                              |
| ------------------ | --------------------------------------------------------- |
| `npm run dev`      | Start the app at http://localhost:3000                    |
| `npm run setup`    | Create `.env`, build the local database, add sample data  |
| `npm run db:reset` | Wipe the database and add the sample data again           |
| `npm test`         | Run the tests                                             |
| `npm run build`    | Build for production (`npm start` runs it)                |

## Good to know

- The database is a single SQLite file (`prisma/dev.db`). No Docker or database server needed.
- The sample reviews are short summaries of interview experiences that candidates posted publicly. Each one links to its source, and its scores are estimated from what the candidate wrote.
- Google sign-in is optional: set `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` in `.env`.

Built with Next.js, Prisma, Auth.js, and Tailwind CSS. MIT licensed.
