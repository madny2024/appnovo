import React from 'react';
import ChannelCard from './ChannelCard';
import MovieCard from './MovieCard';
import SeriesCard from './SeriesCard';
import Spinner from '../core/Spinner';

const ContentGrid = ({ items, type, isLoading }) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (!items || items.length === 0) {
    return <div className="text-center text-text-secondary mt-10">Nenhum item encontrado.</div>;
  }
  
  const renderCard = (item) => {
    switch (type) {
      case 'live':
        return <ChannelCard key={item.stream_id} channel={item} />;
      case 'movie':
        return <MovieCard key={item.stream_id} movie={item} />;
      case 'series':
        return <SeriesCard key={item.series_id} series={item} />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 p-4">
      {items.map(renderCard)}
    </div>
  );
};

export default ContentGrid;