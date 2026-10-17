import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Inspection, ItemStatus, MaintenanceLog, Vehicle } from "./types";
import { todayISO, uid } from "./utils";

const EMPTY_MAINT: MaintenanceLog = {
  oilEngine: "",
  oilGearbox: "",
  tires: "",
  pads: "",
  other: "",
};

export function emptyInspection(vehicle: Vehicle): Inspection {
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
  };
}

type GarageState = {
  hydrated: boolean;
  vehicle: Vehicle;
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
};

export const useGarage = create<GarageState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      vehicle: { lastName: "", firstName: "", line: "", plate: "", year: "", km: "" },
      inspections: [],
      setHydrated: (v) => set({ hydrated: v }),
      setVehicle: (patch) =>
        set((s) => ({ vehicle: { ...s.vehicle, ...patch } })),
      addInspection: (insp) =>
        set((s) => ({ inspections: [insp, ...s.inspections] })),
      updateInspection: (id, patch) =>
        set((s) => ({
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
        })),
      setItemNote: (id, itemId, note) =>
        set((s) => ({
          inspections: s.inspections.map((i) => {
            if (i.id !== id) return i;
            const notes = { ...i.notes, [itemId]: note };
            return { ...i, notes, updatedAt: new Date().toISOString() };
          }),
        })),
      deleteInspection: (id) =>
        set((s) => ({
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
        };
        set((s) => ({ inspections: [copy, ...s.inspections] }));
        return copy;
      },
    }),
    {
      name: "atelier-hs4-v1",
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (s) => ({
        vehicle: s.vehicle,
        inspections: s.inspections,
      }),
    },
  ),
);

export function useInspection(id: string | undefined) {
  return useGarage((s) => s.inspections.find((i) => i.id === id));
}
