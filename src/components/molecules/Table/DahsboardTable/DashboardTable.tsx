import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TablePaginationProps,
    TableRow,
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

export interface DashboardTableStateProps {
    //filterOptions: Record<Category, string[]>;
    toolBarFilterProps: ToolbarDashboardFilterProps;
    tablePaginationProps: TablePaginationProps;
    renderColumnsTable: IColumnsTable[];
    data: { records: Entities[], total: number, entityName: DashboardTableCatalogEnum }
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
                    <Table>
                        <TableHead>
                            <TableRow>
                                {props.renderColumnsTable.map((column: IColumnsTable) => (
                                    <TableCell key={column.columnTableId}>
                                        <strong>{column.tittle}</strong>
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