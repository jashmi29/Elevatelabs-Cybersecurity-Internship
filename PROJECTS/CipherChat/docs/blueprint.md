# **App Name**: CipherChat

## Core Features:

- User Authentication: Simple username-based login system.
- RSA-2048 Key Pair Generation: Automatic RSA key pair generation upon login.
- Secure Public Key Exchange: Public keys shared via server.
- Public Key Fingerprint Verification: SHA-256 fingerprint verification to prevent MITM.
- AES-256-GCM Encryption: Client-side message encryption using AES-256-GCM.
- RSA Key Encryption: AES session key encrypted with recipient’s RSA public key.
- Private Key Storage: Private key stored securely in browser session only.
- Structured Encrypted Message Format: Includes: encryptedMessage, encryptedAESKey, IV, authenticationTag, timestamp
- Secure Room-Based Communication: Encrypted chat rooms for private conversations.
- Authentication Tag Validation: Built-in integrity verification via AES-GCM.
- Graceful Decryption Failure Handling: Safe error handling for corrupted messages.
- HTTPS Enforced Deployment: Secure communication via HTTPS.
- Real-time messaging using Flask-SocketIO: Instant encrypted message delivery. Server stores only encrypted payloads.

## Style Guidelines:

- Clean bubble-style chat interface.
- Inter (modern sans-serif).
- Minimalist icons for send, status, encryption.
- Subtle message send/receive transitions.