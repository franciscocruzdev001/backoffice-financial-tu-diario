import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box,
    Button,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Description as DescriptionIcon, Payments as PaymentsIcon } from '@mui/icons-material';
import { TRANSACTION_TYPE_DISPLAY } from '@/shared/constants/catalogs/transaction_type.catalog';
import type { TransactionTypeTotal } from '@/components/molecules/ModalDialog/ModalApproveTransactionsDialog/ModalApproveTransactionsDialog';

export interface ModalPreviewTransactionsDialogStateProps {
    open: boolean;
    totalsByType: TransactionTypeTotal[];
}

export interface ModalPreviewTransactionsDialogFunctionsProps {
    onClose: () => void;
}

export type ModalPreviewTransactionsDialogProps = ModalPreviewTransactionsDialogStateProps & ModalPreviewTransactionsDialogFunctionsProps;

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

const ModalPreviewTransactionsDialog: React.FC<ModalPreviewTransactionsDialogProps> = ({
    open,
    totalsByType,
    onClose,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }}>
                <DescriptionIcon color="primary" />
                Vista previa de la selección
            </DialogTitle>

            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Totales de las transacciones seleccionadas en esta vista.
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    {totalsByType.map(({ transactionType, count, total }) => {
                        const config = TRANSACTION_TYPE_DISPLAY[transactionType];
                        const Icon = config?.icon ?? PaymentsIcon;
                        const color = config?.color ?? '#1976D2';

                        return (
                            <Box
                                key={transactionType}
                                sx={{
                                    backgroundColor: alpha(color, 0.12),
                                    border: '1px solid',
                                    borderColor: alpha(color, 0.35),
                                    borderRadius: 2,
                                    p: 2,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            backgroundColor: alpha(color, 0.15),
                                            color,
                                        }}
                                    >
                                        <Icon fontSize="small" />
                                    </Box>
                                    <Typography sx={{ fontWeight: 700 }}>{config?.label ?? transactionType}</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {count} {count === 1 ? 'seleccionada' : 'seleccionadas'}
                                </Typography>
                                <Typography sx={{ fontWeight: 700, color }}>
                                    {formatCurrency(total)}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button variant="contained" onClick={onClose}>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalPreviewTransactionsDialog;
