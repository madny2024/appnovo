import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/slices/authSlice';
import { FiLogOut } from 'react-icons/fi';
import Logo from '/logo.svg';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <header className="bg-dark-secondary h-16 flex items-center justify-between px-6 sticky top-0 z-20">
      <div>
         <img src={Logo} alt="Logo" className="h-8" />
      </div>
      <button 
        onClick={handleLogout}
        className="flex items-center space-x-2 text-text-secondary hover:text-brand-accent transition-colors duration-300"
      >
        <FiLogOut size={22} />
        <span className="hidden sm:block">Sair</span>
      </button>
    </header>
  );
};

export default Header;