import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFavorites } from '../context/useFavorites';
import type { Meal } from '../types';

export const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const [meal, setMeal] = useState<Meal | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!recipeId) return;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then(res => res.json())
      .then(data => setMeal(data.meals?.[0] || null));
  }, [recipeId]);

const toggleFavorite = () => {
  if (!meal?.idMeal) return;
  if (isFavorite(meal.idMeal)) {
    removeFavorite(meal.idMeal);
  } else {
    addFavorite(meal.idMeal);
  }
};

  if (!meal) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full max-w-md my-4" />
      <button
        onClick={toggleFavorite}
        className={`px-4 py-2 rounded ${
          isFavorite(meal.idMeal) ? 'bg-red-500 text-white' : 'bg-gray-300'
        }`}
      >
        {isFavorite(meal.idMeal) ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      {meal.strInstructions && (
        <p className="mt-4 whitespace-pre-wrap">{meal.strInstructions}</p>
      )}
    </div>
  );
};
