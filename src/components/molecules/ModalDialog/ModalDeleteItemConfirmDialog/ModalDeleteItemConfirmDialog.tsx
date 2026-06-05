import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import {
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useModalDeleteItemConfirmDialogStyle } from './ModalDeleteItemConfirmDialog.style';

export interface ModalDeleteItemConfirmDialogStateProps {
    open: boolean;
    loadingDeleteItem: boolean;
    item: {
        name:string;
        phoneNumber: string;
        address: string;
    }
}

export interface ModalDeleteItemConfirmDialogFunctionsProps {
    handleOnDeleteConfirm: (event?: object | any) => void;
    handleOnDeleteCancel: (event?: object | any) => void,
}

export type ModalDeleteItemConfirmDialogProps = ModalDeleteItemConfirmDialogStateProps & ModalDeleteItemConfirmDialogFunctionsProps;

const ModalDeleteItemConfirmDialog: React.FC<ModalDeleteItemConfirmDialogProps> = (props : ModalDeleteItemConfirmDialogProps) => {
    const classes = useModalDeleteItemConfirmDialogStyle();

    return (
        <Dialog open={props.open} onClose={props.handleOnDeleteCancel} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ ...classes.dialogHeader }}>
                <DeleteIcon color="error" />
                Confirmar Eliminación
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Typography variant="body1" gutterBottom>
                        ¿Estás seguro de que deseas eliminar el cliente?
                    </Typography>
                    <Box sx={{ ...classes.itemInfoContainer }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            {props.item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            📞 {props.item.phoneNumber}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            📍 {props.item.address}
                        </Typography>
                    </Box>
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        Esta acción no se puede deshacer. Se eliminará toda la información del cliente.
                    </Alert>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={props.handleOnDeleteCancel} disabled={props.loadingDeleteItem}>
                    Cancelar
                </Button>
                <Button
                    onClick={props.handleOnDeleteConfirm}
                    variant="contained"
                    color="error"
                    disabled={props.loadingDeleteItem}
                    startIcon={props.loadingDeleteItem ? <CircularProgress size={16} /> : <DeleteIcon />}
                >
                    {props.loadingDeleteItem ? 'Eliminando...' : 'Eliminar'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalDeleteItemConfirmDialog;