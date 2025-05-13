import { api } from './api.service';

interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  date: string;
  likes: number;
  comments: number;
  category: string;
  tags: string[];
  isLiked?: boolean;
  isSaved?: boolean;
  image?: string;
}

interface PaginatedResponse<T> {
  posts: T[];
  total: number;
  page: number;
  per_page: number;
}

export const postsService = {
  getAll: async (): Promise<Post[]> => {
    const response = await api.get<PaginatedResponse<Post>>('/api/posts');
    return response?.posts || [];
  },

  getById: async (postId: number): Promise<Post | null> => {
    try {
      const response = await api.get<Post>(`/api/posts/${postId}`);
      return response || null;
    } catch (error) {
      console.error(`Error fetching post with ID ${postId}:`, error);
      return null;
    }
  },

  create: async (postData: Partial<Post>): Promise<Post> => {
    const response = await api.post<Post>('/api/posts', postData);
    if (!response) {
      throw new Error('Failed to create post');
    }
    return response;
  },

  like: async (postId: number): Promise<void> => {
    await api.post<void>(`/api/posts/${postId}/like`, {});
  },

  save: async (postId: number): Promise<void> => {
    await api.post<void>(`/api/posts/${postId}/save`, {});
  }
};
