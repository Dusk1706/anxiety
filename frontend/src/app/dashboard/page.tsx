'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../providers/AuthProvider';

export default function Dashboard() {
  const router = useRouter();
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
    <div className="min-h-screen">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold">Mi Aplicación</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link 
                  href="/dashboard" 
                  className="flex items-center border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/dashboard/profile" 
                  className="flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Perfil
                </Link>
                <Link 
                  href="/dashboard/groups" 
                  className="flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Grupos
                </Link>
                <Link 
                  href="/dashboard/chat" 
                  className="flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Chat
                </Link>
                <Link 
                  href="/dashboard/test" 
                  className="flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Test
                </Link>
                <Link 
                  href="/dashboard/activities" 
                  className="flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
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

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white p-8 shadow rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Panel de control</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-blue-700 mb-2">Bienvenido</h3>
              <p className="text-gray-600">Has iniciado sesión correctamente. Aquí podrás gestionar tu cuenta y acceder a todas las funcionalidades.</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-green-700 mb-2">Actividad</h3>
              <p className="text-gray-600">No hay actividad reciente en tu cuenta. ¡Empieza a utilizar la aplicación!</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-purple-700 mb-2">Notificaciones</h3>
              <p className="text-gray-600">No tienes notificaciones pendientes.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 