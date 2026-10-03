// Konwencje opisu:
// - zadania, decyzje i uwagi zaczynają się wielką literą i nie kończą kropką;
// - zadania zapisujemy bezokolicznikiem ("Sprawdzić…", "Zamontować…"); zadanie zrobione zapisujemy
//   jako done("Sprawdzić…"), czyli odhaczone i przekreślone na karcie sali;
// - sprzęt zapisujemy jako "Nazwa (cecha, cecha)";
// - przeznaczenie sali to krótki rzeczownik ("Gabinet matematyki"), bez ukośników.

export const dataUpdatedAt = "03.10.2026";

export const defaultRoomId = "2";

// Sprzęt otrzymany w ramach KPO (stan ogólny, bez podziału na sale).
export const kpoDelivery = [
  { name: "Laptopy", qty: 160 },
  { name: "Laptopy przeglądarkowe (Chromebooki)", qty: 46 },
  { name: "Tablety (iPad)", qty: 96 },
];

export const statusLabels = {
  check: "Do sprawdzenia",
  missing: "Braki",
  decision: "Do decyzji",
  todo: "Do zrobienia",
  ready: "Bez zmian",
};

export const floors = [
  { id: "Piwnica", label: "Piwnica", short: "Piwnica", building: "Budynek główny" },
  { id: "Parter", label: "Parter", short: "Parter", building: "Budynek główny" },
  { id: "I piętro", label: "I piętro", short: "I piętro", building: "Budynek główny" },
  { id: "II piętro", label: "II piętro", short: "II piętro", building: "Budynek główny" },
  { id: "III piętro", label: "III piętro", short: "III piętro", building: "Budynek główny" },
  { id: "Pracownie zewnętrzne", label: "Pracownie zewnętrzne", short: "Zewnętrzne", building: "" },
];

export const standardControlTasks = [
  "Sprawdzić stabilne podłączenie komputera do rzutnika, telewizora lub monitora multimedialnego",
  "Sprawdzić, czy przewody są zamocowane na stałe i nie wiszą luźno",
  "Sprawdzić, czy przewody nie są narażone na szarpanie, które mogłoby wyłamać złącza",
  "Uruchomić zestaw i sprawdzić, czy obraz wyświetla się poprawnie",
];

// Nazwy grup wyposażenia (jedno słownictwo w całej kartotece).
const G = {
  computers: "Komputery",
  media: "Sprzęt multimedialny",
  tablets: "Tablety",
  printers: "Drukarki",
  furniture: "Meble i wyposażenie",
  network: "Sieć i zasilanie",
  planned: "Docelowo",
  purchase: "Do zakupu",
};

const OTHERS = "Inni nauczyciele (zajęcia przechodnie)";

const groupOrder = Object.values(G);

const room = ({
  id,
  name,
  floor,
  short = "",
  place = "",
  purpose = "",
  teachers = [],
  status = "check",
  equipment = [],
  urgentTasks = [],
  tasks = [],
  decisions = [],
  notes = [],
}) => {
  const purchases = withPurchases(id, equipment, urgentTasks);
  return {
    id,
    name,
    floor,
    short,
    place,
    purpose,
    teachers,
    status,
    equipment: [...purchases.equipment].sort((a, b) => groupOrder.indexOf(a.name) - groupOrder.indexOf(b.name)),
    urgentTasks: purchases.urgentTasks.map(toTask),
    tasks: tasks.map(toTask),
    decisions,
    notes,
  };
};

const group = (name, items) => ({ name, items });

// Zadanie zrobione (odhaczone); zwykły napis to zadanie do zrobienia.
const done = (text) => ({ text, done: true });
const toTask = (task) => (typeof task === "string" ? { text: task, done: false } : task);

// Lista zakupów to jedno źródło dla zakładki "Do zakupu" i dla kart sal:
// - tier: "main" (sprzęt) albo "accessories" (zakupy towarzyszące, czyli co ewentualnie trzeba dokupić);
// - ten sam produkt w kilku salach to jedna pozycja z kilkoma salami w roomIds i łączną ilością qty;
// - roomIds: sale, do których trafi sprzęt (puste = miejsce do ustalenia lub opis w place);
// - place: opis miejsca poza salą ({ text, roomId } – sala odniesienia), bez dopisywania do karty sali;
// - priorityRoomIds: sale kupowane najpierw (podzbiór roomIds);
// - offers: przykładowe oferty ze sklepów (label, shop, url, checkedAt) z listą prices ({ amount w zł,
//   vat: "netto" lub "brutto" }) i polem zeroVat: true (VAT 0% pewny), false (niemożliwy), "unknown" (do
//   potwierdzenia) lub brak pola (nie wiadomo). Kalkulator liczy cenę netto tylko przy zeroVat: true,
//   w pozostałych przypadkach cenę brutto; pozycje bez oferty nie wchodzą do sumy;
// - karta sali dostaje wpis w grupie "Do zakupu", a sala priorytetowa także pilny zakup.
export const purchaseTiers = [
  { id: "main", label: "Sprzęt", hint: "Sprzęt, który dobrze byłoby kupić" },
  { id: "accessories", label: "Zakupy towarzyszące", hint: "Co ewentualnie trzeba dokupić do sprzętu" },
];

export const purchaseItems = [
  {
    id: "interactive-75",
    tier: "main",
    name: "Monitor interaktywny",
    specs: ["75 cali"],
    qty: 8,
    roomIds: ["2", "18", "23", "29", "30", "32", "33", "41"],
    priorityRoomIds: ["2", "18", "41"],
    offers: [
      {
        label: "iiyama ProLite TE7515A-B2AG",
        shop: "iiyama-sklep.pl",
        url: "https://iiyama-sklep.pl/1866-tablice-interaktywne-monitor-interaktywny-iiyama-75-te7515a-b2ag-4k-uhd-google-edla-iishare-dms-wifi-6e-usb-c-hdmi-dp-nfc-4948570127498.html",
        prices: [{ amount: 7245.53, vat: "netto" }],
        zeroVat: true,
        checkedAt: "03.10.2026",
      },
    ],
  },
  {
    id: "tv-85",
    tier: "main",
    name: "Telewizor",
    specs: ["4K", "85–86 cali"],
    qty: 2,
    roomIds: ["37", "38"],
    note: "Do sali 38 ma być wersja 86 cali; w kalkulatorze liczone po cenie modelu 85E7Q",
    offers: [
      {
        label: "Hisense 85E7Q",
        shop: "euro.com.pl",
        url: "https://www.euro.com.pl/telewizory-led-lcd-plazmowe/hisense-telewizor-85e7q.bhtml",
        prices: [{ amount: 2999, vat: "brutto" }],
        zeroVat: false,
        checkedAt: "03.10.2026",
      },
    ],
  },
  {
    id: "aio-touch",
    tier: "main",
    name: "Monitor dotykowy",
    specs: ["27 cali", "IPS"],
    qty: 1,
    roomIds: ["16"],
    priorityRoomIds: ["16"],
    note: "Do komputera do zastępstw w pokoju nauczycielskim",
    offers: [
      {
        label: "iiyama ProLite T2755MSC-B1",
        shop: "iiyama-sklep.pl",
        url: "https://iiyama-sklep.pl/1182-monitory-dotykowe-biurkowe-monitor-dotykowy-iiyama-prolite-t2755msc-b1-27-ips-led-hdmi-displayport-glosniki-powloka-nano-4948570122974.html",
        prices: [
          { amount: 1840, vat: "brutto" },
          { amount: 1495.93, vat: "netto" },
        ],
        zeroVat: "unknown",
        checkedAt: "03.10.2026",
      },
    ],
  },
  {
    id: "aio-plain",
    tier: "main",
    name: "Komputer all-in-one",
    specs: ["bez ekranu dotykowego"],
    qty: 1,
    roomIds: ["37"],
    offers: [
      {
        label: "Lenovo IdeaCentre AIO 27 (Ultra 5 226V, 16 GB, 512 GB)",
        shop: "x-kom.pl",
        url: "https://www.x-kom.pl/p/1521521-all-in-one-lenovo-ideacentre-aio-27-ultra-5-226v-16gb-512-win11px-czarny.html",
        prices: [{ amount: 4049, vat: "brutto" }],
        checkedAt: "03.10.2026",
      },
    ],
  },
  {
    id: "tv-40",
    tier: "main",
    name: "Monitor wielkoformatowy",
    specs: ["43 cale", "4K", "praca 24/7"],
    qty: 1,
    roomIds: [],
    place: { text: "Obok pokoju nauczycielskiego", roomId: "16" },
    note: "Do wyświetlania zastępstw",
    offers: [
      {
        label: "iiyama ProLite LH4341UHS-B2",
        shop: "iiyama-sklep.pl",
        url: "https://iiyama-sklep.pl/1208-monitory-wielkoformatowe-monitor-iiyama-prolite-lh4341uhs-b2-43-ips-led-4k-247-digital-signage-1xvga-3xhdmi-glosniki-4948570123520.html",
        prices: [
          { amount: 2058, vat: "brutto" },
          { amount: 1673.17, vat: "netto" },
        ],
        zeroVat: "unknown",
        checkedAt: "03.10.2026",
      },
    ],
  },
  {
    id: "signage-55",
    tier: "main",
    name: "Monitor prezentacyjny",
    specs: ["55 cali", "4K", "praca 24/7"],
    qty: 1,
    roomIds: [],
    place: { text: "Naprzeciwko portierni" },
    note: "Tablica ogłoszeń",
    offers: [
      {
        label: "iiyama LH5564UHS-B1AG",
        shop: "iiyama-sklep.pl",
        url: "https://iiyama-sklep.pl/1616-monitory-wielkoformatowe-monitor-prezentacyjny-55-iiyama-ds-lh5564uhs-b1ag-4k-va-led-usb-c-iisignage-cms-iicontrol-dms-iishare-247-4948570125319.html",
        prices: [
          { amount: 3612, vat: "brutto" },
          { amount: 2936.59, vat: "netto" },
        ],
        zeroVat: "unknown",
        checkedAt: "03.10.2026",
      },
    ],
  },
  {
    id: "monitor-office-1",
    tier: "main",
    name: "Monitor biurowy",
    specs: ["34 cale", "5120 × 2160 (WUHD)"],
    qty: 1,
    roomIds: [],
    offers: [
      {
        label: "Philips 5000 Series 34B2U5900C/00",
        shop: "supertech.pl",
        url: "https://supertech.pl/produkt/philips_5000_series_34b2u5900c_00_monitor_komputerowy_864_cm_34_5120_x_2160_px_wuhd_lcd_szary_139614289.html",
        prices: [
          { amount: 2510.99, vat: "brutto" },
          { amount: 2041.46, vat: "netto" },
        ],
        zeroVat: true,
        checkedAt: "03.10.2026",
      },
    ],
  },
  {
    id: "ipad-cabinet",
    tier: "main",
    name: "Szafa do ładowania iPadów",
    specs: ["na 26–30 iPadów"],
    qty: 1,
    roomIds: ["5"],
    note: "Do wstawienia w sali 5. Ewentualnie można przynieść szafę na laptopy z III piętra i trzymać w niej iPady",
  },
  {
    id: "desks-37",
    tier: "main",
    name: "Biurko",
    specs: ["pod stanowiska komputerowe"],
    qty: 6,
    roomIds: ["37"],
    note: "Do dostawienia 6 kolejnych stanowisk z komputerów UNICEF Dell",
  },
  {
    id: "hdmi-20m",
    tier: "accessories",
    name: "Kabel HDMI światłowodowy",
    specs: ["25 m"],
    qty: 10,
    roomIds: ["2", "18", "23", "29", "30", "32", "33", "41", "37", "38"],
    note: "Do każdego monitora interaktywnego i każdego telewizora. Standard: Unitek 25 m, optyczny (AOC), HDMI 2.0, 4K 60 Hz (wg opisów w sklepach)",
    offers: [
      {
        label: "Unitek kabel HDMI 25 m",
        shop: "mediaexpert.pl",
        url: "https://www.mediaexpert.pl/telewizory-i-rtv/kable-telewizyjne-i-audio/przewody-audio-video/kabel-hdmi-hdmi-unitek-25-m",
        prices: [{ amount: 189.99, vat: "brutto" }],
        checkedAt: "03.10.2026",
      },
    ],
  },
  {
    id: "vesa-interactive",
    tier: "accessories",
    name: "Stojak do monitora interaktywnego",
    specs: ["na kółkach", "VESA 800 × 400"],
    qty: 8,
    roomIds: ["2", "18", "23", "29", "30", "32", "33", "41"],
    priorityRoomIds: ["2", "18", "41"],
    note: "Mobilny stojak na kółkach, nie uchwyt ścienny. Monitor iiyama TE7515A-B2AG: VESA 800 × 400, waga 54,6 kg, 75 cali. Stojak ART SD-22: do VESA 800 × 400, 45–90 cali i 60 kg, więc pasuje (zapas ok. 5 kg). Standard potwierdzić w instrukcji",
    offers: [
      {
        label: "ART SD-22",
        shop: "mediaexpert.pl",
        url: "https://www.mediaexpert.pl/telewizory-i-rtv/uchwyty-do-tv/uchwyty/stojak-podlogowy-art-do-tv-45-90-cali-sd-22",
        prices: [{ amount: 368.15, vat: "brutto" }],
        checkedAt: "03.10.2026",
      },
    ],
  },
  {
    id: "vesa-tv",
    tier: "accessories",
    name: "Uchwyt VESA do telewizora",
    specs: ["VESA 600 × 400"],
    qty: 2,
    roomIds: ["37", "38"],
    note: "Telewizor Hisense 85E7Q: VESA 600 × 400, waga 36 kg z podstawą. Uchwyt Goldenline obsługuje VESA do 600 × 400 i 60 kg, więc pasuje. Standard potwierdzić w instrukcji",
    offers: [
      {
        label: "Goldenline TM3770FMS",
        shop: "mediaexpert.pl",
        url: "https://www.mediaexpert.pl/telewizory-i-rtv/uchwyty-do-tv/uchwyty/uchwyt-goldenline-do-tv-37-90-cali-tm3770fms-czarny",
        prices: [{ amount: 299.97, vat: "brutto" }],
        checkedAt: "03.10.2026",
      },
    ],
  },
];

export const purchaseLabel = ({ name, specs = [] }) => (specs.length ? `${name} (${specs.join(", ")})` : name);

const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);

// Dokleja zakupy sali do jej wyposażenia i pilnych zakupów.
const withPurchases = (id, equipment, urgentTasks) => {
  const items = purchaseItems.filter((item) => item.roomIds.includes(id));
  if (!items.length) return { equipment, urgentTasks };

  const labels = items.map(purchaseLabel);
  const existing = equipment.find((entry) => entry.name === G.purchase);
  const merged = existing
    ? equipment.map((entry) => (entry === existing ? group(G.purchase, [...entry.items, ...labels]) : entry))
    : [...equipment, group(G.purchase, labels)];

  const urgent = items
    .filter((item) => item.priorityRoomIds?.includes(id))
    .map((item) => `Kupić ${lowerFirst(purchaseLabel(item))}`);

  return { equipment: merged, urgentTasks: [...urgentTasks, ...urgent] };
};

export const rooms = [
  // Piwnica
  room({
    id: "04",
    name: "Sala 04",
    floor: "Piwnica",
    purpose: "Pokój nauczycielski WF-istów",
    status: "check",
    tasks: [
      done("Zabrać monitor z sali 04"),
      done("Kupić nóżki do monitora (ewentualnie)"),
      done("Przenieść monitor na wejście do szkoły jako monitor multimedialny dla uczniów"),
      "Zweryfikować, czy działa drukarka",
      "Sprawdzić, jakie są tam komputery",
      "Sprawdzić, czy komputery działają dla WF-istów",
    ],
    notes: ["Monitor przy wejściu ma służyć m.in. do wyszukiwania planu lekcji"],
  }),

  // Parter
  room({
    id: "2",
    name: "Sala 2",
    floor: "Parter",
    purpose: "Gabinet przedmiotów zawodowych fryzjerskich",
    teachers: ["Sylwia Mikołajczak", "Iwona Leńczowska", "Paweł Danielewski"],
    status: "missing",
    equipment: [
      group(G.computers, ["Komputer nowy (laptop KPO)"]),
      group(G.media, ["Rzutnik (nowy)"]),
    ],
    tasks: [
      done("Zamontować nowy rzutnik"),
      done("Sprawdzić podłączenie komputera do rzutnika"),
      done("Sprawdzić, czy obraz wyświetla się poprawnie"),
    ],
  }),
  room({
    id: "3",
    name: "Sala 3",
    floor: "Parter",
    purpose: "Przedmioty zawodowe fryzjerskie",
    teachers: ["Agnieszka Jastrzębska", "Paweł Danielewski", "Iwona Leńczowska", "Edyta Jaworska"],
    status: "ready",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Telewizor multimedialny (75 cali, na kółkach)"]),
    ],
    tasks: [
      done("Zapewnić stałe podłączenie komputera do telewizora"),
      done("Zamocować kabel tak, żeby nie wisiał luźno"),
    ],
  }),
  room({
    id: "4",
    name: "Sala 4",
    floor: "Parter",
    purpose: "Fryzjerstwo i edukacja obywatelska",
    teachers: ["Marcin Kruk", "Marcin Kopij"],
    status: "ready",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Telewizor dotykowy (65 cali, na ścianie)"]),
    ],
    tasks: [
      done("Sprawdzić stałe podłączenie do telewizora dotykowego"),
      done("Sprawdzić, czy telewizor dotykowy działa prawidłowo"),
    ],
  }),
  room({
    id: "5",
    name: "Sala 5",
    floor: "Parter",
    purpose: "Przedmioty zawodowe fryzjerskie i inne przedmioty",
    teachers: [
      "Beata Krzymińska",
      "Wojciech Biczysko",
      "Łukasz Wojciechowski",
      "Inni nauczyciele (pojedyncze godziny)",
    ],
    status: "missing",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.furniture, ["Fotel barberski"]),
      group(G.media, ["Telewizor dotykowy Samsung (75 cali)"]),
      group(G.printers, ["Drukarka wielofunkcyjna A3"]),
      group(G.planned, [
        "Wszystkie starsze iPady Air kupione pod tę salę",
        "Rysiki do iPadów (dostępne)",
        "Szafa zamykana na klucz, z zasilaniem do ładowania iPadów",
      ]),
    ],
    tasks: [
      done("Sprawdzić telewizor dotykowy Samsung 75 cali"),
      done("Sprawdzić drukarkę wielofunkcyjną A3 (sprawdzić, czy na pewno jest w sali, czy znajduje się aktualnie u Arka Mocarskiego)"),
      "Dostarczyć wszystkie starsze iPady Air kupione pod tę salę",
      "Zebrać iPady Air razem z dostępnymi rysikami",
      "Przygotować iPady Air do pracy",
      "Zalogować iPady i ustawić uniwersalny PIN",
      "Zostawić iPady w sali razem z rysikami",
      "Przygotować szafę zamykaną na klucz",
      "Zapewnić w szafie listwy zasilające, żeby tablety mogły się ładować na co dzień",
      "Wstawić do sali szafę na iPady",
    ],
    notes: ["Ewentualnie można przynieść do sali szafę na laptopy z III piętra i trzymać w niej iPady"],
  }),
  room({
    id: "05-new",
    name: "Sala 05 (nowa)",
    floor: "Parter",
    place: "Nowa sala wybudowana w szatni",
    purpose: "Sala językowa",
    teachers: ["Aleksandra Karczmarz", "Anna Galert"],
    status: "check",
    equipment: [
      group(G.computers, ["Laptop KPO (1 szt.)"]),
      group(G.media, ["Telewizor multimedialny (na kółkach)"]),
      group(G.furniture, [
        "Ławki",
        "Pełne wyposażenie sali lekcyjnej",
        "Biała tablica (do potwierdzenia)",
      ]),
    ],
    urgentTasks: [
      done("Kupić telewizor multimedialny na ścianę"),
      done("Kupić ławki"),
      done("Skompletować całe wyposażenie sali lekcyjnej"),
    ],
  }),
  room({
    id: "6",
    name: "Sala 6",
    floor: "Parter",
    purpose: "Praktyczna pracownia fryzjerska (razem z salą 7)",
    status: "ready",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Rzutnik (podwieszony pod sufitem)"]),
    ],
    tasks: [done("Sprawdzić podłączenie komputera do rzutnika")],
    notes: ["Sala 7 jest częścią tej pracowni i nie ma osobnego wpisu"],
  }),
  room({
    id: "8",
    name: "Sala 8",
    floor: "Parter",
    purpose: "Gabinet",
    equipment: [
      group(G.computers, ["Komputer (do potwierdzenia, czy laptop KPO)"]),
      group(G.media, ["Rzutnik (zamontowany)"]),
    ],
    tasks: [
      "Sprawdzić podłączenie komputera do rzutnika",
      "Sprawdzić, czy zestaw działa",
    ],
    decisions: ["Na razie zostawić obecny układ"],
  }),

  // I piętro
  room({
    id: "16",
    name: "Sala 16",
    floor: "I piętro",
    purpose: "Pokój nauczycielski",
    status: "missing",
    urgentTasks: [
      "Kupić drukarkę sieciową (dostępną przez internet)",
      "Podłączyć drukarki przez sieć do 4 lub 5 laptopów w sali",
    ],
    tasks: [
      "Zapewnić 4 sprawne stanowiska komputerowe, każde z dostępem do internetu",
      "Wstawić 4 laptopy KPO przygotowane do pracy nauczycieli, uruchamiane zawsze w trybie incognito (to jest możliwe; przygotowanie: Maciej Najwer)",
      "Sprawdzić, czy drukarki działają",
      "Zdiagnozować usterki drukarek, jeśli nie działają",
      "Zapewnić co najmniej jedną sprawną i szybką drukarkę",
    ],
    decisions: ["Jeśli obecne drukarki nie wystarczą, kupić sprawne urządzenie wielofunkcyjne"],
  }),
  room({
    id: "17",
    name: "Sala 17",
    floor: "I piętro",
    purpose: "Matematyka, język niemiecki i inne przedmioty według planu",
    teachers: ["Marzena Filusz", "Małgorzata Fiodorow", OTHERS],
    status: "missing",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Monitor multimedialny (75 cali, na kółkach)"]),
      group(G.tablets, ["28 tabletów KPO", "Szafka z zasilaniem do ładowania tabletów"]),
    ],
    tasks: [
      "Dostarczyć 28 tabletów KPO",
      done("Wstawić zamek do jednej ze starych szafek, żeby można ją było zamknąć na klucz"),
      done("Zapewnić w szafce zasilanie do ładowania tabletów – kupiony zasilacz"),
      "Sprawdzić Wi-Fi i internet na tabletach",
    ],
  }),
  room({
    id: "18",
    name: "Sala 18",
    floor: "I piętro",
    purpose: "Język polski i inne przedmioty według planu",
    teachers: [
      "Bożena Piątek-Pawłowska",
      "Magdalena Zaleska (ewentualnie)",
      "Waldemar Kaczorowski (ewentualnie)",
      "Marcin Kopij (ewentualnie)",
    ],
    status: "missing",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Rzutnik (nowy)"]),
    ],
    tasks: [
      done("Zamontować nowy rzutnik"),
      done("Zapewnić stabilne połączenie rzutnika z komputerem"),
      done("Sprawdzić, czy zestaw działa"),
    ],
  }),
  room({
    id: "19",
    name: "Sala 19",
    floor: "I piętro",
    purpose: "Zajęcia Magdaleny Zaleskiej i Waldemara Kaczorowskiego",
    teachers: ["Magdalena Zaleska", "Waldemar Kaczorowski", "Marcin Kopij"],
    status: "ready",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Monitor interaktywny (75 cali, z pracowni AI)"]),
    ],
    tasks: [
      done("Przenieść monitor multimedialny z pracowni AI spod sali 36"),
      done("Zamontować monitor"),
      done("Sprawdzić, czy monitor ma nóżki"),
      done("Podłączyć monitor do komputera"),
    ],
    notes: ["Sala 18 może być salą awaryjną dla tych zajęć"],
  }),
  room({
    id: "21",
    name: "Sala 21",
    floor: "I piętro",
    purpose: "Biblioteka i czytelnia ze stanowiskami komputerowymi dla uczniów",
    status: "todo",
    equipment: [
      group(G.network, ["Internet na stanowiskach", "Uporządkowane i zabezpieczone przewody"]),
    ],
    tasks: [
      "Przygotować 4 stanowiska komputerowe w czytelni dla uczniów",
      "Podłączyć stanowiska do internetu",
      "Uporządkować i zabezpieczyć przewody przy stanowiskach",
    ],
  }),
  room({
    id: "22",
    name: "Sala 22",
    floor: "I piętro",
    purpose: "Język polski i inne przedmioty według planu",
    teachers: ["Magdalena Ulanowska", OTHERS],
    status: "ready",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Monitor multimedialny BenQ (75 cali)"]),
    ],
    tasks: [
      done("Sprawdzić podłączenie komputera do monitora BenQ"),
      done("Sprawdzić, czy monitor 75 cali działa"),
    ],
    decisions: ["Na razie zostawić obecny układ"],
  }),
  room({
    id: "23",
    name: "Sala 23",
    floor: "I piętro",
    purpose: "Przedmioty zawodowe",
    teachers: ["Eleonora Smirnow-Zechman", "Inni nauczyciele (według planu)"],
    status: "todo",
    equipment: [
      group(G.computers, ["30 laptopów (do przygotowania)", "Laptop KPO dla nauczyciela"]),
      group(G.furniture, ["Szafa na laptopy (kupiona we wrześniu 2026, jedna z trzech kupionych szaf na 30 laptopów)"]),
      group(G.media, ["Rzutnik krótkoogniskowy (nowy, zostaje)"]),
    ],
    tasks: [
      "Wstawić tylko 30 laptopów (konfiguracja do używania zawsze w trybie incognito, przygotowanie: Maciej Najwer)",
      "Wykorzystać szafę na laptopy kupioną we wrześniu 2026",
      done("Sprawdzić, czy nowy rzutnik krótkoogniskowy działa prawidłowo"),
    ],
    decisions: ["Nowy rzutnik krótkoogniskowy zostaje w sali"],
  }),

  // II piętro
  room({
    id: "26",
    name: "Sala 26",
    floor: "II piętro",
    purpose: "Gabinet przyrodniczy",
    teachers: ["Barbara Małecka", "Karolina Sałdyka", "Anna Mucha", "Agnieszka Hudziec"],
    status: "ready",
    equipment: [
      group(G.computers, ["Laptop KPO (jeżeli działa)"]),
      group(G.media, ["Telewizor (75 cali, na ścianie)"]),
    ],
    tasks: [
      done("Sprawdzić podłączenie komputera do telewizora"),
      done("Zapewnić stabilne połączenie komputera z telewizorem"),
    ],
    decisions: ["Zostawić wyposażenie bez zmian"],
  }),
  room({
    id: "27",
    name: "Sala 27",
    floor: "II piętro",
    purpose: "Gabinet przyrodniczy (drugi)",
    teachers: ["Barbara Małecka", "Karolina Sałdyka", "Anna Mucha", "Agnieszka Hudziec"],
    status: "todo",
    equipment: [
      group(G.computers, ["Laptop KPO (działa)"]),
      group(G.planned, [
        "Monitor interaktywny (75 cali, kupiony we wrześniu 2026)",
        "Stojak do monitora (kupiony)",
      ]),
    ],
    tasks: [
      "Wstawić do sali monitor interaktywny 75 cali kupiony we wrześniu 2026",
      "Wstawić do sali kupiony stojak do monitora",
    ],
  }),
  room({
    id: "28",
    name: "Sala 28",
    floor: "II piętro",
    purpose: "Gabinet przyrodniczy",
    teachers: ["Barbara Małecka", "Karolina Sałdyka", "Anna Mucha", "Agnieszka Hudziec"],
    status: "ready",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Tablica interaktywna (75 cali)"]),
    ],
    tasks: [done("Sprawdzić podłączenie komputera do tablicy interaktywnej")],
  }),
  room({
    id: "29",
    name: "Sala 29",
    floor: "II piętro",
    purpose: "Gabinet matematyki",
    teachers: ["Iwona Bujanowska", "Ewa Ostrowska"],
    status: "missing",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Rzutnik (działa)"]),
    ],
    tasks: [
      done("Wstawić laptop KPO"),
      "Sprawdzić stabilne połączenie rzutnika z komputerem",
      "Sprawdzić, czy zestaw działa",
    ],
  }),
  room({
    id: "30",
    name: "Sala 30",
    floor: "II piętro",
    purpose: "Język polski i inne przedmioty według planu",
    teachers: ["Anna Filipek", OTHERS],
    status: "todo",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Rzutnik"]),
    ],
    tasks: [
      "Przenieść telewizor 65 cali spod sali 36 do sali 30",
      "Zamontować telewizor wysoko nad tablicą",
      "Sprawdzić podłączenie komputera do telewizora",
    ],
    decisions: ["Rzutnik zostaje w sali"],
  }),
  room({
    id: "31",
    name: "Sala 31",
    floor: "II piętro",
    purpose: "Gabinet przyrodniczy, geografia i inne przedmioty przyrodnicze",
    teachers: ["Alicja Smereka", OTHERS],
    status: "ready",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Rzutnik", "Monitor z KPO (nowy, na kółkach)"]),
    ],
    tasks: [
      done("Wstawić nowy monitor z KPO na kółkach"),
      done("Podłączyć rzutnik do laptopa KPO"),
      done("Sprawdzić podłączenie komputera do monitora z KPO"),
      done("Sprawdzić, czy zestaw działa"),
    ],
  }),
  room({
    id: "32",
    name: "Sala 32",
    floor: "II piętro",
    purpose: "Język angielski",
    teachers: [
      "Małgorzata Biezmienow",
      "Aleksandra Karczmarz (ewentualnie)",
      "Anna Galert (ewentualnie)",
    ],
    status: "missing",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Rzutnik (działa)"]),
    ],
    tasks: [
      done("Podłączyć rzutnik do komputera"),
      done("Sprawdzić, czy zestaw działa"),
    ],
  }),
  room({
    id: "33",
    name: "Sala 33",
    floor: "II piętro",
    purpose: "Język polski i inne przedmioty według planu",
    teachers: ["Ewelina Krycia", OTHERS],
    status: "missing",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Telewizor (nowy)"]),
    ],
    tasks: [
      done("Zapewnić stabilne podłączenie komputera do nowego telewizora"),
      done("Sprawdzić, czy obraz i system się nie zawieszają"),
    ],
  }),
  room({
    id: "34",
    name: "Sala 34",
    floor: "II piętro",
    purpose: "Przedmioty zawodowe i administracyjne według planu",
    teachers: ["Magdalena Nowak", "Arkadiusz Mocarski", "Małgorzata Kończyńska"],
    status: "ready",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Monitor interaktywny (75 cali)"]),
    ],
    tasks: [done("Podłączyć laptop KPO do monitora interaktywnego")],
  }),

  // III piętro
  room({
    id: "37",
    name: "Sala 37",
    floor: "III piętro",
    purpose: "Pracownia informatyczna, przedmioty zawodowe",
    teachers: ["Maciej Najwer", "Bożena Czukiewska", "Agnieszka Skarupa", "Anna Kosin"],
    status: "missing",
    equipment: [
      group(G.furniture, ["24 ławki / stanowiska dla uczniów (według osobnego szkicu)"]),
      group(G.computers, ["18 stanowisk komputerów UNICEF Dell (stanowisko 15 do wymiany)"]),
      group(G.network, ["Internet kablowy na wszystkich stanowiskach"]),
      group(G.printers, ["Drukarka A4 (najlepiej z duplexem)"]),
    ],
    tasks: [
      "Dokupić biurka i dostawić 6 kolejnych stanowisk z komputerami UNICEF Dell",
      "Wymienić komputer na stanowisku 15",
      "Przygotować stanowisko nauczyciela (komputer all-in-one)",
      "Zapewnić internet kablowy na wszystkich stanowiskach",
      "Dodać drukarkę A4, najlepiej z duplexem",
    ],
  }),
  room({
    id: "38",
    name: "Sala 38",
    floor: "III piętro",
    purpose: "Pracownia informatyczna, przedmioty zawodowe",
    teachers: ["Paweł Młynarczyk", "Magdalena Taszycka"],
    status: "missing",
    equipment: [
      group(G.furniture, ["Układ w kształcie litery U", "6 luźnych ławek na środku"]),
      group(G.computers, [
        "Laptopy z pracowni AI",
        "24 stanowiska dla uczniów",
        "Stanowisko nauczyciela (nowy komputer, zostaje)",
      ]),
      group(G.network, ["Internet kablowy dla laptopów"]),
    ],
    tasks: [
      done("Przenieść laptopy z pracowni AI do sali 38"),
      done("Zapewnić 24 stanowiska uczniowskie i stanowisko nauczyciela"),
      done("Zapewnić internet kablowy dla laptopów"),
    ],
    decisions: [
      "Komputer nauczyciela zostaje",
      "Laptopy do sali 38 pochodzą z pracowni AI",
      "Poza przeniesieniem laptopów nie zmieniać układu sali",
    ],
  }),
  room({
    id: "39",
    name: "Sala 39",
    floor: "III piętro",
    purpose: "Sala gimnastyczna",
    notes: ["Na tym etapie bez zmian w wyposażeniu"],
  }),
  room({
    id: "40",
    name: "Sala 40",
    floor: "III piętro",
    teachers: ["p. Socha", "p. Płatek", "p. Młynarczyk"],
    status: "todo",
    equipment: [
      group(G.computers, ["Laptop KPO dla nauczyciela"]),
      group(G.media, ["Telewizor multimedialny"]),
      group(G.planned, ["26 wyczyszczonych laptopów z sali 41, razem z szafą"]),
    ],
    tasks: [
      "Zapewnić stabilne podłączenie telewizora multimedialnego do komputera",
      "Sprawdzić, czy zestaw działa",
      "Wstawić do sali 40 wyczyszczone 26 laptopów z sali 41 razem z szafą",
      "Postawić na laptopach konfigurację zmazywalną: uczeń zawsze w trybie incognito (przygotowanie: Maciej Najwer)",
    ],
  }),
  room({
    id: "41",
    name: "Sala 41",
    floor: "III piętro",
    purpose: "Pracownia handlowa, przedmioty zawodowe",
    teachers: ["Agnieszka Skarupa", "Bożena Czukiewska", "Anna Kosin", "Dariusz Socha"],
    status: "missing",
    equipment: [
      group(G.computers, [
        "30 nowych laptopów KPO (do wstawienia, z zainstalowanym InsERT)",
        "Laptop KPO (stanowisko nauczyciela)",
      ]),
      group(G.media, ["Rzutnik (nowy, zostaje)"]),
      group(G.printers, ["Drukarka Xerox 7100 (duża, nowa, ARAW)"]),
      group(G.network, ["Przeciągnięty kabel sieciowy do podłączenia"]),
    ],
    tasks: [
      "Przenieść 26 wyczyszczonych laptopów z sali 41 do sali 40 razem z szafą",
      "Wstawić 30 nowych laptopów KPO z zainstalowanym InsERT",
      "Podłączyć laptopy do internetu",
      "Podłączyć przeciągnięty kabel sieciowy",
      "Wpiąć drukarkę Xerox 7100 do sieci, żeby można było drukować z komputerów w salach 41, 42 i 37, także uczniowskich",
    ],
  }),
  room({
    id: "42",
    name: "Sala 42",
    floor: "III piętro",
    purpose: "Pracownia handlowa, przedmioty zawodowe",
    teachers: ["Agnieszka Skarupa", "Bożena Czukiewska", "Anna Kosin", "Dariusz Socha"],
    status: "missing",
    equipment: [
      group(G.computers, ["30 laptopów KPO", "Laptop KPO dla nauczyciela"]),
      group(G.furniture, ["Szafa na laptopy (nowa, na 30 laptopów, do wstawienia)"]),
      group(G.media, ["Rzutnik (nowy)", "Monitor multimedialny (nowy, wiszący na ścianie)"]),
    ],
    tasks: [
      "Zabrać wyposażenie mechaniczno-samochodowe",
      "Zdjąć ze ścian tablice samochodowe",
      "Oddać tablice samochodowe do BS2 przy ul. Borowskiej (ewentualnie według dalszej decyzji)",
      "Podłączyć monitor multimedialny do komputera",
      "Wstawić nową szafę na 30 laptopów",
      "Postawić na laptopach konfigurację zmazywalną: uczeń zawsze w trybie incognito (przygotowanie: Maciej Najwer)",
    ],
  }),
  room({
    id: "43",
    name: "Sala 43",
    floor: "III piętro",
    teachers: ["Mariola Granatowska", "Aleksandra Karczmarz", "Anna Galert"],
    status: "ready",
    equipment: [
      group(G.computers, ["Komputer"]),
      group(G.media, ["Telewizor multimedialny"]),
    ],
    tasks: [
      done("Zapewnić podłączenie telewizora do komputera"),
      done("Sprawdzić, czy wszystko działa"),
    ],
    decisions: ["Telewizor multimedialny zostaje w sali"],
  }),
  room({
    id: "44",
    name: "Sala 44",
    floor: "III piętro",
    teachers: ["Anna Misiąg", "Małgorzata Fiodorów"],
    status: "missing",
    equipment: [
      group(G.computers, ["Laptop KPO"]),
      group(G.media, ["Monitor interaktywny"]),
      group(G.tablets, ["20 iPadów z KPO (do wstawienia)"]),
      group(G.network, ["Zasilanie dla tabletów"]),
    ],
    tasks: [
      done("Zapewnić monitor w sali"),
      done("Podłączyć komputer do monitora"),
      "Wstawić 20 iPadów z KPO",
      "Przygotować zasilanie dla tabletów",
    ],
  }),

  // Pracownie zewnętrzne
  room({
    id: "p2",
    name: "Pracownia gastronomiczna",
    short: "Gastronomiczna",
    floor: "Pracownie zewnętrzne",
    place: "Część gastronomiczna",
    purpose: "Pracownia gastronomiczna",
    teachers: ["Renata Marzec", "Krystyna Stępień", "Katarzyna Świerzewicz"],
    equipment: [
      group(G.computers, ["Komputer stacjonarny"]),
      group(G.media, ["Rzutnik"]),
    ],
    tasks: [
      "Sprawdzić, czy komputer stacjonarny działa",
      "Sprawdzić, czy rzutnik działa",
    ],
  }),
  room({
    id: "prf3",
    name: "Pracownia fryzjerska – teoria",
    short: "Fryzjerska – teoria",
    floor: "Pracownie zewnętrzne",
    place: "Część fryzjerska",
    purpose: "Teoria fryzjerstwa",
    teachers: ["Anna Sobczak"],
    equipment: [
      group(G.computers, ["Komputer"]),
      group(G.media, ["Telewizor (na ścianie)"]),
    ],
    tasks: ["Sprawdzić połączenie komputera z telewizorem"],
  }),
  room({
    id: "prf2",
    name: "Pracownia fryzjerska – praktyka",
    short: "Fryzjerska – praktyka",
    floor: "Pracownie zewnętrzne",
    place: "Część fryzjerska",
    purpose: "Praktyka fryzjerstwa",
    teachers: ["Edyta Jaworska", "Iwona Leńczowska", "Agnieszka Jastrzębska"],
    equipment: [
      group(G.computers, ["Komputer"]),
      group(G.media, ["Monitor multimedialny (75 cali, na kółkach)"]),
    ],
    tasks: [
      "Sprawdzić, czy komputer działa",
      "Sprawdzić, czy komputer jest poprawnie podłączony do monitora",
    ],
  }),
];

// roomIds puste = sprawa ogólna, niedotycząca jednej sali.
export const unresolvedItems = [
  {
    roomIds: ["5", "05-new"],
    text: "Rozróżnić salę 5 i nową, roboczą salę 05 wybudowaną w szatni",
  },
  {
    roomIds: [],
    text: "Po sprawdzeniu Wi-Fi wskazać sale, które wymagają access pointów",
  },
  {
    roomIds: ["37"],
    text: "Dołączyć osobny szkic układu ławek",
  },
  {
    roomIds: ["41"],
    text: "Ustalić, w jakiej szafie będzie 30 nowych laptopów (dotychczasowa szafa z sali 41 przechodzi do sali 40)",
  },
];
