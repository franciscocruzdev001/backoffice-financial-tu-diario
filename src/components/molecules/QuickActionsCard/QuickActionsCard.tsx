import CustomCard from '@/components/atoms/CustomCard/CustomCard';
import { IFinancialButtonInfoItem } from '@/shared/interfaces/IFinancialButtonInfoItem';
import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import React from 'react'
import { useQuickActionsCardStyle } from './QuickActionsCard.style';
import StatsChargeCard from '@/components/atoms/StatsChargeCard/StatsChargeCard';

export interface QuickActionsCardStateProps {
    /*
        Se recibe el catalogo para pruebas, pero sustituir por items
        quickActionsItems: IFinancialButtonInfoItem;
    */
    quickActionsCatalog: IFinancialButtonInfoItem[];
    activeEmployees: number;
}

export interface QuickActionsCardFunctionsProps {
    handleOnClick: (event?: object | any) => void,
}

export type QuickActionsCardProps = QuickActionsCardStateProps & QuickActionsCardFunctionsProps;

export const QuickActionsCard: React.FC<QuickActionsCardProps> = (props: QuickActionsCardProps) => {
    const classes = useQuickActionsCardStyle();
    return (
        <CustomCard sx={{ height: 'fit-content' }}>
            <Typography variant="h6" sx={{...classes.tittle}}>
                ⚡ Acciones Rápidas
            </Typography>

            <Grid container spacing={2}>
                {props.quickActionsCatalog.map((item: IFinancialButtonInfoItem, index: number) => (
                    <Grid key={`QuickActionsGrid_${index}`} size={{...classes.quickActionsButtonContainer}}>
                        <Button
                            fullWidth
                            variant={item.variant}
                            startIcon={item.icon}
                            onClick={props.handleOnClick}
                            color={item.color}
                            sx={{...classes.quickActionsButton}}
                        >
                            {item.tittle}
                        </Button>
                    </Grid>
                ))}
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Información básica */}
            <Typography variant="subtitle2" gutterBottom sx={{...classes.subtittle}}>
                📊 Información General
            </Typography>

            <Paper sx={{...classes.activeEmployeesCard}}>
                <Typography variant="h4" color="primary" fontWeight={700} sx={{ mb: 1 }}>
                    {props.activeEmployees}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Trabajadores Activos
                </Typography>
            </Paper>
        </CustomCard>
    )
}

export default QuickActionsCard;
