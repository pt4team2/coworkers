import React from 'react';
import Image from 'next/image';
import { FormFieldProps } from '@/types/auth';

const FormField = ({
  id,
  type,
  placeholder,
  register,
  error,
  trailingIcon,
  onIconClick,
  className,
}: FormFieldProps) => {
  return (
    <div className={`${className} flex flex-col gap-2`}>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          {...register(id)}
          className={`${className ? 'w-70-custom' : 'w-85.75-custom md:w-115-custom lg:w-115-custom'} placeholder:text-md-regular md:placeholder:text-lg-regular lg:placeholder:text-lg-regular h-12 rounded-xl border border-solid border-border-tertiary bg-background-secondary px-4 py-3.625-custom text-text-primary placeholder:text-text-default focus:outline-none ${
            error
              ? 'border-status-danger ring-1 ring-status-danger'
              : 'focus:border-status-brand focus:ring-1 focus:ring-status-brand'
          } `}
        />
        {trailingIcon && (
          <>
            <Image
              src={trailingIcon}
              width={24}
              height={24}
              onClick={onIconClick}
              alt="비밀번호 표시 아이콘"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer"
            />
            <div className="absolute right-4 top-1/2 z-0 block h-6 w-9.5-custom -translate-y-1/2 transform bg-gradient-custom2 md:hidden lg:hidden">
              {' '}
            </div>
          </>
        )}
      </div>
      {error && (
        <span className="text-md-medium text-status-danger">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FormField;
