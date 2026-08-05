import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box,
    Divider,
    Button,
    CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export interface CurrencyTotal {
    currency: string;
    total: number;
}

export interface ModalApproveTransactionsDialogProps {
    open: boolean;
    transactionsCount: number;
    totalsByCurrency: CurrencyTotal[];
    loading: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const formatCurrency = (amount: number, currency: string) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency }).format(amount);

const ModalApproveTransactionsDialog: React.FC<ModalApproveTransactionsDialogProps> = ({
    open,
    transactionsCount,
    totalsByCurrency,
    loading,
    onConfirm,
    onCancel,
}) => {
    return (
        <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>Confirmar aprobación</DialogTitle>

            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Estás a punto de aprobar las siguientes transacciones. Esta acción no se puede deshacer.
                </Typography>

                <Box
                    sx={{
                        backgroundColor: 'action.hover',
                        borderRadius: 2,
                        p: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Transacciones seleccionadas
                        </Typography>
                        <Typography sx={{ fontWeight: 700 }}>{transactionsCount}</Typography>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    {totalsByCurrency.map(({ currency, total }) => (
                        <Box
                            key={currency}
                            sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Total aprobado ({currency})
                            </Typography>
                            <Typography sx={{ fontWeight: 700, color: 'success.main' }}>
                                {formatCurrency(total, currency)}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5 }}>
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
                    {loading ? 'Aprobando...' : 'Confirmar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalApproveTransactionsDialog;