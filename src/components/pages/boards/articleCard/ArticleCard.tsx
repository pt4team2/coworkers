import { useEffect, useState } from 'react';
import Image from 'next/image';
import LikeIcon from '@/assets/icons/ic_heart.svg';
import MemberIcon from '@/assets/icons/ic_member.svg';
import IcKebeb from '@/assets/icons/ic_kebab.svg';
import { getArticleById } from '@/services/api/article';
import { Article } from '@/types/article';

interface ArticleCardProps {
  articleId: number;
}

const ArticleCard = ({ articleId }: ArticleCardProps) => {
  const [board, setBoard] = useState<Article | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    console.log(option);
    setIsDropdownOpen(false);
  };

  const fetchArticle = async (id: number) => {
    try {
      const response = await getArticleById(id);
      setBoard({
        ...response.data,
        image:
          'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
      });
    } catch (error) {
      console.error('Failed to fetch article:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle(articleId);
  }, [articleId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!board) {
    return <div>게시글을 불러오는데 실패했습니다.</div>;
  }

  return (
    <div
      className="relative h-auto w-full gap-4 rounded-[12px] border p-[24px_16px_16px] lg:w-[590px]"
      style={{
        backgroundColor: 'var(--color-background-secondary)',
        borderColor: '#334155',
      }}
    >
      <div className="flex">
        <div className="flex flex-1 flex-col justify-between">
          <div
            className="text-md-medium-alt md:text-lg md:font-medium md:leading-7 lg:text-lg lg:font-medium lg:leading-7"
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
          <div className="mb-[10px] ml-[23px] rounded-[8px] border-[1px] border-[#475569]">
            <Image
              src={board.image}
              alt={board.title}
              width={64}
              height={64}
              className="rounded-[8px] md:h-[72px] md:w-[72px] lg:h-[72px] lg:w-[72px]"
            />
          </div>
        )}
        <div className="relative">
          <Image
            src={IcKebeb}
            alt="kebab icon"
            width={16}
            height={16}
            className="hidden cursor-pointer md:ml-4 md:inline md:h-6 md:w-6 lg:ml-4 lg:inline lg:h-6 lg:w-6"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-[6px] w-[120px] origin-top-right rounded-lg border border-[#334155] bg-[#1E293B] shadow-lg focus:outline-none md:mt-2 lg:mt-2">
              <div
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  onClick={() => handleSelect('수정하기')}
                  className="text-md-regular rounded-t-3 block h-[40px] w-full px-[8px] py-[11px] text-center hover:bg-gray-700"
                  role="menuitem"
                >
                  수정하기
                </button>
                <button
                  onClick={() => handleSelect('삭제하기')}
                  className="text-md-regular rounded-b-3 block h-[40px] w-full px-[8px] py-[11px] text-center hover:bg-gray-700"
                  role="menuitem"
                >
                  삭제하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={MemberIcon}
            alt="작성자 이미지"
            className="rounded-full"
            width={32}
            height={32}
          />
          <span className="text-xs-medium md:text-md-medium lg:text-md-medium ml-3">
            {board.writer.name}
          </span>
          <div className="mx-4 hidden h-3 border border-r border-[#334155] md:inline lg:inline"></div>
          <div
            className="text-xs-medium md:text-md-medium lg:text-md-medium hidden md:inline lg:inline"
            style={{ color: 'var(--color-text-disabled)' }}
          >
            {new Date(board.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center">
          <Image src={LikeIcon} alt="likeIcon" width={18} />
          <span
            className="text-xs-regular md:text-md-regular lg:text-md-regular ml-2"
            style={{ color: 'var(--color-text-disabled)' }}
          >
            {board.likeCount}
          </span>
          <Image
            src={IcKebeb}
            alt="kebab icon"
            width={16}
            height={16}
            className="ml-2 cursor-pointer md:hidden md:h-6 md:w-6 lg:hidden lg:h-6 lg:w-6"
            onClick={toggleDropdown}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
