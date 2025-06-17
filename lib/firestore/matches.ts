// lib/firestore/matches.ts
import { db } from '../firebase';
import { collection, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Match } from '../../types/match';

export const matchesCollection = collection(db, 'matches');

export async function createMatch(match: Match) {
  await setDoc(doc(matchesCollection, match.id), match);
}

export async function getMatch(id: string): Promise<Match | null> {
  const matchDoc = await getDoc(doc(matchesCollection, id));
  return matchDoc.exists() ? (matchDoc.data() as Match) : null;
}

export async function getMatches(): Promise<Match[]> {
  const snapshot = await getDocs(matchesCollection);
  return snapshot.docs.map(doc => doc.data() as Match);
}
