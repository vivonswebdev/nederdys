import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Navbar } from "@/components/Navbar";

const LINKS = [
  { to: "/admin", label: "📊 Dashboard", end: true },
  { to: "/admin/utilisateurs", label: "👥 Utilisateurs" },
  { to: "/admin/bugs", label: "🐛 Bugs" },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { isAdmin, loading } = useIsAdmin();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <p className="container px-4 py-12 text-muted-foreground">Chargement…</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 py-16 max-w-md text-center">
          <span className="text-5xl block mb-3">🔒</span>
          <h1 className="text-2xl font-bold mb-2">Accès refusé</h1>
          <p className="text-muted-foreground">
            Seuls les administrateurs peuvent accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 py-6 flex flex-col md:flex-row gap-6">
        <aside className="md:w-56 shrink-0">
          <h2 className="font-bold text-lg mb-3">NederDys Admin</h2>
          <nav className="flex md:flex-col gap-2 overflow-x-auto">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl whitespace-nowrap min-h-[44px] flex items-center font-medium transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
