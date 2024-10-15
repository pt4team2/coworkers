import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LikeIcon from '@/assets/icons/ic_heart.svg';
import MemberIcon from '@/assets/icons/ic_member.svg';
import IcKebab from '@/assets/icons/ic_kebab.svg';
import { getArticleById, deleteArticleById } from '@/services/api/article';
import { Article } from '@/types/article';

interface ArticleCardProps {
  articleId: number;
}

const ArticleCard = ({ articleId }: ArticleCardProps) => {
  const [board, setBoard] = useState<Article | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleSelect = async (option: string) => {
    if (option === '삭제하기') {
      const confirmDelete = confirm('이 게시글을 삭제하시겠습니까?');
      if (confirmDelete) {
        await deleteArticleById(articleId);
        alert('게시글이 삭제되었습니다.');
        // 삭제 후 작업 추가
      }
    }
    setIsDropdownOpen(false);
  };

  const fetchArticle = async (id: number) => {
    try {
      const response = await getArticleById(id);
      setBoard(response.data);
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
        className="relative w-full h-auto p-[24px_16px_16px] gap-4 border rounded-[12px] lg:w-[590px] cursor-pointer"
        style={{
          backgroundColor: 'var(--color-background-secondary)',
          borderColor: '#334155',
        }}
      >
        <div className="flex">
        <Link href={`/boards/${articleId}`} className="flex-1 flex flex-col justify-between" passHref>
          <div>
            <div
              className="text-md-medium-alt md:text-lg md:leading-7 md:font-medium lg:text-lg lg:leading-7 lg:font-medium"
              style={{ color: 'var(--color-text-secondary)' }} >
              {board.title}
            </div>
            <div
              className="text-xs-medium md:text-md-medium lg:text-md-medium md:hidden lg:hidden"
              style={{ color: 'var(--color-text-disabled)' }}>
              {new Date(board.createdAt).toLocaleDateString()}
            </div>
          </div>
        </Link>
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
              src={IcKebab}
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
            {board.writer.image ? (
              <Image
                src={board.writer.image}
                alt="작성자 이미지"
                className="rounded-full"
                width={32}
                height={32}
              />
            ) : (
              <Image
                src={MemberIcon}
                alt="작성자 이미지"
                className="rounded-full"
                width={32}
                height={32}
              />
            )}
            <span className="text-xs-medium ml-3 md:text-md-medium lg:text-md-medium">
              {board.writer.nickname}
            </span>
            <div className="hidden border-r border border-[#334155] h-3 mx-4 md:inline lg:inline"></div>
            <div
              className="hidden text-xs-medium md:text-md-medium lg:text-md-medium md:inline lg:inline"
              style={{ color: 'var(--color-text-disabled)' }}
            >
              {new Date(board.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center">
            <Image src={LikeIcon} alt="likeIcon" width={18} />
            <span
              className="text-xs-regular ml-2 md:text-md-regular lg:text-md-regular"
              style={{ color: 'var(--color-text-disabled)' }}
            >
              {board.likeCount}
            </span>
            <Image
              src={IcKebab}
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
