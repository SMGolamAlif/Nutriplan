import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type MealPlan = {
  date: string;
  meals: {
    name: string;
    description: string;
    calories: number;
  }[];
};

type MealPlanDisplayProps = {
  mealPlans: MealPlan[];
};

export default function MealPlanDisplay({ mealPlans }: MealPlanDisplayProps) {
  return (
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
