export type Credentials = {
  username: string;
  password: string;
};

export type AuthAPIData = {
  access_token: string;
  id_cliente: string;
  id_defensoria: string;
  primer_nombre: string;
  token: string;
};

export type AuthAPIResponse = {
  success: boolean;
  data?: AuthAPIData;
  error?: string;
};
