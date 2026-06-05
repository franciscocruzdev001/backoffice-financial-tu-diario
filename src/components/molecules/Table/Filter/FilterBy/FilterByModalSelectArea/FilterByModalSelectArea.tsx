import { Box, Chip, Typography } from '@mui/material';
import { useFilterByModalSelectAreaStyle } from './FilterByModalSelectArea.style';
import { isEqual } from 'lodash';

export interface FilterByModalSelectAreaStateProps {
    //category: string;
    //options: { category: string, value: string }[],
    //options: Record<Category, string[]>,
    options: { category: string, values: string[] },
    currentFilters: { category: string, value: string }[]
}

export interface FilterByModalSelectAreaFunctionsProps {
    onToggle: (category: string, value: string) => void;
    onCleanAllFilters: (category: string) => void;
}

export type FilterByModalSelectAreaProps = FilterByModalSelectAreaStateProps & FilterByModalSelectAreaFunctionsProps;

export const FilterByModalSelectArea: React.FC<FilterByModalSelectAreaProps> = (props: FilterByModalSelectAreaProps) => {
    const classes = useFilterByModalSelectAreaStyle();
    //const valuesByCategory = groupBy(props.currentFiltersV2, "category");

    return (
        <Box sx={{ ...classes.selectAreaContainer }}>
            <Box sx={{ ...classes.selectAreaHeaderContainer }}>
                <Typography variant="caption" fontWeight={700} letterSpacing="0.08em" color="text.secondary"
                    sx={{ textTransform: "uppercase" }}>
                    {props.options.category}
                </Typography>
                {props.currentFilters.length > 0 && (
                    <Typography
                        variant="caption" color="error" sx={{ ...classes.selectAreaTittle }}
                        onClick={() => props.onCleanAllFilters(props.options.category)}
                    >
                        Limpiar
                    </Typography>
                )}
            </Box>
            <Box sx={{ ...classes.selectAreaItemsCotainer }}>
                {props.options.values.map((value) => {
                    const selected = props.currentFilters.find((itemSelected) =>
                        isEqual(itemSelected.category, props.options.category) &&
                        isEqual(itemSelected.value, value)
                    ) !== undefined ? true : false;
                    return (
                        <Chip
                            key={`itemChipSelectArea_${props.options.category}_${value}`}
                            label={value}
                            onClick={() => props.onToggle(props.options.category, value)}
                            variant={selected ? "filled" : "outlined"}
                            size="medium"
                            {...classes.selectAreaItem({
                                category: props.options.category,
                                value: value 
                            }, selected)}
                        />
                    );
                })}
            </Box>
        </Box>
    )
}
