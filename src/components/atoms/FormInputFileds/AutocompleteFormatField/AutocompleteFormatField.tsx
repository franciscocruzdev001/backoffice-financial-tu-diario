import React from 'react'
import {
    Controller,
    Control,
    FieldErrors,
    FieldValues
} from 'react-hook-form';
import { UserRequest } from '../../../../types/UserRequest';
import { Autocomplete, TextField } from '@mui/material';
import { isEqual } from 'lodash';

export interface AutocompleteFormatFieldStateProps {
    control: Control<FieldValues, Object>;
    errors: FieldErrors<UserRequest>;
    name: string;
    required: boolean;
    options: { optionId: string, label: string }[];
    sx?: {};
    label?: string;
    placeholder?: string;
    rules?: {};
}

export interface AutocompleteFormatFieldFunctionsProps {
    onChange?: (event?: object | any) => void;
}

export type AutocompleteFormatFieldProps = AutocompleteFormatFieldStateProps & AutocompleteFormatFieldFunctionsProps;

const AutocompleteFormatField: React.FC<AutocompleteFormatFieldProps> = (props: AutocompleteFormatFieldProps) => {
    const {
        control,
        errors,
        name,
        required = false,
        options,
        sx = {},
        label,
        placeholder,
        rules = {}
    } = props;
    console.log("EmailFormatInput-errors: ", errors);
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
                const { onChange, value } = field;
                return (
                    <Autocomplete
                        disablePortal
                        options={options}
                        aria-required={required}
                        sx={{...sx}}
                        value={value ? options.find((option) => isEqual(value, option.optionId)) : null}
                        getOptionLabel={(option) => option.label}
                        onChange={(_, newValue) => {
                            onChange(newValue ? newValue.optionId : undefined);
                        }}
                        renderInput={(params) => <TextField {...params} label={label} />}
                    />
                    /*<TextField
                        {...field}
                        autoComplete={name}
                        fullWidth
                        label={label}
                        placeholder={placeholder}
                        required={required}
                        type={type}
                        variant='outlined'
                        sx={{ ...classes.textField, ...sx }}
                    />*/
                )
            }}
        />
    )
}

export default AutocompleteFormatField;