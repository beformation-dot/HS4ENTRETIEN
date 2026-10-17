import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as useGarage, t as AppShell } from "./app-shell-BxvYZkGx.mjs";
import { n as NewInspectionButton, t as InspectionCard } from "./new-inspection-tv_X7Let.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/controle.index-Cy0gJ-3x.js
var import_jsx_runtime = require_jsx_runtime();
function ControleIndex() {
	const inspections = useGarage((s) => s.inspections);
	const drafts = inspections.filter((i) => i.status === "draft");
	const done = inspections.filter((i) => i.status === "complete");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.2em] text-muted-foreground uppercase",
				children: "Check-list HS4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl",
				children: "Contrôle"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewInspectionButton, {
				label: "Nouveau",
				size: "sm"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm text-muted-foreground",
			children: "Passez les points un par un. Trois états comme sur le papier : bon, mauvais, HS. Le brouillon s'enregistre tout seul."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl",
				children: "En cours"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-3",
				children: drafts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl bg-card p-5 text-sm text-muted-foreground shadow-[var(--shadow-border)]",
					children: "Aucun brouillon. Lancez une check-list pour ce Rewaco."
				}) : drafts.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectionCard, { inspection: i }, i.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl",
				children: "Contrôles clos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-3",
				children: done.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Pas encore de fiche close."
				}) : done.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectionCard, { inspection: i }, i.id))
			})]
		})
	] });
}
//#endregion
export { ControleIndex as component };
