// lib/firestore/users.ts
import { db } from '../firebase';
import { collection, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { User } from '../../types/user';

export const usersCollection = collection(db, 'users');

export async function createUser(user: User) {
  await setDoc(doc(usersCollection, user.uid), user);
}

export async function getUser(uid: string): Promise<User | null> {
  const userDoc = await getDoc(doc(usersCollection, uid));
  return userDoc.exists() ? (userDoc.data() as User) : null;
}

export async function getUsers(): Promise<User[]> {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map(doc => doc.data() as User);
}
