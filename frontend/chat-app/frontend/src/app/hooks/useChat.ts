import { useState, useEffect } from 'react';
import { sendMessage, getChatHistory } from '../services/chatService';
import { ChatMessage } from '../types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      setLoading(true);
      try {
        const history = await getChatHistory();
        setMessages(history);
      } catch (err) {
        setError('Error fetching chat history');
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  const handleSendMessage = async (content: string) => {
    const newMessage: ChatMessage = { content, sender: 'user', timestamp: new Date().toISOString() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await sendMessage(content);
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: response.data, sender: 'bot', timestamp: new Date().toISOString() },
      ]);
    } catch (err) {
      setError('Error sending message');
    }
  };

  return {
    messages,
    loading,
    error,
    handleSendMessage,
  };
};