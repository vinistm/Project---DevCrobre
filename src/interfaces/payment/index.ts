export interface IPayment {
    cash_payment: boolean;
    installments: boolean;
    entry_installments:boolean;
    entry: number;
    installments_times:number;
    values_installments:number;
}