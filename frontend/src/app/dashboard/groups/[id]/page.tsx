'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header';

interface GroupMember {
  id: number;
  name: string;
  avatar?: string;
  joinDate: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'online' | 'offline';
}

interface Post {
  id: number;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  content: string;
  date: string;
  likes: number;
  comments: number;
}

interface GroupDetails {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  createdAt: string;
  members: number;
  posts: number;
  isJoined: boolean;
  image?: string;
}

export default function GroupDetails() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.id;
  
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<GroupDetails | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'members' | 'posts'>('about');
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // Simulamos la carga de datos del grupo
    setTimeout(() => {
      // Datos ficticios del grupo
      const mockGroup: GroupDetails = {
        id: Number(groupId),
        name: 'Superando la ansiedad social',
        description: 'Un espacio seguro para compartir experiencias y estrategias',
        longDescription: 
          'Este grupo está dedicado a crear un espacio seguro donde las personas que experimentan ansiedad social puedan compartir sus experiencias, desafíos y estrategias para superarlos. Aquí puedes encontrar apoyo, recursos útiles y conectar con otros que entienden por lo que estás pasando. Todos son bienvenidos, ya sea que busques ayuda o quieras compartir tus conocimientos para ayudar a otros.',
        category: 'Ansiedad',
        createdAt: '15 de marzo de 2023',
        members: 124,
        posts: 367,
        isJoined: false,
      };
      
      // Datos ficticios de miembros
      const mockMembers: GroupMember[] = [
        {
          id: 1,
          name: 'Laura García',
          joinDate: '15 de marzo de 2023',
          role: 'admin',
          status: 'online'
        },
        {
          id: 2,
          name: 'Carlos Rodríguez',
          joinDate: '16 de marzo de 2023',
          role: 'moderator',
          status: 'offline'
        },
        {
          id: 3,
          name: 'Ana Martínez',
          joinDate: '20 de marzo de 2023',
          role: 'member',
          status: 'online'
        },
        {
          id: 4,
          name: 'David López',
          joinDate: '2 de abril de 2023',
          role: 'member',
          status: 'offline'
        },
        {
          id: 5,
          name: 'Elena Sánchez',
          joinDate: '10 de abril de 2023',
          role: 'member',
          status: 'online'
        }
      ];
      
      // Datos ficticios de publicaciones
      const mockPosts: Post[] = [
        {
          id: 1,
          author: { id: 1, name: 'Laura García' },
          content: 'Hoy hemos actualizado los recursos del grupo con nuevos artículos sobre técnicas de respiración para momentos de ansiedad. ¡No olviden revisarlos!',
          date: 'Hace 2 días',
          likes: 15,
          comments: 3
        },
        {
          id: 2,
          author: { id: 3, name: 'Ana Martínez' },
          content: 'Acabo de enfrentar una situación social que me causaba mucha ansiedad y logré manejarla bastante bien. Las técnicas que hemos compartido aquí realmente funcionan. ¡Gracias a todos por el apoyo!',
          date: 'Hace 3 días',
          likes: 22,
          comments: 7
        },
        {
          id: 3,
          author: { id: 2, name: 'Carlos Rodríguez' },
          content: 'Recordatorio: Tendremos nuestra reunión virtual este viernes a las 18:00h. El tema será "Cómo manejar la ansiedad en el trabajo". ¡Todos están invitados!',
          date: 'Hace 4 días',
          likes: 18,
          comments: 5
        }
      ];

      setGroup(mockGroup);
      setMembers(mockMembers);
      setPosts(mockPosts);
      setIsJoined(mockGroup.isJoined);
      setLoading(false);
    }, 1000);
  }, [groupId]);

  const handleJoinGroup = () => {
    // Simulamos unirse al grupo
    setIsJoined(true);
  };

  const handleLeaveGroup = () => {
    // Simulamos abandonar el grupo
    setIsJoined(false);
  };

  const getGroupImage = () => {
    // Simulamos una imagen con un div coloreado
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
        <span className="text-white text-5xl font-bold">{group?.name.charAt(0)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header activePage="groups" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header activePage="groups" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Grupo no encontrado</h2>
            <p className="text-gray-600 mb-6">El grupo que buscas no existe o ha sido eliminado.</p>
            <Link href="/dashboard/groups" className="btn-primary">
              Volver a grupos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="groups" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botón volver */}
        <div className="mb-6">
          <Link href="/dashboard/groups" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a grupos
          </Link>
        </div>

        {/* Cabecera del grupo */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-48 bg-gray-200 relative">
            {getGroupImage()}
            <div className="absolute bottom-4 left-4 bg-white rounded-full px-3 py-1 text-sm font-medium text-gray-800">
              {group.category}
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">{group.name}</h1>
              
              <div className="flex space-x-3">
                {isJoined ? (
                  <>
                    <Link 
                      href={`/dashboard/chat?group=${group.id}`} 
                      className="btn-primary"
                    >
                      Chatear con el grupo
                    </Link>
                    <button 
                      onClick={handleLeaveGroup}
                      className="btn-secondary"
                    >
                      Abandonar grupo
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleJoinGroup}
                    className="btn-primary"
                  >
                    Unirse al grupo
                  </button>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{group.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {group.members} miembros
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {group.posts} publicaciones
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Creado el {group.createdAt}
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'about'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Acerca del grupo
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'members'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Miembros ({group.members})
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Publicaciones ({group.posts})
            </button>
          </div>
        </div>

        {/* Contenido según pestaña activa */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'about' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre este grupo</h2>
              <p className="text-gray-600 mb-6">{group.longDescription}</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Reglas del grupo</h3>
              <ul className="list-disc pl-5 mb-6 text-gray-600 space-y-2">
                <li>Sé respetuoso con todos los miembros.</li>
                <li>No se permite el acoso o la discriminación de ningún tipo.</li>
                <li>Mantén las conversaciones centradas en el tema del grupo.</li>
                <li>No compartas información personal sensible.</li>
                <li>Si necesitas ayuda inmediata, busca asistencia profesional.</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Recursos</h3>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Enlaces útiles</h4>
                <ul className="list-disc pl-5 text-blue-700 space-y-1">
                  <li><a href="#" className="hover:underline">Técnicas de respiración para ansiedad</a></li>
                  <li><a href="#" className="hover:underline">Guía de exposición gradual para ansiedad social</a></li>
                  <li><a href="#" className="hover:underline">Directorio de terapeutas especializados</a></li>
                  <li><a href="#" className="hover:underline">Libros recomendados sobre ansiedad social</a></li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Miembros del grupo</h2>
                {isJoined && (
                  <div className="text-sm text-gray-500">
                    Te uniste el 23 de abril de 2023
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold mr-3">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">{member.name}</h3>
                          {member.role === 'admin' && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">Admin</span>
                          )}
                          {member.role === 'moderator' && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Moderador</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">Se unió: {member.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        member.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        <span className={`h-2 w-2 rounded-full mr-1 ${
                          member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                        }`}></span>
                        {member.status === 'online' ? 'En línea' : 'Desconectado'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Publicaciones recientes</h2>
                {isJoined && (
                  <button className="btn-primary text-sm">
                    Nueva publicación
                  </button>
                )}
              </div>
              
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aún no hay publicaciones en este grupo.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start mb-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold mr-3">
                          {post.author.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center hover:text-blue-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          {post.likes} Me gusta
                        </button>
                        <button className="flex items-center hover:text-blue-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {post.comments} Comentarios
                        </button>
                        <button className="flex items-center hover:text-blue-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          Compartir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 