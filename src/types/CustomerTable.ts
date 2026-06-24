export interface CustomerTable {
    _id?:                 string;
    address:              string;
    created:              number;
    createdByEmployee:    EmployeeBasicInfo;
    createdByEmployeeId?: string;
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
