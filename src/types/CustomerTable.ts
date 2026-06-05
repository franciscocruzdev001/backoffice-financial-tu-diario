export interface CustomerTable {
    address:              string;
    created:              number;
    createdByEmployee:    EmployeeBasicInfo;
    customerId:           string;
    lastName:             string;
    name:                 string;
    phoneNumber:          string;
    status:               string;
    threeWordsUbication?: string;
}

export interface EmployeeBasicInfo {
    fullName:    string;
    phoneNumber: string;
}