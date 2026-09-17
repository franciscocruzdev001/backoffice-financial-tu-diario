export interface CreditTable {
    amountDue?:          number;
    amountPaid?:         number;
    created:             number;
    creditId:            string;
    creditorCompanyId?:  string;
    customerBasicInfo?:  CustomerBasicInfo;
    employeeBasicInfo?:  EmployeeBasicInfo;
    endDate:             number;
    lastName:            string;
    name:                string;
    startDate:           number;
    status:              string;
    total:               number;
    transactionStatus?:  string;
}

export interface CustomerBasicInfo {
    address?:    string;
    customerId:  string;
    fullName:    string;
    phoneNumber: string;
}

export interface EmployeeBasicInfo {
    fullName:    string;
    phoneNumber: string;
    userId:      string;
}
