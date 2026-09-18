import React from 'react'
import DashboardHeader from '@/components/atoms/DashboardHeader/DashboardHeader';
import { useCreditsDashboardState } from './state/useCreditsDashboardState';
import CustomCard from '@/components/atoms/CustomCard/CustomCard';
import DashboardTable from '@/components/molecules/Table/DahsboardTable/DashboardTable';
import ModalDeleteItemConfirmDialog from '@/components/molecules/ModalDialog/ModalDeleteItemConfirmDialog/ModalDeleteItemConfirmDialog';
import SnackbarNotification from '@/components/molecules/SnackbarNotification/SnackbarNotification';
import { Box, Button, Fab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {
    Add as AddIcon,
    Badge as BadgeIcon
} from '@mui/icons-material';



const CreditsDashboardContainer = () => {
    const {
        dashboardHeaderProps,
        dashboardTableProps,
        snackbarNotificationProps,
        modalDeleteItemConfirmProps,
        generateCardButtonProps
    } = useCreditsDashboardState();
    const error: string = "esto es un mensaje de error de prueba, LIC TAPIAAAAAAAAAAA";

    return (
        <React.Fragment>
            {/* Client Header - Sustituir por DashboardHeader */}
            <DashboardHeader {...dashboardHeaderProps} />
            {/* Alert Message if exist error*/}

            {/* Selector de plantilla + botón de generar tarjeta, activo solo si hay al menos 1 crédito seleccionado */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel id="credit-card-template-label">Plantilla</InputLabel>
                    <Select
                        labelId="credit-card-template-label"
                        label="Plantilla"
                        value={generateCardButtonProps.selectedTemplateId}
                        onChange={(event: SelectChangeEvent) => generateCardButtonProps.onTemplateChange(event.target.value)}
                    >
                        {generateCardButtonProps.templateOptions.map((template) => (
                            <MenuItem key={template.id} value={template.id}>
                                {template.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<BadgeIcon />}
                    disabled={generateCardButtonProps.disabled}
                    onClick={generateCardButtonProps.onClick}
                >
                    {generateCardButtonProps.label}
                </Button>
            </Box>

             {/* Credits table whit information*/}
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

export default CreditsDashboardContainer;