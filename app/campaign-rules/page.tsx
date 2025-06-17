"use client";
import { useState } from "react";

export default function CampaignRulesPage() {
  const [rules, setRules] = useState([
    { id: 1, text: "Each match must be reported within 24 hours." },
    { id: 2, text: "A player cannot play more than 3 matches per day." },
  ]);
  const [newRule, setNewRule] = useState("");

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRule.trim()) {
      setRules([...rules, { id: Date.now(), text: newRule.trim() }]);
      setNewRule("");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gothic text-gothicIvory font-gothic">
      <div className="card w-full max-w-md flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-gothic mb-4 text-gothicGold">Campaign Rules</h1>
        <ul className="mb-6 text-left list-disc list-inside text-gothicIvory">
          {rules.map(rule => (
            <li key={rule.id} className="mb-2 text-gothicGold font-gothic">{rule.text}</li>
          ))}
        </ul>
        <form onSubmit={handleAddRule} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a new rule"
            value={newRule}
            onChange={e => setNewRule(e.target.value)}
            className="flex-1 px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
          />
          <button
            type="submit"
            className="btn-gothic"
          >
            Add
          </button>
        </form>
      </div>
    </main>
  );
}
