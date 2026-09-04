import { StatusEnum } from "@/infrastructure/constants/credit/StatusEnum";
import { TransactionStatusEnum } from "@/infrastructure/constants/credit/TransactionStatusEnum";
import { ChipColorEnum } from "../constants/PropertiesEnumMuiComponets";
/*
*   Estatus dashboard
*/
    // ✅ Color hex para el Avatar del cliente en CreditInformationItem
    export const getClientColorByStatus = (status: StatusEnum) => {
        const colors = {
        [StatusEnum.CHARGE_PROCESS]: '#2196f3',
        [StatusEnum.SLOW_PAY]: '#f44336',
        [StatusEnum.PAID]: '#4caf50',
        [StatusEnum.RESTRUCTURED]: '#ff9800',
        };
        return colors[status] || '#1976d2';
    };

    // ✅ Color de MUI Chip para el status del crédito en la tabla (CreditCells)
    export const getCreditColorByStatus = (status: string): ChipColorEnum => {
        const colors: Record<string, ChipColorEnum> = {
        [StatusEnum.CHARGE_PROCESS]: ChipColorEnum.INFO,
        [StatusEnum.SLOW_PAY]: ChipColorEnum.ERROR,
        [StatusEnum.PAID]: ChipColorEnum.SUCCES,
        [StatusEnum.RESTRUCTURED]: ChipColorEnum.WARNING,
        };
        return colors[status] || ChipColorEnum.DEFAULT;
    };

    // ✅ Color de MUI Chip para el status de la transacción en la tabla (TransactionCells)
    export const getTransactionColorByStatus = (status: string): ChipColorEnum => {
        const colors: Record<string, ChipColorEnum> = {
        [TransactionStatusEnum.PENDING]: ChipColorEnum.WARNING,
        [TransactionStatusEnum.APPROVED]: ChipColorEnum.SUCCES,
        [TransactionStatusEnum.CANCELLED]: ChipColorEnum.ERROR,
        };
        return colors[status] || ChipColorEnum.DEFAULT;
    };

/*
*   Estatus filter
*/
    export const STATUS_CHIP_COLOR = (status: string): ChipColorEnum => {
        const colores = {
            Activo: ChipColorEnum.SUCCES,
            Inactivo: ChipColorEnum.ERROR,
            Pendiente: ChipColorEnum.WARNING,
            Suspendido: ChipColorEnum.DEFAULT,
        };
    
        return colores[status as keyof typeof colores] || ChipColorEnum.PRIMARY
    };
    
    export const MES_CHIP_COLOR = (mes: string) => {
        const colores = {
            Enero: "#1565c0", Febrero: "#6a1b9a", Marzo: "#2e7d32",
            Abril: "#e65100", Mayo: "#c62828", Junio: "#0277bd",
            Julio: "#f9a825", Agosto: "#00695c", Septiembre: "#4527a0",
            Octubre: "#558b2f", Noviembre: "#283593", Diciembre: "#c62828",
        };
        return colores[mes as keyof typeof colores] || "#1a1a2e";
    };