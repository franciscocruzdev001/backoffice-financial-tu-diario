import { Controller, Control, FieldValues, FieldErrors } from 'react-hook-form';
import {
    FormControlLabel,
    Switch
} from '@mui/material';

export interface SwitchFormatFieldStateProps {
    control: Control<FieldValues, Object>;
    errors: FieldErrors<any>;
    name: string;
    required: boolean;
    sx?: {};
    label?: string;
    placeholder?: string;
    rules?: {};
}

export interface SwitchFormatFieldFunctionsProps {
    onChange?: (event?: object | any) => void;
}

export type SwitchFormatFieldProps = SwitchFormatFieldStateProps & SwitchFormatFieldFunctionsProps;

export const SwitchFormatField: React.FC<SwitchFormatFieldProps> = (props: SwitchFormatFieldProps) => {
    const {
        control,
        errors,
        name,
        required = false,
        sx = {},
        label,
        placeholder,
        rules = {}
    } = props;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormControlLabel
                    label={label}
                    sx={{ ...sx }}
                    required={required}
                    control={
                        <Switch
                            // Spread field to bind onChange, onBlur, and ref automatically
                            {...fieldProps}
                            // Explicitly override 'checked' because MUI Switch uses 'checked' instead of 'value'
                            checked={value === "Active"}
                            // Intercept the change event to convert boolean back to string
                            onChange={(event) => onChange(event.target.checked ? "Active" : "Inactive")}
                        />
                    }
                />
            )}
        />
    );
}