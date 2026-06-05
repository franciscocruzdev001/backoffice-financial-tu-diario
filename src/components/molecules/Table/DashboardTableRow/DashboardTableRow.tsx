import { TableRow } from '@mui/material';
import { Customer } from '@/types/Customer';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import React from 'react';
import { CustomerCells } from '../CustomCells/CustomerCells/CustomerCells';

export interface DashboardTableRowStateProps {
    renderColumnsTable: IColumnsTable[]
    customer: Customer
}

export interface DashboardTableRowFunctionsProps {
    handleOnEditClick: (customer: Customer) => void,
    handleOnDeleteClick: (customer: Customer) => void,
}

export type DashboardTableRowProps = DashboardTableRowStateProps & DashboardTableRowFunctionsProps;

const DashboardTableRow: React.FC<DashboardTableRowProps> = (props: DashboardTableRowProps) => {
    return (
        <React.Fragment>
            <TableRow>
                {props.renderColumnsTable.map((column: IColumnsTable) => (
                    <CustomerCells
                        key={column.columnTableId + props.customer.customerId}
                        columnTable={column}
                        customer={props.customer}
                        handleOnDeleteClick={props.handleOnDeleteClick}
                        handleOnEditClick={props.handleOnEditClick}
                    />
                ))}
            </TableRow>
        </React.Fragment>
    )
}

export default DashboardTableRow;  