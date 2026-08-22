import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from './storages/session-storage.storage';
import axios from "../shared/utils/axiosUtils"
import { get } from 'lodash';
import { CreditTable } from '@/types/CreditTable';
import { SearchCreditsRequest } from '@/types/SearchCreditsRequest';
import { EMPLOYEE_WALLET_OPTIONS } from '@/shared/constants/catalogs/employeeWallets.catalog';
import { CUSTOMER_OPTIONS } from '@/shared/constants/catalogs/customers.catalog';

interface CreditStoreState {
    creditsData: {
        records: CreditTable[],
        total: number,
        entityName: DashboardTableCatalogEnum
    },
    setCreditsData: (value: {
        records: CreditTable[],
        total: number,
        entityName: DashboardTableCatalogEnum
    }) => void,
    searchCreditsData: (request: SearchCreditsRequest) => Promise<void>
}


export const useCreditStore = create<CreditStoreState>()(
    persist(
        (set) => ({
            creditsData: { records: [], total: 0, entityName: DashboardTableCatalogEnum.credits },
            setCreditsData: (value: {
                records: CreditTable[],
                total: number,
                entityName: DashboardTableCatalogEnum
            }) => set(state => ({ creditsData: value })),
            searchCreditsData: async (request: SearchCreditsRequest) => {
                const response = await axios.post<{ total: number, records: any[] }>("http://localhost:4001/credits/searchCredits", request);
                console.log(response.data);

                // Mapea ICredits (backend, crudo) -> CreditTable (frontend).
                // El backend de /searchCredits no trae info de cliente/empleado
                // (no tiene $lookup), así que se resuelven LOCAL contra catálogos
                // temporales hasta que el backend haga el join real.
                const mappedRecords: CreditTable[] = get(response.data, "data.records", []).map((credit: any) => {
                    const employee = EMPLOYEE_WALLET_OPTIONS.find(
                        (e) => e.optionId === credit.userId?.toString()
                    );
                    const customer = CUSTOMER_OPTIONS.find(
                        (c) => c.optionId === credit.customerId?.toString()
                    );

                    return {
                        creditId: get(credit, '_id', ''),
                        created: credit.admissionDate ? new Date(credit.admissionDate).getTime() : Date.now(),
                        creditorCompanyId: get(credit, 'creditorCompanyId', ''),
                        name: customer?.label?.split(' ')[0] ?? 'Cliente',
                        lastName: customer?.label?.split(' ').slice(1).join(' ') ?? '',
                        startDate: credit.admissionDate ? new Date(credit.admissionDate).getTime() : 0,
                        endDate: credit.expirationDate ? new Date(credit.expirationDate).getTime() : 0,
                        status: get(credit, 'status', ''),
                        total: get(credit, 'creditAmount', 0),
                        customerBasicInfo: customer ? {
                            customerId: customer.optionId,
                            fullName: customer.label,
                            phoneNumber: customer.phoneNumber ?? '',
                        } : undefined,
                        employeeBasicInfo: employee ? {
                            userId: employee.optionId,
                            fullName: employee.label,
                            phoneNumber: employee.phoneNumber ?? '',
                        } : undefined,
                    };
                });
                set(state => ({
                    creditsData: {
                        records: mappedRecords,
                        total: get(response.data, "data.total", 0),
                        entityName: DashboardTableCatalogEnum.credits
                    }
                }))
            }
        }),
        {
            name: "credit-storage",
            storage: customSessionStorage
        }
    )
)