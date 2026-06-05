import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDashboardHeaderStyle } from './DashboardHeader.style';

export interface DashboardHeaderStateProps {
    tittle: string;
}

export interface DashboardHeaderFunctionsProps {
    handleOnClick: (event?: object | any) => void,
}

export type DashboardHeaderProps = DashboardHeaderStateProps & DashboardHeaderFunctionsProps;


const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    tittle,
    handleOnClick
}: DashboardHeaderProps) => {
    const classes = useDashboardHeaderStyle();
    return (
        /* Dashboard header*/
        <Box sx={{ ...classes.headerContainer }}>
            <Typography variant="h4" sx={{ ...classes.headerTittle }}>
                {tittle}
            </Typography>
            <Box sx={{ ...classes.headerButtonContainer }}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleOnClick}
                    disabled={false}
                >
                    Actualizar
                </Button>
                <Typography variant="body2" color="text.secondary">
                    Última actualización: {new Date().toLocaleTimeString('es-MX')}
                </Typography>
            </Box>
        </Box>
    )
};

export default DashboardHeader;
