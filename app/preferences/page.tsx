"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/store/user-store";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  calorieGoal: z.number().min(1000).max(5000),
  mealsPerDay: z.number().min(1).max(6),
  dietaryRestrictions: z.string(),
  allergies: z.string(),
});

export default function PreferencesPage() {
  const { preferences, setPreferences } = useUserStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calorieGoal: preferences.calorieGoal,
      mealsPerDay: preferences.mealsPerDay,
      dietaryRestrictions: preferences.dietaryRestrictions.join(", "),
      allergies: preferences.allergies.join(", "),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setPreferences({
      ...values,
      dietaryRestrictions: values.dietaryRestrictions
        .split(",")
        .map((item) => item.trim()),
      allergies: values.allergies.split(",").map((item) => item.trim()),
    });
    toast({
      title: "Preferences Updated",
      description: "Your meal planning preferences have been saved.",
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Preferences</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Meal Planning Preferences</CardTitle>
          <CardDescription>
            Customize your meal plans by setting your preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="calorieGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Calorie Goal</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Set your daily calorie intake goal.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mealsPerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meals Per Day</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      How many meals do you want per day?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dietaryRestrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Restrictions</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter any dietary restrictions, separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter any allergies, separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Preferences</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
