import React, { JSX } from 'react';
import { Avatar as MuiAvatar } from '@mui/material';
import { MuiSizeEnum } from '@/shared/constants/PropertiesEnumMuiComponets';

export interface AvatarProps {
    src?: string;
    alt?: string;
    children?: JSX.Element | any;
    size?: MuiSizeEnum
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  children,
  size = MuiSizeEnum.MEDIUM,
  ...props 
}: AvatarProps) => {
  const sizeMap = {
    small: { width: 32, height: 32 },
    medium: { width: 40, height: 40 },
    large: { width: 56, height: 56 }
  };

  return (
    <MuiAvatar
      src={src}
      alt={alt}
      sx={{
        ...sizeMap[size],
        backgroundColor: '#1e3c72',
        color: 'white',
        fontWeight: 600,
      }}
      {...props}
    >
      {children}
    </MuiAvatar>
  );
};

export default Avatar;