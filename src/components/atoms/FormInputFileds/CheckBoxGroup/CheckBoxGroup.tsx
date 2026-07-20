import { Controller, Control, FieldValues, FieldErrors } from 'react-hook-form';
import {
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material';

export interface MuiCheckboxGroupStateProps {
    control: Control<FieldValues, Object>;
    errors: FieldErrors<any>;
    name: string;
    required: boolean;
    options: { optionId: string, label: string }[];
    sx?: {};
    label?: string;
    placeholder?: string;
    rules?: {};
}

export interface MuiCheckboxGroupFunctionsProps {
    onChange?: (event?: object | any) => void;
}

export type MuiCheckboxGroupProps = MuiCheckboxGroupStateProps & MuiCheckboxGroupFunctionsProps;

export const MuiCheckboxGroup: React.FC<MuiCheckboxGroupProps> = (props: MuiCheckboxGroupProps) => {
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

    // 3. Initialize react-hook-form with type safety
    /*const { control, handleSubmit } = useForm<FormInput>({
        defaultValues: {
            selectedFruits: ['banana'], // Pre-select banana by default
        },
    });

    const onSubmit = (data: FormInput) => {
        console.log('Submitted Data:', data);
    };*/

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange } }) => {

                // Helper to toggle item visibility inside the array
                const handleCheckboxChange = (optionId: string, checked: boolean) => {
                    if (checked) {
                        onChange([...value, optionId]);
                    } else {
                        onChange(value.filter((id:string) => id !== optionId));
                    }
                };

                return (
                    <FormGroup>
                        {options.map((option) => (
                            <FormControlLabel
                                key={option.optionId}
                                label={option.label}
                                sx={{...sx}}
                                control={
                                    <Checkbox
                                        checked={value.includes(option.optionId)}
                                        onChange={(e) => handleCheckboxChange(option.optionId, e.target.checked)}
                                    />
                                }
                            />
                        ))}
                    </FormGroup>
                );
            }}
        />
    );
}