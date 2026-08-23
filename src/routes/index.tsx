import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell, EstadoBadge } from "@/components/AppShell";
import {
  colocacionMensual,
  cop,
  cuotaMensual,
  solicitudes,
} from "@/lib/credito-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Panel de crédito | Su Moto S.A." },
      {
        name: "description",
        content:
          "Panel de otorgamiento de créditos de Su Moto S.A.: radicación, análisis, aprobación y desembolso de créditos de motocicletas.",
      },
      { property: "og:title", content: "Panel de crédito | Su Moto S.A." },
      {
        property: "og:description",
        content:
          "Administra solicitudes, clientes y desembolsos del sistema de otorgamiento de créditos de Su Moto S.A.",
      },
    ],
  }),
  component: Panel,
});

function Kpi({
  label,
  valor,
  detalle,
}: {
  label: string;
  valor: string;
  detalle: string;
}) {
  return (
    <div className="panel bar-accent p-5 pl-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="heading-x mt-2 text-3xl text-foreground">{valor}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detalle}</p>
    </div>
  );
}

function Panel() {
  const enAnalisis = solicitudes.filter((s) => s.estado === "En análisis");
  const aprobadas = solicitudes.filter(
    (s) => s.estado === "Aprobada" || s.estado === "Desembolsada",
  );
  const colocado = aprobadas.reduce((a, s) => a + s.monto, 0);

  return (
    <AppShell
      title="Panel de otorgamiento"
      subtitle="Corte al 23 de agosto de 2026 · Red nacional Su Moto S.A."
      actions={
        <Link
          to="/solicitudes"
          className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Nueva solicitud
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          label="Solicitudes del mes"
          valor={String(solicitudes.length * 21)}
          detalle="+12% frente a julio"
        />
        <Kpi
          label="En análisis"
          valor={String(enAnalisis.length * 9)}
          detalle="SLA promedio 3.4 horas"
        />
        <Kpi label="Colocación aprobada" valor={cop(colocado)} detalle="Cartera nueva" />
        <Kpi label="Tasa de aprobación" valor="63,8 %" detalle="Meta trimestral 60 %" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="panel p-5">
          <h2 className="heading-x text-lg">Colocación mensual (millones COP)</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={colocacionMensual}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)" }}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="monto" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel p-5">
          <h2 className="heading-x text-lg">Cola de decisión</h2>
          <ul className="mt-4 space-y-3">
            {enAnalisis.concat(solicitudes.filter((s) => s.estado === "Radicada")).map(
              (s) => (
                <li key={s.id} className="border-b border-border pb-3 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{s.cliente}</span>
                    <EstadoBadge estado={s.estado} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {s.id} · {s.moto} · {cop(s.monto)} · score {s.score}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Cuota estimada {cop(cuotaMensual(s.monto, s.tasa, s.plazo))} /{" "}
                    {s.plazo} meses
                  </p>
                </li>
              ),
            )}
          </ul>
        </section>
      </div>

      <section className="panel mt-6 p-5">
        <div className="flex items-center justify-between">
          <h2 className="heading-x text-lg">Últimas radicaciones</h2>
          <Link
            to="/solicitudes"
            className="text-xs font-semibold uppercase tracking-wide text-primary hover:underline"
          >
            Ver todas
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="pb-2">Radicado</th>
                <th className="pb-2">Cliente</th>
                <th className="pb-2">Motocicleta</th>
                <th className="pb-2 text-right">Monto</th>
                <th className="pb-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.slice(0, 5).map((s) => (
                <tr key={s.id} className="border-b border-border/60 last:border-0">
                  <td className="py-3 font-mono text-xs">{s.id}</td>
                  <td className="py-3">{s.cliente}</td>
                  <td className="py-3 text-muted-foreground">{s.moto}</td>
                  <td className="py-3 text-right font-semibold">{cop(s.monto)}</td>
                  <td className="py-3">
                    <EstadoBadge estado={s.estado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
