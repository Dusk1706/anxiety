'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Usuario Demo');
  const [email, setEmail] = useState(user?.email || 'usuario@ejemplo.com');
  const [bio, setBio] = useState('Soy un apasionado de la tecnología y el desarrollo web.');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // Stats mock data
  const stats = [
    { label: 'Días activo', value: '14' },
    { label: 'Tareas completadas', value: '23' },
    { label: 'Nivel', value: 'Intermedio' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulamos actualización
    setTimeout(() => {
      setSuccessMessage('Perfil actualizado correctamente');
      setIsEditing(false);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen">
      <Header activePage="profile" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold gradient-text mb-8">Mi Perfil</h1>
        
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            {successMessage}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Banner and Profile Section */}
          <div className="relative h-48 bg-gradient-to-r from-blue-400 to-indigo-600">
            <div className="absolute -bottom-16 left-8">
              <div className="rounded-full h-32 w-32 bg-white p-1 shadow-lg">
                <div className="rounded-full overflow-hidden h-full w-full bg-gray-100 flex items-center justify-center">
                  <svg className="h-20 w-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-6">
              <button 
                onClick={() => setIsEditing(!isEditing)} 
                className={isEditing ? "btn-secondary" : "btn-primary"}
              >
                {isEditing ? "Cancelar" : "Editar perfil"}
              </button>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Biografía
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <button type="submit" className="btn-primary">
                    Guardar cambios
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                  <p className="text-gray-500">{email}</p>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-2">Sobre mí</h3>
                  <p className="text-gray-600">{bio}</p>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-4">Estadísticas</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Preferences Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Preferencias</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">Notificaciones</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Notificaciones por email</span>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input type="checkbox" id="email-notifications" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 checked:right-0 checked:border-blue-500"/>
                    <label htmlFor="email-notifications" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Notificaciones en la aplicación</span>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input type="checkbox" id="app-notifications" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 checked:right-0 checked:border-blue-500" defaultChecked />
                    <label htmlFor="app-notifications" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">Temas</h3>
              <div className="flex space-x-4">
                <button className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white shadow-md"></button>
                <button className="w-10 h-10 rounded-full bg-purple-600 border-2 border-white shadow-md"></button>
                <button className="w-10 h-10 rounded-full bg-green-500 border-2 border-white shadow-md"></button>
                <button className="w-10 h-10 rounded-full bg-gray-800 border-2 border-white shadow-md"></button>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">Privacidad</h3>
              <div className="flex items-center">
                <input 
                  id="privacy-profile" 
                  type="checkbox" 
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  defaultChecked
                />
                <label htmlFor="privacy-profile" className="ml-2 block text-gray-600">
                  Hacer mi perfil visible para todos los usuarios
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Account Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Seguridad de la cuenta</h2>
          
          <div className="space-y-4">
            <Link 
              href="/dashboard/profile/change-password" 
              className="btn-secondary w-full flex justify-center"
            >
              Cambiar contraseña
            </Link>
            
            <button className="text-red-600 hover:text-red-800 font-medium">
              Eliminar cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 