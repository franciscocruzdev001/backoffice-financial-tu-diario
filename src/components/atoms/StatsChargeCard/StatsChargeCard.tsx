import { Paper, Typography } from '@mui/material';
import { defaultTo } from 'lodash';
import React, { JSX } from 'react'

export interface StatsChargeCardStateProps {
    tittle: string;
    subtittle: string;
    color: string;
    secundaryColor: string;
    icon?: JSX.Element | any;
}

const StatsChargeCard: React.FC<StatsChargeCardStateProps> = (props: StatsChargeCardStateProps) => {
    return (
        <Paper sx={{
            p: 3,
            textAlign: 'center',
            bgcolor: props.color,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {props.icon}
            <Typography variant="h6" fontWeight={600} color={defaultTo(props.secundaryColor, "success.main")}>
                {props.tittle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.subtittle}
            </Typography>
        </Paper>
    )
}

export default StatsChargeCard;