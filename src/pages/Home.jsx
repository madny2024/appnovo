import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/core/Sidebar';
import Header from '../components/core/Header';
import ContentGrid from '../components/content/ContentGrid';
import { useGetLiveStreamsQuery, useGetVodStreamsQuery, useGetSeriesInfoQuery } from '../redux/api/xtreamApi';
import { selectAuthCredentials } from '../redux/slices/authSlice';
import Spinner from '../components/core/Spinner';

const Home = () => {
  const credentials = useSelector(selectAuthCredentials);
  const { contentType, selectedCategory } = useSelector((state) => state.content);

  const categoryId = selectedCategory?.category_id || (contentType === 'live' ? '1' : null); // Default para alguma categoria se nenhuma for selecionada

  const { data: liveStreams, isLoading: liveLoading } = useGetLiveStreamsQuery(
    { ...credentials, categoryId }, 
    { skip: !credentials || !categoryId || contentType !== 'live' }
  );

  const { data: vodStreams, isLoading: vodLoading } = useGetVodStreamsQuery(
    { ...credentials, categoryId },
    { skip: !credentials || !categoryId || contentType !== 'movie' }
  );
  
   // A busca por séries é diferente; você obteria uma lista de séries e então os detalhes.
   // Para este exemplo, vamos simplificar e usar a mesma lógica de categoria.
  const { data: series, isLoading: seriesLoading } = useGetVodStreamsQuery(
    { ...credentials, categoryId }, // Reutilizando VOD streams para simplicidade
    { skip: !credentials || !categoryId || contentType !== 'series' }
  );

  const isLoading = liveLoading || vodLoading || seriesLoading;
  
  const getItems = () => {
    switch (contentType) {
      case 'live': return liveStreams;
      case 'movie': return vodStreams;
      case 'series': return series; // No mundo real, seria uma lista de séries da API
      default: return [];
    }
  };

  return (
    <div className="bg-dark-primary min-h-screen">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Header />
          <div className="p-4">
            {selectedCategory ? (
              <h2 className="text-2xl font-bold text-white mb-4">{selectedCategory.category_name}</h2>
            ) : (
              <div className="text-center text-text-secondary mt-10">
                <p>Selecione um tipo de conteúdo e uma categoria no menu lateral para começar.</p>
              </div>
            )}
            {selectedCategory && <ContentGrid items={getItems()} type={contentType} isLoading={isLoading} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;