"use client";

import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-500">
          Add New Item
        </h2>
        
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={decrement}
            disabled={quantity === 1}
            className={`px-4 py-2 rounded-lg font-semibold text-lg transition-colors ${
              quantity === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            -
          </button>
          
          <div className="bg-gray-100 px-6 py-3 rounded-lg">
            <span className="text-2xl font-bold text-gray-800">
              {quantity}
            </span>
          </div>
          
          <button
            onClick={increment}
            disabled={quantity === 20}
            className={`px-4 py-2 rounded-lg font-semibold text-lg transition-colors ${
              quantity === 20
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            +
          </button>
        </div>
        
        <div className="text-center mt-4 text-sm text-gray-600">
          Quantity: {quantity} (Range: 1-20)
        </div>
      </div>
    </div>
  );
}