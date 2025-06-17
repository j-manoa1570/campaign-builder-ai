import { getPlanets } from "../../lib/firestore/planets";
import Link from "next/link";

export default async function PlanetsPage() {
  const planets = await getPlanets();
  return (
    <div className="max-w-2xl mx-auto p-8 card">
      <h1 className="text-3xl font-quintessential mb-6">Planets</h1>
      <ul className="mb-6">
        {planets.map((planet: any) => (
          <li key={planet.id} className="mb-2 flex justify-between items-center">
            <span>{planet.name}</span>
            {/* Optionally add more planet details or actions */}
          </li>
        ))}
      </ul>
      <Link href="/create-planet" className="btn-gothic">Create New Planet</Link>
    </div>
  );
}
