import { configureStore } from '@reduxjs/toolkit';
import { xtreamApi } from './api/xtreamApi';
import authReducer from './slices/authSlice';
import contentReducer from './slices/contentSlice';
import { loadState, saveState } from '../utils/localStorage';

// Reativando o carregamento do estado salvo
const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    [xtreamApi.reducerPath]: xtreamApi.reducer,
    auth: authReducer,
    content: contentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(xtreamApi.middleware),
  // Reativando o estado pre-carregado
  preloadedState: { auth: preloadedState },
});

// Reativando o salvamento automático do estado de login
store.subscribe(() => {
  saveState(store.getState().auth);
});
