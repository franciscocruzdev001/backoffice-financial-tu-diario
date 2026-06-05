import { CustomerForm } from '@/components/molecules/Forms/CustomerForm/CustomerForm';
import SnackbarNotification from '@/components/molecules/SnackbarNotification/SnackbarNotification';
import React from 'react'
import { useCustomerContainerState } from './state/useCustomerContainerState';

const CustomerContainer = () => {
  const { form, loadingSave } = useCustomerContainerState();
  return (
    <React.Fragment>
        <CustomerForm
            control={form.control}
            errors={form.errors}
            loadingSave={loadingSave}
            catalogEmployeeOptions={form.catalogEmployeeOptions}
            catalogCustomerOptions={form.catalogCustomerOptions}
            onSave={form.handleOnSaveCustomer}    
        />
        <SnackbarNotification
            type={"success"}
            open={false}
            message={"Esto en una notificacion de prueba - CustomerContainer"}
            hadleOnClose={() => console.log("CustomerContainer-hadleOnClose...") }
        />
    </React.Fragment>
  )
}

export default CustomerContainer;