export type ItemStatus = "ok" | "warn" | "fail";

export type SectionId =
  | "etat"
  | "elec"
  | "freinage"
  | "essai"
  | "moteur"
  | "alim"
  | "divers";

export type ChecklistItem = {
  id: string;
  num: number;
  label: string;
  section: SectionId;
  hint?: string;
};

export type MaintenanceLog = {
  oilEngine: string;
  oilGearbox: string;
  tires: string;
  pads: string;
  other: string;
};

export type Inspection = {
  id: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  km: string;
  plate: string;
  year: string;
  items: Record<string, ItemStatus | undefined>;
  notes: Record<string, string | undefined>;
  observation: string;
  maintenance: MaintenanceLog;
  status: "draft" | "complete";
  owner?: string;
};

export type Vehicle = {
  lastName: string;
  firstName: string;
  line: string;
  plate: string;
  year: string;
  km: string;
};

export type StatusFilter = "all" | "todo" | "ok" | "warn" | "fail";
