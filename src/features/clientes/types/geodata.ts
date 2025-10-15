export type Country = {
  code: string;
  country: string;
};

export interface Region {
  id: number;
  nombre: string;
  comunas: Comuna[];
}

export interface Comuna {
  id: number;
  nombre: string;
  region_id: number;
}
