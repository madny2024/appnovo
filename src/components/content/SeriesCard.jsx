import React from 'react';
import { useNavigate } from 'react-router-dom';

const SeriesCard = ({ series }) => {
  const navigate = useNavigate();
  const defaultIcon = "https://via.placeholder.com/200x300/121212/FFFFFF?text=Série";
  
  // ATUALIZE O HANDLECLICK PARA NAVEGAR
  const handleClick = () => {
    navigate(`/series/${series.series_id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-dark-secondary rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 group"
    >
      <img 
        src={series.cover || defaultIcon} 
        alt={series.name} 
        className="w-full h-56 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = defaultIcon; }}
      />
      <div className="p-3">
        <h3 className="text-text-primary text-sm truncate group-hover:text-brand-accent transition-colors duration-300">{series.name}</h3>
      </div>
    </div>
  );
};

export default SeriesCard;