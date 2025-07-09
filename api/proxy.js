import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// O baseQuery agora aponta para nossa própria API (o proxy)
export const xtreamApi = createApi({
  reducerPath: 'xtreamApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), // Aponta para a pasta /api que criamos
  endpoints: (builder) => ({
    // A lógica de login agora passa o host do usuário como um parâmetro para o nosso proxy
    login: builder.mutation({
      query: ({ username, password, host }) => {
        const target = `${host}/player_api.php?username=${username}&password=${password}&action=get_user_info`;
        return `proxy?target=${encodeURIComponent(target)}`;
      },
    }),
    getLiveCategories: builder.query({
      query: ({ username, password, host }) => {
        const target = `${host}/player_api.php?username=${username}&password=${password}&action=get_live_categories`;
        return `proxy?target=${encodeURIComponent(target)}`;
      },
    }),
    getVodCategories: builder.query({
      query: ({ username, password, host }) => {
        const target = `${host}/player_api.php?username=${username}&password=${password}&action=get_vod_categories`;
        return `proxy?target=${encodeURIComponent(target)}`;
      },
    }),
    getLiveStreams: builder.query({
      query: ({ username, password, host, categoryId }) => {
        const target = `${host}/player_api.php?username=${username}&password=${password}&action=get_live_streams&category_id=${categoryId}`;
        return `proxy?target=${encodeURIComponent(target)}`;
      },
    }),
    getVodStreams: builder.query({
      query: ({ username, password, host, categoryId }) => {
        const target = `${host}/player_api.php?username=${username}&password=${password}&action=get_vod_streams&category_id=${categoryId}`;
        return `proxy?target=${encodeURIComponent(target)}`;
      },
    }),
    getSeriesInfo: builder.query({
      query: ({ username, password, host, seriesId }) => {
        const target = `${host}/player_api.php?username=${username}&password=${password}&action=get_series_info&series_id=${seriesId}`;
        return `proxy?target=${encodeURIComponent(target)}`;
      },
    }),
    // Endpoint para séries não precisa de proxy, pois já funciona
  }),
});

// Exporta os hooks gerados automaticamente
export const {
  useLoginMutation,
  useGetLiveCategoriesQuery,
  useGetVodCategoriesQuery,
  useGetSeriesInfoQuery,
  useGetLiveStreamsQuery,
  useGetVodStreamsQuery,
} = xtreamApi;