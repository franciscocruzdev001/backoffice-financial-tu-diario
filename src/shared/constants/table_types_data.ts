import { CreditTable } from "@/types/CreditTable";
import { CustomerTable } from "@/types/CustomerTable";
import { EmployeeTable } from "@/types/EmployeeTable";
import { TransactionTable } from "@/types/TransactionTable";

export type Category = string;
export type Entities = EmployeeTable | CustomerTable | CreditTable | TransactionTable;