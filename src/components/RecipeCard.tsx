import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import type { RecipeCardProps } from '../types';


export const RecipeCard = ({ id, name, image }: RecipeCardProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const toggleFavorite = () => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return (
    <div className="relative rounded shadow bg-white hover:shadow-lg transition overflow-hidden">
      <Link to={`/recipe/${id}`}>
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-bold">{name}</h3>
        </div>
      </Link>
      <button
        onClick={toggleFavorite}
        className={`absolute top-2 right-2 p-2 rounded-full ${
          isFavorite(id) ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'
        }`}
        aria-label="Toggle Favorite"
      >
        {isFavorite(id) ? '♥' : '♡'}
      </button>
    </div>
  );
};
