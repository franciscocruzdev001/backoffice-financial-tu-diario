import { Avatar, Box, Typography } from '@mui/material';
import { formatearMoneda, getIniciales } from '@/shared/utils/ProcessDataUtils';
import { CreditResponse } from '@/types/CreditResponse';
import { StatusEnum } from '@/infrastructure/constants/credit/StatusEnum';
import CreditInformationTag from '../CreditInformationTag/CreditInformationTag';
import { useCreditInformationItemStyle } from './CreditInformationItem.style';
import { getClientColorByStatus } from '@/shared/utils/ProcessStatusDataUtils';


export interface CreditInformationItemStateProps {
    creditInformation: CreditResponse;
}

export interface CreditInformationItemFunctionsProps {
    handleOnClick: (event?: object | any) => void
}

export type LastCreditsCardProps = CreditInformationItemStateProps & CreditInformationItemFunctionsProps;

const CreditInformationItem: React.FC<LastCreditsCardProps> = (props: LastCreditsCardProps) => {
    const classes = useCreditInformationItemStyle();
    const creditInformation: CreditResponse = props.creditInformation;
    return (
        <Box
            sx={{...classes.creditInformationItemContainer}}
            onClick={props.handleOnClick}
        >
            {/* Avatar del cliente */}
            <Avatar sx={{...classes.clientAvatar(getClientColorByStatus(creditInformation.status as StatusEnum))}}>
                {getIniciales(`${creditInformation.client.name} ${creditInformation.client.lastName}`)}
            </Avatar>

            {/* Información principal - MEJOR DISTRIBUCIÓN HORIZONTAL */}
            <Box sx={{ flex: 1, minWidth: 0 }}> {/* minWidth: 0 permite que se contraiga */}
                <Typography variant="h5" noWrap sx={{ fontWeight: 600, mb: 1 }}>
                    {`${creditInformation.client.name} ${creditInformation.client.lastName}`}
                </Typography>

                {/* Información en una sola línea para aprovechar el espacio */}
                <CreditInformationTag
                    phoneNumber={creditInformation.client.phoneNumber}
                    createdDate={creditInformation.created}
                    status={creditInformation.status as StatusEnum}
                />
            </Box>

            {/* Monto - MÁS SEPARADO */}
            <Box sx={{...classes.amountContainer}}>
                <Typography variant="h4" sx={{...classes.amount}}>
                    {formatearMoneda(creditInformation.total)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                    Monto del Préstamo
                </Typography>
            </Box>

        </Box>
    )
}

export default CreditInformationItem;