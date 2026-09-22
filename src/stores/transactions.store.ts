import { DashboardTableCatalogEnum } from '@/shared/constants/catalogs/dashboard_table_catalogs'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from './storages/session-storage.storage';
import axios from "../shared/utils/axiosUtils"
import { get } from 'lodash';
import { SearchTransactionsRequest } from '@/types/SearchTransactionsRequest';
import { TransactionTable } from '@/types/TransactionTable';
import { TransactionChangeStatusBatchLogs } from '@/types/TransactionChangeStatusBatchLogs';

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
    searchTransactionsData: (request: SearchTransactionsRequest) => Promise<void>,
    approveTransactionsOperations: (transactionIds: string[]) => Promise<TransactionChangeStatusBatchLogs>,
    cancelTransactionsOperations: (transactionIds: string[]) => Promise<TransactionChangeStatusBatchLogs>

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
                // const response = await axios.post<{ total: number, records: any[] }>("http://localhost:4003/transactions/SearchTransactions", request);
                const response = await axios.post<{ total: number, records: any[] }>("https://credit-saas-gateway.onrender.com/transactions/SearchTransactions", request);
                console.log(response.data);

                // Mapea la transacción cruda del backend (con $lookup anidado
                // creditInfo -> customerInfo) -> TransactionTable (frontend).
                const mappedRecords: TransactionTable[] = get(response.data, "data.records", []).map((transaction: any) => {
                    const creditInfo = get(transaction, 'creditInfo[0]');
                    const customerInfo = get(creditInfo, 'customerInfo[0]');

                    return {
                        ...transaction,
                        customerBasicInfo: customerInfo ? {
                            customerId: get(creditInfo, 'customerId', ''),
                            fullName: `${get(customerInfo, 'contact.name', '')} ${get(customerInfo, 'contact.lastName', '')}`.trim(),
                            phoneNumber: get(customerInfo, 'contact.phoneNumber', ''),
                            address: get(customerInfo, 'contact.address', ''),
                        } : undefined,
                        // Permite distinguir en la tabla 2 transacciones del mismo
                        // cliente/monto que en realidad apuntan a créditos distintos.
                        creditBasicInfo: creditInfo ? {
                            creditId: get(creditInfo, '_id', ''),
                            total: get(creditInfo, 'creditAmount', 0),
                            amountPaid: get(creditInfo, 'amountPaid', 0),
                            amountDue: get(creditInfo, 'amountDue', 0),
                        } : undefined,
                    };
                });

                set(state => ({
                    transactionsData: {
                        records: mappedRecords,
                        total: get(response.data, "data.total", 0),
                        entityName: DashboardTableCatalogEnum.transactions
                    }
                }))
            },
            approveTransactionsOperations: async (transactionIds: string[]) => {
                // const response = await axios.post<{ data: TransactionChangeStatusBatchLogs }>("http://localhost:4003/transactions/approveTransactionsOperations", { transactionIds });
                const response = await axios.post<{ data: TransactionChangeStatusBatchLogs }>("https://credit-saas-gateway.onrender.com/transactions/approveTransactionsOperations", { transactionIds });
                return get(response.data, "data", {
                    changeStatus: "approved",
                    resumeTotalsByTransactionType: []
                });
            },
            cancelTransactionsOperations: async (transactionIds: string[]) => {
                // const response = await axios.post<{ data: TransactionChangeStatusBatchLogs }>("http://localhost:4003/transactions/cancelTransactionsOperations", { transactionIds });
                const response = await axios.post<{ data: TransactionChangeStatusBatchLogs }>("https://credit-saas-gateway.onrender.com/transactions/cancelTransactionsOperations", { transactionIds });
                return get(response.data, "data", {
                    changeStatus: "cancelled",
                    resumeTotalsByTransactionType: []
                });
            }
        }),
        {
            name: "transaction-storage",
            storage: customSessionStorage
        }
    )
)
