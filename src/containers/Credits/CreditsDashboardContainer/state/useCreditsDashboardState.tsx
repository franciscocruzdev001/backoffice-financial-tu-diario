import { DashboardHeaderProps } from '@/components/atoms/DashboardHeader/DashboardHeader';
import { ModalDeleteItemConfirmDialogProps } from '@/components/molecules/ModalDialog/ModalDeleteItemConfirmDialog/ModalDeleteItemConfirmDialog';
import { SnackbarNotificationProps } from '@/components/molecules/SnackbarNotification/SnackbarNotification';
import { DashboardTableProps } from '@/components/molecules/Table/DahsboardTable/DashboardTable';
import { DashboardTableCatalog, DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { Category, Entities } from '@/shared/constants/table_types_data';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import { getFullName } from '@/shared/utils/ProcessDataUtils';
import { useCreditStore } from '@/stores/credits.store';
import { CreditTable } from '@/types/CreditTable';
import { FiltersItems } from '@/types/SearchCreditsRequest';
import { defaultTo, get } from 'lodash';
import { useEffect, useState } from 'react';



const CATALOG_FILTER_OPTIONS: Record<Category, string[]> = {
    "estatus": ["Activo", "Inactivo", "Pendiente", "Suspendido"],
    "registro": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
};

export interface IUseCreditsDashboardState {
    dashboardHeaderProps: DashboardHeaderProps,
    dashboardTableProps: DashboardTableProps,
    snackbarNotificationProps: SnackbarNotificationProps,
    modalDeleteItemConfirmProps: ModalDeleteItemConfirmDialogProps


}

export const useCreditsDashboardState = (): IUseCreditsDashboardState => {
    /**
     * Credits data state
     */
    const { creditsData, searchCreditsData } = useCreditStore();
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




    const [renderColumnsTable, setRenderColumnsTable] = useState<IColumnsTable[]>(DashboardTableCatalog[DashboardTableCatalogEnum.credits]);
    const [showModalDeleteItemConfirm, setShowModalDeleteItemConfirm] = useState<boolean>(false);
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
    const handleOnChangeFilters = (documentFilter: Record<string, { category: string, value: string }[]>) => {
        console.log("handleOnChangeFilters-documentFilter:", documentFilter);

        const tempFilterItems: FiltersItems = {
            status: defaultTo(documentFilter["estatus"], []).map((filter: { category: string, value: string }) => filter.value),
            creditorCompanyId: "123"
        }

        setFilterItems(tempFilterItems);
        setPage(0);

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
        dashboardHeaderProps: {
            tittle: `Clientes ${creditsData.total}`,
            handleOnClick
        },
        dashboardTableProps: {
            toolBarFilterProps: {
                filterOptions: CATALOG_FILTER_OPTIONS,
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