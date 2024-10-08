'use client';

import React from 'react';
import Image from 'next/image';
import UncheckedImage from '@/assets/icons/uncheckedbox.svg';
import CheckedImage from '@/assets/icons/checkedbox.svg';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return (
    <div className="flex w-6 items-center justify-center">
      <input
        type="checkbox"
        id="checkbox"
        className="appearance-none"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="checkbox" className="cursor-pointer">
        <Image
          src={checked ? CheckedImage : UncheckedImage}
          alt="checkbox"
          height={18}
          width={18}
        />
      </label>
    </div>
  );
};

export default Checkbox;
