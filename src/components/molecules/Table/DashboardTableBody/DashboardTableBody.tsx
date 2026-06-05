import { TableRow } from '@mui/material';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import React from 'react';
import { CustomerCells } from '../CustomCells/CustomerCells/CustomerCells';
import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { Entities } from '@/shared/constants/table_types_data';
import { CustomerTable } from '@/types/CustomerTable';
import { EmployeeTable } from '@/types/EmployeeTable';
import { EmployeeCells } from '../CustomCells/EmployeeCells/EmployeeCells';

export interface DashboardTableBodyStateProps {
    renderColumnsTable: IColumnsTable[];
    data: { records: Entities[], total: number, entityName: DashboardTableCatalogEnum }
}

export interface DashboardTableBodyFunctionsProps {
    handleOnEditClick: (item: Entities) => void,
    handleOnDeleteClick: (item: Entities) => void,
}

export type DashboardTableBodyProps = DashboardTableBodyStateProps & DashboardTableBodyFunctionsProps;

const DashboardTableBody: React.FC<DashboardTableBodyProps> = (props: DashboardTableBodyProps) => {
    const buildTableBodyCustomer = (data: {
        records: Entities[],
        total: number,
        entityName: DashboardTableCatalogEnum
    }) => {
        return (
            <React.Fragment>
                {data.records.map((record: Entities, index) => {
                    const customer: CustomerTable = record as CustomerTable;
                    return (
                        <TableRow key={`TableRow_${data.entityName}_${index}`}>
                            {props.renderColumnsTable.map((column: IColumnsTable) => (
                                <CustomerCells
                                    key={column.columnTableId + customer.customerId}
                                    columnTable={column}
                                    customer={customer}
                                    handleOnDeleteClick={props.handleOnDeleteClick}
                                    handleOnEditClick={props.handleOnEditClick}
                                />
                            ))}
                        </TableRow>
                    )
                })}
            </React.Fragment>
        )
    }

    const buildTableBodyEmployee = (data: {
        records: Entities[],
        total: number,
        entityName: DashboardTableCatalogEnum
    }) => {
        return (
            <React.Fragment>
                {data.records.map((record: Entities, index) => {
                    const employee: EmployeeTable = record as EmployeeTable;
                    return (
                        <TableRow key={`TableRow_${data.entityName}_${index}`}>
                            {props.renderColumnsTable.map((column: IColumnsTable) => (
                                <EmployeeCells
                                    key={column.columnTableId + employee.userId}
                                    columnTable={column}
                                    employee={employee}
                                    handleOnDeleteClick={props.handleOnDeleteClick}
                                    handleOnEditClick={props.handleOnEditClick}
                                />
                            ))}
                        </TableRow>
                    )
                })}
            </React.Fragment>
        )
    }

    const buildTableBodyByEntityName = (data: {
        records: Entities[],
        total: number,
        entityName: DashboardTableCatalogEnum
    }) => {
        const entityName: string = data.entityName;
        switch (entityName) {
            case DashboardTableCatalogEnum.customers:
                return buildTableBodyCustomer(data);
            case DashboardTableCatalogEnum.credits:
                return <></>;
            case DashboardTableCatalogEnum.employees:
                return buildTableBodyEmployee(data);
            case DashboardTableCatalogEnum.transactions:
                return <></>;
            default:
                return <></>;
        }
    }

    return (
        buildTableBodyByEntityName(props.data)
    )
}

export default DashboardTableBody;  