import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./app-shell-BxvYZkGx.mjs";
import { u as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-C1nE-aBy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [
	{
		id: "etat",
		title: "État du trike",
		blurb: "Carrosserie, train avant, pneus, commandes"
	},
	{
		id: "elec",
		title: "Électricité",
		blurb: "Faisceau, fusibles, batterie, contact"
	},
	{
		id: "freinage",
		title: "Freinage",
		blurb: "Disques, plaquettes, hydraulique"
	},
	{
		id: "essai",
		title: "Essai de freinage",
		blurb: "Marche avant, arrière, frein à main"
	},
	{
		id: "moteur",
		title: "Moteur",
		blurb: "Cox aircooled — niveaux, allumage, carbu"
	},
	{
		id: "alim",
		title: "Système d'alimentation",
		blurb: "Essence, pompe, durites, filtre"
	},
	{
		id: "divers",
		title: "Divers",
		blurb: "Coque, faux réservoir, ailes"
	}
];
var ITEMS = [
	{
		id: "1",
		num: 1,
		section: "etat",
		label: "État des rétroviseurs"
	},
	{
		id: "2",
		num: 2,
		section: "etat",
		label: "État du commodo"
	},
	{
		id: "3",
		num: 3,
		section: "etat",
		label: "État du guidon"
	},
	{
		id: "4",
		num: 4,
		section: "etat",
		label: "État de la pédale d'embrayage"
	},
	{
		id: "5",
		num: 5,
		section: "etat",
		label: "État compteur km / compte-tours"
	},
	{
		id: "6",
		num: 6,
		section: "etat",
		label: "État des feux"
	},
	{
		id: "7",
		num: 7,
		section: "etat",
		label: "État des clignotants AV"
	},
	{
		id: "8",
		num: 8,
		section: "etat",
		label: "État de la barre de maintien éclairage"
	},
	{
		id: "9",
		num: 9,
		section: "etat",
		label: "État de la fourche"
	},
	{
		id: "10",
		num: 10,
		section: "etat",
		label: "État du garde-boue"
	},
	{
		id: "11",
		num: 11,
		section: "etat",
		label: "État du câble compteur"
	},
	{
		id: "12",
		num: 12,
		section: "etat",
		label: "État de l'escargot d'entraînement"
	},
	{
		id: "13",
		num: 13,
		section: "etat",
		label: "État jante AV"
	},
	{
		id: "14",
		num: 14,
		section: "etat",
		label: "État du pneu AV"
	},
	{
		id: "15",
		num: 15,
		section: "etat",
		label: "État du système de freinage et flexible"
	},
	{
		id: "16",
		num: 16,
		section: "etat",
		label: "État des plaquettes AV"
	},
	{
		id: "17",
		num: 17,
		section: "etat",
		label: "État de la barre cale-pieds"
	},
	{
		id: "18",
		num: 18,
		section: "etat",
		label: "État de la pédale de frein / disque"
	},
	{
		id: "19",
		num: 19,
		section: "etat",
		label: "État suspension AV"
	},
	{
		id: "20",
		num: 20,
		section: "etat",
		label: "État de la poignée accélérateur"
	},
	{
		id: "21",
		num: 21,
		section: "etat",
		label: "État de la poignée de vitesse"
	},
	{
		id: "22",
		num: 22,
		section: "etat",
		label: "État des jantes AR"
	},
	{
		id: "23",
		num: 23,
		section: "etat",
		label: "État des pneus AR"
	},
	{
		id: "24",
		num: 24,
		section: "etat",
		label: "État des suspensions AR"
	},
	{
		id: "25",
		num: 25,
		section: "etat",
		label: "État des soufflets des trompettes"
	},
	{
		id: "26",
		num: 26,
		section: "etat",
		label: "État des soufflets barre de suspension"
	},
	{
		id: "27",
		num: 27,
		section: "etat",
		label: "État du réservoir essence"
	},
	{
		id: "28b",
		num: 28,
		section: "etat",
		label: "État du bouchon de réservoir"
	},
	{
		id: "28",
		num: 28,
		section: "elec",
		label: "Câblages électriques"
	},
	{
		id: "29",
		num: 29,
		section: "elec",
		label: "Porte-fusibles / relais"
	},
	{
		id: "30",
		num: 30,
		section: "elec",
		label: "Fusibles"
	},
	{
		id: "31",
		num: 31,
		section: "elec",
		label: "Relais clignotant et feux"
	},
	{
		id: "32",
		num: 32,
		section: "elec",
		label: "Batterie (cosses et état)"
	},
	{
		id: "33",
		num: 33,
		section: "elec",
		label: "Clé de contact"
	},
	{
		id: "34",
		num: 34,
		section: "freinage",
		label: "Contacteur feux de stop"
	},
	{
		id: "35",
		num: 35,
		section: "freinage",
		label: "Disque de frein AR"
	},
	{
		id: "36",
		num: 36,
		section: "freinage",
		label: "Disque de frein AV"
	},
	{
		id: "37",
		num: 37,
		section: "freinage",
		label: "Plaquette de frein AR"
	},
	{
		id: "38",
		num: 38,
		section: "freinage",
		label: "Plaquette de frein AV"
	},
	{
		id: "39",
		num: 39,
		section: "freinage",
		label: "Cerveau de frein"
	},
	{
		id: "40",
		num: 40,
		section: "freinage",
		label: "Niveau huile hydraulique frein"
	},
	{
		id: "41",
		num: 41,
		section: "freinage",
		label: "Flexible de freinage"
	},
	{
		id: "42",
		num: 42,
		section: "essai",
		label: "Marche avant"
	},
	{
		id: "43",
		num: 43,
		section: "essai",
		label: "Marche arrière"
	},
	{
		id: "44",
		num: 44,
		section: "essai",
		label: "Frein de parking (frein à main)"
	},
	{
		id: "47",
		num: 47,
		section: "moteur",
		label: "Fuite d'huile"
	},
	{
		id: "48",
		num: 48,
		section: "moteur",
		label: "Niveau d'huile moteur"
	},
	{
		id: "49",
		num: 49,
		section: "moteur",
		label: "Refroidissement huile / air moteur"
	},
	{
		id: "50",
		num: 50,
		section: "moteur",
		label: "État visuel carburateur / filtre"
	},
	{
		id: "51",
		num: 51,
		section: "moteur",
		label: "Courroie alternateur et poulies"
	},
	{
		id: "52",
		num: 52,
		section: "moteur",
		label: "Alternateur et ventilation"
	},
	{
		id: "53",
		num: 53,
		section: "moteur",
		label: "Support alternateur"
	},
	{
		id: "54",
		num: 54,
		section: "moteur",
		label: "Essai carbu moteur tournant"
	},
	{
		id: "55",
		num: 55,
		section: "moteur",
		label: "Sonde temp. huile moteur (option)"
	},
	{
		id: "56",
		num: 56,
		section: "moteur",
		label: "Bobine alimentation 12 V"
	},
	{
		id: "57",
		num: 57,
		section: "moteur",
		label: "Démarreur"
	},
	{
		id: "58",
		num: 58,
		section: "moteur",
		label: "Allumeur 5 broches"
	},
	{
		id: "59",
		num: 59,
		section: "moteur",
		label: "Faisceau de fils de bougies"
	},
	{
		id: "60",
		num: 60,
		section: "moteur",
		label: "Bougies"
	},
	{
		id: "61",
		num: 61,
		section: "moteur",
		label: "Capotage inox moteur"
	},
	{
		id: "62",
		num: 62,
		section: "alim",
		label: "Filtre à essence"
	},
	{
		id: "63",
		num: 63,
		section: "alim",
		label: "Durite à essence"
	},
	{
		id: "64",
		num: 64,
		section: "alim",
		label: "T de répartition essence"
	},
	{
		id: "65",
		num: 65,
		section: "alim",
		label: "Colliers de durite"
	},
	{
		id: "66",
		num: 66,
		section: "alim",
		label: "Jauge à essence et bouchon"
	},
	{
		id: "67",
		num: 67,
		section: "alim",
		label: "Pompe essence"
	},
	{
		id: "68",
		num: 68,
		section: "alim",
		label: "Tige de pompe à essence"
	},
	{
		id: "69",
		num: 69,
		section: "alim",
		label: "Entretoise pompe essence"
	},
	{
		id: "72",
		num: 72,
		section: "alim",
		label: "Tige entretoise de pompe à essence"
	},
	{
		id: "73",
		num: 73,
		section: "divers",
		label: "Coque du trike"
	},
	{
		id: "74",
		num: 74,
		section: "divers",
		label: "Faux réservoir"
	},
	{
		id: "75",
		num: 75,
		section: "divers",
		label: "État aile droite"
	},
	{
		id: "76",
		num: 76,
		section: "divers",
		label: "État aile gauche"
	}
];
var ITEM_BY_ID = Object.fromEntries(ITEMS.map((i) => [i.id, i]));
var STATUS_META = {
	ok: {
		label: "Bon état",
		short: "OK",
		hint: "Rien à signaler"
	},
	warn: {
		label: "Mauvais état",
		short: "Attention",
		hint: "À surveiller ou à prévoir"
	},
	fail: {
		label: "HS / ne fonctionne pas",
		short: "HS",
		hint: "À réparer avant de rouler"
	}
};
function itemsForSection(id) {
	return ITEMS.filter((i) => i.section === id);
}
function tally(inspection) {
	const total = ITEMS.length;
	let done = 0;
	let ok = 0;
	let warn = 0;
	let fail = 0;
	if (inspection) for (const item of ITEMS) {
		const s = inspection.items[item.id];
		if (!s) continue;
		done += 1;
		if (s === "ok") ok += 1;
		else if (s === "warn") warn += 1;
		else fail += 1;
	}
	return {
		total,
		done,
		ok,
		warn,
		fail,
		todo: total - done,
		percent: total === 0 ? 0 : Math.round(done / total * 100)
	};
}
function sectionTally(inspection, section) {
	const list = itemsForSection(section);
	let done = 0;
	let fail = 0;
	let warn = 0;
	for (const item of list) {
		const s = inspection?.items[item.id];
		if (!s) continue;
		done += 1;
		if (s === "fail") fail += 1;
		if (s === "warn") warn += 1;
	}
	return {
		total: list.length,
		done,
		fail,
		warn
	};
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-[var(--shadow-border)] hover:opacity-90",
			secondary: "bg-muted text-foreground shadow-[var(--shadow-border)] hover:bg-border",
			outline: "bg-transparent text-foreground shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:bg-muted",
			ghost: "text-foreground hover:bg-muted",
			danger: "bg-bad text-bad-fg hover:opacity-90",
			ok: "bg-ok text-ok-fg hover:opacity-90",
			warn: "bg-warn text-warn-fg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { STATUS_META as a, tally as c, SECTIONS as i, ITEMS as n, itemsForSection as o, ITEM_BY_ID as r, sectionTally as s, Button as t };
