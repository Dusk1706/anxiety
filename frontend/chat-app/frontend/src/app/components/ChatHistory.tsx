import React from 'react';
import { useChat } from '../hooks/useChat';
import ChatMessage from './ChatMessage';

const ChatHistory: React.FC = () => {
  const { messages } = useChat();

  return (
    <div className="chat-history overflow-y-auto h-96">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatHistory;