import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavoritesContextType = {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {
    throw new Error('addFavorite must be used within FavoritesProvider');
  },
  removeFavorite: () => {
    throw new Error('removeFavorite must be used within FavoritesProvider');
  },
  isFavorite: () => {
    throw new Error('isFavorite must be used within FavoritesProvider');
  },
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const addFavorite = (id: string) => {
    setFavorites(prev => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav !== id));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
