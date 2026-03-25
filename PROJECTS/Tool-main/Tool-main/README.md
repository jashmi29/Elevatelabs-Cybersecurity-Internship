# 🛡️ InSight Hidden
### Advanced Digital Steganography & AI Deniability Suite

InSight Hidden is a high-fidelity digital steganography tool designed for secure communication through image carriers. It leverages pixel-level **Least Significant Bit (LSB)** manipulation to embed sensitive data within standard images without visible degradation.

---

## 🚀 Key Features

*   **LSB Encoding Engine:** Advanced bit-replacement algorithm optimized for PNG and BMP formats to ensure 100% visual integrity.
*   **Contextual AI (Genkit):** Integrated LLM (Gemini 2.5 Flash) that rephrases sensitive secrets into innocuous public statements, providing a second layer of plausible deniability.
*   **Zero-Retention Privacy:** All image processing occurs entirely in the client's browser memory. Your payload and carrier never touch persistent storage.
*   **High-Tech Interface:** A glassmorphism-inspired UI built with Next.js 15, Tailwind CSS, and Radix UI primitives.

## 🛠️ Technology Stack

*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
*   **AI Orchestration:** [Genkit](https://firebase.google.com/docs/genkit) (Google AI Plugin)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Steganography:** Custom Canvas-based LSB Bit Manipulation

## 📖 How It Works

### 1. The Shadow Layer (LSB)
Digital images consist of pixels with Red, Green, and Blue (RGB) values (0-255). InSight Hidden modifies the **Least Significant Bit** of these values. Because the change is only ±1, the human eye cannot detect the difference, but the data remains perfectly recoverable from the bitstream.

### 2. The Deniability Layer (AI)
Even if an adversary suspects steganography, they expect to find a "secret." Our AI tool rephrases your message into a mundane context (e.g., "Meet at the safe house" becomes "Remember to pick up the gravel for the garden").

## 🚦 Quick Start

### Development
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up your `.env` file with `GOOGLE_GENAI_API_KEY`.
4.  Run the development server:
    ```bash
    npm run dev
    ```

### Usage Protocol
1.  **Select a Carrier:** Upload a lossless PNG or BMP file.
2.  **Prepare Payload:** Enter your message. Use the **AI Contextualizer** for extra security.
3.  **Encode:** Generate the stego-image and download it.
4.  **Extract:** To reveal, upload the stego-image and switch to the **Reveal** tab.

## ⚠️ Security Note
To maintain data integrity, **never share stego-images via platforms that compress images** (like WhatsApp, Discord, or standard Social Media). Compression algorithms shuffle pixels and will destroy the hidden bitstream. Always send as a "File" or "Document" attachment.

---
*Built with precision for the digital shadows.*
