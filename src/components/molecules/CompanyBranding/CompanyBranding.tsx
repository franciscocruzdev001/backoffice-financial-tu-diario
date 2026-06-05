import { fileRoutes } from '@/shared/constants/file_routes';
import { Box, Typography } from '@mui/material';
import React from 'react'
import { useCompanyBrandingStyle } from './CompanyBranding.style';

const CompanyBranding = () => {
    const classes = useCompanyBrandingStyle();
    return (
        <Box sx={{ ...classes.boxContainer }}>
            {/* Logo de la empresa */}
            <Box sx={{ ...classes.logoContainer }}>
                {/* Contenedor de la imagen simplificado */}
                <Box sx={{ mb: 3, position: 'relative' }}>
                    <Box
                        component="img"
                        src={fileRoutes.LOGO_EMPRESA}
                        alt="Logo de la empresa"
                        sx={{ ...classes.imageLogo }}
                    />
                </Box>
            </Box>

            {/* Tagline simplificado */}
            <Box sx={{ maxWidth: 480 }}>
                <Typography
                    variant="h5"
                    sx={{ ...classes.tittleTagline }}
                >
                    Gestión inteligente de tus clientes, crecimiento diario para tu negocio
                </Typography>

                <Typography
                    variant="h6"
                    sx={{ ...classes.complementTagline }}
                />
            </Box>
        </Box>
    )
}

export default CompanyBranding;