'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import UncheckedImage from '@/assets/icons/uncheckedbox.svg';
import CheckedImage from '@/assets/icons/checkedbox.svg';

const Checkbox: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex w-6 items-center justify-center">
      <input
        type="checkbox"
        id="checkbox"
        className="appearance-none"
        checked={checked}
        onChange={handleChange}
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
