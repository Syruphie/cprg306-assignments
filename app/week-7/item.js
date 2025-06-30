export default function Item({ name, quantity, category }) {
  return (
    <li className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-gray-700">Quantity: {quantity}</p>
      <p className="text-gray-700 italic">Category: {category}</p>
    </li>
  );
}