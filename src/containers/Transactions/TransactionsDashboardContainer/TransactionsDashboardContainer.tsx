import CustomCard from '@/components/atoms/CustomCard/CustomCard';
import { Alert, Box, Button, Fab } from '@mui/material';
import React from 'react'
import {
    Add as AddIcon,
    CheckCircle as CheckCircleIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import DashboardHeader from '@/components/atoms/DashboardHeader/DashboardHeader';
import IconButton from '@/components/atoms/IconButton/IconButton';
import DashboardTable from '@/components/molecules/Table/DahsboardTable/DashboardTable';
import ModalDeleteItemConfirmDialog from '@/components/molecules/ModalDialog/ModalDeleteItemConfirmDialog/ModalDeleteItemConfirmDialog';
import SnackbarNotification from '@/components/molecules/SnackbarNotification/SnackbarNotification';
import { useTransactionsDashboardState } from './state/useTransactionsDashboardState';
import ModalApproveTransactionsDialog from '@/components/molecules/ModalDialog/ModalApproveTransactionsDialog/ModalApproveTransactionsDialog';
import ModalPreviewTransactionsDialog from '@/components/molecules/ModalDialog/ModalPreviewTransactionsDialog/ModalPreviewTransactionsDialog';
import ModalRejectTransactionsDialog from '@/components/molecules/ModalDialog/ModalRejectTransactionsDialog/ModalRejectTransactionsDialog';
import CancelIcon from '@mui/icons-material/Cancel';

const TransactionsDashboardContainer = () => {
    const {
        dashboardHeaderProps,
        dashboardTableProps,
        snackbarNotificationProps,
        modalDeleteItemConfirmProps,
        approveTransactionsButtonProps,
        rejectTransactionsButtonProps,
        previewTransactionsButtonProps,
        modalApproveTransactionsProps,
        modalPreviewTransactionsProps,
        modalRejectTransactionsProps,
    } = useTransactionsDashboardState();
    const error: string = "esto es un mensaje de error de prueba, LIC TAPIAAAAAAAAAAA";

    return (
        <React.Fragment>
            {/* Client Header - Sustituir por DashboardHeader */}
            <DashboardHeader {...dashboardHeaderProps} />
            {/* Alert Message if exist error*/}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}
            {/* Botón de aprobar, activo solo si hay al menos 1 seleccionado */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1.5, mb: 2 }}>
                {previewTransactionsButtonProps.visible && (
                    <IconButton
                        tooltip="Vista previa de la selección"
                        handleOnClick={previewTransactionsButtonProps.onClick}
                    >
                        <VisibilityIcon />
                    </IconButton>
                )}
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<CancelIcon />}
                    disabled={rejectTransactionsButtonProps.disabled}
                    onClick={rejectTransactionsButtonProps.onClick}
                >
                    {rejectTransactionsButtonProps.label}
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleIcon />}
                    disabled={approveTransactionsButtonProps.disabled}
                    onClick={approveTransactionsButtonProps.onClick}
                >
                    {approveTransactionsButtonProps.label}
                </Button>
            </Box>
            {/* Clients table whit information*/}
            <CustomCard>
                {/* Refactorizar esto debe ser un children lo demas es estatico para las demas entidades */}
                <DashboardTable {...dashboardTableProps} />
            </CustomCard>
            {/* Dialog to confirm delete item selected*/}
            <ModalDeleteItemConfirmDialog {...modalDeleteItemConfirmProps} />
            {/* Dialog to confirm transacction item selected*/}
            <ModalApproveTransactionsDialog {...modalApproveTransactionsProps} />
            {/* Dialog with the read-only preview of the current selection totals */}
            <ModalPreviewTransactionsDialog {...modalPreviewTransactionsProps} />
            {/* Dialog to confirm reject of the transactions selected */}
            <ModalRejectTransactionsDialog {...modalRejectTransactionsProps} />
            {/* Dialog to confirm edit item selected - PENDING*/}
            {/* Add new customer button */}
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => console.log('/clientes/nuevo')}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                }}
            >
                <AddIcon />
            </Fab>
            {/* Snackbars pop-up notification */}
            <SnackbarNotification {...snackbarNotificationProps} />
        </React.Fragment>
    )
}

export default TransactionsDashboardContainer;