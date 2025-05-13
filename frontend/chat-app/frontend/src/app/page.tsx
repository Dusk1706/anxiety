import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ChatInterface from '../components/ChatInterface';
import { useChat } from '../hooks/useChat';

export default function ChatPage() {
  const { messages, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      await sendMessage(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSendMessage();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [inputValue]);

  return (
    <div className="min-h-screen">
      <Header activePage="chat" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold gradient-text mb-8">Chat</h1>
        <ChatInterface messages={messages} />
        <div className="mt-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe un mensaje..."
          />
          <button onClick={handleSendMessage} className="btn-primary mt-2">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}