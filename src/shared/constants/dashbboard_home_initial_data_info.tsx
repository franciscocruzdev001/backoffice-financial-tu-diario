import { defaultTo } from "lodash";
import {
    People as PeopleIcon,
    AccountBalance as LoanIcon,
    Payment as PaymentIcon,
    Warning as WarningIcon,
    AttachMoney as MoneyIcon,
    Schedule as ScheduleIcon,
    CheckCircle as CheckIcon,
    Add as AddIcon,
    Visibility as ViewIcon,
} from '@mui/icons-material';
import { formatearMoneda } from "../utils/ProcessDataUtils";
import { IFinancialCardInfoItem } from "../interfaces/IFinancialCardInfoItem";
import { IFinancialButtonInfoItem } from "../interfaces/IFinancialButtonInfoItem";
import { ColorEnum } from "./PropertiesEnumMuiComponets";
import { CreditResponse } from "@/types/CreditResponse";
import { StatusEnum } from "@/infrastructure/constants/credit/StatusEnum";

const ALL_PERFORMANCE_METRICS: IFinancialCardInfoItem[] = [
    { tittle: () => "Total Clientes", subtittle: (value?: String) => `${defaultTo(value, "")} activos`, icon: <PeopleIcon fontSize="large" />, color: "#1e3c72", value: 1 },
    { tittle: () => "Préstamos Activos", subtittle: (value?: String) => `${defaultTo(value, "")} total`, icon: <LoanIcon fontSize="large" />, color: "#2a5298", value: 1 },
    { tittle: () => "Pagos Hoy", subtittle: (value?: String) => `${defaultTo(value, "")} completados`, icon: <PaymentIcon fontSize="large" />, color: "#4caf50", value: 1 },
    { tittle: () => "Alertas", subtittle: (value?: String) => `${defaultTo(value, "")} Requiere atencion`, icon: <WarningIcon fontSize="large" />, color: "#f44336", value: 1 }
];

const ALL_CHARGE_METRICS: IFinancialCardInfoItem[] = [
    { tittle: (value?: number) => `${formatearMoneda(defaultTo(value, 0))}`, subtittle: () => "Cobrado hoy", icon: <MoneyIcon color="success" sx={{ fontSize: 40, mb: 1 }} />, color: "#e8f5e8", secondaryColor: "success.main", value: 1 },
    { tittle: (value?: number) => `${formatearMoneda(defaultTo(value, 0))}`, subtittle: () => "Pendiente de cobro", icon: <ScheduleIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />, color: "#fff3e0", secondaryColor: "warning.main", value: 1 },
    { tittle: (value?: number) => `${defaultTo(value, 0)}%`, subtittle: () => "Tasa de exito", icon: <CheckIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />, color: "#f3e5f5", secondaryColor: "secondary.main", value: 1 }
];


export const ALL_QUICK_ACTIONS: IFinancialButtonInfoItem[] = [
    { tittle: "Nuevo Cliente", icon: <AddIcon />, color: ColorEnum.PRIMARY, variant: "contained" },
    { tittle: "Nuevo Préstamo", icon: <LoanIcon />, color: ColorEnum.SECONDARY, variant: "contained" },
    { tittle: "Gestionar Pagos", icon: <PaymentIcon />, color: ColorEnum.INFO, variant: "outlined" },
    { tittle: "Historial Clientes", icon: <ViewIcon />, color: ColorEnum.INFO, variant: "outlined" }
];


export const METRICS: { performanceMetrics: IFinancialCardInfoItem[], chargeMetrics: IFinancialCardInfoItem[] } = {
    performanceMetrics: ALL_PERFORMANCE_METRICS,
    chargeMetrics: ALL_CHARGE_METRICS
}

export const LAST_CREDITS: CreditResponse[] = [
    {
        creditId: "1234",
        created: 1774492409000,
        status: StatusEnum.CHARGE_PROCESS,
        total: 3000,
        client: {
            name: "Erick",
            lastName: "Manuel",
            phoneNumber: "9611234567"
        }
    },
    {
        creditId: "4321",
        created: 1774492409000,
        status: StatusEnum.PAID,
        total: 3000,
        client: {
            name: "Erick",
            lastName: "Manuel",
            phoneNumber: "9611234567"
        }
    },
    {
        creditId: "1423",
        created: 1774492409000,
        status: StatusEnum.RESTRUCTURED,
        total: 3000,
        client: {
            name: "Erick",
            lastName: "Manuel",
            phoneNumber: "9611234567"
        }
    },
    {
        creditId: "1324",
        created: 1774492409000,
        status: StatusEnum.STALLED,
        total: 3000,
        client: {
            name: "Erick",
            lastName: "Manuel",
            phoneNumber: "9611234567"
        }
    }
]