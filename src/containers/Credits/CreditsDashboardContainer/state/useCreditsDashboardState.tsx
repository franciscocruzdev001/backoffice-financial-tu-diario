import { DashboardHeaderProps } from '@/components/atoms/DashboardHeader/DashboardHeader';
import { ModalDeleteItemConfirmDialogProps } from '@/components/molecules/ModalDialog/ModalDeleteItemConfirmDialog/ModalDeleteItemConfirmDialog';
import { SnackbarNotificationProps } from '@/components/molecules/SnackbarNotification/SnackbarNotification';
import { DashboardTableProps, TableSelectionProps } from '@/components/molecules/Table/DahsboardTable/DashboardTable';
import { DashboardTableCatalog, DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { Category, Entities } from '@/shared/constants/table_types_data';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import { getDate, getFullName, formatearMoneda } from '@/shared/utils/ProcessDataUtils';
import { downloadCreditCardsSheetPdf, type CreditCardTemplateData } from '@/shared/utils/CreditCardPdfUtils';
import { CREDIT_CARD_TEMPLATES, DEFAULT_CREDIT_CARD_TEMPLATE_ID, type CreditCardTemplateOption } from '@/shared/constants/catalogs/credit_card_templates.catalog';
import { useCreditStore } from '@/stores/credits.store';
import { CreditTable } from '@/types/CreditTable';
import { FiltersItems } from '@/types/SearchCreditsRequest';
import { defaultTo, get } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { CREDIT_STATUS_OPTIONS, TRANSACTION_STATUS_OPTIONS } from '@/shared/constants/catalogs/credit_filters.catalog';
import { EmployeeWalletOption } from '@/shared/constants/catalogs/employeeWallets.catalog';
import { CustomerOption } from '@/shared/constants/catalogs/customers.catalog';
import { useAuthStore } from '@/stores/auth.store';
import { useCustomerStore } from '@/stores/customers.store';
import { startOfDayLocal, endOfDayLocal } from '@/shared/utils/dateRangeTimezone';
import { useEmployeeStore } from '@/stores/employees.store';
import { type DateRangeValue } from '@/components/molecules/Table/Filter/DateRangeSection/DateRangeSection';

const CATALOG_FILTER_OPTIONS: Record<Category, string[]> = {
    "estatusCredito": Object.keys(CREDIT_STATUS_OPTIONS),
    "estatusTransaccion": Object.keys(TRANSACTION_STATUS_OPTIONS),
};


const CUSTOMER_SEARCH_DEBOUNCE_MS = 300;
const CUSTOMER_SEARCH_LIMIT = 20;
const EMPLOYEE_SEARCH_DEBOUNCE_MS = 300;
const EMPLOYEE_SEARCH_LIMIT = 20;
const DEFAULT_DATE_RANGE: DateRangeValue = { preset: 'TODOS', range: null };

export interface GenerateCardButtonProps {
    label: string;
    disabled: boolean;
    onClick: () => void;
    templateOptions: CreditCardTemplateOption[];
    selectedTemplateId: string;
    onTemplateChange: (templateId: string) => void;
}

export interface IUseCreditsDashboardState {
    dashboardHeaderProps: DashboardHeaderProps,
    dashboardTableProps: DashboardTableProps,
    snackbarNotificationProps: SnackbarNotificationProps,
    modalDeleteItemConfirmProps: ModalDeleteItemConfirmDialogProps,
    generateCardButtonProps: GenerateCardButtonProps,
}

export const useCreditsDashboardState = (): IUseCreditsDashboardState => {
    /**
     * Credits data state
     */
    const { creditsData, searchCreditsData } = useCreditStore();
    const creditorCompanyId = useAuthStore((state) => state.user?.creditorCompanyId ?? '');

   
    const { customerOptions, searchCustomerOptions } = useCustomerStore();
    const [customerSearchLoading, setCustomerSearchLoading] = useState(false);
    const customerSearchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearchCustomerInput = (text: string) => {
        if (customerSearchDebounceRef.current) clearTimeout(customerSearchDebounceRef.current);

        customerSearchDebounceRef.current = setTimeout(async () => {
            setCustomerSearchLoading(true);
            try {
                await searchCustomerOptions({
                    filtersItems: { creditorCompanyId, generalSearch: text.trim() || undefined },
                    pagination: { limit: CUSTOMER_SEARCH_LIMIT, pageNumber: 0 }
                });
            } catch (error) {
                console.error('Error al buscar clientes:', error);
            } finally {
                setCustomerSearchLoading(false);
            }
        }, CUSTOMER_SEARCH_DEBOUNCE_MS);
    };

   
    const { employeeOptions, searchEmployeeOptions } = useEmployeeStore();
    const [employeeSearchLoading, setEmployeeSearchLoading] = useState(false);
    const employeeSearchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearchEmployeeInput = (text: string) => {
        if (employeeSearchDebounceRef.current) clearTimeout(employeeSearchDebounceRef.current);

        employeeSearchDebounceRef.current = setTimeout(async () => {
            setEmployeeSearchLoading(true);
            try {
                await searchEmployeeOptions({
                    filtersItems: { creditorCompanyId, generalSearch: text.trim() || undefined },
                    pagination: { limit: EMPLOYEE_SEARCH_LIMIT, pageNumber: 0 }
                });
            } catch (error) {
                console.error('Error al buscar trabajadores:', error);
            } finally {
                setEmployeeSearchLoading(false);
            }
        }, EMPLOYEE_SEARCH_DEBOUNCE_MS);
    };

    /**
     * Filter State
     */
    const [filterItems, setFilterItems] = useState<FiltersItems>({
        creditorCompanyId,
        status: [],
        transactionStatus: [],
    });
    /**
     * Pagination State
     */
    const [page, setPage] = useState<number>(0);
    const [rowsPerPageChange, setRowsPerPageChange] = useState<number>(5);
    /**
     * Date range filter state — se guarda aparte para poder reflejar el
     * valor actual seleccionado de vuelta en el modal (dateRange prop),
     * mismo patrón que useTransactionsDashboardState.
     */
    const [dateRange, setDateRange] = useState<DateRangeValue>(DEFAULT_DATE_RANGE);




    const [renderColumnsTable, setRenderColumnsTable] = useState<IColumnsTable[]>(DashboardTableCatalog[DashboardTableCatalogEnum.credits]);
    const [showModalDeleteItemConfirm, setShowModalDeleteItemConfirm] = useState<boolean>(false);

    /**
     * Selección múltiple de filas — mismo patrón que Transactions
     * (useTransactionsDashboardState.tsx): se guarda el objeto completo
     * (id -> crédito), no solo el id, para no depender de que la página
     * actual siga cargada.
     */
    const [selectedItemsMap, setSelectedItemsMap] = useState<Record<string, CreditTable>>({});
    const selectedIds = new Set(Object.keys(selectedItemsMap));

    // IDs visibles en la página actual — "seleccionar todo" solo actúa sobre
    // estos, nunca sobre el total del backend
    const currentPageIds = (creditsData.records as CreditTable[])
        .map((c) => c.creditId)
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
            const item = (creditsData.records as CreditTable[]).find((c) => c.creditId === id);
            return item ? { ...prev, [id]: item } : prev;
        });
    };

    const handleToggleAll = () => {
        setSelectedItemsMap((prev) => {
            const next = { ...prev };
            if (isAllSelected) {
                currentPageIds.forEach((id) => { delete next[id]; });
            } else {
                (creditsData.records as CreditTable[]).forEach((c) => {
                    if (c.creditId) next[c.creditId] = c;
                });
            }
            return next;
        });
    };

    const clearSelection = () => setSelectedItemsMap({});

    // Llena la plantilla elegida (CREDIT_CARD_TEMPLATES) con pdf-lib y arma
    // UN pdf con todas las tarjetas seleccionadas, 4 por hoja.
    const [isGeneratingCards, setIsGeneratingCards] = useState<boolean>(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>(DEFAULT_CREDIT_CARD_TEMPLATE_ID);

    const mapCreditToCardData = (
        credit: CreditTable,
        collectorNameStyle: 'full' | 'firstName' = 'full'
    ): CreditCardTemplateData => {
        const collectorFullName = credit.employeeBasicInfo?.fullName || credit.employeeBasicInfo?.userId || '';
        const creditCollector = collectorNameStyle === 'firstName'
            ? collectorFullName.trim().split(/\s+/)[0] ?? ''
            : collectorFullName;

        return {
            joinDate: getDate(credit.created),
            endDate: getDate(credit.endDate),
            customerName: getFullName(credit.name, credit.lastName),
            address: credit.customerBasicInfo?.address ?? '',
            phoneNumber: credit.customerBasicInfo?.phoneNumber ?? '',
            amount: formatearMoneda(credit.total),
            paymentFees: credit.chargePeriods ? String(credit.chargePeriods) : '',
            fixedCharge: formatearMoneda(credit.fixedCharge ?? 0),
            paymentRenovation: credit.renovationPeriod ? String(credit.renovationPeriod) : '',
            threeWords: credit.customerBasicInfo?.threeWordsUbication ?? '',
            creditCollector,
            phoneNumberCollector: credit.employeeBasicInfo?.phoneNumber ?? '',
        };
    };

    const handleGenerateCard = async () => {
        const selectedCredits = Object.values(selectedItemsMap);
        if (selectedCredits.length === 0) return;

        const template = CREDIT_CARD_TEMPLATES.find((t) => t.id === selectedTemplateId) ?? CREDIT_CARD_TEMPLATES[0]!;

        setIsGeneratingCards(true);
        try {
            await downloadCreditCardsSheetPdf(
                selectedCredits.map((credit) => mapCreditToCardData(credit, template.collectorNameStyle)),
                template.url,
                template.layout,
                template.contentBox,
                `tarjetas_creditos_${Date.now()}.pdf`
            );
        } catch (error) {
            console.error('Error al generar el PDF de tarjetas:', error);
        } finally {
            setIsGeneratingCards(false);
        }
    };

    const selection: TableSelectionProps = {
        isSelected: (id: string) => selectedIds.has(id),
        isAllSelected,
        isIndeterminate,
        onToggleItem: handleToggleItem,
        onToggleAll: handleToggleAll,
        getId: (item: Entities) => (item as CreditTable).creditId ?? '',
    };

    const [selectedItem, setSelectedItem] = useState<CreditTable>({
        creditId: "123",
        created: 1775584822000,
        customerBasicInfo: {
            customerId: "1234",
            fullName: "Edgar Fabricio",
            phoneNumber: "12345666"
        },
        employeeBasicInfo: {
            fullName: "juan gomez ",
            userId: "123",
            phoneNumber: "12345666"
        },
        endDate: 1,
        lastName: "Fabricio",
        name: "Edgar",
        startDate: 1,
        status: "activo",
        total: 0

    });

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
        setSelectedItem({ ...item as CreditTable });
        setShowModalDeleteItemConfirm(true);
        console.log("handleOnClick-customer: ", item);
        console.log("Actualizando...");
    };
    const handleOnChangeFilters = (
        documentFilter: Record<string, { category: string, value: string }[]>,
        newDateRange: DateRangeValue,
        selectedEmployee: EmployeeWalletOption | null,
        selectedCustomer: CustomerOption | null
    ) => {
        console.log("handleOnChangeFilters-documentFilter:", documentFilter);
        console.log("handleOnChangeFilters-newDateRange:", newDateRange);
        console.log("handleOnChangeFilters-selectedEmployee:", selectedEmployee);
        console.log("handleOnChangeFilters-selectedCustomer:", selectedCustomer);

        // Traduce los labels visibles seleccionados en el modal a los valores
        // reales que espera el backend (StatusEnum / TransactionStatusEnum)
        const creditStatusValues: string[] = defaultTo(documentFilter["estatusCredito"], [])
            .map((filter: { category: string, value: string }) => CREDIT_STATUS_OPTIONS[filter.value])
            .filter(Boolean);

        const transactionStatusValues: string[] = defaultTo(documentFilter["estatusTransaccion"], [])
            .map((filter: { category: string, value: string }) => TRANSACTION_STATUS_OPTIONS[filter.value])
            .filter(Boolean);

        const tempFilterItems: FiltersItems = {
            status: creditStatusValues,
            transactionStatus: transactionStatusValues,
            creditorCompanyId,
            userId: selectedEmployee?.optionId,
            customerId: selectedCustomer?.optionId,
            // startOfDayLocal/endOfDayLocal: ver dateRangeTimezone.ts — evita
            // interpretar la fecha como medianoche UTC en vez de México (UTC-6).
            ...(newDateRange.range ? {
                createdRangeDate: {
                    startDate: startOfDayLocal(newDateRange.range.startDate),
                    endDate: endOfDayLocal(newDateRange.range.endDate),
                },
            } : {}),
        }

        setFilterItems(tempFilterItems);
        setDateRange(newDateRange);
        setPage(0);
        clearSelection();

        searchCreditsData({
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


    /*
    */
    const handleOnPageChange = (event?: object | any, newPage?: number) => {
        setPage(defaultTo(newPage, 0));
        searchCreditsData({
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
        searchCreditsData({
            filtersItems: filterItems,
            pagination: {
                limit: get(event, "target.value", 5),
                pageNumber: 0,
            }
        });
        console.log("TablePagination-onPageChange-event:", event);
    };



    useEffect(() => {
        searchCreditsData({
            filtersItems: filterItems,
            pagination: {
                limit: rowsPerPageChange,
                pageNumber: page
            }
        });
    }, [creditsData.entityName]);


    return {
        generateCardButtonProps: {
            label: isGeneratingCards ? "Generando..." : "Generar tarjeta",
            disabled: selectedIds.size === 0 || isGeneratingCards,
            onClick: handleGenerateCard,
            templateOptions: CREDIT_CARD_TEMPLATES,
            selectedTemplateId,
            onTemplateChange: setSelectedTemplateId,
        },
        dashboardHeaderProps: {
            tittle: "Créditos",
            count: creditsData.total,
            handleOnClick
        },
        dashboardTableProps: {
            toolBarFilterProps: {
                filterOptions: CATALOG_FILTER_OPTIONS,
                dateRange,
                employeeOptions,
                onEmployeeInputChange: handleSearchEmployeeInput,
                employeeSearchLoading,
                customerOptions,
                onCustomerInputChange: handleSearchCustomerInput,
                customerSearchLoading,
                handleOnChangeFilters,
            },
            tablePaginationProps: {
                count: creditsData.total,
                page: page,
                rowsPerPage: rowsPerPageChange,
                rowsPerPageOptions: [5, 8, 15, 25, 100],
                onPageChange: handleOnPageChange,
                onRowsPerPageChange: handleOnRowsPerPageChange
            },
            data: creditsData,
            renderColumnsTable,
            selection,
            handleOnEditClick,
            handleOnDeleteClick,
        },
        /*dashboardTable: {
            toolBarfilterProps: {
                filterOptions: CATALOG_FILTER_OPTIONS,
                handleOnChangeFilters
            },
            tablePaginationProps: {
                count: data.total,
                page: 0,
                rowsPerPage: 15,
                rowsPerPageOptions: [5, 8, 15, 25],
                onPageChange: () => console.log("TablePagination-onPageChange"),
                onRowsPerPageChange: () => console.log("TablePagination-onRowsPerPageChange")
            },
            data,
            renderColumnsTable,
            handleOnEditClick,
            handleOnDeleteClick,
        },*/
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
                phoneNumber: "",
                address: "",
            },
            open: showModalDeleteItemConfirm,
            loadingDeleteItem: false,
            handleOnDeleteConfirm,
            handleOnDeleteCancel,
        }
    }
}