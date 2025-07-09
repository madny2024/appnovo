import { configureStore } from '@reduxjs/toolkit';
import { xtreamApi } from './api/xtreamApi';
import authReducer from './slices/authSlice';
import contentReducer from './slices/contentSlice';

// A LÓGICA DE LOCALSTORAGE FOI REMOVIDA PARA ESTE TESTE

export const store = configureStore({
  reducer: {
    [xtreamApi.reducerPath]: xtreamApi.reducer,
    auth: authReducer,
    content: contentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(xtreamApi.middleware),
});
