"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping List</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <NewItem onAddItem={handleAddItem} />
        </div>
        
        <div>
          <ItemList items={items} />
        </div>
      </div>
    </main>
  );
}