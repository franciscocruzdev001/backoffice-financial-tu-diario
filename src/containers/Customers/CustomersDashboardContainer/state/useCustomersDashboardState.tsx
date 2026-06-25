import { DashboardHeaderProps } from '@/components/atoms/DashboardHeader/DashboardHeader';
import { ModalDeleteItemConfirmDialogProps } from '@/components/molecules/ModalDialog/ModalDeleteItemConfirmDialog/ModalDeleteItemConfirmDialog';
import { SnackbarNotificationProps } from '@/components/molecules/SnackbarNotification/SnackbarNotification';
import { DashboardTableProps } from '@/components/molecules/Table/DahsboardTable/DashboardTable';
import { DashboardTableCatalog, DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { Category, Entities } from '@/shared/constants/table_types_data';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import { getFullName } from '@/shared/utils/ProcessDataUtils';
import { useCustomerStore } from '@/stores/customers.store';
import { CustomerTable } from '@/types/CustomerTable';
import { useEffect, useState } from 'react'

const CATALOG_FILTER_OPTIONS: Record<Category, string[]> = {
    "estatus": ["Activo", "Inactivo", "Pendiente", "Suspendido"],
    "registro": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
};




export interface IUseCustomersDashboardState {
    /*dashboardHeader: {
        handleOnClick: (event?: object | any) => void;
    },*
    /*dashboardTable: {
        toolBarfilterProps: ToolbarDashboardFilterProps;
        tablePaginationProps: TablePaginationProps;
        renderColumnsTable: IColumnsTable[];
        //filterOptions: Record<Category, string[]>;
        data: { records: Customer[], total: number, entityName: DashboardTableCatalogEnum }
        handleOnEditClick: (customer: Customer) => void;
        handleOnDeleteClick: (customer: Customer) => void;
        //handleOnChangeFilters: (documentFilter: object) => void;
    },*/
    dashboardHeaderProps: DashboardHeaderProps,
    dashboardTableProps: DashboardTableProps,
    snackbarNotificationProps: SnackbarNotificationProps,
    modalDeleteItemConfirmProps: ModalDeleteItemConfirmDialogProps
    /*modalDeleteItemConfirm: {
        selectedItem: Customer,
        showModalDialog: boolean,
        handleOnDeleteConfirm: (event?: object | any) => void;
        handleOnDeleteCancel: (event?: object | any) => void;
    }*/
}

export const useCustomersDashboardState = (): IUseCustomersDashboardState => {
    //const [data, setData] = useState<{ records: CustomerTable[], total: number, entityName: DashboardTableCatalogEnum }>({ records: MOCK_CLIENTS, total: MOCK_CLIENTS.length, entityName: DashboardTableCatalogEnum.customers });
    const { customersData, searchCustomersData } = useCustomerStore();
    const [renderColumnsTable, setRenderColumnsTable] = useState<IColumnsTable[]>(DashboardTableCatalog[DashboardTableCatalogEnum.customers]);
    const [showModalDeleteItemConfirm, setShowModalDeleteItemConfirm] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<CustomerTable>({
        customerId: "123",
        created: 1775584822000,
        name: "Jose De Jesus",
        lastName: "Tapia",
        address: "San jose, teran",
        phoneNumber: "1234567890",
        status: "activo",
        createdByEmployee: {
            fullName: "Jose Manuel Tapia",
            phoneNumber: "1234567890"
        }
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
        setSelectedItem({ ...item as CustomerTable });
        setShowModalDeleteItemConfirm(true);
        console.log("handleOnClick-customer: ", item);
        console.log("Actualizando...");
    };
    const handleOnChangeFilters = (documentFilter: Record<string, { category: string, value: string }[]>) => {
        console.log("handleOnChangeFilters-documentFilter:", documentFilter);

        const status: string[] = documentFilter["estatus"].map((filter: { category: string, value: string }) => filter.value );

        searchCustomersData({
            createdByEmployeeId: "123",
            status: status,
            pagination: {
                limit: 10,
                pageNumber: 1
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
    const handleOnPageChange = (event?: object | any) => {
        console.log("TablePagination-onPageChange-event:", event);
    };



    useEffect(() => {
        searchCustomersData({
            createdByEmployeeId: "123",
            status: ["active"],
            pagination: {
                limit: 10,
                pageNumber: 1
            }
        });
    }, [customersData.entityName]);


    return {
        dashboardHeaderProps: {
            tittle: `Clientes ${customersData.total}`,
            handleOnClick
        },
        dashboardTableProps: {
            toolBarFilterProps: {
                filterOptions: CATALOG_FILTER_OPTIONS,
                handleOnChangeFilters,
            },
            tablePaginationProps: {
                count: customersData.total,
                page: 0,
                rowsPerPage: 5,
                rowsPerPageOptions: [5, 8, 15, 25],
                onPageChange: handleOnPageChange,
                onRowsPerPageChange: () => console.log("TablePagination-onRowsPerPageChange")
            },
            data: customersData,
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
                phoneNumber: selectedItem.phoneNumber,
                address: selectedItem.address,
            },
            open: showModalDeleteItemConfirm,
            loadingDeleteItem: false,
            handleOnDeleteConfirm,
            handleOnDeleteCancel,
        }
    }
}
