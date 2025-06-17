// lib/firestore/campaigns.ts
import { db } from '../firebase';
import { collection, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Campaign } from '../../types/campaign';

export const campaignsCollection = collection(db, 'campaigns');

export async function createCampaign(campaign: Campaign) {
  await setDoc(doc(campaignsCollection, campaign.id), campaign);
}

export async function getCampaign(id: string): Promise<Campaign | null> {
  const campaignDoc = await getDoc(doc(campaignsCollection, id));
  return campaignDoc.exists() ? (campaignDoc.data() as Campaign) : null;
}

export async function getCampaigns(): Promise<Campaign[]> {
  const snapshot = await getDocs(campaignsCollection);
  return snapshot.docs.map(doc => doc.data() as Campaign);
}
