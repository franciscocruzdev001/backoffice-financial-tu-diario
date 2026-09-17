import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import type { EmployeeWalletOption } from '@/shared/constants/catalogs/employeeWallets.catalog';

export interface FilterByModalEmployeeAreaProps {
  options: EmployeeWalletOption[];
  selectedEmployeeId: string | null;
  onChange: (employeeId: string | null) => void;
  // Búsqueda en vivo contra el backend (con debounce) — opt-in: si no se manda,
  // se comporta como antes (filtro local de MUI contra la lista completa).
  onInputChange?: (text: string) => void;
  loading?: boolean;
}

export const FilterByModalEmployeeArea: React.FC<FilterByModalEmployeeAreaProps> = ({
  options,
  selectedEmployeeId,
  onChange,
  onInputChange,
  loading = false,
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
        // Con búsqueda en vivo el filtrado ya lo hace el backend.
        {...(onInputChange ? { filterOptions: (opts: EmployeeWalletOption[]) => opts } : {})}
        onInputChange={onInputChange ? (_, newInputValue, reason) => {
          if (reason === 'input') onInputChange(newInputValue);
        } : undefined}
        loading={loading}
        loadingText="Buscando..."
        renderInput={(params) => (
          <TextField {...params} size="small" placeholder="Buscar trabajador..." />
        )}
      />
    </Box>
  );
};