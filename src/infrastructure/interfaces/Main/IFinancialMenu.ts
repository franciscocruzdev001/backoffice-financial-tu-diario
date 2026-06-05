import { JSX } from "react";

export interface IFinancialMenuItem {
    componenteId?: string;
    tittle: string;
    icon: JSX.Element | any;
    subtittle?: string;
    path?: string;
    financialSubmenuItems?: IFinancialMenuItem[];
}