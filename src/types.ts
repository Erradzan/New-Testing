// types.ts
export interface Meal {
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strYoutube: string;
    [key: string]: any; // Index signature to allow additional properties like ingredients
  }
  
  export interface ApiResponse {
    meals: Meal[];
  }
  