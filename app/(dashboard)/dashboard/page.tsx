"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/lib/store/user-store";
import { Brain, Calendar, Settings, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { generateMealPlan } from "@/lib/utils/api";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { MealPlan } from "@/lib/types";

export default function DashboardPage() {
  const { preferences, mealPlans, addMealPlan } = useUserStore();
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [latestMealPlan, setLatestMealPlan] = useState<MealPlan | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mealPlans.length > 0) {
      setLatestMealPlan(mealPlans[mealPlans.length - 1]);
    }
  }, [mealPlans]);

  const handleGenerateMealPlan = async () => {
    setIsGenerating(true);
    try {
      const newMealPlan = await generateMealPlan(preferences);
      addMealPlan(newMealPlan);
      setLatestMealPlan(newMealPlan);
      toast({
        title: "Meal Plan Generated",
        description: "Your new meal plan is ready!",
      });
    } catch (error) {
      console.error("Error generating meal plan:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={handleGenerateMealPlan} disabled={isGenerating}>
          {isGenerating ? "Generating..." : "Generate New Meal Plan"}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Daily Calories
            </CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{preferences.calorieGoal}</div>
            <p className="text-xs text-muted-foreground">Goal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meals Per Day</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{preferences.mealsPerDay}</div>
            <p className="text-xs text-muted-foreground">Target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dietary Restrictions
            </CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {preferences.dietaryRestrictions.length}
            </div>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              AI Suggestions
            </CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mealPlans.length}</div>
            <p className="text-xs text-muted-foreground">Generated</p>
          </CardContent>
        </Card>
      </div>
      {latestMealPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Latest Meal Plan</CardTitle>
            <CardDescription>
              Generated on {latestMealPlan.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestMealPlan.meals.map((meal, index) => (
                <div
                  key={index}
                  className="border-t pt-4 first:border-t-0 first:pt-0"
                >
                  <h3 className="font-semibold">{meal.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {meal.description}
                  </p>
                  <p className="text-sm">Calories: {meal.calories}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Healthy Eating Tips</CardTitle>
          <CardDescription>
            AI-generated tips based on your preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">
                Based on your preferences, here are some healthy eating tips:
              </p>
              <ul className="list-disc pl-5 text-sm">
                <li>
                  Include a variety of colorful fruits and vegetables in your
                  meals
                </li>
                <li>Choose whole grains over refined grains</li>
                <li>
                  Incorporate lean proteins like fish, chicken, and legumes
                </li>
                <li>
                  Stay hydrated by drinking plenty of water throughout the day
                </li>
              </ul>
            </div>
            {!imageError ? (
              <Image
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&h=300&q=80"
                alt="Healthy food"
                width={200}
                height={150}
                className="rounded-lg"
                onError={handleImageError}
              />
            ) : (
              <div className="w-[200px] h-[150px] bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Image unavailable</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
