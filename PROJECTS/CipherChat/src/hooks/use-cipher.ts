
"use client";

import { useState, useEffect, useCallback } from 'react';
import { generateKeyPair, exportPublicKey, getPublicKeyFingerprint } from '@/lib/crypto';

export interface UserIdentity {
  username: string;
  publicKey: string;
  fingerprint: string;
}

export function useCipher() {
  const [currentUser, setCurrentUser] = useState<UserIdentity | null>(null);
  const [privateKey, setPrivateKey] = useState<CryptoKey | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check session storage for existing user (for persistence during session)
    const storedUser = sessionStorage.getItem('cipher_user');
    if (storedUser) {
      // Note: We don't store the private key in session storage for security.
      // In a real app, we'd regenerate it or handle session expiry better.
      // But per prompt, private key is stored in browser session *only*.
      // Since it's a CryptoKey object, we keep it in React state.
    }
  }, []);

  const login = useCallback(async (username: string) => {
    setIsLoading(true);
    try {
      const keys = await generateKeyPair();
      const pubKeyString = await exportPublicKey(keys.publicKey);
      const fingerprint = await getPublicKeyFingerprint(pubKeyString);
      
      const user: UserIdentity = {
        username,
        publicKey: pubKeyString,
        fingerprint,
      };

      setCurrentUser(user);
      setPrivateKey(keys.privateKey);
      sessionStorage.setItem('cipher_user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Login/Key generation error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setPrivateKey(null);
    sessionStorage.removeItem('cipher_user');
  }, []);

  return {
    currentUser,
    privateKey,
    isLoading,
    login,
    logout
  };
}
