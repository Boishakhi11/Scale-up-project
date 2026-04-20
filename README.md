# Scale Up Project - Nettverkshuset Portfolios

A modern, fast, and responsive web application built to showcase candidate portfolios for Nettverkshuset. It allows candidates to log in, register their professional details (including dynamic photo uploads and experiences), and generates a stunning, shareable portfolio page.

## Features

- 🌐 **Full i18n Localization:** Seamlessly switch between Norwegian (NO) and English (EN) across the entire platform.
- 🎨 **Modern UI/UX:** Built with Tailwind CSS, utilizing vibrant gradients, glassmorphism, and smooth micro-animations.
- 🔐 **Authentication:** Secure Firebase Authentication integration featuring Google OAuth for candidates and a dedicated Admin login.
- 📸 **Instant Image Upload:** Candidates can upload profile pictures directly from their local device.
- ⚡ **Lightning Fast:** Built on top of Vite and React for instant hot module replacement (HMR) and highly optimized production builds.

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Vanilla)
- **Routing:** React Router v6
- **Auth & Backend:** Firebase Authentication
- **Language/Type-checking:** TypeScript

## Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

## Build for Production

```bash
npm run build
```
This command compiles the TypeScript files and builds the project for production, generating the highly optimized static files in the `dist/` directory.

## Deployment to Netlify

The application is configured to be easily deployed to Netlify:
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- Ensure you set up your Environment Variables in the Netlify dashboard under **Site Settings > Environment Variables**.

For Admin Login Use: admin@gmail.com / admin123
