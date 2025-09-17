import { HTMLInputTypeAttribute } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number | readonly string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormFieldProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  name: keyof T;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}
