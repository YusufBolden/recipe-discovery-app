import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { RecipeCard } from '../components/RecipeCard';
import type { MealsResponse } from '../types';


export const CategoryPage = () => {
  const { categoryName } = useParams();
  const { data, loading, error } = useFetch<MealsResponse>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.meals.map(meal => (
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
