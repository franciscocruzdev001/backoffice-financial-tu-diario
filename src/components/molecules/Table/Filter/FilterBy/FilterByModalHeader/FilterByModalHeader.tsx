import React from 'react'
import {
    Tune as TuneIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { Chip, IconButton, Typography } from '@mui/material';

export interface FilterByModalHeaderStateProps {
    totalActive: number;
}

export interface FilterByModalHeaderFunctionsProps {
    onClose: (event?: object | any) => void;
}

export type FilterByModalHeaderProps = FilterByModalHeaderStateProps & FilterByModalHeaderFunctionsProps;

export const FilterByModalHeader: React.FC<FilterByModalHeaderProps> = (props: FilterByModalHeaderProps) => {
    return (
        <React.Fragment>
            <TuneIcon />
            <Typography fontWeight={600} sx={{ flex: 1, fontSize: 17 }}>
                Filtrar clientes
            </Typography>
            {props.totalActive > 0 && (
                <Chip
                    label={`${props.totalActive} activo${props.totalActive !== 1 ? "s" : ""}`}
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 11 }}
                />
            )}
            <IconButton size="small" onClick={props.onClose} sx={{ color: "rgba(255,255,255,0.8)" }}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )
}
