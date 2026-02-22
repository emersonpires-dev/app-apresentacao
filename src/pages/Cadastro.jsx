import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();
    if (!nome || !email.includes('@') || senha.length < 6) {
      return setErro('Preencha todos os campos corretamente (senha mín. 6 caracteres).');
    }
    // Em um app real, aqui você chamaria a API de cadastro
    alert('Cadastro realizado com sucesso! Faça login.');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crie sua conta</h2>
        
        <form onSubmit={handleCadastro} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: João Silva" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="seu@email.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Mínimo 6 caracteres" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
            />
          </div>
          
          {erro && <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">{erro}</div>}
          
          <button 
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 font-medium"
          >
            Criar Conta
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem conta? <Link to="/" className="text-blue-600 hover:underline">Faça Login</Link>
        </p>
      </div>
    </div>
  );
}