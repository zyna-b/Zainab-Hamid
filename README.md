
# Zainab Hamid Portfolio

A secure, self-hosted admin dashboard for managing portfolio content, AI experiments, services, blogs, and site copy. The project runs on Next.js 15 (App Router) with TypeScript, Tailwind CSS, and JSON-backed content storage so it can be deployed easily on Vercel or any Node-hosting provider.

## Getting started

1. **Install dependencies**
	```bash
	npm install
	```
2. **Copy the environment template**
	```bash
	cp .env.example .env.local
	```
3. **Generate admin credentials**
	```bash
	npm run admin:hash-password "your-strong-password"
	```
	Paste the generated `ADMIN_PASSWORD_HASH`, `ADMIN_PASSWORD_SALT`, and `ADMIN_PASSWORD_ITERATIONS` into `.env.local` along with the remaining variables.
4. **Start the development server**
	```bash
	npm run dev
	```

Visit `http://localhost:9002` (configured via `package.json`) to view the site, and `/admin/login` to access the dashboard.

## Production-grade admin security

- **Hashed credentials** – The admin password is never stored in plaintext. It is validated with PBKDF2 using a unique salt, configurable iterations, and timing-safe comparisons.
- **Session fingerprinting** – Admin sessions are bound to the client’s IP, user agent, and language fingerprint. Stolen tokens become useless on other devices.
- **Strict cookies** – Sessions are set through `httpOnly`, `sameSite="strict"` cookies with configurable lifetimes.
- **Rate limiting** – Login attempts are throttled with exponential lockouts to slow down brute-force attacks.
- **Edge middleware** – Every `/admin` route is protected server-side before rendering, while authenticated users are redirected away from the login page.
- **Security headers** – Global HTTP response headers enforce HSTS, X-Frame-Options, Permissions-Policy, and more by default.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `ADMIN_EMAIL` | ✅ | The email address allowed to access the admin dashboard. |
| `ADMIN_PASSWORD_HASH` | ✅ | Base64 PBKDF2 hash generated via `npm run admin:hash-password`. |
| `ADMIN_PASSWORD_SALT` | ✅ | Base64 salt paired with the hash. |
| `ADMIN_PASSWORD_ITERATIONS` | ✅ | Iterations used when deriving the hash (defaults to `210000`). |
| `ADMIN_SESSION_SECRET` | ✅ | Long random secret used to sign admin sessions. |
| `ADMIN_FINGERPRINT_SALT` | ➖ | Optional extra secret for session fingerprinting. |
| `ADMIN_SESSION_TTL_SECONDS` | ➖ | Session lifetime (default `28800`, i.e. 8 hours). |
| `ADMIN_LOGIN_MAX_ATTEMPTS` | ➖ | Failed attempts before lockout (default `5`). |
| `ADMIN_LOGIN_WINDOW_MINUTES` | ➖ | Time window for counting attempts (default `15`). |
| `ADMIN_LOGIN_BLOCK_MINUTES` | ➖ | Lockout duration once attempts exceeded (default `30`). |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Public site origin for social sharing URLs. |
| `EMAIL_TRANSPORT_SERVICE` | ✅ | Nodemailer service name (e.g. `gmail`). |
| `EMAIL_TRANSPORT_USER` | ✅ | SMTP username / email account. |
| `EMAIL_TRANSPORT_PASS` | ✅ | SMTP password or app-specific token. |
| `CONTACT_RECIPIENT_EMAIL` | ➖ | Override recipient for contact form submissions. Defaults to transport user. |
| `EMAIL_FROM_ADDRESS` | ➖ | Sender address used in auto-replies. Defaults to transport user. |
| `EMAIL_TRANSPORT_HOST` | ➖ | Optional SMTP host (set together with port/secure). |
| `EMAIL_TRANSPORT_PORT` | ➖ | Optional SMTP port (default `587`). |
| `EMAIL_TRANSPORT_SECURE` | ➖ | Set to `true` when using SMTPS/465. |

## Useful scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server on port 9002. |
| `npm run build` | Create a production build (used by Vercel). |
| `npm run start` | Serve the production build locally. |
| `npm run lint` | Run ESLint using the project configuration. |
| `npm run typecheck` | Execute TypeScript checks without emitting files. |
| `npm run admin:hash-password "password"` | Generate PBKDF2 hash + salt for admin login. |

## Deployment

### GitHub

1. Commit the application code (exclude `.env.local`).
2. Push to your GitHub repository.
3. Configure GitHub Actions/Checks to run `npm run lint` and `npm run typecheck` if desired.

### Vercel

1. Import the repository into Vercel.
2. In the Vercel dashboard, add the environment variables listed above under **Production** (and optionally **Preview**).
3. Trigger a deployment; Vercel will run `npm run build` automatically.
4. Once deployed, copy the live domain into `NEXT_PUBLIC_SITE_URL` for consistent link previews.

### Other hosts

Any Node-compatible host can run the project:

```bash
npm install
npm run build
npm run start
```

Make sure the environment variables mirror your `.env.local` configuration before starting the server.
