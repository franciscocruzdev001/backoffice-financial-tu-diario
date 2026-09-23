import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from './storages/session-storage.storage';
import axios from "../shared/utils/axiosUtils"
import { get } from 'lodash';
import { EmployeeTable } from '@/types/EmployeeTable';
import { SearchEmployeesRequest } from '@/types/SearchEmployeesRequest';
import { Users } from '@/types/Users';
import { EmployeeWalletOption } from '@/shared/constants/catalogs/employeeWallets.catalog';


const fetchEmployees = (request: SearchEmployeesRequest) => {
    // return axios.post<{ total: number, records: any[] }>("http://localhost:4000/authorizer/searchEmployees", request);
    return axios.post<{ total: number, records: any[] }>("https://credit-saas-gateway.onrender.com/authorizer/searchEmployees", request);
};

interface EmployeeStoreState {
    notification: {
        message: string,
        status: "info" | "warning" | "error"
    },
    employeesData: {
        records: EmployeeTable[],
        total: number,
        entityName: DashboardTableCatalogEnum
    },
    setEmployeesData: (value: {
        records: EmployeeTable[],
        total: number,
        entityName: DashboardTableCatalogEnum
    }) => void,
    searchEmployeesData: (request: SearchEmployeesRequest) => Promise<void>
    createUser: (request: Users) => Promise<void>

    employeeOptions: EmployeeWalletOption[],
    searchEmployeeOptions: (request: SearchEmployeesRequest) => Promise<void>
}


export const useEmployeeStore = create<EmployeeStoreState>()(
    persist(
        (set) => ({
            notification: { message: "", status: "info" },
            employeesData: { records: [], total: 0, entityName: DashboardTableCatalogEnum.employees },
            setEmployeesData: (value: {
                records: EmployeeTable[],
                total: number,
                entityName: DashboardTableCatalogEnum
            }) => set(state => ({ employeesData: value })),
            searchEmployeesData: async (request: SearchEmployeesRequest) => {
                const response = await fetchEmployees(request);
                console.log(response.data);
                set(state => ({
                    employeesData: {
                        records: get(response.data, "data.records", []),
                        total: get(response.data, "data.total", 0),
                        entityName: DashboardTableCatalogEnum.employees
                    }
                }))
            },
            employeeOptions: [],
            searchEmployeeOptions: async (request: SearchEmployeesRequest) => {
                const response = await fetchEmployees(request);
                console.log(response.data);
                // Mapea el doc crudo de IUsers (userName, contact.phoneNumber)
                const options: EmployeeWalletOption[] = get(response.data, "data.records", []).map((employee: any) => ({
                    optionId: get(employee, '_id', ''),
                    label: get(employee, 'userName', ''),
                    phoneNumber: get(employee, 'contact.phoneNumber', ''),
                    walletId: '',
                    accountNumber: '',
                }));
                set(state => ({ employeeOptions: options }))
            },
            createUser: async (request: Users) => {
                // const response = await axios.post<{ mensaje: string, data: boolean }>("http://localhost:4000/authorizer/createUser", request);
                const response = await axios.post<{ mensaje: string, data: boolean }>("https://credit-saas-gateway.onrender.com/authorizer/createUser", request);
                console.log(response.data);
                set(state => ({
                    notification: {
                        message: get(response.data, "mensaje", ""),
                        status: get(response.data, "data", false) === true ? "info" : "error"
                    }
                }))
            }
        }),
        {
            name: "employee-storage",
            storage: customSessionStorage
        }
    )
)

