import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// O baseQuery aponta para nossa própria API (o proxy na Vercel)
export const xtreamApi = createApi({
  reducerPath: 'xtreamApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
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
    getSeriesCategories: builder.query({
        query: ({ username, password, host }) => {
          const target = `${host}/player_api.php?username=${username}&password=${password}&action=get_series_categories`;
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
  }),
});

export const {
  useLoginMutation,
  useGetLiveCategoriesQuery,
  useGetVodCategoriesQuery,
  useGetSeriesCategoriesQuery,
  useGetLiveStreamsQuery,
  useGetVodStreamsQuery,
  useGetSeriesInfoQuery,
} = xtreamApi;
