# Product Requirements Document: AI Pitch Writer

## 1. Overview
The AI Pitch Writer is a user-friendly web application designed to help entrepreneurs, students, and creators instantly generate compelling business pitches. By providing a few key details about their idea, users can leverage AI to produce structured, persuasive, and professional pitches, saving them time and boosting their confidence.

## 2. User Persona
- **Who is this for?** Early-stage startup founders, business students, and innovators who need to quickly create and refine pitches for presentations, competitions, or investor outreach. They are often short on time and may not be expert copywriters.

## 3. Core Features & User Stories

### Authentication
- **As a user, I want to sign up or log in with my email via a magic link so I don't have to manage another password.**
- **As a user, I want the app to remember me for a reasonable time so I don't have to log in every time I visit.**
- **As a logged-in user, I want a way to log out of the application.**

### Pitch Generation
- **As a user, I want to see a simple form where I can input my business idea, target audience, and key features.**
- **As a user, I want to click a "Generate Pitch" button to start the AI process.**
- **As a user, I want to see the generated pitch neatly formatted on a results screen.**
- **As a user, I want buttons to easily copy, save, or re-generate the pitch.**

### Pitch Management (Dashboard)
- **As a logged-in user, I want to see a dashboard with a list of all my previously saved pitches.**
- **As a user, I want to be able to click on a saved pitch to view its full content.**
- **As a user, I want the ability to delete old pitches I no longer need.**

## 4. Technology Stack
- **Framework:** Next.js
- **Styling:** Tailwind CSS v3, DaisyUI
- **Databases:** Supabase (for users & pitch metadata), MongoDB (for pitch content)
- **AI Logic:** n8n.io Workflow
- **Hosting:** Vercel