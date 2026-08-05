export interface TransactionTable {
    _id?:                string;
    createdAt?:          string;
    creditIdSource?:     string;
    currency?:           string;
    description?:        string;
    destinationAccount?: DestinationAccountObject;
    sourceAccount?:      SourceAccountObject;
    status?:             string;
    total?:              number;
    transactionType?:    string;
    updatedAt?:          string;
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
