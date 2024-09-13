import { useState } from 'react';
import { fetchRandomRecipe } from './api';
import { Meal } from './types';

const useFetchRecipe = () => {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipe = async () => {
    setLoading(true);
    setError(null);
    try {
      const recipe = await fetchRandomRecipe();
      if (recipe) {
        setMeal(recipe);
      } else {
        setError('Failed to fetch recipe. Please try again.');
      }
    } catch (err) {
      setError('Failed to fetch recipe. Please try again.');
    }
    setLoading(false);
  };

  return { meal, loading, error, fetchRecipe };
};

export default useFetchRecipe;