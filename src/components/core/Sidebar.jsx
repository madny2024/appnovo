import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiTv, FiFilm, FiPlayCircle } from 'react-icons/fi';
import { setContentType, setSelectedCategory } from '../../redux/slices/contentSlice';
import { useGetLiveCategoriesQuery, useGetVodCategoriesQuery, useGetSeriesCategoriesQuery } from '../../redux/api/xtreamApi';
import { selectAuthCredentials } from '../../redux/slices/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const credentials = useSelector(selectAuthCredentials);
  const { contentType, selectedCategory } = useSelector((state) => state.content);

  const { data: liveCategories, isLoading: liveLoading } = useGetLiveCategoriesQuery(credentials, { skip: !credentials });
  const { data: vodCategories, isLoading: vodLoading } = useGetVodCategoriesQuery(credentials, { skip: !credentials });
  const { data: seriesCategories, isLoading: seriesLoading } = useGetSeriesCategoriesQuery(credentials, { skip: !credentials });

  const getCategoriesForType = () => {
    switch (contentType) {
      case 'live': return liveCategories;
      case 'movie': return vodCategories;
      case 'series': return seriesCategories;
      default: return [];
    }
  };
  
  const isLoading = liveLoading || vodLoading || seriesLoading;
  const categories = getCategoriesForType() || [];

  return (
    <aside className="bg-dark-secondary w-64 h-full flex flex-col fixed top-0 left-0 pt-16">
      {/* Menu Principal */}
      <nav className="p-4 border-b border-gray-700">
        <ul>
          <li onClick={() => dispatch(setContentType('live'))} className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${contentType === 'live' ? 'bg-brand-accent text-white' : 'hover:bg-gray-700'}`}>
            <FiTv /> <span>TV ao Vivo</span>
          </li>
          <li onClick={() => dispatch(setContentType('movie'))} className={`flex items-center space-x-3 p-2 mt-2 rounded-md cursor-pointer ${contentType === 'movie' ? 'bg-brand-accent text-white' : 'hover:bg-gray-700'}`}>
            <FiFilm /> <span>Filmes</span>
          </li>
          <li onClick={() => dispatch(setContentType('series'))} className={`flex items-center space-x-3 p-2 mt-2 rounded-md cursor-pointer ${contentType === 'series' ? 'bg-brand-accent text-white' : 'hover:bg-gray-700'}`}>
            <FiPlayCircle /> <span>Séries</span>
          </li>
        </ul>
      </nav>

      {/* Lista de Categorias */}
      <div className="flex-grow overflow-y-auto p-4">
        <h3 className="text-text-secondary font-semibold mb-2">Categorias</h3>
        {isLoading ? (
          <p className="text-text-secondary">Carregando...</p>
        ) : (
          <ul>
            {categories.map((cat) => (
              <li 
                key={cat.category_id}
                onClick={() => dispatch(setSelectedCategory(cat))}
                className={`p-2 rounded-md cursor-pointer text-sm truncate ${selectedCategory?.category_id === cat.category_id ? 'bg-gray-600 font-semibold' : 'hover:bg-gray-700'}`}
              >
                {cat.category_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;