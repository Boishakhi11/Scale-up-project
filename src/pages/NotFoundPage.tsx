import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-600">404</p>
        <h1 className="mt-4 font-serif text-4xl font-extrabold text-slate-900">Siden ble ikke funnet</h1>
        <p className="mt-4 text-slate-600 leading-relaxed">Lenken finnes ikke i den nye React-applikasjonen ennå.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white transition hover:scale-105 shadow-md">
          Til forsiden
        </Link>
      </div>
    </div>
  );
}
