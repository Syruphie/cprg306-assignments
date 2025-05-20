import Link from "next/link";


export default function Home() {
  return (
    <main>
      <h1 className="text-4xl">CPRG 306: Web Development 2 - Assignments</h1>
      <ul>
        <li><Link href="/week-2" className="text-blue-500 hover:text-blue-300">Week 2</Link></li>
        <li><Link href="/week-3" className="text-blue-500 hover:text-blue-300">Week 3</Link></li>
      </ul>
    </main>
  );
}
