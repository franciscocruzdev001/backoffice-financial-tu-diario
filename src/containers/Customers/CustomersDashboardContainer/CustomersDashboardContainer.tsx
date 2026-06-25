import CustomCard from '@/components/atoms/CustomCard/CustomCard';
import { Alert, Fab } from '@mui/material';
import React from 'react'
import {
    Add as AddIcon
} from '@mui/icons-material';
import DashboardHeader from '@/components/atoms/DashboardHeader/DashboardHeader';
import DashboardTable from '@/components/molecules/Table/DahsboardTable/DashboardTable';
import ModalDeleteItemConfirmDialog from '@/components/molecules/ModalDialog/ModalDeleteItemConfirmDialog/ModalDeleteItemConfirmDialog';
import { useCustomersDashboardState } from './state/useCustomersDashboardState';
import SnackbarNotification from '@/components/molecules/SnackbarNotification/SnackbarNotification';
import EmptyDashboardTable from '@/components/molecules/Table/EmptyDashboardTable/EmptyDashboardTable';

const CustomersDashboardContainer = () => {
    const {
        dashboardHeaderProps,
        dashboardTableProps,
        snackbarNotificationProps,
        modalDeleteItemConfirmProps
    } = useCustomersDashboardState();
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
            {/* Clients table whit information*/}
            <CustomCard>
                {/* Refactorizar esto debe ser un children lo demas es estatico para las demas entidades */}
                <DashboardTable {...dashboardTableProps} />
            </CustomCard>
            {/* Dialog to confirm delete item selected*/}
            <ModalDeleteItemConfirmDialog {...modalDeleteItemConfirmProps} />
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

export default CustomersDashboardContainer;