"use client";
import { useState } from "react";

// Example match data for demo purposes
const exampleMatches = [
	{
		id: "match-1",
		campaignId: "campaign-1",
		planetId: "planet-1",
		participants: ["Alice", "Bob"],
		result: "Alice won 10-8",
		createdAt: 1718500000000,
		approvedBy: ["Alice", "Bob"],
	},
	{
		id: "match-2",
		campaignId: "campaign-1",
		planetId: "planet-1",
		participants: ["Charlie", "Dana"],
		result: "Dana won 12-11",
		createdAt: 1718600000000,
		approvedBy: ["Dana", "Charlie"],
	},
];

function formatDate(ts: number) {
	return new Date(ts).toLocaleString();
}

export default function CampaignHistoryPage() {
	const [campaignId, setCampaignId] = useState("");
	const [matches, setMatches] = useState(exampleMatches);

	// In a real app, you would filter matches by campaignId and fetch from backend
	const filteredMatches = campaignId
		? matches.filter((m) => m.campaignId === campaignId)
		: matches;

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gothic text-gothicIvory font-gothic">
			<div className="card w-full max-w-2xl flex flex-col items-center justify-center text-center">
				<h1 className="text-2xl font-gothic mb-4 text-gothicGold">
					Campaign History
				</h1>
				<input
					type="text"
					placeholder="Filter by Campaign ID"
					value={campaignId}
					onChange={(e) => setCampaignId(e.target.value)}
					className="mb-6 w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
				/>
				<div className="overflow-x-auto">
					<table className="min-w-full border border-gothicGold bg-gothicGray text-gothicIvory font-gothic">
						<thead>
							<tr className="bg-gothicBlack text-gothicGold">
								<th className="px-4 py-2 border border-gothicGold">Date</th>
								<th className="px-4 py-2 border border-gothicGold">
									Participants
								</th>
								<th className="px-4 py-2 border border-gothicGold">Result</th>
								<th className="px-4 py-2 border border-gothicGold">
									Approved By
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredMatches.length === 0 ? (
								<tr>
									<td
										colSpan={4}
										className="py-4 text-gothicGray"
									>
										No matches found for this campaign.
									</td>
								</tr>
							) : (
								filteredMatches.map((match) => (
									<tr key={match.id}>
										<td className="border border-gothicGold px-4 py-2">
											{formatDate(match.createdAt)}
										</td>
										<td className="border border-gothicGold px-4 py-2">
											{match.participants.join(", ")}
										</td>
										<td className="border border-gothicGold px-4 py-2">
											{match.result}
										</td>
										<td className="border border-gothicGold px-4 py-2">
											{match.approvedBy.join(", ")}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}
