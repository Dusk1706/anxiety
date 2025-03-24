'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';

interface Group {
  id: number;
  name: string;
  members: number;
  unreadCount?: number;
  lastMessage?: {
    sender: string;
    text: string;
    time: string;
  };
}

interface Message {
  id: number;
  sender: {
    id: number;
    name: string;
    isCurrentUser: boolean;
  };
  text: string;
  timestamp: string;
}

export default function Chat() {
  const searchParams = useSearchParams();
  const initialGroupId = searchParams.get('group');
  
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Cargar grupos disponibles
  useEffect(() => {
    // Simulamos la carga de grupos
    setTimeout(() => {
      const mockGroups: Group[] = [
        {
          id: 1,
          name: 'Superando la ansiedad social',
          members: 124,
          unreadCount: 3,
          lastMessage: {
            sender: 'Laura García',
            text: 'Gracias por compartir tu experiencia, me siento identificada',
            time: '10:45'
          }
        },
        {
          id: 2,
          name: 'Meditación y mindfulness',
          members: 98,
          lastMessage: {
            sender: 'Carlos Rodríguez',
            text: '¿Alguien ha probado la nueva app de meditación?',
            time: '09:30'
          }
        },
        {
          id: 3,
          name: 'Amantes del rock',
          members: 156,
          unreadCount: 12,
          lastMessage: {
            sender: 'Miguel Sánchez',
            text: 'Acabo de escuchar el nuevo álbum y me encantó',
            time: 'Ayer'
          }
        },
        {
          id: 4,
          name: 'Ansiedad y vida laboral',
          members: 87,
          lastMessage: {
            sender: 'Ana López',
            text: 'Tenemos reunión virtual mañana a las 18h',
            time: 'Ayer'
          }
        }
      ];
      
      setGroups(mockGroups);
      
      // Si hay un groupId en la URL, activar ese grupo
      if (initialGroupId) {
        const group = mockGroups.find(g => g.id === Number(initialGroupId));
        if (group) {
          setActiveGroup(group);
          loadMessages(Number(initialGroupId));
        }
      }
      
      setLoading(false);
    }, 1000);
  }, [initialGroupId]);

  // Función para cargar mensajes de un grupo
  const loadMessages = (groupId: number) => {
    // Simulamos la carga de mensajes
    setTimeout(() => {
      const mockMessages: Message[] = [
        {
          id: 1,
          sender: {
            id: 1,
            name: 'Laura García',
            isCurrentUser: false
          },
          text: 'Hola a todos! ¿Cómo están llevando la semana?',
          timestamp: '10:30'
        },
        {
          id: 2,
          sender: {
            id: 2,
            name: 'Carlos Rodríguez',
            isCurrentUser: false
          },
          text: 'Un poco estresado con el trabajo, pero intentando aplicar las técnicas de respiración que compartimos la semana pasada',
          timestamp: '10:35'
        },
        {
          id: 3,
          sender: {
            id: 3,
            name: 'Usuario Actual',
            isCurrentUser: true
          },
          text: 'Yo he tenido una semana bastante mejor. La exposición gradual me está ayudando mucho con mi ansiedad social',
          timestamp: '10:38'
        },
        {
          id: 4,
          sender: {
            id: 1,
            name: 'Laura García',
            isCurrentUser: false
          },
          text: 'Me alegra mucho escuchar eso! La constancia es clave en este proceso',
          timestamp: '10:40'
        },
        {
          id: 5,
          sender: {
            id: 4,
            name: 'Ana Martínez',
            isCurrentUser: false
          },
          text: 'Yo también he notado mejoras. Compartir experiencias aquí me está ayudando a sentirme menos sola en esto',
          timestamp: '10:42'
        },
        {
          id: 6,
          sender: {
            id: 3,
            name: 'Usuario Actual',
            isCurrentUser: true
          },
          text: 'Totalmente de acuerdo. Es reconfortante saber que otros entienden por lo que estamos pasando',
          timestamp: '10:43'
        },
        {
          id: 7,
          sender: {
            id: 1,
            name: 'Laura García',
            isCurrentUser: false
          },
          text: 'Gracias por compartir tu experiencia, me siento identificada',
          timestamp: '10:45'
        }
      ];
      
      setMessages(mockMessages);
      
      // Scroll hacia abajo para ver los mensajes más recientes
      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 500);
  };

  const handleGroupSelect = (group: Group) => {
    setActiveGroup(group);
    loadMessages(group.id);
    
    // Actualizar la URL sin recargar la página
    const url = new URL(window.location.href);
    url.searchParams.set('group', group.id.toString());
    window.history.pushState({}, '', url);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '' || !activeGroup) return;
    
    // Agregar el nuevo mensaje al chat
    const newMsg: Message = {
      id: messages.length + 1,
      sender: {
        id: 3, // Usuario actual
        name: 'Usuario Actual',
        isCurrentUser: true
      },
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Scroll hacia abajo
    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="chat" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold gradient-text mb-8">Chat y mensajes</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex h-[75vh]">
            {/* Panel lateral de grupos */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar chats..."
                    className="w-full px-3 py-2 pl-9 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Lista de grupos */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center">
                    <div className="animate-spin mx-auto h-8 w-8 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
                  </div>
                ) : (
                  <ul>
                    {groups.map(group => (
                      <li 
                        key={group.id}
                        onClick={() => handleGroupSelect(group)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${activeGroup?.id === group.id ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-gray-900">{group.name}</h3>
                          {group.lastMessage && (
                            <span className="text-xs text-gray-500">{group.lastMessage.time}</span>
                          )}
                        </div>
                        
                        {group.lastMessage && (
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600 truncate max-w-[180px]">
                              <span className="font-medium">{group.lastMessage.sender}: </span>
                              {group.lastMessage.text}
                            </p>
                            {group.unreadCount && (
                              <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {group.unreadCount}
                              </span>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            {/* Área de mensajes */}
            <div className="flex-1 flex flex-col">
              {activeGroup ? (
                <>
                  {/* Cabecera del chat */}
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <h2 className="font-bold text-lg text-gray-900">{activeGroup.name}</h2>
                      <p className="text-sm text-gray-500">{activeGroup.members} miembros</p>
                    </div>
                    <Link 
                      href={`/dashboard/groups/${activeGroup.id}`}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Ver grupo
                    </Link>
                  </div>
                  
                  {/* Mensajes */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                            message.sender.isCurrentUser 
                              ? 'bg-blue-600 text-white rounded-tr-none' 
                              : 'bg-gray-100 text-gray-800 rounded-tl-none'
                          }`}
                        >
                          {!message.sender.isCurrentUser && (
                            <p className="text-xs font-medium mb-1">
                              {message.sender.name}
                            </p>
                          )}
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 text-right ${
                            message.sender.isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messageEndRef}></div>
                  </div>
                  
                  {/* Formulario de envío de mensajes */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-100 text-blue-600">
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Tus conversaciones</h2>
                    <p className="text-gray-600 mb-6 max-w-md">
                      Selecciona un grupo de la lista para ver los mensajes y comenzar a chatear con otros miembros.
                    </p>
                    <Link href="/dashboard/groups" className="btn-primary">
                      Explorar grupos
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 