import { CreditColumnsEnum, CustomerColumnsEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { getDate, getFullName } from '@/shared/utils/ProcessDataUtils';
import { Box, Chip, IconButton, TableCell, Tooltip, Typography } from '@mui/material';
import React, { JSX } from 'react'
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Phone as PhoneIcon,
    Work as WorkIcon
} from '@mui/icons-material';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import { getCreditColorByStatus } from '@/shared/utils/ProcessStatusDataUtils';
import { CreditTable } from '@/types/CreditTable';
import { get } from 'lodash';

export interface CreditCellsStateProps {
    columnTable: IColumnsTable;
    credit: CreditTable;
}

export interface CreditCellsFunctionsProps {
    handleOnEditClick: (credit: CreditTable) => void,
    handleOnDeleteClick: (credit: CreditTable) => void,
}

export type CreditCellsProps = CreditCellsStateProps & CreditCellsFunctionsProps;

export const CreditCells: React.FC<CreditCellsProps> = (props: CreditCellsProps) => {
    const cells: Record<CreditColumnsEnum, JSX.Element | any> = {
        [CreditColumnsEnum.creditName]: (
            <Typography variant="body2" fontWeight={500}>
                {getFullName(
                    props.credit.name,
                    props.credit.lastName
                )}
            </Typography>
        ),
        [CreditColumnsEnum.created]: (
            <Typography variant="body2" color="text.secondary">
                {getDate(props.credit.created)}
            </Typography>
        ),
        [CreditColumnsEnum.customerInfo]: (
            props.credit.customerBasicInfo ? (
                <Typography variant="body2" color="text.secondary">
                    {`${get(props.credit, "customerBasicInfo.fullName", "")} | ${get(props.credit, "customerBasicInfo.phoneNumber", "")}`}
                </Typography>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    Sin asignar
                </Typography>
            )
        ),
        [CreditColumnsEnum.employeeInfo]: (
            props.credit.employeeBasicInfo ? (
                <Typography variant="body2" color="text.secondary">
                    {`${get(props.credit, "employeeBasicInfo.fullName", "")} | ${get(props.credit, "employeeBasicInfo.phoneNumber", "")}`}
                </Typography>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    Sin asignar
                </Typography>
            )
        ),
        [CustomerColumnsEnum.status]: (
            <Chip
                label={props.credit.status || 'activo'}
                color={getCreditColorByStatus(props.credit.status)}
                size="small"
            />
        ),
        [CreditColumnsEnum.total]: (
            <Typography variant="body2" color="text.secondary">
                {`$${get(props.credit, "total", 0)}`}
            </Typography>
        ),
        [CreditColumnsEnum.actions]: (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Editar cliente">
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => props.handleOnEditClick(props.credit)}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar cliente">
                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => props.handleOnDeleteClick(props.credit)}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    };

    return (
        <TableCell>
            {cells[
                props.columnTable.columnTableId as CreditColumnsEnum
            ]}
        </TableCell>
    )
}