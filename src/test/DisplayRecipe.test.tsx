import React from 'react';
import { render, screen } from '@testing-library/react';
import DisplayRecipe from '../DisplayRecipe';
import '@testing-library/jest-dom/extend-expect';
import { Meal } from '../types';

const mockMeal: Meal = {
  strMeal: 'Spaghetti Carbonara',
  strMealThumb: 'https://via.placeholder.com/150',
  strInstructions: 'Boil pasta. Fry bacon. Mix eggs and cheese.',
  strYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  strCategory: 'Pasta',
  strArea: 'Italian',
  strIngredient1: 'Spaghetti',
  strMeasure1: '200g',
  strIngredient2: 'Bacon',
  strMeasure2: '100g',
  strIngredient3: 'Eggs',
  strMeasure3: '2',
  strIngredient4: 'Parmesan Cheese',
  strMeasure4: '50g',
  strIngredient5: 'Black Pepper',
  strMeasure5: '1 tsp',
};

describe('DisplayRecipe', () => {
  test('renders loading state', () => {
    render(<DisplayRecipe meal={null} loading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(<DisplayRecipe meal={null} loading={false} error="Failed to fetch recipe" />);
    expect(screen.getByText('Failed to fetch recipe')).toBeInTheDocument();
  });

  test('renders no recipe available state', () => {
    render(<DisplayRecipe meal={null} loading={false} error={null} />);
    expect(screen.getByText('No recipe available.')).toBeInTheDocument();
  });

  test('renders recipe details when a valid meal is provided', () => {
    render(<DisplayRecipe meal={mockMeal} loading={false} error={null} />);
    
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.getByText('200g Spaghetti')).toBeInTheDocument();
    expect(screen.getByText('100g Bacon')).toBeInTheDocument();
    expect(screen.getByText('2 Eggs')).toBeInTheDocument();
    expect(screen.getByText('50g Parmesan Cheese')).toBeInTheDocument();
    expect(screen.getByText('1 tsp Black Pepper')).toBeInTheDocument();
    expect(screen.getByText('Boil pasta. Fry bacon. Mix eggs and cheese.')).toBeInTheDocument();
    
    const iframe = screen.getByTitle('YouTube video player');
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
  });

  test('does not render YouTube video section if the link is missing', () => {
    const mockMealWithoutVideo = { ...mockMeal, strYoutube: '' };
    render(<DisplayRecipe meal={mockMealWithoutVideo} loading={false} error={null} />);
    
    expect(screen.queryByTitle('YouTube video player')).not.toBeInTheDocument();
  });
});
