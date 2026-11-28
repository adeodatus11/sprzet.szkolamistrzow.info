// Zakładka "Pokój nauczycielski 16": lista zakupów wyposażenia sali 16 (rodzaj, nazwa, link do sklepu, cena brutto).
// Dane wyciągnięte z planu sali pokoj16-plan.js (katalog C, ceny brutto sprawdzone 24.11.2026; biurka, ekrany, lampy, podstawki i ścianka z tablicą, regał EKET i niszczarka 28.11.2026).
// Pominięte pozycje poza zakupem (lodówka, zmywarka, czajnik, podstawa pod Xeroxa, laptopy KPO, rzutnik, drukarki szkoły, zieleń, malowanie) oraz bez linku.

export const pokoj16 = {
  "tytul": "Pokój nauczycielski 16: lista zakupów",
  "sprawdzono": "24.11.2026",
  "zrodlo": "pokoj16-plan.js",
  "grupy": [
    "Szafki osobiste i ścianka",
    "Stanowiska komputerowe i stół roboczy",
    "Strefa druku i ładowania laptopów",
    "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "uwagi": "1 szt. między szafami skrytkowymi a biurkiem 1, 1 szt. między biurkami; ekran jest do biurek MITTZON, przed zakupem sprawdzić zaciski na blacie BOLLPOJKE",
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
      "id": "regal_druk",
      "grupa": "Strefa druku i ładowania laptopów",
      "rodzaj": "Regał z otwartymi półkami",
      "nazwa": "IKEA EKET szafka z 4 przegrodami, biały, 70 × 35 × 70 cm (otwarta, bez drzwi)",
      "ilosc": 1,
      "cena_szt": 260,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/eket-szafka-z-4-przegrodami-bialy-60333954/",
      "uwagi": "Pod stołem do kompletowania; na nóżkach 10 cm razem 80 cm wysokości",
      "zdjecie": "assets/pokoj16/regal_druk.jpg"
    },
    {
      "id": "nogi_eket",
      "grupa": "Strefa druku i ładowania laptopów",
      "rodzaj": "Nóżki do regału",
      "nazwa": "IKEA EKET noga, metal/srebrny, 10 cm (opakowanie 4 szt.)",
      "ilosc": 1,
      "cena_szt": 65,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/eket-noga-metal-srebrny-70428904/",
      "uwagi": "Regał nie stoi na podłodze; nóżki z regulowanymi stopkami",
      "zdjecie": "assets/pokoj16/nogi_eket.jpg"
    },
    {
      "id": "niszczarka",
      "grupa": "Strefa druku i ładowania laptopów",
      "rodzaj": "Niszczarka",
      "nazwa": "Fellowes Powershred 99Ci, P-4 (ścinki 4 × 38 mm), 18 kartek naraz, kosz 34 l",
      "ilosc": 1,
      "cena_szt": 1519.98,
      "sklep": "Morele.net",
      "link": "https://www.morele.net/niszczarka-fellowes-99ci-p-4-174401/",
      "uwagi": "Niszczy też zszywki, spinacze i karty; 29 × 44 × 64 cm, między bizhubem a stołem do kompletowania",
      "zamienniki": [
        {
          "nazwa": "Fellowes 79Ci P-4, 16 kartek, kosz 23 l (mniejsza)",
          "cena": 1068.93,
          "link": "https://www.morele.net/niszczarka-fellowes-79ci-p-4-225077/"
        },
        {
          "nazwa": "HP OneShred Auto 200CC P-4, automatyczny podajnik na 200 kartek, kosz 28 l",
          "cena": 1302.46,
          "link": "https://www.morele.net/niszczarka-hp-hp-niszczarka-oneshred-auto-200cc-bialo-szara-13263815/"
        }
      ],
      "zdjecie": "assets/pokoj16/niszczarka.jpg"
    },
    {
      "id": "an_szuflady",
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
      "rodzaj": "Szafka kuchenna z półkami",
      "nazwa": "IKEA METOD szafka stojąca z półkami, biały/Havstorp beżowy",
      "ilosc": 2,
      "cena_szt": 325,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/metod-szafka-st-polki-bialy-havstorp-bezowy-s89469862/",
      "uwagi": "2 szt.: jedna obok szafki z szufladami, druga w miejscu zmywarki",
      "zdjecie": "assets/pokoj16/an_polki.jpg"
    },
    {
      "id": "nogi",
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
      "rodzaj": "Nóżki do szafek kuchennych",
      "nazwa": "IKEA METOD noga szafki 8 cm (opakowanie 2 szt.)",
      "ilosc": 8,
      "cena_szt": 25,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/metod-noga-szafki-70556067/",
      "uwagi": "4 szafki dolne × 4 nogi = 16 szt.",
      "zdjecie": "assets/pokoj16/nogi.jpg"
    },
    {
      "id": "an_zlew",
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "id": "panel_sc",
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
      "rodzaj": "Panel ścienny nad blatem",
      "nazwa": "IKEA LYSEKIL panel ścienny dwustronny, matowy biały / jasnoszary imitacja betonu, 119,6 × 55 cm",
      "ilosc": 2,
      "cena_szt": 199,
      "sklep": "IKEA (Wrocław Bielany / ikea.com/pl)",
      "link": "https://www.ikea.com/pl/pl/p/lysekil-panel-scienny-2str-jasnoszary-imitacja-betonu-matowy-bialy-10622923/",
      "uwagi": "2 szt. na 240 cm między blatem a szafkami wiszącymi (szafki od 145 cm); przyklejany do ściany, można przyciąć; klej montażowy dokupić osobno",
      "zdjecie": "assets/pokoj16/panel_sc.jpg"
    },
    {
      "id": "an_wiszaca",
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "grupa": "Aneks kuchenny (lodówka i zmywarka poza zakupem)",
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
      "cena_szt": 1819.94,
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
      "rodzaj": "Komputer stacjonarny SFF (poleasingowy)",
      "nazwa": "Lenovo ThinkCentre M70s SFF, Intel Core i5-10400, 16 GB RAM, 512 GB SSD, Windows 11 Home",
      "ilosc": 1,
      "cena_szt": 1679,
      "sklep": "AMSO Wrocław, ul. Grabiszyńska 240 (poleasingowy, klasa A)",
      "link": "https://amso.pl/product-pol-293417-Lenovo-ThinkCentre-M70s-i5-10400-6x2-9GHz-16GB-512GB-SSD-Windows-11-Home.html",
      "uwagi": "W salonie we Wrocławiu 2 szt. (28.11.2026), od ręki; 2 × DisplayPort + HDMI: DisplayPort do ekranu dotykowego, HDMI do monitora na korytarzu; gwarancja 12 mies.; stoi na regale EKET w strefie druku",
      "zamienniki": [
        {
          "nazwa": "Ten sam komputer z dyskiem 256 GB (AMSO Wrocław, 2 szt.)",
          "cena": 1599,
          "link": "https://amso.pl/product-pol-285021-Lenovo-ThinkCentre-M70s-i5-10400-6x2-9GHz-16GB-256GB-SSD-Windows-11-Home.html"
        },
        {
          "nazwa": "Dell OptiPlex 7080 SFF, i5-10500, 16 GB, 512 GB SSD (AMSO Wrocław, 3 szt.; tylko 2 × DisplayPort, do HDMI kabel DisplayPort–HDMI)",
          "cena": 1829,
          "link": "https://amso.pl/product-pol-293868-Dell-Optiplex-7080-SFF-i5-10500-6x3-1GHz-16GB-512GB-SSD-Windows-11-Home.html"
        }
      ],
      "zdjecie": "assets/pokoj16/cmd_pc.jpg"
    },
    {
      "id": "kabel_dp",
      "grupa": "Centrum dowodzenia (ekran dotykowy na ścianie przy drzwiach, obok bizhuba)",
      "rodzaj": "Kabel DisplayPort 5 m",
      "nazwa": "Gembird DisplayPort – DisplayPort 5 m (CC-DP2-5M)",
      "ilosc": 1,
      "cena_szt": 32.29,
      "sklep": "Morele.net",
      "link": "https://www.morele.net/kabel-gembird-displayport-displayport-5m-czarny-cc-dp2-5m-9774142/",
      "uwagi": "Obraz z komputera na regale EKET do ekranu dotykowego, w listwie wzdłuż ściany",
      "zdjecie": "assets/pokoj16/kabel_dp.jpg"
    },
    {
      "id": "kabel_usb",
      "grupa": "Centrum dowodzenia (ekran dotykowy na ścianie przy drzwiach, obok bizhuba)",
      "rodzaj": "Aktywny przedłużacz USB 5 m",
      "nazwa": "Manhattan aktywny przedłużacz USB-A – USB-A 5 m (150712)",
      "ilosc": 1,
      "cena_szt": 76.43,
      "sklep": "Morele.net (sprzedawca Netinet)",
      "link": "https://www.morele.net/kabel-usb-manhattan-przedluzacz-aktywny-usb-manhattan-usb-a-usb-a-5-m-czarny-150712-705899/",
      "uwagi": "Do obsługi dotyku: przedłuża kabel USB dołączony do monitora; aktywny, bo na tej długości zwykły kabel USB może gubić sygnał",
      "zdjecie": "assets/pokoj16/kabel_usb.jpg"
    },
    {
      "id": "kabel_hdmi",
      "grupa": "Centrum dowodzenia (ekran dotykowy na ścianie przy drzwiach, obok bizhuba)",
      "rodzaj": "Kabel HDMI 10 m",
      "nazwa": "Digitus HDMI – HDMI 10 m (AK-330118-100-S)",
      "ilosc": 1,
      "cena_szt": 111.4,
      "sklep": "Morele.net",
      "link": "https://www.morele.net/kabel-digitus-hdmi-hdmi-10m-czarny-ak-330118-100-s-630407/",
      "uwagi": "Do monitora na korytarzu; długość do potwierdzenia po zmierzeniu trasy (powyżej 10 m kabel aktywny/światłowodowy)",
      "zdjecie": "assets/pokoj16/kabel_hdmi.jpg"
    },
    {
      "id": "cmd_mount",
      "grupa": "Centrum dowodzenia (ekran dotykowy na ścianie przy drzwiach, obok bizhuba)",
      "rodzaj": "Uchwyt ścienny do monitora",
      "nazwa": "Neomounts NM-W25BLACK, stały płaski uchwyt ścienny, VESA 75/100, 10–32″, do 25 kg",
      "ilosc": 1,
      "cena_szt": 66.28,
      "sklep": "Morele.net",
      "link": "https://www.morele.net/neomounts-uchwyt-scienny-na-monitor-10-32-nm-w25black-4764189/",
      "uwagi": "Ekran 1,2 cm od ściany, bez ramienia: nie ugina się przy dotyku; sprawdzić, czy złącza monitora wychodzą w dół",
      "zamienniki": [
        {
          "nazwa": "Neomounts FPMA-W110BLACK, stały, 1,8 cm od ściany",
          "cena": 125.99,
          "link": "https://www.morele.net/neomounts-uchwyt-scienny-fpma-w110black-10-40-4764200/"
        }
      ],
      "zdjecie": "assets/pokoj16/cmd_mount.jpg"
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
