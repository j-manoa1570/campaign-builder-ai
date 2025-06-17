import { getCampaign } from "../../../lib/firestore/campaigns";
import { getPlanet } from "../../../lib/firestore/planets";
import Link from "next/link";

interface CampaignPageProps {
  params: { id: string };
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const campaign = await getCampaign(params.id);
  if (!campaign) return <div className="p-8">Campaign not found.</div>;
  const planet = campaign.planetId ? await getPlanet(campaign.planetId) : null;
  // TODO: Fetch campaign map, rules, history, and check if campaign is over and if user is campaign master
  const isCampaignMaster = true; // Placeholder, replace with real check
  const isOver = false; // Placeholder, replace with real check

  return (
    <div className="max-w-3xl mx-auto p-8 card">
      <h1 className="text-3xl font-quintessential mb-4">{campaign.name}</h1>
      {planet && (
        <div className="mb-4">
          <div className="font-bold">Planet:</div>
          <div>{planet.name}</div>
        </div>
      )}
      {/* Campaign Map Placeholder */}
      <div className="mb-4">
        <div className="font-bold">Campaign Map</div>
        <div className="bg-gothicGray rounded p-4 mt-2">[Map goes here]</div>
      </div>
      {/* Campaign Rules Placeholder */}
      <div className="mb-4">
        <div className="font-bold">Campaign Rules</div>
        <div className="bg-gothicGray rounded p-4 mt-2">[Rules go here]</div>
      </div>
      {/* Edit Button */}
      {isCampaignMaster && !isOver && (
        <Link href={`/update-campaign?id=${campaign.id}`} className="btn-gothic mb-4">Edit Campaign</Link>
      )}
      {/* Campaign History Placeholder */}
      <div className="mt-6">
        <div className="font-bold">Campaign History</div>
        <div className="bg-gothicGray rounded p-4 mt-2">[History goes here]</div>
      </div>
    </div>
  );
}
