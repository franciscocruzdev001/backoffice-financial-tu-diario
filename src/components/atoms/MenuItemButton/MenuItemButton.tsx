import { IFinancialMenuItem } from '@/infrastructure/interfaces/Main/IFinancialMenu';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, SxProps, Theme } from '@mui/material';
import { defaultTo, get, isEmpty, isEqual } from 'lodash';
import React, { JSX, useState } from 'react'
import { useMenuItemButtonStyle } from './MenuItemButton.style';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export interface MenuItemButtonStateProps {
    tittle: string;
    path: string;
    icon: JSX.Element | any;
    keySelectedMenuItemButton: string;
    financialSubMenuItems?: IFinancialMenuItem[];
}

export interface MenuItemButtonFunctionsProps {
    handleOnClick: (tittle: string, path: string) => void,
}

export type MenuItemButtonProps = MenuItemButtonStateProps & MenuItemButtonFunctionsProps;

const MenuItemButton: React.FC<MenuItemButtonProps> = ({
    tittle,
    path,
    icon,
    keySelectedMenuItemButton,
    handleOnClick,
    ...props
}: MenuItemButtonProps) => {
    const classes = useMenuItemButtonStyle();
    const subMenuItemsButton: IFinancialMenuItem[] = defaultTo(props.financialSubMenuItems, []);
    const containsSubmenu: boolean = !isEmpty(subMenuItemsButton);
    const [subMenuExpanded, setSubMenuExpanded] = useState(false);
    const [focus, setFocus] = useState<boolean>(false);
    const handleSubMenuToggle = () => {
        setSubMenuExpanded(!subMenuExpanded);
    };

    const isOnSelectedItemMenu = (keySelectedMenuItem: string): boolean => {
        const keyCurrentMenuItemButton: string = tittle + "_" + path;
        return isEqual(keySelectedMenuItem, keyCurrentMenuItemButton) ? true : false;
    }


    return (
        <React.Fragment>
            <ListItemButton
                key={"ListItemButton_" + tittle + "_" + ""}
                onClick={() => containsSubmenu ? handleSubMenuToggle() : handleOnClick(tittle, path)}
                sx={{ ...classes.clientMenuItemsButton(isOnSelectedItemMenu(keySelectedMenuItemButton)) }}
            >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={tittle} />
                {containsSubmenu ? <ExpandMore /> : undefined}
            </ListItemButton>

            {/* Submenu de Clientes */}
            {containsSubmenu ? (
                <Collapse in={subMenuExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {subMenuItemsButton.map((item: IFinancialMenuItem) => {
                            console.log("Submenu item: ", item);
                            const path: string = get(item, "path", "");
                            const subtittle: string = get(item, "path", "");
                            const key: string = `ListItemButton_${item.tittle}_${path}`;
                            return (
                                <ListItemButton
                                    key={key}
                                    onClick={() => {handleOnClick(tittle, path)}}
                                    sx={{ ...classes.clientSubMenuItemButton(isOnSelectedItemMenu(keySelectedMenuItemButton)) }}
                                >
                                    <ListItemIcon sx={{ fontSize: 20 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.tittle}
                                        secondary={
                                            <Box component="span" sx={{ ...classes.clientMenuItemText }}>
                                                {subtittle}
                                            </Box>
                                        }
                                    />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </Collapse>
            ) : undefined}
        </React.Fragment>
    )
};

export default MenuItemButton;