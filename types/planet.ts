// types/planet.ts
export interface Planet {
  id: string;
  name: string;
  type?: string;
  livability?: string;
  moons?: number;
  naturalResources?: string[];
  natives?: string;
  dayNightCycle?: string;
  positionFromSun?: number;
  createdBy: string; // user id
  createdAt: number;
}
