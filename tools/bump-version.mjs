// Ustawia nowy znacznik wersji (?v=RRRRMMDDGGMM) w adresach plików strony, żeby przeglądarki
// po publikacji pobrały świeże pliki zamiast kopii z pamięci podręcznej (GitHub Pages: max-age 10 min).
// Uruchom przed commitem z zmianami strony:  node tools/bump-version.mjs
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
const version = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}`;

for (const file of ["index.html", "app.js"]) {
  const full = path.join(root, file);
  const source = await readFile(full, "utf8");
  const updated = source.replace(/\?v=\d{12}/g, `?v=${version}`).replace(/const ASSET_VERSION = "\d{12}"/, `const ASSET_VERSION = "${version}"`);
  await writeFile(full, updated);
  console.log(`${file}: wersja ${version}`);
}
