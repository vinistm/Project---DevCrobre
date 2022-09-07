export interface IClientRequest {
  document: string;
  name: string;
  type: string;
}

export interface IClientInfoRequest {
  telephone: number;
  email: string;
}

export interface IClientInfo {
  document: string;
  name: string;
  type: string;
  infos: object;
}

export interface IInfoClient {
  document: string;
  body: { telephone?: number; email?: string };
}
