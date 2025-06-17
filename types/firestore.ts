// types/firestore.ts
import { User } from './user';
import { Campaign } from './campaign';
import { Planet } from './planet';
import { Match } from './match';

export interface FirestoreCollections {
  users: User;
  campaigns: Campaign;
  planets: Planet;
  matches: Match;
}
