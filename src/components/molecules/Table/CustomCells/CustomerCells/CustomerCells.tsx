import { CustomerColumnsEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
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
import { CustomerTable } from '@/types/CustomerTable';

export interface CustomerCellsStateProps {
  columnTable: IColumnsTable;
  customer: CustomerTable
}

export interface CustomerCellsFunctionsProps {
  handleOnEditClick: (customer: CustomerTable) => void,
  handleOnDeleteClick: (customer: CustomerTable) => void,
}

export type CustomerCellsProps = CustomerCellsStateProps & CustomerCellsFunctionsProps;

export const CustomerCells: React.FC<CustomerCellsProps> = (props: CustomerCellsProps) => {
  const cells: Record<CustomerColumnsEnum, JSX.Element | any> = {
    [CustomerColumnsEnum.customerName]: (
      <Typography variant="body2" fontWeight={500}>
        {getFullName(
          props.customer.name,
          props.customer.lastName
        )}
      </Typography>
    ),
    [CustomerColumnsEnum.phoneNumber]: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PhoneIcon fontSize="small" color="action" />
        {props.customer.phoneNumber}
      </Box>
    ),
    [CustomerColumnsEnum.address]: (
      <Typography variant="body2" color="text.secondary">
        {props.customer.address}
      </Typography>
    ),
    [CustomerColumnsEnum.endorsement]: (
      <Typography variant="body2" color="text.secondary">
        Sin aval
      </Typography>
      /*customer.aval ? (
          <Box>
              <Typography variant="body2" fontWeight={500}>
                  {cliente.aval.nombre}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                  {cliente.aval.telefono}
              </Typography>
          </Box>
      ) : (
          <Typography variant="body2" color="text.secondary">
              Sin aval
          </Typography>
      )*/
    ),
    [CustomerColumnsEnum.employee]: (
      props.customer.createdByEmployee ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WorkIcon fontSize="small" color="action" />
          <Typography variant="body2">
            {props.customer.createdByEmployee.fullName}
          </Typography>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Sin asignar
        </Typography>
      )
    ),
    [CustomerColumnsEnum.status]: (
      <Chip
        label={props.customer.status || 'activo'}
        color={getCreditColorByStatus(props.customer.status)}
        size="small"
      />
    ),
    [CustomerColumnsEnum.created]: (
      <Typography variant="body2" color="text.secondary">
        {getDate(props.customer.created)}
      </Typography>
    ),
    [CustomerColumnsEnum.actions]: (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Editar cliente">
          <IconButton
            size="small"
            color="primary"
            onClick={() => props.handleOnEditClick(props.customer)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar cliente">
          <IconButton
            size="small"
            color="error"
            onClick={() => props.handleOnDeleteClick(props.customer)}
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
        props.columnTable.columnTableId as CustomerColumnsEnum
      ]}
    </TableCell>
  )
}