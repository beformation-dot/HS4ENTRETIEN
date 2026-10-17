import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { ITEMS, SECTIONS, itemsForSection, tally } from "@/lib/checklist";
import type { Inspection, ItemStatus } from "@/lib/types";
import { useGarage } from "@/lib/store";
import { formatDate, formatKm } from "@/lib/utils";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const M = 28;
const GAP = 14;
const COL_W = (PAGE_W - M * 2 - GAP) / 2;
const BOTTOM = 32;

const INK = rgb(0.16, 0.09, 0.07);
const MUTED = rgb(0.4, 0.32, 0.26);
const BAR = rgb(0.23, 0.15, 0.11);
const CREAM = rgb(0.965, 0.918, 0.847);
const RED = rgb(0.769, 0.125, 0.125);
const OK = rgb(0.18, 0.45, 0.28);
const WARN = rgb(0.78, 0.38, 0.12);
const LINE = rgb(0.75, 0.68, 0.6);

const MARKS: { id: ItemStatus; label: string; color: ReturnType<typeof rgb> }[] = [
  { id: "ok", label: "OK", color: OK },
  { id: "warn", label: "!", color: WARN },
  { id: "fail", label: "HS", color: RED },
];

type FontBytes = {
  regular: ArrayBuffer;
  bold: ArrayBuffer;
  italic: ArrayBuffer;
};

function wrap(text: string, font: PDFFont, size: number, max: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
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

function drawMarks(
  page: PDFPage,
  font: PDFFont,
  x: number,
  top: number,
  status: ItemStatus | undefined,
) {
  MARKS.forEach((mark, i) => {
    const bx = x + i * 19;
    const on = status === mark.id;
    page.drawRectangle({
      x: bx,
      y: PAGE_H - top - 11,
      width: 17,
      height: 11,
      borderColor: on ? mark.color : LINE,
      borderWidth: 0.6,
      color: on ? mark.color : undefined,
    });
    const size = 6.5;
    const tw = font.widthOfTextAtSize(mark.label, size);
    page.drawText(mark.label, {
      x: bx + (17 - tw) / 2,
      y: PAGE_H - top - 9,
      size,
      font,
      color: on ? rgb(1, 1, 1) : MUTED,
    });
  });
}

export async function buildInspectionPdf(inspection: Inspection, fonts: FontBytes) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const regular = await doc.embedFont(fonts.regular);
  const bold = await doc.embedFont(fonts.bold);
  const italic = await doc.embedFont(fonts.italic);
  doc.setTitle(`Contrôle HS4 ${inspection.date || ""}`.trim());
  doc.setSubject("Entretien et check-list Trike Rewaco HS4");

  const state = {
    page: doc.addPage([PAGE_W, PAGE_H]),
    col: 0 as 0 | 1,
    top: M,
    contentTop: M,
    ends: [M, M] as [number, number],
  };

  const paint = (
    value: string,
    x: number,
    top: number,
    size: number,
    font: PDFFont,
    color = INK,
  ) => {
    state.page.drawText(value, {
      x,
      y: PAGE_H - top - size,
      size,
      font,
      color,
    });
  };

  const drawHeader = (continued: boolean) => {
    let y = M;
    const title = continued
      ? "Entretien et check-list — suite"
      : "Entretien et check-list de vérification";
    const titleSize = continued ? 11 : 13;
    const tw = bold.widthOfTextAtSize(title, titleSize);
    state.page.drawText(title, {
      x: (PAGE_W - tw) / 2,
      y: PAGE_H - y - titleSize,
      size: titleSize,
      font: bold,
      color: INK,
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
        color: INK,
      });
      y += 20;
    }
    const vehicle = useGarage.getState().vehicle;
    const paintRow = (cells: [string, string][], top: number) => {
      const cellW = (PAGE_W - M * 2) / cells.length;
      const cellH = 26;
      cells.forEach(([label, value], i) => {
        const x = M + i * cellW;
        state.page.drawRectangle({
          x,
          y: PAGE_H - top - cellH,
          width: cellW,
          height: cellH,
          borderColor: INK,
          borderWidth: 0.6,
        });
        paint(label.toUpperCase(), x + 4, top + 3, 6.5, bold, MUTED);
        paint(value, x + 4, top + 13, 9, regular);
      });
      return cellH;
    };
    if (!continued) {
      y += paintRow(
        [
          ["Nom", vehicle.lastName || "—"],
          ["Prénom", vehicle.firstName || "—"],
          ["Ligne", vehicle.line || "—"],
        ],
        y,
      );
      y += 6;
    }
    y += paintRow(
      [
        ["Date", formatDate(inspection.date)],
        ["Kilomètre", formatKm(inspection.km)],
        ["Immatriculation", inspection.plate || "—"],
        ["Année", inspection.year || "—"],
      ],
      y,
    );
    y += 12;
    state.top = y;
    state.contentTop = y;
    state.ends = [y, y];
  };

  drawHeader(false);

  const colX = () => M + state.col * (COL_W + GAP);

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

  const ensure = (height: number) => {
    if (state.top + height <= PAGE_H - BOTTOM) return;
    advanceColumn();
  };

  for (const section of SECTIONS) {
    const headerH = 16;
    ensure(headerH + 16);
    const barTop = state.top;
    state.page.drawRectangle({
      x: colX(),
      y: PAGE_H - barTop - headerH,
      width: COL_W,
      height: headerH,
      color: BAR,
    });
    paint(section.title.toUpperCase(), colX() + 4, barTop + 4, 8, bold, CREAM);
    state.top += headerH + 3;

    for (const item of itemsForSection(section.id)) {
      const note = inspection.notes[item.id]?.trim() ?? "";
      const labelW = COL_W - 18 - 60;
      const labelLines = wrap(item.label, regular, 8, labelW);
      const noteLines = note ? wrap(note, italic, 7, labelW) : [];
      const rowH =
        Math.max(13, labelLines.length * 10 + 3) + noteLines.length * 9 + 3;
      ensure(rowH);
      const rowTop = state.top;
      paint(String(item.num), colX(), rowTop + 1, 8, regular, MUTED);
      labelLines.forEach((line, i) => {
        paint(line, colX() + 16, rowTop + i * 10, 8, regular);
      });
      noteLines.forEach((line, i) => {
        paint(
          line,
          colX() + 16,
          rowTop + labelLines.length * 10 + 1 + i * 9,
          7,
          italic,
          RED,
        );
      });
      drawMarks(
        state.page,
        bold,
        colX() + COL_W - 56,
        rowTop,
        inspection.items[item.id],
      );
      const lineY = PAGE_H - (rowTop + rowH);
      state.page.drawLine({
        start: { x: colX(), y: lineY },
        end: { x: colX() + COL_W, y: lineY },
        thickness: 0.4,
        color: LINE,
      });
      state.top += rowH;
    }
    state.top += 8;
    state.ends[state.col] = state.top;
  }

  const stats = tally(inspection);
  const obs = inspection.observation.trim();
  const obsLines = wrap(obs || "—", regular, 10, PAGE_W - M * 2);
  const maint: [string, string][] = [
    ["Vidange moteur", formatDate(inspection.maintenance.oilEngine)],
    ["Vidange boîte", formatDate(inspection.maintenance.oilGearbox)],
    ["Changement pneu", inspection.maintenance.tires || "—"],
    ["Changement plaquette", inspection.maintenance.pads || "—"],
  ];
  const other = inspection.maintenance.other.trim();
  const otherLines = other ? wrap(`Divers : ${other}`, regular, 9, PAGE_W - M * 2) : [];
  const blockH =
    16 +
    obsLines.length * 13 +
    8 +
    36 +
    (otherLines.length ? otherLines.length * 12 + 6 : 0) +
    16;

  const blockStart = Math.max(state.ends[0], state.ends[1]) + 8;
  if (blockStart + blockH > PAGE_H - BOTTOM) newPage();
  else state.top = blockStart;

  paint("OBSERVATIONS", M, state.top, 9, bold);
  state.top += 14;
  obsLines.forEach((line) => {
    paint(line, M, state.top, 10, regular, obs ? RED : MUTED);
    state.top += 13;
  });
  state.top += 8;

  const cellW = (PAGE_W - M * 2) / 2;
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
      borderWidth: 0.5,
    });
    paint(label.toUpperCase(), x + 4, top + 3, 6.5, bold, MUTED);
    paint(value, x + 4, top + 14, 9, regular);
  });
  state.top += cellH * 2 + 8;
  otherLines.forEach((line) => {
    paint(line, M, state.top, 9, regular);
    state.top += 12;
  });
  const summary = `${stats.ok} bon état · ${stats.warn} mauvais · ${stats.fail} HS · ${stats.todo} non notés / ${ITEMS.length}`;
  paint(summary, M, state.top, 8, regular, MUTED);

  const pages = doc.getPages();
  pages.forEach((page, index) => {
    const label = `${index + 1} / ${pages.length}`;
    const w = regular.widthOfTextAtSize(label, 8);
    page.drawText(label, {
      x: PAGE_W - M - w,
      y: 16,
      size: 8,
      font: regular,
      color: MUTED,
    });
  });

  return doc.save();
}

function pdfName(inspection: Inspection) {
  const plate =
    (inspection.plate || "hs4").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") ||
    "hs4";
  return `controle-${plate}-${inspection.date || "sans-date"}.pdf`;
}

export async function downloadInspectionPdf(inspection: Inspection) {
  const load = (file: string) =>
    fetch(`/fonts/${file}`).then((res) => {
      if (!res.ok) throw new Error(`Police manquante : ${file}`);
      return res.arrayBuffer();
    });
  const [regular, bold, italic] = await Promise.all([
    load("LiberationSans-Regular.ttf"),
    load("LiberationSans-Bold.ttf"),
    load("LiberationSans-Italic.ttf"),
  ]);
  const bytes = await buildInspectionPdf(inspection, { regular, bold, italic });
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
