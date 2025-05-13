import React from 'react';
import { ChatProvider } from '../providers/ChatProvider';
import Header from '../components/Header';

const Layout = ({ children }) => {
  return (
    <ChatProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </ChatProvider>
  );
};

export default Layout;