import CustomCard from '@/components/atoms/CustomCard/CustomCard';
import AutocompleteFormatField from '@/components/atoms/FormInputFileds/AutocompleteFormatField/AutocompleteFormatField';
import InputFormatField from '@/components/atoms/FormInputFileds/InputFormatField/InputFormatField'
import { CustomerFormFieldsEnum } from '@/shared/constants/CustomerFormFieldsEnum'
import { SaveCustomerRequest } from '@/types/SaveCustomerRequest';
import { Alert, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { Control, FieldErrors, FieldValues } from 'react-hook-form';

export interface CustomerFormStateProps {
  control: Control<FieldValues | any, object>;
  errors: FieldErrors<SaveCustomerRequest>;//Any tiene que cambiar por el tipo de objeto de request de la solicitud
  loadingSave: boolean;
  catalogEmployeeOptions: { optionId: string, label: string }[];
  catalogCustomerOptions: { optionId: string, label: string }[];
  //error: string;
}

export interface CustomerFormFunctionsProps {
  onSave: () => void;
}

export type CustomerFormProps = CustomerFormStateProps & CustomerFormFunctionsProps;

export const CustomerForm: React.FC<CustomerFormProps> = (props: CustomerFormProps) => {
  return (
    <CustomCard>
      <form>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1e3c72' }}>
          Registrar Nuevo Cliente
        </Typography>
        {false && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {"error"}
          </Alert>
        )}
        {/* Form customer basic info*/}
        <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
          Información del Cliente
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputFormatField
              name={CustomerFormFieldsEnum.NAME}
              control={props.control}
              errors={props.errors}
              required={true}
              label={"Nombre(s)"}
              placeholder={"Nombre(s) cliente"}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputFormatField
              name={CustomerFormFieldsEnum.LAST_NAME}
              control={props.control}
              errors={props.errors}
              required={true}
              label={"Apellido(s)"}
              placeholder={"Apellido(s) cliente"}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputFormatField
              name={CustomerFormFieldsEnum.ADRESS}
              control={props.control}
              errors={props.errors}
              required={true}
              label={"Direccion"}
              placeholder={"Direccion completa del cliente"}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputFormatField
              name={CustomerFormFieldsEnum.PHONE_NUMBER}
              control={props.control}
              errors={props.errors}
              required={true}
              label={"Telefono"}
              placeholder={"10 digitos sin espacios"}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputFormatField
              name={CustomerFormFieldsEnum.THREE_WORDS_UBICATION}
              control={props.control}
              errors={props.errors}
              required={true}
              label={"Ubicacion 3WORDS"}
              placeholder={"Adjunta aca la ubicacion de 3WORDS"}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <AutocompleteFormatField
              name={CustomerFormFieldsEnum.EMPLOYEE_ID_RECORDER}
              control={props.control}
              errors={props.errors}
              required
              label={"Selecciona a un cobrador"}
              options={props.catalogEmployeeOptions}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <AutocompleteFormatField
              name={CustomerFormFieldsEnum.CUSTOMER_ID_AVAL}
              control={props.control}
              errors={props.errors}
              required
              label={"Selecciona a un cliente como aval"}
              options={props.catalogCustomerOptions}
            />
          </Grid>
        </Grid>

        {/* Action buttons form */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              type="submit"
              loading={props.loadingSave}
              onClick={() => props.onSave()}
              //disabled={!isFormValid()}
              variant={"contained"}
              sx={{
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                width: '100%'
              }}
            >
              {props.loadingSave ? 'Guardando...' : 'Guardar'}
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              variant="outlined"
              onClick={() => window.history.back()}
              sx={{ width: '100%' }}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </CustomCard>
  )
}
