import { useContext } from 'react';
import type { FavoritesContextType } from '../types/index';
import { FavoritesContext } from './FavoritesContext';

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
