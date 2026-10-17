import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { emptyInspection, useGarage } from "@/lib/store";
import { ITEMS } from "@/lib/checklist";
import { todayISO } from "@/lib/utils";

export function NewInspectionButton({
  label = "Nouvelle check-list",
  size = "default",
}: {
  label?: string;
  size?: "default" | "lg" | "sm";
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size={size} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <NewInspectionDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export function NewInspectionDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const vehicle = useGarage((s) => s.vehicle);
  const setVehicle = useGarage((s) => s.setVehicle);
  const addInspection = useGarage((s) => s.addInspection);

  const [date, setDate] = useState(todayISO());
  const [km, setKm] = useState(vehicle.km);
  const [plate, setPlate] = useState(vehicle.plate);
  const [year, setYear] = useState(vehicle.year);

  useEffect(() => {
    if (!open) return;
    setDate(todayISO());
    setKm(vehicle.km);
    setPlate(vehicle.plate);
    setYear(vehicle.year);
  }, [open, vehicle.km, vehicle.plate, vehicle.year]);

  function start() {
    setVehicle({ km, plate, year });
    const insp = emptyInspection({ ...vehicle, km, plate, year });
    insp.date = date;
    addInspection(insp);
    onOpenChange(false);
    void navigate({ to: "/controle/$id", params: { id: insp.id } });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau contrôle</DialogTitle>
          <DialogDescription>
            Identifiez le trike, puis parcourez les {ITEMS.length} points de la
            check-list HS4.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <Field label="Date" htmlFor="insp-date">
            <Input
              id="insp-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Field>
          <Field label="Kilométrage" htmlFor="insp-km">
            <Input
              id="insp-km"
              inputMode="numeric"
              placeholder="ex. 42850"
              value={km}
              onChange={(e) => setKm(e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="N° immatriculation" htmlFor="insp-plate">
              <Input
                id="insp-plate"
                className="uppercase"
                placeholder="AA-123-BB"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
              />
            </Field>
            <Field label="Mise en circulation" htmlFor="insp-year">
              <Input
                id="insp-year"
                inputMode="numeric"
                placeholder="2004"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Field>
          </div>
          <Button className="mt-2 w-full" onClick={start}>
            Ouvrir la check-list
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
