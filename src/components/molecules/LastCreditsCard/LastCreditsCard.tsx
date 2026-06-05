import CustomCard from '@/components/atoms/CustomCard/CustomCard';
import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import {
    AccountBalance as LoanIcon,
    Visibility as ViewIcon
} from '@mui/icons-material';
import { CreditResponse } from '@/types/CreditResponse';
import CreditInformationItem from '../CreditInformationItem/CreditInformationItem';
import { useLastCreditsCardStyle } from './LastCreditsCard.style';

export interface LastCreditsCardStateProps {
    lastCreditsItems: CreditResponse[];
}

export interface LastCreditsCardFunctionsProps {
    handleOnClick: (event?: object | any) => void,
    handleOnClickLastCredisItem: (event?: object | any) => void,
}

export type LastCreditsCardProps = LastCreditsCardStateProps & LastCreditsCardFunctionsProps;

const LastCreditsCard: React.FC<LastCreditsCardProps> = (props: LastCreditsCardProps) => {
    const classes = useLastCreditsCardStyle();
    return (
        <CustomCard sx={{...classes.lastCreditsCardContainer}}>
            <Box sx={{...classes.lastCreditsCardHeaderContainer}}>
                <Typography variant="h6" sx={{...classes.tittleHeader}}>
                    <LoanIcon color="primary" />
                    Últimos Préstamos
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={props.handleOnClick}
                    endIcon={<ViewIcon />}
                >
                    Ver Todos
                </Button>
            </Box>

            {props.lastCreditsItems.length === 0 ? (
                <Box sx={{...classes.emptyItemMessageContainer}}>
                    <LoanIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
                    <Typography variant="h6" gutterBottom>No hay préstamos registrados</Typography>
                    <Typography variant="body2">Los nuevos préstamos aparecerán aquí</Typography>
                </Box>
            ) : (
                <Box sx={{...classes.lastCreditsItemsContainer}}>
                    {props.lastCreditsItems.map((credit: CreditResponse, index) => (
                        <CreditInformationItem
                            key={`LastCreditsItem_${index}_${credit.creditId}`}
                            creditInformation={credit}
                            handleOnClick={props.handleOnClickLastCredisItem}
                        />
                    ))}
                </Box>
            )}
        </CustomCard>
    )
}

export default LastCreditsCard;