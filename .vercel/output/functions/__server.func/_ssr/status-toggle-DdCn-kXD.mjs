import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Smile, c as Meh, p as Frown } from "../_libs/lucide-react.mjs";
import { n as cn } from "./app-shell-BxvYZkGx.mjs";
import { a as STATUS_META } from "./button-C1nE-aBy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-toggle-DdCn-kXD.js
var import_jsx_runtime = require_jsx_runtime();
var OPTIONS = [
	{
		value: "ok",
		Icon: Smile,
		active: "bg-ok text-ok-fg",
		idle: "text-ok/80 hover:bg-ok/15"
	},
	{
		value: "warn",
		Icon: Meh,
		active: "bg-warn text-warn-fg",
		idle: "text-warn hover:bg-warn/15"
	},
	{
		value: "fail",
		Icon: Frown,
		active: "bg-bad text-bad-fg",
		idle: "text-bad hover:bg-bad/15"
	}
];
function StatusToggle({ value, onChange, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "inline-flex rounded-md bg-muted p-0.5 shadow-[var(--shadow-border)]",
		role: "radiogroup",
		"aria-label": "État",
		children: OPTIONS.map(({ value: v, Icon, active, idle }) => {
			const selected = value === v;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "radio",
				"aria-checked": selected,
				"aria-label": STATUS_META[v].label,
				title: STATUS_META[v].label,
				onClick: () => onChange(selected ? void 0 : v),
				className: cn("inline-flex items-center justify-center rounded-sm transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.96]", compact ? "size-9" : "size-11", selected ? active : idle),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: compact ? "size-4" : "size-5",
					strokeWidth: 1.8
				})
			}, v);
		})
	});
}
//#endregion
export { StatusToggle as t };
