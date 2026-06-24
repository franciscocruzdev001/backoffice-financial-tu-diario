import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs'
import { CustomerTable } from '@/types/CustomerTable'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from './storages/session-storage.storage';
import { SearchCustomersRequest } from '@/types/SearchCustomersRequest';
import axios from "../shared/utils/axiosUtils"
import { get } from 'lodash';




const MOCK_CLIENTS: CustomerTable[] = [
    {
        customerId: "12687361872alskduefb",
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo",
        created: 1774658142000,
        createdByEmployee: {
            fullName: "Manuel de Jesus Escobar",
            phoneNumber: "9612345678"
        }
    },
    {
        customerId: "123898990129asdjaskljdkl",
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo",
        created: 1774658142000,
        createdByEmployee: {
            fullName: "Manuel de Jesus Escobar",
            phoneNumber: "9612345678"
        }
    },
    {
        customerId: "1872687320918290dsjjkdskj",
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo",
        created: 1774658142000,
        createdByEmployee: {
            fullName: "Manuel de Jesus Escobar",
            phoneNumber: "9612345678"
        }
    },
    {
        customerId: "12987893672shkjdhfkjas",
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo",
        created: 1774658142000,
        createdByEmployee: {
            fullName: "Manuel de Jesus Escobar",
            phoneNumber: "9612345678"
        }
    },
    {
        customerId: "19827398721kjhsdkjhakjs",
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo",
        created: 1774658142000,
        createdByEmployee: {
            fullName: "Manuel de Jesus Escobar",
            phoneNumber: "9612345678"
        }
    },
    {
        customerId: "8367582923nmnbndmfbdsnbmf",
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo",
        created: 1774658142000,
        createdByEmployee: {
            fullName: "Manuel de Jesus Escobar",
            phoneNumber: "9612345678"
        }
    },
    {
        customerId: "9387263632hjajshjdas",
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo",
        created: 1774658142000,
        createdByEmployee: {
            fullName: "Manuel de Jesus Escobar",
            phoneNumber: "9612345678"
        }
    },
    {
        customerId: "94365398332ajhdsghjas",
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo",
        created: 1774658142000,
        createdByEmployee: {
            fullName: "Manuel de Jesus Escobar",
            phoneNumber: "9612345678"
        }
    },
    {
        customerId: "4369132729ahsjkddsx",
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo",
        created: 1774658142000,
        createdByEmployee: {
            fullName: "Manuel de Jesus Escobar",
            phoneNumber: "9612345678"
        }
    },
    {
        customerId: "244878293774jadkhasjkj",
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo",
        created: 1774658142000,
        createdByEmployee: {
            fullName: "Manuel de Jesus Escobar",
            phoneNumber: "9612345678"
        }
    },
    {
        customerId: "05948837823snkjdas",
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo",
        created: 1774658142000,
        createdByEmployee: {
            fullName: "Manuel de Jesus Escobar",
            phoneNumber: "9612345678"
        }
    },
    {
        customerId: "112490975254832hsjsdjb",
        name: "Chema de jesus",
        lastName: "Tapia",
        phoneNumber: "9612345678",
        address: "Direccion de pruebaaaaaaaaa.",
        status: "activo",
        created: 1774658142000,
        createdByEmployee: {
            fullName: "Manuel de Jesus Escobar",
            phoneNumber: "9612345678"
        }
    }
];


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
            customersData: { records: MOCK_CLIENTS, total: MOCK_CLIENTS.length, entityName: DashboardTableCatalogEnum.customers },
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
