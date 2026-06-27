import { DashboardHeaderProps } from '@/components/atoms/DashboardHeader/DashboardHeader';
import { ModalDeleteItemConfirmDialogProps } from '@/components/molecules/ModalDialog/ModalDeleteItemConfirmDialog/ModalDeleteItemConfirmDialog';
import { SnackbarNotificationProps } from '@/components/molecules/SnackbarNotification/SnackbarNotification';
import { DashboardTableProps } from '@/components/molecules/Table/DahsboardTable/DashboardTable';
import { DashboardTableCatalog, DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { Category, Entities } from '@/shared/constants/table_types_data';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import { getFullName } from '@/shared/utils/ProcessDataUtils';
import { EmployeeTable } from '@/types/EmployeeTable';
import { get } from 'lodash';
import { useState } from 'react'

const CATALOG_FILTER_OPTIONS: Record<Category, string[]> = {
    "estatus": ["Activo", "Inactivo", "Pendiente", "Suspendido"],
    "registro": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
};


const MOCK_EMPLOYEES: EmployeeTable[] = [
    {
        userId: "ahsdkjahskjd",
        created: 1774658142000,
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo"
    },
    {
        userId: "nsdfds32324",
        created: 1774658142000,
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo"
    },
    {
        userId: "lñkk320498u3290nkfds",
        created: 1774658142000,
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo"
    },
    {
        userId: "lkjdflkjdksf9083094r32n",
        created: 1774658142000,
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo"
    },
    {
        userId: "jkahskdjfhkjdshfi3",
        created: 1774658142000,
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo"
    },
    {
        userId: "akjhdjkhaksdkk",
        created: 1774658142000,
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo"
    }
];



export interface IUseEmployeesDashboardState {
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

export const useEmployeesDashboardState = (): IUseEmployeesDashboardState => {
    const [data, setData] = useState<{ records: EmployeeTable[], total: number, entityName: DashboardTableCatalogEnum }>({ records: MOCK_EMPLOYEES, total: MOCK_EMPLOYEES.length, entityName: DashboardTableCatalogEnum.employees });
    const [renderColumnsTable, setRenderColumnsTable] = useState<IColumnsTable[]>(DashboardTableCatalog[DashboardTableCatalogEnum.employees]);
    const [showModalDeleteItemConfirm, setShowModalDeleteItemConfirm] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<EmployeeTable>();

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
        setSelectedItem({ ...item as EmployeeTable });
        setShowModalDeleteItemConfirm(true);
        console.log("handleOnClick-customer: ", item);
        console.log("Actualizando...");
    };
    const handleOnChangeFilters = (documentFilter: object) => {
        console.log("handleOnChangeFilters-documentFilter:", documentFilter);
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


    return {
        dashboardHeaderProps: {
            tittle: `Empleados ${data.total}`,
            handleOnClick
        },
        dashboardTableProps: {
            toolBarFilterProps: {
                filterOptions: CATALOG_FILTER_OPTIONS,
                handleOnChangeFilters,
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
                    get(selectedItem, "name", ""),
                    get(selectedItem, "lastName", "")
                ),
                phoneNumber: get(selectedItem, "phoneNumber", ""),
                address: get(selectedItem, "address", "")
            },
            open: showModalDeleteItemConfirm,
            loadingDeleteItem: false,
            handleOnDeleteConfirm,
            handleOnDeleteCancel,
        }
    }
}