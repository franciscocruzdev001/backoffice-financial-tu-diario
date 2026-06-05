import React, { JSX } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useStatsCardStyle } from './StatsCard.style';
import { isUndefined } from 'lodash';

export interface StatsCardStateProps {
    tittle: string;
    subtittle: string;
    value: any;
    icon: JSX.Element;
    color: string;
}

export interface StatsCardFunctionsProps {
  handleOnClick: () => void;
}

export type StatsCardProps = StatsCardStateProps & StatsCardFunctionsProps;


const StatsCard = ({ 
  tittle,
  subtittle,
  value,
  icon,
  color = '#1976d2',
  handleOnClick
}:StatsCardProps) => {
  const classes = useStatsCardStyle();

  return (
    <Paper sx={{...classes.paperContainer(!isUndefined(handleOnClick), color)}} onClick={() => handleOnClick()}>
      <Box sx={{ color: color, mb: 2 }}>
        {icon}
      </Box>
      
      <Typography 
        variant="h4" 
        sx={{...classes.messageValue(color)}}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </Typography>
      
      <Typography 
        variant="h6" 
        sx={{...classes.tittle(!isUndefined(subtittle))}}
      >
        {tittle}
      </Typography>
      
      {subtittle && (
        <Typography 
          variant="body2" 
          sx={{...classes.subtittle}}
        >
          {subtittle}
        </Typography>
      )}
    </Paper>
  );
};

export default StatsCard;