import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), ".vercel/output");
const shell = join(root, "static/_shell.html");
const index = join(root, "static/index.html");
copyFileSync(shell, index);

const cfgPath = join(root, "config.json");
const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
let rewritten = 0;
for (const route of cfg.routes ?? []) {
  if (route.dest === "/__server") {
    route.dest = "/index.html";
    rewritten += 1;
  }
}
if (!rewritten) {
  throw new Error("No /__server route to replace with the static shell");
}
writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
console.log(`[spa] ${rewritten} route(s) now serve /index.html`);
