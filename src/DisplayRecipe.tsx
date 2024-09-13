// DisplayRecipe.tsx
import React from 'react';
import { Meal } from './types';

interface DisplayRecipeProps {
  meal: Meal | null;
  loading: boolean;
  error: string | null;
}

const DisplayRecipe: React.FC<DisplayRecipeProps> = ({ meal, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!meal) return <p>No recipe available.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{meal.strMeal}</h2>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="my-4 w-full rounded-md object-contain"
      />
      <h3 className="text-lg font-semibold">Ingredients</h3>
      <ul className="list-disc ml-5">
        {Array.from({ length: 20 }, (_, i) => i + 1)
          .map((i) => {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            return ingredient ? (
              <li key={i}>
                {measure} {ingredient}
              </li>
            ) : null;
          })
          .filter(Boolean)}
      </ul>
      <h3 className="text-lg font-semibold mt-4">Instructions</h3>
      <p>{meal.strInstructions}</p>
      {meal.strYoutube && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Watch Video</h3>
          <iframe
            width="100%"
            height="315"
            src={meal.strYoutube.replace('watch?v=', 'embed/')}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default DisplayRecipe;
