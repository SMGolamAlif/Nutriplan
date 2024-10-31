const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function generateMealPlan(preferences: any) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "microsoft/phi-3-medium-128k-instruct:free",
          messages: [
            {
              role: "user",
              content: `Generate a meal plan based on these preferences: ${JSON.stringify(
                preferences
              )}`,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw error;
  }
}
