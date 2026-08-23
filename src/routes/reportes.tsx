import { createFileRoute } from "@tanstack/react-router";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { colocacionMensual, solicitudes } from "@/lib/credito-data";

export const Route = createFileRoute("/reportes")({
  head: () => ({
    meta: [
      { title: "Reportes de crédito | Su Moto S.A." },
      {
        name: "description",
        content:
          "Indicadores de colocación, aprobación y calidad de cartera del sistema de otorgamiento de créditos de Su Moto S.A.",
      },
      { property: "og:title", content: "Reportes de crédito | Su Moto S.A." },
      {
        property: "og:description",
        content:
          "Analiza la colocación mensual, la tasa de aprobación y el desempeño por asesor.",
      },
    ],
  }),
  component: Reportes,
});

function Reportes() {
  const porAsesor = Object.entries(
    solicitudes.reduce<Record<string, number>>((acc, s) => {
      acc[s.asesor] = (acc[s.asesor] ?? 0) + 1;
      return acc;
    }, {}),
  );

  return (
    <AppShell title="Reportes" subtitle="Indicadores de colocación y calidad de cartera">
      <section className="panel p-5">
        <h2 className="heading-x text-lg">Tendencia de colocación (millones COP)</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={colocacionMensual}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="monto"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="panel p-5">
          <h2 className="heading-x text-lg">Solicitudes por asesor</h2>
          <ul className="mt-4 space-y-3">
            {porAsesor.map(([asesor, cantidad]) => (
              <li key={asesor}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{asesor}</span>
                  <span className="text-muted-foreground">{cantidad * 7}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${Math.min(100, cantidad * 30)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel p-5">
          <h2 className="heading-x text-lg">Calidad de cartera</h2>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            {[
              ["Índice de mora > 30 días", "3,4 %"],
              ["Pérdida esperada", "1,9 %"],
              ["Ticket promedio", "$ 14.850.000"],
              ["Plazo promedio", "47 meses"],
              ["Cuota inicial promedio", "18 %"],
              ["Aprobación automática", "41 %"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-sm bg-muted p-3">
                <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {k}
                </dt>
                <dd className="heading-x mt-1 text-xl">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </AppShell>
  );
}
