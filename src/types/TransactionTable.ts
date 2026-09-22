import { CustomerBasicInfo } from './CreditTable';

export interface TransactionTable {
    _id?:                string;
    createdAt?:          string;
    creditBasicInfo?:    CreditBasicInfo;
    creditIdSource?:     string;
    currency?:           string;
    customerBasicInfo?:  CustomerBasicInfo;
    description?:        string;
    destinationAccount?: DestinationAccountObject;
    sourceAccount?:      SourceAccountObject;
    status?:             string;
    total?:              number;
    transactionType?:    string;
    updatedAt?:          string;
}

// Info del crédito enlazado (creditInfo[0] del join en el backend) — sirve
// para distinguir en la tabla dos transacciones del mismo cliente/monto que
// apuntan a créditos distintos (ver avance de pago y el id real del crédito).
export interface CreditBasicInfo {
    creditId:    string;
    total:       number;
    amountPaid:  number;
    amountDue:   number;
}

export interface DestinationAccountObject {
    accountNumber?: string;
    walletId:       string;
    [property: string]: any;
}

export interface SourceAccountObject {
    accountNumber?: string;
    walletId:       string;
    [property: string]: any;
}
