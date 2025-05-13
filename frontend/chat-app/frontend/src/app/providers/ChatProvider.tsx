import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchChatHistory, sendMessage } from '../services/chatService';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChatHistory = async () => {
      setLoading(true);
      try {
        const history = await fetchChatHistory();
        setMessages(history);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadChatHistory();
  }, []);

  const handleSendMessage = async (message) => {
    setLoading(true);
    try {
      const newMessage = await sendMessage(message);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, loading, error, handleSendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};