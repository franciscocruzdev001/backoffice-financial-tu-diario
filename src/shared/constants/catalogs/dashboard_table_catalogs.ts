import { IColumnsTable } from "@/shared/interfaces/IColumnsTable"

export enum DashboardTableCatalogEnum {
    customers = "customers",
    credits = "credits",
    employees = "employees",
    transactions = "transactions"
}

export enum CustomerColumnsEnum {
    customerName = "customerName",
    phoneNumber = "phoneNumber",
    address = "address",
    endorsement = "endorsement",
    employee = "employee",
    status = "status",
    created = "created",
    actions = "actions"
}

export enum CreditColumnsEnum {
    customers = "customers",
    credits = "credits",
    employees = "employees"
}

export enum EmployeeColumnsEnum {
    employeeName = "customers",
    phoneNumber = "phoneNumber",
    address = "address",
    status = "status",
    created = "created",
    actions = "actions"
}

export enum TransactionColumnsEnum {
    customers = "customers",
    credits = "credits",
    employees = "employees"
}

const ALL_CUSTOMER_RENDER_COLUMNS: IColumnsTable[] = [
    { columnTableId: CustomerColumnsEnum.customerName, tittle: "Nombre" },
    { columnTableId: CustomerColumnsEnum.phoneNumber, tittle: "Telefono" },
    { columnTableId: CustomerColumnsEnum.address, tittle: "Direccion" },
    { columnTableId: CustomerColumnsEnum.endorsement, tittle: "Aval" },
    { columnTableId: CustomerColumnsEnum.employee, tittle: "Empleado" },
    { columnTableId: CustomerColumnsEnum.status, tittle: "Estatus" },
    { columnTableId: CustomerColumnsEnum.created, tittle: "Registro" },
    { columnTableId: CustomerColumnsEnum.actions, tittle: "Acciones" }
];

const ALL_EMPLOYEE_RENDER_COLUMNS: IColumnsTable[] = [
    { columnTableId: EmployeeColumnsEnum.employeeName, tittle: "Nombre Empleado" },
    { columnTableId: EmployeeColumnsEnum.phoneNumber, tittle: "Telefono" },
    { columnTableId: EmployeeColumnsEnum.address, tittle: "Direccion" },
    { columnTableId: EmployeeColumnsEnum.status, tittle: "Status" },
    { columnTableId: EmployeeColumnsEnum.created, tittle: "Registro" },
    { columnTableId: EmployeeColumnsEnum.actions, tittle: "Acciones" }
];

export const DashboardTableCatalog: Record<string, IColumnsTable[]> = {
    [DashboardTableCatalogEnum.customers]: ALL_CUSTOMER_RENDER_COLUMNS,
    [DashboardTableCatalogEnum.credits]: [],
    [DashboardTableCatalogEnum.employees]: ALL_EMPLOYEE_RENDER_COLUMNS,
    [DashboardTableCatalogEnum.transactions]: []
}