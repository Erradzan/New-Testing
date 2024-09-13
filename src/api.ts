// api.ts
import { ApiResponse, Meal } from './types';

export async function fetchRandomRecipe(): Promise<Meal | null> {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data: ApiResponse = await response.json();
    return data.meals[0]; // Return the first meal
  } catch (error) {
    console.error('Error fetching the recipe:', error);
    return null;
  }
}
