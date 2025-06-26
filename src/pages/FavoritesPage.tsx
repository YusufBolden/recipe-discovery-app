import { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { RecipeCard } from '../components/RecipeCard';
import type { Meal } from "../types/index";

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const requests = favorites.map(id =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(res => res.json())
        );
        const responses = await Promise.all(requests);
        const flattened = responses.map(r => r.meals?.[0]).filter(Boolean);
        setMeals(flattened);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load favorites.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavorites();
    } else {
      setMeals([]);
    }
  }, [favorites]);

  if (loading) return <p className="text-center py-4">Loading favorites...</p>;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;
  if (favorites.length === 0) return <p className="text-center py-4">You have no favorites yet.</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {meals.map(meal => (
        <RecipeCard
          key={meal.idMeal}
          id={meal.idMeal}
          name={meal.strMeal}
          image={meal.strMealThumb}
        />
      ))}
    </div>
  );
};
