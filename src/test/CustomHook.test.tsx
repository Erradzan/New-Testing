import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useFetchRecipe from '../useFetchRecipe';
import { fetchRandomRecipe } from '../api';
import { Meal } from '../types';

jest.mock('../api');

const mockMeal: Meal = {
  strMeal: 'Test Meal',
  strInstructions: 'Step 1\nStep 2\nStep 3',
  strMealThumb: 'https://via.placeholder.com/150',
  strCategory: 'Test Category',
  strArea: 'Test Area',
  strYoutube: 'https://www.youtube.com/watch?v=example',
};

describe('useFetchRecipe Hook', () => {
  beforeEach(() => {
    (fetchRandomRecipe as jest.Mock).mockResolvedValue(mockMeal);
  });

  test('should handle fetching recipe successfully', async () => {
    const { result } = renderHook(() => useFetchRecipe());

    act(() => {
      result.current.fetchRecipe();
    });

    await waitFor(() => {
      expect(result.current.meal).toEqual(mockMeal);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  test('should handle fetch recipe failure', async () => {
    (fetchRandomRecipe as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(() => useFetchRecipe());

    act(() => {
      result.current.fetchRecipe();
    });

    await waitFor(() => {
      expect(result.current.meal).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Failed to fetch recipe. Please try again.');
    });
  });
});
