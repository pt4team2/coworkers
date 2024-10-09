"use client";

import { useEffect, useState } from 'react';
import { getArticleById, getArticleComments, postComment } from '@/services/api/article';
import { Article, Comment } from '@/types/article';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import MemberIcon from '@/assets/icons/ic_member.svg';
import LikeIcon from '@/assets/icons/ic_heart.svg';
import CommentIcon from '@/assets/icons/ic_comment.svg';
import CommentCard from '@/components/pages/boards/commentCard/CommentCard';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const articleId = Array.isArray(id) ? id[0] : id;
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchArticle = async () => {
    if (!articleId) return;

    try {
      const response = await getArticleById(Number(articleId));
      setArticle(response.data);
    } catch (error) {
      console.error('게시글을 가져오는데 실패했습니다.', error);
      alert('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    if (!articleId) return;

    try {
      const response = await getArticleComments(Number(articleId));
      setComments(response.list);
    } catch (error) {
      console.error('댓글을 가져오는데 실패했습니다.', error);
      alert('댓글을 불러오는데 실패했습니다.');
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;

    try {
      await postComment(Number(articleId), newComment);
      setNewComment('');
      await fetchComments();
    } catch (error) {
      console.error('댓글 등록에 실패했습니다.', error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchArticle();
      fetchComments();
    }
  }, [articleId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>게시글이 존재하지 않습니다.</div>;
  }

  return (
    <div className="px-4 py-8 min-h-screen">
      <div className="mt-8 mx-auto">
        <h1 className="text-lg-medium mb-4">{article.title}</h1>
        <div className="border-t border-[#F8FAFC1A] my-4"></div>
        <div className="flex justify-between items-center text-gray-400 mb-6">
          <div className="flex items-center space-x-2">
            {article.writer.image ? (
              <Image
                src={article.writer.image}
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
            <span className="text-xs-medium text-white">{article.writer.nickname}</span>
            <div className="border-r border border-[#334155] h-3 mx-2 md:mx-4 lg:mx-4"></div>
            <span className="text-xs-medium">{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              <Image src={CommentIcon} alt="댓글" width={16} height={16} className="mr-1" />
              <span className="text-xs-regular">{comments.length}</span>
            </div>
            <div className="flex items-center">
              <Image src={LikeIcon} alt="좋아요" width={16} height={16} className="mr-1" />
              <span className="text-xs-regular">{article.likeCount}</span>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <p className="text-md-medium-alt">{article.content}</p>
        </div>

        <div className="mb-6">
          <p className="mb-4 text-lg-medium">댓글달기</p>
          <div className="flex flex-col">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력해주세요."
              className="w-full h-[104px] p-4 bg-[#2C3E50] rounded-lg mb-4 resize-none"
            ></textarea>
            <div className="flex justify-end">
              <button onClick={handleCommentSubmit} className="bg-status-brand text-md-bold px-6 py-2 rounded-[12px]">
                등록
              </button>
            </div>
          </div>
        </div>

        <div>
          {comments.length === 0 ? (
            <p className="text-gray-400">아직 작성된 댓글이 없습니다.</p>
          ) : (
            <CommentCard articleId={Number(articleId)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
