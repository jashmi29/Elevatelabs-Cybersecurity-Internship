CipherChat V2.0 🔒

**Military-Grade Secure Messaging Protocol** - A high-fidelity demonstration of end-to-end encryption (E2EE) using modern cryptographic standards and a split-screen tactical UI.

🚀 Overview
CipherChat is a "Zero-Trust" communication platform. It generates asymmetric RSA-2048 key pairs directly in the browser using the WebCrypto API. **Private keys are volatile—they are stored only in RAM and never touch the server.**

🛠️ Security Architecture
- **Asymmetric Encryption:** RSA-OAEP (2048-bit) for secure key exchange between peers.
- **Symmetric Encryption:** AES-GCM (256-bit) for the actual message payloads.
- **Initialization Vectors:** Unique 96-bit IVs generated for every single message block.
- **Zero-Knowledge Relay:** The Node.js/Socket.io backend serves only as a traffic controller, relaying encrypted blobs without any ability to decrypt them.

🖥️ Split-Screen Demonstration
The interface features an **Alpha** and **Bravo** terminal view. Each panel acts as a completely isolated cryptographic client with its own:
- RSA Key Pair Generation
- Independent Socket.IO Connection
- Localized Decryption State
- Unique Identity Fingerprint

📦 Getting Started

1. Installation
```bash
npm install
```

2. Start the Relay Server (Backend)
This is the core of the secure relay.
```bash
npm run relay
```

3. Start the Frontend (Next.js)
```bash
npm run dev
```

4. Access the Terminal
Visit https://cipher-chat-tau.vercel.app/. Enter your codename and establish a secure link.

⚙️ Deployment Guide
Since Socket.IO requires a persistent server process:
1. **Frontend:** Deploy to Vercel (Next.js).
2. **Relay Backend:** Deploy `src/relay/server.js` to a provider that supports long-running Node.js processes (Railway.app, Render.com, or Fly.io).
3. **Environment Variables:** Set `NEXT_PUBLIC_RELAY_URL` in Vercel to point to your deployed relay URL.

*Built for secure, non-persistent, hardware-isolated communication.*
