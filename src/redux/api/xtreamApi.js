import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const xtreamApi = createApi({
  reducerPath: 'xtreamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/', // A baseUrl será construída dinamicamente em cada query
  }),
  endpoints: (builder) => ({
    // Endpoint de Login
    login: builder.mutation({
      query: ({ username, password, host }) => 
        `${host}/player_api.php?username=${username}&password=${password}&action=get_user_info`,
    }),
    // Endpoints de Categorias
    getLiveCategories: builder.query({
      query: ({ username, password, host }) => 
        `${host}/player_api.php?username=${username}&password=${password}&action=get_live_categories`,
    }),
    getVodCategories: builder.query({
      query: ({ username, password, host }) => 
        `${host}/player_api.php?username=${username}&password=${password}&action=get_vod_categories`,
    }),
    getSeriesCategories: builder.query({
      query: ({ username, password, host }) => 
        `${host}/player_api.php?username=${username}&password=${password}&action=get_series_categories`,
    }),
    // Endpoints de Conteúdo por Categoria
    getLiveStreams: builder.query({
      query: ({ username, password, host, categoryId }) => 
        `${host}/player_api.php?username=${username}&password=${password}&action=get_live_streams&category_id=${categoryId}`,
    }),
    getVodStreams: builder.query({
      query: ({ username, password, host, categoryId }) => 
        `${host}/player_api.php?username=${username}&password=${password}&action=get_vod_streams&category_id=${categoryId}`,
    }),
    getSeriesInfo: builder.query({
       query: ({ username, password, host, seriesId }) =>
        `${host}/player_api.php?username=${username}&password=${password}&action=get_series_info&series_id=${seriesId}`,
    }),
  }),
});

// Exporta os hooks gerados automaticamente
export const {
  useLoginMutation,
  useGetLiveCategoriesQuery,
  useGetVodCategoriesQuery,
  useGetSeriesCategoriesQuery,
  useGetLiveStreamsQuery,
  useGetVodStreamsQuery,
  useGetSeriesInfoQuery,
} = xtreamApi;