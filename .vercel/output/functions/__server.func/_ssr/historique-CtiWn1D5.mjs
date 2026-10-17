import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as Copy, i as Trash2 } from "../_libs/lucide-react.mjs";
import { i as formatDate, s as useGarage, t as AppShell } from "./app-shell-BxvYZkGx.mjs";
import { t as Button } from "./button-C1nE-aBy.mjs";
import { n as NewInspectionButton, t as InspectionCard } from "./new-inspection-tv_X7Let.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/historique-CtiWn1D5.js
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	const inspections = useGarage((s) => s.inspections);
	const duplicate = useGarage((s) => s.duplicateInspection);
	const remove = useGarage((s) => s.deleteInspection);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.2em] text-muted-foreground uppercase",
				children: "Carnet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl",
				children: "Historique"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewInspectionButton, {
				label: "Nouveau",
				size: "sm"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted-foreground",
			children: "Toutes les check-lists restent sur cet appareil. Dupliquez une fiche pour repartir des mêmes constats."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-4",
			children: inspections.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-border)]",
				children: "Pas encore de contrôle enregistré."
			}) : inspections.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectionCard, { inspection: i }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => {
							const copy = duplicate(i.id);
							if (copy) navigate({
								to: "/controle/$id",
								params: { id: copy.id }
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "Reprendre"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => {
							if (window.confirm(`Supprimer le contrôle du ${formatDate(i.date)} ?`)) remove(i.id);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Supprimer"]
					})]
				})]
			}, i.id))
		})
	] });
}
//#endregion
export { HistoryPage as component };
