# ThreatSense CTI Dashboard

This is aa Next.js application for a Cyber Threat Intelligence (CTI) Dashboard called ThreatSense. It provides a user interface to visualize and analyze threat intelligence data.

## Features

- **Threat Lookup:** Analyze IP addresses and domains in real-time.
- **Indicators of Compromise (IoC):** View a table of known threat indicators.
- **AI-Powered Insights:** Get AI-generated summaries, potential impact, and suggested next steps for IoCs.
- **Data Visualization:** Interactive charts to visualize threat trends, distribution, and top malicious indicators.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (using App Router)
- **UI:** [React](https://react.dev/), [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Generative AI:** [Google Genkit](https://firebase.google.com/docs/genkit)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  Clone the repository.
2.  Install the dependencies:

    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

### Running Genkit (for AI features)

The AI features are powered by Genkit. To run the Genkit development server (which allows you to inspect and debug flows), run:

```bash
npm run genkit:dev
```

This will start the Genkit development UI on [http://localhost:4000](http://localhost:4000).

## Project Structure

- `src/app/`: Contains the main application pages and layouts.
- `src/components/`: Contains the React components used throughout the application.
  - `src/components/dashboard/`: Dashboard-specific components.
  - `src/components/ui/`: Reusable UI components from shadcn/ui.
- `src/lib/`: Contains utility functions and data definitions.
- `src/ai/`: Contains the Genkit flows and AI-related logic.
- `public/`: Contains static assets.
- `tailwind.config.ts`: Tailwind CSS configuration.
- `next.config.js`: Next.js configuration.
