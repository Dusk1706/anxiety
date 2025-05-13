import { useEffect, useState } from 'react';
import { ChatInterface } from '../../components/ChatInterface';
import { useChat } from '../../hooks/useChat';
import Header from '../../components/Header';

export default function ChatPage() {
  const { messages, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen">
      <Header activePage="chat" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold gradient-text mb-8">Chat</h1>
        <div id="chat-container" className="bg-white rounded-lg shadow-md overflow-hidden h-96 flex flex-col">
          <ChatInterface messages={messages} />
        </div>
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