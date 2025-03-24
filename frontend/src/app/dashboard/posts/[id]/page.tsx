'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header';

interface Comment {
  id: number;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  content: string;
  date: string;
  likes: number;
  isLiked?: boolean;
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
  comments: Comment[];
  category: string;
  tags: string[];
  isLiked?: boolean;
  isSaved?: boolean;
}

export default function PostDetail() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [relatedPosts, setRelatedPosts] = useState<Array<{id: number, title: string, category: string}>>([]);

  // Cargar detalles del post
  useEffect(() => {
    // Simulamos la carga del post
    setTimeout(() => {
      // Post de ejemplo
      const mockPost: Post = {
        id: Number(postId),
        title: 'Cómo superé mi miedo a hablar en público',
        content: `Durante años, el solo pensar en hablar frente a un grupo me producía ataques de pánico. Mi corazón se aceleraba, mis manos sudaban y mi mente se quedaba en blanco. Probé muchas técnicas, pero lo que realmente me ayudó fue la exposición gradual.

Comencé hablando frente a un amigo, luego en grupos pequeños, y finalmente pude dar una presentación en mi trabajo. La clave fue no evitar la situación, sino enfrentarla poco a poco, desafiando esos pensamientos negativos automáticos que me decían que fracasaría.

Una técnica que me ayudó mucho fue la visualización. Antes de cada exposición, me tomaba 5 minutos para visualizarme a mí mismo hablando con confianza, respondiendo preguntas con calma y conectando con mi audiencia. Esta práctica entrena al cerebro para sentirse más cómodo en la situación real.

También aprendí a cambiar mi enfoque: en lugar de preocuparme por lo que los demás pensarían de mí, me concentré en el valor que podía aportar con mi mensaje. Cuando nos enfocamos en ayudar a otros en lugar de en nuestros propios miedos, la ansiedad pierde gran parte de su poder.

Hoy puedo decir que, aunque aún siento nervios antes de hablar en público (algo completamente normal), ya no me paralizan. He dado charlas ante cientos de personas y, lo más importante, he podido compartir información valiosa que ha ayudado a otros.

Si estás luchando con este miedo, quiero que sepas que puedes superarlo. No sucederá de la noche a la mañana, pero con práctica constante y las herramientas adecuadas, podrás conquistarlo. ¡Tú puedes!`,
        author: {
          id: 1,
          name: 'Laura García'
        },
        date: '15 de mayo de 2023',
        likes: 42,
        category: 'superacion',
        tags: ['miedo', 'hablar en público', 'exposición', 'técnicas'],
        isLiked: false,
        isSaved: false,
        comments: [
          {
            id: 1,
            author: {
              id: 2,
              name: 'Carlos Rodríguez'
            },
            content: 'Gracias por compartir tu experiencia, Laura. Me identifico mucho con lo que cuentas. Estoy empezando a aplicar la exposición gradual y, aunque es difícil, noto pequeñas mejoras. Tu historia me da esperanza.',
            date: 'Hace 1 día',
            likes: 8,
            isLiked: true
          },
          {
            id: 2,
            author: {
              id: 3,
              name: 'Ana Martínez'
            },
            content: 'La visualización es una técnica muy poderosa, ¡a mí también me ha ayudado mucho! Añadiría que grabar tus presentaciones y escucharlas después también puede ser útil para identificar áreas de mejora.',
            date: 'Hace 2 días',
            likes: 5
          },
          {
            id: 3,
            author: {
              id: 4,
              name: 'Miguel Sánchez'
            },
            content: '¿Alguna recomendación de libros o recursos sobre este tema? Estoy tratando de ayudar a mi hijo adolescente que tiene mucho miedo de hablar en clase.',
            date: 'Hace 3 días',
            likes: 2
          }
        ]
      };
      
      // Posts relacionados
      const mockRelatedPosts = [
        { id: 2, title: '5 técnicas de respiración que cambiaron mi vida con ansiedad', category: 'tecnicas' },
        { id: 3, title: 'Mi viaje para superar la agorafobia: de no poder salir de casa a viajar solo', category: 'superacion' },
        { id: 5, title: 'Cómo la meditación cambió mi relación con la ansiedad generalizada', category: 'tecnicas' }
      ];
      
      setPost(mockPost);
      setRelatedPosts(mockRelatedPosts);
      setLoading(false);
    }, 1000);
  }, [postId]);

  const handleLikePost = () => {
    if (!post) return;
    
    setPost({
      ...post,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
      isLiked: !post.isLiked
    });
  };

  const handleSavePost = () => {
    if (!post) return;
    
    setPost({
      ...post,
      isSaved: !post.isSaved
    });
  };

  const handleLikeComment = (commentId: number) => {
    if (!post) return;
    
    const updatedComments = post.comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    });
    
    setPost({
      ...post,
      comments: updatedComments
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!post || !newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: post.comments.length + 1,
      author: {
        id: 99, // Usuario actual
        name: 'Usuario Actual'
      },
      content: newComment,
      date: 'Justo ahora',
      likes: 0
    };
    
    setPost({
      ...post,
      comments: [newCommentObj, ...post.comments]
    });
    
    setNewComment('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header activePage="posts" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header activePage="posts" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Experiencia no encontrada</h2>
            <p className="text-gray-600 mb-6">La experiencia que buscas no existe o ha sido eliminada.</p>
            <Link href="/dashboard/posts" className="btn-primary">
              Volver a experiencias
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="posts" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navegación */}
        <div className="mb-6">
          <Link href="/dashboard/posts" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a experiencias
          </Link>
        </div>

        {/* Artículo principal */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold mr-4">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>
            
            <div className="prose max-w-none mb-8">
              {post.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4 text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {post.category === 'superacion' ? 'Superación' : 
                 post.category === 'tecnicas' ? 'Técnicas' : 
                 post.category === 'motivacion' ? 'Motivación' : 
                 post.category === 'testimonios' ? 'Testimonios' : 
                 post.category === 'consejos' ? 'Consejos' : 
                 post.category === 'logros' ? 'Logros' : post.category}
              </span>
              {post.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex space-x-4">
                <button 
                  onClick={handleLikePost}
                  className={`flex items-center space-x-2 text-sm ${
                    post.isLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  <svg className="h-5 w-5" fill={post.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={post.isLiked ? 0 : 2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>{post.likes} Me gusta</span>
                </button>
                
                <a 
                  href="#comments"
                  className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{post.comments.length} Comentarios</span>
                </a>
              </div>
              
              <button 
                onClick={handleSavePost}
                className={`flex items-center text-sm ${
                  post.isSaved ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                <svg className="h-5 w-5 mr-1" fill={post.isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={post.isSaved ? 0 : 2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>{post.isSaved ? 'Guardado' : 'Guardar'}</span>
              </button>
            </div>
          </div>
        </article>

        {/* Compartir experiencia */}
        <div className="bg-blue-50 rounded-lg p-6 my-8 border border-blue-100">
          <div className="flex items-center text-blue-700 mb-4">
            <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-lg font-semibold">¿Esta experiencia te inspiró?</h2>
          </div>
          <p className="text-blue-600 mb-4">
            Cada historia compartida puede ayudar a alguien que está pasando por lo mismo. Tus experiencias son valiosas.
          </p>
          <Link 
            href="/dashboard/posts?create=true" 
            className="btn-primary inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Compartir mi experiencia
          </Link>
        </div>

        {/* Sección de comentarios */}
        <section id="comments" className="pt-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comentarios ({post.comments.length})</h2>
          
          {/* Formulario para añadir comentario */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Añadir un comentario</h3>
            <form onSubmit={handleSubmitComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder="Comparte tus pensamientos, experiencias o preguntas..."
                required
              />
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Publicar comentario
                </button>
              </div>
            </form>
          </div>
          
          {/* Lista de comentarios */}
          <div className="space-y-6">
            {post.comments.map(comment => (
              <div key={comment.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                    {comment.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{comment.author.name}</p>
                    <p className="text-xs text-gray-500">{comment.date}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{comment.content}</p>
                
                <div className="flex items-center">
                  <button 
                    onClick={() => handleLikeComment(comment.id)}
                    className={`flex items-center space-x-1 text-sm ${
                      comment.isLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                    }`}
                  >
                    <svg className="h-5 w-5" fill={comment.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={comment.isLiked ? 0 : 2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Posts relacionados */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Experiencias relacionadas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(post => (
              <Link 
                key={post.id} 
                href={`/dashboard/posts/${post.id}`}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {post.category === 'superacion' ? 'Superación' : 
                   post.category === 'tecnicas' ? 'Técnicas' : 
                   post.category === 'motivacion' ? 'Motivación' : 
                   post.category === 'testimonios' ? 'Testimonios' : 
                   post.category === 'consejos' ? 'Consejos' : 
                   post.category === 'logros' ? 'Logros' : post.category}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 