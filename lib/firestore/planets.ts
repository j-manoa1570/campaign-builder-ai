// lib/firestore/planets.ts
import { db } from '../firebase';
import { collection, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Planet } from '../../types/planet';

export const planetsCollection = collection(db, 'planets');

export async function createPlanet(planet: Planet) {
  await setDoc(doc(planetsCollection, planet.id), planet);
}

export async function getPlanet(id: string): Promise<Planet | null> {
  const planetDoc = await getDoc(doc(planetsCollection, id));
  return planetDoc.exists() ? (planetDoc.data() as Planet) : null;
}

export async function getPlanets(): Promise<Planet[]> {
  const snapshot = await getDocs(planetsCollection);
  return snapshot.docs.map(doc => doc.data() as Planet);
}
