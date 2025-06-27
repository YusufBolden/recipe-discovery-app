import { useState, useEffect, type ReactNode } from 'react';
import { FavoritesContext } from './FavoritesContext';

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const add = (id: string) => {
    setFavorites(prev => (prev.includes(id) ? prev : [...prev, id]));
  };

  const remove = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav !== id));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, add, remove, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
