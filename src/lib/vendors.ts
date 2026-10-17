export type Vendor = {
  name: string;
  url: string;
  kind: "trike" | "cox";
  note: string;
};

export const VENDORS: Vendor[] = [
  {
    name: "René Sergeant",
    url: "http://pieces-trikes-base-cox-et-autres.com/",
    kind: "trike",
    note: "Rewaco / Boom",
  },
  {
    name: "Trike Riders",
    url: "https://www.trike-riders.fr/",
    kind: "trike",
    note: "Rewaco / Boom",
  },
  {
    name: "Byautopassion",
    url: "https://www.byautopassion.com/",
    kind: "cox",
    note: "Moteur Cox",
  },
  {
    name: "Mecatechnic",
    url: "https://www.mecatechnic.com/",
    kind: "cox",
    note: "Moteur Cox",
  },
  {
    name: "Car Concept",
    url: "https://www.car-concept.fr/",
    kind: "cox",
    note: "Moteur Cox",
  },
  {
    name: "E-Cox",
    url: "https://www.e-cox.fr/",
    kind: "cox",
    note: "Moteur Cox",
  },
  {
    name: "Paruzzi",
    url: "https://www.paruzzi.com/fr/",
    kind: "cox",
    note: "Moteur Cox",
  },
];
