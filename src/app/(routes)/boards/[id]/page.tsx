"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getArticleById, getArticleComments, postComment, deleteComment } from '@/services/api/article';
import { Article, Comment } from '@/types/article';

const ArticleDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const articleId = Number(id);

  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchArticle = async () => {
    try {
      const response = await getArticleById(articleId);
      setArticle(response.data);
    } catch (error) {
      console.error('Failed to fetch article', error);
      alert('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getArticleComments(articleId);
      setComments(response.data.list);
    } catch (error) {
      console.error('Failed to fetch comments', error);
      alert('댓글을 불러오는데 실패했습니다.');
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;

    try {
      await postComment(articleId, newComment);
      setNewComment('');
      await fetchComments();
    } catch (error) {
      console.error('Failed to post comment', error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      await fetchComments();
    } catch (error) {
      console.error('Failed to delete comment', error);
      alert('댓글 삭제에 실패했습니다.');
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
        <div className="border-t border-[#F8FAFC1A] my-8"></div>
        <div className="flex justify-between items-center text-gray-400 mb-6">
          <div className="flex items-center space-x-2">
            <span>{article.writer.name}</span>
            <span>|</span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{article.likeCount} Likes</span>
            <span>{comments.length} 댓글</span>
          </div>
        </div>

        <div className="p-6 rounded-lg mb-8">
          <p>{article.content}</p>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-lg font-semibold">댓글달기</p>
          <div className="flex flex-col">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력해주세요."
              className="w-full h-[104px] p-4 bg-[#2C3E50] rounded-lg mb-4 resize-none"
            ></textarea>
            <div className="flex justify-end">
              <button onClick={handleCommentSubmit} className="bg-green-500 px-6 py-2 rounded-lg">
                등록
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg">
          {comments.length === 0 ? (
            <p className="text-gray-400">아직 작성된 댓글이 없습니다.</p>
          ) : (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="mb-4">
                  <div className="flex justify-between items-center">
                    <span>{comment.writer.name}</span>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500"
                    >
                      삭제
                    </button>
                  </div>
                  <p>{comment.content}</p>
                  <span className="text-gray-400">{new Date(comment.createdAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
