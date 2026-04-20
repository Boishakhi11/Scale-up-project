import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, Role } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";
import Swal from "sweetalert2";

export function LoginPage() {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [role, setRole] = useState<Role>("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (role === "admin") {
      if (email !== "admin@gmail.com" || password !== "admin123") {
        alert("Invalid admin email or password. Please use admin@gmail.com / admin123");
        return;
      }
    }

    loginWithEmail(role, email);
    Swal.fire({
      title: "Suksess!",
      text: "Du er nå logget inn.",
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
    navigate("/");
  };

  const [isAuthenticating, setIsAuthenticating] = useState<string | null>(null);

  const handleSocialLogin = async (provider: string) => {
    setIsAuthenticating(provider);
    try {
      if (provider === "Google") {
        await loginWithGoogle();
        Swal.fire({
          title: "Suksess!",
          text: "Du er nå logget inn.",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        navigate("/");
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
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-lg"
            >
              {t("login.loginAs" as any) || "Logg inn som"} {role === "candidate" ? (t("login.candidate" as any) || "Kandidat") : (t("login.admin" as any) || "Admin")}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
