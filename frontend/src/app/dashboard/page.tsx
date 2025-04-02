'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '../components/Header';

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      <Header activePage="dashboard" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white p-8 shadow rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">Dashboard</h2>
          
          {isAuthenticated ? (
            <p>Welcome, {user?.email}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}