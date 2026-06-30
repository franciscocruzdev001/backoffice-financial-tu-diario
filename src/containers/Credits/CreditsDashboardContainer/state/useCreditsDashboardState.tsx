import { DashboardHeaderProps } from '@/components/atoms/DashboardHeader/DashboardHeader';
import { DashboardTableProps } from '@/components/molecules/Table/DahsboardTable/DashboardTable';
import { DashboardTableCatalog, DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs';
import { Category, Entities } from '@/shared/constants/table_types_data';
import { IColumnsTable } from '@/shared/interfaces/IColumnsTable';
import { CreditTable } from '@/types/CreditTable';
import { useState } from 'react';


const CATALOG_FILTER_OPTIONS: Record<Category, string[]> = {
    "estatus": ["Activo", "Inactivo", "Pendiente", "Suspendido"],
    "registro": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
};

export interface IUseCreditsDashboardState {
    dashboardHeaderProps: DashboardHeaderProps,
    dashboardTableProps: DashboardTableProps,


}

export const useCreditsDashboardState = (): IUseCreditsDashboardState => {
    const [creditsData, setCreditsData] = useState<{ records: CreditTable[], total: number, entityName: DashboardTableCatalogEnum }>({
        records: [{
            created: 1,
            creditId: "123",
            customerBasicInfo: {
                customerId: "123",
                fullName: "Edgar urbina",
                phoneNumber: "96123456"

            },
            employeeBasicInfo: {
                fullName: "Juan perez",
                phoneNumber: "96123454",
                userId: "123"

            },
            endDate: 1,
            lastName: "edgar urbina",
            name: "edgar",
            startDate: 1,
            status: "activo",
            total: 1
        }],
        total: 1,
        entityName: DashboardTableCatalogEnum.credits

    });
    const [renderColumnsTable, setRenderColumnsTable] = useState<IColumnsTable[]>(DashboardTableCatalog[DashboardTableCatalogEnum.credits]);

    return {
        dashboardHeaderProps: {
            tittle: `Creditos ${creditsData.total}`,
            handleOnClick: () => console.log("pruebas")
        },
        dashboardTableProps: {
            toolBarFilterProps: {
                filterOptions: CATALOG_FILTER_OPTIONS,
                handleOnChangeFilters: () => console.log("FILTERS")
            },
            tablePaginationProps: {
                count: creditsData.total,
                page: 0,
                rowsPerPage: 5,
                rowsPerPageOptions: [5, 8, 15, 25, 100],
                onPageChange: () => console.log("CHANGE"),
                onRowsPerPageChange: () => console.log("ONROWS CHANGE"),
            },
            data: creditsData,
            renderColumnsTable,
            handleOnEditClick: () => console.log("HANDLE EDIT"),
            handleOnDeleteClick: () => console.log("HANDLE DELETE "),
        }
    }
}