import { Box, Chip, Typography } from '@mui/material';
import {
    Phone as PhoneIcon,
    CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { getDate } from '@/shared/utils/ProcessDataUtils';
import { StatusEnum } from '@/infrastructure/constants/credit/StatusEnum';
import { useCreditInformationTagStyle } from './CreditInformationTag.style';
import { getClientColorByStatus } from '@/shared/utils/ProcessStatusDataUtils';

export interface CreditInformationTagProps {
    phoneNumber: string;
    createdDate: number;
    status: StatusEnum;
}

const CreditInformationTag: React.FC<CreditInformationTagProps> = ({ 
    phoneNumber, 
    createdDate, 
    status 
}: CreditInformationTagProps) => {
    const classes = useCreditInformationTagStyle();
    return (
        <Box sx={{...classes.creditInformationTagContainer}}>
            <Box sx={{...classes.phoneNumberContainer}}>
                <PhoneIcon fontSize="medium" color="action" />
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                    {phoneNumber}
                </Typography>
            </Box>
            <Box sx={{...classes.createdDateContainer}}>
                <CalendarIcon fontSize="medium" color="action" />
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                    {getDate(createdDate)}
                </Typography>
            </Box>
            {/* Status chip movido aquí para mejor distribución */}
            <Box sx={{ flex: 'none' }}>
                <Chip
                    size="medium"
                    label={status || 'activo'}
                    sx={{...classes.statusChip(getClientColorByStatus(status as StatusEnum))}}
                />
            </Box>
        </Box>
    )
}

export default CreditInformationTag;
