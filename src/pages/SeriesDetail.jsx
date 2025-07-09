import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetSeriesInfoQuery } from '../redux/api/xtreamApi';
import { selectAuthCredentials } from '../redux/slices/authSlice';
import Spinner from '../components/core/Spinner';
import { FiArrowLeft, FiPlay } from 'react-icons/fi';

const SeriesDetail = () => {
  const { id: seriesId } = useParams();
  const navigate = useNavigate();
  const credentials = useSelector(selectAuthCredentials);
  
  const { data, isLoading, isError } = useGetSeriesInfoQuery(
    { ...credentials, seriesId },
    { skip: !credentials }
  );

  if (isLoading) {
    return <div className="bg-dark-primary min-h-screen flex items-center justify-center"><Spinner /></div>;
  }

  if (isError || !data) {
    return <div className="text-center text-red-500 mt-10">Erro ao carregar detalhes da série.</div>;
  }

  const { info, episodes } = data;
  // Agrupa episódios por temporada
  const seasons = Object.values(episodes);

  return (
    <div className="bg-dark-primary min-h-screen text-text-primary">
      <div 
        className="w-full h-96 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${info.cover})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark-primary to-transparent"></div>
        <Link to="/home" className="absolute top-5 left-5 text-white z-10 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all">
          <FiArrowLeft size={24} />
        </Link>
      </div>

      <div className="p-8 -mt-24 relative z-10">
        <h1 className="text-4xl font-bold mb-2">{info.name}</h1>
        <div className="flex items-center space-x-4 text-text-secondary mb-4">
          <span>{info.releaseDate}</span>
          <span>&bull;</span>
          <span>{info.genre}</span>
        </div>
        <p className="max-w-3xl mb-8">{info.plot}</p>
        
        {seasons.map((season, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-l-4 border-brand-accent pl-3">
              Temporada {season[0].season}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {season.map(ep => (
                <div 
                  key={ep.id}
                  onClick={() => navigate(`/player/series/${ep.id}.${ep.container_extension}`)}
                  className="bg-dark-secondary p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-brand-accent font-bold">{ep.episode_num}</span>
                    <h3 className="truncate">{ep.title}</h3>
                  </div>
                  <FiPlay className="text-text-secondary group-hover:text-white transition-all" size={20} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesDetail;