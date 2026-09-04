import {
    Savings,
    SwapHoriz,
    CreditCard,
    Payments,
    MoneyOff,
} from '@mui/icons-material';
import type { SvgIconComponent } from '@mui/icons-material';

export interface TransactionTypeDisplay {
    label: string;
    icon: SvgIconComponent;
    color: string;
}

// Label, ícono y color de acento visibles para cada transactionType real
// (backend) — usado en los modales de vista previa / confirmar aprobación
// de transacciones. Mismo criterio que MES_CHIP_COLOR (color fijo por
// categoría, no ligado al theme.palette).
export const TRANSACTION_TYPE_DISPLAY: Record<string, TransactionTypeDisplay> = {
    deposit: { label: 'Depósitos', icon: Savings, color: '#1E88E5' },
    transfer: { label: 'Transferencias', icon: SwapHoriz, color: '#00ACC1' },
    credit: { label: 'Créditos', icon: CreditCard, color: '#3949AB' },
    payment: { label: 'Pagos', icon: Payments, color: '#8E24AA' },
    withdrawal: { label: 'Retiros', icon: MoneyOff, color: '#E65100' },
};
