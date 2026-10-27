# Finance Tracker

> **Archived course follow-along.** I built this personal finance tracker while following Piotr Jura's Nuxt 3 course on Udemy (August–September 2024, with one update in March 2025). Most of the structure and code come from the course. My own changes are listed below. The repo is not maintained.

## What was built

This is a single-page Nuxt 3 app. It uses Supabase for authentication, data and file storage.

- **Transactions.** You can add, edit and delete transactions of four types: Income, Expense, Saving and Investment. Each one has an amount, a date, an optional description and, for expenses only, a category: Food, Housing, Car or Entertainment. A Zod discriminated-union schema in `components/transaction-modal.vue` validates the form.
- **Dashboard.** Shows Income, Expense and Net Balance cards for the selected period (yearly, monthly or daily), each with a trend compared to the previous period, plus an all-time Total Net card. Below the cards, transactions are grouped by day with a summary for each day.
- **Auth.** Sign-in uses Google OAuth through Supabase Auth (`pages/login.vue`). Signed-out users are redirected to the login page.
- **Settings.** There are pages for profile (name and email), avatar upload to a Supabase Storage bucket named `avatars`, and the default transaction view, which is saved in the user's metadata.

My changes on top of the course project include:

- Google OAuth in place of the course's login flow
- An all-time "Total Net" card on the dashboard
- `en-IN` number formatting

## Stack

The versions below are the ones resolved from `yarn.lock`:

- Nuxt 3.12.4
- Vue 3.4.37
- @nuxt/ui 2.18.4 (Tailwind-based components)
- @nuxtjs/supabase 1.3.5
- Zod 3, date-fns 3

The app is written in JavaScript; only the config files use TypeScript. It has no server routes, so every Supabase call runs from the browser and depends on the project's row-level security policies.

## How to run

**Prerequisites:**

- Node.js. The build was checked with Node 24.18.0.
- Yarn 1.x. The lockfile is a Yarn lockfile, and `package.json` pins `yarn@1.22.22` through `packageManager`.
- A Supabase project with:
  - a `transactions` table with the columns `id`, `created_at`, `amount`, `type`, `description` and `category`;
  - a Storage bucket named `avatars`;
  - Google configured as an auth provider;
  - row-level security policies that limit each user to their own rows.

  None of the SQL or policies are in this repo.

```bash
git clone https://github.com/HariVenkataKrishnaKotha/Finance-Tracker.git
cd Finance-Tracker
yarn install --frozen-lockfile
```

Create a `.env` file in the repo root. It is already ignored by `.gitignore`.

```bash
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_KEY=<your-anon-key>
```

```bash
yarn dev      # http://localhost:3000
yarn build    # production build into .output/
yarn preview  # serve the production build
```

`npm ci` does not work here because the repo has no `package-lock.json`. Use Yarn.

**Verification (2026-10-27, fresh clone, Node 24.18.0, Yarn 1.22.22):**

- `npm ci --ignore-scripts` failed with `EUSAGE`, as expected, because there is no `package-lock.json`.
- `yarn install --frozen-lockfile --ignore-scripts` passed.
- `yarn build` passed with no Supabase credentials set. Nuxt only warned "Missing supabase url" and "Missing supabase anon key".
- Running the app against Supabase *(not verified: needs a Supabase project and credentials)*.

## Known issues

These were found during a 2026 review and left as-is because the repo is archived.

- Debug `console.log` calls are still in the code, including one that logs the full auth session object (`composables/useRedirectIfAuthenticated.js`, `pages/login.vue`).
- The login page detects sign-in with a `setTimeout` followed by `window.location.reload()` (`pages/login.vue`).
- Avatar uploads have no file-type or size check, and filenames come from `Math.random()` (`pages/settings/avatar.vue`).
- `"vue": "latest"` is not pinned. `@faker-js/faker` is listed as a runtime dependency, and the `seed` script points to a `seed.mjs` file that is not in the repo.
- There are no tests and no CI.
- The repo has no LICENSE file.

## Status

Archived. This was a course exercise and is kept for reference only.
