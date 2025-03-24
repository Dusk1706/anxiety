'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';

interface Group {
  id: number;
  name: string;
  description: string;
  members: number;
  activity?: string;
  category: string;
  image?: string;
  color?: string;
}

export default function Groups() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Categorías de grupos
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'anxiety', name: 'Ansiedad' },
    { id: 'music', name: 'Música' },
    { id: 'hobbies', name: 'Pasatiempos' },
    { id: 'sports', name: 'Deportes' },
    { id: 'tech', name: 'Tecnología' },
    { id: 'art', name: 'Arte' }
  ];

  // Datos de ejemplo para grupos destacados
  const featuredGroups: Group[] = [
    {
      id: 1,
      name: 'Superando la ansiedad social',
      description: 'Un espacio seguro para compartir experiencias y estrategias para manejar la ansiedad en situaciones sociales.',
      members: 124,
      category: 'anxiety',
      image: '/images/groups/anxiety-social.jpg',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 2,
      name: 'Meditación y mindfulness',
      description: 'Comparte técnicas de meditación y mindfulness para manejar la ansiedad y el estrés diario.',
      members: 98,
      category: 'anxiety',
      image: '/images/groups/meditation.jpg',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 3,
      name: 'Amantes del rock',
      description: 'Para los amantes del rock clásico y moderno. Comparte tus bandas favoritas y descubre nueva música.',
      members: 156,
      category: 'music',
      image: '/images/groups/rock-music.jpg',
      color: 'from-red-400 to-red-600'
    }
  ];

  // Datos de ejemplo para todos los grupos
  const allGroups: Group[] = [
    {
      id: 4,
      name: 'Ansiedad y vida laboral',
      description: 'Hablemos sobre cómo manejar la ansiedad en el entorno laboral y estrategias de afrontamiento.',
      members: 87,
      activity: 'Alta',
      category: 'anxiety',
      image: '/images/groups/work-anxiety.jpg'
    },
    {
      id: 5,
      name: 'Club de lectura',
      description: 'Compartimos libros que nos ayudan a entender y manejar mejor nuestras emociones.',
      members: 64,
      activity: 'Media',
      category: 'hobbies',
      image: '/images/groups/book-club.jpg'
    },
    {
      id: 6,
      name: 'Música y relax',
      description: 'Descubre música que te ayude a relajarte y manejar los momentos de ansiedad.',
      members: 113,
      activity: 'Alta',
      category: 'music',
      image: '/images/groups/relaxing-music.jpg'
    },
    {
      id: 7,
      name: 'Yoga para principiantes',
      description: 'Aprende yoga desde cero y comparte tu progreso en un ambiente amigable.',
      members: 92,
      activity: 'Media',
      category: 'sports',
      image: '/images/groups/yoga-beginners.jpg'
    },
    {
      id: 8,
      name: 'Programadores con ansiedad',
      description: 'Un espacio para programadores que lidian con ansiedad y quieren compartir experiencias.',
      members: 76,
      activity: 'Media',
      category: 'tech',
      image: '/images/groups/dev-anxiety.jpg'
    },
    {
      id: 9,
      name: 'Arte terapéutico',
      description: 'Comparte tus creaciones artísticas y descubre cómo el arte puede ayudarte a manejar la ansiedad.',
      members: 58,
      activity: 'Baja',
      category: 'art',
      image: '/images/groups/art-therapy.jpg'
    },
    {
      id: 10,
      name: 'Running para reducir estrés',
      description: 'Grupo para amantes del running que utilizan este deporte para manejar el estrés y la ansiedad.',
      members: 104,
      activity: 'Alta',
      category: 'sports',
      image: '/images/groups/running.jpg'
    },
    {
      id: 11,
      name: 'Ansiedad en adolescentes',
      description: 'Espacio seguro para adolescentes que experimentan ansiedad y quieren conectar con otros.',
      members: 49,
      activity: 'Media',
      category: 'anxiety',
      image: '/images/groups/teen-anxiety.jpg'
    },
    {
      id: 12,
      name: 'Productividad y TOC',
      description: 'Comparte técnicas para mantenerte productivo mientras manejas tendencias obsesivo-compulsivas.',
      members: 67,
      activity: 'Media',
      category: 'anxiety',
      image: '/images/groups/productivity.jpg'
    }
  ];

  // Filtrar grupos según la categoría seleccionada y término de búsqueda
  const filteredGroups = allGroups.filter(group => {
    const matchesCategory = activeCategory === 'all' || group.category === activeCategory;
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           group.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Solución temporal para las imágenes faltantes
  const getGroupImage = (group: Group) => {
    // Simulamos tener las imágenes con un color de fondo y la primera letra del nombre
    return (
      <div className={`w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center`}>
        <span className="text-white text-3xl font-bold">{group.name.charAt(0)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="groups" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold gradient-text mb-4">Grupos y comunidades</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explora comunidades de personas que comparten tus intereses y experiencias. 
            Únete a los grupos que te interesen y comienza a conectar con otros.
          </p>
        </div>

        {/* Búsqueda */}
        <div className="mb-8">
          <div className="max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar grupos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Grupos destacados */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Grupos destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGroups.map(group => (
              <div key={group.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className={`h-40 bg-gradient-to-r ${group.color} relative`}>
                  {/* Usamos un div coloreado como placeholder para las imágenes */}
                  {getGroupImage(group)}
                  <div className="absolute bottom-4 left-4 bg-white rounded-full px-3 py-1 text-sm font-medium text-gray-800">
                    {categories.find(c => c.id === group.category)?.name}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>
                  <p className="text-gray-600 mb-4">{group.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">{group.members} miembros</span>
                  </div>
                  <div className="flex space-x-3">
                    <Link href={`/dashboard/groups/${group.id}`} className="btn-primary flex-1 text-center">
                      Ver grupo
                    </Link>
                    <Link href={`/dashboard/chat?group=${group.id}`} className="btn-secondary flex-1 text-center">
                      Chatear
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filtros por categoría */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de grupos */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Todos los grupos</h2>
          {filteredGroups.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">No se encontraron grupos que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map(group => (
                <div key={group.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-32 bg-gray-200 relative">
                    {getGroupImage(group)}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        group.activity === 'Alta' ? 'bg-green-100 text-green-800' :
                        group.activity === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        Actividad {group.activity}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{group.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500">{group.members} miembros</span>
                      <span className="text-xs text-gray-500">{categories.find(c => c.id === group.category)?.name}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/groups/${group.id}`} className="btn-primary text-xs flex-1 text-center py-2">
                        Ver detalles
                      </Link>
                      <Link href={`/dashboard/chat?group=${group.id}`} className="btn-secondary text-xs flex-1 text-center py-2">
                        Chatear
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Crear nuevo grupo */}
        <div className="mt-12 text-center">
          <Link href="/dashboard/groups/create" className="btn-primary inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Crear nuevo grupo
          </Link>
        </div>
      </main>
    </div>
  );
} 