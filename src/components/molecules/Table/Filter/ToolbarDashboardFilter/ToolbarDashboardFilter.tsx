import { Box, IconButton, Tooltip } from '@mui/material';
import {
    FilterList as FilterListIcon
} from '@mui/icons-material';
import React from 'react';
import { FilterByModal } from '../FilterBy/FilterByModal/FilterByModal';
import { useToolbarDashboardFilterStyle } from './ToolbarDashboardFilter.style';
import { ChipsArea } from '../ChipsArea/ChipsArea';
import { isEmpty } from 'lodash';
import { useToolbarDashboardFilterState } from './state/useToolbarDashboardFilterState';
import { Category } from '@/shared/constants/table_types_data';


/*const FILTER_OPTIONSV2 = [
    // Estatus
    { category: "estatus", value: "Activo" },
    { category: "estatus", value: "Inactivo" },
    { category: "estatus", value: "Pendiente" },
    { category: "estatus", value: "Suspendido" },
    // Registro
    { category: "registro", value: "Enero" },
    { category: "registro", value: "Febrero" },
    { category: "registro", value: "Marzo" },
    { category: "registro", value: "Abril" },
    { category: "registro", value: "Mayo" },
    { category: "registro", value: "Junio" },
    { category: "registro", value: "Julio" },
    { category: "registro", value: "Agosto" },
    { category: "registro", value: "Septiembre" },
    { category: "registro", value: "Octubre" },
    { category: "registro", value: "Noviembre" },
    { category: "registro", value: "Diciembre" }
];*/

export interface ToolbarDashboardFilterStateProps {
    filterOptions: Record<Category, string[]>;
}

export interface ToolbarDashboardFilterFunctionsProps {
    handleOnChangeFilters: (documentFilter: { category: string, value: string }[]) => void
}

export type ToolbarDashboardFilterProps = ToolbarDashboardFilterStateProps & ToolbarDashboardFilterFunctionsProps;


export const ToolbarDashboardFilter: React.FC<ToolbarDashboardFilterProps> = (props: ToolbarDashboardFilterProps) => {
    const classes = useToolbarDashboardFilterStyle();
    const { chipsArea, filterByModal } = useToolbarDashboardFilterState(props);
    /*const allChips = [
        ...filterByModal.activeFilters.estatus.map((v) => ({ category: "estatus", value: v })),
        ...filterByModal.activeFilters.registro.map((v) => ({ category: "registro", value: v })),
    ];*/

    return (
        <React.Fragment>
            <Box sx={{ ...classes.toolbarContainer }}>
                {/* Left: chips area */}
                <ChipsArea
                    chipsData={filterByModal.activeFilters}
                    handleClearAll={chipsArea.handleClearAll}
                    handleRemoveChip={chipsArea.handleRemoveChip}
                />
                {/* Right: filter button */}
                <Tooltip title="Abrir filtros" placement="left">
                    <IconButton
                        onClick={() => filterByModal.showFilterByModal(true)}
                        sx={{ ...classes.showModalFilterButton(!isEmpty(filterByModal.activeFilters)) }}
                    >
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <FilterByModal
                open={filterByModal.modalOpen}
                onClose={() => filterByModal.showFilterByModal(false)}
                options={props.filterOptions}
                currentFilters={filterByModal.activeFilters}
                handleApplyFilters={filterByModal.handleApplyFilters}
            />
        </React.Fragment>
    )
}
