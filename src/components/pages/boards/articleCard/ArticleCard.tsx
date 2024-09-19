import { useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import LikeIcon from '@/assets/icons/ic_heart.svg';
import MemberIcon from '@/assets/icons/ic_member.svg';
import BoardImage from '@/assets/images/img_boardtest.png';
import IcKebeb from '@/assets/icons/ic_kebab.svg';

interface Writer {
  name: string;
}

interface Article {
  id: number;
  title: string;
  image: string | StaticImageData | null;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  content: string;
  likeCount: number;
  isLiked: boolean;
}

// 임시 데이터
const mockArticle: Article = {
  id: 1,
  title: '자유게시판에 질문을 어쩌구',
  image: BoardImage,
  createdAt: '2024-09-10',
  updatedAt: '2024-09-10',
  writer: {
    name: '김김김',
  },
  content: '질문을 올려볼까요?',
  likeCount: 9999,
  isLiked: false,
};

const ArticleCard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleSelect = (option: string) => {
    console.log(option); // 선택한 옵션 처리
    setIsDropdownOpen(false); // 드롭다운 메뉴 닫기
  };

  const board = mockArticle; // 임시 데이터

  return (
    <div
      className="relative w-full h-auto p-[24px_16px_16px] gap-4 border rounded-[12px] lg:w-[590px]"
      style={{
        backgroundColor: 'var(--color-background-secondary)',
        borderColor: '#334155',
      }}
    >
      <div className="flex">
        <div className="flex-1 flex flex-col justify-between">
          <div
            className="text-md-medium-alt md:text-lg md:leading-7 md:font-medium lg:text-lg lg:leading-7 lg:font-medium"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {board.title}
          </div>
          <div
            className="text-xs-medium md:text-md-medium lg:text-md-medium md:hidden lg:hidden"
            style={{ color: 'var(--color-text-disabled)' }}
          >
            {new Date(board.createdAt).toLocaleDateString()}
          </div>
        </div>
        {board.image && (
          <div className="border-[1px] border-[#475569] rounded-[8px] ml-[23px] mb-[10px]">
            <Image
              src={board.image}
              alt={board.title}
              width={64}
              height={64}
              className="rounded-[8px] lg:w-[72px] lg:h-[72px] md:w-[72px] md:h-[72px]"
            />
          </div>
        )}
        <div className="relative">
          <Image
            src={IcKebeb}
            alt="kebab icon"
            width={16}
            height={16}
            className="hidden lg:ml-4 md:ml-4 lg:w-6 lg:h-6 md:w-6 md:h-6 md:inline lg:inline cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-[6px] md:mt-2 lg:mt-2 w-[120px] rounded-lg shadow-lg bg-[#1E293B] border border-[#334155] focus:outline-none z-10">
              <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button
                  onClick={() => handleSelect('수정하기')}
                  className="block h-[40px] w-full px-[8px] py-[11px] text-md-regular hover:bg-gray-700 rounded-t-3 text-center"
                  role="menuitem">
                  수정하기
                </button>
                <button
                  onClick={() => handleSelect('삭제하기')}
                  className="block h-[40px] w-full px-[8px] py-[11px] text-md-regular hover:bg-gray-700 rounded-b-3 text-center"
                  role="menuitem">
                  삭제하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <Image
            src={MemberIcon}
            alt="작성자 이미지"
            className="rounded-full"
            width={32}
            height={32}
          />
          <span className="text-xs-medium ml-3 md:text-md-medium lg:text-md-medium">{board.writer.name}</span>
          <div className="hidden border-r border border-[#334155] h-3 mx-4 md:inline lg:inline"></div>
          <div
            className="hidden text-xs-medium md:text-md-medium lg:text-md-medium md:inline lg:inline"
            style={{ color: 'var(--color-text-disabled)' }}
          >
            {new Date(board.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center">
          <Image src={LikeIcon} alt="likeIcon" width={18}/>
          <span
            className="text-xs-regular ml-2 md:text-md-regular lg:text-md-regular"
            style={{ color: 'var(--color-text-disabled)' }}
          >
            {board.likeCount}
          </span>
          <Image
            src={IcKebeb}
            alt="kebab icon"
            width={16}
            height={16}
            className="ml-2 lg:w-6 lg:h-6 md:w-6 md:h-6 md:hidden lg:hidden cursor-pointer"
            onClick={toggleDropdown}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
