export interface IAgreementRequest {
    agreedValue: number;
    dateAgree: Date;
    status: boolean;
    debts: number;
    bank: string;
    client: string;
    user: string;
    formOfPayment: number;
}
export interface IAgreementReturn {
    id: number;
    dateAgree: Date;
    status: boolean;
    debts: number;
    bank: number;
    client: number;
    formOfPayment: number;
}

export interface IAgreementUpdate {
    id: number;
    agreedValue: number;
    dateAgree: Date;
    status: boolean;
}