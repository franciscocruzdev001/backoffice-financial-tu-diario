import { IUserRoleInfo } from '@/infrastructure/interfaces/Main/IUserRoleInfo';
import { INITIAL_USER_ROL_INFO } from '@/shared/constants/Initial_data_info';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTES } from '@/shared/constants/routes';
import { useNavigate } from 'react-router-dom';

export interface IUseMainState {
    userRoleInfo: IUserRoleInfo,
    navbar: {
      handleLogout: () => void;
    }
    sidebar: {
      handleOnNavigation: (path: string) => void;
    }
}

export const useMainState = (): IUseMainState => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // El backend solo regresa userName (no first/last name por separado),
  // así que se usa como fullName mientras no exista esa info en LoginResponse
  const userRoleInfo: IUserRoleInfo = {
    ...INITIAL_USER_ROL_INFO,
    fullName: user?.userName ?? INITIAL_USER_ROL_INFO.fullName,
    firstName: user?.userName ?? INITIAL_USER_ROL_INFO.firstName,
    userName: user?.userName ?? INITIAL_USER_ROL_INFO.userName,
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTHENTICATION + ROUTES.LOGIN);
  };

  const handleOnNavigation = (path: string) => {
    navigate(path);
  };

  return {
    userRoleInfo,
    navbar: {
      handleLogout
    },
    sidebar: {
      handleOnNavigation
    }
  }
}
