import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useFavorites } from '../context/FavoritesContext';
import { Spinner } from '../components/Spinner';
import type { MealsResponse } from '../types';


export const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const { data, loading, error } = useFetch<MealsResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  );

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const meal = data?.meals?.[0];

  const toggleFavorite = () => {
    if (!meal?.idMeal) return;

    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal.idMeal);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;
  if (!meal) return <p className="text-center py-4">Recipe not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold">{meal.strMeal}</h1>
        <button
          onClick={toggleFavorite}
          className={`p-2 rounded-full text-xl ${
            isFavorite(meal.idMeal)
              ? 'bg-red-500 text-white'
              : 'bg-gray-300 text-gray-800'
          }`}
          aria-label="Toggle Favorite"
        >
          {isFavorite(meal.idMeal) ? '♥' : '♡'}
        </button>
      </div>

      {meal.strMealThumb && (
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      {meal.strInstructions && (
        <>
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {meal.strInstructions}
          </p>
        </>
      )}
    </div>
  );
};
