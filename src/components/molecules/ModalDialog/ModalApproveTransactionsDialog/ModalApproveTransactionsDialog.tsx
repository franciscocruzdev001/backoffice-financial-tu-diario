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
    Payments as PaymentsIcon,
} from '@mui/icons-material';
import { TRANSACTION_TYPE_DISPLAY } from '@/shared/constants/catalogs/transaction_type.catalog';
import type { TransactionChangeStatusBatchLogs } from '@/types/TransactionChangeStatusBatchLogs';

export interface TransactionTypeTotal {
    transactionType: string;
    count: number;
    total: number;
}

export interface ModalApproveTransactionsDialogStateProps {
    open: boolean;
    transactionsCount: number;
    totalsByType: TransactionTypeTotal[];
    loading: boolean;
    // Resultado de la aprobación ya resuelto por el backend — mientras esté
    // presente (junto con `error`), el modal se queda mostrando el resumen
    // en vez de cerrarse solo; el usuario decide cuándo cerrarlo.
    result: TransactionChangeStatusBatchLogs | null;
    error: string | null;
}

export interface ModalApproveTransactionsDialogFunctionsProps {
    onConfirm: () => void;
    onCancel: () => void;
    // Cierra el modal una vez que el usuario ya vio el resumen (éxito o error).
    // Solo dispara la animación de salida — result/error se quedan como están
    // para que el contenido no cambie a media transición.
    onClose: () => void;
    // Se dispara cuando la animación de salida YA terminó — aquí es seguro
    // limpiar result/error (si se limpiaran en onClose, el modal alcanzaría a
    // mostrar por un instante la vista de confirmación de vuelta mientras se
    // desvanece, porque showResult pasaría a false antes de que termine el fade-out).
    onExited: () => void;
}

export type ModalApproveTransactionsDialogProps = ModalApproveTransactionsDialogStateProps & ModalApproveTransactionsDialogFunctionsProps;

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

const ModalApproveTransactionsDialog: React.FC<ModalApproveTransactionsDialogProps> = ({
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

    // totalChangeStatusApproved/Rejected en el backend son sumas de monto
    // (amountTransaction), no conteos — para contar transacciones hay que
    // usar el largo de los arrays transactionsChangeStatus...
    const approvedCount = (result?.resumeTotalsByTransactionType ?? []).reduce(
        (acc, item) => acc + item.transactionsChangeStatusApproved.length, 0
    );
    const rejectedCount = (result?.resumeTotalsByTransactionType ?? []).reduce(
        (acc, item) => acc + item.transactionsChangeStatusRejected.length, 0
    );
    const hasPartialRejections = !error && rejectedCount > 0;

    return (
        <Dialog
            open={open}
            onClose={showResult ? onClose : onCancel}
            maxWidth="sm"
            fullWidth
            slotProps={{ transition: { onExited } }}
        >
            <DialogTitle sx={{ fontWeight: 700 }}>
                {showResult ? 'Resultado de la aprobación' : 'Confirmar aprobación'}
            </DialogTitle>

            <DialogContent>
                {showResult ? (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                backgroundColor: error ? 'error.light' : hasPartialRejections ? 'warning.light' : 'success.light',
                                color: error ? 'error.contrastText' : hasPartialRejections ? 'warning.contrastText' : 'success.contrastText',
                                borderRadius: 2,
                                p: 1.5,
                                mb: 2,
                            }}
                        >
                            {error || hasPartialRejections ? <ErrorOutlineIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                            <Typography variant="body2">
                                {error
                                    ? error
                                    : `Se aprobaron ${approvedCount} de ${approvedCount + rejectedCount} ${approvedCount + rejectedCount === 1 ? 'transacción' : 'transacciones'}.`}
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
                                                {item.transactionsChangeStatusApproved.length} {item.transactionsChangeStatusApproved.length === 1 ? 'aprobada' : 'aprobadas'}
                                                {item.transactionsChangeStatusRejected.length > 0 && ` · ${item.transactionsChangeStatusRejected.length} rechazada${item.transactionsChangeStatusRejected.length === 1 ? '' : 's'}`}
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
                                Estás a punto de aprobar las siguientes {transactionsCount === 1 ? 'transacción' : 'transacciones'}. Esta acción no se puede deshacer.
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
                            color="success"
                            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <CheckCircleIcon />}
                            onClick={onConfirm}
                            disabled={loading}
                        >
                            {loading ? 'Aprobando...' : 'Aprobar'}
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ModalApproveTransactionsDialog;
