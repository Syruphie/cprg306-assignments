export default function Item({ item }) {
  const { name, quantity, category } = item;
  
  return (
    <li className="border rounded-lg p-4 mb-2 shadow-sm hover:shadow-md transition-shadow w-100" >
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-gray-700">Quantity: {quantity}</p>
      <p className="text-gray-700 italic">Category: {category}</p>
    </li>
  );
}
