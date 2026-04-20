import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "./firebase";

export type Role = "candidate" | "admin";

export interface User {
  name: string;
  role: Role;
  email: string;
  photo?: string;
  uid?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  loginWithEmail: (role: Role, email: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Retrieve stored role or default to candidate
        const savedRole = localStorage.getItem("authRole") as Role | null;
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Ukjent",
          email: firebaseUser.email || "",
          photo: firebaseUser.photoURL || undefined,
          role: savedRole || "candidate",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    localStorage.setItem("authRole", "candidate");
    await signInWithPopup(auth, googleProvider);
  };

  const loginWithGithub = async () => {
    localStorage.setItem("authRole", "candidate");
    await signInWithPopup(auth, githubProvider);
  };

  const loginWithEmail = (role: Role, email: string) => {
    // Fallback for simple email without password validation (mock)
    // If you want real email auth: createUserWithEmailAndPassword(auth, email, password)
    localStorage.setItem("authRole", role);
    setUser({
      uid: "mock-" + Date.now(),
      name: email.split("@")[0],
      role,
      email,
    });
  };

  const logout = async () => {
    localStorage.removeItem("authRole");
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithGithub, loginWithEmail, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
