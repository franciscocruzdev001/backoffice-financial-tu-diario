import React, { useState } from 'react';
import { IUserRoleInfo } from '@/infrastructure/interfaces/Main/IUserRoleInfo';
import { INITIAL_USER_ROL_INFO } from '@/shared/constants/Initial_data_info';

export interface IUseMainState {
    /*loading: boolean,
    error: string,
    form: IFormProps<UserRequest> & {
      handleOnSubmitLogin: () => void;
    }*/
    userRoleInfo: IUserRoleInfo,
    navbar: {
      handleLogout: () => void;
    }
    sidebar: {
      handleOnNavigation: (path: string) => void;
    }
}

export const useMainState = (): IUseMainState => {
  //const dispatch = useDispatch();
  const [userRoleInfo, setUserRoleInfo] = useState<IUserRoleInfo>(INITIAL_USER_ROL_INFO);

  const handleLogout = () => {
    console.log("userRoleInfo: ", userRoleInfo);
    console.log("cerrando session...");
  };

  const handleOnNavigation = (path: string) => {
    /*
      navigate(path);
    if (props.onClose) props.onClose();
    */
    console.log("handleOnNavigation-path: ", path)
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