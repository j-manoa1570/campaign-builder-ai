"use client";
import { useState } from "react";

const planetTypes = [
	"Terrestrial",
	"Gas Giant",
	"Ice Giant",
	"Dwarf",
	"Ocean",
	"Desert",
	"Lava",
	"Forest",
	"Rocky",
];

export default function CreatePlanetPage() {
	const [name, setName] = useState("");
	const [type, setType] = useState(planetTypes[0]);
	const [moons, setMoons] = useState(0);
	const [livability, setLivability] = useState("");
	const [naturalResources, setNaturalResources] = useState("");
	const [natives, setNatives] = useState("");
	const [dayNightCycle, setDayNightCycle] = useState("");
	const [positionFromSun, setPositionFromSun] = useState(1);
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would call your backend or Firestore function to save the planet
		setSubmitted(true);
		setTimeout(() => setSubmitted(false), 2000);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gothic text-gothicIvory font-gothic">
			<div className="card w-full max-w-md flex flex-col items-center justify-center text-center">
				<h1 className="text-2xl font-gothic mb-4 text-gothicGold">
					Create a Planet
				</h1>
				{submitted ? (
					<div className="text-gothicGold font-semibold">Planet created!</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="text"
							placeholder="Planet Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
							required
						/>
						<div className="flex gap-2">
							<label className="flex-1 text-left">
								Type:
								<select
									value={type}
									onChange={(e) => setType(e.target.value)}
									className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic mt-1"
								>
									{planetTypes.map((pt) => (
										<option key={pt} value={pt}>
											{pt}
										</option>
									))}
								</select>
							</label>
						</div>
						<input
							type="number"
							placeholder="Number of Moons"
							value={moons}
							onChange={(e) => setMoons(Number(e.target.value))}
							className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
							min={0}
						/>
						<input
							type="text"
							placeholder="Livability (e.g. Habitable, Hostile)"
							value={livability}
							onChange={(e) => setLivability(e.target.value)}
							className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
						/>
						<input
							type="text"
							placeholder="Natural Resources (comma separated)"
							value={naturalResources}
							onChange={(e) => setNaturalResources(e.target.value)}
							className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
						/>
						<input
							type="text"
							placeholder="Natives (describe or leave blank)"
							value={natives}
							onChange={(e) => setNatives(e.target.value)}
							className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
						/>
						<input
							type="text"
							placeholder="Day/Night Cycle (e.g. 24h, 36h)"
							value={dayNightCycle}
							onChange={(e) => setDayNightCycle(e.target.value)}
							className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
						/>
						<input
							type="number"
							placeholder="Position from Sun (e.g. 3)"
							value={positionFromSun}
							onChange={(e) => setPositionFromSun(Number(e.target.value))}
							className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
							min={1}
						/>
						<button type="submit" className="btn-gothic w-full">
							Create Planet
						</button>
					</form>
				)}
			</div>
		</main>
	);
}
