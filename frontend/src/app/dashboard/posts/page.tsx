'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import { useAuth } from '@/app/providers/AuthProvider';
import { postsService } from '@/services/posts.service';

interface Category {
  id: string;
  name: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  date: string;
  likes: number;
  comments: number;
  category: string;
  tags: string[];
  isLiked?: boolean;
  isSaved?: boolean;
  image?: string;
}

export default function Posts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  const categories = [
    { id: 'all', name: 'Todo' },
    { id: 'superacion', name: 'Superación' },
    { id: 'tecnicas', name: 'Técnicas' },
    { id: 'consejos', name: 'Consejos' },
    { id: 'testimonios', name: 'Testimonios' },
    { id: 'logros', name: 'Logros' },
    { id: 'motivacion', name: 'Motivación' }
  ];

  // Cargar posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await postsService.getAll();
        setPosts(posts);
        setFilteredPosts(posts);
        setLoading(false);
      } catch (error) {
        console.error('Error loading posts:', error);
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Filtrar posts
  useEffect(() => {
    let result = [...posts];
    
    // Filtrar por categoría
    if (activeCategory !== 'all') {
      result = result.filter(post => post.category === activeCategory);
    }
    
    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.content.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredPosts(result);
  }, [activeCategory, searchTerm, posts]);

  const handleLike = (postId: number) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const isLiked = post.isLiked || false;
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !isLiked
        };
      }
      return post;
    }));
  };

  const handleSave = (postId: number) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isSaved: !post.isSaved
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.category) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }
    
    // Crear nuevo post
    const newPostObj: Post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: {
        id: 99, // Usuario actual
        name: user?.name || 'Usuario actual'
      },
      date: 'Justo ahora',
      likes: 0,
      comments: 0,
      category: newPost.category,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };
    
    // Actualizar lista de posts
    setPosts([newPostObj, ...posts]);
    
    // Resetear formulario
    setNewPost({
      title: '',
      content: '',
      category: '',
      tags: ''
    });
    
    // Ocultar formulario
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="posts" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Experiencias y Aprendizajes</h1>
            <p className="text-gray-600">Comparte tus historias de superación y aprende de otros</p>
          </div>
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)} 
            className="btn-primary mt-4 md:mt-0 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {showCreateForm ? 'Cancelar' : 'Compartir mi experiencia'}
          </button>
        </div>

        {/* Formulario para crear un nuevo post */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Comparte tu experiencia</h2>
            <form onSubmit={handleCreatePost}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input
                  id="title"
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Cómo superé mi miedo a..."
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Contenido *
                </label>
                <textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Comparte tu experiencia, técnicas que te han funcionado, consejos..."
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría *
                </label>
                <select
                  id="category"
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Etiquetas (separadas por comas)
                </label>
                <input
                  id="tags"
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: ansiedad, superación, técnicas..."
                />
              </div>
              
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Publicar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtros y búsqueda */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar experiencias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
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

        {/* Lista de posts */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No se encontraron experiencias</h3>
            <p className="mt-1 text-gray-500">Intenta cambiar los filtros o busca algo diferente.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{post.author.name}</p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                  
                  <p className="text-gray-600 mb-4 whitespace-pre-line">
                    {post.content.length > 300 
                      ? `${post.content.substring(0, 300)}...` 
                      : post.content
                    }
                    {post.content.length > 300 && (
                      <Link href={`/dashboard/posts/${post.id}`} className="text-blue-600 ml-1 hover:underline">
                        Leer más
                      </Link>
                    )}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {categories.find(cat => cat.id === post.category)?.name}
                    </span>
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                        +{post.tags.length - 3} más
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-1 text-sm ${
                          post.isLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                        }`}
                      >
                        <svg className="h-5 w-5" fill={post.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={post.isLiked ? 0 : 2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span>{post.likes}</span>
                      </button>
                      
                      <Link 
                        href={`/dashboard/posts/${post.id}#comments`}
                        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{post.comments}</span>
                      </Link>
                    </div>
                    
                    <button 
                      onClick={() => handleSave(post.id)}
                      className={`flex items-center text-sm ${
                        post.isSaved ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                      }`}
                    >
                      <svg className="h-5 w-5" fill={post.isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={post.isSaved ? 0 : 2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <span className="ml-1">{post.isSaved ? 'Guardado' : 'Guardar'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Paginación básica */}
            <div className="flex justify-center mt-8 space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Anterior
              </button>
              <button className="px-4 py-2 border border-gray-300 bg-gray-50 rounded-md text-sm font-medium text-gray-700">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Siguiente
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 