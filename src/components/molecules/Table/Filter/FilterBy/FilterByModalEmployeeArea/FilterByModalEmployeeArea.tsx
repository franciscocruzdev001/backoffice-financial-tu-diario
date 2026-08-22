import { Autocomplete, Box, TextField, Typography, createFilterOptions } from '@mui/material';
import type { EmployeeWalletOption } from '@/shared/constants/catalogs/employeeWallets.catalog';

export interface FilterByModalEmployeeAreaProps {
  options: EmployeeWalletOption[];
  selectedEmployeeId: string | null;
  onChange: (employeeId: string | null) => void;
}

const filterOptions = createFilterOptions<EmployeeWalletOption>({
  stringify: (option) => `${option.label} ${option.phoneNumber ?? ''}`,
});

export const FilterByModalEmployeeArea: React.FC<FilterByModalEmployeeAreaProps> = ({
  options,
  selectedEmployeeId,
  onChange,
}) => {
  const selectedOption = options.find((o) => o.optionId === selectedEmployeeId) ?? null;

  return (
  <Box sx={{ px: 3, pt: 2.5, pb: 2.5 }}>
      <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 1 }}>
        TRABAJADOR
      </Typography>
      <Autocomplete
        options={options}
        value={selectedOption}
        onChange={(_, newValue) => onChange(newValue?.optionId ?? null)}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.optionId === value.optionId}
        filterOptions={filterOptions}
        renderInput={(params) => (
          <TextField {...params} size="small" placeholder="Buscar trabajador..." />
        )}
      />
    </Box>
  );
};