'use client';

import Link from 'next/link';
import { useAuth } from '../providers/AuthProvider';

type HeaderProps = {
  activePage?: 'dashboard' | 'profile' | 'groups' | 'chat' | 'test' | 'activities' | 'posts';
}

export default function Header({ activePage = 'dashboard' }: HeaderProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-xl font-bold gradient-text">
                Mi Aplicación
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/dashboard" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  activePage === 'dashboard'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/profile" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  activePage === 'profile'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Perfil
              </Link>
              <Link 
                href="/dashboard/groups" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  activePage === 'groups'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Grupos
              </Link>
              <Link 
                href="/dashboard/chat" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  activePage === 'chat'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Chat
              </Link>
              <Link 
                href="/dashboard/activities" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  activePage === 'activities'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Actividades
              </Link>
              <Link
                href="/dashboard/posts"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  activePage === 'posts'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Posts
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-700">Hola, {user?.name || 'Usuario'}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 