import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const defaultIcon = "https://via.placeholder.com/200x300/121212/FFFFFF?text=Filme";

  const handleClick = () => {
    // A API Xtream passa a extensão no stream_id para filmes.
    const streamId = `${movie.stream_id}.${movie.container_extension}`;
    navigate(`/player/movie/${streamId}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-dark-secondary rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 group"
    >
      <img 
        src={movie.stream_icon || defaultIcon} 
        alt={movie.name} 
        className="w-full h-56 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = defaultIcon; }}
      />
      <div className="p-3">
        <h3 className="text-text-primary text-sm truncate group-hover:text-brand-accent transition-colors duration-300">{movie.name}</h3>
      </div>
    </div>
  );
};

export default MovieCard;