import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from './storages/session-storage.storage';
import axios from "../shared/utils/axiosUtils"
import { get } from 'lodash';
import { EmployeeTable } from '@/types/EmployeeTable';
import { SearchEmployeesRequest } from '@/types/SearchEmployeesRequest';

interface EmployeeStoreState {
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


}


export const useEmployeeStore = create<EmployeeStoreState>()( 
    persist(
        (set) => ({
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
            }
        }),
        {
            name: "employee-storage",
            storage: customSessionStorage
        }
    )
)
