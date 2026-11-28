// Plan sali 16: rzut 2D, elewacje, model 3D (three.js), kontrola przejść, zestawienie z kosztami i instalacje.
// Wczytywany przez app.js przy pierwszym otwarciu zakładki „Pokój nauczycielski 16” (razem z three.js z cdnjs).
// Rysuje w kontenerze #pn16 w index.html.
(() => {
"use strict";
const ROOT = document.getElementById("pn16");
if (!ROOT || ROOT.dataset.ready) return;
ROOT.dataset.ready = "1";
const SVGNS = "http://www.w3.org/2000/svg";
const ROOM = { w: 900, d: 600, h: 450 };
const SOUTH_T = 50, NICHE = 40;
const DOOR = { x0: 131, x1: 228, h: 210, hinge: 228, leaf: 90 };
const WINDOWS = [[112, 275], [362, 526], [618, 780]];
const SILL = 90, HEAD = 340;
const RADIATORS = WINDOWS.map(([a, b]) => ({ x: (a + b) / 2 - 60, y: 588, w: 120, d: 10, h: 60, z: 15 }));

/* katalog: jedna pozycja = jeden wiersz zestawienia. Ceny brutto sprawdzone 24.11.2026. */
const CHECKED = "24.11.2026";
const IKEA = "IKEA (Wrocław Bielany / ikea.com/pl)";
const ip = (slug) => "https://www.ikea.com/pl/pl/p/" + slug + "/";
const ZONES = {
  storage: "Szafki osobiste i ścianka",
  work: "Stanowiska komputerowe i stół roboczy",
  print: "Strefa druku i ładowania laptopów",
  kitchen: "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
  dining: "Jadalnia",
  lounge: "Wypoczynek",
  cmd: "Centrum dowodzenia (ekran dotykowy na ścianie przy drzwiach, obok bizhuba)",
  deco: "Tablice na ścianach (ściany i zieleń poza zakupem)",
  tech: "Sprzęt IT – nie kupujemy w tym zakupie",
};
const C = [
  { k: "szafa", z: "storage", name: "JAN NOWAK KAROL Eco Design, szafa skrytkowa zamykana na klucz, 18 skrytek, biały korpus / fronty dąb sonoma", dims: "90 × 40 × 185 cm, 18 skrytek (3 × 6) z zamkiem ryglowanym, klucz Master Key do wszystkich skrytek, otwory wentylacyjne, miejsce na wizytownik, 52 kg", sku: "1867 (EAN 5907367500462)", price: 1299, qty: 3, shop: "Kupmeble.pl", url: "https://kupmeble.pl/produkt/szafa-skrytkowa-zamykana-na-klucz-eco-design-karol-90x40x185-cm-bialy-dab-sonoma", avail: "na magazynie, wysyłka 48 h", status: ["ok", "Na magazynie, gwarancja 10 lat"], note: "Razem 54 skrytki" },
  { k: "scianka", z: "storage", sw: "acoustic", name: "IKEA MITTZON rama z kółkami, ekran akustyczny i tablica suchościeralna, Gunnared beżowy/biały", dims: "85 × 205 cm, podstawa 50 cm; na dole ekran akustyczny 5 cm, na górze dwustronna tablica do pisania i przypinania; pokrycie zdejmowane do prania", sku: "s09536177", price: 999, qty: 2, shop: IKEA, url: ip("mittzon-rama-z-kolk-ekr-akust-tabl-gunnared-bezowy-bialy-s09536177"), avail: "28.11: w sprzedaży, na stanie", status: ["ok", "1 szt. między stołem do druku a lodówką, 1 szt. bez stałego miejsca (do przestawiania)"], alt: [{ name: "MITTZON rama z kółkami i ekranem akustycznym, bez tablicy (s39514683)", price: 699, url: ip("mittzon-rama-z-kolkami-ekran-akust-gunnared-bezowy-bialy-s39514683") }] },
  { k: "biurko", z: "work", name: "IKEA BOLLPOJKE biurko, sosna / biały, 90 × 55 cm", dims: "90 × 55 × 75 cm, blat z litej sosny, biała rama ze skrzyżowanymi nogami, otwarta półka pod blatem, otwór na kable; przy każdym biurku podwójne gniazdo 230 V na ścianie", sku: "005.913.66", price: 449, qty: 2, shop: IKEA, url: ip("bollpojke-biurko-sosna-bialy-00591366"), avail: "28.11: w sprzedaży, na stanie", status: ["ok", "Pod tablicą magnetyczną, 10 cm odstępu na ekran między biurkami"] },
  { k: "przegroda", z: "work", sw: "acoustic", name: "IKEA MITTZON ekran akustyczny na biurko, Gunnared beżowy, 70 × 72 cm", dims: "70 × 72 × 8 cm, zaciski w zestawie; 1 szt. między szafami skrytkowymi a biurkiem 1, 1 szt. między biurkami (ekran wystaje 15 cm przed blat)", sku: "105.282.23", price: 300, qty: 2, shop: IKEA, url: ip("mittzon-ekran-akustyczny-na-biurko-gunnared-bezowy-10528223"), avail: "28.11: w sprzedaży, na stanie", status: ["warn", "Ekran jest do biurek MITTZON: sprawdzić, czy zaciski pasują do blatu BOLLPOJKE"] },
  { k: "lampa", z: "work", name: "IKEA TERTIAL lampa biurkowa, biały", dims: "ramię ok. 56 cm, klosz i ramię regulowane, zacisk na blat do 6 cm; żarówka E27 sprzedawana osobno (np. SOLHETTA LED 806 lm, 16,99 zł za 2 szt.)", sku: "703.554.55", price: 49.99, qty: 2, shop: IKEA, url: ip("tertial-lampa-biurkowa-bialy-70355455"), avail: "28.11: w sprzedaży, na stanie", status: ["ok", "Po jednej na biurko, kupić też żarówki E27"] },
  { k: "podstawka", z: "work", name: "IKEA STENERIK podstawka pod laptopa", dims: "26 × 24 cm, wys. 4–14 cm; pod laptopem miejsce na klawiaturę, mysz i notatki", sku: "305.640.12", price: 79.99, qty: 2, shop: IKEA, url: ip("stenerik-podstawka-pod-laptopa-30564012"), avail: "28.11: w sprzedaży, na stanie", status: ["ok", "Pod laptopy KPO na biurkach"] },
  { k: "krz_biuro", z: "work", name: "IKEA LÄKTARE krzesło konferencyjne, średnioszary / biały", dims: "55 × 50 × 84 cm, podłokietniki, siedzisko z okleiną brzozową, pokrycie Gunnared do prania, sztaplowane (do 5 szt.), EN 16139", sku: "s49503250", price: 299, qty: 2, shop: IKEA, url: ip("laektare-krzeslo-konferencyjne-srednioszary-bialy-s49503250"), status: ["ok", "Przy biurkach"] },
  { k: "stol_pracy", z: "work", name: "IKEA MITTZON stół konferencyjny, okleina dębowa / czarny, 140 × 68 cm, jednolity blat", dims: "140 × 68 × 75 cm, bez modułu; 4 szt. zestawione w blok 280 × 136 cm, 8 miejsc", sku: "s39513952", price: 649, qty: 4, shop: IKEA, url: ip("mittzon-stol-konferencyjny-okl-deb-czarny-s39513952"), status: ["ok", "W sprzedaży, na stanie"], alt: [{ name: "MITTZON 140 × 108 okleina dębowa / czarny (2 blaty z modułem na środku)", price: 1098, url: ip("mittzon-stol-konferencyjny-okl-deb-czarny-s99533400") }] },
  { k: "krz_pracy", z: "work", name: "IKEA LÄKTARE krzesło konferencyjne, średnioszary / biały", dims: "55 × 50 × 84 cm, podłokietniki, siedzisko z okleiną brzozową, pokrycie Gunnared do prania, sztaplowane (do 5 szt.), EN 16139", sku: "s49503250", price: 299, qty: 8, shop: IKEA, url: ip("laektare-krzeslo-konferencyjne-srednioszary-bialy-s49503250"), status: ["ok", "Przy stole roboczym"] },
  { k: "druk_duza", z: "tech", name: "Konica Minolta bizhub C450i z kasetą PC-x16 (korpus)", dims: "61,5 × 68,8 × 120,7 cm; z otwartym podajnikiem dokumentów 156 cm; taca boczna wysuwa się o 32 cm w prawo", qty: 1, status: ["mute", "Sprzęt IT, nie w tym zakupie"], outside: true },
  { k: "finiszer", z: "tech", name: "Finiszer broszurujący FS-539SD (z modułem RU-513 w korpusie)", dims: "54,3 × 68,1 × 102,3 cm, z wysuniętymi tacami 65,8 cm szer., 53 kg", qty: 1, status: ["mute", "Sprzęt IT, nie w tym zakupie"], outside: true },
  { k: "druk_mala", z: "tech", name: "Xerox VersaLink B7130 MFP (B7101V_D), posiadana, przy komputerach", dims: "sama drukarka 59 × 67 × 77 cm, 54 kg; z podstawą Xerox ok. 62 × 67 × 112 cm", qty: 1, status: ["ok", "Jest w szkole"], outside: true },
  { k: "stol_wysoki", z: "print", name: "IKEA TROTTEN biurko z regulacją wysokości, elektryczne, imitacja jesionu / biały (stół do kompletowania)", dims: "120 × 70 cm, wys. 71–118 cm", sku: "s39621881", price: 999, qty: 1, shop: IKEA, url: ip("trotten-biurko-z-regulacja-wysokosci-elektryczny-imitacja-jesionu-bialy-s39621881"), status: ["ok", "Jeden stół obok strefy druku"] },
  { k: "regal_druk", z: "print", name: "IKEA EKET szafka z 4 przegrodami, biały (otwarte półki pod stołem do kompletowania)", dims: "70 × 35 × 70 cm, 4 otwarte przegrody na papier, tonery i laptopy; na nóżkach EKET 10 cm razem 80 cm (stół musi stać min. ok. 88 cm)", sku: "603.339.54", price: 260, qty: 1, shop: IKEA, url: ip("eket-szafka-z-4-przegrodami-bialy-60333954"), avail: "28.11: w sprzedaży, na stanie", status: ["ok", "Pod stołem do kompletowania, bez drzwi i zamka"] },
  { k: "nogi_eket", z: "print", name: "IKEA EKET noga, metal/srebrny, 10 cm (opakowanie 4 szt.)", dims: "10 cm, regulowane stopki; regał nie stoi na podłodze", sku: "704.289.04", price: 65, qty: 1, shop: IKEA, url: ip("eket-noga-metal-srebrny-70428904"), avail: "28.11: w sprzedaży, na stanie", status: ["ok", "Do regału EKET"], noDraw: true },
  { k: "niszczarka", z: "print", name: "Niszczarka Fellowes Powershred 99Ci, P-4, 18 kartek, kosz 34 l", dims: "29 × 44 × 64 cm, ścinki 4 × 38 mm, niszczy też zszywki, spinacze i karty, 16,5 kg; stoi między bizhubem a stołem do kompletowania", price: 1519.98, qty: 1, shop: "Morele.net", url: "https://www.morele.net/niszczarka-fellowes-99ci-p-4-174401/", avail: "28.11: na stanie, sprzedaje Morele.net", status: ["warn", "Sprawdzić, czy otwarta taca boczna bizhuba nie zahacza o niszczarkę (64 cm)"], alt: [{ name: "Fellowes 79Ci P-4, 16 kartek, kosz 23 l (mniejsza)", price: 1068.93, url: "https://www.morele.net/niszczarka-fellowes-79ci-p-4-225077/" }, { name: "HP OneShred Auto 200CC P-4, automatyczny podajnik na 200 kartek, kosz 28 l", price: 1302.46, url: "https://www.morele.net/niszczarka-hp-hp-niszczarka-oneshred-auto-200cc-bialo-szara-13263815/" }] },
  { k: "akcesoria", z: "tech", name: "Bindownica, zszywacz, skaner (sprzęt szkoły)", dims: "na regale EKET albo na stole do kompletowania", qty: 1, status: ["mute", "Sprzęt, nie w tym zakupie"], outside: true, noDraw: true },
  { k: "an_szuflady", z: "kitchen", name: "IKEA METOD/MAXIMERA szafka z 3 szufladami, biały/Havstorp beżowy", dims: "60 × 60 cm", sku: "s09426701", price: 835, qty: 1, shop: IKEA, url: ip("metod-maximera-szafka-stojaca-z-3-szufladami-bialy-havstorp-bezowy-s09426701"), status: ["ok", "W sprzedaży, na stanie"] },
  { k: "an_polki", z: "kitchen", name: "IKEA METOD szafka stojąca z półkami, biały/Havstorp beżowy", dims: "60 × 60 cm, 1 drzwi, 2 półki; 2 szt.: obok szafki z szufladami i w miejscu zmywarki", sku: "s89469862", price: 325, qty: 2, shop: IKEA, url: ip("metod-szafka-st-polki-bialy-havstorp-bezowy-s89469862"), status: ["ok", "W sprzedaży, na stanie"] },
  { k: "nogi", z: "kitchen", name: "IKEA METOD noga szafki 8 cm (opakowanie 2 szt.)", dims: "4 szafki × 4 nogi = 16 szt.", sku: "705.560.67", price: 25, qty: 8, shop: IKEA, url: ip("metod-noga-szafki-70556067"), status: ["ok", "W sprzedaży, na stanie"], noDraw: true },
  { k: "an_zlew", z: "kitchen", name: "IKEA METOD szafka pod zlew, biały/Havstorp beżowy", dims: "60 × 60 cm", sku: "s49455131", price: 340, qty: 1, shop: IKEA, url: ip("metod-szafka-pod-zlew-bialy-havstorp-bezowy-s49455131"), status: ["ok", "W sprzedaży, na stanie"] },
  { k: "zlew", z: "kitchen", name: "IKEA LÅNGUDDEN zlew wpuszczany, 1 komora, stal nierdzewna", dims: "46 × 46 cm", sku: "s59157391", price: 289, qty: 1, shop: IKEA, url: ip("langudden-zlew-wpuszczany-1-komorowy-stal-nierdz-s59157391"), status: ["ok", "W sprzedaży, na stanie"], noDraw: true, alt: [{ name: "VRESJÖN 54 × 44 cm, stal", price: 1079, url: ip("vresjoen-zlew-wpuszczany-1-komora-stal-nierdz-s99425721") }] },
  { k: "bateria", z: "kitchen", name: "IKEA SALLSJÖN bateria kuchenna z uchwytem z boku, stalowy", dims: "jednouchwytowa", sku: "706.009.04", price: 349, qty: 1, shop: IKEA, url: ip("sallsjoen-bateria-kuchenna-z-uchwytem-z-boku-stalowy-70600904"), status: ["ok", "W sprzedaży, na stanie"], noDraw: true, alt: [{ name: "LAGAN, chrom (najtańsza)", price: 119, url: ip("lagan-bateria-kuchenna-chrom-10085027") }] },
  { k: "blat", z: "kitchen", name: "IKEA EKBACKEN blat, efekt jasnego dębu / laminat", dims: "246 × 63,5 × 2,8 cm, docinany na 240", sku: "506.338.11", price: 299, qty: 1, shop: IKEA, url: ip("ekbacken-blat-efekt-jasnego-debu-laminat-50633811"), status: ["ok", "W sprzedaży, na stanie"] },
  { k: "panel_sc", z: "kitchen", name: "IKEA LYSEKIL panel ścienny dwustronny, matowy biały / jasnoszary imitacja betonu (między blatem a szafkami wiszącymi)", dims: "119,6 × 55 × 0,2 cm, 2 szt. na 240 cm; przyklejany do ściany (klej montażowy osobno), można przyciąć; szafki wiszące od 145 cm", sku: "106.229.23", price: 199, qty: 2, shop: IKEA, url: ip("lysekil-panel-scienny-2str-jasnoszary-imitacja-betonu-matowy-bialy-10622923"), avail: "28.11: w sprzedaży, na stanie", status: ["ok", "Strona matowa biała do frontów Havstorp; druga strona: beton"], noDraw: true },
  { k: "an_wiszaca", z: "kitchen", name: "IKEA METOD szafka ścienna z półkami, 2 drzwi, biały/Havstorp beżowy", dims: "60 × 100 cm", sku: "s89461328", price: 405, qty: 4, shop: IKEA, url: ip("metod-szafka-scienna-z-polkami-2-drzwi-bialy-havstorp-bezowy-s89461328"), status: ["ok", "W sprzedaży, na stanie"] },
  { k: "cokol", z: "kitchen", name: "IKEA HAVSTORP cokół, beżowy", dims: "220 × 8 cm, 2 szt. na 240 cm", sku: "404.752.56", price: 95, qty: 2, shop: IKEA, url: ip("havstorp-cokol-bezowy-40475256"), status: ["ok", "W sprzedaży, na stanie"], noDraw: true },
  { k: "panel_m", z: "kitchen", name: "IKEA HAVSTORP panel maskujący, beżowy (bok szafki z szufladami)", dims: "39 × 86 cm", sku: "504.752.51", price: 110, qty: 1, shop: IKEA, url: ip("havstorp-panel-maskujacy-bezowy-50475251"), status: ["ok", "W sprzedaży, na stanie"], noDraw: true },
  { k: "led", z: "kitchen", name: "IKEA MITTLED listwa LED pod szafki, ściemniana, biały", dims: "60 cm", sku: "605.285.84", price: 65, qty: 4, shop: IKEA, url: ip("mittled-listwa-oswietleniowa-led-do-bl-kuch-mozna-przyciemniac-bialy-60528584"), status: ["ok", "W sprzedaży, na stanie"], noDraw: true },
  { k: "led_zas", z: "kitchen", name: "IKEA TRÅDFRI zasilacz 30 W do oświetlenia LED", dims: "do 9 listew", sku: "603.426.56", price: 130, qty: 1, shop: IKEA, url: ip("tradfri-zasilacz-do-sterowania-bezprzewod-smart-szary-60342656"), status: ["warn", "Dobrać przewód zasilający w sklepie"], noDraw: true },
  { k: "led_kabel", z: "kitchen", name: "IKEA VÅGDAL przewód połączeniowy, biały", dims: "3,5 m", sku: "704.636.00", price: 15, qty: 2, shop: IKEA, url: ip("vagdal-przewod-polaczeniowy-bialy-70463600"), status: ["ok", "W sprzedaży, na stanie"], noDraw: true },
  { k: "mikrofala", z: "kitchen", name: "IKEA TILLREDA kuchenka mikrofalowa wolnostojąca, biały", dims: "20 l, 700 W", sku: "504.867.92", price: 249, qty: 1, shop: IKEA, url: ip("tillreda-kuchenka-mikrofalowa-bialy-50486792"), status: ["ok", "W sprzedaży, na stanie"] },
  { k: "lodowka", z: "kitchen", name: "Lodówka wolnostojąca, szer. 60 cm", dims: "60 × 65 × ok. 220 cm, szara, zawiasy po stronie aneksu", qty: 1, status: ["mute", "Nie kupujemy w tym zakupie"], outside: true },
  { k: "stol_jad", z: "dining", name: "IKEA MITTZON stół konferencyjny, okleina dębowa / czarny, 140 × 68 cm, jednolity blat", dims: "140 × 68 × 75 cm, ten sam model co stół roboczy; 4 szt. zestawione w blok 280 × 136 cm, 8 miejsc (bez krzeseł na szczytach)", sku: "s39513952", price: 649, qty: 4, shop: IKEA, url: ip("mittzon-stol-konferencyjny-okl-deb-czarny-s39513952"), status: ["ok", "W sprzedaży, na stanie"] },
  { k: "krz_jad", z: "dining", name: "IKEA LÄKTARE krzesło konferencyjne, średnioszary / biały", dims: "55 × 50 × 84 cm, podłokietniki, siedzisko z okleiną brzozową, pokrycie Gunnared do prania, sztaplowane (do 5 szt.), 8 przy stole jadalni", sku: "s49503250", price: 299, qty: 8, shop: IKEA, url: ip("laektare-krzeslo-konferencyjne-srednioszary-bialy-s49503250"), status: ["ok", "W jadalni, w sprzedaży, na stanie"] },
  { k: "krz_zapas", z: "dining", name: "IKEA LÄKTARE krzesło konferencyjne, średnioszary / biały (dodatkowe, w narożniku)", dims: "4 szt. w jednym rzędzie: 2 stosy po 2 krzesła w narożniku przy oknie, na gości lub do rozsuniętych stołów", sku: "s49503250", price: 299, qty: 4, shop: IKEA, url: ip("laektare-krzeslo-konferencyjne-srednioszary-bialy-s49503250"), status: ["ok", "W sprzedaży, na stanie"] },
  { k: "sofa3", z: "lounge", name: "IKEA EKTORP sofa 3-osobowa, Hakebo ciemnoszary", dims: "218 × 88 × 88 cm, pokrycie zdejmowane, pranie w pralce", sku: "s39508998", price: 1999, qty: 2, shop: IKEA, url: ip("ektorp-sofa-3-osobowa-hakebo-ciemnoszary-s39508998"), status: ["ok", "W sprzedaży, na stanie"] },
  { k: "cmd_monitor", z: "cmd", sw: "tech", name: "Monitor dotykowy iiyama ProLite T2755MSC-B1, 27″ Full HD", dims: "36 × 61 cm, w pionie na stałym płaskim uchwycie ściennym (VESA 100 × 100, ok. 6 cm od ściany razem z obudową), 1920 × 1080, dotyk pojemnościowy 10-punktowy, 5,8 kg, VESA 100 × 100", price: 1819.94, qty: 1, shop: "Morele.net", url: "https://www.morele.net/monitor-iiyama-prolite-t2755msc-b1-13179166/", avail: "na stanie, sprzedaje Morele.net", status: ["ok", "Na stanie"], alt: [{ name: "iiyama ProLite T2755QSC-B1, 27″ QHD dotykowy", price: 2274.95, url: "https://www.morele.net/monitor-iiyama-prolite-t2755qsc-b1-13239211/" }] },
  { k: "cmd_pc", z: "cmd", name: "Komputer poleasingowy Lenovo ThinkCentre M70s SFF, i5-10400, 16 GB RAM, 512 GB SSD, Windows 11 Home", dims: "obudowa SFF, 2 × DisplayPort + HDMI: DisplayPort do ekranu dotykowego, HDMI do monitora na korytarzu; stoi na leżąco w dolnej przegrodzie regału EKET pod stołem do kompletowania", price: 1679, qty: 1, shop: "AMSO Wrocław, ul. Grabiszyńska 240 (poleasingowy, klasa A)", url: "https://amso.pl/product-pol-293417-Lenovo-ThinkCentre-M70s-i5-10400-6x2-9GHz-16GB-512GB-SSD-Windows-11-Home.html", avail: "28.11: 2 szt. w salonie AMSO Wrocław, od ręki; gwarancja 12 mies.", status: ["ok", "Odbiór od ręki we Wrocławiu"], alt: [{ name: "Ten sam komputer z dyskiem 256 GB (AMSO Wrocław)", price: 1599, url: "https://amso.pl/product-pol-285021-Lenovo-ThinkCentre-M70s-i5-10400-6x2-9GHz-16GB-256GB-SSD-Windows-11-Home.html" }, { name: "Dell OptiPlex 7080 SFF, i5-10500, 16 GB, 512 GB SSD (AMSO Wrocław; tylko 2 × DisplayPort, do HDMI kabel DP–HDMI)", price: 1829, url: "https://amso.pl/product-pol-293868-Dell-Optiplex-7080-SFF-i5-10500-6x3-1GHz-16GB-512GB-SSD-Windows-11-Home.html" }] },
  { k: "kabel_dp", z: "cmd", sw: "tech", name: "Kabel Gembird DisplayPort – DisplayPort 5 m (CC-DP2-5M)", dims: "z regału EKET do ekranu dotykowego, w listwie wzdłuż ściany z wejściem", price: 32.29, qty: 1, shop: "Morele.net", url: "https://www.morele.net/kabel-gembird-displayport-displayport-5m-czarny-cc-dp2-5m-9774142/", avail: "28.11: na stanie", status: ["ok", "Na stanie"], noDraw: true },
  { k: "kabel_usb", z: "cmd", sw: "tech", name: "Aktywny przedłużacz USB Manhattan 5 m (150712)", dims: "obsługa dotyku: przedłuża kabel USB monitora do komputera; aktywny, bo zwykły kabel tej długości może gubić sygnał", price: 76.43, qty: 1, shop: "Morele.net (sprzedawca Netinet)", url: "https://www.morele.net/kabel-usb-manhattan-przedluzacz-aktywny-usb-manhattan-usb-a-usb-a-5-m-czarny-150712-705899/", avail: "28.11: na stanie", status: ["ok", "Na stanie"], noDraw: true },
  { k: "kabel_hdmi", z: "cmd", sw: "tech", name: "Kabel Digitus HDMI – HDMI 10 m (AK-330118-100-S)", dims: "do monitora na korytarzu; długość do potwierdzenia po zmierzeniu trasy", price: 111.4, qty: 1, shop: "Morele.net", url: "https://www.morele.net/kabel-digitus-hdmi-hdmi-10m-czarny-ak-330118-100-s-630407/", avail: "28.11: na stanie", status: ["warn", "Zmierzyć trasę na korytarz"], noDraw: true },
  { k: "cmd_mount", z: "cmd", sw: "tech", name: "Stały uchwyt ścienny do monitora Neomounts NM-W25BLACK, VESA 75/100", dims: "10–32″, do 25 kg (monitor 5,8 kg), 1,2 cm od ściany, bez ramienia i przegubów: ekran nie ugina się przy dotyku; VESA 100 × 100 jest kwadratowe, więc monitor wisi w pionie po obróceniu", price: 66.28, qty: 1, shop: "Morele.net", url: "https://www.morele.net/neomounts-uchwyt-scienny-na-monitor-10-32-nm-w25black-4764189/", avail: "28.11: na stanie", status: ["warn", "Przed montażem sprawdzić, czy złącza monitora wychodzą w dół; przy 1,2 cm od ściany wtyk skierowany do tyłu się nie zmieści (wtedy wtyki kątowe)"], alt: [{ name: "Neomounts FPMA-W110BLACK, stały, 1,8 cm od ściany, VESA do 200 × 200", price: 125.99, url: "https://www.morele.net/neomounts-uchwyt-scienny-fpma-w110black-10-40-4764200/" }], noDraw: true },
  { k: "klucze", z: "storage", name: "Tablica na klucze do sal lekcyjnych, przy szafach skrytkowych", dims: "ok. 70 × 50 cm, korek z haczykami na ok. 50–60 kluczy, z opisem sal", qty: 1, status: ["mute", "Poza zakupem"], outside: true },
  { k: "tablica_biurka", z: "deco", name: "ALLboards tablica suchościeralna magnetyczna 200 × 100 cm, rama drewniana naturalna (nad biurkami)", dims: "200 × 100 cm, dół 110 cm", sku: "5902622411279", price: 402.95, qty: 1, shop: "Castorama (sprzedawca ALLboards)", url: "https://www.castorama.pl/departments/tablica-sucho-cieralna-magnetyczna-allboards-200x100-cm-rama-drewniana-naturalna-1-szt-/5902622411279_CAPL.prd", status: ["warn", "Tylko online, dostępność potwierdzić w koszyku"], alt: [{ name: "Ta sama tablica w ramie aluminiowej Premium Expo", price: 302.99, url: "https://www.castorama.pl/departments/tablica-sucho-cieralna-magnetyczna-200x100-cm-allboards-rama-aluminiowa-premium-expo-1-szt-/5902622410869_CAPL.prd" }] },
  { k: "tablica_druk", z: "deco", name: "ALLboards tablica suchościeralna magnetyczna 200 × 100 cm, rama drewniana naturalna (nad strefą druku)", dims: "200 × 100 cm, dół 165 cm (nad otwartym podajnikiem bizhuba)", sku: "5902622411279", price: 402.95, qty: 1, shop: "Castorama (sprzedawca ALLboards)", url: "https://www.castorama.pl/departments/tablica-sucho-cieralna-magnetyczna-allboards-200x100-cm-rama-drewniana-naturalna-1-szt-/5902622411279_CAPL.prd", status: ["warn", "Tylko online, dostępność potwierdzić w koszyku"] },
  { k: "rzutnik", z: "deco", name: "Białe pole na ścianie pod obraz z rzutnika (bez ekranu)", dims: "ok. 260 × 146 cm (16:9, ok. 118″), dół ok. 190 cm, góra ok. 336 cm, matowa biała farba, środek na osi stołu", qty: 1, status: ["mute", "Malowanie"], outside: true },
  { k: "zielen_sciana", z: "deco", name: "Wąskie pasy roślin zwisających po obu bokach pola rzutnika", dims: "2 listwy ok. 40 × 150 cm z doniczkami u góry, długie zwisające pędy (np. epipremnum, bluszcz, scindapsus)", qty: 2, status: ["mute", "Poza zakupem"], outside: true },
  { k: "ogloszenia", z: "deco", name: "ALLboards tablica korkowa 60 × 40 cm, rama drewniana naturalna (na filarach między oknami)", dims: "60 × 40 cm, dół 145 cm", sku: "5902622411194", price: 27.49, qty: 2, shop: "Castorama (sprzedawca ALLboards)", url: "https://www.castorama.pl/departments/tablica-korkowa-60x40-cm-allboards-rama-drewniana-naturalna-1-szt-/5902622411194_CAPL.prd", status: ["warn", "Tylko online, dostępność potwierdzić w koszyku"] },
  { k: "ogl_rog", z: "deco", name: "ALLboards tablica korkowa 80 × 60 cm, rama drewniana naturalna (filar w narożniku przy krzesłach)", dims: "80 × 60 cm, dół 125 cm, nad krzesłami", sku: "5902622416694", price: 40.99, qty: 1, shop: "Castorama (sprzedawca ALLboards)", url: "https://www.castorama.pl/departments/tablica-korkowa-allboards-80x60-cm-rama-drewniana-naturalna-1-szt-/5902622416694_CAPL.prd", status: ["warn", "Tylko online, dostępność potwierdzić w koszyku"] },
  { k: "zielen_szafy", z: "deco", name: "Doniczki na szafach skrytkowych", dims: "3 doniczki ok. 24 cm, niskie rośliny bez zwisających pędów (drzwiczki skrytek otwierają się swobodnie)", qty: 3, status: ["mute", "Poza zakupem"], outside: true },
  { k: "projektor", z: "tech", name: "Rzutnik pod sufitem na uchwycie z wysięgnikiem (sprzęt szkoły)", dims: "w linii lodówki, ok. 270 cm od ściany z obrazem, obiektyw na ok. 358 cm; obraz 260 × 146 cm wymaga współczynnika projekcji ok. 1,0–1,1", qty: 1, status: ["mute", "Poza zakupem"], outside: true },
  { k: "telefon", z: "tech", name: "Telefon stacjonarny na stole do kompletowania, przy bizhubie", dims: "gniazdo T1 nad blatem", qty: 1, status: ["mute", "Poza zakupem"], outside: true },
  { k: "ap", z: "tech", name: "Access point Wi-Fi na ścianie nad tablicą ogłoszeń w narożniku", dims: "zasilanie PoE z gniazda A1, ok. 230 cm od posadzki", qty: 1, status: ["mute", "Poza zakupem (sieć szkoły)"], outside: true },
  { k: "zielen_okna", z: "deco", name: "Zieleń w oknach i na filarach: doniczki na parapetach (wnęki 40 cm) i wiszące wysoko na filarach między oknami", dims: "3 parapety, 2 filary (doniczki od ok. 235 cm, pod nimi tablice ogłoszeń)", qty: 1, status: ["mute", "Poza zakupem"], outside: true },
  { k: "laptop", z: "tech", name: "Laptop KPO (tryb incognito)", dims: "już w szkole", qty: 4, status: ["ok", "Przydzielone do sali 16"], outside: true },
];
/* rzeczywiste kolory produktów (2D i 3D) */
const OAK = "#c9a273", ASH = "#d8c19b", PINE = "#dcbf8e", WHITE_FRAME = "#f1f0eb", HAV = "#cfbc98";
const PAL = {
  projektor: { col: "#f2f2f0" }, telefon: { col: "#2a2d2f" }, ap: { col: "#f4f4f2" },
  ogloszenia: { col: "#b88a55" }, ogl_rog: { col: "#b88a55" }, zielen_szafy: { col: "#6f9a5b" },
  krz_zapas: { col: "#8f9294" },
  szafa: { col: "#f1f0eb", front: "#c79e6c" }, scianka: { col: "#cdc3b0" },
  biurko: { col: PINE, frame: WHITE_FRAME }, lampa: { col: "#f4f4f2" }, podstawka: { col: "#f2f1ec" }, stol_pracy: { col: OAK, frame: "#2a2a2a" }, stol_jad: { col: OAK, frame: "#2a2a2a" },
  stol_wysoki: { col: ASH, frame: WHITE_FRAME }, krz_biuro: { col: "#8f9294" }, krz_pracy: { col: "#8f9294" }, krz_jad: { col: "#8f9294" },
  regal_druk: { col: "#f3f2ee" }, panel_sc: { col: "#f1f0ec" }, niszczarka: { col: "#3b3f42" }, an_szuflady: { col: HAV, body: WHITE_FRAME }, an_polki: { col: HAV, body: WHITE_FRAME }, an_zlew: { col: HAV, body: WHITE_FRAME },
  zmywarka: { col: "#f3f3f1" }, an_wiszaca: { col: HAV, body: WHITE_FRAME }, blat: { col: "#cfae80" }, lodowka: { col: "#8f9396" }, mikrofala: { col: "#f4f4f2" }, czajnik: { col: "#b3b8ba" },
  sofa3: { col: "#5d6061" }, sofa2: { col: "#8e9192" }, fotel: { col: "#dccfb7", frame: "#b98f5e" }, stolik: { col: "#c29a68" }, pojemniki: { col: "#f4f4f2" },
  druk_duza: { col: "#e3e4e2" }, finiszer: { col: "#e3e4e2" }, druk_mala: { col: "#dfe1e0" }, akcesoria: { col: "#4e5a5f" },
  przegroda: { col: "#d3c9b6" }, tablica_biurka: { col: "#f7f7f4" }, tablica_druk: { col: "#f7f7f4" }, klucze: { col: "#c8a678" }, rzutnik: { col: "#fcfcfa" },
  zielen_sciana: { col: "#6f9a5b" }, zielen_okna: { col: "#6f9a5b" },
  cmd_monitor: { col: "#25292b" }, cmd_pc: { col: "#25292b" }, laptop: { col: "#8a9398" },
};
const hex = (c) => parseInt(c.slice(1), 16);
const CAT = Object.fromEntries(C.map((c, i) => [c.k, { ...c, n: i + 1 }]));

/* rozmieszczenie: x od lewej ściany, y od ściany z wejściem, z = wysokość dołu, wszystko w cm */
const I = [];
const add = (k, o) => I.push({ k, z: 0, ...o });
[0, 90, 180].forEach((y) => add("szafa", { x: 0, y, w: 40, d: 90, h: 185, kind: "lockers", rows: 6, face: "E", label: "18" }));
add("scianka", { x: 590, y: 2, w: 5, d: 85, h: 205, kind: "panel" });
[285, 385].forEach((y, i) => add("biurko", { x: 0, y, w: 55, d: 90, h: 75, kind: "table", label: `Biurko ${i + 1}` }));
[285, 385].forEach((y) => add("podstawka", { x: 16, y: y + 32, w: 24, d: 26, h: 10, z: 75, kind: "box", ontop: true }));
[285, 385].forEach((y) => add("lampa", { x: 3, y: y + 72, w: 14, d: 14, h: 45, z: 75, kind: "dev", ontop: true }));
[[16, 315], [16, 415]].forEach(([x, y]) => add("laptop", { x, y, w: 24, d: 32, h: 2, z: 85, kind: "box", ontop: true }));
add("laptop", { x: 376, y: 300, w: 32, d: 24, h: 2, z: 75, kind: "box", ontop: true });
[330, 430].forEach((y) => add("krz_biuro", { cx: 92, cy: y, w: 50, d: 55, face: "W", kind: "chair", h: 84 }));
add("finiszer", { x: 315, y: 4, w: 54.3, d: 68.1, h: 102.3, kind: "box", label: "FS-539SD" });
add("druk_duza", { x: 369.3, y: 4, w: 61.5, d: 68.8, h: 120.7, kind: "box", label: "C450i" });
add("cmd_monitor", { x: 255, y: 0, w: 36, d: 6, h: 61, z: 100, kind: "box", above: true, label: "Ekran" });
add("cmd_pc", { x: 494, y: 4, w: 30, d: 33, h: 9.5, z: 12, kind: "box", ontop: true });
add("druk_mala", { x: 0, y: 528.5, w: 67, d: 59, h: 77, z: 0, kind: "box", label: "B7130" });
add("stol_wysoki", { x: 465, y: 0, w: 120, d: 70, h: 95, kind: "table", label: "Stół wysoki" });
add("regal_druk", { x: 490, y: 3, w: 70, d: 35, h: 80, kind: "box", label: "EKET" });
add("niszczarka", { x: 433, y: 8, w: 29, d: 44, h: 64, kind: "box" });
add("lodowka", { x: 600, y: 0, w: 60, d: 65, h: 220, kind: "box", label: "Lodówka" });
add("an_szuflady", { x: 660, y: 0, w: 60, d: 60, h: 86, kind: "box", label: "Szuf." });
add("an_polki", { x: 720, y: 0, w: 60, d: 60, h: 86, kind: "box", label: "Półki" });
add("an_polki", { x: 780, y: 0, w: 60, d: 60, h: 86, kind: "box", label: "Półki" });
add("an_zlew", { x: 840, y: 0, w: 60, d: 60, h: 86, kind: "box", label: "Zlew" });
add("blat", { x: 660, y: 0, w: 240, d: 63, h: 4, z: 86, kind: "box", hidePlan: true });
add("panel_sc", { x: 660, y: 0, w: 240, d: 0.6, h: 55, z: 90, kind: "box", hidePlan: true });
add("mikrofala", { x: 728, y: 4, w: 45, d: 34, h: 26, z: 90, kind: "box", ontop: true });
[660, 720, 780, 840].forEach((x) => add("an_wiszaca", { x, y: 0, w: 60, d: 37, h: 100, z: 145, kind: "box", above: true }));
add("stol_pracy", { x: 240, y: 252, w: 140, d: 68, h: 75, kind: "table", label: "Stół roboczy · 8" });
add("stol_pracy", { x: 380, y: 252, w: 140, d: 68, h: 75, kind: "table" });
add("stol_pracy", { x: 240, y: 320, w: 140, d: 68, h: 75, kind: "table" });
add("stol_pracy", { x: 380, y: 320, w: 140, d: 68, h: 75, kind: "table" });
[275, 345, 415, 485].forEach((x) => { add("krz_pracy", { cx: x, cy: 227, w: 55, d: 50, face: "S", kind: "chair", h: 84 }); add("krz_pracy", { cx: x, cy: 413, w: 55, d: 50, face: "N", kind: "chair", h: 84 }); });
add("stol_jad", { x: 688, y: 175, w: 68, d: 140, h: 75, kind: "table", label: "Jadalnia · 8" });
add("stol_jad", { x: 756, y: 175, w: 68, d: 140, h: 75, kind: "table" });
add("stol_jad", { x: 688, y: 315, w: 68, d: 140, h: 75, kind: "table" });
add("stol_jad", { x: 756, y: 315, w: 68, d: 140, h: 75, kind: "table" });
[210, 280, 350, 420].forEach((y) => { add("krz_jad", { cx: 663, cy: y, w: 50, d: 55, face: "E", kind: "chair", h: 84 }); add("krz_jad", { cx: 849, cy: y, w: 50, d: 55, face: "W", kind: "chair", h: 84 }); });
[790, 845].forEach((x) => add("krz_zapas", { x, y: 545, w: 55, d: 50, h: 93, n: 2, face: "N", kind: "stack", label: "2" }));
add("sofa3", { x: 172, y: 497, w: 218, d: 88, h: 88, face: "N", kind: "sofa", label: "Sofa 3", seats: 3 });
add("sofa3", { x: 400, y: 497, w: 218, d: 88, h: 88, face: "N", kind: "sofa", label: "Sofa 3", seats: 3 });
[276, 376].forEach((y) => add("przegroda", { x: 0, y, w: 70, d: 8, h: 72, z: 75, kind: "divider" }));
add("klucze", { x: 55, y: 0, w: 70, d: 3, h: 50, z: 130, kind: "board", above: true });
add("tablica_biurka", { x: 0, y: 305, w: 3, d: 200, h: 100, z: 110, kind: "board", above: true });
add("tablica_druk", { x: 350, y: 0, w: 200, d: 3, h: 100, z: 165, kind: "board", above: true });
add("rzutnik", { x: 899, y: 185, w: 1, d: 260, h: 146, z: 190, kind: "board", above: true });
add("zielen_sciana", { x: 892, y: 137, w: 8, d: 40, h: 150, z: 200, kind: "plants", above: true });
add("zielen_sciana", { x: 892, y: 453, w: 8, d: 40, h: 150, z: 200, kind: "plants", above: true });
WINDOWS.forEach(([a, b]) => [0.25, 0.5, 0.75].forEach((f) => add("zielen_okna", { x: a + (b - a) * f - 9, y: 612, w: 18, d: 18, h: 35, z: SILL, kind: "pot" })));
[[275, 362], [526, 618]].forEach(([a, b]) => add("zielen_okna", { x: (a + b) / 2 - 12, y: 588, w: 24, d: 12, h: 40, z: 235, kind: "pot", above: true }));
[[275, 362], [526, 618]].forEach(([a, b]) => add("ogloszenia", { x: (a + b) / 2 - 30, y: 597, w: 60, d: 3, h: 40, z: 145, kind: "board", above: true }));
add("projektor", { x: 614, y: 302, w: 32, d: 26, h: 11, z: 352, kind: "dev", above: true });
add("telefon", { x: 532, y: 6, w: 20, d: 18, h: 7, z: 95, kind: "dev", ontop: true });
add("ap", { x: 828, y: 596, w: 24, d: 4, h: 24, z: 218, kind: "dev", above: true });
add("ogl_rog", { x: 800, y: 597, w: 80, d: 3, h: 60, z: 125, kind: "board", above: true });
[[8, 30], [8, 130], [8, 225]].forEach(([x, y], i) => add("zielen_szafy", { x, y, w: 24, d: 24, h: 40, z: 185, kind: "pot", above: true }));
I.forEach((it) => { if (it.cx != null) { it.x = it.cx - it.w / 2; it.y = it.cy - it.d / 2; } });

/* instalacje proponowane */
const INST = [
  // E: 230 V, D: RJ45 kat. 6, T: telefon, H: HDMI, A: access point, P: puszka podłogowa, W: woda; z: oś punktu od posadzki (cm)
  { t: "p230", x: 400, y: 0, z: 30, txt: "bizhub C450i", spec: "Gniazdo podwójne 230 V z uziemieniem, osobny obwód 16 A" },
  { t: "p230", x: 340, y: 0, z: 30, txt: "Finiszer FS-539SD", spec: "Gniazdo podwójne 230 V z uziemieniem (finiszer i rezerwa)" },
  { t: "p230", x: 303, y: 0, z: 147, txt: "Centrum dowodzenia, obok ekranu", spec: "Gniazdo podwójne 230 V (zasilanie ekranu); nie za ekranem, bo uchwyt trzyma ekran 1,2 cm od ściany" },
  { t: "p230", x: 500, y: 0, z: 110, txt: "Stół do kompletowania TROTTEN, nad blatem", spec: "Gniazdo podwójne 230 V (bindownica, zszywacz, skaner)" },
  { t: "p230", x: 480, y: 0, z: 30, txt: "Stół do kompletowania, pod blatem", spec: "Gniazdo podwójne 230 V (zasilacze laptopów w szafce, niszczarka)" },
  { t: "p230", x: 630, y: 0, z: 30, txt: "Lodówka, za lodówką", spec: "Gniazdo podwójne 230 V, osobny obwód (płaskie, żeby lodówka stała blisko ściany)" },
  { t: "p230", x: 680, y: 0, z: 110, txt: "Aneks, nad blatem (mikrofalówka)", spec: "Gniazdo podwójne 230 V, obwód kuchenny 16 A" },
  { t: "p230", x: 750, y: 0, z: 110, txt: "Aneks, nad blatem (mikrofalówka)", spec: "Gniazdo podwójne 230 V, obwód kuchenny" },
  { t: "p230", x: 810, y: 0, z: 30, txt: "Rezerwa w szafce aneksu (miejsce po zmywarce)", spec: "Gniazdo podwójne 230 V, osobny obwód 16 A" },
  { t: "p230", x: 0, y: 335, z: 95, txt: "Biurko 1, nad blatem", spec: "Gniazdo podwójne 230 V na ścianie nad blatem (laptop, lampka, ładowarka)" },
  { t: "p230", x: 0, y: 435, z: 95, txt: "Biurko 2, nad blatem", spec: "Gniazdo podwójne 230 V na ścianie nad blatem (laptop, lampka, ładowarka)" },
  { t: "p230", x: 0, y: 535, z: 30, txt: "Xerox B7130 przy biurkach", spec: "Gniazdo podwójne 230 V z uziemieniem" },
  { t: "p230", x: 630, y: 315, z: 450, ceil: true, txt: "Rzutnik pod sufitem", spec: "Gniazdo podwójne 230 V w puszce sufitowej przy uchwycie rzutnika" },
  { t: "p230", x: 478, y: 0, z: 110, txt: "Stół do druku (przy lodówce), nad blatem: ładowanie", spec: "Gniazdo natynkowe potrójne 230 V z ładowarką USB-A + USB-C, wystające ze ściany (ładowanie telefonów i laptopów)" },
  { t: "rj", x: 303, y: 0, z: 110, txt: "Centrum dowodzenia, obok ekranu (rezerwa)", spec: "Gniazdo RJ45 kat. 6 podwójne (rezerwa; komputer stoi w strefie druku i korzysta z gniazda przy stole)" },
  { t: "rj", x: 415, y: 0, z: 30, txt: "bizhub C450i (internet do drukarki)", spec: "Gniazdo RJ45 kat. 6 podwójne: drukarka + rezerwa" },
  { t: "rj", x: 565, y: 0, z: 110, txt: "Stół do kompletowania, nad blatem", spec: "Gniazdo RJ45 kat. 6 podwójne (skaner, rezerwa)" },
  { t: "rj", x: 0, y: 585, z: 30, txt: "Xerox B7130 (internet do drukarki)", spec: "Gniazdo RJ45 kat. 6 podwójne: drukarka + rezerwa" },
  { t: "tel", x: 540, y: 0, z: 110, txt: "Telefon stacjonarny na stole przy bizhubie", spec: "Gniazdo telefoniczne RJ45 (lub RJ11 wg centrali szkoły) nad blatem; przy telefonie VoIP przewód kat. 6 jak punkty D" },
  { t: "ap", x: 840, y: 600, z: 230, txt: "Access point Wi-Fi nad tablicą ogłoszeń w narożniku", spec: "Przewód U/UTP kat. 6 z gniazdem RJ45 w puszce natynkowej za AP; zasilanie przez PoE (bez gniazda 230 V)" },
  { t: "hdmi", x: 520, y: 0, z: 110, txt: "Stół do druku (przy lodówce), nad blatem: laptop → rzutnik", spec: "Gniazdo HDMI w ramce z gniazdami (moduł keystone HDMI), przewód w ścianie do rzutnika" },
  { t: "hdmi", x: 645, y: 315, z: 450, ceil: true, txt: "Rzutnik pod sufitem", spec: "Wyjście przewodu HDMI (z gniazda H1) w puszce sufitowej przy rzutniku" },
  { t: "h2o", x: 880, y: 0, z: 50, txt: "Zlew w narożniku aneksu", spec: "Woda zimna i ciepła (zawory pod zlewem), odpływ Ø50" },
];
const INST_PREFIX = { p230: "E", rj: "D", tel: "T", hdmi: "H", ap: "A", box: "P", h2o: "W" };
{ const cnt = {}; INST.forEach((q) => { cnt[q.t] = (cnt[q.t] || 0) + 1; q.code = INST_PREFIX[q.t] + cnt[q.t]; }); }
const instWall = (q) => q.ceil ? "sufit" : q.floor ? "posadzka" : q.y === 0 ? "N" : q.x === 0 ? "W" : q.y >= 600 ? "S" : q.x >= 900 ? "E" : null;
// trasy orientacyjne: e – 230 V, d – sieć, t – telefon, h – HDMI; lv: s – w ścianie / listwie, c – pod sufitem, f – w posadzce
const ROUTES = [
  { t: "e", lv: "s", pts: [[124, 4], [4, 4], [4, 540]] },
  { t: "e", lv: "s", pts: [[236, 4], [896, 4]] },
  { t: "e", lv: "c", pts: [[596, 4], [630, 315]] },
  { t: "d", lv: "s", pts: [[124, 10], [10, 10], [10, 585]] },
  { t: "d", lv: "s", pts: [[236, 10], [565, 10]] },
  { t: "d", lv: "c", pts: [[236, 10], [236, 22], [886, 22], [886, 592], [840, 592]] },
  { t: "t", lv: "s", pts: [[236, 15], [540, 15]] },
  { t: "h", lv: "s", pts: [[520, 6], [520, 20]] },
  { t: "h", lv: "c", pts: [[520, 20], [645, 315]] },
];

/* kontrola przejść: odcinek pomiaru na rzucie + wymagane minimum */
const CHECKS = [
  { a: [120, 340], b: [240, 340], need: 90, name: "Przejście od wejścia między krzesłami biurek a stołem roboczym", why: "Główny ciąg komunikacyjny w głąb sali" },
  { a: [400, 73], b: [400, 192], need: 120, name: "Strefa obsługi przed bizhubem C450i (wysuwanie kaset ok. 62 cm + osoba)", why: "Obsługa, otwieranie modułów, kolejka przy wydruku", soft: 100 },
  { a: [520, 190], b: [520, 300], hide: true },
  { a: [520, 300], b: [638, 300], need: 90, name: "Stół roboczy ↔ krzesła jadalni", why: "Przejście do aneksu i jadalni" },
  { a: [756, 60], b: [756, 175], need: 100, name: "Front aneksu ↔ szczyt stołu jadalni", why: "Praca przy zlewie, otwarte szafki, przejście" },
  { a: [824, 390], b: [900, 390], need: 75, name: "Krawędź stołu jadalni ↔ prawa ściana", why: "Odsunięcie krzeseł, bez przejścia za nimi" },
  { a: [756, 455], b: [756, 600], need: 90, name: "Szczyt stołu jadalni ↔ ściana z oknami", why: "Dojście do stosów krzeseł w narożniku" },
  { a: [480, 448], b: [480, 497], need: 75, name: "Krzesła stołu roboczego (odsunięte) ↔ front sof", why: "Miejsce na nogi siedzących na sofie", soft: 45 },
  { a: [24, 475], b: [24, 527], need: 30, name: "Biurko 2 ↔ Xerox", why: "Odstęp od drukarki: dostęp z boku, przewody, wentylacja" },
  { a: [67, 560], b: [172, 560], need: 100, name: "Front Xeroxa B7130 ↔ sofa", why: "Obsługa drukarki przy biurkach, wymiana tonera" },
  { a: [40, 215], b: [248, 215], need: 120, name: "Front szaf skrytkowych ↔ krzesło stołu roboczego", why: "Otwarte drzwiczki skrytek i przejście do biurek" },
  { a: [40, 140], b: [125, 140], need: 70, name: "Strefa przed szafami skrytkowymi", why: "Otwieranie drzwiczek skrytek", fixedOk: true },
  { a: [60, 560], b: [60, 600], hide: true },
];
CHECKS.forEach((c) => {
  if (c.hide) return;
  c.val = Math.round(Math.hypot(c.b[0] - c.a[0], c.b[1] - c.a[1]));
  c.st = c.val >= c.need ? "ok" : (c.soft && c.val >= c.soft ? "warn" : "bad");
  if (c.fixedOk) c.st = "ok";
});
const VISIBLE_CHECKS = CHECKS.filter((c) => !c.hide);

/* ---------- pomocnicze ---------- */
const el = (tag, attrs = {}, parent) => {
  const n = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v != null) n.setAttribute(k, v);
  if (parent) parent.appendChild(n);
  return n;
};
const txt = (parent, x, y, s, cls, extra = {}) => { const t = el("text", { x, y, class: cls, ...extra }, parent); t.textContent = s; return t; };
const fmt = (v) => v.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł";
const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m]);

/* ---------- liczby w nagłówku ---------- */
const stacked = I.filter((i) => i.kind === "stack").reduce((n, i) => n + i.n, 0);
const seats = I.filter((i) => i.kind === "chair").length + I.filter((i) => i.kind === "sofa").reduce((n, i) => n + (i.seats || 2), 0);
const known = C.filter((c) => c.price && !c.outside).reduce((s, c) => s + c.price * c.qty, 0);
document.getElementById("facts").innerHTML = [
  ["Powierzchnia", "54 m² <small>900 × 600 cm</small>"],
  ["Miejsca siedzące", `${seats} <small>ustawione, + ${stacked} dodatkowe krzesła w narożniku</small>`],
  ["Skrytki", "54 <small>3 szafy × 18</small>"],
  ["Drukarki A3", "2 <small>przy wejściu i przy biurkach</small>"],
  ["Aneks", "240 cm <small>+ lodówka 60 cm</small>"],
  ["Zakup mebli i aneksu", `${Math.round(known).toLocaleString("pl-PL")} zł <small>brutto, bez dostawy</small>`],
].map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join("");

/* symbol punktu instalacyjnego: koło (230 V, RJ45, woda), romb (telefon), kwadrat (puszka, HDMI), sześciokąt (AP) */
function instSymbol(parent, p, x, y, r) {
  if (p.t === "box" || p.t === "hdmi") return el("rect", { x: x - r, y: y - r, width: 2 * r, height: 2 * r, class: p.t }, parent);
  if (p.t === "tel") return el("path", { d: `M ${x} ${y - r * 1.25} L ${x + r * 1.25} ${y} L ${x} ${y + r * 1.25} L ${x - r * 1.25} ${y} Z`, class: p.t }, parent);
  if (p.t === "ap") return el("path", { d: [0, 1, 2, 3, 4, 5].map((k) => { const a = Math.PI / 6 + k * Math.PI / 3; return `${k ? "L" : "M"} ${(x + Math.cos(a) * r * 1.2).toFixed(1)} ${(y + Math.sin(a) * r * 1.2).toFixed(1)}`; }).join(" ") + " Z", class: p.t }, parent);
  return el("circle", { cx: x, cy: y, r, class: p.t }, parent);
}

/* ---------- RZUT 2D ---------- */
const plan = document.getElementById("plan");
function drawPlan() {
  plan.innerHTML = "";
  plan.setAttribute("viewBox", "-95 -175 1090 935");
  const g = (cls) => el("g", { class: cls }, plan);
  // ściany
  el("rect", { x: -15, y: -15, width: ROOM.w + 30, height: ROOM.d + 15 + SOUTH_T, class: "s-wall" }, plan);
  el("rect", { x: 0, y: 0, width: ROOM.w, height: ROOM.d, class: "s-floor" }, plan);
  // otwór drzwiowy i okna
  el("rect", { x: DOOR.x0, y: -16, width: DOOR.x1 - DOOR.x0, height: 17, class: "s-floor" }, plan);
  WINDOWS.forEach(([a, b]) => {
    el("rect", { x: a, y: ROOM.d - 1, width: b - a, height: NICHE + 1, fill: "#e9e2d4", stroke: "var(--wall)", "stroke-width": 1 }, plan);
    el("line", { x1: a, y1: ROOM.d + NICHE + 2, x2: b, y2: ROOM.d + NICHE + 2, class: "glass" }, plan);
    el("line", { x1: a, y1: ROOM.d + NICHE + 7, x2: b, y2: ROOM.d + NICHE + 7, class: "glass" }, plan);
  });
  // siatka
  const grid = g("grid layer-grid");
  for (let x = 50; x < ROOM.w; x += 50) el("line", { x1: x, y1: 0, x2: x, y2: ROOM.d, class: "s-grid" + (x % 100 ? "" : " major") }, grid);
  for (let y = 50; y < ROOM.d; y += 50) el("line", { x1: 0, y1: y, x2: ROOM.w, y2: y, class: "s-grid" + (y % 100 ? "" : " major") }, grid);
  // strefy obsługi
  const zones = g("zones layer-zones");
  [
    [303, 73, 297, 119, "Obsługa druku i stołu"],
    [240, 10, 66, 63, "Ekran"],
    [67, 527, 100, 62, "Obsługa A3"],
    [45, 0, 80, 180, "Dostęp do skrytek"],
    [600, 65, 300, 95, "Lodówka i aneks"],
    [135, 180, 95, 315, "Przejście"],
    [510, 190, 175, 300, "Przejście"],
  ].forEach(([x, y, w, h, s]) => {
    const z = el("g", { class: "zone" }, zones);
    el("rect", { x, y, width: w, height: h }, z);
    txt(z, x + 6, y + 16, s, "");
  });
  // drzwi
  const door = g("doorg");
  el("line", { x1: DOOR.hinge, y1: -15, x2: DOOR.hinge, y2: -15 - DOOR.leaf, class: "door" }, door);
  el("path", { d: `M ${DOOR.hinge - DOOR.leaf} -15 A ${DOOR.leaf} ${DOOR.leaf} 0 0 1 ${DOOR.hinge} ${-15 - DOOR.leaf}`, class: "door", "stroke-dasharray": "4 4" }, door);
  txt(plan, DOOR.x1 + 8, -40, "WEJŚCIE: drzwi otwierane na zewnątrz, w prawo", "wtxt", { "text-anchor": "start" });
  txt(plan, ROOM.w - 4, -30, "WODA ▾", "wtxt", { "text-anchor": "end" });
  const nn0 = 0;
  txt(plan, ROOM.w / 2, ROOM.d + SOUTH_T + 30, "OKNA we wnękach 40 cm (3 wg rzutu architektonicznego, szkic pokazuje 4)", "wtxt", { "text-anchor": "middle" });
  // grzejniki
  RADIATORS.forEach((r) => el("rect", { x: r.x, y: r.y, width: r.w, height: r.d, class: "it rad" }, plan));

  // meble: najpierw stojące, potem leżące na blatach, na końcu wiszące
  const items = g("items layer-furn");
  const order = (it) => (it.above ? 2 : it.ontop ? 1 : 0);
  const seenBadge = new Set();
  [...I].filter((it) => !it.hidePlan).sort((a, b) => order(a) - order(b)).forEach((it) => {
    const c = CAT[it.k];
    const gi = el("g", { class: "item", "data-c": it.k, tabindex: "-1" }, items);
    const cls = `it ${it.kind === "chair" ? "chair" : c.sw || c.z}${it.above ? " above" : ""}${it.ontop ? " ontop" : ""}`;
    if (it.kind === "chair") {
      el("rect", { x: it.x + 3, y: it.y + 3, width: it.w - 6, height: it.d - 6, rx: 6, class: cls }, gi);
      const b = { N: [it.x + 4, it.y + it.d - 9, it.w - 8, 6], S: [it.x + 4, it.y + 3, it.w - 8, 6], E: [it.x + 3, it.y + 4, 6, it.d - 8], W: [it.x + it.w - 9, it.y + 4, 6, it.d - 8] }[it.face];
      el("rect", { x: b[0], y: b[1], width: b[2], height: b[3], rx: 2, class: "it " + c.z }, gi);
    } else if (it.kind === "stack") {
      for (let q = it.n - 1; q >= 0; q--) el("rect", { x: it.x + 3 + q * 1.5, y: it.y + 3 - q * 1.5, width: it.w - 6, height: it.d - 6, rx: 6, class: "it chair" }, gi);
      el("rect", { x: it.x + 4, y: it.y + it.d - 9, width: it.w - 8, height: 6, rx: 2, class: "it " + c.z }, gi);
    } else if (it.kind === "round") {
      el("circle", { cx: it.x + it.w / 2, cy: it.y + it.d / 2, r: it.w / 2, class: cls }, gi);
    } else if (it.kind === "sofa") {
      el("rect", { x: it.x, y: it.y, width: it.w, height: it.d, rx: 8, class: cls }, gi);
      el("rect", { x: it.x + 18, y: it.y + 6, width: it.w - 36, height: it.d - 26, rx: 5, class: cls, "fill-opacity": "0.55" }, gi);
    } else {
      el("rect", { x: it.x, y: it.y, width: it.w, height: it.d, class: cls }, gi);
      if (it.kind === "panel" && it.w >= it.d) [it.x + 2, it.x + it.w - 6].forEach((fx) => el("rect", { x: fx, y: it.y + it.d / 2 - 25, width: 4, height: 50, class: cls }, gi));
      if (it.kind === "panel" && it.w < it.d) [it.y + 2, it.y + it.d - 6].forEach((fy) => el("rect", { x: it.x + it.w / 2 - 25, y: fy, width: 50, height: 4, class: cls }, gi));
      if (it.kind === "lockers") for (let i = 1; i < 3; i++) el("line", { x1: it.x + 6, y1: it.y + (it.d * i) / 3, x2: it.x + it.w, y2: it.y + (it.d * i) / 3, class: "it", "stroke-width": 0.8 }, gi);
      if (it.k === "an_zlew") el("rect", { x: it.x + 10, y: it.y + 10, width: 42, height: 36, rx: 6, class: "it", fill: "none" }, gi);
    }
    const pal = PAL[it.k];
    if (pal) gi.querySelectorAll("rect.it, circle.it").forEach((n, idx) => {
      if (it.kind === "plants" || it.kind === "pot") { n.style.fill = pal.col; n.style.fillOpacity = it.above ? 0.55 : 1; return; }
      if (n.classList.contains("above")) { n.style.stroke = "var(--wall)"; return; }
      n.style.fill = it.kind === "chair" && idx === 1 ? "#cfb08a" : it.kind === "lockers" ? pal.front : pal.col;
    });
    if (it.label && !it.above) {
      const vertical = it.d > it.w * 1.4 && it.w < 70;
      const cx = it.x + it.w / 2, cy = it.y + it.d / 2;
      const small = it.w < 70 || it.d < 45;
      txt(gi, cx, cy + 4, it.label, "lbl" + (small ? " sm" : ""), { "text-anchor": "middle", transform: vertical ? `rotate(-90 ${cx} ${cy + 4})` : null });
    }
    if (!seenBadge.has(it.k)) {
      seenBadge.add(it.k);
      const pos = badgePos(it);
      const bg = el("g", { class: "badge layer-num layer-furn" }, plan);
      el("circle", { cx: pos[0], cy: pos[1], r: 10 }, bg);
      txt(bg, pos[0], pos[1] + 4, String(c.n), "", { "text-anchor": "middle" });
    }
  });

  // wymiary
  const dims = g("dim layer-dims");
  dimH(dims, 0, ROOM.w, -150, "900");
  dimV(dims, 0, ROOM.d, -70, "600");
  chainH(dims, [0, DOOR.x0, DOOR.x1, 255, 291, 315, 369, 431, 465, 585, 600, 660, 900], -125);
  chainV(dims, [0, 180, 230, 350, 470, 520, 600], -40);
  chainH(dims, [0, 112, 275, 362, 526, 618, 780, 900], ROOM.d + SOUTH_T + 50);
  chainV(dims, [0, 60, 215, 495, 600], ROOM.w + 40);
  // wymiary mebli w środku
  dimH(dims, 240, 520, 252 - 57, "280", true);
  dimV(dims, 252, 388, 532, "136", true);
  dimV(dims, 215, 495, 745, "280", true);

  // kontrola przejść
  const chk = g("layer-chk");
  VISIBLE_CHECKS.forEach((c, i) => {
    const cg = el("g", { class: "chk " + c.st }, chk);
    el("line", { x1: c.a[0], y1: c.a[1], x2: c.b[0], y2: c.b[1] }, cg);
    [c.a, c.b].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 2.6, fill: "currentColor", class: "", style: "fill: var(--" + (c.st === "ok" ? "accent" : c.st === "warn" ? "warn" : "bad") + ")" }, cg));
    const horiz = Math.abs(c.b[0] - c.a[0]) > Math.abs(c.b[1] - c.a[1]);
    const mx = (c.a[0] + c.b[0]) / 2, my = (c.a[1] + c.b[1]) / 2;
    txt(cg, horiz ? mx : mx + 6, horiz ? my - 6 : my + 4, `${c.val}`, "", { "text-anchor": horiz ? "middle" : "start" });
  });

  // instalacje
  const ins = g("inst layer-inst");
  INST.forEach((p) => {
    const px = p.x === 0 ? 6 : p.x >= 900 ? 894 : p.x, py = p.y === 0 ? 6 : p.y >= 600 ? 594 : p.y;
    instSymbol(ins, p, px, py, 6);
    const nIdx = INST.filter((q) => q.y === 0 && !q.ceil && !q.floor).sort((a, b) => a.x - b.x).indexOf(p);
    const ox = p.x === 0 ? 10 : p.ceil ? (p.t === "p230" ? -10 : 10) : 0, oy = p.y === 0 ? (nIdx % 2 ? 32 : 20) : p.ceil ? 4 : -10;
    txt(ins, px + ox, py + oy, p.code, "code", { "text-anchor": p.x === 0 ? "start" : p.ceil ? (p.t === "p230" ? "end" : "start") : "middle" });
  });
  const lg = el("g", { class: "inst layer-inst" }, plan);
  [["p230", "E 2×230 V"], ["rj", "D RJ45"], ["tel", "T telefon"], ["hdmi", "H HDMI"], ["ap", "A Wi-Fi"], ["h2o", "W woda"]].forEach(([t, s], i) => {
    const x = 380 + i * 92, y = ROOM.d + SOUTH_T + 88;
    instSymbol(lg, { t }, x, y, 6);
    txt(lg, x + 10, y + 4, s, "");
  });

  // strzałka północy umownej
  const nn = el("g", { class: "north", transform: "translate(965 -165)" }, plan);
  el("path", { d: "M0 22 L8 0 L16 22 L8 17 Z", fill: "var(--ink)" }, nn);
  txt(nn, 8, 38, "N*", "", { "text-anchor": "middle" });
  // podziałka
  const sc = el("g", { class: "dim", transform: `translate(0 ${ROOM.d + SOUTH_T + 88})` }, plan);
  for (let i = 0; i < 4; i++) el("rect", { x: i * 50, y: -5, width: 50, height: 8, fill: i % 2 ? "var(--sheet)" : "var(--ink)", stroke: "var(--ink)", "stroke-width": 1 }, sc);
  txt(sc, 0, 20, "0", ""); txt(sc, 100, 20, "1 m", "", { "text-anchor": "middle" }); txt(sc, 200, 20, "2 m", "", { "text-anchor": "middle" });

  applyLayers();
  bindPlanItems();
}
function badgePos(it) {
  const map = {
    szafa: [60, 135], przegroda: [84, 372], klucze: [92, 22], tablica_biurka: [24, 303], tablica_druk: [452, 26], rzutnik: [872, 315], zielen_sciana: [872, 157], zielen_okna: [196, 632], ogloszenia: [318, 572], ogl_rog: [840, 572], projektor: [630, 286], telefon: [560, 40], ap: [812, 585], zielen_szafy: [22, 70], cmd_monitor: [256, 26], cmd_pc: [284, 50], scianka: [575, 100], biurko: [70, 296], krz_biuro: [130, 326], lampa: [8, 352], podstawka: [52, 338], stol_pracy: [232, 262], krz_pracy: [300, 196],
    druk_duza: [400, 92], finiszer: [342, 92], druk_mala: [88, 582], stol_wysoki: [575, 88], regal_druk: [525, 60], niszczarka: [447, 70], lodowka: [630, 98], czajnik: [705, 110], mikrofala: [750, 110],
    an_szuflady: [690, 76], an_polki: [750, 76],  an_zlew: [880, 76], an_wiszaca: [780, 132], blat: [850, 132],
    stol_jad: [700, 196], krz_jad: [648, 182], krz_zapas: [845, 530], sofa3: [185, 486], sofa2: [412, 486], stolik: [577, 508], fotel: [642, 494], laptop: [44, 365],
  };
  return map[it.k] || [it.x + it.w + 10, it.y];
}
function dimH(g, x0, x1, y, label, inner) {
  el("line", { x1: x0, y1: y, x2: x1, y2: y }, g);
  [x0, x1].forEach((x) => el("line", { x1: x - 4, y1: y + 4, x2: x + 4, y2: y - 4, class: "tick" }, g));
  if (!inner) [x0, x1].forEach((x) => el("line", { x1: x, y1: y - 6, x2: x, y2: y + 6 }, g));
  txt(g, (x0 + x1) / 2, y - 5, label, "", { "text-anchor": "middle" });
}
function dimV(g, y0, y1, x, label, inner) {
  el("line", { x1: x, y1: y0, x2: x, y2: y1 }, g);
  [y0, y1].forEach((y) => el("line", { x1: x - 4, y1: y + 4, x2: x + 4, y2: y - 4, class: "tick" }, g));
  if (!inner) [y0, y1].forEach((y) => el("line", { x1: x - 6, y1: y, x2: x + 6, y2: y }, g));
  const cx = x - 6, cy = (y0 + y1) / 2;
  txt(g, cx, cy, label, "", { "text-anchor": "middle", transform: `rotate(-90 ${cx} ${cy})` });
}
function chainH(g, xs, y) {
  el("line", { x1: xs[0], y1: y, x2: xs[xs.length - 1], y2: y }, g);
  xs.forEach((x) => { el("line", { x1: x - 3.5, y1: y + 3.5, x2: x + 3.5, y2: y - 3.5, class: "tick" }, g); el("line", { x1: x, y1: y - 5, x2: x, y2: y + 5 }, g); });
  for (let i = 0; i < xs.length - 1; i++) { const w = xs[i + 1] - xs[i]; if (w >= 14) txt(g, (xs[i] + xs[i + 1]) / 2, y - 5, String(w), "", { "text-anchor": "middle", style: w < 30 ? "font-size:9px" : null }); }
}
function chainV(g, ys, x) {
  el("line", { x1: x, y1: ys[0], x2: x, y2: ys[ys.length - 1] }, g);
  ys.forEach((y) => { el("line", { x1: x - 3.5, y1: y + 3.5, x2: x + 3.5, y2: y - 3.5, class: "tick" }, g); el("line", { x1: x - 5, y1: y, x2: x + 5, y2: y }, g); });
  for (let i = 0; i < ys.length - 1; i++) { const h = ys[i + 1] - ys[i]; const cy = (ys[i] + ys[i + 1]) / 2; if (h >= 14) txt(g, x - 6, cy, String(h), "", { "text-anchor": "middle", transform: `rotate(-90 ${x - 6} ${cy})`, style: h < 30 ? "font-size:9px" : null }); }
}
const LAYERS = { grid: "l-grid", dims: "l-dims", chk: "l-chk", zones: "l-zones", inst: "l-inst", num: "l-num", furn: "l-furn" };
const LSTATE = {};
function applyLayers() {
  for (const [name, id] of Object.entries(LAYERS)) {
    const on = document.getElementById(id).checked;
    LSTATE[name] = on;
  }
  plan.querySelectorAll('[class*="layer-"]').forEach((n) => { const off = [...n.classList].some((c) => c.startsWith("layer-") && LSTATE[c.slice(6)] === false); n.style.display = off ? "none" : ""; });
}
Object.values(LAYERS).forEach((id) => document.getElementById(id).addEventListener("change", applyLayers));

let selected = null;
function highlight(k) {
  selected = selected === k ? null : k;
  plan.querySelectorAll("g.item").forEach((n) => {
    n.classList.toggle("hl", selected && n.dataset.c === selected);
    n.classList.toggle("dim", !!selected && n.dataset.c !== selected);
  });
  document.querySelectorAll("#legend button").forEach((b) => b.classList.toggle("on", b.dataset.c === selected));
}
function bindPlanItems() {
  plan.querySelectorAll("g.item").forEach((n) => n.addEventListener("click", () => highlight(n.dataset.c)));
}
document.getElementById("legend").innerHTML = C.filter((c) => !c.noDraw && I.some((i) => i.k === c.k && !i.hidePlan)).map((c) => {
  const n = CAT[c.k].n; const placed = I.some((i) => i.k === c.k && i.kind === "stack") ? c.qty : I.filter((i) => i.k === c.k).length;
  return `<button type="button" data-c="${c.k}"><span class="n">${n}</span><span class="sw" style="background: ${PAL[c.k] ? (PAL[c.k].front || PAL[c.k].col) : `var(--z-${c.sw || c.z})`}"></span><span class="t">${esc(c.name)} <small>· ${placed} szt. · ${esc(c.dims)}</small></span></button>`;
}).join("");
document.querySelectorAll("#legend button").forEach((b) => b.addEventListener("click", () => highlight(b.dataset.c)));
drawPlan();

/* ---------- ELEWACJE ---------- */
const WALLS = {
  N: { len: 900, title: "Ściana z wejściem i strefą druku, 900 cm", left: "← ściana z szafami", right: "ściana przy jadalni →",
       near: (it) => it.y <= 15, u: (it) => [it.x, it.x + it.w], dist: (it) => it.y },
  S: { len: 900, title: "Ściana z oknami, 900 cm", left: "← ściana przy jadalni", right: "ściana z szafami →",
       near: (it) => it.y + it.d >= 580, u: (it) => [900 - it.x - it.w, 900 - it.x], dist: (it) => 600 - it.y - it.d },
  W: { len: 600, title: "Ściana z szafami skrytkowymi i biurkami, 600 cm", left: "← ściana z oknami", right: "ściana z wejściem →",
       near: (it) => it.x <= 15, u: (it) => [600 - it.y - it.d, 600 - it.y], dist: (it) => it.x },
  E: { len: 600, title: "Ściana przy jadalni, 600 cm", left: "← ściana z wejściem", right: "ściana z oknami →",
       near: (it) => it.x + it.w >= 885, u: (it) => [it.y, it.y + it.d], dist: (it) => 900 - it.x - it.w },
};
const elev = document.getElementById("elev");
function drawElev(key) {
  const W = WALLS[key];
  elev.innerHTML = "";
  const pad = 70, H = ROOM.h;
  elev.setAttribute("viewBox", `${-pad} ${-50} ${W.len + pad * 2} ${H + 130}`);
  const Y = (z) => H - z; // z od podłogi
  el("rect", { x: 0, y: 0, width: W.len, height: H, class: "s-floor" }, elev);
  const grid = el("g", {}, elev);
  for (let u = 50; u < W.len; u += 50) el("line", { x1: u, y1: 0, x2: u, y2: H, class: "s-grid" }, grid);
  for (let z = 50; z < H; z += 50) el("line", { x1: 0, y1: Y(z), x2: W.len, y2: Y(z), class: "s-grid" }, grid);
  // otwory
  if (key === "N") {
    el("rect", { x: DOOR.x0, y: Y(DOOR.h), width: DOOR.x1 - DOOR.x0, height: DOOR.h, fill: "var(--sheet)", stroke: "var(--wall)", "stroke-width": 1.5 }, elev);
    el("line", { x1: DOOR.x0 + 6, y1: Y(DOOR.h) + 6, x2: DOOR.x0 + 6, y2: H, class: "door" }, elev);
    txt(elev, (DOOR.x0 + DOOR.x1) / 2, Y(DOOR.h / 2), "drzwi", "lbl sm", { "text-anchor": "middle" });
  }
  if (key === "S") {
    WINDOWS.forEach(([a, b]) => {
      const u0 = 900 - b, u1 = 900 - a;
      el("rect", { x: u0, y: Y(HEAD), width: u1 - u0, height: HEAD - SILL, fill: "var(--sheet)", stroke: "var(--glass)", "stroke-width": 2 }, elev);
      el("line", { x1: (u0 + u1) / 2, y1: Y(HEAD), x2: (u0 + u1) / 2, y2: Y(SILL), stroke: "var(--glass)", "stroke-width": 1.5 }, elev);
    });
    RADIATORS.forEach((r) => { const u0 = 900 - r.x - r.w; el("rect", { x: u0, y: Y(r.z + r.h), width: r.w, height: r.h, class: "it rad" }, elev); for (let i = 10; i < r.w; i += 10) el("line", { x1: u0 + i, y1: Y(r.z + r.h) + 4, x2: u0 + i, y2: Y(r.z) - 4, stroke: "var(--muted)", "stroke-width": 0.8 }, elev); });
  }
  // meble przy ścianie – od najdalszego od ściany do najbliższego... rysujemy najpierw te przy ścianie
  const list = I.filter((it) => W.near(it) && it.kind !== "chair").sort((a, b) => W.dist(a) - W.dist(b));
  const facing = { N: "S", S: "N", W: "E", E: "W" }[key]; // ściana widziana od przodu mebla
  list.forEach((it) => {
    const c = CAT[it.k];
    const [u0, u1] = W.u(it);
    const w = u1 - u0;
    const gi = el("g", { class: "item elayer-furn" }, elev);
    const cls = `it ${c.sw || c.z}`;
    if (it.kind === "table") {
      el("rect", { x: u0, y: Y(it.z + it.h), width: w, height: 4, class: cls }, gi);
      el("rect", { x: u0 + 3, y: Y(it.z + it.h - 4), width: 5, height: it.h - 4, class: "it tech" }, gi);
      el("rect", { x: u1 - 8, y: Y(it.z + it.h - 4), width: 5, height: it.h - 4, class: "it tech" }, gi);
    } else if (it.kind === "sofa") {
      el("rect", { x: u0, y: Y(it.h), width: w, height: it.h - 8, rx: 6, class: cls }, gi);
      el("rect", { x: u0 + 15, y: Y(45), width: w - 30, height: 20, rx: 4, class: cls, "fill-opacity": 0.6 }, gi);
    } else if (it.kind === "round") {
      el("rect", { x: u0, y: Y(it.h), width: w, height: 4, class: cls }, gi);
      el("rect", { x: u0 + w / 2 - 3, y: Y(it.h - 4), width: 6, height: it.h - 4, class: "it tech" }, gi);
    } else {
      el("rect", { x: u0, y: Y(it.z + it.h), width: w, height: it.h, class: cls }, gi);
      if (it.kind === "lockers" && key === "W") {
        for (let i = 1; i < 3; i++) el("line", { x1: u0 + (w * i) / 3, y1: Y(it.h), x2: u0 + (w * i) / 3, y2: H, stroke: "var(--wall)", "stroke-width": 1 }, gi);
        for (let r = 1; r < (it.rows || 11); r++) el("line", { x1: u0, y1: Y((it.h * r) / (it.rows || 11)), x2: u1, y2: Y((it.h * r) / (it.rows || 11)), stroke: "var(--wall)", "stroke-width": 0.8 }, gi);
      }
      if (it.k === "an_wiszaca" && key === "N") el("line", { x1: u0 + w / 2, y1: Y(it.z + it.h), x2: u0 + w / 2, y2: Y(it.z), stroke: "var(--wall)", "stroke-width": 1 }, gi);
      if (it.k === "an_szuflady" && key === "N") [30, 58].forEach((z) => el("line", { x1: u0, y1: Y(z), x2: u1, y2: Y(z), stroke: "var(--wall)", "stroke-width": 1 }, gi));
      if (it.k === "an_zlew" && key === "N") { el("path", { d: `M ${u0 + 30} ${Y(90)} v -24 h 12`, stroke: "var(--z-tech)", "stroke-width": 3, fill: "none" }, gi); }
      if (it.kind === "shelf") for (let z = 38; z < it.h; z += 38) el("line", { x1: u0, y1: Y(z), x2: u1, y2: Y(z), stroke: "var(--wall)", "stroke-width": 1 }, gi);
    }
    const pal = PAL[it.k];
    if (pal) gi.querySelectorAll("rect.it").forEach((n, i) => {
      if ((it.kind === "table" || it.kind === "round") && i > 0) { n.style.fill = pal.frame || "#e9e8e3"; return; }
      n.style.fill = it.kind === "lockers" && key === "W" ? pal.front : pal.col;
    });
    if (it.kind === "board" && it.k !== "rzutnik") gi.querySelectorAll("rect.it").forEach((n) => { n.style.stroke = it.k === "klucze" ? "#9aa0a2" : "#b08a5c"; n.style.strokeWidth = 2; });
    if (it.kind === "board" && it.k !== "rzutnik" && it.k !== "klucze" && !/^ogl/.test(it.k)) {
      const cols = Math.max(2, Math.floor((w - 10) / 32));
      for (let i = 0; i < cols; i++) for (let r = 0; r < 2; r++) if ((i + r) % 3 !== 2) el("rect", { x: u0 + 8 + i * 32, y: Y(it.z + it.h - 10 - r * 45), width: 21, height: 30, fill: ["#fff6c8", "#e8f1fb", "#ffffff", "#fde3e0"][(i + r) % 4], stroke: "#b9b2a3", "stroke-width": 0.6 }, gi);
    }
    if (/^ogl/.test(it.k)) for (let i = 0; i < Math.floor((w - 8) / 16); i++) el("rect", { x: u0 + 5 + i * 16, y: Y(it.z + it.h - 6 - (i % 2) * 8), width: 12, height: 16 + (i % 3) * 3, fill: ["#ffffff", "#fff3b5", "#e2edfb", "#fde0db"][i % 4], stroke: "#a58660", "stroke-width": 0.5 }, gi);
    if (it.k === "klucze") for (let i = 0; i < 6; i++) for (let r = 0; r < 3; r++) el("circle", { cx: u0 + 8 + i * 11, cy: Y(it.z + it.h - 10 - r * 14), r: 1.6, fill: "#6b5a3f" }, gi);
    if (it.k === "rzutnik") { const n = gi.querySelector("rect.it"); if (n) { n.style.strokeDasharray = "6 4"; } txt(gi, u0 + w / 2, Y(it.z + it.h / 2) + 4, "biała ściana pod obraz z rzutnika", "lbl sm", { "text-anchor": "middle" }); }
    if (it.kind === "plants") {
      const n = gi.querySelector("rect.it"); if (n) { n.style.fill = "#c79e6c"; n.style.fillOpacity = 0.25; }
      [it.z + it.h - 14, it.z + it.h - 72].forEach((pz, lvl) => {
        el("rect", { x: u0 + w / 2 - 9, y: Y(pz + 13), width: 18, height: 13, fill: "#b9775a" }, gi);
        [-12, -5, 3, 11].forEach((dx, k) => { const len = (lvl ? 55 : 85) - k * 9 + (k % 2) * 18; for (let t = 0; t < len; t += 7) el("circle", { cx: u0 + w / 2 + dx + Math.sin(t / 14 + k) * 3, cy: Y(pz + 4 - t), r: 3.2, fill: k % 2 ? "#6f9a5b" : "#4f8442" }, gi); });
      });
    }
    if (it.kind === "stack") for (let q = 1; q < it.n; q++) el("line", { x1: u0, y1: Y(46 + q * 9), x2: u1, y2: Y(46 + q * 9), stroke: "var(--wall)", "stroke-width": 1 }, gi);
    if (it.kind === "pot") { const n = gi.querySelector("rect.it"); if (n) { n.style.fill = "#b9775a"; n.setAttribute("height", it.h * 0.45); n.setAttribute("y", Y(it.z + it.h * 0.45)); } el("circle", { cx: u0 + w / 2, cy: Y(it.z + it.h * 0.7), r: Math.min(w, 26) * 0.6, fill: "#6f9a5b" }, gi); }
    const lab = it.label && w > 34 && it.h > 30 ? it.label : null;
    if (lab && it.kind !== "table") txt(gi, u0 + w / 2, Y(it.z + it.h / 2) + 4, lab, "lbl sm", { "text-anchor": "middle" });
    if (it.kind === "table" && w > 60) txt(gi, u0 + w / 2, Y(it.z + it.h) - 6, it.label || c.name.replace("IKEA ", ""), "lbl sm", { "text-anchor": "middle" });
  });
  // instalacje na ścianie
  const instU = (p) => key === "N" ? p.x : key === "W" ? 600 - p.y : key === "S" ? 900 - p.x : p.y;
  const wallPts = INST.filter((p) => instWall(p) === key).sort((a, b) => instU(a) - instU(b));
  wallPts.forEach((p, idx) => {
    const u = instU(p);
    const gi = el("g", { class: "inst elayer-inst" }, elev);
    el("line", { x1: u, y1: Y(0), x2: u, y2: Y(p.z) + 6, stroke: "var(--line)", "stroke-dasharray": "3 3", class: "elayer-nofurn" }, gi);
    instSymbol(gi, p, u, Y(p.z), 5);
    txt(gi, u, Y(p.z) - 9 - (idx % 2) * 11, p.code, "code", { "text-anchor": "middle" });
    txt(gi, u + 7, Y(p.z) + 15, String(p.z), "tag elayer-nofurn", { "text-anchor": "middle", style: "font-size:9.5px;font-family:var(--font-mono)" });
  });
  // wymiary: długość, wysokości charakterystyczne
  const d = el("g", { class: "dim" }, elev);
  dimH(d, 0, W.len, H + 40, String(W.len));
  dimV(d, 0, H, -40, "450");
  const dF = el("g", { class: "elayer-furn" }, d), dI = el("g", { class: "elayer-nofurn elayer-inst" }, d);
  const ilevels = [...new Set(wallPts.map((p) => p.z))].sort((a, b) => a - b);
  { const zx = W.len + 22; el("line", { x1: zx, y1: Y(0), x2: zx, y2: Y(H) }, dI); ilevels.forEach((z) => { el("line", { x1: zx - 5, y1: Y(z), x2: zx + 5, y2: Y(z) }, dI); txt(dI, zx + 8, Y(z) + 4, String(z), "", { style: "font-size:10.5px" }); }); }
  if (wallPts.length) chainH(dI, [...new Set([0, W.len, ...wallPts.map((p) => Math.round(instU(p)))])].sort((a, b) => a - b), H + 18);
  const levels = new Set([H]);
  list.forEach((it) => { levels.add(Math.round(it.z + it.h)); if (it.z > 0) levels.add(Math.round(it.z)); });
  if (key === "S") { levels.add(SILL); levels.add(HEAD); }
  if (key === "N") levels.add(DOOR.h);
  const lv = [...levels].filter((z) => z > 0 && z < H).sort((a, b) => a - b).filter((z, i, a) => i === 0 || z - a[i - 1] >= 8);
  const zx = W.len + 22;
  el("line", { x1: zx, y1: Y(0), x2: zx, y2: Y(H) }, dF);
  lv.forEach((z) => { el("line", { x1: zx - 5, y1: Y(z), x2: zx + 5, y2: Y(z) }, dF); txt(dF, zx + 8, Y(z) + 4, String(z), "", { style: "font-size:10.5px" }); });
  // chain along floor of items
  const xs = new Set([0, W.len]);
  list.filter((it) => it.z === 0 && it.kind !== "round").forEach((it) => W.u(it).forEach((u) => xs.add(Math.round(u))));
  if (key === "N") { xs.add(DOOR.x0); xs.add(DOOR.x1); }
  if (key === "S") WINDOWS.forEach(([a, b]) => { xs.add(900 - a); xs.add(900 - b); });
  chainH(dF, [...xs].sort((a, b) => a - b), H + 18);
  // podłoga
  el("line", { x1: -20, y1: H, x2: W.len + 20, y2: H, stroke: "var(--wall)", "stroke-width": 3 }, elev);
  el("line", { x1: 0, y1: 0, x2: 0, y2: H, stroke: "var(--wall)", "stroke-width": 3 }, elev);
  el("line", { x1: W.len, y1: 0, x2: W.len, y2: H, stroke: "var(--wall)", "stroke-width": 3 }, elev);
  txt(elev, 0, -22, W.left, "wtxt");
  txt(elev, W.len, -22, W.right, "wtxt", { "text-anchor": "end" });
  txt(elev, W.len / 2, -22, W.title, "lbl", { "text-anchor": "middle" });
  const notes = {
    N: "Przy szafach skrytkowych tablica na klucze do sal (ok. 70 × 50 cm). Drzwi otwierają się na zewnątrz, w prawo. Nad bizhubem i stołem do kompletowania tablica magnetyczna ok. 200 × 100 cm (dół 165 cm). Tuż przy drzwiach ekran dotykowy 27″ zawieszony w pionie na stałym płaskim uchwycie 1,2 cm od ściany (dół 100 cm, góra 161 cm), stabilny przy dotyku, komputer Lenovo M70s stoi na regale EKET pod stołem do kompletowania, do ekranu biegną w listwie kabel DisplayPort i przedłużacz USB (po 5 m). Obok bizhub C450i z finiszerem FS-539SD; po prawej 34 cm zapasu na tacę boczną, w tym miejscu niszczarka Fellowes 99Ci (64 cm, poniżej tacy). Stół do kompletowania TROTTEN 120 × 70 z elektryczną regulacją (ok. 95 cm), pod nim regał EKET z 4 otwartymi przegrodami na nóżkach (80 cm) na papier, tonery i laptopy. Lodówka 60 cm oddziela strefę druku od aneksu 240 cm. Na blacie mikrofalówka; między blatem a szafkami wiszącymi panel LYSEKIL (matowy biały, 55 cm); szafki wiszące 4 × 60, dół 145 cm, góra 245 cm.",
    W: "Nad biurkami tablica magnetyczna ok. 200 × 100 cm z kartkami (dół 110 cm). Dwa biurka BOLLPOJKE 90 × 55 cm (sosna, biała rama), na każdym lampa TERTIAL i podstawka STENERIK pod laptop; przy każdym biurku podwójne gniazdo 230 V na ścianie (95 cm). Ekrany akustyczne MITTZON 70 × 72 cm na zaciskach: jeden między szafami skrytkowymi a biurkiem 1, drugi między biurkami. Od biurka 2 do Xeroxa 52 cm odstępu. Ścianka MITTZON na kółkach (dół ekran akustyczny, góra tablica) jest wsunięta między stół do kompletowania a lodówkę i oddziela strefę druku od aneksu. Obok biurek Xerox B7130 (77 cm, bez podstawy KSW: na podłodze albo na własnej podstawie szkoły, do ustalenia). Trzy szafy skrytkowe KAROL 90 × 40 × 185 cm, po 18 skrytek (3 × 6), razem 54.",
    S: "Okna we wnękach: parapet na 90 cm, głębokość wnęki ok. 40 cm, na parapetach doniczki; na filarach między oknami małe tablice ogłoszeń (dół 145 cm), a nad nimi wysoko wiszące doniczki; w narożniku przy krzesłach tablica 80 × 60 cm. Sofy EKTORP (88 cm) poniżej parapetu, przed grzejnikami min. 15 cm odstępu.",
    E: "Ściana za jadalnią: białe pole pod obraz z rzutnika (ok. 260 × 146 cm, od 190 do 336 cm) na osi stołu, po obu bokach wąskie pasy roślin z długimi zwisającymi pędami. W narożniku przy oknie 4 dodatkowe krzesła LÄKTARE (2 stosy po 2), nad nimi na filarze tablica ogłoszeń. Ściany w ciepłym beżu, sala ok. 450 cm wysokości.",
  };
  document.getElementById("elev-note").innerHTML = `<span>${esc(notes[key])}</span>`;
  applyElevLayers();
}
function applyElevLayers() {
  const f = document.getElementById("e-furn").checked, ins = document.getElementById("e-inst").checked;
  elev.querySelectorAll('[class*="elayer-"]').forEach((n) => {
    const c = n.classList, hide = (c.contains("elayer-furn") && !f) || (c.contains("elayer-nofurn") && f) || (c.contains("elayer-inst") && !ins);
    n.style.display = hide ? "none" : "";
  });
}
["e-furn", "e-inst"].forEach((id) => document.getElementById(id).addEventListener("change", applyElevLayers));
ROOT.querySelectorAll("[data-wall]").forEach((b) => b.addEventListener("click", () => {
  ROOT.querySelectorAll("[data-wall]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  drawElev(b.dataset.wall);
}));
drawElev("N");

/* ---------- TABELE ---------- */
document.getElementById("chk-table").innerHTML =
  `<thead><tr><th>Miejsce</th><th>Po co</th><th class="num">Jest</th><th class="num">Wymagane</th><th>Ocena</th></tr></thead><tbody>` +
  VISIBLE_CHECKS.map((c) => `<tr><td>${esc(c.name)}</td><td>${esc(c.why)}</td><td class="num">${c.val} cm</td><td class="num">${c.need} cm</td><td><span class="pill ${c.st}">${c.st === "ok" ? "Wystarcza" : c.st === "warn" ? "Ciasno" : "Za mało"}</span></td></tr>`).join("") +
  `<tr><td>Szerokość drzwi w świetle</td><td>Droga ewakuacyjna</td><td class="num">?</td><td class="num">90 cm</td><td><span class="pill mute">Do pomiaru</span></td></tr></tbody>`;

// Zdjęcia poglądowe produktów (id pozycji → plik), przekazane z pokoj16-data.js przez app.js; ten sam produkt = to samo zdjęcie.
const PHOTO = window.pokoj16Photos || {};
const photoCell = (c) => `<td class="photo-cell">${PHOTO[c.k] ? `<a class="photo" href="${esc(c.url || PHOTO[c.k])}" target="_blank" rel="noopener"><img src="${PHOTO[c.k]}" alt="${esc(c.name)}: zdjęcie poglądowe" decoding="async" /></a>` : ""}</td>`;

function costTable() {
  let rows = "", sum = 0, sumIkea = 0;
  const IKEA_ROWS = [];
  for (const [z, zname] of Object.entries(ZONES)) {
    const items = C.filter((c) => c.z === z);
    if (!items.length) continue;
    rows += `<tr class="zone-row"><td colspan="8">${esc(zname)}</td></tr>`;
    items.forEach((c) => {
      const val = c.price && !c.outside ? c.price * c.qty : null;
      if (val != null) { sum += val; if (c.shop === IKEA) sumIkea += val; }
      const link = c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.name)}</a>` : esc(c.name);
      const alt = (c.alt || []).map((a) => `<div class="alt">Zamiennik: <a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.name)}</a> · ${a.price ? fmt(a.price) : "cena na zapytanie"}</div>`).join("");
      const av = c.shop === IKEA && !c.outside ? "stan 24.11: w sprzedaży, nie wycofany, wysoki stan magazynowy" : c.avail ? "stan 24.11: " + c.avail : "";
      const meta = [c.sku && `nr ${esc(c.sku)}`, c.shop && esc(c.shop), av && `<span class="av">${esc(av)}</span>`, c.src && esc(c.src)].filter(Boolean).join(" · ");
      rows += `<tr${c.outside ? ' class="out"' : ""}><td class="mono">${CAT[c.k].n}</td>${photoCell(c)}<td class="item-cell">${link}<div class="meta">${meta}</div>${alt}</td><td>${esc(c.dims)}</td><td class="num">${c.qty}</td><td class="num">${c.price && !c.outside ? fmt(c.price) : "–"}</td><td class="num">${val != null ? fmt(val) : "–"}</td><td><span class="pill ${c.status[0]}">${esc(c.status[1])}</span></td></tr>`;
    });
  }
  rows += `<tr class="zone-row"><td colspan="8">Usługi (do oferty)</td></tr>
    <tr><td class="mono">–</td><td></td><td class="item-cell">Dostawa i montaż mebli IKEA (IKEA dla Firm), montaż aneksu z podłączeniem wody<div class="meta">wycena przez IKEA dla Firm lub lokalnego montażystę</div></td><td>–</td><td class="num">1</td><td class="num">–</td><td class="num">–</td><td><span class="pill warn">Poprosić o ofertę</span></td></tr>
    <tr><td class="mono">–</td><td></td><td class="item-cell">Dostawa szaf skrytkowych i niszczarki<div class="meta">Kupmeble i Morele: koszt wg koszyka</div></td><td>–</td><td class="num">–</td><td class="num">–</td><td class="num">–</td><td><span class="pill mute">Sprawdzić w koszyku</span></td></tr>`;
  document.getElementById("list-table").innerHTML = `<thead><tr><th>Nr</th><th>Zdjęcie</th><th>Produkt i sklep</th><th>Wymiary / wariant</th><th class="num">Ilość</th><th class="num">Cena brutto</th><th class="num">Wartość</th><th>Status</th></tr></thead><tbody>${rows}
    <tr class="total"><td></td><td></td><td colspan="4">Razem do zapłaty (brutto, bez dostawy i montażu)</td><td class="num">${fmt(sum)}</td><td></td></tr></tbody>`;
  const kitchen = C.filter((c) => c.z === "kitchen" && c.price && !c.outside).reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById("cost-sum").innerHTML = `
    <div><dt>Razem do zapłaty</dt><dd>${fmt(sum)}<small>meble, aneks, tablice i centrum dowodzenia, brutto, bez dostawy i montażu</small></dd></div>
    <div><dt>W tym IKEA</dt><dd>${fmt(sumIkea)}<small>jedno zamówienie, można poprosić IKEA dla Firm o fakturę i montaż</small></dd></div>
    <div><dt>W tym inne sklepy</dt><dd>${fmt(sum - sumIkea)}<small>szafy skrytkowe (Kupmeble), komputer (AMSO Wrocław), ekran, uchwyt, kable i niszczarka (Morele), tablice magnetyczne i korkowe (Castorama)</small></dd></div>
    <div><dt>W tym centrum dowodzenia</dt><dd>${fmt(C.filter((c) => c.z === "cmd").reduce((s, c) => s + c.price * c.qty, 0))}<small>ekran dotykowy 27″ Full HD na stałym uchwycie, komputer poleasingowy Lenovo M70s, kable DisplayPort, USB i HDMI</small></dd></div>
    <div><dt>W tym aneks kuchenny</dt><dd>${fmt(kitchen)}<small>4 szafki dolne i 4 wiszące, blat 240, zlew, bateria, LED, mikrofalówka</small></dd></div>`;
}
costTable();

const INST_LABEL = { p230: "2 × 230 V", rj: "RJ45 kat. 6", tel: "Telefon", hdmi: "HDMI", ap: "Access point (PoE)", box: "Puszka podłogowa", h2o: "Woda / odpływ" };
const WALL_NAME = { N: "ściana z wejściem", W: "ściana z szafami", S: "ściana z oknami", E: "ściana przy jadalni", sufit: "sufit", posadzka: "posadzka" };
const INST_PILL = { p230: "warn", rj: "ok", tel: "ok", hdmi: "mute", ap: "ok", box: "mute", h2o: "mute" };
document.getElementById("inst-table").innerHTML = `<thead><tr><th>Kod</th><th>Rodzaj</th><th>Miejsce</th><th>Montaż</th><th class="num">Wysokość osi</th><th>Co ma być w punkcie</th></tr></thead><tbody>` +
  INST.map((p) => `<tr><td class="mono"><b>${p.code}</b></td><td><span class="pill ${INST_PILL[p.t]}">${INST_LABEL[p.t]}</span></td><td>${esc(p.txt)}</td><td>${WALL_NAME[instWall(p)]}</td><td class="num">${p.ceil ? "sufit" : p.floor ? "posadzka" : p.z + " cm"}</td><td>${esc(p.spec)}</td></tr>`).join("") + "</tbody>";
{
  const n = (t) => INST.filter((q) => q.t === t).length;
  document.getElementById("inst-sum").innerHTML = [
    ["Gniazda 230 V", n("p230"), "wszystkie podwójne (E14 potrójne z USB), mogą być natynkowe; 1 w suficie przy rzutniku"],
    ["Gniazda RJ45 kat. 6", n("rj"), "obie drukarki, centrum dowodzenia, stół do kompletowania"],
    ["Access point Wi-Fi", n("ap"), "nad tablicą w narożniku, zasilanie PoE"],
    ["Telefon stacjonarny", n("tel"), "gniazdo przy stole obok bizhuba"],
    ["HDMI stół do druku → rzutnik", 1, "gniazdo H1 nad blatem, wyjście H2 w suficie"],
  ].map(([a, b, c]) => `<div><dt>${a}</dt><dd>${b}<small>${c}</small></dd></div>`).join("");
}
const iplan = document.getElementById("iplan");
function drawInstPlan() {
  iplan.innerHTML = "";
  iplan.setAttribute("viewBox", "-90 -118 1080 828");
  const G = (cls) => el("g", { class: cls }, iplan);
  const grid = G("grid");
  for (let x = 50; x < 900; x += 50) el("line", { x1: x, y1: 0, x2: x, y2: 600 }, grid);
  for (let y = 50; y < 600; y += 50) el("line", { x1: 0, y1: y, x2: 900, y2: y }, grid);
  el("rect", { x: 0, y: 0, width: 900, height: 600, class: "room", fill: "none" }, iplan).style.fillOpacity = 0.35;
  // drzwi i okna
  el("line", { x1: DOOR.x0, y1: 0, x2: DOOR.x1, y2: 0, stroke: "var(--floor)", "stroke-width": 8 }, iplan);
  WINDOWS.forEach(([a, b]) => el("line", { x1: a, y1: 600, x2: b, y2: 600, class: "glass" }, iplan));
  txt(iplan, (DOOR.x0 + DOOR.x1) / 2, -14, "wejście", "wl", { "text-anchor": "middle" });
  txt(iplan, 20, -106, "ściana z wejściem (punkty opisane nad ścianą)", "wl", { "text-anchor": "start" });
  txt(iplan, 450, 650, "ściana z oknami", "wl", { "text-anchor": "middle" });
  txt(iplan, -54, 300, "ściana z szafami", "wl", { "text-anchor": "middle", transform: "rotate(-90 -54 300)" });
  txt(iplan, 954, 300, "ściana przy jadalni", "wl", { "text-anchor": "middle", transform: "rotate(90 954 300)" });
  // meble jako podkład
  const furn = G("furn ilayer-furn");
  I.filter((it) => !it.hidePlan && !it.ontop).forEach((it) => {
    const r = el("rect", { x: it.x, y: it.y, width: it.w, height: it.d, rx: it.kind === "chair" || it.kind === "stack" ? 5 : 1 }, furn);
    if (it.above) r.setAttribute("stroke-dasharray", "4 3");
  });
  [["Stół roboczy", 300, 290], ["Jadalnia", 756, 320], ["Sofy", 400, 545], ["Aneks", 780, 36], ["bizhub", 400, 40], ["Xerox", 33, 560]].forEach(([s2, x, y]) => txt(furn, x, y, s2, "", { "text-anchor": "middle" }));
  // trasy
  const rts = G("ilayer-routes");
  ROUTES.forEach((r) => el("polyline", { points: r.pts.map((q) => q.join(",")).join(" "), class: `rt ${r.t} lv-${r.lv}` }, rts));
  el("rect", { x: 128, y: 26, width: 104, height: 30, rx: 3, fill: "var(--sheet)", stroke: "var(--line)" }, rts);
  txt(rts, 180, 38, "wejście przewodów", "tag", { "text-anchor": "middle" });
  txt(rts, 180, 50, "z korytarza", "tag", { "text-anchor": "middle" });
  // punkty
  const ins = G("inst");
  const nOrder = INST.filter((q) => instWall(q) === "N").sort((a, b) => a.x - b.x);
  INST.forEach((p) => {
    const w = instWall(p);
    const px = p.x === 0 ? 0 : p.x >= 900 ? 900 : p.x, py = p.y === 0 ? 0 : p.y >= 600 ? 600 : p.y;
    instSymbol(ins, p, px, py, 7);
    let lx = px, ly = py - 12, anchor = "middle", tx = px, ty = py + 20;
    if (w === "N") { const k = nOrder.indexOf(p) % 4; ly = -16 - k * 21; ty = ly + 10; el("line", { x1: px, y1: -7, x2: px, y2: ly + 3, stroke: "var(--line)" }, ins); }
    if (w === "W") { lx = -12; ly = py + 4; anchor = "end"; tx = -12; ty = py + 15; }
    if (w === "S") { ly = 624; ty = 636; }
    if (w === "sufit" || w === "posadzka") { const left = p.t === "p230"; lx = left ? px - 11 : px + 11; ly = py - 4; anchor = left ? "end" : "start"; tx = lx; ty = py + 8; }
    txt(ins, lx, ly, p.code, "code", { "text-anchor": anchor });
    txt(ins, tx, ty, p.ceil ? "sufit" : p.floor ? "posadzka" : `h ${p.z}`, "tag ilayer-tags", { "text-anchor": anchor });
  });
  applyInstLayers();
}
const ILAYERS = { furn: "i-furn", routes: "i-routes", tags: "i-tags" };
function applyInstLayers() { for (const [k, id] of Object.entries(ILAYERS)) { const on = document.getElementById(id).checked; iplan.querySelectorAll(".ilayer-" + k).forEach((n) => (n.style.display = on ? "" : "none")); } }
Object.values(ILAYERS).forEach((id) => document.getElementById(id).addEventListener("change", applyInstLayers));
drawInstPlan();
{
  const sw = (fn) => { const sv = el("svg", { width: 22, height: 16, viewBox: "-11 -8 22 16" }); fn(sv); return sv.outerHTML; };
  const pts = [["p230", "E: gniazdo podwójne 230 V (może być natynkowe)"], ["rj", "D: gniazdo RJ45 kat. 6"], ["tel", "T: gniazdo telefoniczne"], ["hdmi", "H: HDMI"], ["ap", "A: access point (PoE)"], ["h2o", "W: woda"]];
  const lines = [["e", "s", "trasa 230 V w ścianie"], ["d", "s", "trasa sieci w ścianie"], ["t", "s", "trasa telefonu"], ["h", "c", "HDMI pod sufitem"], ["d", "c", "trasa pod sufitem"]];
  document.getElementById("ilegend").innerHTML =
    pts.map(([t, s2]) => `<span>${sw((sv) => { const g2 = el("g", { class: "inst" }, sv); instSymbol(g2, { t }, 0, 0, 5); })}${s2}</span>`).join("") +
    lines.map(([t, lv, s2]) => `<span><svg width="30" height="10" viewBox="0 0 30 10"><line x1="1" y1="5" x2="29" y2="5" class="rt ${t} lv-${lv}" style="fill:none;stroke-width:2.2;stroke:${{ e: "#e0a43a", d: "#4f7fbf", t: "#3f9a5b", h: "#8a4fc4" }[t]};${lv === "c" ? "stroke-dasharray:2 5" : lv === "f" ? "stroke-dasharray:12 6" : ""}"/></svg>${s2}</span>`).join("");
}

/* ---------- MODEL 3D ---------- */
const host = document.getElementById("viewer");
const msg = document.getElementById("v-msg");
if (!window.THREE) { msg.textContent = "Nie udało się wczytać biblioteki 3D. Rzut i elewacje powyżej działają bez niej."; return; }
let renderer;
try { renderer = new THREE.WebGLRenderer({ antialias: true }); }
catch (e) { msg.textContent = "Ta przeglądarka nie obsługuje WebGL, więc model 3D się nie wyświetli."; return; }
msg.remove();
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
host.prepend(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 100);
const S = 0.01;
const P = (x, y, z) => new THREE.Vector3(x * S - 4.5, z * S, y * S - 3);
const lin = (h) => new THREE.Color(h).convertSRGBToLinear();

{
  // otoczenie do odbić: beżowe ściany, drewniana podłoga, jasne okna od południa
  const pm = new THREE.PMREMGenerator(renderer), env = new THREE.Scene();
  const bm = (c, k = 1) => new THREE.MeshBasicMaterial({ color: new THREE.Color(c).convertSRGBToLinear().multiplyScalar(k), side: THREE.BackSide });
  env.add(new THREE.Mesh(new THREE.BoxGeometry(18, 9, 12), bm(0xd6c8ae, 0.5)));
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(18, 12), bm(0x9c7b55, 0.45)); fl.rotation.x = -Math.PI / 2; fl.position.y = -4.4; fl.material.side = THREE.DoubleSide; env.add(fl);
  const ce = new THREE.Mesh(new THREE.PlaneGeometry(18, 12), bm(0xffffff, 0.8)); ce.rotation.x = Math.PI / 2; ce.position.y = 4.4; ce.material.side = THREE.DoubleSide; env.add(ce);
  [-5, 0, 5].forEach((x) => { const w = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3), bm(0xfff6e8, 2.6)); w.position.set(x, 0.6, 5.9); w.rotation.y = Math.PI; w.material.side = THREE.DoubleSide; env.add(w); });
  scene.environment = pm.fromScene(env, 0.035).texture; pm.dispose();
}
scene.add(new THREE.HemisphereLight(0xfff4e2, 0xb8a27f, 0.32));
const sun = new THREE.DirectionalLight(0xfff0d6, 1.15);
sun.position.set(2.2, 6.5, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 30 });
sun.shadow.bias = -0.0004;
scene.add(sun);

const COL = { storage: 0x9aa7ae, work: 0xa9c4b4, print: 0xb2c4da, kitchen: 0xdcd3c4, dining: 0xd8b98a, lounge: 0x7f9f8c, tech: 0x5f6d73, chair: 0xe9e4da, leg: 0x2a2a2a, wood: 0xcfb48a, white: 0xf4f2ee };
const matCache = {};
const mat = (h, opts = {}) => {
  const key = h + "|" + Object.keys(opts).map((k) => k + ":" + (opts[k] && opts[k].uuid ? opts[k].uuid : opts[k])).join(",");
  if (matCache[key]) return matCache[key];
  const o = { ...opts }; if (typeof o.emissive === "number") o.emissive = lin(o.emissive);
  return (matCache[key] = new THREE.MeshStandardMaterial({ color: lin(h), roughness: 0.75, metalness: 0.02, ...o }));
};
/* tekstury proceduralne (bez plików zewnętrznych) */
let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
function canvasTex(w, h, draw, rep) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (rep) t.repeat.set(rep[0], rep[1]); t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); return t;
}
const woodTex = (base) => canvasTex(512, 256, (g, w, h) => {
  g.fillStyle = base; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 90; i++) {
    const y0 = rnd() * h, a = 0.035 + rnd() * 0.08, f = 30 + rnd() * 60, amp = 1 + rnd() * 4;
    g.strokeStyle = rnd() > 0.45 ? `rgba(95,62,30,${a})` : `rgba(255,238,210,${a})`; g.lineWidth = 0.5 + rnd() * 2.4;
    g.beginPath(); for (let x = 0; x <= w; x += 8) g.lineTo(x, y0 + Math.sin(x / f + i) * amp); g.stroke();
  }
  for (let k = 0; k < 3; k++) { const cx = rnd() * w, cy = rnd() * h; g.strokeStyle = "rgba(95,62,30,0.12)"; for (let r = 2; r < 14; r += 3) { g.beginPath(); g.ellipse(cx, cy, r * 2.2, r * 0.7, 0, 0, 7); g.stroke(); } }
});
const noiseTex = (base, amt, size) => canvasTex(size, size, (g, w, h) => {
  g.fillStyle = base; g.fillRect(0, 0, w, h);
  for (let i = 0; i < w * h * 0.3; i++) { const v = rnd() > 0.5 ? 255 : 0; g.fillStyle = `rgba(${v},${v},${v},${amt * rnd()})`; g.fillRect(rnd() * w, rnd() * h, 1.4, 1.4); }
});
const floorTex = canvasTex(1024, 1024, (g, w, h) => {
  const rows = 14, rh = h / rows;
  for (let r = 0; r < rows; r++) {
    let x = -rnd() * 300;
    while (x < w) {
      const len = 300 + rnd() * 380, t = 198 + rnd() * 16;
      g.fillStyle = `rgb(${t + 14},${t - 14},${t - 58})`; g.fillRect(x, r * rh, len, rh);
      for (let i = 0; i < 10; i++) { g.strokeStyle = `rgba(110,72,38,${0.05 + rnd() * 0.08})`; g.lineWidth = 0.8 + rnd() * 1.6; const yy = r * rh + rnd() * rh; g.beginPath(); g.moveTo(x, yy); g.bezierCurveTo(x + len / 3, yy + (rnd() - 0.5) * 6, x + 2 * len / 3, yy + (rnd() - 0.5) * 6, x + len, yy); g.stroke(); }
      g.fillStyle = "rgba(70,48,26,0.45)"; g.fillRect(x, r * rh, 2, rh); x += len;
    }
    g.fillStyle = "rgba(70,48,26,0.45)"; g.fillRect(0, r * rh, w, 2);
  }
}, [4.5, 3]);
const TEX = { oak: woodTex("#c9a273"), ash: woodTex("#dcc7a2"), pine: woodTex("#dcbf8e"), worktop: woodTex("#d2b285"), sonoma: woodTex("#c79e6c"), slat: woodTex("#b98d5c"), fabric: noiseTex("#ffffff", 0.05, 128), plaster: noiseTex("#ffffff", 0.03, 256), cork: noiseTex("#b88a55", 0.3, 128) };
const rotCache = {};
const woodMat = (name, along, opts = {}) => {
  let t = TEX[name];
  if (along) { t = rotCache[name] || (rotCache[name] = (() => { const c = t.clone(); c.center.set(0.5, 0.5); c.rotation = Math.PI / 2; c.needsUpdate = true; return c; })()); }
  return mat(0xffffff, { map: t, roughness: 0.5, ...opts });
};
const fabricMat = (h) => mat(h, { map: TEX.fabric, roughness: 0.97 });
const steel = mat(0xb8bec1, { metalness: 0.75, roughness: 0.3 });
const blackMetal = mat(0x222222, { metalness: 0.5, roughness: 0.45 });
const edgeMat = new THREE.LineBasicMaterial({ color: 0x2f3b3a, transparent: true, opacity: 0.08 });
const pickables = [];

function box(x, y, z, w, d, h, material, parent, owner, edges = true) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w * S, h * S, d * S), material);
  m.position.copy(P(x + w / 2, y + d / 2, z + h / 2));
  m.castShadow = true; m.receiveShadow = true;
  if (edges) m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), edgeMat));
  if (owner) { m.userData.owner = owner; pickables.push(m); }
  parent.add(m);
  return m;
}
const furniture = new THREE.Group(); scene.add(furniture);
function rrShape(w, d, r) {
  const sh = new THREE.Shape(), x = -w / 2, y = -d / 2;
  if (r < 0.0005) { sh.moveTo(x, y); sh.lineTo(x + w, y); sh.lineTo(x + w, y + d); sh.lineTo(x, y + d); sh.lineTo(x, y); return sh; }
  sh.moveTo(x + r, y); sh.lineTo(x + w - r, y); sh.quadraticCurveTo(x + w, y, x + w, y + r); sh.lineTo(x + w, y + d - r); sh.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
  sh.lineTo(x + r, y + d); sh.quadraticCurveTo(x, y + d, x, y + d - r); sh.lineTo(x, y + r); sh.quadraticCurveTo(x, y, x + r, y); return sh;
}
const rbGeo = {};
// bryła z zaokrąglonymi pionowymi narożnikami (r) i fazowanymi krawędziami (b), wymiary w cm jak box()
function rbox(x, y, z, w, d, h, r, b, material, owner, parent = furniture) {
  b = Math.max(0, Math.min(b, w / 2 - 0.1, d / 2 - 0.1, h / 2 - 0.05));
  r = Math.max(0, Math.min(r - b, (w - 2 * b) / 2 - 0.05, (d - 2 * b) / 2 - 0.05));
  const key = [w, d, h, r, b].map((v) => v.toFixed(2)).join("|");
  let g = rbGeo[key];
  if (!g) {
    g = new THREE.ExtrudeGeometry(rrShape((w - 2 * b) * S, (d - 2 * b) * S, r * S), { depth: Math.max(0.0005, (h - 2 * b) * S), bevelEnabled: b > 0, bevelThickness: b * S, bevelSize: b * S, bevelSegments: 3, curveSegments: 6 });
    g.translate(0, 0, b * S); g.rotateX(-Math.PI / 2); rbGeo[key] = g;
  }
  const m = new THREE.Mesh(g, material);
  m.position.copy(P(x + w / 2, y + d / 2, z)); m.castShadow = true; m.receiveShadow = true;
  if (owner) { m.userData.owner = owner; pickables.push(m); }
  parent.add(m); return m;
}
function screenTex(w, h, draw) { return canvasTex(w, h, draw); }
const PANEL_TEX = screenTex(320, 200, (g, w, h) => {
  g.fillStyle = "#f4f6f8"; g.fillRect(0, 0, w, h); g.fillStyle = "#1d4f91"; g.fillRect(0, 0, w, 26);
  g.fillStyle = "#fff"; g.font = "bold 15px sans-serif"; g.fillText("Kopiowanie   Skanowanie   Druk", 10, 18);
  const c = ["#2f7fd1", "#3aa56b", "#e2a33a", "#8a5cc7", "#d0533f", "#2fa3b7"];
  for (let i = 0; i < 6; i++) { const x = 14 + (i % 3) * 100, y = 40 + Math.floor(i / 3) * 76; g.fillStyle = c[i]; g.fillRect(x, y, 88, 64); g.fillStyle = "rgba(255,255,255,.85)"; g.fillRect(x + 30, y + 14, 28, 22); }
});
function panel3d(cx, cy, cz, w, d, tiltX, tiltZ, rotY = 0) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(w * S, 1.6 * S, d * S), mat(0x1e2123, { roughness: 0.4 })); body.castShadow = true; g.add(body);
  const sc = new THREE.Mesh(new THREE.PlaneGeometry((w - 2.4) * S, (d - 2.4) * S), new THREE.MeshBasicMaterial({ map: PANEL_TEX, toneMapped: false }));
  sc.rotation.x = -Math.PI / 2; sc.position.y = 0.0082; if (rotY) sc.rotation.z = rotY; g.add(sc);
  g.position.copy(P(cx, cy, cz)); g.rotation.x = tiltX; g.rotation.z = tiltZ; furniture.add(g); return g;
}

// podłoga: deska dębowa
const floor = new THREE.Mesh(new THREE.PlaneGeometry(9, 6), mat(0xffffff, { map: floorTex, roughness: 0.5 }));
floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

// ściany
const T = 15;
const wallOpts = { transparent: true, map: TEX.plaster, roughness: 0.95 };
const wallMat = { N: mat(0xe6d8bf, wallOpts), S: mat(0xeadcc4, wallOpts), W: mat(0xe2d3b9, wallOpts), E: mat(0xe2d3b9, wallOpts) };
const walls = { N: new THREE.Group(), S: new THREE.Group(), W: new THREE.Group(), E: new THREE.Group() };
Object.values(walls).forEach((g) => scene.add(g));
const wb = (k, x, y, z, w, d, h) => { const m = box(x, y, z, w, d, h, wallMat[k], walls[k], null, false); m.castShadow = k === "S"; return m; };
wb("N", -T, -T, 0, DOOR.x0 + T, T, ROOM.h); wb("N", DOOR.x1, -T, 0, ROOM.w - DOOR.x1 + T, T, ROOM.h); wb("N", DOOR.x0, -T, DOOR.h, DOOR.x1 - DOOR.x0, T, ROOM.h - DOOR.h);
let sx = -T; WINDOWS.forEach(([a, b]) => { wb("S", sx, ROOM.d, 0, a - sx, SOUTH_T, ROOM.h); wb("S", a, ROOM.d, 0, b - a, SOUTH_T, SILL); wb("S", a, ROOM.d, HEAD, b - a, SOUTH_T, ROOM.h - HEAD); wb("S", a, ROOM.d + NICHE + 4, SILL, b - a, SOUTH_T - NICHE - 4, HEAD - SILL); sx = b; }); wb("S", sx, ROOM.d, 0, ROOM.w + T - sx, SOUTH_T, ROOM.h);
wb("W", -T, 0, 0, T, ROOM.d, ROOM.h); wb("E", ROOM.w, 0, 0, T, ROOM.d, ROOM.h);
// okna: szyby, białe ramy ze słupkiem i ślemieniem, parapety
const glassMat = new THREE.MeshStandardMaterial({ color: lin(0xcfe6f2), transparent: true, opacity: 0.18, roughness: 0.05, metalness: 0.1 });
const frameMat = mat(0xf7f6f2, { roughness: 0.4 });
WINDOWS.forEach(([a, b]) => {
  const g = box(a, ROOM.d + NICHE + 1, SILL, b - a, 2, HEAD - SILL, glassMat, walls.S, null, false); g.castShadow = false;
  const yy = ROOM.d + NICHE - 3, fw = 7;
  [[a, SILL, b - a, fw], [a, HEAD - fw, b - a, fw], [a, HEAD - 75, b - a, 5]].forEach(([x0, z0, w0, h0]) => box(x0, yy, z0, w0, 7, h0, frameMat, walls.S, null, false));
  [a, b - fw, (a + b) / 2 - 3].forEach((x0) => box(x0, yy, SILL, x0 === (a + b) / 2 - 3 ? 6 : fw, 7, HEAD - SILL, frameMat, walls.S, null, false));
  box(a - 1, ROOM.d - 3, SILL - 3, b - a + 2, NICHE + 3, 3, mat(0xf3efe7, { roughness: 0.35 }), furniture, null, false);
});
// listwy przypodłogowe
const baseMat = mat(0xf4f2ec, { roughness: 0.45 });
box(0, 0, 0, 1.5, ROOM.d, 9, baseMat, walls.W, null, false); box(ROOM.w - 1.5, 0, 0, 1.5, ROOM.d, 9, baseMat, walls.E, null, false);
box(0, 0, 0, DOOR.x0, 1.5, 9, baseMat, walls.N, null, false); box(DOOR.x1, 0, 0, ROOM.w - DOOR.x1, 1.5, 9, baseMat, walls.N, null, false);
box(0, ROOM.d - 1.5, 0, ROOM.w, 1.5, 9, baseMat, walls.S, null, false);
// opaska drzwi i skrzydło otwarte na zewnątrz
[[DOOR.x0 - 7, 7], [DOOR.x1, 7]].forEach(([x0, w0]) => box(x0, 0, 0, w0, 1.5, DOOR.h + 7, frameMat, walls.N, null, false));
box(DOOR.x0 - 7, 0, DOOR.h, DOOR.x1 - DOOR.x0 + 14, 1.5, 7, frameMat, walls.N, null, false);
const leaf = box(DOOR.hinge - 4, -T - DOOR.leaf, 0, 4, DOOR.leaf, DOOR.h - 2, woodMat("sonoma", true, { roughness: 0.55 }), walls.N, null);
// sufit (tylko w widoku z wnętrza)
const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(9, 6), mat(0xf7f3ea, { roughness: 1 }));
ceiling.rotation.x = Math.PI / 2; ceiling.position.set(0, ROOM.h * S, 0); scene.add(ceiling);
// grzejniki płytowe
RADIATORS.forEach((r) => { box(r.x, r.y, r.z, r.w, r.d, r.h, mat(0xf6f6f3, { roughness: 0.35 }), furniture, null, false); for (let k = 5; k < r.w - 2; k += 7) box(r.x + k, r.y - 0.8, r.z + 3, 1.6, 0.8, r.h - 6, mat(0xe4e4e1, { roughness: 0.35 }), furniture, null, false); });
// meble
function chair3d(it, color) {
  // LÄKTARE: tapicerowane siedzisko i oparcie, biała rama z podłokietnikami
  const g = new THREE.Group(); furniture.add(g);
  const { x, y, w, d } = it, seat = 46, owner = it;
  const fab = fabricMat(color), frame = mat(0xf1f0eb, { roughness: 0.3, metalness: 0.25 });
  box(x + 5, y + 5, seat - 7, w - 10, d - 10, 3, frame, g, owner, false);
  rbox(x + 5, y + 5, seat - 4.5, w - 10, d - 10, 6, 4, 2, fab, owner, g);
  const f = it.face;
  const back = { N: [x + 6, y + d - 9, w - 12, 4], S: [x + 6, y + 5, w - 12, 4], E: [x + 5, y + 6, 4, d - 12], W: [x + w - 9, y + 6, 4, d - 12] }[f];
  rbox(back[0], back[1], seat + 6, back[2], back[3], it.h - seat - 8, 2, 1.5, fab, owner, g);
  const alongY = f === "N" || f === "S";
  (alongY ? [[x + 1.5, y + 8, 3, d - 16], [x + w - 4.5, y + 8, 3, d - 16]] : [[x + 8, y + 1.5, w - 16, 3], [x + 8, y + d - 4.5, w - 16, 3]]).forEach(([ax, ay, aw, ad]) => box(ax, ay, seat + 18, aw, ad, 2.5, frame, g, null, false));
  (alongY ? [[x + 1.5, y + 8], [x + 1.5, y + d - 11], [x + w - 4.5, y + 8], [x + w - 4.5, y + d - 11]] : [[x + 8, y + 1.5], [x + w - 11, y + 1.5], [x + 8, y + d - 4.5], [x + w - 11, y + d - 4.5]]).forEach(([lx, ly]) => box(lx, ly, 0, 3, 3, seat + 18, frame, g, null, false));
  return g;
}
function table3d(it, topColor, legColor = COL.leg) {
  const { x, y, w, d, h, z } = it;
  const wood = PAL[it.k] && PAL[it.k].col === OAK ? "oak" : PAL[it.k] && PAL[it.k].col === ASH ? "ash" : null;
  rbox(x, y, z + h - 2.5, w, d, 2.5, 1, 0.5, wood ? woodMat(wood, d > w, { roughness: 0.42 }) : mat(topColor), it);
  box(x + 6, y + 6, z + h - 6, w - 12, d - 12, 3.5, mat(legColor, { roughness: 0.5 }), furniture, null, false);
  const inset = 5, lw = 4;
  [[inset, inset], [w - inset - lw, inset], [inset, d - inset - lw], [w - inset - lw, d - inset - lw]].forEach(([dx, dy]) => box(x + dx, y + dy, z, lw, lw, h - 6, mat(legColor, { roughness: 0.5, metalness: 0.3 }), furniture, null, false));
}
function foliage(cx, cy, cz, r) {
  const greens = [0x4d8642, 0x6a9c55, 0x3e7639, 0x7ba765];
  for (let k = 0; k < 6; k++) {
    const sp = new THREE.Mesh(new THREE.IcosahedronGeometry(r * (0.4 + rnd() * 0.3) * S, 1), mat(greens[k % 4], { roughness: 0.85, flatShading: true }));
    sp.position.copy(P(cx + (rnd() - 0.5) * r * 1.1, cy + (rnd() - 0.5) * r * 1.1, cz + rnd() * r * 0.9));
    sp.scale.set(1, 0.8 + rnd() * 0.5, 1); sp.castShadow = true; furniture.add(sp);
  }
  for (let k = 0; k < 5; k++) {
    const lf = new THREE.Mesh(new THREE.ConeGeometry(r * 0.13 * S, r * 1.5 * S, 4), mat(0x3e7639, { flatShading: true, roughness: 0.8 }));
    lf.position.copy(P(cx + (rnd() - 0.5) * r * 0.5, cy + (rnd() - 0.5) * r * 0.5, cz - r * 0.15));
    lf.rotation.set((rnd() - 0.5) * 2.4, rnd() * 6, (rnd() - 0.5) * 2.4); furniture.add(lf);
  }
}
I.forEach((it) => {
  const c = CAT[it.k];
  const zc = COL[c.z];
  const pal = PAL[it.k];
  if (it.kind === "chair") return chair3d(it, pal ? hex(pal.col) : 0xd6c9ae);
  if (it.kind === "stack") { for (let q = 0; q < it.n; q++) { const g = chair3d({ ...it, h: 84 }, pal ? hex(pal.col) : 0x8f9294); g.children.forEach((m) => { if (m.userData.owner) m.userData.owner = it; }); g.position.y += q * 0.09; g.position.z -= q * 0.012; } return; }
  if (it.k === "stol_wysoki") {
    // IKEA TROTTEN: blat jesion, biała rama z teleskopowymi kolumnami, stopy wzdłuż głębokości
    const { x, y, w, d, h } = it, wf = mat(0xf2f1ec, { roughness: 0.35, metalness: 0.15 });
    rbox(x, y, h - 2.5, w, d, 2.5, 1, 0.5, woodMat("ash", false, { roughness: 0.45 }), it);
    box(x + 6, y + d / 2 - 3, h - 7, w - 12, 6, 4.5, wf, furniture, null, false);
    [x + 6, x + w - 14].forEach((lx) => {
      rbox(lx - 1, y + 3, 0, 10, d - 6, 3.5, 1.5, 1, wf, it);
      rbox(lx, y + d / 2 - 3.5, 3.5, 8, 7, 52, 1, 0.4, wf, it);
      rbox(lx + 0.7, y + d / 2 - 2.8, 55, 6.6, 5.6, h - 62, 1, 0.3, wf, it);
      box(lx - 1, y + 4, h - 6, 10, d - 8, 3.5, wf, furniture, null, false);
    });
    rbox(x + w - 22, y + d - 4, h - 5.5, 9, 4, 2, 1, 0.5, mat(0xe9e8e3), null);
    return;
  }
  if (it.k === "biurko") {
    // IKEA BOLLPOJKE: blat z sosny, biała rama ze skrzyżowanymi nogami po bokach, sosnowa półka pod blatem
    const { x, y, w, d, h } = it, wf = mat(0xf2f1ec, { roughness: 0.4 });
    rbox(x, y, h - 2.5, w, d, 2.5, 1, 0.5, woodMat("pine", d > w, { roughness: 0.45 }), it);
    const L = Math.hypot(w - 8, h - 6), ang = Math.atan2(h - 6, w - 8);
    [y + 1.5, y + d - 4.5].forEach((ly) => {
      [ang, -ang].forEach((a) => {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(L * S, 3.5 * S, 3 * S), wf);
        bar.position.copy(P(x + w / 2, ly + 1.5, (h - 6) / 2)); bar.rotation.z = a;
        bar.castShadow = true; bar.userData.owner = it; pickables.push(bar); furniture.add(bar);
      });
      box(x + 2, ly, h - 7, w - 4, 3, 4.5, wf, furniture, null, false);
    });
    box(x + 2, y + 4.5, h - 7, 3, d - 9, 4.5, wf, furniture, null, false);
    box(x + 4, y + 4.5, h - 15, w - 8, d - 9, 1.8, woodMat("pine", d > w, { roughness: 0.5 }), furniture, it, false);
    return;
  }
  if (it.kind === "table") return table3d(it, pal ? hex(pal.col) : 0xe9e2d3, pal && pal.frame ? hex(pal.frame) : COL.leg);
  if (it.kind === "sofa") {
    // EKTORP: miękka rama, grube poduchy siedziska i oparcia, wysokie zaokrąglone podłokietniki
    const col = fabricMat(pal ? hex(pal.col) : 0x8ea595);
    const n = it.seats || 2, arm = 18, inner = it.w - 2 * arm, X = it.x, Y = it.y, Dp = it.d;
    rbox(X + 1, Y + 6, 3, it.w - 2, Dp - 7, 37, 4, 2.5, col, it);
    rbox(X + arm - 4, Y + Dp - 21, 36, inner + 8, 20, it.h - 38, 5, 4, col, it);
    [X, X + it.w - arm].forEach((ax) => rbox(ax, Y + 3, 3, arm, Dp - 3, 62, 7, 6.5, col, it));
    for (let k = 0; k < n; k++) {
      const cx = X + arm + (inner / n) * k + 0.4, cw = inner / n - 0.8;
      rbox(cx, Y + 4, 38.5, cw, Dp - 27, 15, 6, 4.5, col, it);
      rbox(cx + 1, Y + Dp - 37, 53, cw - 2, 18, it.h - 55, 7, 6, col, it);
    }
    [[4, 8], [it.w - 8, 8], [4, Dp - 6], [it.w - 8, Dp - 6]].forEach(([dx, dy]) => box(X + dx, Y + dy, 0, 4, 4, 3, mat(0x5b4430), furniture, null, false));
    return;
  }
  if (it.kind === "round") {
    const top = new THREE.Mesh(new THREE.CylinderGeometry(it.w / 2 * S, it.w / 2 * S, 0.03, 32), mat(pal ? hex(pal.col) : COL.wood));
    top.position.copy(P(it.x + it.w / 2, it.y + it.d / 2, it.h - 1.5)); top.castShadow = true; top.userData.owner = it; pickables.push(top); furniture.add(top);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.15, (it.h - 3) * S, 16), mat(pal ? hex(pal.col) : COL.leg));
    leg.position.copy(P(it.x + it.w / 2, it.y + it.d / 2, (it.h - 3) / 2)); leg.castShadow = true; furniture.add(leg);
    return;
  }
  if (it.kind === "pot") {
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(it.w / 2 * S, it.w / 2.7 * S, it.h * 0.42 * S, 24), mat(0xb9775a, { roughness: 0.85 }));
    pot.position.copy(P(it.x + it.w / 2, it.y + it.d / 2, it.z + it.h * 0.21)); pot.castShadow = true; pot.receiveShadow = true;
    pot.userData.owner = it; pickables.push(pot); furniture.add(pot);
    foliage(it.x + it.w / 2, it.y + it.d / 2, it.z + it.h * 0.5, Math.max(it.w, it.d) * 0.7);
    if (it.trail) {
      const leafGeo = new THREE.SphereGeometry(0.024, 8, 6), greens = [mat(0x4d8642, { roughness: 0.7 }), mat(0x6a9c55, { roughness: 0.7 }), mat(0x8bb36f, { roughness: 0.7 })];
      for (let k = 0; k < 5; k++) {
        let cx = it.x + it.w - 4, cy = it.y + 3 + k * (it.d - 6) / 4; const len = 55 + rnd() * 45;
        let zz = it.z + 6;
        for (let t = 0; t < len; t += 3.5) { if (cx < 47) { cx += 3; zz = Math.max(it.z + 2, zz - 0.6); } else { cx = 47 + rnd() * 1.5; zz -= 3.5; } const lf = new THREE.Mesh(leafGeo, greens[(k + Math.floor(t / 7)) % 3]); lf.position.copy(P(cx, cy + Math.sin(t / 9 + k) * 1.5, zz)); lf.scale.set(0.9, 0.6 + rnd() * 0.5, 0.9); lf.castShadow = true; furniture.add(lf); }
      }
    }
    return;
  }
  if (it.kind === "plants") {
    // wąska listwa dębowa, dwie doniczki u góry, długie zwisające pędy
    const slat = woodMat("slat", true, { roughness: 0.6 });
    box(it.x + it.w - 2.5, it.y + it.d / 2 - 4, it.z, 2.5, 8, it.h, slat, furniture, it, false);
    const leafGeo = new THREE.SphereGeometry(0.026, 8, 6);
    const greens = [mat(0x4d8642, { roughness: 0.7 }), mat(0x6a9c55, { roughness: 0.7 }), mat(0x3e7639, { roughness: 0.7 }), mat(0x8bb36f, { roughness: 0.7 })];
    [it.z + it.h - 16, it.z + it.h - 80].forEach((pz, lvl) => {
      box(it.x - 14, it.y + 3, pz - 2, it.w + 11.5, it.d - 6, 2, slat, furniture, it, false);
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.065, 0.14, 20), mat(lvl ? 0xebe6dc : 0xb9775a, { roughness: 0.8 }));
      pot.position.copy(P(it.x - 3, it.y + it.d / 2, pz + 7)); pot.castShadow = true; furniture.add(pot);
      foliage(it.x - 3, it.y + it.d / 2, pz + 13, 10);
      for (let k = 0; k < 7; k++) {
        const ang = (k / 7) * Math.PI * 2, r0 = 7, len = (lvl ? 55 : 95) * (0.55 + rnd() * 0.6);
        let cx = it.x - 3 + Math.cos(ang) * r0 * 0.6, cy = it.y + it.d / 2 + Math.sin(ang) * r0;
        for (let t = 0; t < len; t += 4) {
          cx = Math.min(it.x + 3, cx - 0.15 + (rnd() - 0.5) * 0.8); cy += Math.sin(t / 13 + k) * 0.7;
          const lf = new THREE.Mesh(leafGeo, greens[(k + Math.floor(t / 8)) % 4]);
          lf.position.copy(P(cx, cy, pz + 12 - t)); lf.scale.set(0.5 + rnd() * 0.5, 1 + rnd() * 0.4, 0.9 + rnd() * 0.5); lf.rotation.set(rnd() * 3, rnd() * 3, 0); lf.castShadow = true; furniture.add(lf);
        }
      }
    });
    return;
  }
  if (it.k === "pojemniki") {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.038, 0.1, 20), woodMat("oak", false, { roughness: 0.5 }));
    cup.position.copy(P(it.x + 5, it.y + 5, it.z + 5)); cup.castShadow = true; cup.userData.owner = it; pickables.push(cup); furniture.add(cup);
    [0x2457b8, 0xc8372d, 0x222222, 0xe7b031].forEach((pc, q) => { const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.14, 6), mat(pc)); pen.position.copy(P(it.x + 3.5 + (q % 2) * 3, it.y + 3.5 + Math.floor(q / 2) * 3, it.z + 9)); pen.rotation.set((q - 1.5) * 0.12, 0, (q % 2 - 0.5) * 0.25); furniture.add(pen); });
    return;
  }
  if (it.k === "laptop") {
    const alu = mat(0x9aa1a5, { metalness: 0.6, roughness: 0.35 });
    rbox(it.x, it.y, it.z, it.w, it.d, 1.6, 1.2, 0.4, alu, it);
    const narrow = it.w < it.d;
    if (narrow) box(it.x + 4, it.y + 3, it.z + 1.6, it.w - 12, it.d - 6, 0.15, mat(0x2a2d2f), furniture, null, false); else box(it.x + 3, it.y + 4, it.z + 1.6, it.w - 6, it.d - 12, 0.15, mat(0x2a2d2f), furniture, null, false);
    const scr = new THREE.Mesh(new THREE.BoxGeometry((narrow ? 0.7 : it.w) * S, 22 * S, (narrow ? it.d : 0.7) * S), alu);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry((narrow ? it.d : it.w) * S * 0.92, 20 * S), mat(0x1c2830, { roughness: 0.15, emissive: 0x24414f, emissiveIntensity: 0.6 }));
    const g = new THREE.Group(); g.add(scr); g.add(glass);
    glass.position.set(narrow ? 0.0045 : 0, 0, narrow ? 0 : -0.0045); if (narrow) glass.rotation.y = Math.PI / 2; else glass.rotation.y = Math.PI;
    g.position.copy(narrow ? P(it.x + 2, it.y + it.d / 2, it.z + 11) : P(it.x + it.w / 2, it.y + it.d - 2, it.z + 11));
    if (narrow) g.rotation.z = -0.22; else g.rotation.x = 0.22;
    g.children.forEach((c) => (c.castShadow = true)); furniture.add(g);
    return;
  }
  if (it.k === "lampa") {
    // IKEA TERTIAL: zacisk na tylnej krawędzi blatu, dwa ramiona, stożkowy klosz skierowany na blat
    const wl = mat(0xf4f4f2, { roughness: 0.35 });
    const cx = it.x + 4, cy = it.y + 7, z0 = it.z;
    box(cx - 3, cy - 3, z0 - 5, 6, 6, 9, wl, furniture, it);
    const seg = (a, b, r) => {
      const v = new THREE.Vector3().subVectors(b, a);
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r * S, r * S, v.length(), 10), wl);
      m.position.copy(a).addScaledVector(v, 0.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize());
      m.castShadow = true; m.userData.owner = it; pickables.push(m); furniture.add(m);
    };
    const p0 = P(cx, cy, z0 + 4), p1 = P(cx + 6, cy, z0 + 40), p2 = P(cx + 26, cy, z0 + 47);
    seg(p0, p1, 0.8); seg(p1, p2, 0.8);
    const shade = new THREE.Mesh(new THREE.ConeGeometry(6.5 * S, 12 * S, 24, 1, true), mat(0xf4f4f2, { roughness: 0.35, side: THREE.DoubleSide }));
    shade.position.copy(P(cx + 30, cy, z0 + 42)); shade.rotation.z = 0.5; shade.castShadow = true; shade.userData.owner = it; pickables.push(shade); furniture.add(shade);
    return;
  }
  if (it.k === "podstawka") {
    // IKEA STENERIK: dwie wygięte podpórki z białej sklejki pod laptopem
    const wp = mat(0xf2f1ec, { roughness: 0.4 }), ply = mat(0xd9bf94, { roughness: 0.6 });
    [it.y + 1, it.y + it.d - 5].forEach((py) => {
      box(it.x, py, it.z, it.w, 4, 1, wp, furniture, it);
      box(it.x + 2, py, it.z + 1, 2, 4, it.h - 2, ply, furniture, it, false);
      box(it.x + 2, py, it.z + it.h - 1, it.w - 3, 4, 1, wp, furniture, it);
    });
    return;
  }
  if (it.k === "czajnik") {
    const k = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.23, 24), mat(0xb3b8ba, { metalness: 0.7, roughness: 0.25 }));
    k.position.copy(P(it.x + 11, it.y + 8, it.z + 13)); k.castShadow = true; k.userData.owner = it; pickables.push(k); furniture.add(k);
    box(it.x + 1, it.y + 1, it.z, 20, 14, 2, blackMetal, furniture, null, false);
    return;
  }
  const DEV = {
    wh: mat(0xeef0ef, { roughness: 0.42 }), lg: mat(0xd9dcdc, { roughness: 0.48 }), dk: mat(0x3d4144, { roughness: 0.5 }),
    seam: mat(0x9fa4a6, { roughness: 0.6 }), black: mat(0x1c1f21, { roughness: 0.25, metalness: 0.2 }), led: mat(0x2bd46b, { emissive: 0x2bd46b, emissiveIntensity: 1.2 }),
  };
  const X = it.x, Y = it.y, W = it.w, D = it.d, Z = it.z || 0, H = it.h, FY = it.y + it.d, FX = it.x + it.w;
  const fN = (x0, z0, w0, h0, dep, mm) => box(X + x0, FY, z0, w0, dep, h0, mm, furniture, null, false); // detal na froncie (ściana z wejściem)
  const fW = (y0, z0, w0, h0, dep, mm) => box(FX, Y + y0, z0, dep, w0, h0, mm, furniture, null, false); // detal na froncie (ściana z szafami)
  if (it.k === "projektor") {
    // rzutnik na uchwycie sufitowym z wysięgnikiem, obiektyw w stronę ściany przy jadalni
    rbox(X + W / 2 - 8, Y + D / 2 - 8, ROOM.h - 2, 16, 16, 2, 2, 0.5, DEV.dk, it);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, (ROOM.h - Z - H - 2) * S, 12), DEV.dk);
    pole.position.copy(P(X + W / 2, Y + D / 2, (ROOM.h - 2 + Z + H) / 2)); pole.castShadow = true; furniture.add(pole);
    rbox(X + W / 2 - 7, Y + D / 2 - 7, Z + H, 14, 14, 1.5, 1, 0.4, DEV.dk, null);
    rbox(X, Y, Z, W, D, H, 2.5, 1.5, mat(0xf2f2f0, { roughness: 0.4 }), it);
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.042, 0.03, 24), DEV.black); lens.rotation.z = Math.PI / 2; lens.position.copy(P(X + W + 1, Y + D / 2 - 5, Z + H / 2)); furniture.add(lens);
    const glass = new THREE.Mesh(new THREE.CircleGeometry(0.03, 24), mat(0x2b4a6b, { roughness: 0.05, metalness: 0.5 })); glass.rotation.y = Math.PI / 2; glass.position.copy(P(X + W + 2.6, Y + D / 2 - 5, Z + H / 2)); furniture.add(glass);
    for (let k = 0; k < 5; k++) box(X + 4, Y + 4 + k * 3.5, Z + H, 10, 1.2, 0.3, DEV.dk, furniture, null, false);
    return;
  }
  if (it.k === "telefon") {
    // telefon stacjonarny: podstawa z klawiaturą i wyświetlaczem, słuchawka
    rbox(X, Y, Z, W, D, 4.5, 2, 1.2, DEV.black, it);
    rbox(X + 1, Y + 1.5, Z + 4.5, 5.5, D - 3, 3.2, 2, 1.4, mat(0x2a2d2f, { roughness: 0.35 }), it);
    box(X + 9, Y + D - 7, Z + 4.5, 9, 5, 0.3, mat(0x9fb3a8, { roughness: 0.2 }), furniture, null, false);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) box(X + 9 + c * 3.2, Y + 2 + r * 2.5, Z + 4.5, 2.2, 1.6, 0.5, mat(0x5a5f62), furniture, null, false);
    return;
  }
  if (it.k === "ap") {
    // access point na ścianie: biały dysk z diodą
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.115, 0.035, 40), mat(0xf6f6f4, { roughness: 0.35 }));
    disc.rotation.x = Math.PI / 2; disc.position.copy(P(X + W / 2, Y + 2, Z + H / 2)); disc.castShadow = true; disc.userData.owner = it; pickables.push(disc); furniture.add(disc);
    const led = new THREE.Mesh(new THREE.CircleGeometry(0.008, 16), mat(0x3b8cff, { emissive: 0x3b8cff, emissiveIntensity: 1.5 })); led.rotation.y = Math.PI; led.position.copy(P(X + W / 2, Y + 0.1, Z + H / 2)); furniture.add(led);
    return;
  }
  if (it.k === "druk_duza") {
    // Konica Minolta bizhub C450i z kasetą PC i wewnętrzną tacą wydruku
    rbox(X + 3, Y + 3, 0, W - 6, D - 6, 5, 1, 0, DEV.dk, it);
    rbox(X, Y, 5, W, D, 31, 1.5, 0.6, DEV.lg, it);
    [20.5, 35.5].forEach((zz) => fN(1, zz, W - 2, 0.5, 0.4, DEV.seam));
    [31, 16].forEach((zz) => fN(W / 2 - 11, zz, 22, 1.4, 0.5, DEV.dk));
    rbox(X, Y, 36, W, D, 46, 1.8, 0.6, DEV.wh, it);
    [48, 60].forEach((zz) => fN(1, zz, W - 2, 0.5, 0.4, DEV.seam));
    [45, 57].forEach((zz) => fN(W / 2 - 9, zz, 18, 1.3, 0.5, DEV.dk));
    fN(4, 76, 9, 1.6, 0.3, mat(0x1d4f91));
    rbox(X, Y, 82, W, D * 0.42, 12, 1, 0.4, DEV.wh, it);
    rbox(X + W - 11, Y, 82, 11, D - 1, 12, 1, 0.4, DEV.wh, it);
    box(X + 2, Y + D * 0.42, 82, W - 13, D * 0.5, 1, DEV.dk, furniture, null, false);
    box(X + 10, Y + D * 0.48, 83, 29.7, 21, 1.2, mat(0xffffff, { roughness: 0.9 }), furniture, null, false);
    rbox(X, Y, 94, W, D - 1, 13, 1.8, 0.6, DEV.wh, it);
    fN(2, 99.5, W - 14, 0.6, 0.3, DEV.dk);
    rbox(X + 2, Y + 2, 107, W - 4, D - 13, 13.7, 2.5, 1.2, DEV.lg, it);
    box(X + 9, Y + 13, 119.6, W - 26, D - 34, 1, mat(0xc4c8c9, { roughness: 0.5 }), furniture, null, false);
    box(X + 8, Y + D - 11.2, 109, W - 18, 0.5, 2.2, DEV.dk, furniture, null, false);
    box(X + W - 21, Y + D - 9, 98, 5, 10, 4, DEV.dk, furniture, null, false);
    panel3d(X + W - 17, Y + D + 3, 103.5, 27, 17, 0.62, 0);
    fN(W - 8, 88, 1.2, 1.2, 0.5, DEV.led);
    return;
  }
  if (it.k === "finiszer") {
    // finiszer broszurujący FS-539SD: korpus, drzwi frontowe, tace wyjściowe z lewej strony
    rbox(X + 2, Y + 3, 0, W - 4, D - 6, 3, 1, 0, DEV.dk, it);
    rbox(X, Y, 3, W, D, H - 3, 1.8, 0.6, DEV.wh, it);
    fN(W * 0.5, 6, 0.5, H - 22, 0.4, DEV.seam);
    fN(2, H - 16, W - 4, 0.5, 0.4, DEV.seam);
    fN(W / 2 - 9, H - 24, 18, 1.4, 0.5, DEV.dk);
    rbox(X + 4, Y + 6, H - 1, W - 12, D - 12, 2, 1, 0.5, DEV.lg, it);
    [[78, 26, 34, -0.22], [58, 20, 30, -0.18], [30, 14, 26, -0.12]].forEach(([zz, len, dep, rz]) => {
      const tray = new THREE.Mesh(new THREE.BoxGeometry(len * S, 0.9 * S, dep * S), DEV.lg);
      tray.position.copy(P(X - len / 2 + 2, Y + D / 2 + 2, zz)); tray.rotation.z = rz; tray.castShadow = true; tray.userData.owner = it; pickables.push(tray); furniture.add(tray);
      if (zz === 78) { const pap = new THREE.Mesh(new THREE.BoxGeometry(20 * S, 2.2 * S, 28 * S), mat(0xffffff, { roughness: 0.9 })); pap.position.copy(P(X - 10, Y + D / 2 + 2, zz + 3.2)); pap.rotation.z = rz; furniture.add(pap); }
    });
    return;
  }
  if (it.k === "podstawa") {
    // podstawa KSW pod Xeroxa: laminat, dwoje drzwiczek, kółka
    [[4, 4], [W - 8, 4], [4, D - 8], [W - 8, D - 8]].forEach(([dx, dy]) => { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.03, 14), DEV.black); c.rotation.x = Math.PI / 2; c.position.copy(P(X + dx + 2, Y + dy + 2, 2.2)); c.castShadow = true; furniture.add(c); });
    rbox(X, Y, 4.5, W, D, H - 4.5, 1, 0.5, mat(0xd2d2ce, { roughness: 0.55 }), it);
    fW(D / 2 - 0.25, 7, 0.5, H - 10, 0.4, DEV.seam);
    [D / 2 - 6, D / 2 + 4.5].forEach((yy) => fW(yy, H - 16, 1.5, 9, 1.6, mat(0x9ea3a5, { metalness: 0.7, roughness: 0.3 })));
    return;
  }
  if (it.k === "druk_mala") {
    // Xerox VersaLink B7130: kasety, korpus, wewnętrzna taca, skaner z podajnikiem, panel 7"
    rbox(X, Y, Z, W, D, 23, 1.8, 0.6, DEV.lg, it);
    [Z + 11.5].forEach((zz) => fW(1, zz, D - 2, 0.5, 0.4, DEV.seam));
    [Z + 8, Z + 19].forEach((zz) => fW(D / 2 - 9, zz, 18, 1.3, 0.5, DEV.dk));
    rbox(X, Y, Z + 23, W, D, 30, 1.8, 0.6, DEV.wh, it);
    fW(4, Z + 46, 10, 1.6, 0.3, mat(0x1b1b1b));
    rbox(X, Y, Z + 53, W * 0.45, D, 9, 1, 0.4, DEV.wh, it);
    rbox(X, Y + D - 11, Z + 53, W - 1, 11, 9, 1, 0.4, DEV.wh, it);
    box(X + W * 0.45, Y + 2, Z + 53, W * 0.5, D - 14, 1, DEV.dk, furniture, null, false);
    box(X + W * 0.5, Y + 8, Z + 54, 21, 29.7, 1.2, mat(0xffffff, { roughness: 0.9 }), furniture, null, false);
    rbox(X, Y, Z + 62, W - 1, D, 8, 1.8, 0.6, DEV.wh, it);
    rbox(X + 2, Y + 2, Z + 70, W - 13, D - 4, H - 70, 2.5, 1.2, DEV.lg, it);
    box(X + 12, Y + 8, Z + H - 1.6, W - 30, D - 16, 1, mat(0xc4c8c9), furniture, null, false);
    panel3d(FX + 2, Y + D * 0.68, Z + 66, 14, 19, 0, -0.6);
    fW(D - 6, Z + 58, 1.2, 1.2, 0.5, DEV.led);
    return;
  }
  if (it.k === "lodowka") {
    // lodówka wolnostojąca 220 cm, szara: korpus, drzwi chłodziarki i zamrażarki, pionowe uchwyty, wyświetlacz
    const gm = mat(0x8f9396, { metalness: 0.55, roughness: 0.32 });
    rbox(X + 0.5, Y, 4, W - 1, D - 3.5, H - 4, 2, 0.8, gm, it);
    rbox(X + 0.3, Y + D - 4, 4.5, W - 0.6, 4, 74, 2, 1, gm, it);
    rbox(X + 0.3, Y + D - 4, 79.5, W - 0.6, 4, H - 80, 2, 1, gm, it);
    box(X + 3, Y + D - 7, 0, W - 6, 1.5, 4, DEV.black, furniture, null, false);
    [[52, 24], [86, 64]].forEach(([z0, hh]) => { rbox(X + 3.5, FY, z0, 2.4, 3.5, hh, 1.1, 0.5, mat(0xc9cdcf, { metalness: 0.85, roughness: 0.22 }), it); });
    box(X + W / 2 - 7, FY, 168, 14, 0.4, 5, DEV.black, furniture, null, false);
    box(X + W / 2 - 5, FY + 0.4, 170, 10, 0.2, 1.2, mat(0x7cc4ff, { emissive: 0x7cc4ff, emissiveIntensity: 1 }), furniture, null, false);
    return;
  }
  if (it.k === "zmywarka") {
    // Bosch Serie 2 wolnostojąca, biała: panel z przyciskami, drzwi z uchwytem, cokół
    const w2 = mat(0xf3f3f1, { roughness: 0.35 });
    rbox(X + 0.5, Y, 0, W - 1, D - 3, H, 1.2, 0.5, w2, it);
    rbox(X + 0.8, Y + D - 3.5, 8, W - 1.6, 3.5, H - 18, 1.2, 0.6, w2, it);
    rbox(X + 0.8, Y + D - 3.5, H - 9.5, W - 1.6, 3.5, 9, 1, 0.5, mat(0xe6e7e6, { roughness: 0.3 }), it);
    for (let k = 0; k < 5; k++) fN(8 + k * 6, H - 6, 3.2, 2, 0.5, mat(0xb9bcbe));
    fN(W - 16, H - 6.5, 10, 3, 0.5, DEV.black);
    fN(W / 2 - 10, H - 13, 20, 2.2, 0.6, DEV.dk);
    box(X + 1.5, Y + D - 6, 0, W - 3, 1, 8, mat(0xd6d7d6), furniture, null, false);
    return;
  }
  if (it.k === "mikrofala") {
    // IKEA TILLREDA: biała obudowa, czarne okno drzwiczek, dwa pokrętła
    rbox(X, Y, Z, W, D, H, 1.5, 0.6, mat(0xf4f4f2, { roughness: 0.35 }), it);
    fN(2, Z + 2.5, W * 0.7, H - 5, 0.6, DEV.black);
    fN(W * 0.7 + 3.5, Z + 1.5, 0.3, H - 3, 0.5, DEV.seam);
    [0.66, 0.3].forEach((q) => { const kn = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.016, 20), mat(0xdedede, { roughness: 0.3 })); kn.rotation.x = Math.PI / 2; kn.position.copy(P(X + W - 6.3, FY + 0.8, Z + H * q)); kn.castShadow = true; furniture.add(kn); });
    return;
  }
  if (it.k === "cmd_monitor") {
    // iiyama 27" dotykowy w pionie na stałym płaskim uchwycie (1,2 cm od ściany): cienka czarna obudowa, ekran z planem zastępstw
    box(X + W / 2 - 7, 0, Z + H / 2 - 7, 14, 1.2, 14, DEV.dk, furniture, null, false);
    rbox(X, Y + 2, Z, W, 3.6, H, 1.2, 0.5, DEV.black, it);
    const scr = canvasTex(360, 600, (g2, w, h) => {
      g2.fillStyle = "#f4f1ea"; g2.fillRect(0, 0, w, h); g2.fillStyle = "#17695f"; g2.fillRect(0, 0, w, 74);
      g2.fillStyle = "#fff"; g2.font = "bold 32px sans-serif"; g2.fillText("Zastępstwa", 20, 48);
      g2.fillStyle = "#3b4648"; g2.font = "20px sans-serif"; g2.fillText("dzisiaj · pokój nauczycielski", 20, 108);
      for (let r = 0; r < 8; r++) { g2.fillStyle = r % 2 ? "#ffffff" : "#e9efe9"; g2.fillRect(14, 128 + r * 52, w - 28, 46); g2.fillStyle = "#17695f"; g2.fillRect(14, 128 + r * 52, 6, 46); g2.fillStyle = "#24302f"; g2.font = "19px sans-serif"; g2.fillText(`${r + 1}. lekcja · sala ${[12, 17, 21, 23, 28, 32, 41, 43][r]}`, 30, 158 + r * 52); }
      g2.fillStyle = "#17695f"; g2.fillRect(14, h - 66, w - 28, 50); g2.fillStyle = "#fff"; g2.font = "bold 20px sans-serif"; g2.fillText("Dyżury  ·  Ogłoszenia  ·  Sale", 30, h - 34);
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry((W - 2.4) * S, (H - 3.4) * S), new THREE.MeshBasicMaterial({ map: scr, toneMapped: false }));
    plane.position.copy(P(X + W / 2, Y + 5.65, Z + H / 2 + 0.5)); furniture.add(plane);
    return;
  }
  if (it.k === "cmd_pc") {
    // komputer SFF na leżąco w dolnej przegrodzie regału EKET
    rbox(X, Y, Z, W, D, H, 1, 0.4, DEV.black, it);
    box(X + 3, Y + D, Z + 2, 8, 0.3, 1.2, DEV.led, furniture, null, false);
    return;
  }
  if (it.k === "regal_druk") {
    // IKEA EKET z 4 otwartymi przegrodami na metalowych nóżkach 10 cm
    const w2 = mat(0xf3f2ee, { roughness: 0.4 }), inner = mat(0xe9e8e3, { roughness: 0.5 }), leg = mat(0xc4c8ca, { metalness: 0.7, roughness: 0.3 });
    [[4, 4], [W - 7, 4], [4, D - 7], [W - 7, D - 7]].forEach(([dx, dy]) => box(X + dx, Y + dy, 0, 3, 3, 10, leg, furniture, null, false));
    const B = 10, T = 1.8;
    box(X, Y, B, W, T, H - B, inner, furniture, it, false);
    box(X, Y, B, T, D, H - B, w2, furniture, it); box(X + W - T, Y, B, T, D, H - B, w2, furniture, it);
    box(X, Y, B, W, D, T, w2, furniture, it); box(X, Y, H - T, W, D, T, w2, furniture, it);
    box(X, Y, B + (H - B) / 2 - T / 2, W, D, T, w2, furniture, it, false);
    box(X + W / 2 - T / 2, Y, B, T, D, H - B, w2, furniture, it, false);
    box(X + W / 2 + 5, Y + 6, B + T, 24, 22, 12, mat(0xffffff, { roughness: 0.6 }), furniture, null, false);
    box(X + W / 2 + 4, Y + 8, B + (H - B) / 2 + T / 2, 26, 20, 4, mat(0x8a9398, { metalness: 0.5, roughness: 0.35 }), furniture, null, false);
    return;
  }
  if (it.k === "tonery") {
    // IKEA TROTTEN szafka z drzwiami przesuwnymi, biała
    const w2 = mat(0xf3f2ee, { roughness: 0.4 });
    [[3, 3], [W - 6, 3], [3, D - 6], [W - 6, D - 6]].forEach(([dx, dy]) => box(X + dx, Y + dy, 0, 3, 3, 3, mat(0xcfcfcb), furniture, null, false));
    rbox(X, Y, 3, W, D - 2, H - 3, 0.8, 0.4, w2, it);
    rbox(X + 1, Y + D - 2, 4, W / 2, 1.2, H - 6, 0.5, 0.3, w2, it);
    rbox(X + W / 2 - 1, Y + D - 0.8, 4, W / 2, 1.2, H - 6, 0.5, 0.3, w2, it);
    box(X + 4, Y + D - 0.85, 20, 1.2, 0.9, H - 40, DEV.seam, furniture, null, false);
    box(X + W - 5.2, Y + D + 0.35, 20, 1.2, 0.9, H - 40, DEV.seam, furniture, null, false);
    return;
  }
  if (it.k === "niszczarka" || it.k === "akcesoria") {
    // niszczarka Fellowes 99Ci: kosz z okienkiem i głowica tnąca
    rbox(X, Y, 0, W, D, 44, 2, 0.8, mat(0x3b3f42, { roughness: 0.45 }), it);
    fN(5, 8, W - 10, 22, 0.4, mat(0x6f7a80, { roughness: 0.2 }));
    rbox(X - 0.5, Y - 0.5, 44, W + 1, D + 1, 14, 2, 1, mat(0x26292b, { roughness: 0.4 }), it);
    box(X + 4, Y + D / 2 - 0.5, 57.8, W - 8, 1, 0.4, DEV.black, furniture, null, false);
    box(X + W - 6, FY + 0.5, 52, 1.2, 0.5, 1.2, DEV.led, furniture, null, false);
    return;
  }
  let color = zc;
  if (it.k === "zmywarka") color = 0xe8eaea;
  if (it.k === "druk_duza" || it.k === "druk_mala" || it.k === "finiszer") color = 0xe7e9ea;
  if (it.k === "cmd_monitor" || it.k === "cmd_pc") color = 0x23292b;
  if (it.k === "laptop") color = 0x8a9398;
  if (it.k === "akcesoria") color = 0x4e5a5f;
  if (it.k === "tonery" || it.k === "podstawa") color = 0xf1f0ec;
  if (it.k === "mikrofala") color = 0xf4f4f2;
  if (it.k === "czajnik") color = 0xaeb5b8;
  if (it.k === "lodowka") color = 0x8f9396;
  if (pal) color = hex(pal.body || pal.col);
  let material = mat(color);
  if (it.k === "scianka" || it.k === "przegroda") material = fabricMat(pal ? hex(pal.col) : 0xcdc3b0);
  if (it.k === "blat") material = woodMat("worktop", false, { roughness: 0.4 });
  if (it.k === "rzutnik") material = mat(0xffffff, { roughness: 1 });
  if (it.kind === "board" && it.k !== "rzutnik" && it.k !== "klucze") material = /^ogl/.test(it.k) ? mat(0xb88a55, { map: TEX.cork }) : mat(0xfafaf8, { roughness: 0.25 });
  if (it.k === "druk_duza" || it.k === "druk_mala" || it.k === "finiszer" || it.k === "lodowka" || it.k === "zmywarka" || it.k === "mikrofala") material = mat(color, it.k === "lodowka" ? { roughness: 0.35, metalness: 0.45 } : { roughness: 0.4 });
  const m = it.k === "blat" ? rbox(it.x, it.y, it.z, it.w, it.d, it.h, 0.8, 0.4, material, it) : (pal && pal.body && !it.z) ? box(it.x, it.y, 8, it.w, it.d - 0.2, it.h - 8, material, furniture, it) : box(it.x, it.y, it.z, it.w, it.d, it.h, material, furniture, it);
  if (it.kind === "board" && it.k !== "rzutnik") {
    // tablica: rama aluminiowa, kartki A4 i A5, kolorowe magnesy; klucze: korek, haczyki i breloki
    const along = it.w > it.d, len = along ? it.w : it.d;
    const south = along && it.y > ROOM.d / 2;
    const put = (u, zz, uw, hh, depth, mm) => along ? box(it.x + u, south ? it.y - depth : it.y + it.d, zz, uw, depth, hh, mm, furniture, null, false) : box(it.x + it.w, it.y + u, zz, depth, uw, hh, mm, furniture, null, false);
    const alu = it.k !== "klucze" ? woodMat("oak", false, { roughness: 0.5 }) : mat(0xc9cdcf, { metalness: 0.7, roughness: 0.3 });
    put(-2.5, it.z - 2.5, len + 5, 3, 2.2, alu); put(-2.5, it.z + it.h - 0.5, len + 5, 3, 2.2, alu);
    put(-2.5, it.z - 2.5, 3, it.h + 5, 2.2, alu); put(len - 0.5, it.z - 2.5, 3, it.h + 5, 2.2, alu);
    if (/^ogl/.test(it.k)) {
      put(0.5, it.z + 0.5, len - 1, it.h - 1, 0.6, mat(0xffffff, { map: TEX.cork, roughness: 0.95 }));
      const papers = [0xffffff, 0xfff3b5, 0xe2edfb, 0xfde0db, 0xe3f2dd], pins = [0xd9473a, 0x3b78d4, 0xe7b031, 0x47a865];
      for (let k = 0; k < Math.floor((len - 6) / 17); k++) for (let r = 0; r < Math.floor((it.h - 6) / 24); r++) {
        if ((k * 3 + r) % 5 === 4) continue;
        const pw = (k + r) % 3 === 0 ? 10.5 : 14.8, ph = (k + r) % 3 === 0 ? 14.8 : 21 * 0.98, zz = it.z + it.h - 4 - ph - r * 24 + (k % 2) * 2;
        if (zz < it.z + 2) continue;
        const u = 4 + k * 17;
        put(u, zz, pw, ph, 1.1, mat(papers[(k + 2 * r) % 5], { roughness: 0.9 }));
        put(u + pw / 2 - 0.9, zz + ph - 2.5, 1.8, 1.8, 2.2, mat(pins[(k + r) % 4], { roughness: 0.3 }));
        for (let ln = 0; ln < 3; ln++) put(u + 2, zz + ph - 6 - ln * 3.5, pw - 4 - (ln % 2) * 3, 0.7, 1.25, mat(0x8d969a));
      }
    } else if (it.k === "klucze") {
      put(1, it.z + 1, len - 2, it.h - 2, 0.6, mat(0xffffff, { map: TEX.cork, roughness: 0.95 }));
      const tags = [0xd9473a, 0x3b78d4, 0xe7b031, 0x47a865, 0x8b57cc, 0xf2f2f2];
      for (let r = 0; r < 3; r++) for (let k = 0; k < 7; k++) {
        const u = 6 + k * 9.5, zz = it.z + it.h - 8 - r * 15.5;
        put(u, zz, 1.4, 1.4, 2.8, steel);
        if ((k * 5 + r * 3) % 7 !== 6) { put(u - 0.4, zz - 5.5, 2.2, 4.5, 1.6, mat(0xc3c7c9, { metalness: 0.9, roughness: 0.2 })); put(u - 1.6, zz - 10, 4.6, 4, 1.2, mat(tags[(k * 3 + r) % 6], { roughness: 0.45 })); }
      }
    } else {
      const papers = [0xfff3b5, 0xe2edfb, 0xffffff, 0xfde0db, 0xe3f2dd, 0xffffff];
      const magnets = [0xd9473a, 0x3b78d4, 0x262626, 0xe7b031, 0x47a865];
      const cols = Math.floor((len - 10) / 25);
      for (let k = 0; k < cols; k++) for (let r = 0; r < 3; r++) {
        if ((k * 7 + r * 3) % 6 === 5) continue;
        const small = (k + 2 * r) % 4 === 0, pw = small ? 14.8 : 21, ph = small ? 10.5 : 29.7;
        const u = 6 + k * 25 + ((k + r) % 2) * 2, zz = it.z + it.h - 6 - ph - r * 32 - ((k * 3) % 4);
        if (zz < it.z + 3) continue;
        put(u, zz, pw, ph, 0.5, mat(papers[(k + 2 * r) % 6], { roughness: 0.9 }));
        put(u + pw / 2 - 1.5, zz + ph - 3, 3, 3, 1.6, mat(magnets[(k + r) % 5], { roughness: 0.35 }));
        if (!small) for (let ln = 0; ln < 4; ln++) put(u + 3, zz + ph - 9 - ln * 4.5, pw - 6 - (ln % 2) * 5, 0.8, 0.65, mat(0x8d969a));
      }
      put(len * 0.15, it.z - 6, len * 0.7, 3, 6, alu);
      [0x2457b8, 0xc8372d, 0x222222].forEach((mc, q) => put(len * 0.2 + q * 10, it.z - 3.5, 8, 1.5, 2.5, mat(mc)));
    }
  }
  if (it.k === "cmd_monitor") {
    const scr = canvasTex(360, 600, (g2, w, h) => {
      g2.fillStyle = "#f4f1ea"; g2.fillRect(0, 0, w, h); g2.fillStyle = "#17695f"; g2.fillRect(0, 0, w, 74);
      g2.fillStyle = "#fff"; g2.font = "bold 32px sans-serif"; g2.fillText("Zastępstwa", 20, 48);
      g2.fillStyle = "#3b4648"; g2.font = "20px sans-serif"; g2.fillText("dzisiaj · pokój nauczycielski", 20, 108);
      for (let r = 0; r < 8; r++) { g2.fillStyle = r % 2 ? "#ffffff" : "#e9efe9"; g2.fillRect(14, 128 + r * 52, w - 28, 46); g2.fillStyle = "#17695f"; g2.fillRect(14, 128 + r * 52, 6, 46); g2.fillStyle = "#24302f"; g2.font = "19px sans-serif"; g2.fillText(`${r + 1}. lekcja · sala ${[12, 17, 21, 23, 28, 32, 41, 43][r]}`, 30, 158 + r * 52); }
      g2.fillStyle = "#17695f"; g2.fillRect(14, h - 66, w - 28, 50); g2.fillStyle = "#fff"; g2.font = "bold 20px sans-serif"; g2.fillText("Dyżury  ·  Ogłoszenia  ·  Sale", 30, h - 34);
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry((it.w - 3) * S, (it.h - 3) * S), new THREE.MeshBasicMaterial({ map: scr, toneMapped: false }));
    plane.position.copy(P(it.x + it.w / 2, it.y + it.d + 0.15, it.z + it.h / 2)); furniture.add(plane);
  }
  if (pal && pal.body) {
    // fronty Havstorp: rama i płycina, czarne uchwyty
    const fr = mat(hex(pal.col), { roughness: 0.55 }), fy = it.y + it.d, base = it.z ? it.z + 0.4 : 9, fh = it.h - (base - it.z) - 0.4;
    if (!it.z) { box(it.x + 0.3, fy - 6.5, 0, it.w - 0.6, 1.4, 8.6, fr, furniture, null, false); [[5, 5], [it.w - 8, 5]].forEach(([dx, dy]) => box(it.x + dx, it.y + dy, 0, 3, 3, 8, mat(0x444444), furniture, null, false)); }
    const drawers = it.k === "an_szuflady" ? [0, 0.33, 0.66] : [0];
    drawers.forEach((q, qi) => {
      const z0 = base + fh * q, hh = fh / drawers.length;
      rbox(it.x + 0.4, fy - 0.2, z0 + 0.2, it.w - 0.8, 1.8, hh - 0.4, 0.4, 0.3, fr, it);
      box(it.x + 7, fy + 1.6, z0 + 6, it.w - 14, 0.6, hh - 12, mat(new THREE.Color(hex(pal.col)).multiplyScalar(0.94).getHex(), { roughness: 0.6 }), furniture, null, false);
      const hz = it.k === "an_wiszaca" ? it.z + 6 : drawers.length > 1 ? z0 + hh - 9 : it.z + it.h - 12;
      rbox(it.x + it.w / 2 - 8, fy + 1.6, hz, 16, 2, 1.4, 0.7, 0.3, blackMetal, null);
    });
  }
  if (it.kind === "lockers" && pal) {
    box(it.x + it.w, it.y + 1, 1, 1, it.d - 2, it.h - 2, woodMat("sonoma", true, { roughness: 0.55 }), furniture, it, false);
    const rows = it.rows || 11;
    for (let cc = 0; cc < 3; cc++) for (let r = 0; r < rows; r++) {
      const yy = it.y + (it.d * (cc + 0.5)) / 3, zz = (it.h * (r + 0.5)) / rows;
      box(it.x + it.w + 1, yy + 5, zz - 1.2, 1.4, 2.4, 2.4, steel, furniture, null, false);
      box(it.x + it.w + 1, yy - 9, zz + 3, 0.4, 7, 2.6, mat(0xf4f1e8), furniture, null, false);
    }
  }
  if (it.kind === "lockers") {
    const pts = [];
    const fx = it.x + it.w + 2.1;
    for (let k = 1; k < 3; k++) { const yy = it.y + (it.d * k) / 3; pts.push(P(fx, yy, 0), P(fx, yy, it.h)); }
    for (let r = 1; r < (it.rows || 11); r++) { const zz = (it.h * r) / (it.rows || 11); pts.push(P(fx, it.y, zz), P(fx, it.y + it.d, zz)); }
    m.parent.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x5a4127 })));
  }
  if (it.k === "scianka") {
    m.position.y += 0.08;
    // górna część ramy: dwustronna biała tablica suchościeralna
    const board = mat(0xfafaf8, { roughness: 0.25 });
    if (it.w >= it.d) [it.y - 0.4, it.y + it.d].forEach((fy) => box(it.x + 3, fy, it.z + 110, it.w - 6, 0.4, it.h - 118, board, furniture, it, false));
    else [it.x - 0.4, it.x + it.w].forEach((fx) => box(fx, it.y + 3, it.z + 110, 0.4, it.d - 6, it.h - 118, board, furniture, it, false));
    const wh = mat(0xf2f2f0, { roughness: 0.35, metalness: 0.2 });
    if (it.w >= it.d) [it.x + 2, it.x + it.w - 6].forEach((fx) => { box(fx, it.y + it.d / 2 - 25, 4, 4, 50, 4, wh, furniture, it); box(fx, it.y + it.d / 2 - 2, 8, 4, 4, it.h - 8, wh, furniture, it, false); });
    else [it.y + 2, it.y + it.d - 6].forEach((fy) => { box(it.x + it.w / 2 - 25, fy, 4, 50, 4, 4, wh, furniture, it); box(it.x + it.w / 2 - 2, fy, 8, 4, 4, it.h - 8, wh, furniture, it, false); });
  }
  if (it.k === "przegroda") { m.position.y += 0.01; [it.x + 8, it.x + 44].forEach((bx) => { box(bx, it.y - 1.5, it.z - 4, 4, it.d + 3, 5, blackMetal, furniture, null, false); }); }
  if (it.k === "an_zlew") { box(it.x + 10, it.y + 12, 89.6, 42, 36, 1, mat(0xb8c0c3, { metalness: 0.6, roughness: 0.3 }), furniture, it, false); const tap = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 0.3, 16), steel); tap.position.copy(P(it.x + 31.5, it.y + 6, 105)); tap.castShadow = true; furniture.add(tap); const sp = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.011, 10, 24, Math.PI), steel); sp.position.copy(P(it.x + 31.5, it.y + 13, 120)); sp.rotation.y = Math.PI / 2; furniture.add(sp); }
  if (it.k === "an_wiszaca") box(it.x, it.y + it.d - 6, it.z - 1, it.w, 5, 1, mat(0xfff3cf, { emissive: 0xffe9b0, emissiveIntensity: 0.9 }), furniture, null, false);

});
// ramki gniazd na ścianach (punkty instalacyjne)
{
  const plate = mat(0xf7f7f5, { roughness: 0.35 }), dot = { p230: 0x3a3a3a, rj: 0x2f5fa0, tel: 0x3f9a5b, hdmi: 0x6a3fa0, ap: 0x2c5fb3 };
  INST.filter((q) => !q.ceil && !q.floor && q.t !== "h2o" && q.t !== "ap").forEach((q) => {
    const w = instWall(q), big = /natynkowe/.test(q.spec), pw = big ? 22 : 8, ph = 8, pd = big ? 4 : 1;
    if (w === "N") { box(q.x - pw / 2, 0, q.z - ph / 2, pw, pd, ph, plate, walls.N, null, false); box(q.x - 1.5, pd, q.z - 1.5, 3, 0.4, 3, mat(dot[q.t]), walls.N, null, false); }
    if (w === "W") { box(0, q.y - pw / 2, q.z - ph / 2, pd, pw, ph, plate, walls.W, null, false); box(pd, q.y - 1.5, q.z - 1.5, 0.4, 3, 3, mat(dot[q.t]), walls.W, null, false); }
  });
}
// rzeczy zawieszone na ścianie z oknami i ścianie przy jadalni chowają się razem z tą ścianą
furniture.children.slice().forEach((m) => { const q = m.position; const k = q.z > 2.86 && q.y > 1.2 ? "S" : q.x > 4.3 && q.y > 1.4 ? "E" : q.z < -2.9 && q.y > 0.95 ? "N" : q.x < -4.45 && q.y > 1.0 ? "W" : null; if (k) walls[k].add(m); });
// ściany przycięte (tryb „Niskie”): bez okien i drzwi powyżej ok. 1 m, z ciemniejszym wierzchem przekroju
const lowWalls = new THREE.Group(); scene.add(lowWalls);
{
  const lw = mat(0xe3d4ba, { map: TEX.plaster, roughness: 0.95 }), cap = mat(0x9c8b70, { roughness: 0.9 }), LH = 105;
  const slab = (x, y, w, d, h) => { const m = box(x, y, 0, w, d, h, lw, lowWalls, null, false); m.castShadow = false; box(x, y, h, w, d, 0.8, cap, lowWalls, null, false); };
  slab(-T, -T, DOOR.x0 + T, T, LH); slab(DOOR.x1, -T, ROOM.w - DOOR.x1 + T, T, LH);
  slab(-T, ROOM.d, ROOM.w + 2 * T, SOUTH_T, SILL - 3);
  slab(-T, 0, T, ROOM.d, LH); slab(ROOM.w, 0, T, ROOM.d, LH);
}

/* orbita */
const target = new THREE.Vector3(0, 0.6, 0);
const sph = { r: 11, theta: 0.75, phi: 0.95 };
const eyeView = (eye, tgt) => {
  const e = P(...eye), t = P(...tgt), d = e.clone().sub(t), r = d.length();
  return { t: [t.x, t.y, t.z], r, theta: Math.atan2(d.x, d.z), phi: Math.acos(d.y / r) };
};
const VIEWS = {
  iso: { t: [0, 0.6, 0], r: 11.5, theta: 0.62, phi: 0.92 },
  door: eyeView([185, 95, 165], [620, 450, 60]),
  window: eyeView([470, 590, 160], [420, 120, 80]),
  boards: eyeView([400, 430, 165], [30, 190, 125]),
  print: eyeView([430, 300, 150], [470, 30, 95]),
  dining: eyeView([410, 315, 150], [900, 315, 175]),
  top: { t: [0, 0, 0], r: 12.5, theta: 0.0001, phi: 0.001 },
};
let anim = null;
function setView(name, instant) {
  const v = VIEWS[name];
  const from = { t: target.clone(), r: sph.r, theta: sph.theta, phi: sph.phi };
  const to = { t: new THREE.Vector3(...v.t), r: v.r, theta: v.theta, phi: v.phi };
  let dt = to.theta - from.theta; while (dt > Math.PI) dt -= 2 * Math.PI; while (dt < -Math.PI) dt += 2 * Math.PI; to.theta = from.theta + dt;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (instant || reduce) { target.copy(to.t); Object.assign(sph, { r: to.r, theta: to.theta, phi: to.phi }); req(); return; }
  const t0 = performance.now(), dur = 700;
  anim = (now) => {
    const k = Math.min(1, (now - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    target.lerpVectors(from.t, to.t, e);
    sph.r = from.r + (to.r - from.r) * e; sph.theta = from.theta + (to.theta - from.theta) * e; sph.phi = from.phi + (to.phi - from.phi) * e;
    if (k >= 1) anim = null;
  };
  req();
}
ROOT.querySelectorAll("[data-cam]").forEach((b) => b.addEventListener("click", () => {
  ROOT.querySelectorAll("[data-cam]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  setView(b.dataset.cam);
}));
let wallMode = "auto";
ROOT.querySelectorAll("[data-walls]").forEach((b) => b.addEventListener("click", () => {
  ROOT.querySelectorAll("[data-walls]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  wallMode = b.dataset.walls; req();
}));

const canvas = renderer.domElement;
const ptrs = new Map(); let lastPinch = null, moved = 0;
canvas.addEventListener("contextmenu", (e) => e.preventDefault());
canvas.addEventListener("pointerdown", (e) => { canvas.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY, b: e.button, shift: e.shiftKey }); moved = 0; anim = null; });
canvas.addEventListener("pointermove", (e) => {
  const p = ptrs.get(e.pointerId); if (!p) return;
  const dx = e.clientX - p.x, dy = e.clientY - p.y; moved += Math.abs(dx) + Math.abs(dy);
  if (ptrs.size === 2) {
    const [a, b] = [...ptrs.values()]; p.x = e.clientX; p.y = e.clientY;
    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    if (lastPinch) sph.r = Math.min(20, Math.max(1.2, sph.r * lastPinch / dist));
    lastPinch = dist; req(); return;
  }
  p.x = e.clientX; p.y = e.clientY;
  if (p.b === 2 || p.shift) {
    const k = sph.r * 0.0016;
    const right = new THREE.Vector3(Math.cos(sph.theta), 0, -Math.sin(sph.theta));
    const fwd = new THREE.Vector3(Math.sin(sph.theta), 0, Math.cos(sph.theta));
    target.addScaledVector(right, -dx * k).addScaledVector(fwd, -dy * k);
    target.x = Math.max(-5, Math.min(5, target.x)); target.z = Math.max(-3.5, Math.min(3.5, target.z));
  } else {
    sph.theta -= dx * 0.006; sph.phi = Math.min(1.52, Math.max(0.001, sph.phi - dy * 0.006));
  }
  req();
});
const endPtr = (e) => {
  const p = ptrs.get(e.pointerId); ptrs.delete(e.pointerId); if (ptrs.size < 2) lastPinch = null;
  if (p && moved < 6 && e.type === "pointerup") pickAt(e);
};
canvas.addEventListener("pointerup", endPtr); canvas.addEventListener("pointercancel", endPtr);
canvas.addEventListener("wheel", (e) => { e.preventDefault(); sph.r = Math.min(20, Math.max(0.6, sph.r * Math.exp(e.deltaY * 0.0012))); req(); }, { passive: false });

const ray = new THREE.Raycaster(); const pickEl = document.getElementById("pick");
let picked = null;
function pickAt(e) {
  const r = canvas.getBoundingClientRect();
  ray.setFromCamera({ x: ((e.clientX - r.left) / r.width) * 2 - 1, y: -((e.clientY - r.top) / r.height) * 2 + 1 }, camera);
  const hit = ray.intersectObjects(pickables, false)[0];
  pickables.forEach((m) => { if (m.material.emissive && m.userData.hl) { m.material = m.userData.hl; m.userData.hl = null; } });
  if (!hit) { pickEl.hidden = true; picked = null; req(); return; }
  const it = hit.object.userData.owner, c = CAT[it.k];
  pickables.filter((m) => m.userData.owner === it).forEach((m) => { m.userData.hl = m.material; m.material = m.material.clone(); m.material.emissive = new THREE.Color(0x17695f); m.material.emissiveIntensity = 0.35; });
  pickEl.textContent = `${c.n}. ${c.name} · ${c.dims}${it.z ? ` · montaż od ${it.z} cm` : ""}`;
  pickEl.hidden = false; req();
}

const camPos = new THREE.Vector3();
function updateCamera() {
  camPos.set(target.x + sph.r * Math.sin(sph.phi) * Math.sin(sph.theta), target.y + sph.r * Math.cos(sph.phi), target.z + sph.r * Math.sin(sph.phi) * Math.cos(sph.theta));
  camera.position.copy(camPos);
  camera.up.set(0, 1, 0);
  if (sph.phi < 0.01) camera.up.set(-Math.sin(sph.theta), 0, -Math.cos(sph.theta));
  camera.lookAt(target);
  const inside = Math.abs(camPos.x) < 4.5 && Math.abs(camPos.z) < 3 && camPos.y < 4.5;
  const normals = { N: [0, -1], S: [0, 1], W: [-1, 0], E: [1, 0] };
  for (const [k, n] of Object.entries(normals)) {
    // ściana znika, gdy kamera jest za nią, w jej grubości albo tuż przy niej (25 cm), żeby nigdy nie zasłaniała widoku
    const out = camPos.x * n[0] + camPos.z * n[1] > (n[0] ? 4.5 : 3) - 0.25;
    const fade = out;
    wallMat[k].opacity = fade ? 0.1 : 1;
    wallMat[k].depthWrite = !fade;
    walls[k].visible = wallMode === "auto";
    walls[k].children.forEach((m) => { if (m.material !== wallMat[k]) m.visible = !fade; });
  }
  leaf.visible = wallMode === "auto";
  ceiling.visible = inside && wallMode === "auto";
  lowWalls.visible = wallMode === "low";
}
let needs = true;
function req() { needs = true; }
function resize() {
  const w = host.clientWidth, h = host.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix(); req();
}
function bg() {
  const v = getComputedStyle(host).getPropertyValue("--floor").trim() || "#f3efe6";
  scene.background = new THREE.Color(v).convertSRGBToLinear(); req();
}
new ResizeObserver(resize).observe(host);
bg(); setView("iso", true); resize();
function loop(now) {
  if (anim) { anim(now); needs = true; }
  if (needs) { updateCamera(); renderer.render(scene, camera); needs = false; }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();
