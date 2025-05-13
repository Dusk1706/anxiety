import { useEffect, useState } from 'react';
import ChatInput from './ChatInput';
import ChatHistory from './ChatHistory';
import { useChat } from '../hooks/useChat';

const ChatInterface = () => {
  const { messages, sendMessage } = useChat();
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (message) => {
    setLoading(true);
    await sendMessage(message);
    setLoading(false);
  };

  useEffect(() => {
    // Scroll to the bottom of the chat history when messages change
    const chatHistory = document.getElementById('chat-history');
    if (chatHistory) {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-interface">
      <div id="chat-history" className="chat-history">
        <ChatHistory messages={messages} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} loading={loading} />
    </div>
  );
};

export default ChatInterface;