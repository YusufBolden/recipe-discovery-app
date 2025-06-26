import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RecipeCard } from '../components/RecipeCard';
import type { Meal, SearchResponse } from '../types';


export const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') ?? '';

  const [results, setResults] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setNotFound(true);
        return;
      }

      setLoading(true);
      setError(null);
      setNotFound(false);

      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data: SearchResponse = await res.json();

        if (!data.meals || data.meals.length === 0) {
          setResults([]);
          setNotFound(true);
        } else {
          setResults(data.meals);
          setNotFound(false);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch search results.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <p className="text-center py-4">Searching...</p>;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;
  if (!query.trim()) return <p className="text-center py-4">Enter a search term.</p>;
  if (notFound) return <p className="text-center py-4">No results found for "{query}".</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search results for "{query}":</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map(meal => (
          <RecipeCard
            key={meal.idMeal}
            id={meal.idMeal}
            name={meal.strMeal}
            image={meal.strMealThumb}
          />
        ))}
      </div>
    </div>
  );
};
