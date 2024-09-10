import Image from 'next/image';
import LikeIcon from '@/assets/icons/ic_heart.svg';
import MedalIcon from '@/assets/icons/ic_medal.svg';
import MemberIcon from '@/assets/icons/ic_member.svg';
import BoardImage from '@/assets/images/img_boardtest.png';
import type { StaticImageData } from 'next/image';

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
  title: '자유게시판에 질문을 올릴 수 있어요',
  image: BoardImage,
  createdAt: '2024-07-25',
  updatedAt: '2024-07-25',
  writer: {
    name: '우지은',
  },
  content: '질문을 올려볼까요?',
  likeCount: 9999,
  isLiked: false,
};

const BestArticleCard = () => {
  const board = mockArticle; // 임시 데이터

  return (
    <div
      className="relative w-[343px] h-auto p-[40px_16px_16px] gap-4 border rounded-[12px]"
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
            className="text-md-medium-alt"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {board.title}
          </div>
          <div
            className="text-xs-medium"
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
              className="rounded-[8px]"
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
          <span className="text-xs-medium ml-3">{board.writer.name}</span>
        </div>

        <div className="flex items-center">
          <Image src={LikeIcon} alt="likeIcon" width={18} />
          <span
            className="text-xs-regular ml-2"
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
