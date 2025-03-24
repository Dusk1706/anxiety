'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }
    
    // Validate password length
    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setLoading(true);

    try {
      // Simulación de cambio de contraseña
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Error al cambiar la contraseña. Por favor, inténtalo de nuevo.');
      console.error('Change password error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header activePage="profile" />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link 
            href="/dashboard/profile" 
            className="mr-4 text-blue-600 hover:text-blue-800"
          >
            ← Volver al perfil
          </Link>
          <h1 className="text-2xl font-bold gradient-text">Cambiar contraseña</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          {success ? (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-gray-900">Contraseña actualizada correctamente</h2>
              <p className="text-gray-600">Tu contraseña ha sido cambiada exitosamente. Usa la nueva contraseña la próxima vez que inicies sesión.</p>
              <div className="pt-4">
                <button 
                  onClick={() => router.push('/dashboard/profile')}
                  className="btn-primary"
                >
                  Volver al perfil
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}
              
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña actual
                </label>
                <input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Nueva contraseña
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar nueva contraseña
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Cambiando contraseña...' : 'Cambiar contraseña'}
                </button>
              </div>
              
              <div className="text-sm text-center text-gray-500 pt-4">
                <p>Asegúrate de usar una contraseña segura que no uses en otros sitios.</p>
              </div>
            </form>
          )}
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Recomendaciones para una contraseña segura:</h2>
          <ul className="space-y-2 text-gray-600 list-disc pl-5">
            <li>Usa al menos 8 caracteres</li>
            <li>Incluye una mezcla de letras, números y símbolos</li>
            <li>Evita palabras comunes o información personal</li>
            <li>No uses la misma contraseña que en otros sitios</li>
            <li>Cambia tu contraseña regularmente</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 