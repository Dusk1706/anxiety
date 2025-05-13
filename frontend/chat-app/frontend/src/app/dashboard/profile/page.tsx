'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ChatInterface from '../../components/ChatInterface';
import { useChat } from '../../hooks/useChat';

export default function ChatPage() {
  const { messages, sendMessage, fetchMessages } = useChat();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      await fetchMessages();
      setLoading(false);
    };

    loadMessages();
  }, [fetchMessages]);

  return (
    <div className="min-h-screen">
      <Header activePage="chat" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold gradient-text mb-8">Chat</h1>
        {loading ? (
          <div className="text-center">Cargando mensajes...</div>
        ) : (
          <ChatInterface messages={messages} onSendMessage={sendMessage} />
        )}
      </div>
    </div>
  );
}