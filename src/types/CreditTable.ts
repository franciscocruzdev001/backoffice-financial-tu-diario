export interface CreditTable {
    amountDue?:          number;
    amountPaid?:         number;
    chargePeriods?:      number;
    created:             number;
    creditId:            string;
    creditorCompanyId?:  string;
    customerBasicInfo?:  CustomerBasicInfo;
    employeeBasicInfo?:  EmployeeBasicInfo;
    endDate:             number;
    fixedCharge?:        number;
    lastName:            string;
    name:                string;
    renovationPeriod?:   number;
    startDate:           number;
    status:              string;
    total:               number;
    transactionStatus?:  string;
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

export interface EmployeeBasicInfo {
    fullName:    string;
    phoneNumber: string;
    userId:      string;
}
