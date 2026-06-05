import { JSX } from "react";

export interface IFinancialCardInfoItem {
    tittle: (value?: number) => string;
    subtittle: (value?: string) => string;
    icon: JSX.Element  | any;
    color: string;
    secondaryColor?: string;
    value?: number;
}