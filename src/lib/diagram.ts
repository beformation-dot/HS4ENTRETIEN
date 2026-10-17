import type { SectionId } from "./types";

export type Hotspot = {
  id: string;
  x: number;
  y: number;
};

/** Percent positions of the printed numbers on /images/diagram.jpg. */
export const HOTSPOTS: Hotspot[] = [
  { id: "1", x: 85.8, y: 12.4 },
  { id: "2", x: 72.9, y: 18.8 },
  { id: "3", x: 81.8, y: 33 },
  { id: "4", x: 63.1, y: 28.5 },
  { id: "5", x: 84.3, y: 39.3 },
  { id: "6", x: 92.6, y: 39.9 },
  { id: "7", x: 92.1, y: 48.6 },
  { id: "8", x: 91.4, y: 56.4 },
  { id: "9", x: 93, y: 63.2 },
  { id: "10", x: 94.7, y: 70.3 },
  { id: "11", x: 80.4, y: 49.2 },
  { id: "12", x: 97.1, y: 77.8 },
  { id: "13", x: 72, y: 96.9 },
  { id: "14", x: 71, y: 90.9 },
  { id: "15", x: 71.2, y: 82.8 },
  { id: "16", x: 51.2, y: 91.3 },
  { id: "17", x: 41.1, y: 88.2 },
  { id: "18", x: 58.6, y: 91.3 },
  { id: "19", x: 75.1, y: 76.1 },
  { id: "20", x: 43.9, y: 77.5 },
  { id: "21", x: 51.3, y: 74.7 },
  { id: "22", x: 3.9, y: 71.1 },
  { id: "23", x: 18.1, y: 69.7 },
  { id: "24", x: 3.8, y: 29.5 },
  { id: "26", x: 26.7, y: 70 },
  { id: "27", x: 31.9, y: 66 },
  { id: "28", x: 6.8, y: 20.3 },
  { id: "32", x: 67.3, y: 10.8 },
  { id: "49", x: 38.9, y: 6.2 },
  { id: "62", x: 56.8, y: 36.1 },
];

export const SECTION_TONE: Record<SectionId, string> = {
  etat: "text-foreground",
  elec: "text-accent",
  freinage: "text-bad",
  essai: "text-warn",
  moteur: "text-ok",
  alim: "text-warn",
  divers: "text-muted-foreground",
};
