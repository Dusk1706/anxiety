import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold gradient-text">Mi Aplicación</h1>
        <p className="text-lg text-center">Bienvenido a mi aplicación en Next.js</p>
        
        <div className="flex gap-4 mt-6">
          <Link 
            href="/login" 
            className="btn-primary"
          >
            Iniciar sesión
          </Link>
          <Link 
            href="/register" 
            className="btn-secondary"
          >
            Registrarse
          </Link>
        </div>
      </main>
    </div>
  );
}
