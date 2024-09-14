import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Main from '../Main';
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

describe('Main Component', () => {
  beforeEach(() => {
    (fetchRandomRecipe as jest.Mock).mockResolvedValue(mockMeal);
  });

  test('should display error message when fetch fails', async () => {
    (fetchRandomRecipe as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
    render(<Main />);
    fireEvent.click(screen.getByText('Show Random Recipe'));
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch recipe. Please try again.')).toBeInTheDocument();
    });
  });
});
