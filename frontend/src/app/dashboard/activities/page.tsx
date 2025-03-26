'use client';

import { useState } from 'react';

interface Activity {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  sequence: number;
}

// Example activities - these would come from the backend in the future
const exampleActivities: Activity[] = [
  {
    id: 1,
    title: "Ejercicio de Respiración Profunda",
    description: "Realiza 10 respiraciones profundas, inhalando por 4 segundos, manteniendo por 4 segundos y exhalando por 4 segundos.",
    status: 'pending',
    sequence: 1
  },
  {
    id: 2,
    title: "Meditación Guiada",
    description: "Escucha una meditación guiada de 5 minutos enfocada en la atención plena y la reducción de la ansiedad.",
    status: 'pending',
    sequence: 2
  },
  {
    id: 3,
    title: "Diario de Pensamientos",
    description: "Escribe en tu diario sobre tus preocupaciones actuales y cómo te hacen sentir.",
    status: 'pending',
    sequence: 3
  },
  {
    id: 4,
    title: "Ejercicio de Relajación Muscular",
    description: "Realiza una secuencia de tensión y relajación de diferentes grupos musculares.",
    status: 'pending',
    sequence: 4
  },
  {
    id: 5,
    title: "Paseo Consciente",
    description: "Da un paseo de 10 minutos prestando atención a tus sensaciones y el entorno.",
    status: 'pending',
    sequence: 5
  }
];

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>(exampleActivities);

  const toggleActivityStatus = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id 
        ? { ...activity, status: activity.status === 'completed' ? 'pending' : 'completed' }
        : activity
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 gradient-text">
            Actividades para el Manejo de la Ansiedad
          </h1>
          
          <div className="space-y-6">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  activity.status === 'completed'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                        {activity.sequence}
                      </span>
                      <h2 className="text-xl font-semibold">{activity.title}</h2>
                    </div>
                    <p className="text-gray-600 ml-11">{activity.description}</p>
                  </div>
                  <button
                    onClick={() => toggleActivityStatus(activity.id)}
                    className={`ml-4 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      activity.status === 'completed'
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {activity.status === 'completed' ? 'Realizada' : 'Pendiente'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 