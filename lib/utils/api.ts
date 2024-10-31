import { UserPreferences } from "@/lib/store/user-store";
import { MealPlan } from "@/lib/types";

const API_URL = "/api/meal-plan";

export async function generateMealPlan(
  preferences: UserPreferences
): Promise<MealPlan> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preferences),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to generate meal plan");
  }

  const data = await response.json();

  if (!data.meals || !Array.isArray(data.meals)) {
    console.error("Invalid meal plan data:", data);
    throw new Error("Invalid meal plan data received");
  }

  return data;
}
