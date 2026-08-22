import { useState } from 'react';
import { Box, Collapse, Typography } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import DateRangeSection, {
    type DateRangeValue,
    describeDateRangeValue,
} from '@/components/molecules/Table/Filter/DateRangeSection/DateRangeSection';
import { useFilterByModalSelectAreaStyle } from '../FilterByModalSelectArea/FilterByModalSelectArea.style';

export interface FilterByModalDateAreaProps {
    value: DateRangeValue;
    onChange: (value: DateRangeValue) => void;
    defaultOpen?: boolean;
}

export const FilterByModalDateArea: React.FC<FilterByModalDateAreaProps> = ({
    value,
    onChange,
    defaultOpen = false,
}) => {
    const classes = useFilterByModalSelectAreaStyle();
    const [open, setOpen] = useState(defaultOpen);

    return (
        <Box sx={{ ...classes.selectAreaContainer }}>
            <Box
                onClick={() => setOpen((o) => !o)}
                sx={{
                    ...classes.selectAreaHeaderContainer,
                    cursor: 'pointer',
                }}
            >
                <Box>
                    <Typography
                        variant="caption" fontWeight={700} letterSpacing="0.08em" color="text.secondary"
                        sx={{ textTransform: 'uppercase' }}
                    >
                        Período
                    </Typography>
                    {!open && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                            {describeDateRangeValue(value)}
                        </Typography>
                    )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {value.preset !== 'TODOS' && (
                        <Typography
                            variant="caption" color="error" sx={{ ...classes.selectAreaTittle }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange({ preset: 'TODOS', range: null });
                            }}
                        >
                            Limpiar
                        </Typography>
                    )}
                    <ExpandMoreRoundedIcon
                        fontSize="small"
                        sx={{
                            transform: open ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s',
                            color: 'text.secondary',
                        }}
                    />
                </Box>
            </Box>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ mt: 2 }}>
                    <DateRangeSection value={value} onChange={onChange} />
                </Box>
            </Collapse>
        </Box>
    );
};