import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from './storages/session-storage.storage';
import axios from "../shared/utils/axiosUtils"
import { get } from 'lodash';
import { EmployeeTable } from '@/types/EmployeeTable';
import { SearchEmployeesRequest } from '@/types/SearchEmployeesRequest';
import { Users } from '@/types/Users';


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
                const response = await axios.post<{ total: number, records: any[] }>("http://localhost:4001/credits/searchEmployees", request);
                console.log(response.data);
                set(state => ({
                    employeesData: {
                        records: get(response.data, "data.records", []),
                        total: get(response.data, "data.total", 0),
                        entityName: DashboardTableCatalogEnum.employees
                    }
                }))
            },
            createUser: async (request: Users) => {
                const response = await axios.post<{ mensaje: string, data: boolean }>("http://localhost:4000/authorizer/createUser", request);
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

