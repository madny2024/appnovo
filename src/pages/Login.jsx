import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import Logo from '/logo.svg';

const Login = () => {
  return (
    <div className="min-h-screen bg-dark-primary flex flex-col items-center justify-center p-4">
       <img src={Logo} alt="Logo" className="h-12 mb-8" />
      <LoginForm />
    </div>
  );
};

export default Login;