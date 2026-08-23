import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, EstadoBadge } from "@/components/AppShell";
import { cop, cuotaMensual, solicitudes, type Solicitud } from "@/lib/credito-data";

export const Route = createFileRoute("/solicitudes")({
  head: () => ({
    meta: [
      { title: "Solicitudes de crédito | Su Moto S.A." },
      {
        name: "description",
        content:
          "Radicación, análisis y aprobación de solicitudes de crédito para motocicletas Suzuki en Su Moto S.A.",
      },
      { property: "og:title", content: "Solicitudes de crédito | Su Moto S.A." },
      {
        property: "og:description",
        content:
          "Consulta el estado, score y condiciones de cada solicitud de crédito radicada.",
      },
    ],
  }),
  component: Solicitudes,
});

const estados = [
  "Todas",
  "Radicada",
  "En análisis",
  "Aprobada",
  "Rechazada",
  "Desembolsada",
] as const;

function Detalle({ s }: { s: Solicitud }) {
  const cuota = cuotaMensual(s.monto, s.tasa, s.plazo);
  return (
    <div className="panel bar-accent p-5 pl-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Detalle del radicado
      </p>
      <h2 className="heading-x mt-1 text-2xl">{s.cliente}</h2>
      <p className="text-xs text-muted-foreground">
        {s.documento} · {s.ciudad} · Asesor {s.asesor}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
        {[
          ["Radicado", s.id],
          ["Motocicleta", s.moto],
          ["Valor moto", cop(s.valorMoto)],
          ["Cuota inicial", cop(s.cuotaInicial)],
          ["Monto financiado", cop(s.monto)],
          ["Plazo", `${s.plazo} meses`],
          ["Tasa M.V.", `${s.tasa.toFixed(2)} %`],
          ["Cuota mensual", cop(cuota)],
          ["Score interno", String(s.score)],
          ["Radicación", s.fecha],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
              {k}
            </dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 rounded-sm bg-muted p-3 text-xs text-muted-foreground">
        Endeudamiento estimado: {((cuota / (s.monto / s.plazo + 1200000)) * 100).toFixed(1)} %
        · Política vigente: máx. 40 % de ingreso demostrado.
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90">
          Aprobar
        </button>
        <button className="rounded-sm border border-input bg-background px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-accent">
          Solicitar documentos
        </button>
        <button className="rounded-sm border border-destructive/40 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-destructive transition-colors hover:bg-destructive/10">
          Rechazar
        </button>
      </div>
    </div>
  );
}

function Solicitudes() {
  const [filtro, setFiltro] = useState<(typeof estados)[number]>("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [seleccion, setSeleccion] = useState(solicitudes[0].id);

  const lista = useMemo(
    () =>
      solicitudes.filter(
        (s) =>
          (filtro === "Todas" || s.estado === filtro) &&
          (s.cliente + s.id + s.documento)
            .toLowerCase()
            .includes(busqueda.toLowerCase()),
      ),
    [filtro, busqueda],
  );

  const actual = solicitudes.find((s) => s.id === seleccion) ?? solicitudes[0];

  return (
    <AppShell
      title="Solicitudes"
      subtitle="Bandeja de radicación y decisión de crédito"
    >
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section>
          <div className="panel p-4">
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre, cédula o radicado"
                className="min-w-[220px] flex-1 rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <div className="flex flex-wrap gap-1">
                {estados.map((e) => (
                  <button
                    key={e}
                    onClick={() => setFiltro(e)}
                    className={`rounded-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                      filtro === e
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="pb-2">Radicado</th>
                    <th className="pb-2">Cliente</th>
                    <th className="pb-2 text-right">Monto</th>
                    <th className="pb-2 text-right">Score</th>
                    <th className="pb-2">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((s) => (
                    <tr
                      key={s.id}
                      onClick={() => setSeleccion(s.id)}
                      className={`cursor-pointer border-b border-border/60 transition-colors last:border-0 hover:bg-muted ${
                        s.id === actual.id ? "bg-accent/60" : ""
                      }`}
                    >
                      <td className="py-3 font-mono text-xs">{s.id}</td>
                      <td className="py-3">
                        {s.cliente}
                        <span className="block text-xs text-muted-foreground">
                          {s.moto}
                        </span>
                      </td>
                      <td className="py-3 text-right font-semibold">{cop(s.monto)}</td>
                      <td className="py-3 text-right">{s.score}</td>
                      <td className="py-3">
                        <EstadoBadge estado={s.estado} />
                      </td>
                    </tr>
                  ))}
                  {lista.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        Sin resultados para el filtro aplicado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Detalle s={actual} />
      </div>
    </AppShell>
  );
}
