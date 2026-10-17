import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { h as Download, i as Trash2, s as Printer, y as Check } from "../_libs/lucide-react.mjs";
import { n as cn, s as useGarage, t as AppShell } from "./app-shell-BxvYZkGx.mjs";
import { c as tally, i as SECTIONS, n as ITEMS, o as itemsForSection, s as sectionTally, t as Button } from "./button-C1nE-aBy.mjs";
import { r as Route$1 } from "./router-BUHos0nb.mjs";
import { t as StatusToggle } from "./status-toggle-DdCn-kXD.mjs";
import { n as Label, r as Progress, t as Input } from "./progress-ByY48qy4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/controle._id-CNJ_q7qz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChecklistRow({ item, status, note, onStatus, onNote }) {
	const [open, setOpen] = (0, import_react.useState)(Boolean(note));
	const showNote = open || status === "warn" || status === "fail" || Boolean(note);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: `item-${item.id}`,
		className: cn("scroll-mt-24 px-3 py-2.5 transition-colors duration-150", status === "fail" && "bg-bad/10", status === "warn" && "bg-warn/10", status === "ok" && "bg-ok/5"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display w-8 shrink-0 text-xl tabular-nums text-muted-foreground",
					children: item.num
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-w-0 flex-1 text-left text-sm text-foreground",
					onClick: () => setOpen((v) => !v),
					children: item.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusToggle, {
					value: status,
					onChange: onStatus
				})
			]
		}), showNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 ml-11",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: note ?? "",
				onChange: (e) => onNote(e.target.value),
				placeholder: "Note (optionnel)",
				className: "h-10"
			})
		}) : null]
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-28 w-full rounded-lg bg-background px-3 py-3 text-sm text-foreground shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-ring)] disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var FILTERS = [
	{
		id: "all",
		label: "Tous"
	},
	{
		id: "todo",
		label: "À faire"
	},
	{
		id: "ok",
		label: "OK"
	},
	{
		id: "warn",
		label: "Attention"
	},
	{
		id: "fail",
		label: "HS"
	}
];
function InspectionEditor() {
	const { id } = Route$1.useParams();
	const navigate = useNavigate();
	const inspection = useGarage((s) => s.inspections.find((i) => i.id === id));
	const update = useGarage((s) => s.updateInspection);
	const setStatus = useGarage((s) => s.setItemStatus);
	const setNote = useGarage((s) => s.setItemNote);
	const remove = useGarage((s) => s.deleteInspection);
	const setVehicle = useGarage((s) => s.setVehicle);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [section, setSection] = (0, import_react.useState)("all");
	const [pdfBusy, setPdfBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const hash = window.location.hash.replace(/^#/, "");
		if (!hash) return;
		document.getElementById(hash)?.scrollIntoView({ block: "center" });
	}, [id]);
	const stats = tally(inspection);
	const visible = (0, import_react.useMemo)(() => {
		return ITEMS.filter((item) => {
			if (section !== "all" && item.section !== section) return false;
			const s = inspection?.items[item.id];
			if (filter === "todo") return !s;
			if (filter === "ok" || filter === "warn" || filter === "fail") return s === filter;
			return true;
		});
	}, [
		filter,
		section,
		inspection
	]);
	if (!inspection) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl",
			children: "Contrôle introuvable"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Cette fiche n'est plus dans l'historique."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-4",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/controle",
				children: "Retour"
			})
		})
	] });
	const current = inspection;
	function complete() {
		update(id, { status: "complete" });
		setVehicle({
			km: current.km,
			plate: current.plate,
			year: current.year
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.2em] text-muted-foreground uppercase",
				children: inspection.status === "complete" ? "Fiche close" : "Brouillon"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl",
				children: "Check-list HS4"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/imprimer/$id",
							params: { id },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Imprimer"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						disabled: pdfBusy,
						onClick: () => {
							setPdfBusy(true);
							import("./inspection-pdf-BSxYkLun.mjs").then((mod) => mod.downloadInspectionPdf(current)).finally(() => setPdfBusy(false));
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), pdfBusy ? "PDF…" : "PDF"]
					}),
					inspection.status === "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "ok",
						onClick: complete,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), "Clôturer"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => update(id, { status: "draft" }),
						children: "Rouvrir"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
					label: "Date",
					value: inspection.date,
					type: "date",
					onChange: (v) => update(id, { date: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
					label: "Kilomètre",
					value: inspection.km,
					onChange: (v) => update(id, { km: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
					label: "Immatriculation",
					value: inspection.plate,
					className: "uppercase",
					onChange: (v) => update(id, { plate: v.toUpperCase() })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
					label: "Année",
					value: inspection.year,
					onChange: (v) => update(id, { year: v })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-14 z-30 -mx-4 mt-5 border-y border-border bg-background/95 px-4 py-3 backdrop-blur-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm tabular-nums text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: stats.done
							}),
							" / ",
							stats.total
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tabular-nums",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-ok",
								children: [stats.ok, " OK"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mx-2 text-warn",
								children: [stats.warn, " att."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-bad",
								children: [stats.fail, " HS"]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: stats.percent,
					className: "mt-2",
					barClassName: stats.fail > 0 ? "bg-bad" : stats.warn > 0 ? "bg-warn" : "bg-ok"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-2 overflow-x-auto pb-1",
					children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(f.id),
						className: cn("h-9 shrink-0 rounded-md px-3 text-xs tracking-[0.12em] uppercase transition-colors duration-150", filter === f.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"),
						children: f.label
					}, f.id))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mt-4 flex gap-2 overflow-x-auto pb-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionChip, {
				active: section === "all",
				onClick: () => setSection("all"),
				label: "Tout"
			}), SECTIONS.map((s) => {
				const st = sectionTally(inspection, s.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionChip, {
					active: section === s.id,
					onClick: () => setSection(s.id),
					label: s.title,
					count: `${st.done}/${st.total}`,
					alert: st.fail > 0
				}, s.id);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-6",
			children: [(section === "all" ? SECTIONS : SECTIONS.filter((s) => s.id === section)).map((s) => {
				const rows = itemsForSection(s.id).filter((item) => visible.some((v) => v.id === item.id));
				if (rows.length === 0) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-card py-2 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "flex items-baseline justify-between px-4 pt-3 pb-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg",
							children: s.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: s.blurb
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border/60",
						children: rows.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChecklistRow, {
							item,
							status: inspection.items[item.id],
							note: inspection.notes[item.id],
							onStatus: (st) => setStatus(id, item.id, st),
							onNote: (n) => setNote(id, item.id, n)
						}, item.id))
					})]
				}, s.id);
			}), visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-10 text-center text-sm text-muted-foreground",
				children: "Aucun point dans ce filtre."
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl",
					children: "Observation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-3",
					placeholder: "Notes de contrôle, bruits, fuites, pièces à commander…",
					value: inspection.observation,
					onChange: (e) => update(id, { observation: e.target.value })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maint, {
							label: "Vidange moteur faite le",
							value: inspection.maintenance.oilEngine,
							onChange: (v) => update(id, { maintenance: {
								...inspection.maintenance,
								oilEngine: v
							} })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maint, {
							label: "Vidange boîte faite le",
							value: inspection.maintenance.oilGearbox,
							onChange: (v) => update(id, { maintenance: {
								...inspection.maintenance,
								oilGearbox: v
							} })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maint, {
							label: "Changement de pneu",
							value: inspection.maintenance.tires,
							onChange: (v) => update(id, { maintenance: {
								...inspection.maintenance,
								tires: v
							} })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maint, {
							label: "Changement plaquette",
							value: inspection.maintenance.pads,
							onChange: (v) => update(id, { maintenance: {
								...inspection.maintenance,
								pads: v
							} })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "maint-other",
						children: "Divers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "maint-other",
						className: "mt-1.5",
						value: inspection.maintenance.other,
						onChange: (e) => update(id, { maintenance: {
							...inspection.maintenance,
							other: e.target.value
						} })
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => {
					if (window.confirm("Supprimer cette check-list ?")) {
						remove(id);
						navigate({ to: "/controle" });
					}
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Supprimer"]
			})
		})
	] });
}
function Meta({ label, value, onChange, type = "text", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type,
			value,
			onChange: (e) => onChange(e.target.value),
			className
		})]
	});
}
function Maint({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "date",
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function SectionChip({ active, onClick, label, count, alert }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex h-10 shrink-0 items-center gap-2 rounded-md px-3 text-xs tracking-[0.08em] uppercase transition-colors duration-150", active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"),
		children: [label, count ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("tabular-nums", alert && !active && "text-bad"),
			children: count
		}) : null]
	});
}
//#endregion
export { InspectionEditor as component };
