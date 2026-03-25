# **App Name**: GuardianPhish Lab

## Core Features:

- Admin Authentication & Campaign Management: Secure administrative login and a dashboard for creating, managing, and overseeing phishing simulation campaigns and user roles in a controlled, ethical environment. Includes consent mechanisms and 'Simulation Only' banners.
- AI-Assisted Email Template Design: Utilize AI as a tool to suggest and generate content for customizable, realistic phishing email templates based on chosen scenarios. All AI-generated content requires administrator review and approval before use.
- Target User & Campaign Group Management: Allow administrators to upload and manage lists of test users (via CSV) for targeted training campaigns. Store and retrieve campaign group data securely using the SQLite database.
- Fake Landing Page Builder: Create and deploy simulated login pages for training. Ethically capture entered usernames/emails, timestamps, and optionally IP addresses without storing real passwords. Captured data is stored in the SQLite database.
- Campaign Execution & Interaction Tracking: Send simulated phishing emails using SMTP and track key user interactions including email opens (via tracking pixel), link clicks, and form submissions. All event data is stored in the SQLite database.
- Real-time Simulation Analytics Dashboard: Display a dashboard with real-time (or near real-time for MVP) visualizations of campaign performance metrics, including total emails sent, open rates, click rates, and submission rates, using data from the SQLite database.
- Educational Debriefing Module: Automatically redirect users who interact with a simulated phishing page to an educational module. This module explains phishing threats, detection methods, and cybersecurity best practices.

## Style Guidelines:

- Color scheme: Dark theme, suggesting professionalism and focus on security. Primary color: `#7A6ECC` (a deep, calm blue-violet) for authority and innovation. Background color: `#1C1924` (a very dark, subtle purple-gray) to enhance readability in low light and convey sophistication. Accent color: `#A1CCFF` (a clear, bright sky blue) for actionable elements and highlighting critical information, providing a refreshing contrast.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, tech-oriented, and scientific feel, suitable for titles and prominent text. Body font: 'Inter' (sans-serif) for high legibility, neutrality, and clean aesthetics in longer content and general interface text. Code font: 'Source Code Pro' (monospace sans-serif) for any displayed code snippets or technical data.
- Utilize sleek, modern line icons that align with cybersecurity themes (e.g., shields, locks, network graphs, magnifying glasses). Icons should be monochromatic or use the accent color for highlights, maintaining a clean and professional appearance.
- Layout should be clean, modular, and information-dense, especially on dashboards. Employ card-based designs for organizing different campaign metrics and settings, promoting clarity and ease of navigation. Maintain ample negative space to reduce visual clutter, especially on the dark background.
- Subtle and functional animations for UI feedback, such as hover states, form submissions, and data loading transitions. Utilize smooth fades and quick, intentional movements to convey interactivity without distracting the user. Loading indicators for data-intensive sections (like analytics charts) should be elegant and minimalist.