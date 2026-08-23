import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Banknote,
  BarChart3,
  Bell,
  Search,
} from "lucide-react";

const nav = [
  { to: "/", label: "Panel", icon: LayoutDashboard },
  { to: "/solicitudes", label: "Solicitudes", icon: FileText },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/desembolsos", label: "Desembolsos", icon: Banknote },
  { to: "/reportes", label: "Reportes", icon: BarChart3 },
] as const;

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <div className="border-b border-sidebar-border px-5 py-6">
          <div className="heading-x text-2xl leading-none text-sidebar-primary-foreground">
            SU<span className="text-primary">MOTO</span>
            <span className="ml-1 text-xs not-italic tracking-widest">S.A</span>
          </div>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Otorgamiento de créditos
          </p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{
                className:
                  "bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-sidebar-primary",
              }}
              inactiveProps={{ className: "border-l-4 border-transparent" }}
              className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium uppercase tracking-wide transition-colors hover:bg-sidebar-accent"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-4 text-xs text-muted-foreground">
          Motor de decisión v2.4
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur">
          <div className="flex flex-wrap items-center gap-4 px-5 py-4 lg:px-8">
            <div className="min-w-0 flex-1">
              <h1 className="heading-x text-2xl text-foreground lg:text-3xl">{title}</h1>
              {subtitle && (
                <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-sm border border-input bg-background px-3 py-2 text-sm text-muted-foreground md:flex">
                <Search className="size-4" />
                <span>Buscar cédula o radicado</span>
              </div>
              <button
                type="button"
                aria-label="Notificaciones"
                className="rounded-sm border border-input bg-background p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Bell className="size-4" />
              </button>
              {actions}
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto border-t border-border px-3 py-2 lg:hidden">
            {nav.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                activeProps={{ className: "bg-primary text-primary-foreground" }}
                className="whitespace-nowrap rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wide"
              >
                {label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1 px-5 py-6 lg:px-8">{children}</main>
        <footer className="border-t border-border px-5 py-4 text-xs text-muted-foreground lg:px-8">
          Su Moto S.A. — Uso interno. Información sujeta a políticas de crédito y
          habeas data.
        </footer>
      </div>
    </div>
  );
}

export function EstadoBadge({ estado }: { estado: string }) {
  const map: Record<string, string> = {
    Aprobada: "bg-success/15 text-success border-success/30",
    Desembolsada: "bg-primary/10 text-primary border-primary/30",
    Pagado: "bg-success/15 text-success border-success/30",
    "En análisis": "bg-warning/20 text-warning-foreground border-warning/40",
    "En verificación": "bg-warning/20 text-warning-foreground border-warning/40",
    Programado: "bg-accent text-accent-foreground border-primary/20",
    Radicada: "bg-muted text-muted-foreground border-border",
    Rechazada: "bg-destructive/10 text-destructive border-destructive/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
        map[estado] ?? "bg-muted text-muted-foreground border-border"
      }`}
    >
      {estado}
    </span>
  );
}
