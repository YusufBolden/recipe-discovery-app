import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import type { CategoriesResponse } from '../types';


const BLOCKED_CATEGORIES = ['Pork'];

export const HomePage = () => {
  const { data, loading, error } = useFetch<CategoriesResponse>(
    'https://www.themealdb.com/api/json/v1/1/categories.php'
  );

  const visibleCategories = data?.categories?.filter(
    category => !BLOCKED_CATEGORIES.includes(category.strCategory)
  ) || [];

  if (loading) return <p className="text-center py-4">Loading categories...</p>;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipe Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleCategories.map(category => (
          <Link
            to={`/category/${category.strCategory}`}
            key={category.idCategory}
            className="block p-4 bg-white shadow hover:shadow-md rounded text-center"
          >
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h2 className="text-xl font-semibold">{category.strCategory}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
