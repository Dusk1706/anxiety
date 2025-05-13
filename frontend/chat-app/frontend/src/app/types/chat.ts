export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
}

export interface ChatUser {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  users: ChatUser[];
  isLoading: boolean;
}

export interface SendMessagePayload {
  userId: string;
  content: string;
}