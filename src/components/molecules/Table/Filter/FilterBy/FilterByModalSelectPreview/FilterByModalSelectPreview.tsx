import { ChipColorEnum } from '@/shared/constants/PropertiesEnumMuiComponets';
import { MES_CHIP_COLOR, STATUS_CHIP_COLOR } from '@/shared/utils/ProcessStatusDataUtils'
import { Box, Chip, Divider, Typography } from '@mui/material'
import { isEmpty } from 'lodash';

export interface FilterByModalSelectPreviewStateProps {
    currentFilters: { category: string, value: string }[]
}

export interface FilterByModalSelectPreviewFunctionsProps {
    onToggle: (category: string, value: string) => void;
}

export type FilterByModalSelectPreviewProps = FilterByModalSelectPreviewStateProps & FilterByModalSelectPreviewFunctionsProps;

export const FilterByModalSelectPreview: React.FC<FilterByModalSelectPreviewProps> = (props: FilterByModalSelectPreviewProps) => {
    return (
        <Box sx={{ px: 3, pb: 2.5 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Seleccionados:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 1 }}>
                {props.currentFilters.map((item) => {
                    const statusColor: ChipColorEnum | string = item.category === "estatus" ? STATUS_CHIP_COLOR(item.value) : "";
                    const monthStyleColor: object = item.category === "registro" ? {
                        height: 22, fontSize: 11,
                        bgcolor: MES_CHIP_COLOR(item.value), color: "#fff",
                        "& .MuiChip-deleteIcon": { color: "rgba(255,255,255,0.7)" },
                    } : {}

                    return (
                        <Chip key={`itemChipPreviewArea_${item.category}_${item.value}`} label={item.value} size="small"
                            color={STATUS_CHIP_COLOR(item.value)}
                            onDelete={() => props.onToggle("estatus", item.value)}
                            {...!isEmpty(statusColor) ? { color: statusColor as ChipColorEnum, sx: { height: 22, fontSize: 11, } } :
                                !isEmpty(monthStyleColor) ? { sx: monthStyleColor } : {}
                            }
                        />
                    )
                }
                )}
            </Box>
        </Box>
    )
}
