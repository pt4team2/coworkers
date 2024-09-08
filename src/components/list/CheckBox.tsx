'use client'

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
    <div className="relative inline-block">
      <input
        type="checkbox"
        id="myCheckbox"
        className="sr-only"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor="myCheckbox" className="cursor-pointer block">
          <Image src={checked? CheckedImage:UncheckedImage} alt='checkbox' height={18} width={18}/>
      </label>
    </div>
  );
};

export default Checkbox;
