import { Box, Typography } from "@mui/material";
import {
    Person as PersonIcon
} from '@mui/icons-material';

const EmptyDashboardTable = () => {
    return (
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
            <PersonIcon sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
                No se encontro ninguna coincidencia
            </Typography>
            <Typography>
                Haz clic en el botón "+" para agregrar un registro
            </Typography>
        </Box>
    )
}

export default EmptyDashboardTable;