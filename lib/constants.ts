export const DIETARY_RESTRICTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Paleo",
  "Low-Carb",
  "Low-Fat",
  "Mediterranean",
] as const;

export const CUISINE_TYPES = [
  "Italian",
  "Mexican",
  "Indian",
  "Chinese",
  "Japanese",
  "Thai",
  "Mediterranean",
  "American",
  "French",
] as const;

export const MEAL_PREP_TIMES = {
  quick: "< 30 mins",
  medium: "30-60 mins",
  long: "> 60 mins",
} as const;

export const DEFAULT_CALORIE_GOAL = 2000;
export const DEFAULT_MEALS_PER_DAY = 3;
