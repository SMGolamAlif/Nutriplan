import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserPreferences = {
  dietaryRestrictions: string[];
  calorieGoal: number;
  mealsPerDay: number;
  allergies: string[];
};

type UserStore = {
  preferences: UserPreferences;
  mealPlans: any[];
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  addMealPlan: (mealPlan: any) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      preferences: {
        dietaryRestrictions: [],
        calorieGoal: 2000,
        mealsPerDay: 3,
        allergies: [],
      },
      mealPlans: [],
      setPreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),
      addMealPlan: (mealPlan) =>
        set((state) => ({
          mealPlans: [...state.mealPlans, mealPlan],
        })),
    }),
    {
      name: "user-storage",
    }
  )
);
