import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Business as BusinessIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { get } from "lodash";
import { IUserRoleInfo } from '@/infrastructure/interfaces/Main/IUserRoleInfo';
import { useNavbarStyle } from './Navbar.style';
import IconButton from '@/components/atoms/IconButton/IconButton';
import Avatar from '@/components/atoms/Avatar/Avatar';
import { MuiSizeEnum } from '@/shared/constants/PropertiesEnumMuiComponets';
import { useNavbarState } from './state/useNavbarState';

export interface NavbarStateProps {
    userRoleInfo: IUserRoleInfo
}

export interface NavbarFunctionsProps {
  handleLogout: () => void;
}

export type NavbarProps = NavbarStateProps & NavbarFunctionsProps;

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const classes = useNavbarStyle();
  const userName: string = get(props.userRoleInfo, "userName", "");
  const { anchorEl, handleMenuOpen, handleMenuClose } = useNavbarState();
  //const user = JSON.parse(localStorage.getItem('user') || '{}');
  /*const handleLogout = () => {
    authService.logout();
    navigate('/log in');
  };*/

  return (
    <AppBar 
      position="sticky" 
      sx={{...classes.appBarContainer}}
    >
      <Toolbar>
        <Box sx={{...classes.CompanyNameContainer}}>
          <BusinessIcon sx={{ mr: 2, fontSize: '2rem' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            PRESTAMOS TU DIARIO
          </Typography>
        </Box>

        <Box sx={{...classes.menuOptionsContainer}}>
          <Typography variant="body2" sx={{...classes.welcomeMessage}}>
            Bienvenido, {userName}
          </Typography>
          
          <IconButton handleOnClick={handleMenuOpen}>
            <Avatar size={MuiSizeEnum.SMALL}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Divider />
            
            <MenuItem onClick={props.handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cerrar Sesión</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;