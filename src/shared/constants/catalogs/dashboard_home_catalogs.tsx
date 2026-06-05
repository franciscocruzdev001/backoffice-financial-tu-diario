import { IFinancialCardInfoItem } from "@/shared/interfaces/IFinancialCardInfoItem";
import { formatearMoneda } from "@/shared/utils/ProcessDataUtils";
import {
    People as PeopleIcon,
    AccountBalance as LoanIcon,
    Payment as PaymentIcon,
    Warning as WarningIcon,
    AttachMoney as MoneyIcon,
    Schedule as ScheduleIcon,
    CheckCircle as CheckIcon
} from '@mui/icons-material';
import { defaultTo } from "lodash";

export enum DashboardHomeCatalogEnum {
    performanceMetrics = "performanceMetrics",
    chargeMetrics = "chargeMetrics",
}

export const DashboardHomeCatalog: Record<string, IFinancialCardInfoItem[]> = {
    [DashboardHomeCatalogEnum.performanceMetrics]: [
        { tittle: () => "Total Clientes", subtittle: (value?: String) => `${defaultTo(value, "")} activos`, icon: <PeopleIcon fontSize="large" />, color: "#1e3c72", value: 1 },
        { tittle: () => "Préstamos Activos", subtittle: (value?: String) => `${defaultTo(value, "")} total`, icon: <LoanIcon fontSize="large" />, color: "#2a5298", value: 1 },
        { tittle: () => "Pagos Hoy", subtittle: (value?: String) => `${defaultTo(value, "")} completados`, icon: <PaymentIcon fontSize="large" />, color: "#4caf50", value: 1 },
        { tittle: () => "Alertas", subtittle: (value?: String) => `${defaultTo(value, "")} Requiere atencion`, icon: <WarningIcon fontSize="large" />, color: "#f44336", value: 1 }
    ],
    [DashboardHomeCatalogEnum.chargeMetrics]: [
        { tittle: (value?: number) => `${formatearMoneda(defaultTo(value, 0))}`, subtittle: () => "Cobrado hoy", icon: <MoneyIcon color="success" sx={{ fontSize: 40, mb: 1 }} />, color: "#e8f5e8", secondaryColor: "success.main", value: 1 },
        { tittle: (value?: number) => `${formatearMoneda(defaultTo(value, 0))}`, subtittle: () => "Pendiente de cobro", icon: <ScheduleIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />, color: "#fff3e0", secondaryColor: "warning.main", value: 1 },
        { tittle: (value?: number) => `${defaultTo(value, 0)}%`, subtittle: () => "Tasa de exito", icon: <CheckIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />, color: "#f3e5f5", secondaryColor: "secondary.main", value: 1 }
    ]
}