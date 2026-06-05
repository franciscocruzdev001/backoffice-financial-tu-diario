import { JSX } from "react";
import { ColorEnum } from "../constants/PropertiesEnumMuiComponets";

export interface IFinancialButtonInfoItem {
    tittle: string;
    icon: JSX.Element  | any;
    color: ColorEnum;
    variant: 'text' | 'outlined' | 'contained';
}