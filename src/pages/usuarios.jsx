import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Adicionei um pequeno delay artificial para você poder ver o loading na apresentação
        await new Promise(resolve => setTimeout(resolve, 800)); 
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Falha ao comunicar com o servidor.');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  // Estado de Loading Bonito (Skeleton Screen simples)
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10">
         <h2 className="text-3xl font-bold text-gray-800 mb-8 animate-pulse">Carregando...</h2>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm h-32 animate-pulse bg-gray-200"></div>
            ))}
         </div>
      </div>
    )
  }

  // Estado de Erro Bonito
  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md border-t-4 border-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Ops! Algo deu errado.</h3>
          <p className="text-gray-600 mb-6">{erro}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Lista de Usuários em Cards
  return (
    <div className="max-w-5xl mx-auto p-6 mt-6 mb-10">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Usuários do Sistema</h2>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition bg-white border border-gray-300 px-4 py-2 rounded-md hover:border-red-400 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sair
        </button>
      </header>
      
      {/* Grid de Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {usuarios.map(user => (
          <div key={user.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 flex items-start gap-4">
            {/* Avatar Circular (Placeholder com iniciais) */}
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-lg text-gray-900 truncate">{user.name}</h3>
              <p className="text-gray-500 flex items-center gap-2 mt-1 text-sm truncate">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {user.email}
              </p>
              <p className="text-gray-400 flex items-center gap-2 mt-2 text-xs uppercase font-semibold tracking-wider">
                 {user.company.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}