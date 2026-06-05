import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions, DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField
} from '@mui/material';
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon
} from '@mui/icons-material';
import { Control, FieldErrors, FieldValues } from 'react-hook-form';

// Refactorizacion - no aplica con tabs y control

export interface ModalEditItemConfirmDialogStateProps {
    open: boolean;
    loadingEditItem: boolean;
    control: Control<FieldValues | any, object>;
    errors: FieldErrors<object>;
}

export interface ModalEditItemConfirmDialogFunctionsProps {
    handleOnEditConfirm: (event?: object | any) => void;
    handleOnEditCancel: (event?: object | any) => void,
}

export type ModalEditItemConfirmDialogProps = ModalEditItemConfirmDialogStateProps & ModalEditItemConfirmDialogFunctionsProps;

const ModalEditItemConfirmDialog: React.FC<ModalEditItemConfirmDialogProps> = (props: ModalEditItemConfirmDialogProps) => {
/*
    return (
        <Dialog open={props.open} onClose={props.handleOnEditCancel} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EditIcon color="primary" />
                Editar Cliente
            </DialogTitle>
            <DialogContent>
                {clienteToEdit && (
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={3}>
                            <Grid sx={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Nombre Completo"
                                    value={editFormData.nombre}
                                    onChange={(e) => handleEditChange('nombre', e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid sx={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Teléfono"
                                    value={editFormData.telefono}
                                    onChange={(e) => handleEditChange('telefono', e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid sx={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Dirección"
                                    value={editFormData.direccion}
                                    onChange={(e) => handleEditChange('direccion', e.target.value)}
                                    multiline
                                    rows={2}
                                    required
                                />
                            </Grid>
                            <Grid sx={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Status"
                                    value={editFormData.status}
                                    onChange={(e) => handleEditChange('status', e.target.value)}
                                >
                                    <MenuItem value="activo">Activo</MenuItem>
                                    <MenuItem value="moroso">Moroso</MenuItem>
                                    <MenuItem value="bloqueado">Bloqueado</MenuItem>
                                    <MenuItem value="renovacion">Renovación</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid sx={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Trabajador Asignado"
                                    value={editFormData.trabajadorAsignado}
                                    onChange={(e) => handleEditChange('trabajadorAsignado', e.target.value)}
                                >
                                    <MenuItem value="">Sin asignar</MenuItem>
                                    {trabajadoresOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button
                    onClick={handleEditCancel}
                    disabled={updating}
                    startIcon={<CancelIcon />}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleEditSubmit}
                    variant="contained"
                    disabled={updating || !editFormData.nombre || !editFormData.telefono}
                    startIcon={updating ? <CircularProgress size={16} /> : <SaveIcon />}
                    sx={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}
                >
                    {updating ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
            </DialogActions>
        </Dialog>
    )
*/
    return (
        <div>ModalEditItemConfirmDialog</div>
    )
}

export default ModalEditItemConfirmDialog;