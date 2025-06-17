"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockPlayers } from "./players";

interface PlayerRow {
  playerId: string;
}

// For demo, allow user to set number of teams (default 2, but could be 3+)
const DEFAULT_TEAMS = 2;

export default function RecordGamePage() {
  const [campaignId, setCampaignId] = useState("");
  const [planetId, setPlanetId] = useState("");
  const [numTeams, setNumTeams] = useState(DEFAULT_TEAMS);
  const [teams, setTeams] = useState<PlayerRow[][]>(Array.from({ length: DEFAULT_TEAMS }, (_, i) => [{ playerId: mockPlayers[i % mockPlayers.length].id }]));
  const [teamPoints, setTeamPoints] = useState<string[]>(Array(DEFAULT_TEAMS).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handlePlayerChange = (teamIdx: number, playerIdx: number, value: string) => {
    setTeams(prev => prev.map((team, i) =>
      i === teamIdx ? team.map((row, j) => j === playerIdx ? { playerId: value } : row) : team
    ));
  };

  const handleAddPlayer = (teamIdx: number) => {
    setTeams(prev => prev.map((team, i) =>
      i === teamIdx ? [...team, { playerId: mockPlayers[0].id }] : team
    ));
  };

  const handleRemovePlayer = (teamIdx: number, playerIdx: number) => {
    setTeams(prev => prev.map((team, i) =>
      i === teamIdx && team.length > 1 ? team.filter((_, j) => j !== playerIdx) : team
    ));
  };

  const handlePointsChange = (teamIdx: number, value: string) => {
    setTeamPoints(prev => prev.map((p, i) => i === teamIdx ? value : p));
  };

  const handleNumTeamsChange = (value: number) => {
    if (value < 2) return;
    setNumTeams(value);
    setTeams(prev => {
      const newTeams = [...prev];
      while (newTeams.length < value) newTeams.push([{ playerId: mockPlayers[0].id }]);
      while (newTeams.length > value) newTeams.pop();
      return newTeams;
    });
    setTeamPoints(prev => {
      const newPoints = [...prev];
      while (newPoints.length < value) newPoints.push("");
      while (newPoints.length > value) newPoints.pop();
      return newPoints;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call your backend or Firestore function to save the match
    setSubmitted(true);
    setTimeout(() => router.replace("/campaign-history"), 1500);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gothic text-gothicIvory font-gothic">
      <div className="card w-full max-w-md flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-gothic mb-4 text-gothicGold">Record a Game</h1>
        {submitted ? (
          <div className="text-gothicGold font-semibold">Game recorded! Redirecting...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <input
              type="text"
              placeholder="Campaign ID"
              value={campaignId}
              onChange={e => setCampaignId(e.target.value)}
              className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
              required
            />
            <input
              type="text"
              placeholder="Planet ID (optional)"
              value={planetId}
              onChange={e => setPlanetId(e.target.value)}
              className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
            />
            <div className="w-full flex flex-col gap-6 justify-center">
              <div className="flex flex-col items-center mb-2">
                <label className="text-gothicGold mb-1">Number of Teams</label>
                <input
                  type="number"
                  min={2}
                  max={6}
                  value={numTeams}
                  onChange={e => handleNumTeamsChange(Number(e.target.value))}
                  className="w-24 px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic text-center"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                {teams.map((team, teamIdx) => (
                  <div className="flex-1" key={teamIdx}>
                    <h2 className="text-xl font-gothic text-gothicGold mb-2">Team {teamIdx + 1}</h2>
                    <div className="space-y-2">
                      {team.map((row, playerIdx) => (
                        <div key={playerIdx} className="flex gap-2 items-center w-full">
                          <select
                            value={row.playerId}
                            onChange={e => handlePlayerChange(teamIdx, playerIdx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
                          >
                            {mockPlayers.map(p => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                          </select>
                          <button
                            type="button"
                            className="btn-gothic px-2 py-1 text-sm"
                            onClick={() => handleRemovePlayer(teamIdx, playerIdx)}
                            disabled={team.length <= 1}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn-gothic mt-2"
                        onClick={() => handleAddPlayer(teamIdx)}
                      >
                        Add Player
                      </button>
                    </div>
                    <div className="flex flex-col mt-4">
                      <label className="text-gothicGold mb-1">Team {teamIdx + 1} Points</label>
                      <input
                        type="number"
                        value={teamPoints[teamIdx]}
                        onChange={e => handlePointsChange(teamIdx, e.target.value)}
                        className="px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="btn-gothic w-full"
            >
              Record Game
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
