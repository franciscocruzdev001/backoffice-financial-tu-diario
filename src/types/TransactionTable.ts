export interface TransactionTable {
    _id?:       string;
    createdAt?: string;
    /**
     * Info del credito enlazado (creditInfo[0] del join en el backend): sirve para distinguir
     * en la tabla dos transacciones del mismo cliente/monto que apuntan a creditos distintos
     */
    creditBasicInfo?:    CreditBasicInfo;
    creditIdSource?:     string;
    creditorCompanyId?:  string;
    currency?:           string;
    customerBasicInfo?:  CustomerBasicInfo;
    description?:        string;
    destinationAccount?: DestinationAccountObject;
    sourceAccount?:      SourceAccountObject;
    status?:             string;
    total?:              number;
    transactionSubType?: string;
    transactionType?:    string;
    updatedAt?:          string;
}

/**
 * Info del credito enlazado (creditInfo[0] del join en el backend): sirve para distinguir
 * en la tabla dos transacciones del mismo cliente/monto que apuntan a creditos distintos
 */
export interface CreditBasicInfo {
    amountDue:  number;
    amountPaid: number;
    creditId:   string;
    total:      number;
}

export interface CustomerBasicInfo {
    address?:             string;
    customerId:           string;
    fullName:             string;
    phoneNumber:          string;
    threeWordsUbication?: string;
    ubication?:           Ubication;
}

export interface Ubication {
    latitude?:  string;
    longitude?: string;
}

export interface DestinationAccountObject {
    accountNumber?: string;
    walletId:       string;
    [property: string]: unknown;
}

export interface SourceAccountObject {
    accountNumber?: string;
    walletId:       string;
    [property: string]: unknown;
}
