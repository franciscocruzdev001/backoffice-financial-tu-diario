import React, { useState } from 'react';
import { IFormProps } from '@/shared/interfaces/IFormProps';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginRequest } from '@/types/LoginRequest';
import { useAuthStore } from '@/stores/auth.store';
import { get } from 'lodash';

export interface IUseAuthenticationState {
    loading: boolean,
    error: string,
    form: IFormProps<LoginRequest> & {
      handleOnSubmitLogin: (event?: React.BaseSyntheticEvent) => void;
    }
}

export const useAuthenticationState = (): IUseAuthenticationState => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    }
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOnSubmitLogin = handleSubmit(async (loginFormState: LoginRequest) => {
    setLoading(true);
    setError("");
    try {
      await login(loginFormState);
      navigate('/');
    } catch (submitError) {
      setError(get(submitError, "response.data.error", "No se pudo iniciar sesión, intenta de nuevo"));
    } finally {
      setLoading(false);
    }
  });

  return {
    loading,
    error,
    form: {
      control,
      errors,
      handleOnSubmitLogin
    }
  }
}
