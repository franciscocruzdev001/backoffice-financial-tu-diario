import { DashboardHeaderProps } from '@/components/atoms/DashboardHeader/DashboardHeader';
import { ModalDeleteItemConfirmDialogProps } from '@/components/molecules/ModalDialog/ModalDeleteItemConfirmDialog/ModalDeleteItemConfirmDialog';
import { SnackbarNotificationProps } from '@/components/molecules/SnackbarNotification/SnackbarNotification';
import { DashboardTableProps } from '@/components/molecules/Table/DahsboardTable/DashboardTable';
import { DashboardTableCatalog, DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { Category } from '@/shared/constants/table_types_data';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import { getFullName } from '@/shared/utils/ProcessDataUtils';
import { TransactionTable } from '@/types/TransactionTable';
import { useState } from 'react'

const CATALOG_FILTER_OPTIONS: Record<Category, string[]> = {
    "estatus": ["Activo", "Inactivo", "Pendiente", "Suspendido"],
    "registro": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
};




export interface IUseTransactionsDashboardState {
    dashboardHeaderProps: DashboardHeaderProps,
    dashboardTableProps: DashboardTableProps,
    snackbarNotificationProps: SnackbarNotificationProps,
    modalDeleteItemConfirmProps: ModalDeleteItemConfirmDialogProps
}

export const useTransactionsDashboardState = (): IUseTransactionsDashboardState => {
    const [transactionsData, setTransactionsData] = useState<{
        records: TransactionTable[],
        total: number,
        entityName: DashboardTableCatalogEnum
    }>({
        records: [{
            transactionId: "123",
            address: "Direccion de prueba",
            created: 1783022812000,
            lastName: "Siete",
            name: "Aguilar",
            phoneNumber: "0000000000",
            status: "Activo"
        }],
        total: 1,
        entityName: DashboardTableCatalogEnum.transactions
    });

    const [renderColumnsTable, setRenderColumnsTable] = useState<IColumnsTable[]>(DashboardTableCatalog[DashboardTableCatalogEnum.transactions]);
    const [showModalDeleteItemConfirm, setShowModalDeleteItemConfirm] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<TransactionTable>({
        transactionId: "123",
        address: "Direccion de prueba",
        created: 1783022812000,
        lastName: "Siete",
        name: "Aguilar",
        phoneNumber: "0000000000",
        status: "Activo"
    });

    return {
        dashboardHeaderProps: {
            tittle: `Transacciones ${transactionsData.total}`,
            handleOnClick: () => console.log("dashboardHeaderProps-handleOnClick")
        },
        dashboardTableProps: {
            toolBarFilterProps: {
                filterOptions: CATALOG_FILTER_OPTIONS,
                handleOnChangeFilters: () => console.log("dashboardTableProps-handleOnChangeFilters")
            },
            tablePaginationProps: {
                count: transactionsData.total,
                page: 0,
                rowsPerPage: 5,
                rowsPerPageOptions: [5, 8, 15, 25, 100],
                onPageChange: () => console.log("dashboardTableProps-tablePaginationProps-onPageChange"),
                onRowsPerPageChange: () => console.log("dashboardTableProps-tablePaginationProps-onRowsPerPageChange")
            },
            data: transactionsData,
            renderColumnsTable,
            handleOnEditClick: () => console.log("dashboardTableProps-handleOnEditClick"),
            handleOnDeleteClick: () => console.log("dashboardTableProps-handleOnDeleteClick"),
        },
        snackbarNotificationProps: {
            open: false,
            type: "success",
            message: "Esto es una notificacion de prueba...",
            hadleOnClose: () => console.log("snackbarNotificationProps-hadleOnClose")
        },
        modalDeleteItemConfirmProps: {
            item: {
                name: getFullName(
                    selectedItem.name,
                    selectedItem.lastName
                ),
                phoneNumber: selectedItem.phoneNumber,
                address: selectedItem.address,
            },
            open: showModalDeleteItemConfirm,
            loadingDeleteItem: false,
            handleOnDeleteConfirm: () => console.log("modalDeleteItemConfirmProps-handleOnDeleteConfirm"),
            handleOnDeleteCancel: () => console.log("modalDeleteItemConfirmProps-handleOnDeleteCancel"),
        }
    }
}