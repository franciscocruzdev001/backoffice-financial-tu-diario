import { Box, Button } from '@mui/material'
import React from 'react'

export interface FilterByModalFooterStateProps {
    totalActive: number;
}

export interface FilterByModalFooterFunctionsProps {
    onClose: (event?: object | any) => void;
    onApply: () => void;
    handleReset: () => void;
}

export type FilterByModalFooterProps = FilterByModalFooterStateProps & FilterByModalFooterFunctionsProps;

export const FilterByModalFooter: React.FC<FilterByModalFooterProps> = (props: FilterByModalFooterProps) => {
    return (
        <React.Fragment>
            <Button
                onClick={() => props.handleReset()}
                color="inherit"
                disabled={props.totalActive === 0}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
            >
                Limpiar todo
            </Button>
            <Box sx={{ flex: 1 }} />
            <Button
                onClick={props.onClose}
                variant="outlined"
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
            >
                Cancelar
            </Button>
            <Button
                onClick={() => props.onApply()}
                variant="contained"
                sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    bgcolor: "primary.main",
                    px: 3,
                }}
            >
                Aplicar{props.totalActive > 0 ? ` (${props.totalActive})` : ""}
            </Button>
        </React.Fragment>
    )
}
