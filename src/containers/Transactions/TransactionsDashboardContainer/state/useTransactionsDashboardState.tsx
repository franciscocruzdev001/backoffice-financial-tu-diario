import { DashboardHeaderProps } from '@/components/atoms/DashboardHeader/DashboardHeader';
import { ModalDeleteItemConfirmDialogProps } from '@/components/molecules/ModalDialog/ModalDeleteItemConfirmDialog/ModalDeleteItemConfirmDialog';
import { SnackbarNotificationProps } from '@/components/molecules/SnackbarNotification/SnackbarNotification';
import { DashboardTableProps, TableSelectionProps } from '@/components/molecules/Table/DahsboardTable/DashboardTable';
import { DashboardTableCatalog, DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { ModalApproveTransactionsDialogProps, TransactionTypeTotal } from '@/components/molecules/ModalDialog/ModalApproveTransactionsDialog/ModalApproveTransactionsDialog';
import { ModalPreviewTransactionsDialogProps } from '@/components/molecules/ModalDialog/ModalPreviewTransactionsDialog/ModalPreviewTransactionsDialog';
import { ModalRejectTransactionsDialogProps } from '@/components/molecules/ModalDialog/ModalRejectTransactionsDialog/ModalRejectTransactionsDialog';
import { TransactionStatusEnum } from '@/infrastructure/constants/credit/TransactionStatusEnum';
import { Category, Entities } from '@/shared/constants/table_types_data';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import { useTransactionStore } from '@/stores/transactions.store';
import { FiltersItems } from '@/types/SearchTransactionsRequest';
import { TransactionTable } from '@/types/TransactionTable';
import { TransactionChangeStatusBatchLogs } from '@/types/TransactionChangeStatusBatchLogs';
import { type DateRangeValue } from '@/components/molecules/Table/Filter/DateRangeSection/DateRangeSection';
import { EMPLOYEE_WALLET_OPTIONS, EmployeeWalletOption } from '@/shared/constants/catalogs/employeeWallets.catalog';
import { useAuthStore } from '@/stores/auth.store';
import { defaultTo, get } from 'lodash';
import { useEffect, useState } from 'react'

// Mismo enum real de status que usa transactionsSchema
const CATALOG_FILTER_OPTIONS: Record<Category, string[]> = {
    "estatus": ["pending", "approved", "cancelled"],
    "movimiento": ["credit", "payment", "transfer", "deposit"],
    //"registro": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    //  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
}

const DEFAULT_DATE_RANGE: DateRangeValue = { preset: 'TODOS', range: null };

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
export interface PreviewTransactionsButtonProps {
    visible: boolean;
    onClick: () => void;
}

export interface IUseTransactionsDashboardState {
    dashboardHeaderProps: DashboardHeaderProps,
    dashboardTableProps: DashboardTableProps,
    snackbarNotificationProps: SnackbarNotificationProps,
    modalDeleteItemConfirmProps: ModalDeleteItemConfirmDialogProps,
    approveTransactionsButtonProps: ApproveTransactionsButtonProps,
    rejectTransactionsButtonProps: RejectTransactionsButtonProps
    previewTransactionsButtonProps: PreviewTransactionsButtonProps,
    modalApproveTransactionsProps: ModalApproveTransactionsDialogProps,
    modalPreviewTransactionsProps: ModalPreviewTransactionsDialogProps,
    modalRejectTransactionsProps: ModalRejectTransactionsDialogProps,
}

export const useTransactionsDashboardState = (): IUseTransactionsDashboardState => {
    /**
            * Transaction data state
            */
    const { transactionsData, searchTransactionsData, approveTransactionsOperations, cancelTransactionsOperations } = useTransactionStore();
    // creditorCompanyId real del admin autenticado (no un id de prueba fijo,
    // cada admin solo debe ver las transacciones de su propia empresa)
    const creditorCompanyId = useAuthStore((state) => state.user?.creditorCompanyId ?? '');
    /**
         * Filter State
         */
    const [filterItems, setFilterItems] = useState<FiltersItems>({
        creditorCompanyId,
        status: [],
    });
    /**
     * Date range filter state — se guarda aparte para poder reflejar el
     * valor actual seleccionado de vuelta en el modal (dateRange prop)
     */
    const [dateRange, setDateRange] = useState<DateRangeValue>(DEFAULT_DATE_RANGE);
    /**
     * Pagination State
     */
    const [page, setPage] = useState<number>(0);
    const [rowsPerPageChange, setRowsPerPageChange] = useState<number>(5);

    const [renderColumnsTable, setRenderColumnsTable] = useState<IColumnsTable[]>(DashboardTableCatalog[DashboardTableCatalogEnum.transactions]);
    const [showModalDeleteItemConfirm, setShowModalDeleteItemConfirm] = useState<boolean>(false);
    const [showModalApproveConfirm, setShowModalApproveConfirm] = useState<boolean>(false);
    const [showModalPreview, setShowModalPreview] = useState<boolean>(false);
    const [showModalRejectConfirm, setShowModalRejectConfirm] = useState<boolean>(false);
    const [approvingTransactions, setApprovingTransactions] = useState<boolean>(false);
    // Resultado (o error) de la última aprobación — se queda distinto de null
    // mientras el usuario no cierre el modal a propósito con "Cerrar".
    const [approveResult, setApproveResult] = useState<TransactionChangeStatusBatchLogs | null>(null);
    const [approveError, setApproveError] = useState<string | null>(null);
    // Mismo patrón que approve, para rechazar/cancelar
    const [rejectingTransactions, setRejectingTransactions] = useState<boolean>(false);
    const [rejectResult, setRejectResult] = useState<TransactionChangeStatusBatchLogs | null>(null);
    const [rejectError, setRejectError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<TransactionTable>({
        _id: "123",
        transactionType: "LOAN_DISBURSEMENT",
        total: 0,
        status: "CHARGE-PROCESS",
        description: "Transacción de prueba",
        currency: "MXN",
    });

    /**
     * Selección múltiple de filas (solo transacciones).
     * Se guarda el objeto completo (id -> transacción), no solo el id: los
     * totales por tipo (Créditos/Pagos) de los modales de aprobar/rechazar/
     * preview se calculaban filtrando transactionsData.records, que solo
     * tiene la página actual cargada — al cambiar de página, la selección de
     * páginas anteriores desaparecía de esos totales (aunque sí se seguía
     * mandando completa al backend al aprobar, porque eso usa los ids).
     */
    const [selectedItemsMap, setSelectedItemsMap] = useState<Record<string, TransactionTable>>({});
    const selectedIds = new Set(Object.keys(selectedItemsMap));

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
        setSelectedItemsMap((prev) => {
            if (prev[id]) {
                const { [id]: _removed, ...rest } = prev;
                return rest;
            }
            const item = (transactionsData.records as TransactionTable[]).find((t) => t._id === id);
            return item ? { ...prev, [id]: item } : prev;
        });
    };

    const handleToggleAll = () => {
        setSelectedItemsMap((prev) => {
            const next = { ...prev };
            if (isAllSelected) {
                currentPageIds.forEach((id) => { delete next[id]; });
            } else {
                (transactionsData.records as TransactionTable[]).forEach((t) => {
                    if (t._id) next[t._id] = t;
                });
            }
            return next;
        });
    };
    const selectedTransactions = Object.values(selectedItemsMap);

    const totalsByType: TransactionTypeTotal[] = Object.entries(
        selectedTransactions.reduce<Record<string, { count: number; total: number }>>((acc, t) => {
            const transactionType = t.transactionType ?? 'other';
            const current = acc[transactionType] ?? { count: 0, total: 0 };
            acc[transactionType] = { count: current.count + 1, total: current.total + (t.total ?? 0) };
            return acc;
        }, {})
    ).map(([transactionType, { count, total }]) => ({ transactionType, count, total }));

    // Si alguna de las seleccionadas ya está aprobada, no se puede volver a aprobar el lote.
    const haySeleccionadaYaAprobada = selectedTransactions.some(
        (t) => t.status === TransactionStatusEnum.APPROVED
    );

    const clearSelection = () => setSelectedItemsMap({});

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

    const handleConfirmApproveTransactions = async () => {
        setApprovingTransactions(true);
        try {
            const result = await approveTransactionsOperations(Array.from(selectedIds));
            // El modal se queda abierto mostrando el resumen — se cierra hasta
            // que el usuario le da a "Cerrar" (handleCloseApproveResult).
            setApproveResult(result);
        } catch (error) {
            console.error('Error al aprobar transacciones:', error);
            setApproveError('No se pudo completar la aprobación. Intenta de nuevo.');
        } finally {
            setApprovingTransactions(false);
        }
    };

    const handleCancelApproveTransactions = () => {
        setShowModalApproveConfirm(false);
    };

    // Botón "Cerrar" del resumen — solo dispara la animación de salida del
    // modal. Si aquí también se limpiara result/error, el modal alcanzaría a
    // mostrar de vuelta la vista de "Confirmar aprobación" por un instante
    // mientras se desvanece (showResult pasaría a false a mitad del fade-out).
    const handleCloseApproveResult = () => {
        setShowModalApproveConfirm(false);
    };

    // Se dispara cuando la animación de salida del modal ya terminó — aquí sí
    // es seguro limpiar el resultado y refrescar la tabla.
    const handleApproveModalExited = () => {
        setApproveResult(null);
        setApproveError(null);
        clearSelection();
        // Refresca la página actual para reflejar el nuevo status (approved).
        searchTransactionsData({
            filtersItems: filterItems,
            pagination: { limit: rowsPerPageChange, pageNumber: page }
        });
    };

    const handleOpenPreview = () => {
        setShowModalPreview(true);
    };

    const handleClosePreview = () => {
        setShowModalPreview(false);
    };

    const handleOpenRejectConfirm = () => {
        setShowModalRejectConfirm(true);
    };

    const handleConfirmRejectTransactions = async () => {
        setRejectingTransactions(true);
        try {
            const result = await cancelTransactionsOperations(Array.from(selectedIds));
            // El modal se queda abierto mostrando el resumen — se cierra hasta
            // que el usuario le da a "Cerrar" (handleCloseRejectResult).
            setRejectResult(result);
        } catch (error) {
            console.error('Error al rechazar transacciones:', error);
            setRejectError('No se pudo completar el rechazo. Intenta de nuevo.');
        } finally {
            setRejectingTransactions(false);
        }
    };

    const handleCancelRejectTransactions = () => {
        setShowModalRejectConfirm(false);
    };

    // Mismo motivo que handleCloseApproveResult: solo dispara la animación de
    // salida, result/error se limpian hasta que termine (ver onExited).
    const handleCloseRejectResult = () => {
        setShowModalRejectConfirm(false);
    };

    const handleRejectModalExited = () => {
        setRejectResult(null);
        setRejectError(null);
        clearSelection();
        // Refresca la página actual para reflejar el nuevo status (cancelled).
        searchTransactionsData({
            filtersItems: filterItems,
            pagination: { limit: rowsPerPageChange, pageNumber: page }
        });
    };

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
    const handleOnChangeFilters = (
        documentFilter: Record<string, { category: string, value: string }[]>,
        newDateRange: DateRangeValue,
        selectedEmployee: EmployeeWalletOption | null
    ) => {
        console.log("handleOnChangeFilters-documentFilter:", documentFilter);
        console.log("handleOnChangeFilters-newDateRange:", newDateRange);
        console.log("handleOnChangeFilters-selectedEmployee:", selectedEmployee);

        const tempFilterItems: FiltersItems = {
            status: defaultTo(documentFilter["estatus"], []).map((filter) => filter.value),
            transactionType: defaultTo(documentFilter["movimiento"], []).map((filter) => filter.value),
            creditorCompanyId,
            // La fecha se maneja como number. endDate se lleva al final del día
            // (23:59:59.999) porque range.endDate es una fecha sin hora
            // ("YYYY-MM-DD"), y new Date(...) la interpreta como medianoche UTC —
            // dejarla así excluye cualquier transacción de ese mismo día ocurrida
            // después de medianoche (mismo bug que se corrigió en el mobile).
            ...(newDateRange.range ? {
                createdRangeDate: {
                    startDate: new Date(newDateRange.range.startDate).getTime(),
                    endDate: new Date(`${newDateRange.range.endDate}T23:59:59.999Z`).getTime(),
                },
            } : {}),
            // Si hay un trabajador seleccionado, acota la búsqueda a su wallet
            // (mismo mecanismo que ya usa el $or de sourceAccount/destinationAccount
            // en _buildSearchFiltersByTransactions del backend).
            ...(selectedEmployee ? {
                accountInformacion: {
                    walletId: selectedEmployee.walletId,
                    accountNumber: selectedEmployee.accountNumber,
                },
            } : {}),
        }

        setFilterItems(tempFilterItems);
        setDateRange(newDateRange);
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
                dateRange,
                // Único lugar de la app donde se pasa employeeOptions al toolbar,
                // por eso el Autocomplete de trabajador solo aparece en Transactions.
                employeeOptions: EMPLOYEE_WALLET_OPTIONS,
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
            disabled: selectedIds.size === 0 || haySeleccionadaYaAprobada,
            selectedCount: selectedIds.size,
            onClick: handleOpenApproveConfirm,
        },
        rejectTransactionsButtonProps: {
            label: selectedIds.size <= 1 ? 'Rechazar transacción' : `Rechazar ${selectedIds.size} transacciones`,
            // Mismo bloqueo que "Aprobar": una transacción ya aprobada movió su
            // dinero de pendiente a firme — cancelarla solo restaría del
            // pendiente (que ya no tiene ese monto), dejando el balance mal.
            disabled: selectedIds.size === 0 || haySeleccionadaYaAprobada,
            selectedCount: selectedIds.size,
            onClick: handleOpenRejectConfirm,
        },
        previewTransactionsButtonProps: {
            visible: selectedIds.size > 0,
            onClick: handleOpenPreview,
        },
        modalApproveTransactionsProps: {
            open: showModalApproveConfirm,
            transactionsCount: selectedIds.size,
            totalsByType,
            loading: approvingTransactions,
            result: approveResult,
            error: approveError,
            onConfirm: handleConfirmApproveTransactions,
            onCancel: handleCancelApproveTransactions,
            onClose: handleCloseApproveResult,
            onExited: handleApproveModalExited,
        },
        modalPreviewTransactionsProps: {
            open: showModalPreview,
            totalsByType,
            onClose: handleClosePreview,
        },
        modalRejectTransactionsProps: {
            open: showModalRejectConfirm,
            transactionsCount: selectedIds.size,
            totalsByType,
            loading: rejectingTransactions,
            result: rejectResult,
            error: rejectError,
            onConfirm: handleConfirmRejectTransactions,
            onCancel: handleCancelRejectTransactions,
            onClose: handleCloseRejectResult,
            onExited: handleRejectModalExited,
        },
    }
}