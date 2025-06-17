"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createCampaign } from "../../lib/firestore/campaigns";
import { getPlanets, createPlanet } from "../../lib/firestore/planets";
import { v4 as uuidv4 } from "uuid";
import { Planet } from "../../types/planet";
import { Campaign } from "../../types/campaign";

const CAMPAIGN_TYPES = [
  { value: "planet-general", label: "Planet General" },
  { value: "planet-specific", label: "Planet Specific" },
  { value: "system-wide", label: "System Wide" },
];

const WIN_CONDITIONS = {
  "planet-general": ["Matches Win/Lose", "Points"],
  "planet-specific": ["% Controlled"],
  "system-wide": ["Matches Win/Lose", "Points", "Planets Controlled"],
};

export default function CreateCampaignPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState(CAMPAIGN_TYPES[0].value);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [selectedPlanets, setSelectedPlanets] = useState<string[]>([]);
  const [showPlanetForm, setShowPlanetForm] = useState<boolean | number>(false);
  const [newPlanetName, setNewPlanetName] = useState("");
  const [territories, setTerritories] = useState(1);
  const [winCondition, setWinCondition] = useState(WIN_CONDITIONS[CAMPAIGN_TYPES[0].value][0]);
  const [numTeams, setNumTeams] = useState(2);
  const [teamNames, setTeamNames] = useState<string[]>(["", ""]);
  const [teamPlayers, setTeamPlayers] = useState<number[]>([1, 1]);
  const [numSystemPlanets, setNumSystemPlanets] = useState(2);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch planets on mount
  useEffect(() => {
    getPlanets().then(setPlanets);
  }, []);

  // Handlers for adding new planet
  const handleAddPlanet = async (idx?: number) => {
    if (!newPlanetName) return;
    const planet: Planet = {
      id: uuidv4(),
      name: newPlanetName,
      createdBy: "user-id-placeholder", // Replace with actual user id
      createdAt: Date.now(),
    };
    await createPlanet(planet);
    const updatedPlanets = await getPlanets();
    setPlanets(updatedPlanets);
    setNewPlanetName("");
    if (typeof idx === "number") {
      setShowPlanetForm(false);
      // Optionally auto-select the new planet
      const arr = [...selectedPlanets];
      arr[idx] = planet.id;
      setSelectedPlanets(arr);
    } else {
      setShowPlanetForm(false);
      setSelectedPlanets([planet.id]);
    }
  };

  // Handlers for campaign type change
  useEffect(() => {
    setWinCondition(WIN_CONDITIONS[type][0]);
    setSelectedPlanets([]);
    if (type === "system-wide") {
      setNumSystemPlanets(2);
    }
  }, [type]);

  // Handlers for team changes
  const handleNumTeamsChange = (n: number) => {
    setNumTeams(n);
    setTeamNames(Array(n).fill(""));
    setTeamPlayers(Array(n).fill(1));
  };

  // Handler for save
  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const campaign: Campaign = {
        id: uuidv4(),
        name,
        createdBy: "user-id-placeholder", // Replace with actual user id
        createdAt: Date.now(),
        planetId: selectedPlanets[0], // For system-wide, you may want to store an array
      };
      await createCampaign(campaign);
      // TODO: Save additional campaign details (type, winCondition, teams, etc.)
      router.push("/campaign-history");
    } catch (e: any) {
      setError(e.message || "Failed to save campaign");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 card">
      <h1 className="text-3xl font-quintessential mb-6">Create Campaign</h1>
      {/* Campaign Name */}
      <label className="block mb-2 font-bold">Campaign Name</label>
      <input
        className="w-full mb-4 p-2 rounded border"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter campaign name"
      />
      {/* Campaign Type */}
      <label className="block mb-2 font-bold">Campaign Type</label>
      <select
        className="w-full mb-4 p-2 rounded border"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        {CAMPAIGN_TYPES.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {/* Planet Selection/Creation */}
      {(type === "planet-general" || type === "planet-specific") && (
        <div className="mb-4">
          <label className="block mb-2 font-bold">Select Planet</label>
          <select
            className="w-full mb-2 p-2 rounded border"
            value={selectedPlanets[0] || ""}
            onChange={e => setSelectedPlanets([e.target.value])}
          >
            <option value="">-- Select --</option>
            {planets.map((p: Planet) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <button className="btn-gothic mt-2" onClick={() => setShowPlanetForm(true)} type="button">+ New Planet</button>
          {showPlanetForm === true && (
            <div className="mt-2">
              <input
                className="w-full mb-2 p-2 rounded border"
                value={newPlanetName}
                onChange={e => setNewPlanetName(e.target.value)}
                placeholder="Planet Name"
              />
              <button className="btn-gothic" onClick={() => handleAddPlanet()} type="button">Save Planet</button>
            </div>
          )}
        </div>
      )}
      {type === "system-wide" && (
        <div className="mb-4">
          <label className="block mb-2 font-bold">Number of Planets</label>
          <input
            type="number"
            min={2}
            max={10}
            className="w-full mb-2 p-2 rounded border"
            value={numSystemPlanets}
            onChange={e => {
              setNumSystemPlanets(Number(e.target.value));
              setSelectedPlanets(Array(Number(e.target.value)).fill(""));
            }}
          />
          {[...Array(numSystemPlanets)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <select
                className="flex-1 p-2 rounded border"
                value={selectedPlanets[idx] || ""}
                onChange={e => {
                  const arr = [...selectedPlanets];
                  arr[idx] = e.target.value;
                  setSelectedPlanets(arr);
                }}
              >
                <option value="">-- Select --</option>
                {planets.map((p: Planet) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button className="btn-gothic" onClick={() => setShowPlanetForm(idx)} type="button">+ New</button>
              {showPlanetForm === idx && (
                <div className="mt-2">
                  <input
                    className="w-full mb-2 p-2 rounded border"
                    value={newPlanetName}
                    onChange={e => setNewPlanetName(e.target.value)}
                    placeholder="Planet Name"
                  />
                  <button className="btn-gothic" onClick={() => handleAddPlanet(idx)} type="button">Save Planet</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Win Condition */}
      <label className="block mb-2 font-bold">Win Condition</label>
      <select
        className="w-full mb-4 p-2 rounded border"
        value={winCondition}
        onChange={e => setWinCondition(e.target.value)}
        disabled={type === "planet-specific"}
      >
        {WIN_CONDITIONS[type].map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {/* Territories (Planet Specific) */}
      {type === "planet-specific" && (
        <div className="mb-4">
          <label className="block mb-2 font-bold">Number of Territories</label>
          <input
            type="number"
            min={1}
            max={20}
            className="w-full mb-2 p-2 rounded border"
            value={territories}
            onChange={e => setTerritories(Number(e.target.value))}
          />
          <div className="text-sm text-gothicGold">Win Condition: % Controlled (Tie Breaker: Points)</div>
        </div>
      )}
      {/* Teams */}
      <label className="block mb-2 font-bold">Number of Teams</label>
      <select
        className="w-full mb-4 p-2 rounded border"
        value={numTeams}
        onChange={e => handleNumTeamsChange(Number(e.target.value))}
      >
        {[2, 3, 4, 5, 6].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      {teamNames.map((name, idx) => (
        <div key={idx} className="mb-2 flex gap-2 items-center">
          <input
            className="flex-1 p-2 rounded border"
            value={teamNames[idx]}
            onChange={e => {
              const arr = [...teamNames];
              arr[idx] = e.target.value;
              setTeamNames(arr);
            }}
            placeholder={`Team ${idx + 1} Name`}
          />
          <input
            type="number"
            min={1}
            max={10}
            className="w-24 p-2 rounded border"
            value={teamPlayers[idx]}
            onChange={e => {
              const arr = [...teamPlayers];
              arr[idx] = Number(e.target.value);
              setTeamPlayers(arr);
            }}
            placeholder="Players"
          />
        </div>
      ))}
      {/* Save Button */}
      <button className="btn-gothic w-full mt-6" onClick={handleSave} disabled={saving} type="button">
        {saving ? "Saving..." : "Save Campaign"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
