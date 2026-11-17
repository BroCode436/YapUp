# YapUp

A college community application with a private campus space and a separate global space for verified members.

## Working features
- College directory and college-account email matching
- Optional college-email OTP through Resend
- Campus/global feeds, image posts, likes, comments and reports
- Meetups with atomic capacity-limited RSVP and host cancellation
- Clubs, memberships, private club channels, and campus/global chat
- Profiles, people directory and comment notifications
- D1 records, R2 image storage, server-side campus and author authorization

## Authentication
Sites provides sign-in and authenticated identity headers. An existing college-email account can join its matching college directly. The alternative OTP flow requires `RESEND_API_KEY` and `EMAIL_FROM` in Sites runtime secrets. No OTP is sent or simulated when those are missing. College catalog is in `worker/community-api.js`.

## Development
`npm ci`
`node scripts/test-community.mjs`
`npm run build`
`node scripts/preview.mjs`

Preview binds only to 127.0.0.1:4173 and uses disposable in-memory sample users and records. The preview identity adapter is not included in the hosted Worker. Production does not contain sample posts or members.

## Storage and deployment
The tracked `.openai/hosting.json` declares D1 `DB` and R2 `BUCKET`. Drizzle-generated SQL is in `drizzle/`. Append future migrations; do not edit applied migrations. The build embeds Vite assets and backend code in `dist/server/index.js`. Publish through the Sites source/package workflow.

## Current boundaries
- Chat polls every 4 seconds; it is not WebSocket-based.
- Feed/event/club lists show up to 100 entries; messages show the latest 100; directory shows up to 200 people.
- Reports are stored for operator review; no automated moderation or review console yet.
- College email possession does not prove current enrollment or exclude alumni/faculty.
- No direct messages, video calls, or push notifications are included.
- Original Krash R2 data is retained, but is not assigned to a verified college and is not exposed in YapUp feeds.
