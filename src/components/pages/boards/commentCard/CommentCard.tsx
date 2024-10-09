import { useEffect, useState } from 'react';
import Image from 'next/image';
import MemberIcon from '@/assets/icons/ic_member.svg';
import IcKebab from '@/assets/icons/ic_kebab.svg';
import { getArticleComments, deleteComment, patchComment } from '@/services/api/article';
import { Comment } from '@/types/article';

interface CommentCardProps {
  articleId: number;
}

const CommentCard = ({ articleId }: CommentCardProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');

  const toggleDropdown = (commentId: number) => {
    setIsDropdownOpen(prev => (prev === commentId ? null : commentId));
  };

  const handleSelect = async (option: string, commentId: number) => {
    if (option === '삭제하기') {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
    } else if (option === '수정하기') {
      setEditingCommentId(commentId);
      setEditedContent(comments.find(comment => comment.id === commentId)?.content || '');
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

  const handleEdit = async (commentId: number) => {
    if (editedContent.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    try {
      await patchComment(commentId, editedContent);
      setComments(comments.map(comment => comment.id === commentId ? { ...comment, content: editedContent } : comment));
      setEditingCommentId(null);
      setEditedContent('');
    } catch (error) {
      console.error('Failed to update comment:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedContent('');
  };

  useEffect(() => {
    fetchComments(articleId);
  }, [articleId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!comments.length) {
    return <div className="text-md-medium text-gray-400">아직 작성된 댓글이 없습니다.</div>;
  }

  return (
    <div>
      {comments.map(comment => (
        <div
          key={comment.id}
          className="relative w-full h-[113px] p-4 gap-4 border rounded-[12px] mb-4"
          style={{
            backgroundColor: 'var(--color-background-secondary)',
            borderColor: '#334155',
          }}
        >
          <div className="flex">
            <div className="flex-1 mb-8">
              {editingCommentId === comment.id ? (
                <div className="flex flex-row">
                  <div className="flex-1 text-md-regular md:text-lg-regular lg:text-lg-regular">
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full h-20 border rounded-[8px] p-2 bg-transparent resize-none"
                      style={{
                        borderColor: '#334155',
                      }}
                    />
                  </div>
                  <button
                    onClick={() => handleEdit(comment.id)}
                    className="bg-status-brand rounded-[8px] w-12 h-8 ml-2"
                  >
                    수정
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 rounded-[8px] w-12 h-8 ml-2"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <div
                  className="text-md-regular md:text-lg-regular lg:text-lg-regular"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {comment.content}
                </div>
              )}
            </div>

            <div className="relative">
              <Image
                src={IcKebab}
                alt="kebab icon"
                width={16}
                height={16}
                className="lg:ml-4 md:ml-4 lg:w-6 lg:h-6 md:w-6 md:h-6 cursor-pointer"
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

          {editingCommentId !== comment.id && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image
                  src={MemberIcon}
                  alt="작성자 이미지"
                  className="rounded-full"
                  width={32}
                  height={32}
                />
                <span className="text-xs-medium ml-[6px] md:text-md-medium lg:text-md-medium">
                  {comment.writer.nickname}
                </span>
                <div className="border-r border border-[#334155] h-3 mx-2 md:mx-4 lg:mx-4"></div>
                <div
                  className="text-xs-medium md:text-md-medium lg:text-md-medium"
                  style={{ color: 'var(--color-text-disabled)' }}
                >
                  {new Date(comment.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
