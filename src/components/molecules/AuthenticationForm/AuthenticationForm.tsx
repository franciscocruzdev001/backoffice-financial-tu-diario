import React from 'react'
import { Control, FieldErrors, FieldValues } from 'react-hook-form';
import { UserRequest } from '../../../types/UserRequest';
import { Alert, Box, Button, Typography } from '@mui/material';
import { AuthenticationFormFields } from '../../../shared/constants/AuthenticationFormEnum';
import InputFormatField from '@/components/atoms/FormInputFileds/InputFormatField/InputFormatField';
import { useAuthenticationFormStyle } from './AuthenticationForm.style';

export interface AuthenticationFormStateProps {
  control: Control<FieldValues | any, object>;
  errors: FieldErrors<UserRequest>;
  loading: boolean;
  error: string;
}

export interface AuthenticationFormFunctionsProps {
  onSubmit: () => void;
}

export type AuthenticationFormProps = AuthenticationFormStateProps & AuthenticationFormFunctionsProps;

const AuthenticationForm: React.FC<AuthenticationFormProps> = (props: AuthenticationFormProps) => {
  console.log("AuthenticationForm props: ", props);
  const classes = useAuthenticationFormStyle();
  /*useEffect(() => {
    props.onSubmit();
  }, []);*/

  return (
    <React.Fragment>
      <Box sx={{ ...classes.boxContainer }}>
        {/* Título con diseño moderno */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ ...classes.tittleHeader }}
          >
            Bienvenido de vuelta
          </Typography>
          <Typography variant="body1" sx={{ ...classes.subTittleHeader }}>
            Inicia sesion para continuar
          </Typography>
        </Box>

        {/* Alerta de error mejorada */}
        {props.error && (
          <Alert
            severity="error"
            sx={{ ...classes.alert }}
          >
            {props.error}
          </Alert>
        )}

        {/* Campo Username con mejor diseño */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body2"
            sx={{ ...classes.userNameLabel }}
          >
            Nombre de usuario
          </Typography>
          <InputFormatField
            name={AuthenticationFormFields.USER_NAME}
            control={props.control}
            errors={props.errors}
            required={true}
            placeholder="Ingrese su nombre de usuario"
            sx={{ ...classes.userNameInput }}
          />
        </Box>

        {/* Campo Password con mejor diseño */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="body2" sx={{ ...classes.passwordLabel }}>
            Contraseña
          </Typography>
          <InputFormatField
            type="password"
            name={AuthenticationFormFields.PASSWORD}
            control={props.control}
            errors={props.errors}
            required={true}
            placeholder="Ingrese su contraseña"
            sx={{ ...classes.passwordInput }}
          />
        </Box>

        {/* Botón con diseño premium */}
        <Button
          type="submit"
          loading={props.loading}
          onClick={props.onSubmit}
          sx={{ ...classes.loginButton }}
        >
          {props.loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>

        {/* Enlace de registro con mejor diseño */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{ color: '#64748b', fontSize: '14px' }}
          />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default AuthenticationForm;