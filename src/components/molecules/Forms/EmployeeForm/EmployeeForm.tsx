import CustomCard from '@/components/atoms/CustomCard/CustomCard';
import { MuiCheckboxGroup } from '@/components/atoms/FormInputFileds/CheckBoxGroup/CheckBoxGroup';
import InputFormatField from '@/components/atoms/FormInputFileds/InputFormatField/InputFormatField'
import { SwitchFormatField } from '@/components/atoms/FormInputFileds/SwitchFormatField/SwitchFormatField';
import { EmployeeFormContactEnum, EmployeeFormFieldsEnum } from '@/shared/constants/EmployeeFormFieldsEnum';
import { Users } from '@/types/Users';
import { Alert, Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material'
import React from 'react'
import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';

export interface EmployeeFormStateProps {
    control: Control<FieldValues | any, object>;
    errors: FieldErrors<Users>;//Any tiene que cambiar por el tipo de objeto de request de la solicitud
    loadingSave: boolean;
    //catalogEmployeeOptions: { optionId: string, label: string }[];
    //catalogCustomerOptions: { optionId: string, label: string }[];
    //error: string;
}

export interface EmployeeFormFunctionsProps {
    onSave: () => void;
}

export type EmployeeFormProps = EmployeeFormStateProps & EmployeeFormFunctionsProps;

export const EmployeeForm: React.FC<EmployeeFormProps> = (props: EmployeeFormProps) => {
    const ROLES_OPTIONS = [
        { optionId: "ADMIN", label: "ADMINISTRADOR" },
        { optionId: "COLLECTOR", label: "COBRADOR" },
        { optionId: 'MANAGER', label: 'SUPERVISOR' },
    ];

    return (
        <CustomCard>
            <form>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1e3c72' }}>
                    Registrar Nuevo Empleado
                </Typography>
                {false && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {"error"}
                    </Alert>
                )}
                {/* Form customer basic info*/}
                <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
                    Información del usuario
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>

                    <Grid size={{ xs: 12 }}>
                        <SwitchFormatField
                            name={EmployeeFormFieldsEnum.STATUS}
                            control={props.control}
                            errors={props.errors}
                            required={true}
                            label={"Activo/Inactivo"}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputFormatField
                            name={EmployeeFormFieldsEnum.EMAIL}
                            control={props.control}
                            errors={props.errors}
                            required={true}
                            label={"Email"}
                            placeholder={"Email del Empleado"}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputFormatField
                            name={EmployeeFormFieldsEnum.USER_NAME}
                            control={props.control}
                            errors={props.errors}
                            required={true}
                            label={"Nombre de usuario"}
                            placeholder={"Nombre de usuario del Empleado"}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <InputFormatField
                            name={EmployeeFormFieldsEnum.PASSWORD}
                            control={props.control}
                            errors={props.errors}
                            required={true}
                            type={"password"}
                            label={"Contraseña"}
                            placeholder={"Ingresa una contraseña para el empleado"}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <MuiCheckboxGroup
                            name={EmployeeFormFieldsEnum.ROLES}
                            control={props.control}
                            errors={props.errors}
                            required={true}
                            label={"Seleccion uno o mas roles"}
                            options={ROLES_OPTIONS}
                        />
                    </Grid>
                </Grid>

                <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
                    Información de contacto
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputFormatField
                            name={EmployeeFormContactEnum.NAME as Path<FieldValues>}
                            control={props.control}
                            errors={props.errors}
                            required={true}
                            label={"Nombre(s)"}
                            placeholder={"Nombre(s) del Empleado"}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputFormatField
                            name={EmployeeFormContactEnum.LASTNAME as Path<FieldValues>}
                            control={props.control}
                            errors={props.errors}
                            required={true}
                            label={"Apellido(s)"}
                            placeholder={"Apellido(s) del Empleado"}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputFormatField
                            name={EmployeeFormContactEnum.PHONENUMBER as Path<FieldValues>}
                            control={props.control}
                            errors={props.errors}
                            required={true}
                            label={"Numero de telefono"}
                            placeholder={"Numero de telefono del Empleado"}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputFormatField
                            name={EmployeeFormContactEnum.ADRESS as Path<FieldValues>}
                            control={props.control}
                            errors={props.errors}
                            required={true}
                            label={"Direccion"}
                            placeholder={"Direccion del Empleado"}
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