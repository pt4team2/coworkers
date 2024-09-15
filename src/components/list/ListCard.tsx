import React from 'react';
import Image from 'next/image';
import Checkbox from './CheckBox';
import Comment from '@/assets/icons/comment.svg';
import Kebab from '@/assets/icons/ic_kebab.svg';
import Callender from '@/assets/icons/ic_calendar.svg';
import Repeat from '@/assets/icons/ic_repeat.svg';
import VectorIcon from '@/assets/icons/ic-vector.svg';

export default function ListCard() {
  return (
    <div className="h-18.5-custom rounded-lg bg-background-secondary px-3.5 py-3">
      <div className="mb-2.5 flex justify-between">
        <div className="flex">
          <Checkbox />
          <div className="ml-2 mr-3">내용</div>
          {/* 데스크탑, 태블릿일 때는 comment가 원래 위치 */}
          <div className="hidden md:flex md:items-center lg:flex lg:items-center">
            <Image src={Comment} alt="Comment" width={16} height={16} />
            <div className="font-pretendard ml-0.5 h-4 w-2 text-left text-xs font-normal leading-3.5-custom text-text-default">
              3
            </div>
          </div>
        </div>
        <div className="flex">
          {/* 모바일일 때는 comment가 이쪽으로 이동 */}
          <div className="mr-2 flex items-center md:hidden lg:hidden">
            <Image src={Comment} alt="Comment" width={16} height={16} />
            <div className="font-pretendard ml-0.5 h-4 w-2 text-left text-xs font-normal leading-3.5-custom text-text-default">
              3
            </div>
          </div>
          <button className="flex w-6 items-center justify-center">
            <Image src={Kebab} alt="kebab" width={16} height={16} />
          </button>
        </div>
      </div>
      <div className="flex gap-2.5">
        <div className="flex gap-1.5">
          <Image src={Callender} alt="Callender" width={16} height={16} />
          <div className="font-pretendard h-4 text-left text-xs font-normal leading-3.5-custom text-text-default">
            날짜
          </div>
        </div>
        <Image src={VectorIcon} alt="VectorIcon" width={0} height={8} />
        <div className="flex gap-1.5">
          <Image src={Repeat} alt="Repeat" width={16} height={16} />
          <div className="font-pretendard h-4 text-left text-xs font-normal leading-3.5-custom text-text-default">
            매일 반복
          </div>
        </div>
      </div>
    </div>
  );
}
