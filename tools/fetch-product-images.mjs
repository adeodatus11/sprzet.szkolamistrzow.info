// Pobiera zdjęcia poglądowe produktów z listy zakupów sali 16 i zapisuje je w repozytorium (pn16-r7k2xq/img/<id>.jpg),
// a w pokoj16-data.js uzupełnia pole "zdjecie". Zdjęcia są lokalne, więc strona nie zależy od tego, czy sklep pozwala na podlinkowanie.
// Adres zdjęcia: meta og:image (albo twitter:image / JSON-LD / pierwsze zdjęcie produktu), z pominięciem logo sklepu.
// Uruchom na komputerze z dostępem do internetu:  node tools/fetch-product-images.mjs
//   --all            pobierz ponownie także zdjęcia, które już są
// Zdjęcie jest zmniejszane do 360 px (ImageMagick: convert); bez ImageMagick zapisuje się oryginał.
// Ręczny wybór zdjęcia: w pozycji wpisz "zdjecie_zrodlo": "<adres obrazka>" i uruchom skrypt z --all.

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataFile = path.join(root, "pokoj16-data.js");
const IMG_DIR = "pn16-r7k2xq/img";
const all = process.argv.includes("--all");

const PREFIX = "export const pokoj16 = ";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'");
const isLogo = (url) => /logo|favicon|placeholder/i.test(url);

export const extractImage = (html, pageUrl) => {
  const candidates = [];
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const attr = (tag, name) => tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"))?.slice(2).find((v) => v !== undefined);
  for (const key of ["og:image:secure_url", "og:image", "twitter:image", "twitter:image:src"]) {
    for (const tag of metas) {
      const name = attr(tag, "property") ?? attr(tag, "name");
      const content = attr(tag, "content");
      if (name?.toLowerCase() === key && content) candidates.push(content);
    }
  }
  for (const m of html.matchAll(/"image"\s*:\s*(?:\[\s*)?"([^"]+)"/g)) candidates.push(m[1]);
  for (const m of html.matchAll(/href="([^"]*\/product\/[^"]*\.(?:jpe?g|png|webp))"/gi)) candidates.push(m[1]);
  const found = candidates.map((c) => new URL(decode(c), pageUrl).href).find((url) => !isLogo(url));
  return found ?? null;
};

const get = (url, accept) => fetch(url, {
  redirect: "follow",
  signal: AbortSignal.timeout(25000),
  headers: { "user-agent": UA, accept, "accept-language": "pl-PL,pl;q=0.9", referer: new URL(url).origin + "/" },
});

const findImage = async (pageUrl) => {
  const response = await get(pageUrl, "text/html,application/xhtml+xml");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return extractImage(await response.text(), response.url || pageUrl);
};

const hasConvert = (() => { try { execFileSync("convert", ["-version"], { stdio: "ignore" }); return true; } catch { return false; } })();

const saveImage = async (imageUrl, id) => {
  const response = await get(imageUrl, "image/avif,image/webp,image/jpeg,image/png,image/*");
  if (!response.ok) throw new Error(`zdjęcie: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await mkdir(path.join(root, IMG_DIR), { recursive: true });
  if (hasConvert) {
    const target = `${IMG_DIR}/${id}.jpg`;
    execFileSync("convert", ["-", "-background", "white", "-alpha", "remove", "-alpha", "off", "-resize", "360x360>", "-strip", "-quality", "82", path.join(root, target)], { input: bytes });
    return target;
  }
  const ext = (response.headers.get("content-type") ?? "").match(/image\/(jpeg|png|webp|avif)/)?.[1]?.replace("jpeg", "jpg") ?? "jpg";
  const target = `${IMG_DIR}/${id}.${ext}`;
  await writeFile(path.join(root, target), bytes);
  return target;
};

const exists = (file) => access(path.join(root, file)).then(() => true, () => false);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const source = await readFile(dataFile, "utf8");
  const start = source.indexOf(PREFIX);
  if (start < 0) throw new Error(`Brak "${PREFIX}" w ${dataFile}`);
  const data = JSON.parse(source.slice(start + PREFIX.length).trim().replace(/;$/, ""));
  // Ten sam produkt (ten sam link) ma jedno zdjęcie, nazwane id pierwszej pozycji.
  const byLink = new Map();
  for (const item of data.pozycje) {
    if (!byLink.has(item.link)) byLink.set(item.link, item);
  }
  const saved = new Map();
  for (const [link, first] of byLink) {
    if (!all && first.zdjecie && await exists(first.zdjecie)) { saved.set(link, first.zdjecie); continue; }
    try {
      const imageUrl = first.zdjecie_zrodlo ?? await findImage(link);
      if (!imageUrl) { console.log("BRAK   ", link, "(nie znaleziono zdjęcia)"); continue; }
      const file = await saveImage(imageUrl, first.id);
      saved.set(link, file);
      console.log("OK     ", file, "←", imageUrl);
    } catch (error) {
      console.log("BŁĄD   ", link, String(error.message ?? error), error.cause ? `(${error.cause.message ?? error.cause})` : "");
    }
  }
  let updated = 0;
  for (const item of data.pozycje) {
    const file = saved.get(item.link);
    if (file) { item.zdjecie = file; updated += 1; }
  }
  const header = source.slice(0, start);
  await writeFile(dataFile, header + PREFIX + JSON.stringify(data, null, 2) + ";\n");
  console.log(`\nZdjęcia: ${updated} z ${data.pozycje.length} pozycji (${saved.size} z ${byLink.size} produktów).`);
}
