import { IFinancialMenuItem } from "@/infrastructure/interfaces/Main/IFinancialMenu";
import { IUserRoleInfo } from "@/infrastructure/interfaces/Main/IUserRoleInfo";
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    AccountBalance as LoanIcon,
    Payment as PaymentIcon,
    Work as WorkIcon,
    PersonAdd as PersonAddIcon,
    AdfScanner as AdfScannerIcon,
    Add as AddIcon,
    Search as SearchIcon,
    CreditCard as CreditCardIcon,
    Assessment as ReportIcon
} from '@mui/icons-material';

const ALL_REPORT_SUBMENU_ITEMS_TEST: IFinancialMenuItem[] = [
    {
        tittle: 'Tarjetas de Pago',
        subtittle: 'Generar tarjetas de control de pagos',
        icon: <CreditCardIcon/>,
        path: '/reportes/tarjetas-pago'
    },
];

const ALL_CLIENT_SUBMENU_ITEMS_TEST: IFinancialMenuItem[] = [
    { tittle: "Lista de Clientes", subtittle: "Ver todos los clientes", icon: <PeopleIcon/>, path: "/clientes" },
    { tittle: "Nuevo Cliente", subtittle: "Registrar cliente nuevo", icon: <AddIcon/>, path: "/clientes/nuevo" },
    { tittle: "Historial y Búsqueda", subtittle: "Buscar cliente y ver historial", icon: <SearchIcon/>, path: "/clientes/historial" }
];

const ALL_MENU_ITEMS_TEST: IFinancialMenuItem[] = [
    { tittle: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { tittle: "Clientes", icon: <PeopleIcon/>, financialSubmenuItems: ALL_CLIENT_SUBMENU_ITEMS_TEST },
    { tittle: "Préstamos", icon: <LoanIcon/>, path: "/prestamos" },
    { tittle: "Pagos", icon: <PaymentIcon/>, path: "/pagos" },
    { tittle: "Trabajadores", icon: <WorkIcon/>, path: "/trabajadores" },
    { tittle: "Moratorios", icon: <PersonAddIcon/>, path: "/moratorios" },
    { tittle: "Caja", icon: <AdfScannerIcon/>, path: "/caja" },
    { tittle: "DashTrabajadores", icon: <AdfScannerIcon/>, path: "/DashTrabajador" },
    { tittle: "Recolección Trabajadores", icon: <AdfScannerIcon/>, path: "/recoleccion-trabajador" },
    { tittle: "Reportes", icon: <ReportIcon/>, financialSubmenuItems: ALL_REPORT_SUBMENU_ITEMS_TEST }
];


export const INITIAL_USER_ROL_INFO: IUserRoleInfo = {
    fullName: "Usuario de prueba",
    firstName: "Usuario",
    lastName: "prueba",
    userName: "",
    financialMenuItems: ALL_MENU_ITEMS_TEST
};
