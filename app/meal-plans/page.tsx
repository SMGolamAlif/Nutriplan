"use client";

import { useUserStore } from "@/lib/store/user-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateMealPlan } from "@/lib/utils/api";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import Image from "next/image";
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const MealImage = ({ mealName }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    unsplash.search.getPhotos({
      query: mealName,
      page: 1,
      perPage: 1,
    }).then(result => {
      if (result.response && result.response.results.length > 0) {
        setImageUrl(result.response.results[0].urls.regular);
      }
    }).catch(() => {
      // Handle error
    });
  }, [mealName]);

  return (
    <Image
      src={imageUrl}
      alt={mealName}
      width={400}
      height={300}
      className="rounded-lg mt-4"
    />
  );
};

export default function MealPlansPage() {
  const { preferences, mealPlans, addMealPlan } = useUserStore();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMealPlan = async () => {
    setIsGenerating(true);
    try {
      const newMealPlan = await generateMealPlan(preferences);
      addMealPlan(newMealPlan);
      toast({
        title: "Meal Plan Generated",
        description: "Your new meal plan is ready!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meal Plans</h1>
        <Button onClick={handleGenerateMealPlan} disabled={isGenerating}>
          {isGenerating ? "Generating..." : "Generate New Meal Plan"}
        </Button>
      </div>
      {mealPlans.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mealPlans.map((plan, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{plan.date}</CardTitle>
                <CardDescription>Daily Meal Plan</CardDescription>
              </CardHeader>
              <CardContent>
                {plan.meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="mb-4">
                    <h3 className="font-semibold">{meal.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {meal.description}
                    </p>
                    <p className="text-sm">Calories: {meal.calories}</p>
                  </div>
                ))}
                <MealImage mealName={plan.meals[0].name} />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground mb-4">
              No meal plans generated yet.
            </p>
            <Button onClick={handleGenerateMealPlan} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Your First Meal Plan"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}