import { useEffect, useState } from 'react';
import Image from 'next/image';
import LikeIcon from '@/assets/icons/ic_heart.svg';
import MedalIcon from '@/assets/icons/ic_medal.svg';
import MemberIcon from '@/assets/icons/ic_member.svg';
import { getArticleById } from '@/services/api/article';
import { Article } from '@/types/article';

interface BestArticleCardProps {
  articleId: number;
}

const BestArticleCard = ({ articleId }: BestArticleCardProps) => {
  const [board, setBoard] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

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
      className="relative w-full h-auto p-[40px_16px_16px] gap-4 border rounded-[12px] lg:w-[387px] lg:gap-5"
      style={{
        backgroundColor: 'var(--color-background-secondary)',
        borderColor: '#334155',
      }}
    >
      <div className="absolute top-[10px] left-[14px] flex items-center">
        <Image src={MedalIcon} alt="Medal Icon" width={16} height={16} />
        <span className="text-md-semibold ml-1">Best</span>
      </div>

      <div className="flex">
        <div className="flex-1 flex flex-col justify-between">
          <div
            className="text-md-medium-alt md:text-lg md:leading-7 md:font-medium lg:text-lg lg:leading-7 lg:font-medium"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {board.title}
          </div>
          <div
            className="text-xs-medium md:text-md-medium lg:text-md-medium"
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
              className="rounded-[8px] lg:w-[72px] lg:h-[72px] md:w-[72px] md:h-[72px]"
              width={64}
              height={64}
            />
          </div>
        )}
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
          <span className="text-xs-medium ml-3 md:text-md-medium lg:text-md-medium">{board.writer.nickname}</span>
        </div>

        <div className="flex items-center">
          <Image src={LikeIcon} alt="likeIcon" width={18} />
          <span
            className="text-xs-regular ml-2 md:text-md-regular lg:text-md-regular"
            style={{ color: 'var(--color-text-disabled)' }}
          >
            {board.likeCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BestArticleCard;
