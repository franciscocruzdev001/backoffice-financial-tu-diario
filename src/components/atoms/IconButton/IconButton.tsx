import React, { JSX } from 'react';
import { IconButton as MuiIconButton, Tooltip } from '@mui/material';
import { MuiColorEnum, MuiSizeEnum } from '@/shared/constants/PropertiesEnumMuiComponets';

export interface IconButtonStateProps {
    children?: JSX.Element;
    tooltip?: string;
    color?: MuiColorEnum;
    size?: MuiSizeEnum;
}

export interface IconButtonFunctionsProps {
    handleOnClick: (event?: object | any) => void,
}

export type IconButtonProps = IconButtonStateProps & IconButtonFunctionsProps;

const IconButton: React.FC<IconButtonProps> = ({
  children, 
  handleOnClick, 
  tooltip = "",
  color = MuiColorEnum.PRIMARY,
  size = MuiSizeEnum.MEDIUM,
  ...props 
}: IconButtonProps) => {
  const button = (
    <MuiIconButton
      onClick={handleOnClick}
      color = {color}
      size = {size}
      sx={{
        borderRadius: 2,
        '&:hover': {
          backgroundColor: 'rgba(30, 60, 114, 0.1)',
        }
      }}
      {...props}
    > 
      {children}
    </MuiIconButton>
  );

  return tooltip ? (
    <Tooltip title={tooltip}>
      {button}
    </Tooltip>
  ) : button;
};

export default IconButton;