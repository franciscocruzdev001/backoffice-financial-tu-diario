import { IFinancialMenuItem } from "@/infrastructure/interfaces/Main/IFinancialMenu";
import { IUserRoleInfo } from "@/infrastructure/interfaces/Main/IUserRoleInfo";
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    AccountBalance as LoanIcon,
    Payment as PaymentIcon,
    Work as WorkIcon,
    PersonAdd as PersonAddIcon,
    Add as AddIcon,
} from '@mui/icons-material';

// Un item por cada ruta real definida en root.component.tsx — nada de rutas
// que todavía no tienen vista/container detrás.
const ALL_MENU_ITEMS: IFinancialMenuItem[] = [
    { tittle: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { tittle: "Trabajadores", icon: <WorkIcon/>, path: "/employee-dashboard" },
    { tittle: "Clientes", icon: <PeopleIcon/>, path: "/customer-dashboard" },
    { tittle: "Créditos", icon: <LoanIcon/>, path: "/credit-dashboard" },
    { tittle: "Transacciones", icon: <PaymentIcon/>, path: "/transaction-dashboard" },
    { tittle: "Nuevo Trabajador", icon: <PersonAddIcon/>, path: "/employee-create" },
    { tittle: "Nuevo Cliente", icon: <AddIcon/>, path: "/customer-create" },
    { tittle: "Nuevo Crédito", icon: <AddIcon/>, path: "/credit-create" },
    { tittle: "Nueva Transacción", icon: <AddIcon/>, path: "/transaction-create" },
];


export const INITIAL_USER_ROL_INFO: IUserRoleInfo = {
    fullName: "Usuario de prueba",
    firstName: "Usuario",
    lastName: "prueba",
    userName: "",
    financialMenuItems: ALL_MENU_ITEMS
};
