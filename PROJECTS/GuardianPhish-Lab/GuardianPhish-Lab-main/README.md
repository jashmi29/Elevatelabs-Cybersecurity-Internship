# 🛡️ GuardianPhish Lab

**GuardianPhish Lab** is an open-source, ethical phishing simulation and cybersecurity awareness platform. It is designed to help organizations strengthen their "human firewall" through realistic training exercises that prioritize education over deception.

---

## 🚀 Overview

In a world where social engineering is the leading cause of data breaches, GuardianPhish Lab provides security teams with the tools to safely simulate phishing attacks. Our platform uses Generative AI to craft convincing (yet safe) scenarios and ensures every "phished" user is immediately redirected to an educational debrief.

## ✨ Key Features

- **🤖 AI-Powered Scenarios**: Leverage Google Gemini (via Genkit) to generate realistic email templates tailored to specific scenarios like password resets, fake invoices, or IT support requests.
- **📊 Real-time Analytics**: Visual dashboards powered by Recharts to track open rates, click-throughs, and successful simulations across your organization.
- **🎓 Educational Debriefing**: Ethical by design. Users who interact with simulation links are instantly guided to a learning center explaining the "red flags" they missed.
- **🔒 Safe Capture Technology**: Built to capture interaction patterns and metrics *without* ever storing sensitive information like real passwords.
- **👥 Target Management**: Organize your workforce into departments or risk groups to run targeted, relevant awareness campaigns.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI Engine**: [Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Fonts**: Space Grotesk (Headlines) & Inter (Body)

## 🚦 Getting Started

### Prerequisites

- Node.js 20+ 
- A Google AI (Gemini) API Key

### Installation

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**:
   Create a `.env` file and add your Google AI API Key:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```

## ⚖️ Ethical Guidelines

GuardianPhish Lab is intended for **authorized security training only**. 
- Always obtain explicit consent from your organization's leadership.
- Never use this platform for actual malicious intent.
- Ensure the simulation banner remains visible to distinguish training from reality.

---

*Built for a more secure digital world.*
