import React, { useState } from 'react';
import { IFormProps } from '@/shared/interfaces/IFormProps';
import { useForm, useWatch } from 'react-hook-form';
import { SaveCustomerRequest } from '@/types/SaveCustomerRequest';

const EMPLOYEE_OPTIONS = [
    { optionId: "1", label: "Jose Manuel" },
    { optionId: "2", label: "Jose de Jesus" },
    { optionId: "3", label: "Erick" },
    { optionId: "4", label: "Antony" },
    { optionId: "5", label: "Javier" },
    { optionId: "6", label: "Eduardo" }
  ];

  const CUSTOMER_OPTIONS = [
    { optionId: "1", label: "Maria Veronica Perez Patistan" },
    { optionId: "2", label: "Leticia Gomez Torres" },
    { optionId: "3", label: "Maricruz Nucamendi Perez" },
    { optionId: "4", label: "Carlos Mario Simuta Vicente" },
    { optionId: "5", label: "Jose Alfredo Hernandez Gomez" },
    { optionId: "6", label: "Teresa de jesus de la Cruz Cruz" }
  ];

export interface IUseCustomerContainerState {
    loadingSave: boolean,
    //error: string,
    form: IFormProps<SaveCustomerRequest> & {
      handleOnSaveCustomer: () => void;
      catalogEmployeeOptions: { optionId: string, label: string }[];
      catalogCustomerOptions: { optionId: string, label: string }[];
    }
}

export const useCustomerContainerState = (): IUseCustomerContainerState => {
  const {
    control, 
    formState: { errors }, 
    reset,
  } = useForm<SaveCustomerRequest>({
    defaultValues: {
      name: "",
      lastName: "",
      status: "",
      address: "",
      phoneNumber: "",
      threeWordsUbication: "",
      employeeIdRecorder: "",
    }
  });
  //const dispatch = useDispatch();
  const customerFormState = useWatch({ control });
  const [loadingSave, setLoadingSave] = useState(false);
  //const [error, setError] = useState('');

  const handleOnSaveCustomer = () => {
    setLoadingSave(true);
    //setError("");
    console.log("customerFormState: ", customerFormState);
    console.log("loadingSave: ", loadingSave);
    //console.log("error: ", error);
  };

  return {
    loadingSave,
    //error,
    form: {
      control,
      errors,
      catalogEmployeeOptions: EMPLOYEE_OPTIONS,
      catalogCustomerOptions: CUSTOMER_OPTIONS,
      handleOnSaveCustomer
    }
  }
}