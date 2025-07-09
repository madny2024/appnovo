import { configureStore } from '@reduxjs/toolkit';
import { xtreamApi } from './api/xtreamApi';
import authReducer from './slices/authSlice';
import contentReducer from './slices/contentSlice';
import { loadState, saveState } from '../utils/localStorage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    [xtreamApi.reducerPath]: xtreamApi.reducer,
    auth: authReducer,
    content: contentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(xtreamApi.middleware),
  preloadedState: { auth: preloadedState },
});

// Salva o estado de autenticação no localStorage sempre que ele mudar
store.subscribe(() => {
  saveState(store.getState().auth);
});