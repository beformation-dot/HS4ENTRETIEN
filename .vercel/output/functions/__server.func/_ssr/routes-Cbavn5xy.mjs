import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as Gauge, m as Droplets, o as ShieldAlert, x as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as formatKm, i as formatDate, s as useGarage, t as AppShell } from "./app-shell-BxvYZkGx.mjs";
import { c as tally, n as ITEMS, t as Button } from "./button-C1nE-aBy.mjs";
import { n as Label, t as Input } from "./progress-ByY48qy4.mjs";
import { t as Badge } from "./badge-fKJxgTwD.mjs";
import { n as NewInspectionButton, t as InspectionCard } from "./new-inspection-tv_X7Let.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cbavn5xy.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const hydrated = useGarage((s) => s.hydrated);
	const vehicle = useGarage((s) => s.vehicle);
	const setVehicle = useGarage((s) => s.setVehicle);
	const inspections = useGarage((s) => s.inspections);
	const last = inspections[0];
	const lastT = last ? tally(last) : null;
	const drafts = inspections.filter((i) => i.status === "draft");
	const latestMaint = inspections.find((i) => i.maintenance.oilEngine || i.maintenance.oilGearbox || i.maintenance.tires || i.maintenance.pads)?.maintenance;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/hero.jpg",
				alt: "Atelier HS4 — Rewaco dans l'atelier",
				className: "h-auto w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between p-5 sm:p-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase",
						children: "Fiche atelier · Rewaco HS4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 max-w-md text-4xl sm:text-5xl",
						children: "Entretien & check-list"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-md text-sm text-muted-foreground",
						children: [ITEMS.length, " points de contrôle, plan annoté et carnet de vidanges — la feuille papier, dans la poche."]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewInspectionButton, { label: "Démarrer un contrôle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/plan",
							children: "Voir le plan"
						})
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-4 overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid sm:grid-cols-3 sm:divide-x sm:divide-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Gauge,
						label: "Kilométrage",
						value: hydrated ? formatKm(vehicle.km) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: ShieldAlert,
						label: "Dernier contrôle",
						value: hydrated && last ? formatDate(last.date) : "Aucun",
						hint: lastT ? `${lastT.fail} HS · ${lastT.warn} à surveiller` : `${ITEMS.length} points à passer`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Droplets,
						label: "Vidange moteur",
						value: hydrated && latestMaint?.oilEngine ? formatDate(latestMaint.oilEngine) : "Non renseignée"
					})
				]
			})
		}),
		drafts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Contrôle en cours",
				href: "/controle"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-3",
				children: drafts.slice(0, 2).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectionCard, { inspection: d }, d.id))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Fiche véhicule"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Ces infos pré-remplissent chaque nouvelle check-list."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Immatriculation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "uppercase",
								placeholder: "AA-123-BB",
								value: hydrated ? vehicle.plate : "",
								onChange: (e) => setVehicle({ plate: e.target.value.toUpperCase() })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Année mise en circulation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "2004",
								inputMode: "numeric",
								value: hydrated ? vehicle.year : "",
								onChange: (e) => setVehicle({ year: e.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Kilométrage actuel",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "42850",
								inputMode: "numeric",
								value: hydrated ? vehicle.km : "",
								onChange: (e) => setVehicle({ km: e.target.value })
							})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Historique",
				href: "/historique"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-3",
				children: !hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 rounded-xl bg-card" }) : inspections.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyHistory, {}) : inspections.slice(0, 3).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectionCard, { inspection: i }, i.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 grid gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/plan",
				className: "group overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/diagram.jpg",
					alt: "Plan annoté du HS4",
					className: "h-36 w-full object-cover object-center"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "Plan de contrôle"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Repérez chaque numéro sur le trike."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-muted-foreground" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/pieces",
				className: "group overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/engine.jpg",
					alt: "Moteur Cox du Rewaco HS4",
					className: "h-36 w-full object-cover object-center"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "Vendeurs de pièces"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Rewaco, Boom et Cox — les adresses du formulaire."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-muted-foreground" })]
				})]
			})]
		})
	] });
}
function Stat({ icon: Icon, label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-4",
					strokeWidth: 1.75
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium tracking-[0.14em] uppercase",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl tracking-[0.02em] tabular-nums",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
function SectionHead({ title, href }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: href,
			className: "text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase hover:text-foreground",
			children: "Tout voir"
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function EmptyHistory() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card p-6 text-center shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Vierge" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "Aucun contrôle enregistré. La check-list reste sur cet appareil."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewInspectionButton, {
					label: "Premier contrôle",
					size: "sm"
				})
			})
		]
	});
}
//#endregion
export { Home as component };
