import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import type { CustomerOption } from '@/shared/constants/catalogs/customers.catalog';

export interface FilterByModalCustomerAreaProps {
  options: CustomerOption[];
  selectedCustomerId: string | null;
  onChange: (customerId: string | null) => void;
  // Búsqueda en vivo contra el backend (con debounce) — mismo patrón que el
  // autocomplete de cliente en mobile. Si se manda, ya no se filtra local:
  // "options" ya viene acotado por el backend a lo que se tecleó.
  onInputChange?: (text: string) => void;
  loading?: boolean;
}

export const FilterByModalCustomerArea: React.FC<FilterByModalCustomerAreaProps> = ({
  options,
  selectedCustomerId,
  onChange,
  onInputChange,
  loading = false,
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
        // Con búsqueda en vivo el filtrado ya lo hace el backend — si dejamos
        // el filtro local de MUI, puede descartar opciones que no calcen letra
        // por letra con lo tecleado (ej. buscas por teléfono, MUI compara contra
        // el label).
        {...(onInputChange ? { filterOptions: (opts: CustomerOption[]) => opts } : {})}
        onInputChange={onInputChange ? (_, newInputValue, reason) => {
          if (reason === 'input') onInputChange(newInputValue);
        } : undefined}
        loading={loading}
        loadingText="Buscando..."
        renderInput={(params) => (
          <TextField {...params} size="small" placeholder="Buscar cliente..." />
        )}
      />
    </Box>
  );
};