'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import Header from '../components/Header';

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header activePage="dashboard" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white p-8 shadow rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">Panel de control</h2>
          
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