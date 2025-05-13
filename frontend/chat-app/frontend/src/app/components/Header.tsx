import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Chat Application</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard/profile" className="hover:underline">Profile</Link>
            </li>
            <li>
              <Link href="/dashboard/chat" className="hover:underline">Chat</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;