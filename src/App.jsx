import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './redux/slices/authSlice';

// Importando todas as suas páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Player from './pages/Player';
import SeriesDetail from './pages/SeriesDetail';

// ===================================================================
// || INÍCIO DA CORREÇÃO - DEFINIÇÃO DO ProtectedRoute              ||
// ===================================================================
// Este componente verifica se o usuário está autenticado.
// Se estiver, ele renderiza a página solicitada (children).
// Se não, ele redireciona para a página de login.
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
};
// ===================================================================
// || FIM DA CORREÇÃO                                               ||
// ===================================================================

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Login />} />

      {/* Rotas Protegidas */}
      <Route
        path="/home"
        element={<ProtectedRoute><Home /></ProtectedRoute>}
      />
      <Route
        path="/series/:id"
        element={<ProtectedRoute><SeriesDetail /></ProtectedRoute>}
      />
      <Route
        path="/player/:type/:id"
        element={<ProtectedRoute><Player /></ProtectedRoute>}
      />
      
      {/* Rota de fallback para qualquer outro caminho */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;