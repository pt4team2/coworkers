import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { Article, Comment } from '@/types/article';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getArticles = async (params: { page: number; pageSize: number; orderBy: string }) => {
  const response = await authAxiosInstance.get('/articles', { params });
  return response.data;
};

export const getArticleById = async (articleId: number) => {
  return authAxiosInstance.get<Article>(`/articles/${articleId}`);
};

export const patchArticle = async (articleId: number, updatedArticle: { title: string; content: string }) => {
  return authAxiosInstance.patch<Article>(`/articles/${articleId}`, updatedArticle);
};

export const deleteArticleById = async (articleId: number) => {
  return authAxiosInstance.delete(`/articles/${articleId}`);
};

export const getArticleComments = async (articleId: number) => {
  const response = await authAxiosInstance.get<{ list: Comment[] }>(
    `/articles/${articleId}/comments`,
    {
      params: {
        limit: 10,
      },
    },
  );
  return response.data;
};

export const postComment = async (articleId: number, content: string) => {
  return authAxiosInstance.post<Comment>(`/articles/${articleId}/comments`, { content });
};

export const deleteComment = async (commentId: number) => {
  return authAxiosInstance.delete<void>(`/comments/${commentId}`);
};

export const patchComment = async (commentId: number, content: string) => {
  return authAxiosInstance.patch<Comment>(`/comments/${commentId}`, { content });
};
