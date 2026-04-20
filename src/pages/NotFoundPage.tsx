import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">404</p>
        <h1 className="mt-4 font-serif text-4xl font-bold text-slate-950">Siden ble ikke funnet</h1>
        <p className="mt-4 text-slate-600">Lenken finnes ikke i den nye React-applikasjonen ennå.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">
          Til forsiden
        </Link>
      </div>
    </div>
  );
}
