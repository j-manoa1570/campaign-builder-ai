import { getCampaigns } from "../../lib/firestore/campaigns";
import Link from "next/link";

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();
  return (
    <div className="max-w-2xl mx-auto p-8 card">
      <h1 className="text-3xl font-quintessential mb-6">Campaigns</h1>
      <ul className="mb-6">
        {campaigns.map((campaign: any) => (
          <li key={campaign.id} className="mb-2 flex justify-between items-center">
            <Link href={`/campaigns/${campaign.id}`} className="text-gothicGold hover:underline">
              {campaign.name}
            </Link>
            {/* Optionally show status (running/completed) */}
          </li>
        ))}
      </ul>
      <Link href="/create-campaign" className="btn-gothic">Create New Campaign</Link>
    </div>
  );
}
