import React, { useState, useEffect } from 'react';
import { useLoginMutation } from '../../redux/api/xtreamApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [host, setHost] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [login, { isLoading, isSuccess, data, isError }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!host || !username || !password) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    
    // Garante que o host tenha o protocolo http://
    const formattedHost = host.startsWith('http://') || host.startsWith('https://') 
      ? host 
      : `http://${host}`;

    await login({ username, password, host: formattedHost });
  };

  useEffect(() => {
    if (isSuccess && data) {
      if (data.user_info.auth === 1) {
        const formattedHost = host.startsWith('http://') || host.startsWith('https://') ? host : `http://${host}`;
        dispatch(setCredentials({ data, credentials: { username, password, host: formattedHost } }));
        navigate('/home');
      } else {
        setError('Login ou senha inválidos. Verifique suas credenciais.');
      }
    }
    if (isError) {
      setError('Não foi possível conectar ao servidor. Verifique o host e a porta.');
    }
  }, [isSuccess, isError, data, dispatch, navigate, username, password, host]);

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-dark-secondary rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-white">Bem-vindo</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="host" className="text-sm font-medium text-text-secondary">Servidor (Host:Porta)</label>
          <input
            id="host"
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
            placeholder="ex: myhost.com:8080"
            required
          />
        </div>
        <div>
          <label htmlFor="username" className="text-sm font-medium text-text-secondary">Usuário</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-text-secondary">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
            required
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 text-lg font-semibold text-white bg-brand-accent rounded-md hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-500"
          >
            {isLoading ? 'Conectando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;