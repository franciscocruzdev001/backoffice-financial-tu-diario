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
import {
    CheckCircle as CheckCircleIcon,
    ErrorOutline as ErrorOutlineIcon,
    Cancel as CancelIcon,
    Payments as PaymentsIcon,
} from '@mui/icons-material';
import { TRANSACTION_TYPE_DISPLAY } from '@/shared/constants/catalogs/transaction_type.catalog';
import type { TransactionTypeTotal } from '@/components/molecules/ModalDialog/ModalApproveTransactionsDialog/ModalApproveTransactionsDialog';
import type { TransactionChangeStatusBatchLogs } from '@/types/TransactionChangeStatusBatchLogs';

export interface ModalRejectTransactionsDialogStateProps {
    open: boolean;
    transactionsCount: number;
    totalsByType: TransactionTypeTotal[];
    loading: boolean;
    // Mismo patrón que ModalApproveTransactionsDialog: mientras haya result o
    // error, el modal se queda mostrando el resumen en vez de cerrarse solo.
    result: TransactionChangeStatusBatchLogs | null;
    error: string | null;
}

export interface ModalRejectTransactionsDialogFunctionsProps {
    onConfirm: () => void;
    onCancel: () => void;
    onClose: () => void;
    onExited: () => void;
}

export type ModalRejectTransactionsDialogProps = ModalRejectTransactionsDialogStateProps & ModalRejectTransactionsDialogFunctionsProps;

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

const ModalRejectTransactionsDialog: React.FC<ModalRejectTransactionsDialogProps> = ({
    open,
    transactionsCount,
    totalsByType,
    loading,
    result,
    error,
    onConfirm,
    onCancel,
    onClose,
    onExited,
}) => {
    const showResult = Boolean(result || error);

    // totalChangeStatusApproved/Rejected en el backend son sumas de monto, no
    // conteos — para cancelar, "Approved" = sí se pudo cancelar y "Rejected" =
    // no se pudo (mismo shape que approve, el backend reusa los mismos campos).
    const cancelledCount = (result?.resumeTotalsByTransactionType ?? []).reduce(
        (acc, item) => acc + item.transactionsChangeStatusApproved.length, 0
    );
    const notCancelledCount = (result?.resumeTotalsByTransactionType ?? []).reduce(
        (acc, item) => acc + item.transactionsChangeStatusRejected.length, 0
    );
    const hasPartialFailures = !error && notCancelledCount > 0;

    return (
        <Dialog
            open={open}
            onClose={showResult ? onClose : onCancel}
            maxWidth="sm"
            fullWidth
            slotProps={{ transition: { onExited } }}
        >
            <DialogTitle sx={{ fontWeight: 700 }}>
                {showResult ? 'Resultado del rechazo' : 'Confirmar rechazo'}
            </DialogTitle>

            <DialogContent>
                {showResult ? (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                backgroundColor: error ? 'error.light' : hasPartialFailures ? 'warning.light' : 'success.light',
                                color: error ? 'error.contrastText' : hasPartialFailures ? 'warning.contrastText' : 'success.contrastText',
                                borderRadius: 2,
                                p: 1.5,
                                mb: 2,
                            }}
                        >
                            {error || hasPartialFailures ? <ErrorOutlineIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                            <Typography variant="body2">
                                {error
                                    ? error
                                    : `Se rechazaron ${cancelledCount} de ${cancelledCount + notCancelledCount} ${cancelledCount + notCancelledCount === 1 ? 'transacción' : 'transacciones'}.`}
                            </Typography>
                        </Box>

                        {!error && (
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                {(result?.resumeTotalsByTransactionType ?? []).map((item) => {
                                    const config = TRANSACTION_TYPE_DISPLAY[item.transactionType];
                                    const Icon = config?.icon ?? PaymentsIcon;
                                    const color = config?.color ?? '#1976D2';

                                    return (
                                        <Box
                                            key={item.transactionType}
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
                                                <Typography sx={{ fontWeight: 700 }}>{config?.label ?? item.transactionType}</Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.transactionsChangeStatusApproved.length} {item.transactionsChangeStatusApproved.length === 1 ? 'rechazada' : 'rechazadas'}
                                                {item.transactionsChangeStatusRejected.length > 0 && ` · ${item.transactionsChangeStatusRejected.length} no se pudo${item.transactionsChangeStatusRejected.length === 1 ? '' : 'n'} rechazar`}
                                            </Typography>
                                            <Typography sx={{ fontWeight: 700, color }}>
                                                {formatCurrency(item.totalChangeStatusApproved)}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        )}
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                {showResult ? (
                    <Button variant="contained" onClick={onClose}>
                        Cerrar
                    </Button>
                ) : (
                    <>
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
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ModalRejectTransactionsDialog;
