
export interface EncryptedPayload {
  encryptedMessage: string;
  encryptedAESKey: string;
  iv: string;
  authTag: string;
  timestamp: number;
}

const RSA_PARAMS = {
  name: "RSA-OAEP",
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: "SHA-256",
};

export async function generateKeyPair(): Promise<CryptoKeyPair> {
  return await window.crypto.subtle.generateKey(
    RSA_PARAMS,
    true, // extractable
    ["encrypt", "decrypt"]
  );
}

export async function exportPublicKey(key: CryptoKey): Promise<string> {
  const exported = await window.crypto.subtle.exportKey("spki", key);
  return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

export async function importPublicKey(keyData: string): Promise<CryptoKey> {
  const binary = atob(keyData);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return await window.crypto.subtle.importKey(
    "spki",
    buffer,
    RSA_PARAMS,
    true,
    ["encrypt"]
  );
}

export async function getPublicKeyFingerprint(publicKeyString: string): Promise<string> {
  const binary = atob(publicKeyString);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join(':').toUpperCase();
}

export async function encryptMessage(
  message: string,
  recipientPublicKey: CryptoKey
): Promise<EncryptedPayload> {
  // 1. Generate AES-256 session key
  const aesKey = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  // 2. Encrypt message with AES-GCM
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encodedMessage = new TextEncoder().encode(message);
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    encodedMessage
  );

  // AES-GCM buffer includes the auth tag at the end (16 bytes)
  const tagLength = 16;
  const encryptedMessage = encryptedBuffer.slice(0, encryptedBuffer.byteLength - tagLength);
  const authTag = encryptedBuffer.slice(encryptedBuffer.byteLength - tagLength);

  // 3. Encrypt AES session key with RSA
  const rawAesKey = await window.crypto.subtle.exportKey("raw", aesKey);
  const encryptedAesKeyBuffer = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    recipientPublicKey,
    rawAesKey
  );

  return {
    encryptedMessage: btoa(String.fromCharCode(...new Uint8Array(encryptedMessage))),
    encryptedAESKey: btoa(String.fromCharCode(...new Uint8Array(encryptedAesKeyBuffer))),
    iv: btoa(String.fromCharCode(...iv)),
    authTag: btoa(String.fromCharCode(...new Uint8Array(authTag))),
    timestamp: Date.now(),
  };
}

export async function decryptMessage(
  payload: EncryptedPayload,
  myPrivateKey: CryptoKey
): Promise<string | null> {
  try {
    // 1. Decrypt AES session key using RSA
    const encryptedAesKey = new Uint8Array(atob(payload.encryptedAESKey).split('').map(c => c.charCodeAt(0)));
    const decryptedAesKeyBuffer = await window.crypto.subtle.decrypt(
      { name: "RSA-OAEP" },
      myPrivateKey,
      encryptedAesKey
    );

    const aesKey = await window.crypto.subtle.importKey(
      "raw",
      decryptedAesKeyBuffer,
      { name: "AES-GCM", length: 256 },
      true,
      ["decrypt"]
    );

    // 2. Decrypt message with AES-GCM
    const iv = new Uint8Array(atob(payload.iv).split('').map(c => c.charCodeAt(0)));
    const encryptedMessage = new Uint8Array(atob(payload.encryptedMessage).split('').map(c => c.charCodeAt(0)));
    const authTag = new Uint8Array(atob(payload.authTag).split('').map(c => c.charCodeAt(0)));
    
    // Combine message and tag for standard WebCrypto decrypt
    const combined = new Uint8Array(encryptedMessage.length + authTag.length);
    combined.set(encryptedMessage);
    combined.set(authTag, encryptedMessage.length);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      aesKey,
      combined
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (err) {
    console.error("Decryption failed:", err);
    return null;
  }
}
