export interface CreditResponse {
    client:   Client;
    created:  number;
    creditId: string;
    status:   string;
    total:    number;
}

export interface Client {
    lastName:    string;
    name:        string;
    phoneNumber: string;
}
