// Konwencje opisu:
// - zadania, decyzje i uwagi zaczynają się wielką literą i nie kończą kropką;
// - zadania zapisujemy bezokolicznikiem ("Sprawdzić…", "Zamontować…");
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
    urgentTasks: purchases.urgentTasks,
    tasks,
    decisions,
    notes,
  };
};

const group = (name, items) => ({ name, items });

// Lista zakupów to jedno źródło dla zakładki "Do zakupu" i dla kart sal:
// - tier: "buy" (do kupienia) albo "wish" (lista życzeń);
// - roomIds: sale, do których trafi sprzęt (puste = miejsce do ustalenia);
// - priorityRoomIds: sale kupowane najpierw (podzbiór roomIds);
// - offers: przykładowe oferty ze sklepów (label, shop, url, price w zł, net: true gdy cena netto, checkedAt); ceny są orientacyjne;
// - karta sali dostaje wpis w grupie "Do zakupu", a sala priorytetowa także pilny zakup.
export const purchaseTiers = [
  { id: "buy", label: "Do kupienia", hint: "Sprzęt, który dobrze byłoby kupić" },
  { id: "wish", label: "Lista życzeń", hint: "Jeśli pozwolą na to środki" },
];

export const purchaseItems = [
  {
    id: "interactive-75",
    tier: "buy",
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
        price: 7245.53,
        net: true,
        checkedAt: "03.10.2026",
      },
    ],
  },
  {
    id: "tv-85",
    tier: "buy",
    name: "Telewizor",
    specs: ["4K", "85–86 cali"],
    qty: 1,
    roomIds: ["37"],
    offers: [
      {
        label: "Hisense 85E7Q",
        shop: "euro.com.pl",
        url: "https://www.euro.com.pl/telewizory-led-lcd-plazmowe/hisense-telewizor-85e7q.bhtml",
        price: 3799,
        checkedAt: "03.10.2026",
      },
    ],
  },
  {
    id: "aio-touch",
    tier: "buy",
    name: "Komputer all-in-one",
    specs: ["z ekranem dotykowym"],
    alternative: "monitor dotykowy (24 cale)",
    qty: 1,
    roomIds: ["16"],
    note: "Do pokoju nauczycielskiego",
  },
  {
    id: "aio-plain",
    tier: "buy",
    name: "Komputer all-in-one",
    specs: ["bez ekranu dotykowego"],
    qty: 1,
    roomIds: ["37"],
  },
  {
    id: "tv-86",
    tier: "wish",
    name: "Telewizor",
    specs: ["4K", "86 cali"],
    qty: 1,
    roomIds: ["38"],
    note: "Drugi taki sam jak w sali 37",
  },
  {
    id: "tv-40",
    tier: "wish",
    name: "Telewizor",
    specs: ["40 cali", "Full HD (4K mile widziane)"],
    qty: 1,
    roomIds: [],
    note: "Do wyświetlania zastępstw",
  },
  {
    id: "monitor-2k",
    tier: "wish",
    name: "Monitor biurowy",
    specs: ["2K", "24 cale"],
    qty: 2,
    roomIds: [],
  },
];

export const purchaseLabel = ({ name, specs = [] }) => (specs.length ? `${name} (${specs.join(", ")})` : name);

// Opis pozycji na karcie sali: lista życzeń i alternatywa są dopisane wprost.
const roomPurchaseLabel = (item) => {
  const specs = item.tier === "wish" ? [...item.specs, "lista życzeń"] : item.specs;
  const label = purchaseLabel({ name: item.name, specs });
  return item.alternative ? `${label} albo ${item.alternative}` : label;
};

const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);

// Dokleja zakupy sali do jej wyposażenia i pilnych zakupów.
const withPurchases = (id, equipment, urgentTasks) => {
  const items = purchaseItems.filter((item) => item.roomIds.includes(id));
  if (!items.length) return { equipment, urgentTasks };

  const labels = items.map(roomPurchaseLabel);
  const existing = equipment.find((entry) => entry.name === G.purchase);
  const merged = existing
    ? equipment.map((entry) => (entry === existing ? group(G.purchase, [...entry.items, ...labels]) : entry))
    : [...equipment, group(G.purchase, labels)];

  const urgent = items
    .filter((item) => item.priorityRoomIds?.includes(id))
    .map((item) => `Kupić ${lowerFirst(roomPurchaseLabel(item))}`);

  return { equipment: merged, urgentTasks: [...urgentTasks, ...urgent] };
};

export const rooms = [
  // Piwnica
  room({
    id: "04",
    name: "Sala 04",
    floor: "Piwnica",
    status: "todo",
    equipment: [
      group(G.media, ["Monitor (wiszący w sali)"]),
    ],
    tasks: [
      "Zabrać monitor z sali 04",
      "Kupić nóżki do monitora (ewentualnie)",
      "Przenieść monitor na wejście do szkoły jako monitor multimedialny dla uczniów",
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
    status: "todo",
    equipment: [
      group(G.computers, ["Komputer stacjonarny"]),
      group(G.media, ["Rzutnik (nowy)"]),
    ],
    tasks: [
      "Zamontować nowy rzutnik",
      "Sprawdzić podłączenie komputera do rzutnika",
      "Sprawdzić, czy obraz wyświetla się poprawnie",
    ],
    decisions: ["Po wymianie rzutnika zostawić układ sali bez zmian"],
  }),
  room({
    id: "3",
    name: "Sala 3",
    floor: "Parter",
    purpose: "Przedmioty zawodowe fryzjerskie",
    teachers: ["Agnieszka Jastrzębska", "Paweł Danielewski", "Iwona Leńczowska", "Edyta Jaworska"],
    equipment: [
      group(G.computers, ["Komputer"]),
      group(G.media, ["Telewizor multimedialny (75 cali, na kółkach)"]),
    ],
    tasks: [
      "Zapewnić stałe podłączenie komputera do telewizora",
      "Zamocować kabel tak, żeby nie wisiał luźno",
    ],
  }),
  room({
    id: "4",
    name: "Sala 4",
    floor: "Parter",
    purpose: "Fryzjerstwo i edukacja obywatelska",
    teachers: ["Marcin Kruk", "Marcin Kopij"],
    equipment: [
      group(G.media, ["Telewizor dotykowy (70 cali, na ścianie)"]),
    ],
    tasks: [
      "Sprawdzić stałe podłączenie do telewizora dotykowego",
      "Sprawdzić, czy telewizor dotykowy działa prawidłowo",
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
      "Sprawdzić telewizor dotykowy Samsung 75 cali",
      "Sprawdzić drukarkę wielofunkcyjną A3",
      "Dostarczyć wszystkie starsze iPady Air kupione pod tę salę",
      "Zebrać iPady Air razem z dostępnymi rysikami",
      "Przygotować iPady Air do pracy",
      "Zalogować iPady i ustawić uniwersalny PIN",
      "Zostawić iPady w sali razem z rysikami",
      "Przygotować szafę zamykaną na klucz",
      "Zapewnić w szafie listwy zasilające, żeby tablety mogły się ładować na co dzień",
      "Dokładnie sprawdzić Wi-Fi",
      "Dodać access point, jeśli Wi-Fi jest za słabe",
    ],
  }),
  room({
    id: "05-new",
    name: "Sala 05 (nowa)",
    floor: "Parter",
    place: "Nowa sala wybudowana w szatni",
    purpose: "Sala językowa",
    teachers: ["Aleksandra Karczmarz", "Anna Galert"],
    status: "missing",
    equipment: [
      group(G.purchase, [
        "Telewizor multimedialny na ścianę",
        "Komputer all-in-one (ewentualnie)",
        "Ławki",
        "Pełne wyposażenie sali lekcyjnej",
        "Biała tablica",
      ]),
    ],
    urgentTasks: [
      "Kupić telewizor multimedialny na ścianę",
      "Kupić komputer all-in-one (ewentualnie)",
      "Kupić ławki",
      "Skompletować całe wyposażenie sali lekcyjnej",
      "Kupić i zamontować białą tablicę",
    ],
    notes: ["Roboczo osobna, nowa sala; numerację trzeba później dopasować do planu szkoły"],
  }),
  room({
    id: "6",
    name: "Sala 6",
    floor: "Parter",
    purpose: "Praktyczna pracownia fryzjerska (połączona z salą 7)",
    equipment: [
      group(G.computers, ["Komputer"]),
      group(G.media, ["Rzutnik (podwieszony pod sufitem)"]),
    ],
    tasks: ["Sprawdzić podłączenie komputera do rzutnika"],
    notes: ["Sala 6 funkcjonalnie łączy się z salą 7"],
  }),
  room({
    id: "7",
    name: "Sala 7",
    floor: "Parter",
    purpose: "Praktyczna pracownia fryzjerska (połączona z salą 6)",
    notes: ["Opisywać razem z salą 6 jako jedną pracownię praktyczną"],
  }),
  room({
    id: "8",
    name: "Sala 8",
    floor: "Parter",
    purpose: "Gabinet",
    equipment: [
      group(G.computers, ["Komputer"]),
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
    equipment: [
      group(G.computers, ["4 komputery UNICEF", "4 sprawne stanowiska komputerowe"]),
    ],
    tasks: [
      "Wstawić 4 komputery UNICEF",
      "Zapewnić 4 sprawne stanowiska komputerowe, każde z dostępem do internetu",
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
      group(G.computers, ["Komputer"]),
      group(G.media, ["Monitor multimedialny (75 cali, na kółkach)"]),
      group(G.tablets, ["28 tabletów KPO", "Szafka z zasilaniem do ładowania tabletów"]),
    ],
    tasks: [
      "Dostarczyć 28 tabletów KPO",
      "Wstawić zamek do jednej ze starych szafek, żeby można ją było zamknąć na klucz",
      "Zapewnić w szafce zasilanie do ładowania tabletów",
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
    status: "todo",
    equipment: [
      group(G.media, ["Rzutnik (nowy)"]),
    ],
    tasks: [
      "Zamontować nowy rzutnik",
      "Zapewnić stabilne połączenie rzutnika z komputerem",
      "Sprawdzić, czy zestaw działa",
    ],
  }),
  room({
    id: "19",
    name: "Sala 19",
    floor: "I piętro",
    purpose: "Zajęcia Magdaleny Zaleskiej i Waldemara Kaczorowskiego",
    teachers: ["Magdalena Zaleska", "Waldemar Kaczorowski", "Marcin Kopij"],
    status: "todo",
    equipment: [
      group(G.media, ["Monitor multimedialny z pracowni AI (obecnie pod salą 36)"]),
    ],
    tasks: [
      "Przenieść monitor multimedialny z pracowni AI spod sali 36",
      "Zamontować monitor",
      "Sprawdzić, czy monitor ma nóżki",
      "Podłączyć monitor do komputera",
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
      group(G.computers, ["4 komputery UNICEF dla uczniów", "4 stanowiska komputerowe w czytelni"]),
      group(G.network, ["Internet na stanowiskach", "Uporządkowane i zabezpieczone przewody"]),
    ],
    tasks: [
      "Wstawić do biblioteki 4 komputery UNICEF dla uczniów",
      "Przygotować 4 stanowiska komputerowe w czytelni",
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
    equipment: [
      group(G.computers, ["Komputer stacjonarny"]),
      group(G.media, ["Monitor multimedialny BenQ (75 cali)"]),
    ],
    tasks: [
      "Sprawdzić podłączenie komputera do monitora BenQ",
      "Sprawdzić, czy monitor 75 cali działa",
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
      group(G.computers, ["30 laptopów"]),
      group(G.furniture, ["Szafa na laptopy z KPO z III piętra"]),
      group(G.media, ["Rzutnik krótkoogniskowy (nowy, zostaje)"]),
    ],
    tasks: [
      "Wstawić tylko 30 laptopów",
      "Wykorzystać szafę na laptopy z KPO z III piętra",
      "Sprawdzić, czy nowy rzutnik krótkoogniskowy działa prawidłowo",
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
    equipment: [
      group(G.computers, ["Komputer stacjonarny"]),
      group(G.media, ["Telewizor (75 cali, na ścianie)"]),
    ],
    tasks: [
      "Sprawdzić podłączenie komputera do telewizora",
      "Zapewnić stabilne połączenie komputera z telewizorem",
    ],
    decisions: ["Zostawić wyposażenie bez zmian"],
  }),
  room({
    id: "27",
    name: "Sala 27",
    floor: "II piętro",
    purpose: "Gabinet przyrodniczy (drugi)",
    teachers: ["Barbara Małecka", "Karolina Sałdyka", "Anna Mucha", "Agnieszka Hudziec"],
    status: "ready",
    decisions: ["Na razie nie wstawiać żadnego sprzętu"],
  }),
  room({
    id: "28",
    name: "Sala 28",
    floor: "II piętro",
    purpose: "Gabinet przyrodniczy",
    teachers: ["Barbara Małecka", "Karolina Sałdyka", "Anna Mucha", "Agnieszka Hudziec"],
    status: "decision",
    equipment: [
      group(G.computers, ["Komputer"]),
      group(G.media, ["Telewizor multimedialny", "Rzutnik lub rzutniki (do potwierdzenia)"]),
    ],
    tasks: [
      "Zapewnić telewizor multimedialny w sali",
      "Sprawdzić podłączenie komputera do telewizora",
    ],
    notes: ["Do potwierdzenia, co oznacza decyzja „zostawiamy tylko rzutniki”"],
  }),
  room({
    id: "29",
    name: "Sala 29",
    floor: "II piętro",
    purpose: "Gabinet matematyki",
    teachers: ["Iwona Bujanowska", "Ewa Ostrowska"],
    equipment: [
      group(G.computers, ["Komputer stacjonarny"]),
      group(G.media, ["Rzutnik"]),
    ],
    tasks: [
      "Sprawdzić stabilne połączenie rzutnika z komputerem",
      "Sprawdzić, czy zestaw działa",
    ],
    decisions: ["Zostawić wyposażenie bez zmian"],
  }),
  room({
    id: "30",
    name: "Sala 30",
    floor: "II piętro",
    purpose: "Język polski i inne przedmioty według planu",
    teachers: ["Anna Filipek", OTHERS],
    status: "todo",
    equipment: [
      group(G.computers, ["Komputer"]),
      group(G.media, ["Rzutnik", "Telewizor (65 cali, obecnie pod salą 36)"]),
    ],
    tasks: [
      "Przenieść telewizor 65 cali spod sali 36 do sali 30",
      "Zamontować telewizor wysoko nad tablicą",
      "Sprawdzić podłączenie komputera do rzutnika",
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
    status: "todo",
    equipment: [
      group(G.computers, ["Komputer stacjonarny"]),
      group(G.media, ["Rzutnik", "Monitor z KPO (nowy, na kółkach)"]),
    ],
    tasks: [
      "Wstawić nowy monitor z KPO na kółkach",
      "Podłączyć rzutnik do komputera stacjonarnego",
      "Sprawdzić podłączenie komputera do monitora z KPO",
      "Sprawdzić, czy zestaw działa",
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
    equipment: [
      group(G.computers, ["Komputer"]),
      group(G.media, ["Rzutnik"]),
    ],
    tasks: [
      "Podłączyć rzutnik do komputera",
      "Sprawdzić, czy zestaw działa",
    ],
  }),
  room({
    id: "33",
    name: "Sala 33",
    floor: "II piętro",
    purpose: "Język polski i inne przedmioty według planu",
    teachers: ["Ewelina Krycia", OTHERS],
    equipment: [
      group(G.computers, ["Komputer"]),
      group(G.media, ["Telewizor (nowy)"]),
    ],
    tasks: [
      "Zapewnić stabilne podłączenie komputera do nowego telewizora",
      "Sprawdzić, czy obraz i system się nie zawieszają",
    ],
  }),
  room({
    id: "34",
    name: "Sala 34",
    floor: "II piętro",
    purpose: "Przedmioty zawodowe i administracyjne według planu",
    teachers: ["Magdalena Nowak", "Arkadiusz Mocarski", "Małgorzata Kończyńska"],
    status: "decision",
    equipment: [
      group(G.computers, ["Komputer stacjonarny"]),
      group(G.media, ["Telewizor multimedialny"]),
    ],
    tasks: ["Podłączyć komputer stacjonarny do telewizora multimedialnego"],
    notes: ["Potwierdzić, że telewizor multimedialny zastępuje rzutnik"],
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
      group(G.computers, [
        "24 komputery stacjonarne UNICEF z monitorami dla uczniów",
        "Komputer stacjonarny UNICEF z monitorem dla nauczyciela",
        "Razem: 25 stanowisk komputerowych UNICEF",
      ]),
      group(G.network, ["Internet kablowy na wszystkich stanowiskach"]),
      group(G.printers, ["Drukarka A4 (najlepiej z duplexem)"]),
    ],
    tasks: [
      "Przenieść do sali 37 wszystkie nauczycielskie komputery stacjonarne UNICEF z monitorami",
      "Przygotować 24 stanowiska uczniowskie według szkicu",
      "Przygotować stanowisko nauczyciela (komputer stacjonarny UNICEF z monitorem)",
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
      "Przenieść laptopy z pracowni AI do sali 38",
      "Zapewnić 24 stanowiska uczniowskie i stanowisko nauczyciela",
      "Zapewnić internet kablowy dla laptopów",
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
    equipment: [
      group(G.computers, ["Komputer"]),
      group(G.media, ["Telewizor multimedialny"]),
    ],
    tasks: [
      "Zapewnić stabilne podłączenie telewizora multimedialnego do komputera",
      "Sprawdzić, czy zestaw działa",
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
      group(G.computers, ["26 laptopów"]),
      group(G.furniture, ["Szafa na laptopy (jest już w sali)"]),
      group(G.media, ["Rzutnik (nowy, zostaje)"]),
      group(G.printers, ["Drukarka Xerox 7100 (duża, nowa, ARAW)"]),
      group(G.network, ["Przeciągnięty kabel sieciowy do podłączenia"]),
    ],
    tasks: [
      "Wstawić 26 laptopów do istniejącej szafy",
      "Zapewnić nowe, wyczyszczone i sprawne laptopy",
      "Podłączyć laptopy do internetu",
      "Podłączyć przeciągnięty kabel sieciowy",
      "Wpiąć drukarkę Xerox 7100 do sieci, żeby można było drukować z komputerów w salach 41, 42 i 37, także uczniowskich",
    ],
    notes: ["Do potwierdzenia, czy obok rzutnika ma być duży telewizor niedotykowy z wcześniejszej notatki"],
  }),
  room({
    id: "42",
    name: "Sala 42",
    floor: "III piętro",
    purpose: "Pracownia handlowa, przedmioty zawodowe",
    teachers: ["Agnieszka Skarupa", "Bożena Czukiewska", "Anna Kosin", "Dariusz Socha"],
    status: "missing",
    equipment: [
      group(G.computers, ["26 laptopów"]),
      group(G.furniture, ["Szafa na laptopy"]),
      group(G.media, ["Rzutnik (nowy)", "Monitor multimedialny (nowy, wiszący na ścianie)"]),
    ],
    tasks: [
      "Zabrać wyposażenie mechaniczno-samochodowe",
      "Zdjąć ze ścian tablice samochodowe",
      "Oddać tablice samochodowe do BS2 przy ul. Borowskiej (ewentualnie według dalszej decyzji)",
      "Podłączyć monitor multimedialny do komputera",
      "Wstawić 26 laptopów razem z szafą",
      "Zapewnić nowe i sprawne laptopy",
    ],
  }),
  room({
    id: "43",
    name: "Sala 43",
    floor: "III piętro",
    teachers: ["Mariola Granatowska", "Aleksandra Karczmarz", "Anna Galert"],
    equipment: [
      group(G.computers, ["Komputer"]),
      group(G.media, ["Telewizor multimedialny"]),
    ],
    tasks: [
      "Zapewnić podłączenie telewizora do komputera",
      "Sprawdzić, czy wszystko działa",
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
      group(G.computers, ["Komputer"]),
      group(G.media, ["Monitor multimedialny"]),
      group(G.tablets, ["20 tabletów KPO"]),
      group(G.network, ["Zasilanie dla tabletów"]),
    ],
    tasks: [
      "Zapewnić monitor w sali",
      "Podłączyć komputer do monitora",
      "Wstawić 20 tabletów KPO",
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
    roomIds: ["28"],
    text: "Potwierdzić, czy finalnie ma być telewizor multimedialny, rzutnik (rzutniki), czy oba typy sprzętu",
  },
  {
    roomIds: ["34"],
    text: "Potwierdzić, że komputer ma być podłączony do telewizora multimedialnego",
  },
  {
    roomIds: ["37"],
    text: "Dołączyć osobny szkic układu ławek",
  },
  {
    roomIds: ["41"],
    text: "Potwierdzić, czy oprócz nowego rzutnika ma być duży telewizor niedotykowy",
  },
  {
    roomIds: [],
    text: "Wskazać miejsce dla telewizora 40 cali do wyświetlania zastępstw (lista zakupów)",
  },
];
