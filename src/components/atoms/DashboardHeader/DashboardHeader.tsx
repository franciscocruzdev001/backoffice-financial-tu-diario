import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDashboardHeaderStyle } from './DashboardHeader.style';

export interface DashboardHeaderStateProps {
    tittle: string;
    count?: number;
}

export interface DashboardHeaderFunctionsProps {
    handleOnClick: (event?: object | any) => void,
}

export type DashboardHeaderProps = DashboardHeaderStateProps & DashboardHeaderFunctionsProps;


const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    tittle,
    count,
    handleOnClick
}: DashboardHeaderProps) => {
    const classes = useDashboardHeaderStyle();
    return (
        /* Dashboard header*/
        <Box sx={{ ...classes.headerContainer }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant="h4" sx={{ ...classes.headerTittle }}>
                    {tittle}
                </Typography>
                {count !== undefined && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 40,
                            height: 32,
                            px: 1.5,
                            borderRadius: 999,
                            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                            boxShadow: '0 2px 8px rgba(30, 60, 114, 0.3)',
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{ color: '#fff', fontWeight: 700, lineHeight: 1 }}
                        >
                            {count}
                        </Typography>
                    </Box>
                )}
            </Box>
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
