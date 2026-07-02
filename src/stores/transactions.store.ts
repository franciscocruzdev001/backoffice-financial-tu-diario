import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from './storages/session-storage.storage';
import axios from "../shared/utils/axiosUtils"
import { get } from 'lodash';
import { SearchTransactionsRequest } from '@/types/SearchTransactionsRequest';
import { TransactionTable } from '@/types/TransactionTable';

interface TransactionStoreState {
    transactionsData: {
        records: TransactionTable[],
        total: number,
        entityName: DashboardTableCatalogEnum
    },
    setTransactionsData: (value: {
        records: TransactionTable[],
        total: number,
        entityName: DashboardTableCatalogEnum
    }) => void,
    searchTransactionsData: (request: SearchTransactionsRequest) => Promise<void>


}


export const useTransactionStore = create<TransactionStoreState>()( 
    persist(
        (set) => ({
            transactionsData: { records: [], total: 0, entityName: DashboardTableCatalogEnum.transactions },
            setTransactionsData: (value: {
                records: TransactionTable[],
                total: number,
                entityName: DashboardTableCatalogEnum
            }) => set(state => ({ transactionsData: value })),
            searchTransactionsData: async (request: SearchTransactionsRequest) => {
                const response = await axios.post<{ total: number, records: any[] }>("http://localhost:4003/transactions/SearchTransactions", request);
                console.log(response.data);
                set(state => ({
                    transactionsData: {
                        records: get(response.data, "data.records", []),
                        total: get(response.data, "data.total", 0),
                        entityName: DashboardTableCatalogEnum.transactions
                    }
                }))
            }
        }),
        {
            name: "transaction-storage",
            storage: customSessionStorage
        }
    )
)
