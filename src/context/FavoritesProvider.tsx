import { useLocalStorage } from '../hooks/useLocalStorage';
import { FavoritesContext } from './FavoritesContext';
import type { FavoritesContextType } from '../types';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const addFavorite = (id: string): void => {
    setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFavorite = (id: string): void => {
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  };

  const isFavorite = (id: string): boolean => favorites.includes(id);

  const contextValue: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
