import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from './storages/session-storage.storage';
import axios from "../shared/utils/axiosUtils"
import { get } from 'lodash';
import { CreditTable } from '@/types/CreditTable';
import { SearchCreditsRequest } from '@/types/SearchCreditsRequest';
import { EMPLOYEE_WALLET_OPTIONS } from '@/shared/constants/catalogs/employeeWallets.catalog';

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
                // const response = await axios.post<{ total: number, records: any[] }>("http://localhost:4001/credits/searchCredits", request);
                const response = await axios.post<{ total: number, records: any[] }>("https://credit-saas-gateway.onrender.com/credits/searchCredits", request);
                console.log(response.data);

                // Mapea ICreditsWithCustomerBasicInformation (backend, ya con el
                // $lookup real de customers) -> CreditTable (frontend). El empleado
                // sigue resolviéndose LOCAL (el backend no hace join de usuarios).
                const mappedRecords: CreditTable[] = get(response.data, "data.records", []).map((credit: any) => {
                    const employee = EMPLOYEE_WALLET_OPTIONS.find(
                        (e) => e.optionId === credit.userId?.toString()
                    );
                    const customerInfo = get(credit, 'customerInfo[0]');

                    return {
                        creditId: get(credit, '_id', ''),
                        created: credit.admissionDate ? new Date(credit.admissionDate).getTime() : Date.now(),
                        creditorCompanyId: get(credit, 'creditorCompanyId', ''),
                        name: get(customerInfo, 'contact.name', 'Cliente'),
                        lastName: get(customerInfo, 'contact.lastName', ''),
                        startDate: credit.admissionDate ? new Date(credit.admissionDate).getTime() : 0,
                        endDate: credit.expirationDate ? new Date(credit.expirationDate).getTime() : 0,
                        status: get(credit, 'status', ''),
                        total: get(credit, 'creditAmount', 0),
                        transactionStatus: get(credit, 'transactionStatus', ''),
                        amountDue: get(credit, 'amountDue', 0),
                        amountPaid: get(credit, 'amountPaid', 0),
                        customerBasicInfo: customerInfo ? {
                            customerId: get(credit, 'customerId', ''),
                            fullName: `${get(customerInfo, 'contact.name', '')} ${get(customerInfo, 'contact.lastName', '')}`.trim(),
                            phoneNumber: get(customerInfo, 'contact.phoneNumber', ''),
                            address: get(customerInfo, 'contact.address', ''),
                        } : undefined,
                        // El id de empleado viene directo del crédito (credit.userId);
                        // el match contra EMPLOYEE_WALLET_OPTIONS es solo para enriquecer
                        // nombre/telefono si existe, pero no debe bloquear mostrar el id.
                        employeeBasicInfo: credit.userId ? {
                            userId: credit.userId.toString(),
                            fullName: employee?.label ?? '',
                            phoneNumber: employee?.phoneNumber ?? '',
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