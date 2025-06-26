export interface MealCategory {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: string | null;
};


export type MealsResponse = {
  meals: Meal[];
};

export interface MealDetail {
    strInstructions: string;
    [key: string]: unknown;
}

export type FavoritesContextType = {
  favorites: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export type RecipeDetail = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
};

export type RecipeResponse = {
  meals: RecipeDetail[];
};

export type RecipeCardProps = {
  id: string;
  name: string;
  image: string;
};

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type CategoriesResponse = {
  categories: Category[];
};