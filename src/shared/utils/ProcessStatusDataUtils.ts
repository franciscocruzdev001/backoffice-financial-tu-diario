import { StatusEnum } from "@/infrastructure/constants/credit/StatusEnum";
import { ChipColorEnum } from "../constants/PropertiesEnumMuiComponets";
/*
*   Estatus dashboard
*/
    // ✅ Función para obtener el color del status del cliente; status: "activo" | "moroso" | "bloqueado" | "renovacion"
    export const getClientColorByStatus = (status: StatusEnum) => {
        const colors = {
        [StatusEnum.CHARGE_PROCESS]: '#2196f3',
        [StatusEnum.PAID]: '#4caf50',
        [StatusEnum.RESTRUCTURED]: '#ff9800',
        [StatusEnum.STALLED]: '#f44336'
        };
        return colors[status] || '#1976d2';
    };

    export const getCreditColorByStatus = (status: string) => {
        const colors: any = {
        activo: 'success',
        moroso: 'error',
        bloqueado: 'warning',
        renovacion: 'info'
        };
        return colors[status] || 'default';
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