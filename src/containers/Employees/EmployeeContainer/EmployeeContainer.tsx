import { EmployeeForm } from '@/components/molecules/Forms/EmployeeForm/EmployeeForm';
import SnackbarNotification from '@/components/molecules/SnackbarNotification/SnackbarNotification';
import React from 'react'
import { useEmployeeContainerState } from './state/useEmployeeContainerState';

const EmployeeContainer = () => {
  const { form, loadingSave } = useEmployeeContainerState();
  return (
    <React.Fragment>
        <EmployeeForm
            control={form.control}
            errors={form.errors}
            loadingSave={loadingSave}
            //catalogEmployeeOptions={form.catalogEmployeeOptions}
            //catalogCustomerOptions={form.catalogCustomerOptions}
            onSave={form.handleOnSaveEmployee}
        />
        <SnackbarNotification
            type={"success"}
            open={false}
            message={"Esto en una notificacion de prueba - EmployeeContainer"}
            hadleOnClose={() => console.log("EmployeeContainer-hadleOnClose...") }
        />
    </React.Fragment>
  )
}

export default EmployeeContainer;