"use client";
import { useState } from "react";

const factionOptions = [
  "Black Templars",
  "Farsight Enclaves",
  "Thousand Sons",
  "Emperor's Children",
  "Tyranids",
];

// Mock data for match and campaign history
const mockMatchHistory = [
  {
    id: "m1",
    date: "2025-06-01",
    army: "Farsight Enclaves",
    opponent: "Alice",
    outcome: "Win",
    points: "60 - 45",
    campaign: "Planetfall",
  },
  {
    id: "m2",
    date: "2025-06-10",
    army: "Black Templars",
    opponent: "Bob",
    outcome: "Lose",
    points: "38 - 60",
    campaign: "Siege of Terra",
  },
];
const mockCampaignHistory = [
  {
    id: "c1",
    name: "Planetfall",
    start: "2025-05-01",
    end: null,
    army: "Farsight Enclaves",
    outcome: null, // ongoing
  },
  {
    id: "c2",
    name: "Siege of Terra",
    start: "2025-04-01",
    end: "2025-06-15",
    army: "Black Templars",
    outcome: "Lose",
  },
];

interface Army {
  name: string;
  faction: string;
  saved: boolean;
}

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [discord, setDiscord] = useState("");
  const [armies, setArmies] = useState<Army[]>([{ name: "", faction: factionOptions[0], saved: false }]);

  const handleArmyChange = (idx: number, field: keyof Army, value: string) => {
    setArmies(prev => prev.map((a, i) => i === idx ? { ...a, [field]: value } : a));
  };
  const handleAddArmy = () => setArmies(prev => [...prev, { name: "", faction: factionOptions[0], saved: false }]);
  const handleRemoveArmy = (idx: number) => {
    if (armies.length > 1) setArmies(prev => prev.filter((_, i) => i !== idx));
  };
  const handleSaveArmy = (idx: number) => {
    setArmies(prev => prev.map((a, i) => i === idx ? { ...a, saved: true } : a));
  };
  const handleEditArmy = (idx: number) => {
    setArmies(prev => prev.map((a, i) => i === idx ? { ...a, saved: false } : a));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile to backend or Firestore in the future
    alert("Profile saved!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gothic text-gothicIvory font-gothic">
      <div className="card w-full max-w-lg flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-gothic mb-4 text-gothicGold">My Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="flex-1 px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="flex-1 px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Discord Username (optional)"
            value={discord}
            onChange={e => setDiscord(e.target.value)}
            className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
          />
          <div className="w-full">
            <label className="text-gothicGold mb-1 block">Armies I Play</label>
            {armies.map((army, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-center">
                {army.saved ? (
                  <>
                    <span className="flex-1 text-left">{army.name} ({army.faction})</span>
                    <button
                      type="button"
                      className="btn-gothic px-2 py-1 text-sm"
                      onClick={() => handleEditArmy(idx)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-gothic px-2 py-1 text-sm bg-gothicRed text-gothicIvory hover:bg-gothicGold hover:text-gothicBlack"
                      onClick={() => handleRemoveArmy(idx)}
                      disabled={armies.length <= 1}
                    >
                      X
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Army Name"
                      value={army.name}
                      onChange={e => handleArmyChange(idx, "name", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
                      required
                    />
                    <select
                      value={army.faction}
                      onChange={e => handleArmyChange(idx, "faction", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
                    >
                      {factionOptions.map(faction => (
                        <option key={faction} value={faction}>{faction}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="btn-gothic px-2 py-1 text-sm"
                      onClick={() => handleSaveArmy(idx)}
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            ))}
            <button type="button" className="btn-gothic mt-2" onClick={handleAddArmy}>Add Army</button>
          </div>
          <button type="submit" className="btn-gothic w-full">Save Profile</button>
        </form>
        <div className="w-full mt-8">
          <h2 className="text-xl font-gothic text-gothicGold mb-2">Match History</h2>
          <table className="min-w-full border border-gothicGold bg-gothicGray text-gothicIvory font-gothic mb-6">
            <thead>
              <tr className="bg-gothicBlack text-gothicGold">
                <th className="px-4 py-2 border border-gothicGold">Date</th>
                <th className="px-4 py-2 border border-gothicGold">Army</th>
                <th className="px-4 py-2 border border-gothicGold">Opponent</th>
                <th className="px-4 py-2 border border-gothicGold">Outcome</th>
                <th className="px-4 py-2 border border-gothicGold">Points</th>
                <th className="px-4 py-2 border border-gothicGold">Campaign</th>
              </tr>
            </thead>
            <tbody>
              {mockMatchHistory.map(m => (
                <tr key={m.id}>
                  <td className="border border-gothicGold px-4 py-2">{m.date}</td>
                  <td className="border border-gothicGold px-4 py-2">{m.army}</td>
                  <td className="border border-gothicGold px-4 py-2">{m.opponent}</td>
                  <td className="border border-gothicGold px-4 py-2">{m.outcome}</td>
                  <td className="border border-gothicGold px-4 py-2">{m.points}</td>
                  <td className="border border-gothicGold px-4 py-2">{m.campaign}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="text-xl font-gothic text-gothicGold mb-2">Campaign History</h2>
          <table className="min-w-full border border-gothicGold bg-gothicGray text-gothicIvory font-gothic">
            <thead>
              <tr className="bg-gothicBlack text-gothicGold">
                <th className="px-4 py-2 border border-gothicGold">Campaign</th>
                <th className="px-4 py-2 border border-gothicGold">Timeframe</th>
                <th className="px-4 py-2 border border-gothicGold">Army</th>
                <th className="px-4 py-2 border border-gothicGold">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {mockCampaignHistory.map(c => (
                <tr key={c.id}>
                  <td className="border border-gothicGold px-4 py-2">{c.name}</td>
                  <td className="border border-gothicGold px-4 py-2">{c.end ? `${c.start} - ${c.end}` : `${c.start} - Present`}</td>
                  <td className="border border-gothicGold px-4 py-2">{c.army}</td>
                  <td className="border border-gothicGold px-4 py-2">{c.outcome ? c.outcome : (c.end ? "-" : "Ongoing")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
