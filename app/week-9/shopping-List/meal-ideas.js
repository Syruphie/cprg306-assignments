"use client";

import { useState, useEffect } from "react";

// Function to fetch meal ideas from TheMealDB API
async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  // Function to load meal ideas
  const loadMealIdeas = async () => {
    if (ingredient) {
      const mealIdeas = await fetchMealIdeas(ingredient);
      setMeals(mealIdeas);
    }
  };

  // Use useEffect to load meal ideas when ingredient changes
  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="ml-8">
      <h2 className="text-2xl font-bold mb-4">Meal Ideas</h2>
      {ingredient ? (
        <div>
          <p className="text-lg mb-4">
            Here are some meal ideas using <span className="font-semibold">{ingredient}</span>:
          </p>
          {meals.length > 0 ? (
            <ul className="space-y-2">
              {meals.map((meal) => (
                <li
                  key={meal.idMeal}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{meal.strMeal}</h3>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No meal ideas found for this ingredient.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-500 italic">Select an item to see meal ideas.</p>
      )}
    </div>
  );
}