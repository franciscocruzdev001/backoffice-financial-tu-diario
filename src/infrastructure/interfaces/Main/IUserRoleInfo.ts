import { IFinancialMenuItem } from "./IFinancialMenu";

export interface IUserRoleInfo {
    fullName: string;
    firstName: string;
    lastName: string;
    userName: string;
    financialMenuItems: IFinancialMenuItem[];
    //Processar variables de session
}