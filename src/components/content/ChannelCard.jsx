import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChannelCard = ({ channel }) => {
  const navigate = useNavigate();
  const defaultIcon = "https://via.placeholder.com/150/121212/FFFFFF?text=TV";

  const handleClick = () => {
    navigate(`/player/live/${channel.stream_id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-dark-secondary rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 group"
    >
      <img 
        src={channel.stream_icon || defaultIcon} 
        alt={channel.name} 
        className="w-full h-32 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = defaultIcon; }}
      />
      <div className="p-3">
        <h3 className="text-text-primary text-sm truncate group-hover:text-brand-accent transition-colors duration-300">{channel.name}</h3>
      </div>
    </div>
  );
};

export default ChannelCard; // <-- ESTA É A LINHA CRUCIAL!