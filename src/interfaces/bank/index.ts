export interface IBankRequest {
  name: string;
  status: boolean;
}

export interface IBankInfo {
  telephone: number;
  email: string;
  bank: number;
}

export interface IBankInfoOf {
  id: string;
  body: {
    telephone?: number;
    email?: string;
  };
}
