import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn, r as emptyInspection, s as useGarage, t as AppShell } from "./app-shell-BxvYZkGx.mjs";
import { a as STATUS_META, n as ITEMS, r as ITEM_BY_ID, t as Button } from "./button-C1nE-aBy.mjs";
import { t as StatusToggle } from "./status-toggle-DdCn-kXD.mjs";
import { t as Badge } from "./badge-fKJxgTwD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plan-oIi2NvU5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Percent positions of the printed numbers on /images/diagram.jpg. */
var HOTSPOTS = [
	{
		id: "1",
		x: 85.8,
		y: 12.4
	},
	{
		id: "2",
		x: 72.9,
		y: 18.8
	},
	{
		id: "3",
		x: 81.8,
		y: 33
	},
	{
		id: "4",
		x: 63.1,
		y: 28.5
	},
	{
		id: "5",
		x: 84.3,
		y: 39.3
	},
	{
		id: "6",
		x: 92.6,
		y: 39.9
	},
	{
		id: "7",
		x: 92.1,
		y: 48.6
	},
	{
		id: "8",
		x: 91.4,
		y: 56.4
	},
	{
		id: "9",
		x: 93,
		y: 63.2
	},
	{
		id: "10",
		x: 94.7,
		y: 70.3
	},
	{
		id: "11",
		x: 80.4,
		y: 49.2
	},
	{
		id: "12",
		x: 97.1,
		y: 77.8
	},
	{
		id: "13",
		x: 72,
		y: 96.9
	},
	{
		id: "14",
		x: 71,
		y: 90.9
	},
	{
		id: "15",
		x: 71.2,
		y: 82.8
	},
	{
		id: "16",
		x: 51.2,
		y: 91.3
	},
	{
		id: "17",
		x: 41.1,
		y: 88.2
	},
	{
		id: "18",
		x: 58.6,
		y: 91.3
	},
	{
		id: "19",
		x: 75.1,
		y: 76.1
	},
	{
		id: "20",
		x: 43.9,
		y: 77.5
	},
	{
		id: "21",
		x: 51.3,
		y: 74.7
	},
	{
		id: "22",
		x: 3.9,
		y: 71.1
	},
	{
		id: "23",
		x: 18.1,
		y: 69.7
	},
	{
		id: "24",
		x: 3.8,
		y: 29.5
	},
	{
		id: "26",
		x: 26.7,
		y: 70
	},
	{
		id: "27",
		x: 31.9,
		y: 66
	},
	{
		id: "28",
		x: 6.8,
		y: 20.3
	},
	{
		id: "32",
		x: 67.3,
		y: 10.8
	},
	{
		id: "49",
		x: 38.9,
		y: 6.2
	},
	{
		id: "62",
		x: 56.8,
		y: 36.1
	}
];
function PlanPage() {
	const inspections = useGarage((s) => s.inspections);
	const vehicle = useGarage((s) => s.vehicle);
	const addInspection = useGarage((s) => s.addInspection);
	const setItemStatus = useGarage((s) => s.setItemStatus);
	const navigate = useNavigate();
	const [activeId, setActiveId] = (0, import_react.useState)("1");
	const draft = inspections.find((i) => i.status === "draft") ?? inspections[0] ?? null;
	const item = ITEM_BY_ID[activeId] ?? ITEMS[0];
	const status = draft?.items[item.id];
	function ensureDraft() {
		if (draft) return draft.id;
		const insp = emptyInspection(vehicle);
		addInspection(insp);
		return insp.id;
	}
	function openPoint(itemId) {
		setActiveId(itemId);
		const inspId = ensureDraft();
		navigate({
			to: "/controle/$id",
			params: { id: inspId },
			hash: `item-${itemId}`
		});
	}
	function onStatus(next) {
		const id = ensureDraft();
		setItemStatus(id, item.id, next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-[0.2em] text-muted-foreground uppercase",
			children: "Repérage"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-3xl",
			children: "Plan du trike"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted-foreground",
			children: "Schéma du formulaire. Touchez un numéro pour ouvrir ce point dans la check-list."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-5 overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/diagram.jpg",
				alt: "Schéma annoté du Rewaco HS4, formulaire d'entretien",
				className: "w-full bg-paper"
			}), HOTSPOTS.map((h) => {
				const point = ITEM_BY_ID[h.id];
				if (!point) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					title: `${point.num}. ${point.label}`,
					"aria-label": `Point ${point.num}, ${point.label}`,
					onClick: () => openPoint(h.id),
					style: {
						left: `${h.x}%`,
						top: `${h.y}%`
					},
					className: "absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-[var(--shadow-border)] sm:size-9",
					children: point.num
				}, h.id);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-xs tracking-[0.14em] text-muted-foreground uppercase",
					children: ["Point", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "mt-1.5 h-11 w-full rounded-md bg-background px-3 text-sm text-foreground normal-case tracking-normal shadow-[var(--shadow-border)]",
						value: item.id,
						onChange: (e) => setActiveId(e.target.value),
						children: ITEMS.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: it.id,
							children: [
								it.num,
								". ",
								it.label
							]
						}, it.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tabular-nums",
						children: item.num
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl normal-case tracking-normal",
						children: item.label
					})] }), status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: status === "ok" ? "ok" : status === "warn" ? "warn" : "fail",
						children: STATUS_META[status].short
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Non noté" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusToggle, {
						value: status,
						onChange: onStatus
					}), draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/controle/$id",
							params: { id: draft.id },
							children: "Ouvrir la fiche"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Le premier point crée un brouillon."
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/avant.jpg",
						alt: "Roue avant du trike",
						className: "h-44 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.14em] text-muted-foreground uppercase",
							children: "Avant"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: "Roue, fourche et frein avant"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/engine.jpg",
						alt: "Moteur Cox aircooled",
						className: "h-44 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.14em] text-muted-foreground uppercase",
							children: "Points 47–61"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: "Moteur Cox — carbu, allumage, courroie"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/arriere.jpg",
						alt: "Roue et bras arrière du trike",
						className: "h-44 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.14em] text-muted-foreground uppercase",
							children: "Arrière"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: "Roue, bras et soufflets"
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					swatch: "bg-ok",
					label: "Bon état"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					swatch: "bg-warn",
					label: "Mauvais état"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					swatch: "bg-bad",
					label: "HS / ne fonctionne pas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					swatch: "bg-muted",
					label: "Non noté"
				})
			]
		})
	] });
}
function Legend({ swatch, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2.5 rounded-full", swatch) }), label]
	});
}
//#endregion
export { PlanPage as component };
