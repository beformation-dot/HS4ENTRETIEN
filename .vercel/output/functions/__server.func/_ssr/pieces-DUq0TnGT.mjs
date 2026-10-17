import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-BxvYZkGx.mjs";
import { t as Badge } from "./badge-fKJxgTwD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pieces-DUq0TnGT.js
var import_jsx_runtime = require_jsx_runtime();
var VENDORS = [
	{
		name: "René Sergeant",
		url: "http://pieces-trikes-base-cox-et-autres.com/",
		kind: "trike",
		note: "Rewaco / Boom"
	},
	{
		name: "Trike Riders",
		url: "https://www.trike-riders.fr/",
		kind: "trike",
		note: "Rewaco / Boom"
	},
	{
		name: "Byautopassion",
		url: "https://www.byautopassion.com/",
		kind: "cox",
		note: "Moteur Cox"
	},
	{
		name: "Mecatechnic",
		url: "https://www.mecatechnic.com/",
		kind: "cox",
		note: "Moteur Cox"
	},
	{
		name: "Car Concept",
		url: "https://www.car-concept.fr/",
		kind: "cox",
		note: "Moteur Cox"
	},
	{
		name: "E-Cox",
		url: "https://www.e-cox.fr/",
		kind: "cox",
		note: "Moteur Cox"
	},
	{
		name: "Paruzzi",
		url: "https://www.paruzzi.com/fr/",
		kind: "cox",
		note: "Moteur Cox"
	}
];
function PiecesPage() {
	const trikes = VENDORS.filter((v) => v.kind === "trike");
	const cox = VENDORS.filter((v) => v.kind === "cox");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-[0.2em] text-muted-foreground uppercase",
			children: "Fournisseurs"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-3xl",
			children: "Pièces à connaître"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted-foreground",
			children: "Les vendeurs listés au verso du formulaire d'entretien HS4 — châssis Rewaco / Boom et moteur Cox."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			title: "Trike Boom et Rewaco",
			items: trikes
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			title: "Pièces moteur Cox",
			items: cox
		})
	] });
}
function Group({ title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 grid gap-2",
			children: items.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: v.url,
				target: "_blank",
				rel: "noreferrer",
				className: "flex items-center justify-between gap-3 rounded-xl bg-card px-4 py-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm text-foreground",
						children: v.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 truncate text-xs text-muted-foreground",
						children: v.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex shrink-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "hidden sm:inline-flex",
						children: v.note
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-muted-foreground" })]
				})]
			}) }, v.url))
		})]
	});
}
//#endregion
export { PiecesPage as component };
