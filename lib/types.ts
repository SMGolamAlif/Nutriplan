export type Meal = {
  name: string;
  description: string;
  calories: number;
  ingredients: string[];
  instructions: string[];
  image?: string;
};

export type MealPlan = {
  id: string;
  date: string;
  meals: Meal[];
  totalCalories: number;
};

export type UserPreferences = {
  calorieGoal: number;
  mealsPerDay: number;
  dietaryRestrictions: string[];
  allergies: string[];
  cuisinePreferences?: string[];
  mealPrepTime?: "quick" | "medium" | "long";
};
