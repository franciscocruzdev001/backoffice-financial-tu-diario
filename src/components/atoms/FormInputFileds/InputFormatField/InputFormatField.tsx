import React from 'react'
import {
    Controller,
    Control,
    FieldErrors,
    FieldValues
} from 'react-hook-form';
import { UserRequest } from '../../../../types/UserRequest';
import { TextField } from '@mui/material';
import { useInputFormatFieldStyle } from './InputFormatField.style';

export interface InputFormatFieldStateProps {
    control: Control<FieldValues, Object>;
    errors: FieldErrors<UserRequest>;
    name: string;
    required: boolean;
    type?: string;
    sx?: {};
    label?: string;
    placeholder?: string;
    rules?: {};
}

export interface InputFormatFieldFunctionsProps {
    onChange?: (event?: object | any) => void;
}

export type InputFormatFieldProps = InputFormatFieldStateProps & InputFormatFieldFunctionsProps;

const InputFormatField: React.FC<InputFormatFieldProps> = ({
    control,
    errors,
    name,
    required = false,
    type = "text",
    sx = {},
    label,
    placeholder,
    rules = {}
}: InputFormatFieldProps) => {
    const classes = useInputFormatFieldStyle();
    console.log("EmailFormatInput-errors: ", errors);
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <TextField
                    {...field}
                    autoComplete={name}
                    fullWidth  
                    label={label}
                    placeholder={placeholder}
                    required={required}
                    type={type}
                    variant='outlined'
                    sx={{ ...classes.textField, ...sx }}
                />
            )}
        />
    )
}

export default InputFormatField;