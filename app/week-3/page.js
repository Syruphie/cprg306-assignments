import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping List</h1>
      <ItemList />
    </main>
  );
}