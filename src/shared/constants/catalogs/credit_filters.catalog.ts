import { StatusEnum } from "@/infrastructure/constants/credit/StatusEnum";
import { TransactionStatusEnum } from "@/infrastructure/constants/credit/TransactionStatusEnum"; 

// Labels visibles en el modal -> valor real que espera el backend
export const CREDIT_STATUS_OPTIONS: Record<string, string> = {
    "En proceso de cobro": StatusEnum.CHARGE_PROCESS,
    "Pago lento": StatusEnum.SLOW_PAY,
    "Pagado": StatusEnum.PAID,
    "Reestructurado": StatusEnum.RESTRUCTURED,
};

export const TRANSACTION_STATUS_OPTIONS: Record<string, string> = {
    "Pendiente": TransactionStatusEnum.PENDING,
    "Aprobada": TransactionStatusEnum.APPROVED,
    "Cancelada": TransactionStatusEnum.CANCELLED,
};

// Mapa inverso, útil para mostrar labels legibles en la tabla (chip de status)
export const CREDIT_STATUS_LABELS: Record<string, string> = Object.fromEntries(
    Object.entries(CREDIT_STATUS_OPTIONS).map(([label, value]) => [value, label])
);