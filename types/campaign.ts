// types/campaign.ts
export interface Campaign {
  id: string;
  name: string;
  description?: string;
  createdBy: string; // user id
  createdAt: number;
  planetId?: string;
}
