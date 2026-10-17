import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as X, v as ChevronRight } from "../_libs/lucide-react.mjs";
import { a as formatKm, i as formatDate, n as cn, o as todayISO, r as emptyInspection, s as useGarage } from "./app-shell-BxvYZkGx.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { c as tally, n as ITEMS, t as Button } from "./button-C1nE-aBy.mjs";
import { n as Label, r as Progress, t as Input } from "./progress-ByY48qy4.mjs";
import { t as Badge } from "./badge-fKJxgTwD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-inspection-tv_X7Let.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InspectionCard({ inspection }) {
	const t = tally(inspection);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/controle/$id",
		params: { id: inspection.id },
		className: "block rounded-xl bg-card p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tracking-[0.04em]",
					children: formatDate(inspection.date)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: [formatKm(inspection.km), inspection.plate ? ` · ${inspection.plate}` : ""]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: inspection.status === "complete" ? "ok" : "default",
						children: inspection.status === "complete" ? "Clos" : "Brouillon"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted-foreground" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: t.percent,
				className: "mt-4",
				barClassName: t.fail > 0 ? "bg-bad" : t.warn > 0 ? "bg-warn" : "bg-ok"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex gap-3 text-xs tabular-nums text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t.percent, "%"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-ok",
						children: [t.ok, " OK"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-warn",
						children: [t.warn, " att."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-bad",
						children: [t.fail, " HS"]
					})
				]
			})
		]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-background/80", className),
		...props
	});
}
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 w-[min(28rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card p-5 text-card-foreground shadow-[var(--shadow-border)]", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Fermer"
		})]
	})]
})] }));
DialogContent.displayName = "DialogContent";
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-4 pr-8", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("text-xl text-foreground", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("mt-1 text-sm text-muted-foreground", className),
		...props
	});
}
function NewInspectionButton({ label = "Nouvelle check-list", size = "default" }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size,
		onClick: () => setOpen(true),
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewInspectionDialog, {
		open,
		onOpenChange: setOpen
	})] });
}
function NewInspectionDialog({ open, onOpenChange }) {
	const navigate = useNavigate();
	const vehicle = useGarage((s) => s.vehicle);
	const setVehicle = useGarage((s) => s.setVehicle);
	const addInspection = useGarage((s) => s.addInspection);
	const [date, setDate] = (0, import_react.useState)(todayISO());
	const [km, setKm] = (0, import_react.useState)(vehicle.km);
	const [plate, setPlate] = (0, import_react.useState)(vehicle.plate);
	const [year, setYear] = (0, import_react.useState)(vehicle.year);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setDate(todayISO());
		setKm(vehicle.km);
		setPlate(vehicle.plate);
		setYear(vehicle.year);
	}, [
		open,
		vehicle.km,
		vehicle.plate,
		vehicle.year
	]);
	function start() {
		setVehicle({
			km,
			plate,
			year
		});
		const insp = emptyInspection({
			km,
			plate,
			year
		});
		insp.date = date;
		addInspection(insp);
		onOpenChange(false);
		navigate({
			to: "/controle/$id",
			params: { id: insp.id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nouveau contrôle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
			"Identifiez le trike, puis parcourez les ",
			ITEMS.length,
			" points de la check-list HS4."
		] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Date",
					htmlFor: "insp-date",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "insp-date",
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Kilométrage",
					htmlFor: "insp-km",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "insp-km",
						inputMode: "numeric",
						placeholder: "ex. 42850",
						value: km,
						onChange: (e) => setKm(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "N° immatriculation",
						htmlFor: "insp-plate",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "insp-plate",
							className: "uppercase",
							placeholder: "AA-123-BB",
							value: plate,
							onChange: (e) => setPlate(e.target.value.toUpperCase())
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Mise en circulation",
						htmlFor: "insp-year",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "insp-year",
							inputMode: "numeric",
							placeholder: "2004",
							value: year,
							onChange: (e) => setYear(e.target.value)
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-2 w-full",
					onClick: start,
					children: "Ouvrir la check-list"
				})
			]
		})] })
	});
}
function Field({ label, htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor,
			children: label
		}), children]
	});
}
//#endregion
export { NewInspectionButton as n, InspectionCard as t };
