import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Collapse,
  ListItemButton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  AccountBalance as LoanIcon,
  Payment as PaymentIcon,
  Work as WorkIcon,
  PersonAdd as PersonAddIcon,
  Assessment as ReportIcon,
  History as HistoryIcon,
  Search as SearchIcon,
  PersonSearch as PersonSearchIcon,
  Add as AddIcon,
  CreditCard as CreditCardIcon,
  BarChart as BarChartIcon,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebarStyle } from './Sidebar.style';
import { get, keyBy } from 'lodash';
import { IUserRoleInfo } from '@/infrastructure/interfaces/Main/IUserRoleInfo';
import { IFinancialMenuItem } from '@/infrastructure/interfaces/Main/IFinancialMenu';
import MenuItemButton from '@/components/atoms/MenuItemButton/MenuItemButton';

const SIDEBAR_WIDTH = 280;

export interface SidebarStateProps {
  userRoleInfo: IUserRoleInfo;
}

export interface SidebarFunctionsProps {
  handleOnNavigation: (path: string) => void;
}

export type SidebarProps = SidebarStateProps & SidebarFunctionsProps;

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const classes = useSidebarStyle();
  //const location = useLocation();
  const [keySelectedMenuItemButton, setKeySelectedMenuItemButton] = useState<string>("");
  const userFinancialMenuItems: IFinancialMenuItem[] = get(props.userRoleInfo, "financialMenuItems", []);
  console.log("Sidebar userRoleInfo: ", props.userRoleInfo);
  console.log("Sidebar userFinancialMenuItems: ", userFinancialMenuItems);

  const handleOnClick = (tittle: string, path: string) => {
      console.log("MenuItemButton_handleOnclick...",);
      props.handleOnNavigation(path);
      setKeySelectedMenuItemButton(tittle + "_" + path);
  }

  return (
    <Drawer
      variant="permanent"
      sx={{ ...classes.drawerContainer }}
    >
      <Box sx={{ ...classes.sidebarContainer }}>
        <List>
          {/* Render menu items for user rol */}
          {userFinancialMenuItems.map((item: IFinancialMenuItem) => {
            const path: string = get(item, "path", "");
            const financialSubMenuItems: IFinancialMenuItem[] = get(item, "financialSubmenuItems", []);
            const key: string = `MenuItemButton_${item.tittle}_${path}`;
            return (
              <MenuItemButton
                key={key}
                keySelectedMenuItemButton={keySelectedMenuItemButton}
                tittle={item.tittle}
                icon={item.icon}
                path={path}
                handleOnClick={handleOnClick}
                financialSubMenuItems={financialSubMenuItems}
              />
            );
          })
          }
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ px: 2, py: 1 }}>
          <Box
            sx={{ ...classes.aboutDevContainer }}
          >
            <Box sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
              Préstamos Tu diario v1.0
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;