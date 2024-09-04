import React from 'react';
import ImgTodo from 'src/assets/images/img_todo.svg';
import Image from 'next/image';

export default function Page() {
  return (
    <main>
      <Image src={ImgTodo} alt="투두이미지" />
      <p className="text-text-primary">홈페이지</p>
    </main>
  );
}
