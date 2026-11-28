// Uzupełnia zdjęcia poglądowe produktów w pokoj16-data.js (pole "zdjecie") na podstawie linków do ofert.
// Dla każdego linku pobiera stronę sklepu i czyta adres zdjęcia z meta og:image (albo twitter:image / JSON-LD).
// Uruchom na komputerze z dostępem do internetu:  node tools/fetch-product-images.mjs
//   --all            nadpisz też pozycje, które już mają zdjęcie
//   --data <plik>    inny plik danych (domyślnie pokoj16-data.js w katalogu głównym)
// Pozycje, dla których zdjęcia nie udało się pobrać, zostają bez zmian (strona pokaże wtedy link do oferty).

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const args = process.argv.slice(2);
const all = args.includes("--all");
const dataIndex = args.indexOf("--data");
const dataFile = dataIndex >= 0
  ? path.resolve(args[dataIndex + 1])
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "pokoj16-data.js");

const PREFIX = "export const pokoj16 = ";
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'");

export const extractImage = (html, pageUrl) => {
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const attr = (tag, name) => tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"))?.slice(2).find((v) => v !== undefined);
  for (const key of ["og:image:secure_url", "og:image", "twitter:image", "twitter:image:src"]) {
    for (const tag of metas) {
      const name = attr(tag, "property") ?? attr(tag, "name");
      const content = attr(tag, "content");
      if (name?.toLowerCase() === key && content) return new URL(decode(content), pageUrl).href;
    }
  }
  const ld = html.match(/"image"\s*:\s*(\[\s*)?"([^"]+)"/);
  return ld ? new URL(decode(ld[2]), pageUrl).href : null;
};

const fetchImage = async (url) => {
  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(25000),
    headers: {
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      "accept": "text/html,application/xhtml+xml",
      "accept-language": "pl-PL,pl;q=0.9",
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return extractImage(await response.text(), response.url || url);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const source = await readFile(dataFile, "utf8");
  const start = source.indexOf(PREFIX);
  if (start < 0) throw new Error(`Brak "${PREFIX}" w ${dataFile}`);
  const data = JSON.parse(source.slice(start + PREFIX.length).trim().replace(/;$/, ""));
  const links = [...new Set(data.pozycje.filter((item) => all || !item.zdjecie).map((item) => item.link))];
  const found = new Map();
  for (const link of links) {
    try {
      const image = await fetchImage(link);
      if (image) found.set(link, image);
      console.log(image ? "OK     " : "BRAK   ", link, image ?? "(nie znaleziono og:image)");
    } catch (error) {
      console.log("BŁĄD   ", link, String(error.message ?? error));
    }
  }
  let updated = 0;
  for (const item of data.pozycje) {
    const image = found.get(item.link);
    if (image) { item.zdjecie = image; updated += 1; }
  }
  await writeFile(dataFile, source.slice(0, start) + PREFIX + JSON.stringify(data, null, 2) + ";\n");
  console.log(`\nZdjęcia: ${updated} z ${data.pozycje.length} pozycji (${found.size} z ${links.length} linków).`);
}
