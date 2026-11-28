// Zakładka "Pokój nauczycielski 16": lista zakupów wyposażenia sali 16 (rodzaj, nazwa, link do sklepu, cena brutto).
// Dane wyciągnięte z planu sali pokoj16-plan.js (katalog C, ceny brutto sprawdzone 24.11.2026; biurka, ekrany, lampy, podstawki i ścianka z tablicą 28.11.2026).
// Pominięte pozycje poza zakupem (lodówka, laptopy KPO, rzutnik, drukarki szkoły, zieleń, malowanie) oraz bez linku.

export const pokoj16 = {
  "tytul": "Pokój nauczycielski 16: lista zakupów",
  "sprawdzono": "24.11.2026",
  "zrodlo": "pokoj16-plan.js",
  "grupy": [
    "Szafki osobiste i ścianka",
    "Stanowiska komputerowe i stół roboczy",
    "Strefa druku i ładowania laptopów",
    "Aneks kuchenny (lodówka poza zakupem)",
    "Jadalnia",
    "Wypoczynek",
    "Centrum dowodzenia (ekran dotykowy na ścianie przy drzwiach, obok bizhuba)",
    "Tablice na ścianach (ściany i zieleń poza zakupem)"
  ],
  "pozycje": [
    {
      "id": "szafa",
      "grupa": "Szafki osobiste i ścianka",
      "rodzaj": "Szafa skrytkowa",
      "nazwa": "JAN NOWAK KAROL Eco Design, szafa skrytkowa zamykana na klucz, 18 skrytek, biały korpus / fronty dąb sonoma",
      "ilosc": 3,
      "cena_szt": 1299,
      "sklep": "Kupmeble.pl",
      "link": "https://kupmeble.pl/produkt/szafa-skrytkowa-zamykana-na-klucz-eco-design-karol-90x40x185-cm-bialy-dab-sonoma",
      "uwagi": "Na magazynie, gwarancja 10 lat",
      "zdjecie": "assets/pokoj16/szafa.jpg"
    },
    {
      "id": "scianka",
      "grupa": "Szafki osobiste i ścianka",
      "rodzaj": "Ścianka akustyczna na kółkach",
      "nazwa": "IKEA MITTZON rama z kółkami, ekran akustyczny i tablica suchościeralna, Gunnared beżowy/biały, 85 × 205 cm",
      "ilosc": 2,
      "cena_szt": 999,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/mittzon-rama-z-kolk-ekr-akust-tabl-gunnared-bezowy-bialy-s09536177/",
      "uwagi": "1 szt. między stołem do druku a lodówką, 1 szt. bez stałego miejsca (do przestawiania); dwustronna tablica do pisania i przypinania",
      "zamienniki": [
        {
          "nazwa": "MITTZON rama z kółkami i ekranem akustycznym, bez tablicy (s39514683)",
          "cena": 699,
          "link": "https://www.ikea.com/pl/pl/p/mittzon-rama-z-kolkami-ekran-akust-gunnared-bezowy-bialy-s39514683/"
        }
      ],
      "zdjecie": "assets/pokoj16/scianka.jpg"
    },
    {
      "id": "biurko",
      "grupa": "Stanowiska komputerowe i stół roboczy",
      "rodzaj": "Biurko",
      "nazwa": "IKEA BOLLPOJKE biurko, sosna / biały, 90 × 55 cm, drewniany blat, półka pod blatem",
      "ilosc": 2,
      "cena_szt": 449,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/bollpojke-biurko-sosna-bialy-00591366/",
      "uwagi": "Przy ścianie pod tablicą magnetyczną, wys. 75 cm, otwór na kable",
      "zdjecie": "assets/pokoj16/biurko.jpg"
    },
    {
      "id": "przegroda",
      "grupa": "Stanowiska komputerowe i stół roboczy",
      "rodzaj": "Ekran akustyczny na biurko",
      "nazwa": "IKEA MITTZON ekran akustyczny na biurko, Gunnared beżowy, 70 × 72 cm (zaciski w zestawie)",
      "ilosc": 2,
      "cena_szt": 300,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/mittzon-ekran-akustyczny-na-biurko-gunnared-bezowy-10528223/",
      "uwagi": "1 szt. między biurkami, 1 szt. z boku biurka 2 (od strony Xeroxa); ekran jest do biurek MITTZON, przed zakupem sprawdzić zaciski na blacie BOLLPOJKE",
      "zdjecie": "assets/pokoj16/przegroda.jpg"
    },
    {
      "id": "lampa",
      "grupa": "Stanowiska komputerowe i stół roboczy",
      "rodzaj": "Lampa biurkowa",
      "nazwa": "IKEA TERTIAL lampa biurkowa, biały (mocowanie zaciskiem do 6 cm)",
      "ilosc": 2,
      "cena_szt": 49.99,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/tertial-lampa-biurkowa-bialy-70355455/",
      "uwagi": "Po jednej na biurko; żarówka E27 sprzedawana osobno",
      "zdjecie": "assets/pokoj16/lampa.jpg"
    },
    {
      "id": "podstawka",
      "grupa": "Stanowiska komputerowe i stół roboczy",
      "rodzaj": "Podstawka pod laptopa",
      "nazwa": "IKEA STENERIK podstawka pod laptopa, 26 × 24 cm",
      "ilosc": 2,
      "cena_szt": 79.99,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/stenerik-podstawka-pod-laptopa-30564012/",
      "uwagi": "Pod laptopy KPO na biurkach",
      "zdjecie": "assets/pokoj16/podstawka.jpg"
    },
    {
      "id": "krz_biuro",
      "grupa": "Stanowiska komputerowe i stół roboczy",
      "rodzaj": "Krzesło konferencyjne",
      "nazwa": "IKEA LÄKTARE krzesło konferencyjne, średnioszary / biały",
      "ilosc": 2,
      "cena_szt": 299,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/laektare-krzeslo-konferencyjne-srednioszary-bialy-s49503250/",
      "uwagi": "Przy biurkach",
      "zdjecie": "assets/pokoj16/krz_biuro.jpg"
    },
    {
      "id": "stol_pracy",
      "grupa": "Stanowiska komputerowe i stół roboczy",
      "rodzaj": "Stół konferencyjny",
      "nazwa": "IKEA MITTZON stół konferencyjny, okleina dębowa / czarny, 140 × 68 cm, jednolity blat",
      "ilosc": 4,
      "cena_szt": 649,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/mittzon-stol-konferencyjny-okl-deb-czarny-s39513952/",
      "uwagi": "W sprzedaży, na stanie",
      "zamienniki": [
        {
          "nazwa": "MITTZON 140 × 108 okleina dębowa / czarny (2 blaty z modułem na środku)",
          "cena": 1098,
          "link": "https://www.ikea.com/pl/pl/p/mittzon-stol-konferencyjny-okl-deb-czarny-s99533400/"
        }
      ],
      "zdjecie": "assets/pokoj16/stol_pracy.jpg"
    },
    {
      "id": "krz_pracy",
      "grupa": "Stanowiska komputerowe i stół roboczy",
      "rodzaj": "Krzesło konferencyjne",
      "nazwa": "IKEA LÄKTARE krzesło konferencyjne, średnioszary / biały",
      "ilosc": 8,
      "cena_szt": 299,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/laektare-krzeslo-konferencyjne-srednioszary-bialy-s49503250/",
      "uwagi": "Przy stole roboczym",
      "zdjecie": "assets/pokoj16/krz_biuro.jpg"
    },
    {
      "id": "podstawa",
      "grupa": "Strefa druku i ładowania laptopów",
      "rodzaj": "Podstawa pod kserokopiarkę",
      "nazwa": "Podstawa pod kserokopiarkę KSW, wykonana pod Xerox VersaLink B7130",
      "ilosc": 1,
      "cena_szt": 467.4,
      "sklep": "agapo.pl (PC-NET, polski producent)",
      "link": "https://agapo.pl/podstawa-stolik-pod-drukarke-kserokopiarke-urzadzenie-wielofunkcyjne-p-44382.html",
      "uwagi": "Przy zamówieniu podać model: Xerox VersaLink B7130, 1 kaseta",
      "zamienniki": [
        {
          "nazwa": "Szkolmeb, szafka pod ksero 70 × 80 × 50 cm (meble szkolne)",
          "cena": null,
          "link": "https://szkolmeb.pl/szafka-pod-ksero"
        },
        {
          "nazwa": "Kamila Meble, szafka na drukarkę Rd1 z zamkiem (standardowo za wysoka, wykonują na wymiar)",
          "cena": 861,
          "link": "https://kamilameble.pl/szafy-biurowe/1279-szafka-rd1.html"
        }
      ],
      "zdjecie": "assets/pokoj16/podstawa.jpg"
    },
    {
      "id": "stol_wysoki",
      "grupa": "Strefa druku i ładowania laptopów",
      "rodzaj": "Biurko z regulacją wysokości",
      "nazwa": "IKEA TROTTEN biurko z regulacją wysokości, elektryczne, imitacja jesionu / biały (stół do kompletowania)",
      "ilosc": 1,
      "cena_szt": 999,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/trotten-biurko-z-regulacja-wysokosci-elektryczny-imitacja-jesionu-bialy-s39621881/",
      "uwagi": "Jeden stół obok strefy druku",
      "zdjecie": "assets/pokoj16/stol_wysoki.jpg"
    },
    {
      "id": "tonery",
      "grupa": "Strefa druku i ładowania laptopów",
      "rodzaj": "Szafka z drzwiami przesuwnymi",
      "nazwa": "IKEA TROTTEN szafka z drzwiami przesuwnymi, biały (laptopy z ładowarkami, papier, tonery)",
      "ilosc": 1,
      "cena_szt": 599,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/trotten-szafka-z-drzwiami-przesuwnymi-bialy-40474761/",
      "uwagi": "Pod stołem do kompletowania, obok bizhuba",
      "zdjecie": "assets/pokoj16/tonery.jpg"
    },
    {
      "id": "an_szuflady",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Szafka kuchenna z szufladami",
      "nazwa": "IKEA METOD/MAXIMERA szafka z 3 szufladami, biały/Havstorp beżowy",
      "ilosc": 1,
      "cena_szt": 835,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/metod-maximera-szafka-stojaca-z-3-szufladami-bialy-havstorp-bezowy-s09426701/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/an_szuflady.jpg"
    },
    {
      "id": "an_polki",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Szafka kuchenna z półkami",
      "nazwa": "IKEA METOD szafka stojąca z półkami, biały/Havstorp beżowy",
      "ilosc": 1,
      "cena_szt": 325,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/metod-szafka-st-polki-bialy-havstorp-bezowy-s89469862/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/an_polki.jpg"
    },
    {
      "id": "nogi",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Nóżki do szafek kuchennych",
      "nazwa": "IKEA METOD noga szafki 8 cm (opakowanie 2 szt.)",
      "ilosc": 6,
      "cena_szt": 25,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/metod-noga-szafki-70556067/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/nogi.jpg"
    },
    {
      "id": "zmywarka",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Zmywarka",
      "nazwa": "Zmywarka wolnostojąca Bosch Serie 2 SMS2ITI65E, 60 cm, biała",
      "ilosc": 1,
      "cena_szt": 2140.11,
      "sklep": "Morele.net",
      "link": "https://www.morele.net/zmywarka-bosch-sms2iti65e-600582926/",
      "uwagi": "Na stanie",
      "zamienniki": [
        {
          "nazwa": "Beko BDFN26530W, 60 cm, 15 kompletów, 44 dB (bez zdejmowanego blatu, 85 cm)",
          "cena": 1769.99,
          "link": "https://www.morele.net/zmywarka-beko-bdfn26530w-13134604/"
        }
      ],
      "zdjecie": "assets/pokoj16/zmywarka.jpg"
    },
    {
      "id": "an_zlew",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Szafka pod zlew",
      "nazwa": "IKEA METOD szafka pod zlew, biały/Havstorp beżowy",
      "ilosc": 1,
      "cena_szt": 340,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/metod-szafka-pod-zlew-bialy-havstorp-bezowy-s49455131/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/an_zlew.jpg"
    },
    {
      "id": "zlew",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Zlew",
      "nazwa": "IKEA LÅNGUDDEN zlew wpuszczany, 1 komora, stal nierdzewna",
      "ilosc": 1,
      "cena_szt": 289,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/langudden-zlew-wpuszczany-1-komorowy-stal-nierdz-s59157391/",
      "uwagi": "W sprzedaży, na stanie",
      "zamienniki": [
        {
          "nazwa": "VRESJÖN 54 × 44 cm, stal",
          "cena": 1079,
          "link": "https://www.ikea.com/pl/pl/p/vresjoen-zlew-wpuszczany-1-komora-stal-nierdz-s99425721/"
        }
      ],
      "zdjecie": "assets/pokoj16/zlew.jpg"
    },
    {
      "id": "bateria",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Bateria kuchenna",
      "nazwa": "IKEA SALLSJÖN bateria kuchenna z uchwytem z boku, stalowy",
      "ilosc": 1,
      "cena_szt": 349,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/sallsjoen-bateria-kuchenna-z-uchwytem-z-boku-stalowy-70600904/",
      "uwagi": "W sprzedaży, na stanie",
      "zamienniki": [
        {
          "nazwa": "LAGAN, chrom (najtańsza)",
          "cena": 119,
          "link": "https://www.ikea.com/pl/pl/p/lagan-bateria-kuchenna-chrom-10085027/"
        }
      ],
      "zdjecie": "assets/pokoj16/bateria.jpg"
    },
    {
      "id": "blat",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Blat kuchenny",
      "nazwa": "IKEA EKBACKEN blat, efekt jasnego dębu / laminat",
      "ilosc": 1,
      "cena_szt": 299,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/ekbacken-blat-efekt-jasnego-debu-laminat-50633811/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/blat.jpg"
    },
    {
      "id": "an_wiszaca",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Szafka kuchenna wisząca",
      "nazwa": "IKEA METOD szafka ścienna z półkami, 2 drzwi, biały/Havstorp beżowy",
      "ilosc": 4,
      "cena_szt": 405,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/metod-szafka-scienna-z-polkami-2-drzwi-bialy-havstorp-bezowy-s89461328/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/an_wiszaca.jpg"
    },
    {
      "id": "cokol",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Cokół kuchenny",
      "nazwa": "IKEA HAVSTORP cokół, beżowy",
      "ilosc": 2,
      "cena_szt": 95,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/havstorp-cokol-bezowy-40475256/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/cokol.jpg"
    },
    {
      "id": "panel_m",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Panel maskujący",
      "nazwa": "IKEA HAVSTORP panel maskujący, beżowy (bok szafki z szufladami)",
      "ilosc": 1,
      "cena_szt": 110,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/havstorp-panel-maskujacy-bezowy-50475251/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/panel_m.jpg"
    },
    {
      "id": "led",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Listwa LED",
      "nazwa": "IKEA MITTLED listwa LED pod szafki, ściemniana, biały",
      "ilosc": 4,
      "cena_szt": 65,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/mittled-listwa-oswietleniowa-led-do-bl-kuch-mozna-przyciemniac-bialy-60528584/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/led.jpg"
    },
    {
      "id": "led_zas",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Zasilacz do listew LED",
      "nazwa": "IKEA TRÅDFRI zasilacz 30 W do oświetlenia LED",
      "ilosc": 1,
      "cena_szt": 130,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/tradfri-zasilacz-do-sterowania-bezprzewod-smart-szary-60342656/",
      "uwagi": "Dobrać przewód zasilający w sklepie",
      "zdjecie": "assets/pokoj16/led_zas.jpg"
    },
    {
      "id": "led_kabel",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Przewód do listew LED",
      "nazwa": "IKEA VÅGDAL przewód połączeniowy, biały",
      "ilosc": 2,
      "cena_szt": 15,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/vagdal-przewod-polaczeniowy-bialy-70463600/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/led_kabel.jpg"
    },
    {
      "id": "mikrofala",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Kuchenka mikrofalowa",
      "nazwa": "IKEA TILLREDA kuchenka mikrofalowa wolnostojąca, biały",
      "ilosc": 1,
      "cena_szt": 249,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/tillreda-kuchenka-mikrofalowa-bialy-50486792/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/mikrofala.jpg"
    },
    {
      "id": "czajnik",
      "grupa": "Aneks kuchenny (lodówka poza zakupem)",
      "rodzaj": "Czajnik elektryczny",
      "nazwa": "Czajnik elektryczny Lafe Steelo EK02, stal",
      "ilosc": 1,
      "cena_szt": 84,
      "sklep": "Morele.net (sprzedawca zewnętrzny)",
      "link": "https://www.morele.net/czajnik-lafe-elektryczny-1-7-l-steelo-ek02-600730490/",
      "uwagi": "Na stanie",
      "zdjecie": "assets/pokoj16/czajnik.jpg"
    },
    {
      "id": "stol_jad",
      "grupa": "Jadalnia",
      "rodzaj": "Stół konferencyjny",
      "nazwa": "IKEA MITTZON stół konferencyjny, okleina dębowa / czarny, 140 × 68 cm, jednolity blat",
      "ilosc": 4,
      "cena_szt": 649,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/mittzon-stol-konferencyjny-okl-deb-czarny-s39513952/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/stol_pracy.jpg"
    },
    {
      "id": "krz_jad",
      "grupa": "Jadalnia",
      "rodzaj": "Krzesło konferencyjne",
      "nazwa": "IKEA LÄKTARE krzesło konferencyjne, średnioszary / biały",
      "ilosc": 8,
      "cena_szt": 299,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/laektare-krzeslo-konferencyjne-srednioszary-bialy-s49503250/",
      "uwagi": "W jadalni, w sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/krz_biuro.jpg"
    },
    {
      "id": "krz_zapas",
      "grupa": "Jadalnia",
      "rodzaj": "Krzesło konferencyjne (zapasowe)",
      "nazwa": "IKEA LÄKTARE krzesło konferencyjne, średnioszary / biały (dodatkowe, w narożniku)",
      "ilosc": 4,
      "cena_szt": 299,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/laektare-krzeslo-konferencyjne-srednioszary-bialy-s49503250/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/krz_biuro.jpg"
    },
    {
      "id": "sofa3",
      "grupa": "Wypoczynek",
      "rodzaj": "Sofa 3-osobowa",
      "nazwa": "IKEA EKTORP sofa 3-osobowa, Hakebo ciemnoszary",
      "ilosc": 2,
      "cena_szt": 1999,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/ektorp-sofa-3-osobowa-hakebo-ciemnoszary-s39508998/",
      "uwagi": "W sprzedaży, na stanie",
      "zdjecie": "assets/pokoj16/sofa3.jpg"
    },
    {
      "id": "cmd_monitor",
      "grupa": "Centrum dowodzenia (ekran dotykowy na ścianie przy drzwiach, obok bizhuba)",
      "rodzaj": "Monitor dotykowy",
      "nazwa": "Monitor dotykowy iiyama ProLite T2755MSC-B1, 27″ Full HD",
      "ilosc": 1,
      "cena_szt": 1793.04,
      "sklep": "Morele.net",
      "link": "https://www.morele.net/monitor-iiyama-prolite-t2755msc-b1-13179166/",
      "uwagi": "Na stanie",
      "zamienniki": [
        {
          "nazwa": "iiyama ProLite T2755QSC-B1, 27″ QHD dotykowy",
          "cena": 2274.95,
          "link": "https://www.morele.net/monitor-iiyama-prolite-t2755qsc-b1-13239211/"
        }
      ],
      "zdjecie": "assets/pokoj16/cmd_monitor.jpg"
    },
    {
      "id": "cmd_pc",
      "grupa": "Centrum dowodzenia (ekran dotykowy na ścianie przy drzwiach, obok bizhuba)",
      "rodzaj": "Minikomputer",
      "nazwa": "Minikomputer Qoobe Mini PC N100, 12 GB RAM, 512 GB SSD, Windows 11 Pro (QE-IN100)",
      "ilosc": 1,
      "cena_szt": 1839,
      "sklep": "Morele.net",
      "link": "https://www.morele.net/komputer-qoobe-mini-pc-n100-12gb-512gb-w11-pro-qe-in100-12gb-512gb-600575926/",
      "uwagi": "Na stanie; potwierdzić Wi-Fi (karta produktu go nie podaje)",
      "zamienniki": [
        {
          "nazwa": "Beelink Mini S12 Pro, N100, 16 GB, 500 GB, Windows 11 Pro, Wi-Fi 6 (sprzedawca TeKaPi)",
          "cena": 2789,
          "link": "https://www.morele.net/beelink-mini-s12-pro-mini-pc-lake-n100-16-gb-ddr4-ram-500-gb-15183822/"
        }
      ],
      "zdjecie": "assets/pokoj16/cmd_pc.jpg"
    },
    {
      "id": "cmd_mount",
      "grupa": "Centrum dowodzenia (ekran dotykowy na ścianie przy drzwiach, obok bizhuba)",
      "rodzaj": "Uchwyt ścienny do monitora",
      "nazwa": "Uchwyt ścienny regulowany do monitora Maclean MC-332, VESA 75/100",
      "ilosc": 1,
      "cena_szt": 97.47,
      "sklep": "Morele.net",
      "link": "https://www.morele.net/maclean-uchwyt-scienny-na-monitor-17-32-mc-332-14202017/",
      "uwagi": "Na stanie",
      "zdjecie": "assets/pokoj16/cmd_mount.jpg"
    },
    {
      "id": "cmd_vesa",
      "grupa": "Centrum dowodzenia (ekran dotykowy na ścianie przy drzwiach, obok bizhuba)",
      "rodzaj": "Uchwyt VESA na minikomputer",
      "nazwa": "Uchwyt VESA na minikomputer Maclean MC-115 B",
      "ilosc": 1,
      "cena_szt": 31.4,
      "sklep": "Morele.net",
      "link": "https://www.morele.net/uchwyt-do-komputera-maclean-uchwyt-do-mini-komputerow-maclean-zakres-17-70mm-kompatybilny-z-vesa-max-obciazenie-5kg-czarny-mc-115-b-15476917/",
      "uwagi": "Na stanie",
      "zdjecie": "assets/pokoj16/cmd_vesa.jpg"
    },
    {
      "id": "tablica_biurka",
      "grupa": "Tablice na ścianach (ściany i zieleń poza zakupem)",
      "rodzaj": "Tablica suchościeralna magnetyczna",
      "nazwa": "ALLboards tablica suchościeralna magnetyczna 200 × 100 cm, rama drewniana naturalna (nad biurkami)",
      "ilosc": 1,
      "cena_szt": 402.95,
      "sklep": "Castorama (sprzedawca ALLboards)",
      "link": "https://www.castorama.pl/departments/tablica-sucho-cieralna-magnetyczna-allboards-200x100-cm-rama-drewniana-naturalna-1-szt-/5902622411279_CAPL.prd",
      "uwagi": "Tylko online, dostępność potwierdzić w koszyku",
      "zamienniki": [
        {
          "nazwa": "Ta sama tablica w ramie aluminiowej Premium Expo",
          "cena": 302.99,
          "link": "https://www.castorama.pl/departments/tablica-sucho-cieralna-magnetyczna-200x100-cm-allboards-rama-aluminiowa-premium-expo-1-szt-/5902622410869_CAPL.prd"
        }
      ],
      "zdjecie": "assets/pokoj16/tablica_biurka.jpg"
    },
    {
      "id": "tablica_druk",
      "grupa": "Tablice na ścianach (ściany i zieleń poza zakupem)",
      "rodzaj": "Tablica suchościeralna magnetyczna",
      "nazwa": "ALLboards tablica suchościeralna magnetyczna 200 × 100 cm, rama drewniana naturalna (nad strefą druku)",
      "ilosc": 1,
      "cena_szt": 402.95,
      "sklep": "Castorama (sprzedawca ALLboards)",
      "link": "https://www.castorama.pl/departments/tablica-sucho-cieralna-magnetyczna-allboards-200x100-cm-rama-drewniana-naturalna-1-szt-/5902622411279_CAPL.prd",
      "uwagi": "Tylko online, dostępność potwierdzić w koszyku",
      "zdjecie": "assets/pokoj16/tablica_biurka.jpg"
    },
    {
      "id": "ogloszenia",
      "grupa": "Tablice na ścianach (ściany i zieleń poza zakupem)",
      "rodzaj": "Tablica korkowa",
      "nazwa": "ALLboards tablica korkowa 60 × 40 cm, rama drewniana naturalna (na filarach między oknami)",
      "ilosc": 2,
      "cena_szt": 27.49,
      "sklep": "Castorama (sprzedawca ALLboards)",
      "link": "https://www.castorama.pl/departments/tablica-korkowa-60x40-cm-allboards-rama-drewniana-naturalna-1-szt-/5902622411194_CAPL.prd",
      "uwagi": "Tylko online, dostępność potwierdzić w koszyku",
      "zdjecie": "assets/pokoj16/ogloszenia.jpg"
    },
    {
      "id": "ogl_rog",
      "grupa": "Tablice na ścianach (ściany i zieleń poza zakupem)",
      "rodzaj": "Tablica korkowa",
      "nazwa": "ALLboards tablica korkowa 80 × 60 cm, rama drewniana naturalna (filar w narożniku przy krzesłach)",
      "ilosc": 1,
      "cena_szt": 40.99,
      "sklep": "Castorama (sprzedawca ALLboards)",
      "link": "https://www.castorama.pl/departments/tablica-korkowa-allboards-80x60-cm-rama-drewniana-naturalna-1-szt-/5902622416694_CAPL.prd",
      "uwagi": "Tylko online, dostępność potwierdzić w koszyku",
      "zdjecie": "assets/pokoj16/ogl_rog.jpg"
    }
  ]
};
