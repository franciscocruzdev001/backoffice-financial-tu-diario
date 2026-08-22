import { Autocomplete, Box, TextField, Typography, createFilterOptions } from '@mui/material';
import type { CustomerOption } from '@/shared/constants/catalogs/customers.catalog';

export interface FilterByModalCustomerAreaProps {
  options: CustomerOption[];
  selectedCustomerId: string | null;
  onChange: (customerId: string | null) => void;
}

const filterOptions = createFilterOptions<CustomerOption>({
  stringify: (option) => `${option.label} ${option.phoneNumber ?? ''}`,
});

export const FilterByModalCustomerArea: React.FC<FilterByModalCustomerAreaProps> = ({
  options,
  selectedCustomerId,
  onChange,
}) => {
  const selectedOption = options.find((o) => o.optionId === selectedCustomerId) ?? null;

  return (
    <Box sx={{ px: 3, pt: 2.5, pb: 2.5 }}>
      <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 1 }}>
        CLIENTE
      </Typography>
      <Autocomplete
        options={options}
        value={selectedOption}
        onChange={(_, newValue) => onChange(newValue?.optionId ?? null)}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.optionId === value.optionId}
        filterOptions={filterOptions}
        renderInput={(params) => (
          <TextField {...params} size="small" placeholder="Buscar cliente..." />
        )}
      />
    </Box>
  );
};