import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

// Get all items for a specific user
export async function getItems(userId) {
  try {
    const itemsRef = collection(db, "users", userId, "items");
    const q = query(itemsRef);
    const querySnapshot = await getDocs(q);
    
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return items;
  } catch (error) {
    console.error("Error getting items:", error);
    return [];
  }
}

// Add a new item to a specific user's list
export async function addItem(userId, item) {
  try {
    const itemsRef = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemsRef, {
      name: item.name,
      quantity: item.quantity,
      category: item.category
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}