import { a as formatKm, i as formatDate } from "./app-shell-BxvYZkGx.mjs";
import { c as tally, i as SECTIONS, n as ITEMS, o as itemsForSection } from "./button-C1nE-aBy.mjs";
import { t as fontkit } from "../_libs/pako+pdf-lib__fontkit.mjs";
import { n as rgb, t as PDFDocument } from "../_libs/pdf-lib.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inspection-pdf-BSxYkLun.js
var PAGE_W = 595.28;
var PAGE_H = 841.89;
var M = 28;
var COL_W = 525.28 / 2;
var INK = rgb(.16, .09, .07);
var MUTED = rgb(.4, .32, .26);
var BAR = rgb(.23, .15, .11);
var CREAM = rgb(.965, .918, .847);
var RED = rgb(.769, .125, .125);
var OK = rgb(.18, .45, .28);
var WARN = rgb(.78, .38, .12);
var LINE = rgb(.75, .68, .6);
var MARKS = [
	{
		id: "ok",
		label: "OK",
		color: OK
	},
	{
		id: "warn",
		label: "!",
		color: WARN
	},
	{
		id: "fail",
		label: "HS",
		color: RED
	}
];
function wrap(text, font, size, max) {
	const words = text.trim().split(/\s+/).filter(Boolean);
	const lines = [];
	let line = "";
	for (const word of words) {
		const next = line ? `${line} ${word}` : word;
		if (font.widthOfTextAtSize(next, size) <= max) {
			line = next;
			continue;
		}
		if (line) lines.push(line);
		if (font.widthOfTextAtSize(word, size) <= max) {
			line = word;
			continue;
		}
		let chunk = "";
		for (const ch of word) {
			const trial = chunk + ch;
			if (font.widthOfTextAtSize(trial, size) <= max) chunk = trial;
			else {
				if (chunk) lines.push(chunk);
				chunk = ch;
			}
		}
		line = chunk;
	}
	if (line) lines.push(line);
	return lines.length ? lines : [""];
}
function drawMarks(page, font, x, top, status) {
	MARKS.forEach((mark, i) => {
		const bx = x + i * 19;
		const on = status === mark.id;
		page.drawRectangle({
			x: bx,
			y: PAGE_H - top - 11,
			width: 17,
			height: 11,
			borderColor: on ? mark.color : LINE,
			borderWidth: .6,
			color: on ? mark.color : void 0
		});
		const size = 6.5;
		const tw = font.widthOfTextAtSize(mark.label, size);
		page.drawText(mark.label, {
			x: bx + (17 - tw) / 2,
			y: PAGE_H - top - 9,
			size,
			font,
			color: on ? rgb(1, 1, 1) : MUTED
		});
	});
}
async function buildInspectionPdf(inspection, fonts) {
	const doc = await PDFDocument.create();
	doc.registerFontkit(fontkit);
	const regular = await doc.embedFont(fonts.regular);
	const bold = await doc.embedFont(fonts.bold);
	const italic = await doc.embedFont(fonts.italic);
	doc.setTitle(`Contrôle HS4 ${inspection.date || ""}`.trim());
	doc.setSubject("Entretien et check-list Trike Rewaco HS4");
	const state = {
		page: doc.addPage([PAGE_W, PAGE_H]),
		col: 0,
		top: M,
		contentTop: M,
		ends: [M, M]
	};
	const paint = (value, x, top, size, font, color = INK) => {
		state.page.drawText(value, {
			x,
			y: PAGE_H - top - size,
			size,
			font,
			color
		});
	};
	const drawHeader = (continued) => {
		let y = M;
		const title = continued ? "Entretien et check-list — suite" : "Entretien et check-list de vérification";
		const titleSize = continued ? 11 : 13;
		const tw = bold.widthOfTextAtSize(title, titleSize);
		state.page.drawText(title, {
			x: (PAGE_W - tw) / 2,
			y: PAGE_H - y - titleSize,
			size: titleSize,
			font: bold,
			color: INK
		});
		y += titleSize + 3;
		if (!continued) {
			const sub = "Trike Rewaco HS4";
			const sw = bold.widthOfTextAtSize(sub, 16);
			state.page.drawText(sub, {
				x: (PAGE_W - sw) / 2,
				y: PAGE_H - y - 16,
				size: 16,
				font: bold,
				color: INK
			});
			y += 20;
		}
		const cells = [
			["Date", formatDate(inspection.date)],
			["Kilomètre", formatKm(inspection.km)],
			["Immatriculation", inspection.plate || "—"],
			["Année", inspection.year || "—"]
		];
		const cellW = 539.28 / 4;
		const cellH = 26;
		cells.forEach(([label, value], i) => {
			const x = M + i * cellW;
			state.page.drawRectangle({
				x,
				y: PAGE_H - y - cellH,
				width: cellW,
				height: cellH,
				borderColor: INK,
				borderWidth: .6
			});
			paint(label.toUpperCase(), x + 4, y + 3, 6.5, bold, MUTED);
			paint(value, x + 4, y + 13, 9, regular);
		});
		y += 38;
		state.top = y;
		state.contentTop = y;
		state.ends = [y, y];
	};
	drawHeader(false);
	const colX = () => M + state.col * 276.64;
	const newPage = () => {
		state.page = doc.addPage([PAGE_W, PAGE_H]);
		state.col = 0;
		drawHeader(true);
	};
	const advanceColumn = () => {
		state.ends[state.col] = state.top;
		if (state.col === 0) {
			state.col = 1;
			state.top = state.contentTop;
			return;
		}
		newPage();
	};
	const ensure = (height) => {
		if (state.top + height <= 809.89) return;
		advanceColumn();
	};
	for (const section of SECTIONS) {
		const headerH = 16;
		ensure(32);
		const barTop = state.top;
		state.page.drawRectangle({
			x: colX(),
			y: PAGE_H - barTop - headerH,
			width: COL_W,
			height: headerH,
			color: BAR
		});
		paint(section.title.toUpperCase(), colX() + 4, barTop + 4, 8, bold, CREAM);
		state.top += 19;
		for (const item of itemsForSection(section.id)) {
			const note = inspection.notes[item.id]?.trim() ?? "";
			const labelW = 184.64;
			const labelLines = wrap(item.label, regular, 8, labelW);
			const noteLines = note ? wrap(note, italic, 7, labelW) : [];
			const rowH = Math.max(13, labelLines.length * 10 + 3) + noteLines.length * 9 + 3;
			ensure(rowH);
			const rowTop = state.top;
			paint(String(item.num), colX(), rowTop + 1, 8, regular, MUTED);
			labelLines.forEach((line, i) => {
				paint(line, colX() + 16, rowTop + i * 10, 8, regular);
			});
			noteLines.forEach((line, i) => {
				paint(line, colX() + 16, rowTop + labelLines.length * 10 + 1 + i * 9, 7, italic, RED);
			});
			drawMarks(state.page, bold, colX() + COL_W - 56, rowTop, inspection.items[item.id]);
			const lineY = PAGE_H - (rowTop + rowH);
			state.page.drawLine({
				start: {
					x: colX(),
					y: lineY
				},
				end: {
					x: colX() + COL_W,
					y: lineY
				},
				thickness: .4,
				color: LINE
			});
			state.top += rowH;
		}
		state.top += 8;
		state.ends[state.col] = state.top;
	}
	const stats = tally(inspection);
	const obs = inspection.observation.trim();
	const obsLines = wrap(obs || "—", regular, 10, 539.28);
	const maint = [
		["Vidange moteur", formatDate(inspection.maintenance.oilEngine)],
		["Vidange boîte", formatDate(inspection.maintenance.oilGearbox)],
		["Changement pneu", inspection.maintenance.tires || "—"],
		["Changement plaquette", inspection.maintenance.pads || "—"]
	];
	const other = inspection.maintenance.other.trim();
	const otherLines = other ? wrap(`Divers : ${other}`, regular, 9, 539.28) : [];
	const blockH = 16 + obsLines.length * 13 + 8 + 36 + (otherLines.length ? otherLines.length * 12 + 6 : 0) + 16;
	const blockStart = Math.max(state.ends[0], state.ends[1]) + 8;
	if (blockStart + blockH > 809.89) newPage();
	else state.top = blockStart;
	paint("OBSERVATIONS", M, state.top, 9, bold);
	state.top += 14;
	obsLines.forEach((line) => {
		paint(line, M, state.top, 10, regular, obs ? RED : MUTED);
		state.top += 13;
	});
	state.top += 8;
	const cellW = 539.28 / 2;
	const cellH = 28;
	maint.forEach(([label, value], i) => {
		const col = i % 2;
		const row = Math.floor(i / 2);
		const x = M + col * cellW;
		const top = state.top + row * cellH;
		state.page.drawRectangle({
			x,
			y: PAGE_H - top - cellH,
			width: cellW,
			height: cellH,
			borderColor: INK,
			borderWidth: .5
		});
		paint(label.toUpperCase(), x + 4, top + 3, 6.5, bold, MUTED);
		paint(value, x + 4, top + 14, 9, regular);
	});
	state.top += 64;
	otherLines.forEach((line) => {
		paint(line, M, state.top, 9, regular);
		state.top += 12;
	});
	paint(`${stats.ok} bon état · ${stats.warn} mauvais · ${stats.fail} HS · ${stats.todo} non notés / ${ITEMS.length}`, M, state.top, 8, regular, MUTED);
	const pages = doc.getPages();
	pages.forEach((page, index) => {
		const label = `${index + 1} / ${pages.length}`;
		const w = regular.widthOfTextAtSize(label, 8);
		page.drawText(label, {
			x: 567.28 - w,
			y: 16,
			size: 8,
			font: regular,
			color: MUTED
		});
	});
	return doc.save();
}
function pdfName(inspection) {
	return `controle-${(inspection.plate || "hs4").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "hs4"}-${inspection.date || "sans-date"}.pdf`;
}
async function downloadInspectionPdf(inspection) {
	const load = (file) => fetch(`/fonts/${file}`).then((res) => {
		if (!res.ok) throw new Error(`Police manquante : ${file}`);
		return res.arrayBuffer();
	});
	const [regular, bold, italic] = await Promise.all([
		load("LiberationSans-Regular.ttf"),
		load("LiberationSans-Bold.ttf"),
		load("LiberationSans-Italic.ttf")
	]);
	const bytes = await buildInspectionPdf(inspection, {
		regular,
		bold,
		italic
	});
	const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = pdfName(inspection);
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
//#endregion
export { downloadInspectionPdf };
