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
import { EmployeeTable } from '@/types/EmployeeTable';
import { EmployeeColumnsEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';

export interface EmployeeCellsStateProps {
  columnTable: IColumnsTable;
  employee: EmployeeTable;
}

export interface EmployeeCellsFunctionsProps {
  handleOnEditClick: (employee: EmployeeTable) => void,
  handleOnDeleteClick: (employee: EmployeeTable) => void,
}

export type EmployeeCellsProps = EmployeeCellsStateProps & EmployeeCellsFunctionsProps;

export const EmployeeCells: React.FC<EmployeeCellsProps> = (props: EmployeeCellsProps) => {
  const cells: Record<EmployeeColumnsEnum, JSX.Element | any> = {
    [EmployeeColumnsEnum.employeeName]: (
      <Typography variant="body2" fontWeight={500}>
        {getFullName(
          props.employee.name,
          props.employee.lastName
        )}
      </Typography>
    ),
    [EmployeeColumnsEnum.phoneNumber]: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PhoneIcon fontSize="small" color="action" />
        {props.employee.phoneNumber}
      </Box>
    ),
    [EmployeeColumnsEnum.address]: (
      <Typography variant="body2" color="text.secondary">
        {props.employee.address}
      </Typography>
    ),
    [EmployeeColumnsEnum.status]: (
      <Chip
        label={props.employee.status || 'activo'}
        color={getCreditColorByStatus(props.employee.status)}
        size="small"
      />
    ),
    [EmployeeColumnsEnum.created]: (
      <Typography variant="body2" color="text.secondary">
        {getDate(props.employee.created)}
      </Typography>
    ),
    [EmployeeColumnsEnum.actions]: (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Editar empleado">
          <IconButton
            size="small"
            color="primary"
            onClick={() => props.handleOnEditClick(props.employee)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Desactivar Empleado">
          <IconButton
            size="small"
            color="error"
            onClick={() => props.handleOnDeleteClick(props.employee)}
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
        props.columnTable.columnTableId as EmployeeColumnsEnum
      ]}
    </TableCell>
  )
}