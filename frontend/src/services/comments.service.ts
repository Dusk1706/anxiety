import { api } from './api.service';

interface Comment {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  date: string;
  likes: number;
  isLiked?: boolean;
}

interface PaginatedComments {
  comments: Comment[];
  total: number;
}

export const commentsService = {
  /**
   * Obtener comentarios para un post específico
   */
  getByPostId: async (postId: number): Promise<Comment[]> => {
    try {
      const response = await api.get<PaginatedComments>(`/api/comments?post_id=${postId}`);
      return response?.comments || [];
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
      return [];
    }
  },

  /**
   * Crear un nuevo comentario
   */
  create: async (postId: number, content: string): Promise<Comment> => {
    const response = await api.post<Comment>('/api/comments', {
      post_id: postId,
      content
    });
    if (!response) {
      throw new Error('Error al crear comentario');
    }
    return response;
  },

  /**
   * Dar like a un comentario
   */
  like: async (commentId: number): Promise<void> => {
    try {
      await api.post<void>(`/api/comments/${commentId}/like`, {});
    } catch (error) {
      console.error('Error al dar like al comentario:', error);
      throw error;
    }
  }
};
