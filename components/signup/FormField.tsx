import React from 'react';
import Image from 'next/image';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormFieldProps {
  id: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  trailingIcon?: string;
  onIconClick?: () => void;
}

const FormField = ({
  id,
  type,
  placeholder,
  register,
  error,
  trailingIcon,
  onIconClick,
}: FormFieldProps) => {
  return (
    <div>
      <div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          {...register(id)}
        />
        {trailingIcon && (
          <Image
            src={trailingIcon}
            width={24}
            height={24}
            onClick={onIconClick}
            alt="비밀번호 표시 아이콘"
          />
        )}
      </div>
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default FormField;
