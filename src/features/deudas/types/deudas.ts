export type Deuda = {
  id?: number;
  id_cliente: string;
  tipo: string;
  id_acreedor: string;
  monto: number;
};

export interface ResponseDeuda extends Omit<Deuda, "id_acreedor"> {
  id_acreedor: number;
}

export type Acreedor = {
  id: number;
  nombre: string;
};
