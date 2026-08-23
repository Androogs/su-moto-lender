export type EstadoSolicitud =
  | "Radicada"
  | "En análisis"
  | "Aprobada"
  | "Rechazada"
  | "Desembolsada";

export type Solicitud = {
  id: string;
  cliente: string;
  documento: string;
  ciudad: string;
  moto: string;
  valorMoto: number;
  cuotaInicial: number;
  monto: number;
  plazo: number;
  tasa: number;
  score: number;
  estado: EstadoSolicitud;
  asesor: string;
  fecha: string;
};

export const solicitudes: Solicitud[] = [
  {
    id: "SOL-2026-0481",
    cliente: "Andrés Felipe Rojas",
    documento: "CC 1.012.554.331",
    ciudad: "Bogotá",
    moto: "Suzuki GN 125 F",
    valorMoto: 7990000,
    cuotaInicial: 1200000,
    monto: 6790000,
    plazo: 36,
    tasa: 1.85,
    score: 742,
    estado: "En análisis",
    asesor: "M. Cárdenas",
    fecha: "2026-08-21",
  },
  {
    id: "SOL-2026-0480",
    cliente: "Luisa Fernanda Peña",
    documento: "CC 52.884.190",
    ciudad: "Medellín",
    moto: "Suzuki V-Strom 250 SX",
    valorMoto: 18990000,
    cuotaInicial: 4000000,
    monto: 14990000,
    plazo: 48,
    tasa: 1.72,
    score: 801,
    estado: "Aprobada",
    asesor: "J. Ospina",
    fecha: "2026-08-20",
  },
  {
    id: "SOL-2026-0479",
    cliente: "Carlos Mario Vélez",
    documento: "CC 71.335.028",
    ciudad: "Cali",
    moto: "Suzuki Gixxer 250",
    valorMoto: 16490000,
    cuotaInicial: 2500000,
    monto: 13990000,
    plazo: 60,
    tasa: 1.95,
    score: 615,
    estado: "Radicada",
    asesor: "D. Herrera",
    fecha: "2026-08-20",
  },
  {
    id: "SOL-2026-0476",
    cliente: "Sandra Milena Torres",
    documento: "CC 43.221.775",
    ciudad: "Barranquilla",
    moto: "Suzuki AX4 ABS",
    valorMoto: 8290000,
    cuotaInicial: 900000,
    monto: 7390000,
    plazo: 36,
    tasa: 1.88,
    score: 528,
    estado: "Rechazada",
    asesor: "M. Cárdenas",
    fecha: "2026-08-19",
  },
  {
    id: "SOL-2026-0472",
    cliente: "Jorge Iván Salazar",
    documento: "CC 98.554.210",
    ciudad: "Bucaramanga",
    moto: "Suzuki GSX-8S",
    valorMoto: 62900000,
    cuotaInicial: 18000000,
    monto: 44900000,
    plazo: 60,
    tasa: 1.65,
    score: 855,
    estado: "Desembolsada",
    asesor: "J. Ospina",
    fecha: "2026-08-18",
  },
  {
    id: "SOL-2026-0470",
    cliente: "Paula Andrea Gómez",
    documento: "CC 1.098.223.664",
    ciudad: "Pereira",
    moto: "Suzuki V-Strom 160",
    valorMoto: 12490000,
    cuotaInicial: 1500000,
    monto: 10990000,
    plazo: 48,
    tasa: 1.8,
    score: 690,
    estado: "En análisis",
    asesor: "D. Herrera",
    fecha: "2026-08-18",
  },
];

export type Desembolso = {
  id: string;
  solicitud: string;
  cliente: string;
  concesionario: string;
  monto: number;
  fecha: string;
  estado: "Programado" | "Pagado" | "En verificación";
};

export const desembolsos: Desembolso[] = [
  {
    id: "DES-3391",
    solicitud: "SOL-2026-0472",
    cliente: "Jorge Iván Salazar",
    concesionario: "Su Moto — Cañaveral",
    monto: 44900000,
    fecha: "2026-08-19",
    estado: "Pagado",
  },
  {
    id: "DES-3392",
    solicitud: "SOL-2026-0480",
    cliente: "Luisa Fernanda Peña",
    concesionario: "Su Moto — Poblado",
    monto: 14990000,
    fecha: "2026-08-24",
    estado: "Programado",
  },
  {
    id: "DES-3393",
    solicitud: "SOL-2026-0468",
    cliente: "Nicolás Ariza",
    concesionario: "Su Moto — Chapinero",
    monto: 9250000,
    fecha: "2026-08-22",
    estado: "En verificación",
  },
];

export type Cliente = {
  documento: string;
  nombre: string;
  ciudad: string;
  telefono: string;
  ingresos: number;
  creditosActivos: number;
  saldo: number;
  mora: number;
};

export const clientes: Cliente[] = [
  {
    documento: "CC 1.012.554.331",
    nombre: "Andrés Felipe Rojas",
    ciudad: "Bogotá",
    telefono: "310 445 2210",
    ingresos: 2800000,
    creditosActivos: 1,
    saldo: 4120000,
    mora: 0,
  },
  {
    documento: "CC 52.884.190",
    nombre: "Luisa Fernanda Peña",
    ciudad: "Medellín",
    telefono: "301 778 9032",
    ingresos: 5100000,
    creditosActivos: 1,
    saldo: 14990000,
    mora: 0,
  },
  {
    documento: "CC 98.554.210",
    nombre: "Jorge Iván Salazar",
    ciudad: "Bucaramanga",
    telefono: "315 220 4471",
    ingresos: 11200000,
    creditosActivos: 2,
    saldo: 44900000,
    mora: 0,
  },
  {
    documento: "CC 43.221.775",
    nombre: "Sandra Milena Torres",
    ciudad: "Barranquilla",
    telefono: "300 991 8845",
    ingresos: 1900000,
    creditosActivos: 1,
    saldo: 2310000,
    mora: 41,
  },
  {
    documento: "CC 71.335.028",
    nombre: "Carlos Mario Vélez",
    ciudad: "Cali",
    telefono: "312 664 1187",
    ingresos: 3400000,
    creditosActivos: 0,
    saldo: 0,
    mora: 0,
  },
];

export const colocacionMensual = [
  { mes: "Mar", monto: 820 },
  { mes: "Abr", monto: 940 },
  { mes: "May", monto: 1120 },
  { mes: "Jun", monto: 1035 },
  { mes: "Jul", monto: 1280 },
  { mes: "Ago", monto: 1410 },
];

export const cop = (valor: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);

export const cuotaMensual = (monto: number, tasaMensual: number, plazo: number) => {
  const i = tasaMensual / 100;
  return (monto * i) / (1 - Math.pow(1 + i, -plazo));
};
