"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import { getItems, addItem } from "../_services/shopping-list-service";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

export default function ShoppingListPage() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [loading, setLoading] = useState(true);

  // Load items from Firestore
  const loadItems = async () => {
    if (user && user.uid) {
      try {
        const userItems = await getItems(user.uid);
        setItems(userItems);
      } catch (error) {
        console.error("Error loading items:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Load items when component mounts or user changes
  useEffect(() => {
    if (user) {
      loadItems();
    } else if (user === null) {
      // User is not authenticated, redirect to home
      router.push("/week-10");
    }
  }, [user, router]);

  // Don't render anything if user is not authenticated
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg">Please sign in to access your shopping list.</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg">Loading your shopping list...</p>
        </div>
      </div>
    );
  }

  const handleAddItem = async (newItem) => {
    try {
      // Add item to Firestore
      const id = await addItem(user.uid, newItem);
      
      // Create the item object with the Firestore-generated ID
      const itemWithId = {
        id: id,
        name: newItem.name,
        quantity: newItem.quantity,
        category: newItem.category
      };
      
      // Update local state
      setItems([...items, itemWithId]);
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  const handleItemSelect = (item) => {
    // Clean up the item name by removing size, quantity, and emojis
    let cleanedName = item.name
      .split(',')[0] // Remove everything after the first comma (e.g., "milk, 4 L 🥛" becomes "milk")
      .trim() // Remove whitespace
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '') // Remove emojis
      .replace(/\s*\d+\s*(pack|kg|g|L|ml)\s*$/i, '') // Remove size/quantity at the end
      .trim() // Remove any remaining whitespace
      .toLowerCase(); // Convert to lowercase for API consistency
    
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shopping List</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Welcome, {user.displayName}
          </span>
          <button
            onClick={() => router.push("/week-10")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
      
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