export interface IDebtsRequest {
  bankId: number;
  documentClient: string;
  ipoc: string;
  debtValue: number;
  debtOrigin: number;
  debtType: string;
  dateDebt: Date;
}
