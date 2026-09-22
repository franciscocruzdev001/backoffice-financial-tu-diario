import { getDate } from '@/shared/utils/ProcessDataUtils';
import { Box, Chip, IconButton, TableCell, Tooltip, Typography } from '@mui/material';
import React, { JSX } from 'react'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import { getTransactionColorByStatus } from '@/shared/utils/ProcessStatusDataUtils';
import { TRANSACTION_STATUS_LABELS } from '@/shared/constants/catalogs/credit_filters.catalog';
import { TransactionStatusEnum } from '@/infrastructure/constants/credit/TransactionStatusEnum';
import { TransactionColumnsEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { TransactionTable } from '@/types/TransactionTable';
import { get } from 'lodash';

export interface TransactionCellsStateProps {
  columnTable: IColumnsTable;
  transaction: TransactionTable;
}

export interface TransactionCellsFunctionsProps {
  handleOnEditClick: (transaction: TransactionTable) => void,
  handleOnDeleteClick: (transaction: TransactionTable) => void,
}

export type TransactionCellsProps = TransactionCellsStateProps & TransactionCellsFunctionsProps;

const formatAmount = (amount?: number, currency?: string) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency || 'MXN',
  }).format(amount ?? 0);

export const TransactionCells: React.FC<TransactionCellsProps> = (props: TransactionCellsProps) => {
  const cells: Record<TransactionColumnsEnum, JSX.Element | any> = {
    [TransactionColumnsEnum.transactionType]: (
      <Typography variant="body2" fontWeight={500}>
        {props.transaction.transactionType || 'Sin tipo'}
      </Typography>
    ),
    [TransactionColumnsEnum.description]: (
      <Box>
        <Typography variant="body2" color="text.secondary">
          {[
            get(props.transaction, 'description', ''),
            get(props.transaction, 'customerBasicInfo.fullName', ''),
          ].filter(Boolean).join(' - ') || '—'}
        </Typography>
        {props.transaction.creditBasicInfo && (
          // Distingue transacciones del mismo cliente/monto que en realidad
          // apuntan a créditos distintos: avance de pago + últimos 4 del id.
          <Typography variant="caption" color="text.disabled">
            {`Crédito ...${get(props.transaction, 'creditBasicInfo.creditId', '').slice(-4)} · Avance: ${
              formatAmount(get(props.transaction, 'creditBasicInfo.amountPaid', 0), props.transaction.currency)
            } de ${formatAmount(get(props.transaction, 'creditBasicInfo.total', 0), props.transaction.currency)}`}
          </Typography>
        )}
      </Box>
    ),
    [TransactionColumnsEnum.total]: (
      <Typography variant="body2" fontWeight={500}>
        {formatAmount(props.transaction.total, props.transaction.currency)}
      </Typography>
    ),
    [TransactionColumnsEnum.status]: (
      <Chip
        label={TRANSACTION_STATUS_LABELS[props.transaction.status ?? ''] ?? props.transaction.status ?? 'Pendiente'}
        color={getTransactionColorByStatus(props.transaction.status || TransactionStatusEnum.PENDING)}
        size="small"
      />
    ),
    [TransactionColumnsEnum.createdAt]: (
      <Typography variant="body2" color="text.secondary">
        {props.transaction.createdAt
          ? getDate(new Date(props.transaction.createdAt).getTime())
          : '—'}
      </Typography>
    ),
    [TransactionColumnsEnum.actions]: (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Editar transacción">
          <IconButton
            size="small"
            color="primary"
            onClick={() => props.handleOnEditClick(props.transaction)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar transacción">
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