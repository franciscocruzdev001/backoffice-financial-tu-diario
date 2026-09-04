import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box,
    Button,
    CircularProgress,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Cancel as CancelIcon, Payments as PaymentsIcon } from '@mui/icons-material';
import { TRANSACTION_TYPE_DISPLAY } from '@/shared/constants/catalogs/transaction_type.catalog';
import type { TransactionTypeTotal } from '@/components/molecules/ModalDialog/ModalApproveTransactionsDialog/ModalApproveTransactionsDialog';

export interface ModalRejectTransactionsDialogStateProps {
    open: boolean;
    transactionsCount: number;
    totalsByType: TransactionTypeTotal[];
    loading: boolean;
}

export interface ModalRejectTransactionsDialogFunctionsProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export type ModalRejectTransactionsDialogProps = ModalRejectTransactionsDialogStateProps & ModalRejectTransactionsDialogFunctionsProps;

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

const ModalRejectTransactionsDialog: React.FC<ModalRejectTransactionsDialogProps> = ({
    open,
    transactionsCount,
    totalsByType,
    loading,
    onConfirm,
    onCancel,
}) => {
    return (
        <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>Confirmar rechazo</DialogTitle>

            <DialogContent>
                <Box
                    sx={{
                        backgroundColor: 'warning.light',
                        color: 'warning.contrastText',
                        borderRadius: 2,
                        p: 1.5,
                        mb: 2,
                    }}
                >
                    <Typography variant="body2">
                        Estás a punto de rechazar las siguientes {transactionsCount === 1 ? 'transacción' : 'transacciones'}. Esta acción no se puede deshacer.
                    </Typography>
                </Box>

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
                <Button onClick={onCancel} disabled={loading}>
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <CancelIcon />}
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading ? 'Rechazando...' : 'Rechazar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalRejectTransactionsDialog;
