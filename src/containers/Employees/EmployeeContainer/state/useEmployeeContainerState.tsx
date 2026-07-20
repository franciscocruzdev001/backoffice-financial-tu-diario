import { useState } from 'react';
import { IFormProps } from '@/shared/interfaces/IFormProps';
import { useForm, useWatch } from 'react-hook-form';
import { Users } from '@/types/Users';
import { useEmployeeStore } from '@/stores/employees.store';
import { get } from 'lodash';

export interface IUseEmployeeContainerState {
    loadingSave: boolean,
    //error: string,
    form: IFormProps<Users> & {
        handleOnSaveEmployee: () => void;
        //catalogEmployeeOptions: { optionId: string, label: string }[];
        //catalogCustomerOptions: { optionId: string, label: string }[];
    }
}

export const useEmployeeContainerState = (): IUseEmployeeContainerState => {
    const {
        control,
        formState: { errors },
        reset,
    } = useForm<Users>({
        defaultValues: {
            contact: {
                name: "",
                lastName: "",
                phoneNumber: "",
                adress: ""
            },
            creditorCompanyId: "123",
            email: "",
            password: "",
            roles: [],
            status: "Active",
            userName: ""
        }
    });
    const { notification, createUser } = useEmployeeStore();
    //const dispatch = useDispatch();
    const employeeFormState = useWatch({ control });
    const [loadingSave, setLoadingSave] = useState(false);
    //const [error, setError] = useState('');

    const handleOnSaveEmployee = () => {
        setLoadingSave(true);
        //setError("");
        console.log("customerFormState: ", employeeFormState);
        console.log("loadingSave: ", loadingSave);
        //console.log("error: ", error);
        createUser({
            contact: get(employeeFormState, "contact", {}),
            creditorCompanyId: get(employeeFormState, "creditorCompanyId", ""),
            email: get(employeeFormState, "email", ""),
            userName: get(employeeFormState, "userName", ""),
            password: get(employeeFormState, "password", ""),
            roles: get(employeeFormState, "roles", []),
            status: get(employeeFormState, "status", "")
        });
    };

    return {
        loadingSave,
        //error,
        form: {
            control,
            errors,
            handleOnSaveEmployee
        }
    }
}