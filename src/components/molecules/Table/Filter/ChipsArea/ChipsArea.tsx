import { Box, Chip, Fade, Typography } from '@mui/material'
import React from 'react'
import { useChipsAreaStyle } from './ChipsArea.style';
import { ChipColorEnum } from '@/shared/constants/PropertiesEnumMuiComponets';
import { MES_CHIP_COLOR, STATUS_CHIP_COLOR } from '@/shared/utils/ProcessStatusDataUtils';
import { isEmpty } from 'lodash';

export interface ChipsAreaStateProps {
    chipsData: { category: string, value: string }[];
}

export interface ChipsAreaFunctionsProps {
    handleClearAll: () => void;
    handleRemoveChip: (category: string, value: string) => void;
}

export type ChipsAreaProps = ChipsAreaStateProps & ChipsAreaFunctionsProps;

export const ChipsArea: React.FC<ChipsAreaProps> = (props: ChipsAreaProps) => {
    const classes = useChipsAreaStyle();
    return (
        <Box sx={{ ...classes.chipsAreaContainer }}>
            {props.chipsData.length === 0 ? (
                <Typography
                    variant="body2"
                    color="text.disabled"
                    sx={{ fontStyle: "italic" }}
                >
                    Sin filtros activos — mostrando todos los clientes
                </Typography>
            ) : (
                <>
                    {props.chipsData.map(({ category, value }) => {
                        const label: string = `${category === "estatus" ? "Estatus" : "Mes"}: ${value}`
                        const statusColor: ChipColorEnum | string = category === "estatus" ? STATUS_CHIP_COLOR(value) : "";
                        const monthStyleColor: object = category === "registro" ? {
                            textTransform: "capitalize",
                            bgcolor: MES_CHIP_COLOR(value),
                            color: "#fff",
                            borderColor: MES_CHIP_COLOR(value),
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            "&:hover": { bgcolor: MES_CHIP_COLOR(value), opacity: 0.9 },
                        } : {};

                        return (
                            <Fade in key={`itemChipActiveFilters_${category}_${value}`}>
                                <Chip
                                    label={label}
                                    onDelete={() => props.handleRemoveChip(category, value)}
                                    size="small"
                                    variant="outlined"
                                    {...!isEmpty(statusColor) ?     { color: statusColor as ChipColorEnum, sx: { textTransform: "capitalize" } } :
                                        !isEmpty(monthStyleColor) ? { sx: monthStyleColor } : {}
                                    }
                                />
                            </Fade>
                        )
                    })}
                    <Chip
                        label="Limpiar todo"
                        onClick={() => props.handleClearAll()}
                        size="small"
                        color="error"
                        variant="outlined"
                        sx={{ ml: 0.5 }}
                    />
                </>
            )}
        </Box>
    )
}
