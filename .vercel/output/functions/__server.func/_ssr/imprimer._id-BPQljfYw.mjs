import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Smile, c as Meh, h as Download, p as Frown, s as Printer } from "../_libs/lucide-react.mjs";
import { a as formatKm, i as formatDate, n as cn, s as useGarage, t as AppShell } from "./app-shell-BxvYZkGx.mjs";
import { c as tally, i as SECTIONS, n as ITEMS, o as itemsForSection, t as Button } from "./button-C1nE-aBy.mjs";
import { n as Route } from "./router-BUHos0nb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/imprimer._id-BPQljfYw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PrintPage() {
	const { id } = Route.useParams();
	const inspection = useGarage((s) => s.inspections.find((i) => i.id === id));
	const update = useGarage((s) => s.updateInspection);
	const [pdfBusy, setPdfBusy] = (0, import_react.useState)(false);
	if (!inspection) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-3xl",
		children: "Fiche introuvable"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		className: "mt-4",
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/historique",
			children: "Retour"
		})
	})] });
	const stats = tally(inspection);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "no-print mb-6 flex flex-wrap items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl",
			children: "Impression"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Mise en page proche du formulaire papier."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				disabled: pdfBusy,
				onClick: () => {
					setPdfBusy(true);
					import("./inspection-pdf-BSxYkLun.mjs").then((mod) => mod.downloadInspectionPdf(inspection)).finally(() => setPdfBusy(false));
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), pdfBusy ? "PDF…" : "Télécharger le PDF"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => window.print(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Imprimer"]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "print-sheet rounded-xl bg-paper p-5 text-ink shadow-[var(--shadow-border)] print:rounded-none print:bg-white print:p-0 print:shadow-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b-2 border-ink pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-center text-lg tracking-[0.12em] uppercase",
						children: "Entretien et check-list de vérification"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-center text-2xl tracking-[0.16em] uppercase",
						children: "Trike Rewaco HS4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								label: "Date",
								value: formatDate(inspection.date)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								label: "Kilomètre",
								value: formatKm(inspection.km)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								label: "N° immatriculation",
								value: inspection.plate || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								label: "Année",
								value: inspection.year || "—"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 columns-1 gap-6 sm:columns-2 print:columns-2",
				children: SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mb-4 break-inside-avoid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "bg-ink px-2 py-1 font-display text-xs tracking-[0.16em] text-paper uppercase",
						children: s.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: itemsForSection(s.id).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2 border-b border-ink/15 py-1 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-5 tabular-nums text-ink/60",
								children: item.num
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [item.label, inspection.notes[item.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "print-note mt-0.5 block text-xs italic",
									children: inspection.notes[item.id]
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marks, { value: inspection.items[item.id] })
						]
					}, item.id)) })]
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 border-t-2 border-ink pt-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display tracking-[0.12em] uppercase",
						children: "Observations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "print-note mt-1 min-h-20 w-full resize-y bg-transparent text-sm focus-visible:outline-none",
						value: inspection.observation,
						placeholder: "Ajouter une observation avant d'imprimer…",
						onChange: (e) => update(id, { observation: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								label: "Vidange moteur",
								value: formatDate(inspection.maintenance.oilEngine)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								label: "Vidange boîte",
								value: formatDate(inspection.maintenance.oilGearbox)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								label: "Changement pneu",
								value: inspection.maintenance.tires || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								label: "Changement plaquette",
								value: inspection.maintenance.pads || "—"
							})
						]
					}),
					inspection.maintenance.other ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs",
						children: ["Divers : ", inspection.maintenance.other]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-ink/60",
						children: [
							stats.ok,
							" bon état · ",
							stats.warn,
							" mauvais · ",
							stats.fail,
							" HS ·",
							" ",
							stats.todo,
							" non notés / ",
							ITEMS.length
						]
					})
				]
			})
		]
	})] });
}
function Cell({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-ink/20 px-2 py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] tracking-[0.12em] uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: value
		})]
	});
}
function Marks({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex gap-0.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
				Icon: Smile,
				on: value === "ok",
				tone: "text-ok"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
				Icon: Meh,
				on: value === "warn",
				tone: "text-warn"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
				Icon: Frown,
				on: value === "fail",
				tone: "text-bad"
			})
		]
	});
}
function Mark({ Icon, on, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex size-5 items-center justify-center rounded-sm border border-ink/25", on ? tone : "text-ink/20"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-3.5",
			strokeWidth: on ? 2.2 : 1.4
		})
	});
}
//#endregion
export { PrintPage as component };
