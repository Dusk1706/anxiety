'use client';

import Link from 'next/link';
import { useAuth } from '../providers/AuthProvider';

type HeaderProps = {
  activePage?: 'dashboard' | 'profile' | 'groups' | 'chat' | 'test' | 'activities';
}

export default function Header({ activePage = 'dashboard' }: HeaderProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // No need to redirect, the auth context will handle it
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold gradient-text">Mi Aplicación</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/dashboard" 
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  activePage === 'dashboard'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/profile" 
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  activePage === 'profile'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Perfil
              </Link>
              <Link 
                href="/dashboard/groups" 
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  activePage === 'groups'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Grupos
              </Link>
              <Link 
                href="/dashboard/chat" 
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  activePage === 'chat'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Chat
              </Link>
              <Link 
                href="/dashboard/test" 
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  activePage === 'test'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Test
              </Link>
              <Link 
                href="/dashboard/activities" 
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  activePage === 'activities'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Actividades
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-700">Hola, {user?.name || 'Usuario'}</span>
            <button
              onClick={handleLogout}
              className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 