import { CreditColumnsEnum, CustomerColumnsEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { getDate, getFullName } from '@/shared/utils/ProcessDataUtils';
import { Box, Chip, IconButton, Stack, TableCell, Tooltip, Typography } from '@mui/material';
import React, { JSX } from 'react'
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Phone as PhoneIcon,
    LocationOn as LocationOnIcon,
    Work as WorkIcon
} from '@mui/icons-material';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import { getCreditColorByStatus, getTransactionColorByStatus } from '@/shared/utils/ProcessStatusDataUtils';
import { CREDIT_STATUS_LABELS, TRANSACTION_STATUS_LABELS } from '@/shared/constants/catalogs/credit_filters.catalog';
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
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                {getDate(props.credit.created)}
            </Typography>
        ),
        [CreditColumnsEnum.customerInfo]: (
            props.credit.customerBasicInfo ? (
                <Box
                    sx={{
                        display: 'inline-flex',
                        flexDirection: 'column',
                        gap: 0.25,
                        px: 1.25,
                        py: 0.75,
                        borderRadius: 1.5,
                        bgcolor: 'action.hover'
                    }}
                >
                    {get(props.credit, "customerBasicInfo.phoneNumber", "") && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <PhoneIcon sx={{ fontSize: 14, color: 'primary.main' }} />
                            <Typography variant="body2" color="text.secondary">
                                {get(props.credit, "customerBasicInfo.phoneNumber", "")}
                            </Typography>
                        </Stack>
                    )}
                    {get(props.credit, "customerBasicInfo.address", "") && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <LocationOnIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                            <Typography variant="body2" color="text.secondary">
                                {get(props.credit, "customerBasicInfo.address", "")}
                            </Typography>
                        </Stack>
                    )}
                </Box>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    Sin asignar
                </Typography>
            )
        ),
        [CreditColumnsEnum.employeeInfo]: (
            props.credit.employeeBasicInfo ? (
                <Typography variant="body2" color="text.secondary">
                    {get(props.credit, "employeeBasicInfo.fullName", "") || get(props.credit, "employeeBasicInfo.userId", "")}
                </Typography>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    Sin asignar
                </Typography>
            )
        ),
        [CustomerColumnsEnum.status]: (
            <Chip
                label={CREDIT_STATUS_LABELS[props.credit.status ?? ''] ?? props.credit.status ?? 'Activo'}
                color={getCreditColorByStatus(props.credit.status)}
                size="small"
                sx={{ fontSize: '0.7rem', height: 22 }}
            />
        ),
        [CreditColumnsEnum.transactionStatus]: (
            props.credit.transactionStatus ? (
                <Chip
                    label={TRANSACTION_STATUS_LABELS[props.credit.transactionStatus] ?? props.credit.transactionStatus}
                    color={getTransactionColorByStatus(props.credit.transactionStatus)}
                    size="small"
                    sx={{ fontSize: '0.7rem', height: 22 }}
                />
            ) : (
                <Typography variant="body2" color="text.secondary">
                    Sin transacciones
                </Typography>
            )
        ),
        [CreditColumnsEnum.total]: (
            <Typography variant="body2" color="text.secondary">
                {`$${get(props.credit, "total", 0)}`}
            </Typography>
        ),
        [CreditColumnsEnum.amountDue]: (
            <Typography variant="body2" color="text.secondary">
                {`$${get(props.credit, "amountDue", 0)}`}
            </Typography>
        ),
        [CreditColumnsEnum.amountPaid]: (
            <Typography variant="body2" color="success.main" fontWeight={500}>
                {`$${get(props.credit, "amountPaid", 0)}`}
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
        <TableCell sx={{ minWidth: props.columnTable.minWidth }}>
            {cells[
                props.columnTable.columnTableId as CreditColumnsEnum
            ]}
        </TableCell>
    )
}