import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs'
import { CustomerTable } from '@/types/CustomerTable'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from './storages/session-storage.storage';
import { SearchCustomersRequest } from '@/types/SearchCustomersRequest';
import axios from "../shared/utils/axiosUtils"
import { get } from 'lodash';
import { CustomerOption } from '@/shared/constants/catalogs/customers.catalog';

// Petición HTTP compartida — searchCustomersData y searchCustomerOptions
// pegan al mismo endpoint, solo cambia en qué cajón del store guarda cada
// una el resultado (ver comentario de customerOptions más abajo).
const fetchCustomers = (request: SearchCustomersRequest) => {
    // return axios.post<{ total: number, records: any[] }>("http://localhost:4001/credits/searchCustomers", request);
    return axios.post<{ total: number, records: any[] }>("https://credit-saas-gateway.onrender.com/credits/searchCustomers", request);
};

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

    // Slice aparte para dropdowns/autocomplete (ej. filtro de Créditos) — a
    // propósito NO comparte estado con customersData: esa es la que usa la
    // tabla paginada de la pantalla de Clientes, y si un dropdown de otra
    // pantalla la pisara con su propia búsqueda, rompería esa pantalla al
    // navegar.
    customerOptions: CustomerOption[],
    searchCustomerOptions: (request: SearchCustomersRequest) => Promise<void>
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
                const response = await fetchCustomers(request);
                console.log(response.data);
                set(state => ({
                    customersData: {
                        records: get(response.data, "data.records", []),
                        total: get(response.data, "data.total", 0),
                        entityName: DashboardTableCatalogEnum.customers
                    }
                }))
            },
            customerOptions: [],
            searchCustomerOptions: async (request: SearchCustomersRequest) => {
                const response = await fetchCustomers(request);
                console.log(response.data);
                // Mapea el doc crudo de customer (contact.name/lastName/phoneNumber)
                // -> CustomerOption, que es lo que espera el Autocomplete del filtro.
                const options: CustomerOption[] = get(response.data, "data.records", []).map((customer: any) => ({
                    optionId: get(customer, '_id', ''),
                    label: `${get(customer, 'contact.name', '')} ${get(customer, 'contact.lastName', '')}`.trim(),
                    phoneNumber: get(customer, 'contact.phoneNumber', ''),
                }));
                set(state => ({ customerOptions: options }))
            }
        }),
        {
            name: "customer-storage",
            storage: customSessionStorage
        }
    )
)
