import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { _ as ClipboardCheck, d as History, l as Map, n as Wrench, u as LayoutGrid } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-BxvYZkGx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatDate(iso) {
	if (!iso) return "—";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return new Intl.DateTimeFormat("fr-FR", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	}).format(d);
}
function formatKm(n) {
	const v = typeof n === "string" ? Number(n.replace(/\s/g, "")) : n;
	if (v == null || Number.isNaN(v)) return "—";
	return `${new Intl.NumberFormat("fr-FR").format(v)} km`;
}
function todayISO() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function uid() {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
	return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function Logo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2.5 text-current", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 40 28",
			className: "h-6 w-8 text-primary",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "8",
					cy: "20",
					r: "5",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "18",
					cy: "20",
					r: "5",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "20",
					r: "4.2",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M8 20h10M18 20c3-8 8-11 14-12",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.7",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M14 12h8",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.7",
					strokeLinecap: "round"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-lg font-semibold tracking-[0.14em] uppercase",
			children: "Atelier HS4"
		})]
	});
}
var EMPTY_MAINT = {
	oilEngine: "",
	oilGearbox: "",
	tires: "",
	pads: "",
	other: ""
};
function emptyInspection(vehicle) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
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
		status: "draft"
	};
}
var useGarage = create()(persist((set, get) => ({
	hydrated: false,
	vehicle: {
		plate: "",
		year: "",
		km: ""
	},
	inspections: [],
	setHydrated: (v) => set({ hydrated: v }),
	setVehicle: (patch) => set((s) => ({ vehicle: {
		...s.vehicle,
		...patch
	} })),
	addInspection: (insp) => set((s) => ({ inspections: [insp, ...s.inspections] })),
	updateInspection: (id, patch) => set((s) => ({ inspections: s.inspections.map((i) => i.id === id ? {
		...i,
		...patch,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	} : i) })),
	setItemStatus: (id, itemId, status) => set((s) => ({ inspections: s.inspections.map((i) => {
		if (i.id !== id) return i;
		const items = { ...i.items };
		if (!status) delete items[itemId];
		else items[itemId] = status;
		return {
			...i,
			items,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
	}) })),
	setItemNote: (id, itemId, note) => set((s) => ({ inspections: s.inspections.map((i) => {
		if (i.id !== id) return i;
		const notes = {
			...i.notes,
			[itemId]: note
		};
		return {
			...i,
			notes,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
	}) })),
	deleteInspection: (id) => set((s) => ({ inspections: s.inspections.filter((i) => i.id !== id) })),
	duplicateInspection: (id) => {
		const src = get().inspections.find((i) => i.id === id);
		if (!src) return null;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const copy = {
			...src,
			id: uid(),
			createdAt: now,
			updatedAt: now,
			date: todayISO(),
			status: "draft",
			observation: src.observation,
			items: { ...src.items },
			notes: { ...src.notes },
			maintenance: { ...src.maintenance }
		};
		set((s) => ({ inspections: [copy, ...s.inspections] }));
		return copy;
	}
}), {
	name: "atelier-hs4-v1",
	skipHydration: true,
	onRehydrateStorage: () => (state) => {
		state?.setHydrated(true);
	},
	partialize: (s) => ({
		vehicle: s.vehicle,
		inspections: s.inspections
	})
}));
var NAV = [
	{
		to: "/",
		label: "Accueil",
		icon: LayoutGrid,
		match: (p) => p === "/"
	},
	{
		to: "/controle",
		label: "Contrôle",
		icon: ClipboardCheck,
		match: (p) => p.startsWith("/controle")
	},
	{
		to: "/plan",
		label: "Plan",
		icon: Map,
		match: (p) => p.startsWith("/plan")
	},
	{
		to: "/pieces",
		label: "Pièces",
		icon: Wrench,
		match: (p) => p.startsWith("/pieces")
	},
	{
		to: "/historique",
		label: "Historique",
		icon: History,
		match: (p) => p.startsWith("/historique") || p.startsWith("/imprimer")
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		Promise.resolve(useGarage.persist.rehydrate()).then(() => {
			useGarage.getState().setHydrated(true);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "no-print sticky top-0 z-40 bg-ink text-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "shrink-0",
						"aria-label": "Atelier HS4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "text-paper" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-0 md:flex",
						children: NAV.map((item) => {
							const active = item.match(pathname);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("relative inline-flex h-14 items-center px-3.5 text-sm transition-colors duration-150", active ? "text-paper" : "text-paper/55 hover:text-paper"),
								children: [item.label, active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-3 bottom-0 h-0.5 bg-primary" }) : null]
							}, item.to);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-5xl px-4 pt-6 pb-28 md:pb-12",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "no-print fixed right-0 bottom-0 left-0 z-40 border-t border-border bg-ink pb-[env(safe-area-inset-bottom)] md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-5",
					children: NAV.map((item) => {
						const active = item.match(pathname);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-xs", active ? "text-primary" : "text-muted-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4",
								strokeWidth: active ? 2.2 : 1.75
							}), item.label]
						}) }, item.to);
					})
				})
			})
		]
	});
}
//#endregion
export { formatKm as a, formatDate as i, cn as n, todayISO as o, emptyInspection as r, useGarage as s, AppShell as t };
