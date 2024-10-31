import { NextResponse } from "next/server";
import { UserPreferences } from "@/lib/store/user-store";
import { MealPlan } from "@/lib/types";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const SITE_NAME = "NutriPlan";

function cleanAndParseJSON(input: string): any {
  // Remove ```json wrapper if present
  let cleanedInput = input.replace(/^```json\s*/, "").replace(/\s*```$/, "");

  // Remove any text before the first '{' and after the last '}'
  cleanedInput = cleanedInput.substring(
    cleanedInput.indexOf("{"),
    cleanedInput.lastIndexOf("}") + 1
  );

  // Attempt to parse the JSON
  try {
    return JSON.parse(cleanedInput);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    console.error("Cleaned content:", cleanedInput);

    // If parsing fails, attempt to fix common issues
    cleanedInput = cleanedInput
      .replace(/'/g, '"') // Replace single quotes with double quotes
      .replace(/(\w+):/g, '"$1":') // Add quotes to unquoted keys
      .replace(/,\s*([\]}])/g, "$1") // Remove trailing commas
      .replace(/:\s*"([^"]*)"/g, (match, p1) => {
        return ': "' + p1.replace(/[\n\r\t]/g, " ").trim() + '"';
      }); // Handle newlines and other whitespace within string values

    // Try parsing again
    try {
      return JSON.parse(cleanedInput);
    } catch (error) {
      console.error("Failed to parse JSON after additional cleaning:", error);
      throw new Error("Unable to parse JSON content");
    }
  }
}

export async function POST(request: Request) {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: "OpenRouter API key is not configured" },
      { status: 500 }
    );
  }

  try {
    const preferences: UserPreferences = await request.json();
    const today = new Date().toISOString().split("T")[0];
    const mealsPerDay = preferences.mealsPerDay || 3;
    const caloriesPerMeal = Math.floor(preferences.calorieGoal / mealsPerDay);

    const exampleMeal = {
      name: "Breakfast: Oatmeal with Fruit",
      description: "Hot oatmeal topped with fresh berries and honey",
      calories: 400,
      ingredients: [
        "1 cup oats",
        "1 cup milk",
        "1/2 cup mixed berries",
        "1 tbsp honey",
      ],
      instructions: [
        "Bring milk to a boil",
        "Add oats and cook for 5 minutes",
        "Top with berries and honey",
      ],
    };

    const prompt = `Create a meal plan with exactly ${mealsPerDay} meals totaling ${
      preferences.calorieGoal
    } calories.

Dietary restrictions: ${preferences.dietaryRestrictions.join(", ")}
Allergies: ${preferences.allergies.join(", ")}

STRICT REQUIREMENTS:
1. Return a single JSON object with exactly this structure (no extra fields):
{
  "date": "${today}",
  "meals": [
    {
      "name": "Must start with meal type (Breakfast:/Lunch:/Dinner:) followed by the specific meal name",
      "description": "Detailed description of the meal",
      "calories": Must be a number between 200 and 1000,
      "ingredients": ["3-8 specific ingredients with quantities"],
      "instructions": ["2-5 specific cooking steps"]
    }
  ],
  "totalCalories": Must equal ${preferences.calorieGoal}
}

2. Each meal should be around ${caloriesPerMeal} calories (±200)
3. DO NOT include any placeholder values like "number" or "text"
4. DO NOT include any fields not shown in the structure above
5. Ensure all JSON syntax is valid with proper quotes and brackets

Here's a correctly formatted example meal:
${JSON.stringify(exampleMeal, null, 2)}`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "microsoft/phi-3-medium-128k-instruct:free",
          messages: [
            {
              role: "system",
              content: `You are a precise meal plan generator that MUST:
1. Generate meal plans exactly matching the requested JSON structure
2. Use only real, specific meal names and descriptions
3. Use actual calorie numbers within the specified range
4. Include realistic ingredients with quantities
5. Provide clear, step-by-step cooking instructions
6. Never use placeholder values
7. Never add extra fields to the JSON structure`,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error:", errorText);
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Invalid response from OpenRouter API");
    }

    let mealPlanContent = data.choices[0].message.content;

    try {
      const extractedJson: MealPlan = cleanAndParseJSON(mealPlanContent);

      // Validate basic structure
      if (!extractedJson.meals || !Array.isArray(extractedJson.meals)) {
        throw new Error("Missing or invalid 'meals' array in response");
      }

      if (extractedJson.meals.length !== mealsPerDay) {
        throw new Error(
          `Expected ${mealsPerDay} meals, got ${extractedJson.meals.length}`
        );
      }

      // Validate each meal
      extractedJson.meals.forEach((meal, index) => {
        const errors: string[] = [];

        if (
          !meal.name?.startsWith("Breakfast:") &&
          !meal.name?.startsWith("Lunch:") &&
          !meal.name?.startsWith("Dinner:")
        ) {
          errors.push(
            "Meal name must start with 'Breakfast:', 'Lunch:', or 'Dinner:'"
          );
        }

        if (typeof meal.calories !== "number") {
          errors.push("Calories must be a number");
        } else if (meal.calories < 200 || meal.calories > 1000) {
          errors.push("Calories must be between 200 and 1000");
        }

        if (!Array.isArray(meal.ingredients) || meal.ingredients.length < 3) {
          errors.push("Must include at least 3 ingredients");
        }

        if (!Array.isArray(meal.instructions) || meal.instructions.length < 2) {
          errors.push("Must include at least 2 instructions");
        }

        if (errors.length > 0) {
          throw new Error(`Invalid meal ${index + 1}: ${errors.join(", ")}`);
        }
      });

      // Calculate total calories
      const calculatedTotal = extractedJson.meals.reduce(
        (sum, meal) => sum + meal.calories,
        0
      );
      extractedJson.totalCalories = calculatedTotal;

      // Ensure date is correct
      extractedJson.date = today;

      return NextResponse.json(extractedJson);
    } catch (error) {
      console.error("Error parsing meal plan:", error);
      console.error("Raw meal plan content:", mealPlanContent);

      return NextResponse.json(
        {
          error: "Failed to generate a valid meal plan",
          details: error instanceof Error ? error.message : String(error),
          rawContent: mealPlanContent,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error generating meal plan:", error);
    return NextResponse.json(
      { error: "Failed to generate meal plan", details: error.message },
      { status: 500 }
    );
  }
}