import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { clientes, cop } from "@/lib/credito-data";

export const Route = createFileRoute("/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes y cartera | Su Moto S.A." },
      {
        name: "description",
        content:
          "Base de clientes de crédito de Su Moto S.A.: ingresos, créditos activos, saldo de cartera y días de mora.",
      },
      { property: "og:title", content: "Clientes y cartera | Su Moto S.A." },
      {
        property: "og:description",
        content:
          "Consulta el historial crediticio y el estado de cartera de cada cliente de Su Moto S.A.",
      },
    ],
  }),
  component: Clientes,
});

function Clientes() {
  const saldoTotal = clientes.reduce((a, c) => a + c.saldo, 0);
  const enMora = clientes.filter((c) => c.mora > 0);

  return (
    <AppShell title="Clientes" subtitle="Base de titulares y estado de cartera">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel bar-accent p-5 pl-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Titulares
          </p>
          <p className="heading-x mt-2 text-3xl">{clientes.length * 34}</p>
        </div>
        <div className="panel bar-accent p-5 pl-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Saldo de cartera
          </p>
          <p className="heading-x mt-2 text-3xl">{cop(saldoTotal)}</p>
        </div>
        <div className="panel bar-accent p-5 pl-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Clientes en mora
          </p>
          <p className="heading-x mt-2 text-3xl text-destructive">{enMora.length}</p>
        </div>
      </div>

      <section className="panel mt-6 p-5">
        <h2 className="heading-x text-lg">Listado de clientes</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="pb-2">Documento</th>
                <th className="pb-2">Nombre</th>
                <th className="pb-2">Ciudad</th>
                <th className="pb-2">Teléfono</th>
                <th className="pb-2 text-right">Ingresos</th>
                <th className="pb-2 text-right">Créditos</th>
                <th className="pb-2 text-right">Saldo</th>
                <th className="pb-2 text-right">Mora</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.documento} className="border-b border-border/60 last:border-0">
                  <td className="py-3 font-mono text-xs">{c.documento}</td>
                  <td className="py-3 font-medium">{c.nombre}</td>
                  <td className="py-3 text-muted-foreground">{c.ciudad}</td>
                  <td className="py-3 text-muted-foreground">{c.telefono}</td>
                  <td className="py-3 text-right">{cop(c.ingresos)}</td>
                  <td className="py-3 text-right">{c.creditosActivos}</td>
                  <td className="py-3 text-right font-semibold">{cop(c.saldo)}</td>
                  <td
                    className={`py-3 text-right font-semibold ${
                      c.mora > 0 ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {c.mora > 0 ? `${c.mora} días` : "Al día"}
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
