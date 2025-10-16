import type { Documento, Motivo } from "./types/documento";

export const ACTUAL_DOCUMENTS: Documento[] = [
  {
    id: "c27ed96a-ad69-478d-9743-04234ada4670",
    nombre: "Liquidaciones de sueldo (Últimos 3 meses)",
    active: false,
  },
  {
    id: "4a7ad4d4-fd1d-440e-8343-77e49d46d286",
    nombre: "Cédula de identidad",
    active: false,
  },
  {
    id: "86f55754-a1b4-49bb-b98c-94477d47c970",
    nombre: "Cartola bancaria (Últimos 3 meses)",
    active: false,
  },
  {
    id: "721adbca-745c-48a8-994b-ba67c50cd1b8",
    nombre: "Estado de cuenta tarjetas de crédito",
    active: false,
  },
  {
    id: "b1765226-6120-42a5-ba6c-1f249b970b78",
    nombre: "Certificado de deudas",
    active: false,
  },
  {
    id: "756d5936-63e9-4af6-a4af-15b94acd7e3a",
    nombre: "Contratos de crédito",
    active: false,
  },
];

export const MOTIVOS_INMEDIATA: Motivo[] = [
  {
    id: "03877dbf-159a-4784-b9cc-8cb4d7ce3e81",
    nombre: "Venta vehículo <1 año",
    active: false,
  },
  {
    id: "cd0dc03c-f195-4393-b799-bc68bfbd3160",
    nombre: "Finiquito <1 año",
    active: false,
  },
  {
    id: "24610473-62d0-4dfd-9a2c-625999dfefaa",
    nombre: "Crédito reciente",
    active: false,
  },
  {
    id: "1b9ee140-d8f9-4b31-918f-00e2754270ee",
    nombre: "Cesión derecho hereditario",
    active: false,
  },
  {
    id: "5907c3f3-5898-48a5-87c6-a53c773dc510",
    nombre: "Bonos <3 meses",
    active: false,
  },
  {
    id: "3bad6667-22a7-47e3-b4b1-600f23a0420c",
    nombre: "Transferencia en revocatoria",
    active: false,
  },
  {
    id: "652d069a-7b50-4b10-804e-458f60181f38",
    nombre: "Devolución de impuestos alta",
    active: false,
  },
  {
    id: "21fd1e9e-89f3-42d2-b3a2-9431d444e7ef",
    nombre: "Plazo revocatoria",
    active: false,
  },
];

export const MOTIVOS_NO_INMEDIATOS: Motivo[] = [
  {
    id: "d192492c-96fa-42cc-80a4-435b7cbf4346",
    nombre: "Posesión efectiva",
    active: false,
  },
  {
    id: "4fd51269-4548-4948-a221-2185ea09adab",
    nombre: "Sin bienes",
    active: false,
  },
  {
    id: "aeca2b73-e5ad-4de3-b517-38107ec5b853",
    nombre: "Baja PPU",
    active: false,
  },
  {
    id: "6d7366ae-4ce9-4fdc-86a4-bf82f1b4e25d",
    nombre: "Crédito para deuda fiador",
    active: false,
  },
];

export const MOTIVOS_COMPLEJOS: Motivo[] = [
  {
    id: "c60ff156-348d-4ffb-8309-af831d3c8c5d",
    nombre: "Liquidación sociedad conyugal",
    active: false,
  },
  {
    id: "de35cb10-a4e7-465e-815c-5c63eb7d89d4",
    nombre: "Cesión de derechos",
    active: false,
  },
  {
    id: "2a1de27c-9832-418b-af5f-06c884bccf19",
    nombre: "Traspaso sociedades",
    active: false,
  },
  {
    id: "0a21cf18-9b7e-4034-bba7-aaff9a26de58",
    nombre: "Cesión vehículos",
    active: false,
  },
];
