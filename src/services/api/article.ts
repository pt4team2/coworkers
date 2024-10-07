import axios from 'axios';
import { Article, Comment } from '@/types/article';

const API_BASE_URL = 'https://api.example.com';

export const getArticles = async (params: { page: number; pageSize: number; orderBy: string }) => {
    const response = await axios.get('/api/articles', { params });
    return response.data;
  };

export const getArticleById = async (articleId: number) => {
  return axios.get<Article>(`${API_BASE_URL}/articles/${articleId}`);
};

export const getArticleComments = async (articleId: number) => {
  return axios.get<{ list: Comment[] }>(`${API_BASE_URL}/articles/${articleId}/comments`);
};

export const postComment = async (articleId: number, content: string) => {
  return axios.post<Comment>(`${API_BASE_URL}/articles/${articleId}/comments`, { content });
};

export const deleteComment = async (commentId: number) => {
  return axios.delete<void>(`${API_BASE_URL}/comments/${commentId}`);
};
