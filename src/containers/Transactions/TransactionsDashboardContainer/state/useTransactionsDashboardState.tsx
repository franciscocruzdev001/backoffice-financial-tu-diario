import { DashboardHeaderProps } from '@/components/atoms/DashboardHeader/DashboardHeader';
import { ModalDeleteItemConfirmDialogProps } from '@/components/molecules/ModalDialog/ModalDeleteItemConfirmDialog/ModalDeleteItemConfirmDialog';
import { SnackbarNotificationProps } from '@/components/molecules/SnackbarNotification/SnackbarNotification';
import { DashboardTableProps, TableSelectionProps } from '@/components/molecules/Table/DahsboardTable/DashboardTable';
import { DashboardTableCatalog, DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { ModalApproveTransactionsDialogProps, CurrencyTotal } from '@/components/molecules/ModalDialog/ModalApproveTransactionsDialog/ModalApproveTransactionsDialog';
import { Category, Entities } from '@/shared/constants/table_types_data';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import { useTransactionStore } from '@/stores/transactions.store';
import { FiltersItems } from '@/types/SearchTransactionsRequest';
import { TransactionTable } from '@/types/TransactionTable';
import { defaultTo, get } from 'lodash';
import { useEffect, useState } from 'react'

// Mismo enum real de status que usa transactionsSchema
const CATALOG_FILTER_OPTIONS: Record<Category, string[]> = {
    "estatus": ["CHARGE-PROCESS", "SLOW-PAY", "PAID", "RESTRUCTURED"],
    "registro": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
};

export interface ApproveTransactionsButtonProps {
    label: string;
    disabled: boolean;
    selectedCount: number;
    onClick: () => void;
}
export interface RejectTransactionsButtonProps {
    label: string;
    disabled: boolean;
    selectedCount: number;
    onClick: () => void;
}

export interface IUseTransactionsDashboardState {
    dashboardHeaderProps: DashboardHeaderProps,
    dashboardTableProps: DashboardTableProps,
    snackbarNotificationProps: SnackbarNotificationProps,
    modalDeleteItemConfirmProps: ModalDeleteItemConfirmDialogProps,
    approveTransactionsButtonProps: ApproveTransactionsButtonProps,
    rejectTransactionsButtonProps: RejectTransactionsButtonProps
    modalApproveTransactionsProps: ModalApproveTransactionsDialogProps,
}

export const useTransactionsDashboardState = (): IUseTransactionsDashboardState => {
    /**
            * Transaction data state
            */
    const { transactionsData, searchTransactionsData } = useTransactionStore();
    /**
         * Filter State
         */
    const [filterItems, setFilterItems] = useState<FiltersItems>({
        creditorCompanyId: "123",
        status: [],
    });
    /**
     * Pagination State
     */
    const [page, setPage] = useState<number>(0);
    const [rowsPerPageChange, setRowsPerPageChange] = useState<number>(5);

    const [renderColumnsTable, setRenderColumnsTable] = useState<IColumnsTable[]>(DashboardTableCatalog[DashboardTableCatalogEnum.transactions]);
    const [showModalDeleteItemConfirm, setShowModalDeleteItemConfirm] = useState<boolean>(false);
    const [showModalApproveConfirm, setShowModalApproveConfirm] = useState<boolean>(false);
    const [approvingTransactions, setApprovingTransactions] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<TransactionTable>({
        _id: "123",
        transactionType: "LOAN_DISBURSEMENT",
        total: 0,
        status: "CHARGE-PROCESS",
        description: "Transacción de prueba",
        currency: "MXN",
    });

    /**
     * Selección múltiple de filas (solo transacciones)
     */
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // IDs visibles en la página actual — "seleccionar todo" solo actúa sobre
    // estos, nunca sobre el total del backend
    const currentPageIds = (transactionsData.records as TransactionTable[])
        .map((t) => t._id)
        .filter((id): id is string => Boolean(id));

    const isAllSelected =
        currentPageIds.length > 0 && currentPageIds.every((id) => selectedIds.has(id));
    const isIndeterminate =
        !isAllSelected && currentPageIds.some((id) => selectedIds.has(id));

    const handleToggleItem = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleToggleAll = () => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (isAllSelected) {
                currentPageIds.forEach((id) => next.delete(id));
            } else {
                currentPageIds.forEach((id) => next.add(id));
            }
            return next;
        });
    };
    const selectedTransactions = (transactionsData.records as TransactionTable[]).filter(
        (t) => t._id && selectedIds.has(t._id)
    );

    const totalsByCurrency: CurrencyTotal[] = Object.entries(
        selectedTransactions.reduce<Record<string, number>>((acc, t) => {
            const currency = t.currency ?? 'MXN';
            acc[currency] = (acc[currency] ?? 0) + (t.total ?? 0);
            return acc;
        }, {})
    ).map(([currency, total]) => ({ currency, total }));


    const clearSelection = () => setSelectedIds(new Set());

    const selection: TableSelectionProps = {
        isSelected: (id: string) => selectedIds.has(id),
        isAllSelected,
        isIndeterminate,
        onToggleItem: handleToggleItem,
        onToggleAll: handleToggleAll,
        getId: (item: Entities) => (item as TransactionTable)._id ?? '',
    };

    const handleOpenApproveConfirm = () => {
        setShowModalApproveConfirm(true);
    };

    const handleConfirmApproveTransactions = () => {
        console.log('Aprobar transacciones seleccionadas:', Array.from(selectedIds));
        // TODO: aqui iria el endpoint real de aprobar las transacciones.
        setShowModalApproveConfirm(false);
        clearSelection();
    };

    const handleCancelApproveTransactions = () => {
        setShowModalApproveConfirm(false);
    };

    const handleRejectTransactions = () => {
        console.log('Rechazar transacciones seleccionadas:', Array.from(selectedIds));
        // TODO: aqui iria el endpoint rechazar/cancelar las transacciones.
        clearSelection();
    }

    /**
        * 
        * Dashboard header funtions
        */
    const handleOnClick = (event?: object | any) => {
        console.log("handleOnClick-event: ", event);
        console.log("Actualizando...");
    };

    /**
     * 
     * Dashboard table funtions 
     */
    const handleOnEditClick = (item: Entities) => {
        console.log("handleOnClick-customer: ", item);
        console.log("Actualizando...");
    };
    const handleOnDeleteClick = (item: Entities) => {
        setSelectedItem({ ...item as TransactionTable });
        setShowModalDeleteItemConfirm(true);
        console.log("handleOnClick-customer: ", item);
        console.log("Actualizando...");
    };
    const handleOnChangeFilters = (documentFilter: Record<string, { category: string, value: string }[]>) => {
        console.log("handleOnChangeFilters-documentFilter:", documentFilter);

        const tempFilterItems: FiltersItems = {
            status: defaultTo(documentFilter["estatus"], []).map((filter: { category: string, value: string }) => filter.value),
            creditorCompanyId: "123"
        }

        setFilterItems(tempFilterItems);
        setPage(0);
        clearSelection();

        searchTransactionsData({
            filtersItems: tempFilterItems,
            pagination: {
                limit: rowsPerPageChange,
                pageNumber: 0
            }
        });
    }

    /**
     * 
     * Modal delete item funtions
     */
    const handleOnDeleteConfirm = (event?: object | any) => {
        console.log("handleOnDeleteConfirm-event: ", event);
        console.log("Actualizando...");
    };
    const handleOnDeleteCancel = (event?: object | any) => {
        setShowModalDeleteItemConfirm(false);
        console.log("handleOnDeleteCancel-event: ", event);
        console.log("Actualizando...");
    };
    const handleOnPageChange = (event?: object | any, newPage?: number) => {
        setPage(defaultTo(newPage, 0));
        searchTransactionsData({
            filtersItems: filterItems,
            pagination: {
                limit: rowsPerPageChange,
                pageNumber: defaultTo(newPage, 0),
            }
        });
        console.log("TablePagination-onPageChange-event:", event);
    };

    const handleOnRowsPerPageChange = (event: object) => {
        setRowsPerPageChange(get(event, "target.value", 5));
        setPage(0);
        clearSelection();
        searchTransactionsData({
            filtersItems: filterItems,
            pagination: {
                limit: get(event, "target.value", 5),
                pageNumber: 0,
            }
        });
        console.log("TablePagination-onPageChange-event:", event);
    };

    useEffect(() => {
        searchTransactionsData({
            filtersItems: filterItems,
            pagination: {
                limit: rowsPerPageChange,
                pageNumber: page
            }
        });
    }, [transactionsData.entityName]);




    return {
        dashboardHeaderProps: {
            tittle: `Transacciones ${transactionsData.total}`,
            handleOnClick
        },
        dashboardTableProps: {
            toolBarFilterProps: {
                filterOptions: CATALOG_FILTER_OPTIONS,
                handleOnChangeFilters
            },
            tablePaginationProps: {
                count: transactionsData.total,
                page: page,
                rowsPerPage: rowsPerPageChange,
                rowsPerPageOptions: [5, 8, 15, 25, 100],
                onPageChange: handleOnPageChange,
                onRowsPerPageChange: handleOnRowsPerPageChange
            },
            data: transactionsData,
            renderColumnsTable,
            handleOnEditClick,
            handleOnDeleteClick,
            selection,
        },
        snackbarNotificationProps: {
            open: false,
            type: "success",
            message: "Esto es una notificacion de prueba...",
            hadleOnClose: () => console.log("snackbarNotificationProps-hadleOnClose")
        },
        modalDeleteItemConfirmProps: {
            item: {
                // Ya no hay name/lastName/phoneNumber/address en TransactionTable real;
                // usamos description (y el tipo/monto) como identificador visible.
                name: selectedItem.description ?? selectedItem.transactionType ?? 'Transacción',
                phoneNumber: '',
                address: '',
            },
            open: showModalDeleteItemConfirm,
            loadingDeleteItem: false,
            handleOnDeleteConfirm,
            handleOnDeleteCancel
        },
        approveTransactionsButtonProps: {
            label: selectedIds.size <= 1 ? 'Aprobar transacción' : `Aprobar ${selectedIds.size} transacciones`,
            disabled: selectedIds.size === 0,
            selectedCount: selectedIds.size,
            onClick: handleOpenApproveConfirm,
        },
        rejectTransactionsButtonProps: {
            label: selectedIds.size <= 1 ? 'Rechazar transacción' : `Rechazar ${selectedIds.size} transacciones`,
            disabled: selectedIds.size === 0,
            selectedCount: selectedIds.size,
            onClick: handleRejectTransactions,
        },
        modalApproveTransactionsProps: {
            open: showModalApproveConfirm,
            transactionsCount: selectedIds.size,
            totalsByCurrency,
            loading: approvingTransactions,
            onConfirm: handleConfirmApproveTransactions,
            onCancel: handleCancelApproveTransactions,
        },
    }
}