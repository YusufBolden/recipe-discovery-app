import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import type { CategoriesResponse } from "../types/index"

export const HomePage = () => {
  const { data, loading, error } = useFetch<CategoriesResponse>(
    'https://www.themealdb.com/api/json/v1/1/categories.php'
  );

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.categories.map((cat) => (
        <Link
          key={cat.idCategory}
          to={`/category/${cat.strCategory}`}
          className="rounded shadow p-4 bg-white hover:shadow-lg transition block"
        >
          <img
            src={cat.strCategoryThumb}
            alt={cat.strCategory}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-lg font-bold mt-2">{cat.strCategory}</h2>
        </Link>
      ))}
    </div>
  );
};
