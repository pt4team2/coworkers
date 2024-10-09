import { useEffect, useState } from 'react';
import Image from 'next/image';
import MemberIcon from '@/assets/icons/ic_member.svg';
import IcKebab from '@/assets/icons/ic_kebab.svg';
import { getArticleComments, postComment, deleteComment } from '@/services/api/article';
import { Comment } from '@/types/article';

interface CommentCardProps {
  articleId: number;
}

const CommentCard = ({ articleId }: CommentCardProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const toggleDropdown = (commentId: number) => {
    setIsDropdownOpen(prev => (prev === commentId ? null : commentId));
  };

  const handleSelect = async (option: string, commentId: number) => {
    if (option === '삭제하기') {
      const confirmDelete = confirm('이 댓글을 삭제하시겠습니까?');
      if (confirmDelete) {
        await deleteComment(commentId);
        alert('댓글이 삭제되었습니다.');
        setComments(comments.filter(comment => comment.id !== commentId));
      }
    }
    setIsDropdownOpen(null);
  };

  const fetchComments = async (id: number) => {
    try {
      const response = await getArticleComments(id);
      setComments(response.list);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;

    try {
      await postComment(articleId, newComment);
      setNewComment('');
      await fetchComments(articleId);
    } catch (error) {
      console.error('댓글 등록에 실패했습니다.', error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchComments(articleId);
  }, [articleId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!comments.length) {
    return <div>댓글이 없습니다.</div>;
  }

  return (
    <div>
      {comments.map(comment => (
        <div
          key={comment.id}
          className="relative w-full h-auto p-[24px_16px_16px] gap-4 border rounded-[12px] lg:w-[590px] mb-4"
          style={{
            backgroundColor: 'var(--color-background-secondary)',
            borderColor: '#334155',
          }}
        >
          <div className="flex">
            <div className="flex-1">
              <div
                className="text-md-medium-alt md:text-lg md:leading-7 md:font-medium lg:text-lg lg:leading-7 lg:font-medium"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {comment.content}
              </div>
            </div>
            <div className="relative">
              <Image
                src={IcKebab}
                alt="kebab icon"
                width={16}
                height={16}
                className="hidden lg:ml-4 md:ml-4 lg:w-6 lg:h-6 md:w-6 md:h-6 md:inline lg:inline cursor-pointer"
                onClick={() => toggleDropdown(comment.id)}
              />
              {isDropdownOpen === comment.id && (
                <div className="origin-top-right absolute right-0 mt-[6px] md:mt-2 lg:mt-2 w-[120px] rounded-lg shadow-lg bg-[#1E293B] border border-[#334155] focus:outline-none z-10">
                  <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      onClick={() => handleSelect('수정하기', comment.id)}
                      className="block h-[40px] w-full px-[8px] py-[11px] text-md-regular hover:bg-gray-700 rounded-t-3 text-center"
                      role="menuitem"
                    >
                      수정하기
                    </button>
                    <button
                      onClick={() => handleSelect('삭제하기', comment.id)}
                      className="block h-[40px] w-full px-[8px] py-[11px] text-md-regular hover:bg-gray-700 rounded-b-3 text-center"
                      role="menuitem"
                    >
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
              <span className="text-xs-medium ml-3 md:text-md-medium lg:text-md-medium">
                {comment.writer.nickname}
              </span>
              <div className="hidden border-r border border-[#334155] h-3 mx-4 md:inline lg:inline"></div>
              <div
                className="hidden text-xs-medium md:text-md-medium lg:text-md-medium md:inline lg:inline"
                style={{ color: 'var(--color-text-disabled)' }}
              >
                {new Date(comment.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
