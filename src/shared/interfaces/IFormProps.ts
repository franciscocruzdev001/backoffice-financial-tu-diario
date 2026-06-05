import type {
    Control,
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormReset,
    UseFormResetField,
    UseFormSetValue
} from "react-hook-form";

export interface IFormProps<T extends FieldValues> {
    control: Control<FieldValues | any, Object>;
    errors: FieldErrors<T>;
    resetField?: UseFormResetField<T>;
    reset?: UseFormReset<T>;
    isDirty?: boolean;
    isValid?: boolean;
    getValues?: UseFormGetValues<T>;
    setValue?: UseFormSetValue<T>;
}