"use client";
import { useState } from "react";

const examplePlanets = [
	{ id: "planet-1", name: "Aurelia", type: "Terrestrial" },
	{ id: "planet-2", name: "Zephyria", type: "Gas Giant" },
];

export default function CampaignMapPage() {
	const [selectedPlanet, setSelectedPlanet] = useState(examplePlanets[0].id);
	const [side, setSide] = useState("");
	const [points, setPoints] = useState("");
	const [control, setControl] = useState<string | null>(null);
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Simulate calculation of control based on points and side
		setControl(`${side} controls the planet with ${points} points!`);
		setSubmitted(true);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gothic text-gothicIvory font-gothic">
			<div className="card w-full max-w-md flex flex-col items-center justify-center text-center">
				<h1 className="text-2xl font-gothic mb-4 text-gothicGold">
					Campaign Map: Simple Single Planet
				</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<label className="block text-left text-gothicIvory">
						Select Planet:
						<select
							value={selectedPlanet}
							onChange={(e) => setSelectedPlanet(e.target.value)}
							className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic mt-1"
						>
							{examplePlanets.map((planet) => (
								<option key={planet.id} value={planet.id}>
									{planet.name} ({planet.type})
								</option>
							))}
						</select>
					</label>
					<input
						type="text"
						placeholder="Your Side (e.g. Red, Blue)"
						value={side}
						onChange={(e) => setSide(e.target.value)}
						className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
						required
					/>
					<input
						type="number"
						placeholder="Points Scored"
						value={points}
						onChange={(e) => setPoints(e.target.value)}
						className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
						required
					/>
					<button type="submit" className="btn-gothic w-full">
						Submit Match Result
					</button>
				</form>
				{submitted && control && (
					<div className="mt-6 text-gothicGold font-semibold">{control}</div>
				)}
			</div>
		</main>
	);
}
