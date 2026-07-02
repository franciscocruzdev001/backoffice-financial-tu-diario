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
import { TransactionColumnsEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { TransactionTable } from '@/types/TransactionTable';

export interface TransactionCellsStateProps {
  columnTable: IColumnsTable;
  transaction: TransactionTable;
}

export interface TransactionCellsFunctionsProps {
  handleOnEditClick: (transaction: TransactionTable) => void,
  handleOnDeleteClick: (transaction: TransactionTable) => void,
}

export type TransactionCellsProps = TransactionCellsStateProps & TransactionCellsFunctionsProps;

export const TransactionCells: React.FC<TransactionCellsProps> = (props: TransactionCellsProps) => {
  const cells: Record<TransactionColumnsEnum, JSX.Element | any> = {
    [TransactionColumnsEnum.transactionName]: (
      <Typography variant="body2" fontWeight={500}>
        {getFullName(
          props.transaction.name,
          props.transaction.lastName
        )}
      </Typography>
    ),
    [TransactionColumnsEnum.phoneNumber]: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PhoneIcon fontSize="small" color="action" />
        {props.transaction.phoneNumber}
      </Box>
    ),
    [TransactionColumnsEnum.address]: (
      <Typography variant="body2" color="text.secondary">
        {props.transaction.address}
      </Typography>
    ),
    [TransactionColumnsEnum.status]: (
      <Chip
        label={props.transaction.status || 'activo'}
        color={getCreditColorByStatus(props.transaction.status)}
        size="small"
      />
    ),
    [TransactionColumnsEnum.created]: (
      <Typography variant="body2" color="text.secondary">
        {getDate(props.transaction.created)}
      </Typography>
    ),
    [TransactionColumnsEnum.actions]: (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Editar empleado">
          <IconButton
            size="small"
            color="primary"
            onClick={() => props.handleOnEditClick(props.transaction)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Desactivar Empleado">
          <IconButton
            size="small"
            color="error"
            onClick={() => props.handleOnDeleteClick(props.transaction)}
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
        props.columnTable.columnTableId as TransactionColumnsEnum
      ]}
    </TableCell>
  )
}