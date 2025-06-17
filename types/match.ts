// types/match.ts
export interface Match {
  id: string;
  campaignId: string;
  planetId?: string;
  participants: string[]; // user ids
  result: string;
  createdAt: number;
  approvedBy: string[]; // user ids
}
