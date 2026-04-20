import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, Role } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";

export function LoginPage() {
  const { loginWithEmail, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [role, setRole] = useState<Role>("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginWithEmail(role, email);
    if (role === "candidate") {
      navigate("/register");
    } else {
      navigate("/");
    }
  };

  const [isAuthenticating, setIsAuthenticating] = useState<string | null>(null);

  const handleSocialLogin = async (provider: string) => {
    setIsAuthenticating(provider);
    try {
      if (provider === "Google") {
        await loginWithGoogle();
        navigate("/register");
      } else if (provider === "GitHub") {
        await loginWithGithub();
        navigate("/register");
      } else if (provider === "LinkedIn") {
        // Fallback for LinkedIn since Firebase requires extra setup
        setTimeout(() => {
          const name = window.prompt(`Godkjenn innlogging med LinkedIn\n\nSkriv inn navnet ditt for å fortsette:`, `Gjest (LinkedIn)`);
          if (name === null) {
            setIsAuthenticating(null);
            return;
          }
          loginWithEmail("candidate", `linkedin@user.com`);
          navigate("/register");
        }, 800);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticating(null);
    }
  };

  const inputCls = "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 shadow-sm";

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        <div className="bg-indigo-50/50 border-b border-indigo-100 px-8 py-6 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900">
            {t("login.title" as any) || "Logg inn"}
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            {t("login.subtitle" as any) || "Velg brukertype for å fortsette"}
          </p>
        </div>

        <div className="px-8 py-6">
          {/* Tabs */}
          <div className="flex rounded-lg bg-slate-100 p-1 mb-8">
            <button
              type="button"
              onClick={() => setRole("candidate")}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition ${
                role === "candidate" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t("login.candidate" as any) || "Kandidat"}
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition ${
                role === "admin" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t("login.admin" as any) || "Admin"}
            </button>
          </div>

          {/* Social Logins (Only for candidates) */}
          {role === "candidate" && (
            <div className="mb-6 space-y-3">
              <button 
                onClick={() => handleSocialLogin("Google")}
                disabled={!!isAuthenticating}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition disabled:opacity-50"
              >
                {isAuthenticating === "Google" ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600"></span>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )}
                {t("login.google" as any) || "Fortsett med Google"}
              </button>
              
              <button 
                onClick={() => handleSocialLogin("LinkedIn")}
                disabled={!!isAuthenticating}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition disabled:opacity-50"
              >
                {isAuthenticating === "LinkedIn" ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600"></span>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
                {t("login.linkedin" as any) || "Fortsett med LinkedIn"}
              </button>
              
              <button 
                onClick={() => handleSocialLogin("GitHub")}
                disabled={!!isAuthenticating}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition disabled:opacity-50"
              >
                {isAuthenticating === "GitHub" ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600"></span>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#181717">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                )}
                {t("login.github" as any) || "Fortsett med GitHub"}
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                <div className="relative flex justify-center"><span className="bg-white px-4 text-xs font-semibold text-slate-400">{t("login.or" as any) || "ELLER E-POST"}</span></div>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-600 mb-2">{t("login.email" as any) || "E-post"}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deg@eksempel.no"
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-600 mb-2">{t("login.password" as any) || "Passord"}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputCls}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              {t("login.loginAs" as any) || "Logg inn som"} {role === "candidate" ? (t("login.candidate" as any) || "Kandidat") : (t("login.admin" as any) || "Admin")}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
