import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from './storages/session-storage.storage';
import axios from "../shared/utils/axiosUtils"
import { get } from 'lodash';
import { CreditTable } from '@/types/CreditTable';
import { SearchCreditsRequest } from '@/types/SearchCreditsRequest';

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
                set(state => ({
                    creditsData: {
                        records: get(response.data, "data.records", []),
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
