"use client";
import { useState } from "react";

export default function UpdateCampaignPage() {
  const [campaignId, setCampaignId] = useState("");
  const [matchId, setMatchId] = useState("");
  const [updateType, setUpdateType] = useState("single");
  const [participant, setParticipant] = useState("");
  const [owner, setOwner] = useState("");
  const [approved, setApproved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call your backend or Firestore function to save the update and approval
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gothic text-gothicIvory font-gothic">
      <div className="card w-full max-w-md flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-gothic mb-4 text-gothicGold">Update Campaign</h1>
        {submitted ? (
          <div className="text-gothicGold font-semibold">Campaign update submitted!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Match ID (if updating a match)"
              value={matchId}
              onChange={e => setMatchId(e.target.value)}
              className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
            />
            <div className="flex gap-2 items-center">
              <label className="text-gothicIvory">
                <input
                  type="radio"
                  name="updateType"
                  value="single"
                  checked={updateType === "single"}
                  onChange={() => setUpdateType("single")}
                />
                Single Approval
              </label>
              <label className="text-gothicIvory">
                <input
                  type="radio"
                  name="updateType"
                  value="dual"
                  checked={updateType === "dual"}
                  onChange={() => setUpdateType("dual")}
                />
                Dual Approval
              </label>
            </div>
            {updateType === "dual" && (
              <>
                <input
                  type="text"
                  placeholder="Participant (for match verification)"
                  value={participant}
                  onChange={e => setParticipant(e.target.value)}
                  className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
                  required
                />
                <input
                  type="text"
                  placeholder="Campaign Owner"
                  value={owner}
                  onChange={e => setOwner(e.target.value)}
                  className="w-full px-3 py-2 border border-gothicGold rounded bg-gothicGray text-gothicIvory font-gothic"
                  required
                />
                <label className="block text-left text-gothicIvory">
                  <input
                    type="checkbox"
                    checked={approved}
                    onChange={e => setApproved(e.target.checked)}
                  />
                  <span className="ml-2">I verify this match update</span>
                </label>
              </>
            )}
            <button
              type="submit"
              className="btn-gothic w-full"
            >
              Submit Update
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
