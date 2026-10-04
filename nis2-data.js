// Zakładka "NIS2. Przepisy": opracowanie robocze o ustawie o krajowym systemie cyberbezpieczeństwa (KSC)
// po nowelizacji wdrażającej dyrektywę NIS2, ze szczególnym uwzględnieniem szkoły.
// Daty w formacie RRRR-MM-DD; strona sama liczy, ile dni zostało albo minęło.

export const nis2Updated = "04.10.2026";

export const nis2Disclaimer =
  "Opracowanie robocze, nie porada prawna. Część informacji pochodzi z komentarzy kancelarii i firm doradczych (źródła wtórne). Przed decyzjami sprawdź tekst ustawy w Dzienniku Ustaw oraz poradnik NASK i ustal szczegóły z organem prowadzącym szkołę.";

// Krótko: co to jest i co się zmieniło.
export const nis2Summary = [
  "NIS2 to unijna dyrektywa o cyberbezpieczeństwie. W Polsce wdraża ją nowelizacja ustawy o krajowym systemie cyberbezpieczeństwa (KSC, „KSC 2.0”), która obowiązuje od 3 kwietnia 2026 r.",
  "Ustawa obejmuje m.in. podmioty publiczne. Według komentarzy szkoły publiczne będące jednostkami budżetowymi samorządu to podmioty ważne będące podmiotami publicznymi, więc stosują uproszczony system zarządzania bezpieczeństwem informacji (SZBI) z Załącznika nr 4.",
  "Odpowiada kierownik podmiotu, czyli w szkole dyrektor, także po przekazaniu zadań innej osobie lub firmie. Dyrektor ma obowiązek szkoleń z cyberbezpieczeństwa i ich udokumentowania.",
  "Obowiązki można w części realizować wspólnie z organem prowadzącym (wspólna obsługa cyberbezpieczeństwa w samorządzie).",
];

// Terminy z ustawy (wg źródeł; do potwierdzenia w tekście ustawy).
export const nis2Deadlines = [
  {
    id: "wejscie",
    date: "2026-04-03",
    title: "Wejście w życie nowelizacji ustawy o KSC",
    detail: "Od tego dnia obowiązuje KSC po nowelizacji (NIS2). Zaczynają biec terminy dla podmiotów objętych ustawą.",
    kind: "legal",
  },
  {
    id: "wykaz",
    date: "2026-10-03",
    title: "Koniec 6 miesięcy na samoidentyfikację i wpis do Wykazu KSC",
    detail:
      "Podmioty kluczowe i ważne miały samodzielnie ustalić, czy są objęte ustawą, i złożyć wniosek o wpis do wykazu (wykaz-ksc.gov.pl, system S46). Według komentarzy część podmiotów publicznych wpisano z urzędu (kwiecień i maj 2026) i mają one uzupełnić dane w 6 miesięcy od doręczenia wezwania. Sprawdzić pilnie, czy szkoła jest w wykazie.",
    kind: "legal",
    urgent: true,
  },
  {
    id: "szbi",
    date: "2027-04-03",
    title: "Koniec 12 miesięcy na wdrożenie obowiązków (SZBI i środki zarządzania ryzykiem)",
    detail:
      "Termin na wdrożenie wymogów z rozdziału 3 ustawy. W szkole to SZBI zgodny z Załącznikiem nr 4: inwentaryzacja, uprawnienia, kopie zapasowe, procedury incydentów, szkolenia, dokumentacja.",
    kind: "legal",
  },
  {
    id: "audyt",
    date: "2028-04-03",
    title: "Koniec 24 miesięcy: pierwszy audyt podmiotów kluczowych",
    detail:
      "Obowiązkowy audyt dotyczy podmiotów kluczowych, nie ważnych. Wg jednego ze źródeł administracyjne kary pieniężne będzie można nakładać dopiero po tym terminie (do potwierdzenia).",
    kind: "legal",
  },
];

// Terminy podane przez szkołę (np. od organu prowadzącego); dodawane na bieżąco.
export const nis2SchoolDeadlines = [];

// Obowiązki stałe, bez jednej daty.
export const nis2Recurring = [
  { title: "Szkolenie dyrektora z cyberbezpieczeństwa", detail: "Raz w roku, z udokumentowaniem udziału (wg źródeł)." },
  { title: "Przegląd i aktualizacja SZBI", detail: "Co najmniej raz w roku oraz bezzwłocznie po nowych rekomendacjach Pełnomocnika Rządu do Spraw Cyberbezpieczeństwa albo po incydencie (Załącznik nr 4)." },
  { title: "Cykliczne szkolenia pracowników", detail: "Cyberhigiena i minimalizowanie błędów ludzkich (Załącznik nr 4)." },
  { title: "Zgłaszanie poważnych incydentów", detail: "Wczesne ostrzeżenie do 24 godzin od wykrycia, zgłoszenie pełne do 72 godzin, sprawozdanie końcowe do 1 miesiąca od zgłoszenia pełnego (wg źródeł)." },
];

// Załącznik nr 4 do ustawy o KSC: opracowanie wstępne dostarczone przez szkołę.
export const nis2Annex = {
  intro:
    "Załącznik nr 4 do ustawy o krajowym systemie cyberbezpieczeństwa określa szczegółowe wymogi dla Systemu Zarządzania Bezpieczeństwem Informacji (SZBI) dedykowanego podmiotom ważnym będącym podmiotami publicznymi (m.in. szkołom, przedszkolom, samorządowym instytucjom kultury czy jednostkom budżetowym JST). Nakłada obowiązek opracowania, wdrożenia, monitorowania i dokumentowania podstawowych zasad bezpieczeństwa podzielonych na kluczowe obszary.",
  groups: [
    {
      id: "minimum",
      title: "1. Minimalne i obowiązkowe wymogi organizacyjno-techniczne",
      items: [
        { lead: "Inwentaryzacja zasobów", text: "Obowiązek prowadzenia stałego spisu produktów, usług oraz procesów ICT wykorzystywanych do przetwarzania informacji." },
        { lead: "Kontrola oprogramowania i urządzeń", text: "Kontrola używanych wersji oprogramowania oraz wdrażanie mechanizmów blokujących nieautoryzowaną instalację aplikacji na urządzeniach służbowych i mobilnych." },
        { lead: "Ochrona fizyczna i systemowa", text: "Zapewnienie ochrony miejsc przetwarzania danych (fizycznej) oraz stosowanie zabezpieczeń programowych i sprzętowych. W przypadku korzystania z chmury lub centrum danych: posiadanie udokumentowanych gwarancji ochrony od dostawcy." },
        {
          lead: "Zarządzanie uprawnieniami i dostępem",
          sub: [
            "Stosowanie zasady minimalnych uprawnień (dostępy tylko do danych niezbędnych do wykonywania pracy).",
            "Zawieszanie uprawnień w przypadku niewykonywania obowiązków przez co najmniej 1 miesiąc.",
            "Bezzwłoczne cofanie dostępów po wygaśnięciu podstawy prawnej lub umowy.",
          ],
        },
        { lead: "Kopie zapasowe (backupy)", text: "Obowiązkowe tworzenie kopii zapasowych, które są odseparowane logicznie i fizycznie od głównych systemów produkcyjnych." },
        { lead: "Ochrona poczty elektronicznej", text: "Stosowanie mechanizmów weryfikacji i zabezpieczeń poczty e-mail (zgodnie z ustawą o zwalczaniu nadużyć w komunikacji elektronicznej)." },
        { lead: "Praca zdalna", text: "Ustanowienie i przestrzeganie formalnych zasad bezpiecznej pracy na odległość i na urządzeniach mobilnych." },
        { lead: "Cyberhigiena i szkolenia", text: "Prowadzenie cyklicznych szkoleń z cyberbezpieczeństwa dla pracowników w celu minimalizacji ryzyka błędów ludzkich." },
      ],
    },
    {
      id: "zaawansowane",
      title: "2. Zaawansowane praktyki i nadzór nad nowymi technologiami",
      items: [
        { lead: "Sztuczna inteligencja i chmura", text: "Określenie i kontrolowanie zasad korzystania przez pracowników z ogólnodostępnych usług chmurowych oraz dużych generatywnych modeli sztucznej inteligencji (AI)." },
        { lead: "Poczta w ramach obsługi wspólnej", text: "Możliwość korzystania z dedykowanych usług pocztowych realizowanych np. przez jednostkę obsługującą w ramach wspólnej obsługi samorządowej." },
        { lead: "Umowy z dostawcami (outsource / serwis)", text: "Obowiązek wprowadzania do umów serwisowych z firmami zewnętrznymi zapisów gwarantujących odpowiedni poziom bezpieczeństwa systemów." },
        { lead: "Testowanie i monitorowanie", text: "Stałe monitorowanie dostępów i działania systemów oraz testowanie odporności i poziomów cyberhigieny personelu." },
      ],
    },
    {
      id: "przeglady",
      title: "3. Przeglądy i dokumentacja",
      items: [
        { lead: "Coroczny przegląd SZBI", text: "Podmiot publiczny musi dokonywać przeglądu i aktualizacji całego systemu co najmniej raz w roku, a także bezzwłocznie po wydaniu nowych rekomendacji przez Pełnomocnika Rządu do Spraw Cyberbezpieczeństwa lub po wystąpieniu incydentu." },
        { lead: "Obowiązek dokumentowania", text: "Wszystkie działania, procedury i audyty realizowane w ramach SZBI muszą być formalnie udokumentowane." },
      ],
    },
  ],
  // uzupełnienie z wyszukiwania (komentarze): minimalny zakres wskazywany w opracowaniach
  extra:
    "W opracowaniach komentujących Załącznik nr 4 minimalny zakres opisuje się też jako: polityka bezpieczeństwa informacji, analiza ryzyka, procedury zgłaszania incydentów, kontrola dostępu (w tym uwierzytelnianie wieloskładnikowe), zarządzanie aktualizacjami, kopie zapasowe, szkolenia pracowników i przegląd SZBI. Model jest mniej rozbudowany niż pełny SZBI z art. 8 ust. 1 ustawy, ale trzeba wdrożyć konkretne środki, przeglądać je i dokumentować rzeczywistą realizację.",
};

// Plan działania dla szkoły (propozycja robocza). link: odnośnik do innej zakładki tej strony.
export const nis2Roadmap = [
  {
    id: "faza-1",
    title: "Faza 1. Natychmiast: status szkoły i odpowiedzialność",
    when: "do końca października 2026",
    steps: [
      { id: "wykaz-sprawdz", text: "Sprawdzić w Wykazie KSC (wykaz-ksc.gov.pl), czy szkoła jest wpisana (także z urzędu) i w jakim statusie. Termin 3.10.2026 już minął." },
      { id: "organ-prowadzacy", text: "Skontaktować się z organem prowadzącym: czy wspólna obsługa cyberbezpieczeństwa obejmie szkołę, kto aktualizuje dane w wykazie i kto jest osobą kontaktową." },
      { id: "wniosek", text: "Jeśli szkoły nie ma w wykazie, a spełnia kryteria podmiotu ważnego: niezwłocznie złożyć wniosek o wpis (system S46) i zachować dokumentację samoidentyfikacji." },
      { id: "osoby", text: "Wyznaczyć osoby: koordynatora SZBI, jego zastępcę oraz osobę kontaktową dla KSC (wg źródeł obowiązują też zasady weryfikacji niekaralności personelu)." },
      { id: "dyrektor", text: "Dyrektor: zapoznać się z ustawą i poradnikiem NASK oraz zaplanować roczne szkolenie z cyberbezpieczeństwa z dokumentacją udziału." },
    ],
  },
  {
    id: "faza-2",
    title: "Faza 2. Fundamenty dokumentacji",
    when: "do końca grudnia 2026",
    steps: [
      { id: "inwentaryzacja", text: "Inwentaryzacja zasobów ICT: sprzęt, oprogramowanie, usługi i systemy zewnętrzne. Punkt wyjścia to spisy w tej witrynie.", links: [{ view: "rooms", label: "Sale" }, { view: "resources", label: "Zasoby" }] },
      { id: "polityka", text: "Polityka bezpieczeństwa informacji i zakres SZBI zatwierdzone przez dyrektora." },
      { id: "ryzyko", text: "Uproszczona analiza ryzyka (dane uczniów, dziennik elektroniczny, konta pracowników, sprzęt w salach)." },
      { id: "incydenty", text: "Procedura zgłaszania i obsługi incydentów (24 godziny, 72 godziny, 1 miesiąc) oraz lista kontaktów." },
    ],
  },
  {
    id: "faza-3",
    title: "Faza 3. Środki techniczne i organizacyjne",
    when: "do końca marca 2027",
    steps: [
      { id: "uprawnienia", text: "Uprawnienia: zasada minimalnych uprawnień, rejestr dostępów, zawieszanie po 1 miesiącu nieaktywności, cofanie dostępów po zakończeniu umowy." },
      { id: "mfa", text: "Uwierzytelnianie wieloskładnikowe dla kont administracyjnych i poczty (wg komentarzy część wymogów Załącznika nr 4)." },
      { id: "backup", text: "Kopie zapasowe odseparowane logicznie i fizycznie od systemów produkcyjnych, z próbą odtworzenia." },
      { id: "oprogramowanie", text: "Kontrola oprogramowania i aktualizacji, blokada instalacji aplikacji. W pracowniach: konfiguracje laptopów uczniowskich (np. tryb incognito)." },
      { id: "fizyczna", text: "Ochrona fizyczna miejsc przetwarzania danych i sprzętu: szafy na laptopy i tablety z zamknięciem i zasilaniem.", links: [{ view: "resources", label: "Szafy w Zasobach" }] },
      { id: "poczta-zdalna", text: "Zasady ochrony poczty elektronicznej i pracy zdalnej (urządzenia mobilne)." },
      { id: "chmura-ai", text: "Zasady korzystania z usług chmurowych i generatywnej AI przez pracowników." },
      { id: "umowy", text: "Umowy z dostawcami i serwisem (m.in. dziennik elektroniczny): zapisy o poziomie bezpieczeństwa." },
      { id: "szkolenia", text: "Cykliczne szkolenia pracowników z listami obecności." },
    ],
  },
  {
    id: "faza-4",
    title: "Faza 4. Domknięcie wdrożenia",
    when: "do 3 kwietnia 2027",
    steps: [
      { id: "dokumentacja", text: "Zebrać dokumentację SZBI (polityki, procedury, rejestry, protokoły szkoleń) i zatwierdzić ją." },
      { id: "przeglad-zgodnosci", text: "Wewnętrzny przegląd zgodności punkt po punkcie z Załącznikiem nr 4." },
    ],
  },
  {
    id: "faza-5",
    title: "Faza 5. Utrzymanie",
    when: "co roku",
    steps: [
      { id: "przeglad-roczny", text: "Coroczny przegląd i aktualizacja SZBI oraz po każdym incydencie lub nowych rekomendacjach." },
      { id: "szkolenie-dyrektora", text: "Coroczne szkolenie dyrektora i dokumentacja udziału." },
      { id: "testy", text: "Testy odporności i cyberhigieny personelu oraz monitorowanie dostępów." },
    ],
  },
];

// Co wynika z wyszukiwania w odniesieniu do szkoły.
export const nis2SchoolFindings = [
  "Szkoły, przedszkola i placówki będące samorządowymi jednostkami budżetowymi są w komentarzach opisywane jako podmioty ważne będące podmiotami publicznymi. Stosują uproszczone wymogi z Załącznika nr 4 i mogą korzystać ze wspólnej obsługi cyberbezpieczeństwa.",
  "Za wdrożenie odpowiada kierownik jednostki, czyli dyrektor, także gdy zadania przekazał innej osobie albo zewnętrznej firmie. Dyrektor powinien przejść roczne szkolenie z cyberbezpieczeństwa i udokumentować udział.",
  "Urzędy samorządowe i inne podmioty publiczne wpisano do wykazu z urzędu (13 kwietnia do 6 maja 2026) i uzupełniają dane w 6 miesięcy od doręczenia wezwania. Nie jest jasne, czy dotyczy to także szkół jako jednostek organizacyjnych.",
  "Kary: komentarze podają dla podmiotów ważnych do 7 mln EUR lub 1,4% przychodów (art. 73 ust. 4), a dla kierownika podmiotu różne wysokości (od 100% do 300% wynagrodzenia). Wg jednego źródła kary administracyjne będzie można nakładać dopiero po 3 kwietnia 2028.",
];

// Pytania do dalszych badań (do ustalenia z organem prowadzącym, NASK albo prawnikiem).
export const nis2Questions = [
  "Czy nasza szkoła jest w Wykazie KSC (z urzędu lub na wniosek) i czy została wezwana do uzupełnienia danych? Jaki jest jej termin?",
  "Kto jest organem prowadzącym i czy samorząd uruchomił wspólną obsługę cyberbezpieczeństwa? Które obowiązki przejmuje (SZBI, poczta, kopie zapasowe, szkolenia), a które zostają w szkole?",
  "Czy szkoła jest podmiotem ważnym automatycznie jako samorządowa jednostka budżetowa, czy wymaga to indywidualnej oceny?",
  "Jaka jest dokładna treść Załącznika nr 4 i przepisów przejściowych w tekście ustawy (Dz.U. 2026)? Potwierdzić daty z tej strony.",
  "Jakie kary grożą szkole jako jednostce sektora finansów publicznych i od kiedy mogą być nakładane?",
  "Kogo trzeba szkolić (dyrektora, wszystkich pracowników, administratorów) i jak często? Kto prowadzi szkolenia?",
  "Jak traktować dziennik elektroniczny i inne systemy zewnętrzne (umowy, gwarancje bezpieczeństwa od dostawców)?",
  "Czy zasady dla generatywnej AI i chmury (np. konta szkolne) trzeba opisać osobną polityką?",
];

// Źródła: komentarze i opracowania znalezione w wyszukiwarce (nie sprawdzone w tekście ustawy).
export const nis2Sources = [
  { label: "NASK: Od wymagań do działania. Praktyczny przewodnik po nowelizacji (KSC 2.0), wrzesień 2026", url: "https://www.nask.pl/media/2026/09/KSC2.0_Poradnik_29092026.pdf", kind: "poradnik instytucji państwowej" },
  { label: "Wykaz KSC (system S46), strona wpisu do wykazu wskazywana w źródłach", url: "https://wykaz-ksc.gov.pl", kind: "system rządowy (wg źródeł)" },
  { label: "Załącznik nr 4 do ustawy o KSC: wymagania SZBI dla podmiotu ważnego będącego podmiotem publicznym", url: "https://nis2jsfp.pl/zalacznik-nr-4-ksc-wymagania-szbi-podmiot-publiczny", kind: "komentarz" },
  { label: "SZBI wg Załącznika nr 4: przewodnik dla JST", url: "https://ksc.expert/artykul/szbi-zalacznik-4-jst", kind: "komentarz" },
  { label: "Cyberbezpieczeństwo w szkołach i przedszkolach po 3 kwietnia 2026: harmonogram i obowiązki", url: "https://ecrkbialystok.com.pl/aktualnosci-sg/1290-cyberbezpieczenstwo-w-szkolach-i-przedszkolach-po-3-kwietnia-2026-r-harmonogram-i-obowiazki", kind: "komentarz (szkoły)" },
  { label: "NIS2 i KRI dla szkół i jednostek publicznych", url: "https://serwis24.org/nis2-kri-szkoly-jednostki-publiczne/", kind: "komentarz (szkoły)" },
  { label: "NIS2 w przedszkolu i żłobku publicznym: obowiązki dyrektora", url: "https://livekid.com/pl/blog/nis2-w-przedszkolu-i-zlobku-publicznym-obowiazki-dyrektora-w-zakresie-cyberbezpieczenstwa/", kind: "komentarz (przedszkola)" },
  { label: "NIS2 dla samorządów: obowiązki gmin, powiatów i JST", url: "https://www.blog.omegasoft.pl/nis2-dla-gmin-powiatow-i-jednostek-samorzadowych-praktyczny-przewodnik-dla-jst/", kind: "komentarz (JST)" },
  { label: "NIS2/uKSC: co należy zrobić do 3 października 2026 (Grant Thornton)", url: "https://grantthornton.pl/publikacja/nis2-uksc-co-nalezy-zrobic-do-3-pazdziernika-2026/", kind: "komentarz" },
  { label: "3 października 2026 upływa termin na wpis do wykazu podmiotów kluczowych i ważnych (Graś i Wspólnicy)", url: "https://kglegal.pl/3-pazdziernika-2026-r-uplywa-termin-na-wpis-do-wykazu-podmiotow-kluczowych-i-waznych-nis-2/", kind: "komentarz" },
  { label: "Nowelizacja ustawy o cyberbezpieczeństwie obowiązuje od 3 kwietnia 2026: terminy do 2028 (Forsal)", url: "https://forsal.pl/gospodarka/aktualnosci/artykuly/11228196,nowelizacja-ustawy-o-ksc-weszla-w-zycie-kluczowe-terminy-i-obowiazki-do-2028-r.html", kind: "prasa" },
  { label: "Wpis do wykazu KSC: kto składa wniosek do 3 października 2026, a kogo wpisano z urzędu", url: "https://kkozlowski.com/wiedza/nis2-samoidentyfikacja-deadline-03-10-2026", kind: "komentarz" },
  { label: "Kary KSC: do 10 mln EUR, 100 mln zł, odpowiedzialność kierownika (Legalgeek)", url: "https://legalgeek.pl/blog/nis2-ksc-kary-i-nadzor/", kind: "komentarz" },
  { label: "Zmiany w KSC: kogo i w jakim zakresie trzeba szkolić (Compendium)", url: "https://www.compendium.pl/info/2562/zmiany-w-ksc-sprawdz-kogo-i-w-jakim-zakresie-trzeba-szkolic", kind: "komentarz" },
];
