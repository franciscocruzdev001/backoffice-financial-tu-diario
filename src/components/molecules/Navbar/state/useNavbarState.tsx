import { useState } from 'react';

export interface IUseNavbarState {
    anchorEl: any;
    handleMenuOpen: (event: object | any) => void;
    handleMenuClose: () => void;
}

export const useNavbarState = (): IUseNavbarState => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event: any) => {
    console.log("handleMenuOpen-event: ", event);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    handleMenuOpen,
    handleMenuClose
  }
}