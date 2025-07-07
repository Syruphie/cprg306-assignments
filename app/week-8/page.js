"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleItemSelect = (item) => {
    // Clean up the item name by removing size, quantity, and emojis
    let cleanedName = item.name
      .split(',')[0] // Remove everything after the first comma
      .trim() // Remove whitespace
      .replace(/[^\w\s]/gi, '') // Remove emojis and special characters
      .toLowerCase(); // Convert to lowercase for API consistency
    
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping List</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-8">
          {/* Left side - New Item and Item List */}
          <div className="flex-1">
            <div className="mb-8">
              <NewItem onAddItem={handleAddItem} />
            </div>
            
            <div>
              <ItemList items={items} onItemSelect={handleItemSelect} />
            </div>
          </div>
          
          {/* Right side - Meal Ideas */}
          <div className="flex-1">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}