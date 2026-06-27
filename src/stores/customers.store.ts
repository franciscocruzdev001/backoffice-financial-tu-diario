import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs'
import { CustomerTable } from '@/types/CustomerTable'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from './storages/session-storage.storage';
import { SearchCustomersRequest } from '@/types/SearchCustomersRequest';
import axios from "../shared/utils/axiosUtils"
import { get } from 'lodash';

interface CustomerStoreState {
    customersData: {
        records: CustomerTable[],
        total: number,
        entityName: DashboardTableCatalogEnum
    },
    setCustomersData: (value: {
        records: CustomerTable[],
        total: number,
        entityName: DashboardTableCatalogEnum
    }) => void,
    searchCustomersData: (request: SearchCustomersRequest) => Promise<void>


}


export const useCustomerStore = create<CustomerStoreState>()( 
    persist(
        (set) => ({
            customersData: { records: [], total: 0, entityName: DashboardTableCatalogEnum.customers },
            setCustomersData: (value: {
                records: CustomerTable[],
                total: number,
                entityName: DashboardTableCatalogEnum
            }) => set(state => ({ customersData: value })),
            searchCustomersData: async (request: SearchCustomersRequest) => {
                const response = await axios.post<{ total: number, records: any[] }>("http://localhost:4001/credits/searchCustomers", request);
                console.log(response.data);
                set(state => ({
                    customersData: {
                        records: get(response.data, "data.records", []),
                        total: get(response.data, "data.total", 0),
                        entityName: DashboardTableCatalogEnum.customers
                    }
                }))
            }
        }),
        {
            name: "customer-storage",
            storage: customSessionStorage
        }
    )
)
