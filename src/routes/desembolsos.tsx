import { createFileRoute } from "@tanstack/react-router";
import { AppShell, EstadoBadge } from "@/components/AppShell";
import { cop, desembolsos } from "@/lib/credito-data";

export const Route = createFileRoute("/desembolsos")({
  head: () => ({
    meta: [
      { title: "Desembolsos | Su Moto S.A." },
      {
        name: "description",
        content:
          "Programación y seguimiento de desembolsos de créditos aprobados a concesionarios Su Moto S.A.",
      },
      { property: "og:title", content: "Desembolsos | Su Moto S.A." },
      {
        property: "og:description",
        content:
          "Controla los pagos a concesionarios por créditos aprobados y su estado de verificación.",
      },
    ],
  }),
  component: Desembolsos,
});

function Desembolsos() {
  const total = desembolsos.reduce((a, d) => a + d.monto, 0);

  return (
    <AppShell
      title="Desembolsos"
      subtitle="Pagos a concesionarios por créditos aprobados"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel bar-accent p-5 pl-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Total en proceso
          </p>
          <p className="heading-x mt-2 text-3xl">{cop(total)}</p>
        </div>
        <div className="panel bar-accent p-5 pl-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Operaciones
          </p>
          <p className="heading-x mt-2 text-3xl">{desembolsos.length}</p>
        </div>
        <div className="panel bar-accent p-5 pl-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Tiempo medio de giro
          </p>
          <p className="heading-x mt-2 text-3xl">1,8 días</p>
        </div>
      </div>

      <section className="panel mt-6 p-5">
        <h2 className="heading-x text-lg">Programación</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="pb-2">Operación</th>
                <th className="pb-2">Radicado</th>
                <th className="pb-2">Cliente</th>
                <th className="pb-2">Concesionario</th>
                <th className="pb-2 text-right">Monto</th>
                <th className="pb-2">Fecha</th>
                <th className="pb-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {desembolsos.map((d) => (
                <tr key={d.id} className="border-b border-border/60 last:border-0">
                  <td className="py-3 font-mono text-xs">{d.id}</td>
                  <td className="py-3 font-mono text-xs">{d.solicitud}</td>
                  <td className="py-3">{d.cliente}</td>
                  <td className="py-3 text-muted-foreground">{d.concesionario}</td>
                  <td className="py-3 text-right font-semibold">{cop(d.monto)}</td>
                  <td className="py-3 text-muted-foreground">{d.fecha}</td>
                  <td className="py-3">
                    <EstadoBadge estado={d.estado} />
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
