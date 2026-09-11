"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  setPersistence,
  browserSessionPersistence,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// 5 minutes of no mouse/keyboard/touch activity auto-signs-out the admin.
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];

// Tracks Firebase Auth state client-side for UI purposes only (showing
// the login form vs the dashboard). This is NOT the real security
// boundary — every admin API route independently verifies the Firebase
// ID token server-side, since a client-side "logged in" check alone can
// be bypassed by calling the API directly.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Inactivity auto-logout — only runs while actually signed in. Resets
  // on any real user interaction; fires signOut() if none happen for
  // INACTIVITY_TIMEOUT_MS. This is separate from session persistence
  // below — this handles "left the tab open and walked away", while
  // session persistence handles "came back after closing the browser".
  useEffect(() => {
    if (!user) return;

    function resetTimer() {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        firebaseSignOut(auth);
      }, INACTIVITY_TIMEOUT_MS);
    }

    resetTimer();
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [user]);

  async function signIn(email: string, password: string) {
    // Session-only persistence — the login does NOT survive closing the
    // browser/tab. Without this, Firebase defaults to persisting login
    // indefinitely across restarts, which is why it stayed logged in
    // even after 2 days. Must be set before signInWithEmailAndPassword.
    await setPersistence(auth, browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signOut() {
    await firebaseSignOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
