import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Inspection, ItemStatus, MaintenanceLog, Vehicle } from "./types";
import type { Account } from "./accounts";
import { useSession } from "./session";
import { todayISO, uid } from "./utils";

const EMPTY_MAINT: MaintenanceLog = {
  oilEngine: "",
  oilGearbox: "",
  tires: "",
  pads: "",
  other: "",
};

export function emptyInspection(vehicle: Vehicle, owner: string): Inspection {
  const now = new Date().toISOString();
  return {
    id: uid(),
    createdAt: now,
    updatedAt: now,
    date: todayISO(),
    km: vehicle.km,
    plate: vehicle.plate,
    year: vehicle.year,
    items: {},
    notes: {},
    observation: "",
    maintenance: { ...EMPTY_MAINT },
    status: "draft",
    owner,
  };
}

type GarageState = {
  hydrated: boolean;
  vehicle: Vehicle;
  vehicleUpdatedAt: string;
  dataUpdatedAt: string;
  tombstones: Record<string, string>;
  accounts: Account[];
  accountTombstones: Record<string, string>;
  inspections: Inspection[];
  setHydrated: (v: boolean) => void;
  setVehicle: (patch: Partial<Vehicle>) => void;
  addInspection: (insp: Inspection) => void;
  updateInspection: (id: string, patch: Partial<Inspection>) => void;
  setItemStatus: (
    id: string,
    itemId: string,
    status: ItemStatus | undefined,
  ) => void;
  setItemNote: (id: string, itemId: string, note: string) => void;
  deleteInspection: (id: string) => void;
  duplicateInspection: (id: string) => Inspection | null;
  saveAccount: (account: Account) => void;
  deleteAccount: (username: string) => void;
  replaceSynced: (snapshot: {
    vehicle: Vehicle;
    vehicleUpdatedAt: string;
    inspections: Inspection[];
    tombstones: Record<string, string>;
    accounts: Account[];
    accountTombstones: Record<string, string>;
    dataUpdatedAt: string;
  }) => void;
};

export const useGarage = create<GarageState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      vehicle: { lastName: "", firstName: "", line: "", plate: "", year: "", km: "" },
      vehicleUpdatedAt: "",
      dataUpdatedAt: "",
      tombstones: {},
      accounts: [],
      accountTombstones: {},
      inspections: [],
      setHydrated: (v) => set({ hydrated: v }),
      setVehicle: (patch) =>
        set((s) => ({
          vehicle: { ...s.vehicle, ...patch },
          vehicleUpdatedAt: new Date().toISOString(),
          dataUpdatedAt: new Date().toISOString(),
        })),
      addInspection: (insp) =>
        set((s) => ({
          inspections: [insp, ...s.inspections],
          dataUpdatedAt: new Date().toISOString(),
        })),
      updateInspection: (id, patch) =>
        set((s) => ({
          dataUpdatedAt: new Date().toISOString(),
          inspections: s.inspections.map((i) =>
            i.id === id
              ? { ...i, ...patch, updatedAt: new Date().toISOString() }
              : i,
          ),
        })),
      setItemStatus: (id, itemId, status) =>
        set((s) => ({
          inspections: s.inspections.map((i) => {
            if (i.id !== id) return i;
            const items = { ...i.items };
            if (!status) delete items[itemId];
            else items[itemId] = status;
            return { ...i, items, updatedAt: new Date().toISOString() };
          }),
          dataUpdatedAt: new Date().toISOString(),
        })),
      setItemNote: (id, itemId, note) =>
        set((s) => ({
          dataUpdatedAt: new Date().toISOString(),
          inspections: s.inspections.map((i) => {
            if (i.id !== id) return i;
            const notes = { ...i.notes, [itemId]: note };
            return { ...i, notes, updatedAt: new Date().toISOString() };
          }),
        })),
      deleteInspection: (id) =>
        set((s) => ({
          dataUpdatedAt: new Date().toISOString(),
          tombstones: { ...s.tombstones, [id]: new Date().toISOString() },
          inspections: s.inspections.filter((i) => i.id !== id),
        })),
      duplicateInspection: (id) => {
        const src = get().inspections.find((i) => i.id === id);
        if (!src) return null;
        const now = new Date().toISOString();
        const copy: Inspection = {
          ...src,
          id: uid(),
          createdAt: now,
          updatedAt: now,
          date: todayISO(),
          status: "draft",
          observation: src.observation,
          items: { ...src.items },
          notes: { ...src.notes },
          maintenance: { ...src.maintenance },
          owner: useSession.getState().username || src.owner,
        };
        set((s) => ({
          inspections: [copy, ...s.inspections],
          dataUpdatedAt: now,
        }));
        return copy;
      },
      saveAccount: (account) =>
        set((s) => ({
          dataUpdatedAt: new Date().toISOString(),
          accountTombstones: Object.fromEntries(
            Object.entries(s.accountTombstones ?? {}).filter(([name]) => name !== account.username),
          ),
          accounts: [
            account,
            ...(s.accounts ?? []).filter((item) => item.username !== account.username),
          ],
        })),
      deleteAccount: (username) =>
        set((s) => ({
          dataUpdatedAt: new Date().toISOString(),
          accountTombstones: { ...(s.accountTombstones ?? {}), [username]: new Date().toISOString() },
          accounts: (s.accounts ?? []).filter((item) => item.username !== username),
        })),
      replaceSynced: (snapshot) =>
        set({
          vehicle: snapshot.vehicle,
          vehicleUpdatedAt: snapshot.vehicleUpdatedAt,
          inspections: snapshot.inspections,
          tombstones: snapshot.tombstones,
          accounts: snapshot.accounts,
          accountTombstones: snapshot.accountTombstones,
          dataUpdatedAt: snapshot.dataUpdatedAt,
        }),
    }),
    {
      name: "atelier-hs4-v1",
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (s) => ({
        vehicle: s.vehicle,
        vehicleUpdatedAt: s.vehicleUpdatedAt,
        dataUpdatedAt: s.dataUpdatedAt,
        tombstones: s.tombstones,
        accounts: s.accounts,
        accountTombstones: s.accountTombstones,
        inspections: s.inspections,
      }),
    },
  ),
);

export function useInspection(id: string | undefined) {
  return useGarage((s) => s.inspections.find((i) => i.id === id));
}

export function claimLegacyInspections(username: string) {
  const { accounts, inspections } = useGarage.getState();
  if (!username || inspections.every((item) => item.owner)) return;
  const first = [...accounts].sort((a, b) => a.updatedAt.localeCompare(b.updatedAt))[0];
  if (!first || first.username !== username) return;
  useGarage.setState((s) => ({
    dataUpdatedAt: new Date().toISOString(),
    inspections: s.inspections.map((item) =>
      item.owner ? item : { ...item, owner: username },
    ),
  }));
}
