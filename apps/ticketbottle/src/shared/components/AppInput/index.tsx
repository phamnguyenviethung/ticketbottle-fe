import { Input } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PasswordInput } from '../ui/password-input';
import { Field } from '../ui/field';

interface AppInputProps {
  placeholder: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'password';
  required?: boolean;
}

const AppInput: React.FC<AppInputProps> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const InputComponent = props.type === 'password' ? PasswordInput : Input;
  return (
    <Field
      label={props.label}
      invalid={!!errors[props.name]}
      errorText={errors[props.name]?.message?.toString()}
      required={props.required}
      my={2}
    >
      <InputComponent
        placeholder={props.placeholder}
        {...register(props.name)}
        type={props.type}
        size={{
          base: 'md',
          md: 'lg',
        }}
      />
    </Field>
  );
};

export default AppInput;
