import React from 'react';
import '@/styles/globals.css';
import { redirect } from 'next/navigation';

export default function Page() {
  // return(<>
  // 기본페이지
  // </>
  redirect('/teampage/891');
  return null;
  /*TODO 유저 정보를 가져와서 소속된 팀들 중 가장 위에 있는 팀페이지를 로딩하도록 수정해야함
  */
}
