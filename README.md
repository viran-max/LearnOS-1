# LearnOS

**A Full-Stack Developer Learning Operating System**

LearnOS is a structured, database-driven learning platform built for developers who want to learn AI-assisted development the right way — not through scattered YouTube tutorials and random blog posts, but through a single, organized space that combines story-driven lessons, a curated prompt library, and community-shared learning journeys.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Data Model](#data-model)
- [Admin Setup](#admin-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Roadmap](#roadmap)

---

## About

Aspiring developers today have access to more learning resources than ever, but no single place that ties them together. LearnOS solves this by giving learners:

- A **structured, chapter-and-lesson path** through AI fundamentals, instead of unstructured tutorials.
- A **categorized library of ready-to-use AI prompts** for everyday development tasks.
- A **community-driven Journeys section**, where learners can follow curated paths or submit their own — reviewed and approved by an admin before going public.

The platform has two sides: a **user-facing app** for learning and exploring, and a **protected admin panel** for managing all content — chapters, lessons, stories, prompts, categories, and journeys — without ever touching code.

---

## Features

### User-Facing

- **Authentication** — Email/password login with a persistent session (no repeated logins on return visits).
- **Dashboard** — Personalized overview: lesson completion stats, content counts, "what's new," and the user's own journey submissions with live approval status.
- **AI Hub** — Chapter → Lesson → Story structure. Each lesson has an auto-calculated read timer (based on content length) that gates completion, tracks per-user progress, and unlocks the next lesson once finished.
- **Prompt Vault** — Category-filterable library of prompts, each with best-for, when-to-use, and expected-output guidance, a one-click copy button, and an "Open in ChatGPT" shortcut that pre-fills the prompt.
- **Journeys** — Browse admin-curated and community-approved learning journeys, or submit your own for review.

### Admin-Facing

- **Admin Dashboard** — Content counts across every module, a pending-journey-approvals alert, quick-create shortcuts, and a recent-activity feed.
- **Full CRUD** — Create, edit, and delete Chapters, Lessons, Stories, Prompt Categories, Prompts, and Journeys.
- **Journey Moderation** — Approve or reject community-submitted journeys directly from the list, with a dedicated read-only view to review submissions before deciding.
- **Image Uploads** — Cloudinary-backed image uploads across every content form (chapters, lessons, stories, prompts, journeys).

### Technical

- **Route protection** — Separate guarded layouts for regular users (`ProtectedLayout`) and admins (`AdminLayout`), both driven by a persistent localStorage session.
- **Admin seeding** — The admin account is created directly in Firebase via a one-time script, never through the public sign-up form.
- **Relational, ID-based data model** — Related records reference each other by Firestore document ID (e.g., a Lesson stores its parent Chapter's ID) instead of duplicating data.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 (Vite) |
| Routing | React Router DOM |
| Styling | Bootstrap 5 (e-learning template base) |
| Backend / Auth | Firebase Authentication |
| Database | Cloud Firestore |
| Image Hosting | Cloudinary |
| Notifications | React Toastify, SweetAlert2 |
| Admin Seeding | firebase-admin (Node script) |

---


## Data Model

All data lives in Cloud Firestore as flat collections, linked by document ID rather than nested/duplicated data:

| Collection | Key Fields | Links To |
|---|---|---|
| `users` | fullName, email, userType (1=Admin, 2=User) | — |
| `chapters` | title, chapterNumber, description, status | — |
| `lessons` | heading, description, lessonOrder, status | `chapterId` → chapters |
| `stories` | title, content, storyOrder, status | `lessonId` → lessons |
| `promptCategories` | name, description, status | — |
| `prompts` | title, shortDescription, bestFor, whenToUse, expectedOutput, bestWayToUse, fullPromptText | `category` → promptCategories |
| `journeys` | journeyTitle, hookLine, journeyDescription, submittedBy, submittedByName, approvalStatus | `submittedBy` → users (when user-submitted) |
| `userProgress` | userId, chapterId, lessonId, completedAt | `userId`, `lessonId` |

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A Firebase project with **Authentication** (Email/Password) and **Cloud Firestore** enabled
- A Cloudinary account with an unsigned upload preset




> **Before pushing:** the supplied archive contained a `.git` history where the Firebase web API key appears in the initial commit. This prepared ZIP intentionally excludes `.git` and `node_modules`. If this project was already pushed to a remote, review the repository history and apply the Firebase API-key restrictions described above; rotate/restrict any actual credentials that were exposed. A browser Firebase API key is generally not a password, but it should be restricted and your Firestore rules must protect data.

## Environment Variables

1. Copy `.env.example` to `.env` in the project root.
2. Fill in the Firebase web app configuration from Firebase Console → Project settings.
3. Fill in the Cloudinary cloud name and upload preset from Cloudinary.
4. Never commit `.env`; it is ignored by `.gitignore`. Only commit `.env.example` with placeholders.

Start locally:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

### Security before deployment

- Firebase web configuration is visible to browsers and is not a private server credential. Secure Firestore with restrictive **Firestore Security Rules**, require authentication where appropriate, and enforce admin authorization in rules—not only in React route guards.
- The Cloudinary unsigned upload preset is also public in the browser. Restrict its allowed formats, file size, and upload options in Cloudinary. For stronger protection, use a trusted backend to generate signed uploads.
- Never place Firebase Admin service-account JSON, private keys, passwords, or server-only API tokens in `VITE_*` variables. Vite bundles `VITE_*` values into the client code.
- If any real secret has ever been committed or pushed, rotate/revoke it. Removing it from the latest file does not erase it from Git history.


## Admin Setup

The admin account is **never** created through the public Sign Up form. Instead:

=> In the Firebase Console, go to **Project Settings → Service Accounts → Generate New Private Key**.



This creates the admin directly in Firebase Authentication and Firestore with `userType: 1`, so it can log in and access `/admin` immediately.


## Roadmap

- [ ] Story audio support in the AI Hub
- [ ] Likes/comments on Journeys
- [ ] Notifications when a submitted Journey is approved/rejected
- [ ] Admin analytics on most-used prompts and most-completed lessons
- [ ] Additional AI Hub chapters and expanded Prompt Vault categories

---

## License

This project was built as part of an internship training program at O7 Services.
