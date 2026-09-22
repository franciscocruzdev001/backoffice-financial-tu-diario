import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TablePaginationProps,
    TableRow,
    TableSortLabel,
} from '@mui/material';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import React from 'react';
import { ToolbarDashboardFilter, ToolbarDashboardFilterProps } from '../Filter/ToolbarDashboardFilter/ToolbarDashboardFilter';
import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import DashboardTableBody from '../DashboardTableBody/DashboardTableBody';
import { Entities } from '@/shared/constants/table_types_data';
import EmptyDashboardTable from '../EmptyDashboardTable/EmptyDashboardTable';


function instanceOf<T>(value: unknown, fieldName: string): value is T {
    if (typeof value === "object" && value !== null) {
        return fieldName in value;
    }
    return false;
}

// Selección de filas — opcional, solo la usan las entidades que la necesiten
// (por ahora Transactions).
export interface TableSelectionProps {
    isSelected: (id: string) => boolean;
    isAllSelected: boolean;
    isIndeterminate: boolean;
    onToggleItem: (id: string) => void;
    onToggleAll: () => void;
    getId: (item: Entities) => string;
}

// Ordenamiento local — opcional, solo la usan las columnas marcadas
// `sortable: true` (por ahora Descripción en Transactions). El ordenamiento
// del array ya viene resuelto desde el estado del container, este componente
// solo dibuja el TableSortLabel y dispara onSortClick.
export interface TableSortProps {
    columnId: string | null;
    direction: 'asc' | 'desc';
    onSortClick: (columnId: string) => void;
}

export interface DashboardTableStateProps {
    //filterOptions: Record<Category, string[]>;
    toolBarFilterProps: ToolbarDashboardFilterProps;
    tablePaginationProps: TablePaginationProps;
    renderColumnsTable: IColumnsTable[];
    data: { records: Entities[], total: number, entityName: DashboardTableCatalogEnum }
    selection?: TableSelectionProps;
    sort?: TableSortProps;
}

export interface DashboardTableFunctionsProps {
    handleOnEditClick: (item: Entities) => void,
    handleOnDeleteClick: (item: Entities) => void,
    //handleOnChangeFilters: (documentFilter: object) => void;
}

export type DashboardTableProps = DashboardTableStateProps & DashboardTableFunctionsProps;

const DashboardTable: React.FC<DashboardTableProps> = (props: DashboardTableProps) => {
    return (
        <React.Fragment>
            {/* Filter section */}
            <ToolbarDashboardFilter
                {...props.toolBarFilterProps}
            />
            {/* Table section */}
            <TableContainer>
                {/* Refactorizar esto debe ser un children lo demas es estatico para las demas entidades */}
                {props.data.total === 0 ? (
                    <EmptyDashboardTable />
                ) : (
                    <Table sx={{ tableLayout: 'auto' }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'action.hover' }}>
                                {props.selection && (
                                    <TableCell padding="checkbox" sx={{ verticalAlign: 'middle' }}>
                                        <Checkbox
                                            indeterminate={props.selection.isIndeterminate}
                                            checked={props.selection.isAllSelected}
                                            onChange={props.selection.onToggleAll}
                                            inputProps={{ 'aria-label': 'Seleccionar todos' }}
                                        />
                                    </TableCell>
                                )}
                                {props.renderColumnsTable.map((column: IColumnsTable) => (
                                    <TableCell
                                        key={column.columnTableId}
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            verticalAlign: 'middle',
                                            py: 1.5,
                                            minWidth: column.minWidth
                                        }}
                                    >
                                        {column.sortable && props.sort ? (
                                            <TableSortLabel
                                                active={props.sort.columnId === column.columnTableId}
                                                direction={props.sort.columnId === column.columnTableId ? props.sort.direction : 'asc'}
                                                onClick={() => props.sort!.onSortClick(column.columnTableId)}
                                            >
                                                <strong style={{ marginLeft: column.titleOffset }}>{column.tittle}</strong>
                                            </TableSortLabel>
                                        ) : (
                                            <strong style={{ marginLeft: column.titleOffset }}>{column.tittle}</strong>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <DashboardTableBody
                                renderColumnsTable={props.renderColumnsTable}
                                data={props.data}
                                handleOnEditClick={props.handleOnEditClick}
                                handleOnDeleteClick={props.handleOnDeleteClick}
                                selection={props.selection}
                            />
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            {/* Pagination section */}
            <TablePagination
                component={"div"}
                count={props.tablePaginationProps.count}
                page={props.tablePaginationProps.page}
                rowsPerPage={props.tablePaginationProps.rowsPerPage}
                rowsPerPageOptions={props.tablePaginationProps.rowsPerPageOptions}
                labelRowsPerPage={"Filas por pagina:"}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
                }
                onPageChange={props.tablePaginationProps.onPageChange}
                onRowsPerPageChange={props.tablePaginationProps.onRowsPerPageChange}
                sx={{ borderTop: "1px solid", borderColor: "divider", px: 2 }}
            />
        </React.Fragment>
    )
}

export default DashboardTable;