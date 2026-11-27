// Zakładka "Zakupy listopad 2027": zestawienie zakupów dokładnie według arkusza (JSON z arkusza Claude).
// Dwa arkusze: "Wyposażenie maturalne" (ceny brutto) i "Wyposażenie pracowni" (ceny netto + VAT) z działami:
// pracownia handlowa, pracownie zawodowe, pracownia gastronomiczno-spożywcza, pracownia fryzjerska.
// lp to numer pozycji z arkusza (5a = pozycja dopisana później). Daty w formacie RRRR-MM-DD.
// Kontroferty mają cena_brutto albo cena_netto, zależnie od arkusza. Pozycja bez ceny nie wchodzi do sum.
// Kwota do zapłaty pozycji = wartosc_brutto: przy VAT 0% to cena netto, przy VAT 23% cena brutto.
// sumy: tylko sumy przy kontrofertach dla wyposażenia maturalnego (z arkusza); pozostałe sumy liczy strona.

export const zakupyListopad = {
  "tytul": "Zakupy listopad 2027",
  "zrodlo": {
    "opis": "Arkusz Claude (zestawienie zakupów ZSZ nr 5)",
    "url": "https://claude.ai/artifact/NfdWVnneWSFudyGAmnRvdK"
  },
  "data_eksportu": "2026-11-16",
  "waluta": "PLN",
  "arkusze": [
    {
      "id": "maturalne",
      "nazwa": "Wyposażenie maturalne",
      "opis": "bizhub C450i wg oferty e-mail (Copytec) • ceny brutto • weryfikacja ofert i 2 oferty kontra: 14–16.11.2026 • kwota wniosku: 15 000 zł",
      "ceny": "brutto",
      "sumy": {
        "suma_kontra_1_brutto": 17569.93,
        "suma_kontra_2_brutto": 35056.72
      },
      "pozycje": [
        {
          "lp": 1,
          "kategoria": "Dziurkacz",
          "produkt": "Deli E0150",
          "parametry": "2 otwory, jednorazowo do 150 kartek",
          "ilosc": 1,
          "cena_szt_brutto": 370.0,
          "wartosc_brutto": 370.0,
          "sklep": "Niszczarka.net (Wrocław)",
          "dostepnosc": "Na wyczerpaniu",
          "dostawa": "Dostawa od 16 zł (Paczkomat), darmowa od 498,99 zł",
          "link": "https://niszczarka.net/pl/producer/Deli/46/1/full",
          "uwagi": "Możliwy odbiór lokalny; produkt z wymiennymi bolcami.",
          "data_sprawdzenia": "2026-11-14",
          "weryfikacja": "Aktualne, najtaniej (skrzypczak.com.pl też 370 zł, ale z dostawą).",
          "kontroferty": [
            {
              "opis": "niszczarki.org – wysyłka 1 dzień, darmowa dostawa",
              "cena_brutto": 455.1,
              "link": "https://www.niszczarki.org/dziurkacz-archiwizacyjny-dwuotworowy-deli-e0150-p-7524.html"
            },
            {
              "opis": "biurowi.pl – dostępność do sprawdzenia",
              "cena_brutto": 473.29,
              "link": "https://www.biurowi.pl/artykuly-biurowe/akcesoria-biurowe/dziurkacze/dziurkacz-2-otworowy-do-150-kartek-deli-e0150-czarny"
            }
          ]
        },
        {
          "lp": 2,
          "kategoria": "Napęd optyczny",
          "produkt": "Hitachi-LG GP57EB40, czarny",
          "parametry": "Zewnętrzna nagrywarka DVD±RW slim, USB 2.0, kabel USB w zestawie",
          "ilosc": 1,
          "cena_szt_brutto": 119.99,
          "wartosc_brutto": 119.99,
          "sklep": "Morele.net (sprzedaje Morele.net)",
          "dostepnosc": "Dostępny – odbiór ok. czw. 19.11",
          "dostawa": "Dostawa od 9,90 zł (darmowa od 399 zł)",
          "link": "https://www.morele.net/naped-lg-hlds-gp57eb40-ahle10b-5809842/",
          "uwagi": "Kabel USB w zestawie standardowo (wg opinii kupujących) – potwierdzić przy zamówieniu.",
          "data_sprawdzenia": "2026-11-16",
          "weryfikacja": "Nowa pozycja. Najtaniej od ręki.",
          "kontroferty": [
            {
              "opis": "sferis.pl – dostępny, dostawa 17.11, od 14,90 zł",
              "cena_brutto": 125.0,
              "link": "https://www.sferis.pl/nagrywarka-lg-gp57eb40-gp57eb40-usb-2-0-zewnetrzna-i171966"
            },
            {
              "opis": "komputronik.pl – w magazynie, wysyłka 1 dzień, darmowa dostawa",
              "cena_brutto": 159.9,
              "link": "https://www.komputronik.pl/product/603159/hitachi-lg-supermulti-dvd-rw-gp57eb40-czarna.html"
            }
          ]
        },
        {
          "lp": 3,
          "kategoria": "Flipchart",
          "produkt": "Flipchart magnetyczny mobilny 70×100 cm + gratisy",
          "parametry": "Na kółkach, suchościeralny, magnetyczny, regulowana wysokość, uchwyt na blok papieru",
          "ilosc": 8,
          "cena_szt_brutto": 285.0,
          "wartosc_brutto": 2280.0,
          "sklep": "anytech.pl",
          "dostepnosc": "Dostępny – duża dostępność, wysyłka tego samego dnia (opłacone do 17:00)",
          "dostawa": "Darmowa dostawa od 100 zł",
          "link": "https://anytech.pl/strona-glowna/967-flipchart-magnetyczny-mobilny-70x100-gratisy-5904310264945",
          "uwagi": "Bez marki (kod TAB_MAG_KOL_70x100). Sklep podaje „dużą dostępność” – potwierdzić 8 szt.",
          "data_sprawdzenia": "2026-11-16",
          "weryfikacja": "Nowa pozycja. Najtaniej od ręki.",
          "kontroferty": [
            {
              "opis": "sklep-allboards.pl – 100×70 srebrny + gratisy (gąbka, 2 markery, magnesy), wysyłka 24h, odroczona płatność dla jednostek budżetowych",
              "cena_brutto": 319.99,
              "link": "https://sklep-allboards.pl/pl/p/Flipchart-suchoscieralny-magnetyczny-mobilny-na-kolkach-100x70-cm-srebrny-GRATIS/3001"
            },
            {
              "opis": "dlabiura24.pl – 2x3 Mobilechart Red, wysyłka 24h, darmowa dostawa",
              "cena_brutto": 781.44,
              "link": "https://dlabiura24.pl/tablica-flipchart-2x3-mobilechart-red-na-kolkach"
            }
          ]
        },
        {
          "lp": 4,
          "kategoria": "Papier do flipcharta",
          "produkt": "Blok INTERDRUK 65×100 cm, 20 kartek, gładki",
          "parametry": "Zapas bloków do flipcharta (16 szt. w wyposażeniu maturalnym, 14 szt. w pracowni handlowej)",
          "ilosc": 16,
          "cena_szt_brutto": 27.39,
          "wartosc_brutto": 438.24,
          "sklep": "dlabiura24.pl",
          "dostepnosc": "Dostępny, wysyłka 72h",
          "dostawa": "0 zł – zamówienie > 250 zł",
          "link": "https://dlabiura24.pl/blok-do-flipcharta-interdruk-uniwersalny-65x100cm-20-kartek-gladki",
          "uwagi": "Same bloki (821,70 zł) przekraczają próg darmowej dostawy 250 zł.",
          "data_sprawdzenia": "2026-11-16",
          "weryfikacja": "Nowa pozycja. Najtaniej od ręki.",
          "kontroferty": [
            {
              "opis": "tableo.eu – MemoBe, duża ilość, wysyłka 24h",
              "cena_brutto": 33.8,
              "link": "https://tableo.eu/pl/p/Blok-do-flipchartow-MemoBe-bialy-gladki-20-kartek/492"
            },
            {
              "opis": "tanietablice.pl – 98 szt. na stanie",
              "cena_brutto": 39.0,
              "link": "https://www.tanietablice.pl/flipcharty-2x3-i-nobo/2470-blok-do-flipchart%C3%B3w-bia%C5%82y-g%C5%82adki-20-kartek-65x100-cm.html"
            }
          ]
        },
        {
          "lp": 5,
          "kategoria": "Zegar ścienny",
          "produkt": "IKEA SÖNDRUM, biały, Ø 35 cm",
          "parametry": "Czarne wyraźne cyfry, cichy mechanizm (bez tykania), bateria AA osobno",
          "ilosc": 10,
          "cena_szt_brutto": 79.99,
          "wartosc_brutto": 799.9,
          "sklep": "IKEA Wrocław",
          "dostepnosc": "Dostępny w IKEA Wrocław (liczbę 10 szt. potwierdzić)",
          "dostawa": "Odbiór osobisty 0 zł lub dostawa",
          "link": "https://www.ikea.com/pl/pl/p/soendrum-zegar-scienny-bialy-60540864/",
          "uwagi": "Baterie AA nie są w zestawie (10 szt.). Taniej: BRW Edgar Ø 35 cm 74,99 zł + 13,99 zł dostawy, ale cyfry aluminiowe 3D – słabszy kontrast w klasie.",
          "data_sprawdzenia": "2026-11-16",
          "weryfikacja": "Nowa pozycja. Najtańszy od ręki z czarnymi, wyraźnymi cyframi.",
          "kontroferty": [
            {
              "opis": "zegaryzegarki.pl – MPM E01.4205 Ø 35 cm, czarne cyfry, cichy, darmowa dostawa od 69 zł",
              "cena_brutto": 119.0,
              "link": "https://zegaryzegarki.pl/product-pol-13625-Zegar-scienny-MPM-E01-4205-0000-fi-35-cm-Czytelny.html"
            },
            {
              "opis": "selsey.pl – Basic Dome Ø 35 cm, cichy, dostawa od 29 zł",
              "cena_brutto": 199.0,
              "link": "https://selsey.pl/products/zegar-scienny-basic-dome-srednica-35-cm-bialy"
            }
          ]
        },
        {
          "lp": 6,
          "kategoria": "Markery do flipcharta",
          "produkt": "Toma, komplet 4 szt.",
          "parametry": "1 komplet (4 markery) na każdy z 8 flipchartów",
          "ilosc": 8,
          "cena_szt_brutto": 17.13,
          "wartosc_brutto": 137.04,
          "sklep": "taniaksiazka.pl",
          "dostepnosc": "Dostępny – wysyłka w 24h",
          "dostawa": "Darmowa dostawa DPD Pickup od 159 zł",
          "link": "https://www.taniaksiazka.pl/toma-marker-flipchart-4-szt-p-1078297.html",
          "uwagi": "Ilość 8 kompletów potwierdzić w sklepie. Tańsze Kamet 10,07 zł (Lobos), ale wysyłka 3–5 dni.",
          "data_sprawdzenia": "2026-11-16",
          "weryfikacja": "Nowa pozycja. Najtaniej od ręki.",
          "kontroferty": [
            {
              "opis": "e-sklep.koh-i-noor.pl – Koh-i-noor 1405, 4 kolory, tylko 2 szt. na stanie",
              "cena_brutto": 17.87,
              "link": "https://e-sklep.koh-i-noor.pl/flamastry-markery-i-zakreslacze/889-771405jd02pk1204-kin-marker-1405-flipchart-kpl-4-kol-okragla-koncowka-8593539324423.html"
            },
            {
              "opis": "biuropaczka.pl – Staedtler Lumocolor 4 kolory, w magazynie, realizacja 2–3 dni",
              "cena_brutto": 45.46,
              "link": "https://biuropaczka.pl/marker-do-tablic-flipchart-staedtler-lumocolor-okragly-4-kolory-w-etui"
            }
          ]
        },
        {
          "lp": 8,
          "kategoria": "Papier A4",
          "produkt": "Pollux A4 80 g/m², karton 5 ryz (2 500 ark.)",
          "parametry": "Klasa B, białość CIE 161; 1 karton = 2 500 arkuszy",
          "ilosc": 1,
          "cena_szt_brutto": 76.22,
          "wartosc_brutto": 76.22,
          "sklep": "Media Expert (mediaexpert.pl)",
          "dostepnosc": "Dostępny natychmiast",
          "dostawa": "Darmowa dostawa od 99 zł",
          "link": "https://www.mediaexpert.pl/komputery-i-tablety/tusze-i-tonery/papier-i-folie-do-drukarek/papier-ksero-international-paper-a4-80g-cie161-klasa-b",
          "uwagi": "Kwota planowana w piśmie maturalnym: 76,22 zł za karton (cena w sklepie 74,95 zł). Sprzedawany jako zestaw 5 ryz (14,99 zł/ryza). Część opinii zgłasza uszkodzone opakowania przy dostawie.",
          "data_sprawdzenia": "2026-11-16",
          "weryfikacja": "Plan 76,22 zł za karton 5 ryz; osobna ryza usunięta.",
          "kontroferty": [
            {
              "opis": "smartoffice-online.pl – Pollux, karton 5 ryz, 150 szt. na stanie, darmowa dostawa od 250 zł",
              "cena_brutto": 77.31,
              "link": "https://smartoffice-online.pl/p/77848/papier-ksero-pollux-a4-80g-1-karton-5-ryz"
            },
            {
              "opis": "x-kom.pl – PolSpeed A4 80 g, karton 5 ryz, dostępny",
              "cena_brutto": 109.0,
              "link": "https://www.x-kom.pl/p/1179966-papier-do-drukarki-pol-papier-a4-polspeed-80g-karton-x5-ryza-2500-arkuszy.html"
            }
          ]
        },
        {
          "lp": 10,
          "kategoria": "Dysk przenośny SSD",
          "produkt": "SanDisk Extreme Portable SSD 1 TB",
          "parametry": "USB-C (USB 3.2 Gen 2), do 1050/1000 MB/s; w zestawie kabel USB-C–USB-C i adapter USB-A",
          "ilosc": 1,
          "cena_szt_brutto": 699.99,
          "wartosc_brutto": 699.99,
          "sklep": "Media Expert (mediaexpert.pl)",
          "dostepnosc": "Dostępny natychmiast – u Ciebie dziś/jutro",
          "dostawa": "Darmowa dostawa",
          "link": "https://www.mediaexpert.pl/komputery-i-tablety/dyski-i-pamieci/dyski-wewnetrzne/extreme-portable-ssd-1050mb-s-1tb",
          "uwagi": "Wspólne zamówienie z niszczarkami i papierem w Media Expert. Crucial X9 1 TB (taniej, ok. 439–629 zł) jest wycofany ze sprzedaży w x-kom i Komputroniku.",
          "data_sprawdzenia": "2026-11-16",
          "weryfikacja": "Nowa pozycja. Najtańszy dostępny od ręki markowy SSD 1 TB z USB-C.",
          "kontroferty": [
            {
              "opis": "mediaexpert.pl – Samsung T7 1 TB, dostępny, darmowa dostawa",
              "cena_brutto": 799.99,
              "link": "https://www.mediaexpert.pl/komputery-i-tablety/dyski-i-pamieci/dyski-wewnetrzne/dysk-ssd-samsung-portable-touch-t7-1tbb-usb-3-2-gen-2-mu-pc1t0t-ww-grey"
            },
            {
              "opis": "morele.net – Samsung T7 1 TB, dostępny",
              "cena_brutto": 921.98,
              "link": "https://www.morele.net/dysk-zewnetrzny-ssd-samsung-t7-1tb-szary-mu-pc1t0t-ww-5942563/"
            }
          ]
        },
        {
          "lp": 11,
          "kategoria": "Urządzenie wielofunkcyjne",
          "produkt": "Konica Minolta bizhub C450i",
          "parametry": "Kolorowe MFP A3 – konfiguracja wg oferty e-mail",
          "ilosc": 1,
          "cena_szt_brutto": 7378.77,
          "wartosc_brutto": 7378.77,
          "sklep": "Copytec Sp. z o.o. (oferta e-mail)",
          "dostepnosc": "Do potwierdzenia",
          "dostawa": "Do potwierdzenia w ofercie",
          "link": "https://www.copytec.com.pl",
          "uwagi": "Cena z oferty e-mail. Kontakt: Ewelina Batko, ebatko@copytec.com.pl, tel. +48 883 787 653, +48 14 623 01 41. Copytec Sp. z o.o., NIP 9930658307, ul. Tuchowska 8, 33-100 Tarnów. Potwierdzić: stan (nowe/poleasingowe), kwotę brutto, wyposażenie, dostawę i instalację.",
          "data_sprawdzenia": "2026-11-14",
          "weryfikacja": "Oferta e-mail Copytec – nie do sprawdzenia online. Uwaga: na Allegro jest C450i za 5 989 zł + 246 zł dostawy (stan do sprawdzenia).",
          "kontroferty": [
            {
              "opis": "konica.com.pl – C450i odnowiona (584 tys. stron), darmowa dostawa",
              "cena_brutto": 8979.0,
              "link": "https://konica.com.pl/konica-minolta-bizhub-c450i-df-dual-scan-duplex-odnowiona-497-tys"
            },
            {
              "opis": "konicaminoltabizhub.pl – nowa (oferta via Ceneo), dostawa od 18 zł",
              "cena_brutto": 21463.5,
              "link": "https://www.ceneo.pl/107976503"
            }
          ]
        },
        {
          "lp": 12,
          "kategoria": "Tablica magnetyczna",
          "produkt": "Tablica ścienna magnetyczna 150 × 100 cm – ALLboards",
          "parametry": "Biała, suchościeralna, w aluminiowej ramie PREMIUM EXPO, zestaw akcesoriów",
          "ilosc": 2,
          "cena_szt_brutto": 194.49,
          "wartosc_brutto": 388.98,
          "sklep": "ALLboards (sklep-allboards.pl)",
          "dostepnosc": null,
          "dostawa": null,
          "link": "https://sklep-allboards.pl/pl/p/Tablica-magnetyczna-biala-150x100-cm-suchoscieralna-w-aluminiowej-ramie-PREMIUM-EXPO-zestaw-akcesoriow/113",
          "uwagi": "Do wyposażenia maturalnego; ceny brutto z wniosku, dostępność i dostawę potwierdzić w sklepie.",
          "data_sprawdzenia": "2026-11-16",
          "weryfikacja": "Nowa pozycja (16.11.2026).",
          "kontroferty": []
        },
        {
          "lp": 13,
          "kategoria": "Tablica magnetyczna",
          "produkt": "Tablica ścienna magnetyczna 200 × 100 cm – e-tablica.pl (TSA1020)",
          "parametry": "Suchościeralna, magnetyczna, 200 × 100 cm",
          "ilosc": 2,
          "cena_szt_brutto": 375.0,
          "wartosc_brutto": 750.0,
          "sklep": "e-tablica.pl",
          "dostepnosc": null,
          "dostawa": null,
          "link": "https://e-tablica.pl/pl/p/Tablica-magnetyczna-suchoscieralna-200x100-cm-TSA1020-/36",
          "uwagi": "Do wyposażenia maturalnego; ceny brutto z wniosku, dostępność i dostawę potwierdzić w sklepie.",
          "data_sprawdzenia": "2026-11-16",
          "weryfikacja": "Nowa pozycja (16.11.2026).",
          "kontroferty": []
        },
        {
          "lp": 14,
          "kategoria": "Gablota",
          "produkt": "Zamykana gablota magnetyczna 140 × 100 cm, szkło hartowane – Gabloty.com (GCS)",
          "parametry": "Gablota ogłoszeniowa zamykana, szkło hartowane, 140 × 100 cm",
          "ilosc": 1,
          "cena_szt_brutto": 1560.87,
          "wartosc_brutto": 1560.87,
          "sklep": "Gabloty.com",
          "dostepnosc": null,
          "dostawa": null,
          "link": "https://gabloty.com/gabloty-ogloszeniowe-gcs/8753-gablota-ogloszeniowa-gcs-140x100cm-szklo-hartowane.html",
          "uwagi": "Do wyposażenia maturalnego; ceny brutto z wniosku, dostępność i dostawę potwierdzić w sklepie.",
          "data_sprawdzenia": "2026-11-16",
          "weryfikacja": "Nowa pozycja (16.11.2026).",
          "kontroferty": []
        }
      ]
    },
    {
      "id": "pracownie",
      "nazwa": "Wyposażenie pracowni",
      "opis": "Ceny netto + stawka VAT (0% dla sprzętu komputerowego wskazanego przez szkołę) • oferty od ręki + 2 oferty kontra (ceny netto) • weryfikacja: 16.11.2026",
      "ceny": "netto",
      "sumy": {},
      "sekcje": [
        {
          "id": "handlowa",
          "nazwa": "Pracownia handlowa",
          "pozycje": [
            {
              "lp": 1,
              "kategoria": "Ploter A0+",
              "produkt": "Canon imagePROGRAF TM-350 z podstawą (914 mm)",
              "parametry": "36\" / 914 mm (A0+), podstawa z koszem odbiorczym, tusze pigmentowe 130/300 ml",
              "ilosc": 1,
              "cena_szt_netto": 8007.32,
              "vat": 0.23,
              "cena_szt_brutto": 9849.0,
              "wartosc_brutto": 9849.0,
              "sklep": "aglar.pl (Autoryzowany Partner Canon)",
              "dostepnosc": "Na stanie, dostawa 1–2 dni rob.",
              "dostawa": "Darmowa od 500 zł",
              "link": "https://www.aglar.pl/produkt/canon-imageprograf-tm-350-z-podstawa-914-mm/",
              "uwagi": "Nie znalazłem plotera A0 z fabrycznie dolewanymi zbiornikami – takie są tylko w formacie A1/24\" (Canon TC-21, Epson SC-T3100X). TM-350 to najtańszy w eksploatacji A0 w rozsądnej cenie: duże tusze 300 ml, ok. 0,60–0,70 zł za wydruk A1 CAD (dane robican.pl). Tusze startowe 490 ml wg innych sklepów – potwierdzić w aglar.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "wszystkodlabiura.pl – na stanie, wysyłka 5 dni (10 759 zł brutto)",
                  "cena_netto": 8747.15,
                  "link": "https://sklep.wszystkodlabiura.pl/pl/p/Canon-imagePROGRAF-TM-350-z-podstawa-914-mm/184248"
                },
                {
                  "opis": "prooffice.sklep.pl – 1 szt., 2–3 dni, tusze 490 ml w zestawie",
                  "cena_netto": 8800.0,
                  "link": "https://www.prooffice.sklep.pl/canon-imageprograf-tm-350-36-cf6246c003aa.html"
                }
              ]
            },
            {
              "lp": 2,
              "kategoria": "Komputer All-in-One",
              "produkt": "MSI PRO AP242P 14M (Win11 Pro)",
              "parametry": "Intel Core i5-14400, 16 GB DDR5, 512 GB SSD, 23,8\" FHD IPS 100 Hz, Win 11 Pro, klawiatura + mysz bezprzewodowe; wyjścia: HDMI 2.1 out + DisplayPort 1.4 out",
              "ilosc": 1,
              "cena_szt_netto": 4267.48,
              "vat": 0.0,
              "cena_szt_brutto": 4267.48,
              "wartosc_brutto": 4267.48,
              "sklep": "x-kom.pl",
              "dostepnosc": "Dostępny – u Ciebie pojutrze",
              "dostawa": "Darmowa do salonu, kurier od 17,99 zł",
              "link": "https://www.x-kom.pl/p/1243600-all-in-one-msi-pro-ap242p-14m-i5-14400-16gb-512-win11px.html",
              "uwagi": "MSI deklaruje obsługę 3 ekranów (wbudowany + 2 zewnętrzne przez HDMI-out i DP-out naraz). Cena netto wyliczona z 5 249 zł brutto – procedurę 0% VAT potwierdzić z x-kom. Gwarancja 36 mies. Wersja bez systemu kosztuje 4 150 zł brutto.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "morele.net – sprzedawca FOXKOMPUTER, dostępny (5 495,09 zł brutto)",
                  "cena_netto": 4467.55,
                  "link": "https://www.morele.net/komputer-msi-pro-ap242p-14m-691eu-core-i5-14400-16-gb-512-gb-ssd-windows-11-pro-14148476/"
                },
                {
                  "opis": "sklep-dell.pl – Dell Pro 24 QC24250 (Ultra 7 265, HDMI-out + DP-out), dostępny",
                  "cena_netto": 6424.84,
                  "link": "https://www.sklep-dell.pl/dell-pro-24-all-in-one-qc24250-bto154-qc24250-emea.html"
                }
              ]
            },
            {
              "lp": 3,
              "kategoria": "Urządzenie wielofunkcyjne",
              "produkt": "Xerox VersaLink B7130 MFP (B7101V_D)",
              "parametry": "A3 mono, 30 str./min, dupleks, skaner dwustronny DADF 130 ark., 1 kaseta 520 ark., toner startowy",
              "ilosc": 2,
              "cena_szt_netto": 4982.93,
              "vat": 0.23,
              "cena_szt_brutto": 6129.0,
              "wartosc_brutto": 12258.01,
              "sklep": "everprint.pl",
              "dostepnosc": "5+ szt., wysyłka natychmiast",
              "dostawa": "Darmowa",
              "link": "https://everprint.pl/pl/p/Xerox-Versalink-B7130-z-1-podajnikiem-Urzadzenie-wielofunkcyjne-mono-A3/36026",
              "uwagi": "Urządzenie biurkowe – opcjonalnie podstawa z szufladą Xerox 097S04907 (1 475 zł brutto). Instalacja jest warunkiem gwarancji producenta (u części sprzedawców płatna). VAT 23% – nie było w liście 0%.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "centrumpapieru.pl – dostępność 24h, + 24,60 zł dostawy",
                  "cena_netto": 4982.93,
                  "link": "https://www.centrumpapieru.pl/produkt/21760/urzadzenie-wielofunkcyjne-xerox-versalink-b7130d-a3"
                },
                {
                  "opis": "printmark.pl – wariant z dodatkową kasetą",
                  "cena_netto": 6400.0,
                  "link": "https://printmark.pl/sklep/xerox-versalink-b7130-2"
                }
              ]
            },
            {
              "lp": 5,
              "kategoria": "Komputer do grafiki",
              "produkt": "Apple MacBook Pro 14″ M5 Pro (15-rdzeniowy CPU, 16-rdzeniowy GPU), 24 GB RAM, 1 TB SSD, gwiezdna czerń, klawiatura US, zasilacz 70 W (MGDR4)",
              "parametry": "Laptop do projektowania graficznego, renderowania i montażu; wersja z klawiaturą US i zasilaczem 70 W, w magazynie wg lantre.pl",
              "ilosc": 1,
              "cena_szt_netto": 10569.11,
              "vat": 0.23,
              "cena_szt_brutto": 13000.0,
              "wartosc_brutto": 13000.0,
              "sklep": "lantre.pl",
              "dostepnosc": "Dostępny w magazynie (wg opisu sklepu)",
              "dostawa": "Do potwierdzenia",
              "link": "https://lantre.pl/apple-macbook-pro-14-m5-pro-24gb-1tb-15-core-cpu-16-core-gpu-klawiatura-us-zasilacz-70-w-gwiezdna-czern-space-black-mgdr4-us-70w.html",
              "uwagi": "Model wskazany przez szkołę (link lantre.pl). Nie mogłem otworzyć strony sklepu, więc w sumie zostaje rezerwa budżetowa 13 000 zł brutto: cenę ze strony lantre.pl wpisać po sprawdzeniu. Laptop nie jest w wykazie sprzętu z zał. nr 8 do ustawy o VAT (tylko zestawy stacjonarne), więc VAT 23%. Klawiatura US i zasilacz 70 W to wersja niestandardowa dla Polski. W kontrofertach droższe MacBooki z innych sklepów; w iSpot, x-kom, Media Expert i Morele nie znalazłem cen tego modelu.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "komputronik.pl – MacBook Pro 14 M5 Pro (15/16), 24 GB, 1 TB, gwiezdna czerń, nano, US; chwilowo niedostępny",
                  "cena_brutto": 13249.0,
                  "link": "https://www.komputronik.pl/product/1021432/laptop-apple-macbook-pro-m5-pro-15-16-14-2-24gb-1tb-mac-os-nano-us-gwiezdna-czern-.html"
                },
                {
                  "opis": "komputronik.pl – MacBook Pro 14 M5 Pro (18/20), 24 GB, 1 TB, gwiezdna czerń, zasilacz 96 W (mocniejszy procesor)",
                  "cena_brutto": 13799.0,
                  "link": "https://www.komputronik.pl/product/1004148/laptop-apple-macbook-pro-m5-pro-18-20-14-2-24gb-1tb-mac-os-gwiezdna-czern-zasilacz-96w.html"
                },
                {
                  "opis": "lantre.pl – MacBook Pro 16 M5 Pro (18/20), 24 GB, 1 TB, gwiezdna czerń (MGEA4ZE/A), cena w zestawie z akcesoriami wg strony, do sprawdzenia",
                  "cena_brutto": 14145.0,
                  "link": "https://lantre.pl/apple-macbook-pro-16-m5-pro-24gb-1tb-18-core-cpu-20-core-gpu-gwiezdna-czern-space-black-mgea4ze-a.html"
                },
                {
                  "opis": "komputronik.pl – MacBook Pro PROLED XDR 14 M5 Pro (15/16), 24 GB, 1 TB, gwiezdna czerń",
                  "cena_brutto": 14999.0,
                  "link": "https://www.komputronik.pl/product/1038898/laptop-apple-macbook-pro-proled-xdr-m5-pro-15-16-14-2-24gb-1tb-mac-os-gwiezdna-czern.html"
                },
                {
                  "opis": "mediamarkt.pl – MacBook Pro 16 M5 Pro (18/20), 24 GB RAM, gwiezdna czerń; pojemność SSD sprawdzić",
                  "cena_brutto": 17370.0,
                  "link": "https://mediamarkt.pl/pl/product/_laptop-apple-macbook-pro-16-czip-m5-pro-18-rdzeniowy-cpu-20-rdzeniowy-gpu-24-gb-ram-ssd-m5-macos-gwiezdna-czern-178327001.html"
                }
              ],
              "weryfikacja": "Zmiana 16.11.2026: konkretny model z lantre.pl zamiast ogólnej rezerwy; kwota nadal rezerwa 13 000 zł."
            },
            {
              "lp": "5a",
              "kategoria": "Monitor do grafiki (4K)",
              "produkt": "Dell UltraSharp U2725QE 27″ 4K (3840 × 2160)",
              "parametry": "27″, 4K 120 Hz, IPS, Thunderbolt 4, RJ-45 2,5 Gb/s, hub USB, ładowanie do 140 W",
              "ilosc": 1,
              "cena_szt_netto": 2259.35,
              "vat": 0.0,
              "cena_szt_brutto": 2259.35,
              "wartosc_brutto": 2259.35,
              "sklep": "Media Expert",
              "dostepnosc": "Do potwierdzenia",
              "dostawa": "Do potwierdzenia",
              "link": "https://www.mediaexpert.pl/komputery-i-tablety/monitory-led/monitor-dell-ultrasharp-u2725qe-27-3840x2160px-ips-120hz",
              "uwagi": "Dwa monitory do komputera do grafiki (poz. 5a i 5b): monitor 4K i monitor QHD, zamiast wcześniej planowanego ASUS ProArt PA27JCV 5K. Cena 2 779 zł brutto z oferty podanej przez szkołę. Monitor w pracowni handlowej liczony z VAT 0%: poniesiona zostanie cena netto 2 259,35 zł (2 779 zł brutto w ofercie).",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Nowa pozycja (16.11.2026).",
              "kontroferty": []
            },
            {
              "lp": "5b",
              "kategoria": "Monitor do grafiki (QHD)",
              "produkt": "Dell UltraSharp U2724DE 27″ QHD (2560 × 1440)",
              "parametry": "27″, QHD 120 Hz, IPS, Thunderbolt 4, RJ-45, hub USB",
              "ilosc": 1,
              "cena_szt_netto": 1478.86,
              "vat": 0.0,
              "cena_szt_brutto": 1478.86,
              "wartosc_brutto": 1478.86,
              "sklep": "Media Expert",
              "dostepnosc": "Do potwierdzenia",
              "dostawa": "Do potwierdzenia",
              "link": "https://www.mediaexpert.pl/komputery-i-tablety/monitory-led/monitor-dell-ultrasharp-u2724de-27-2560x1440px-ips-120hz",
              "uwagi": "Drugi monitor (QHD) obok monitora 4K (poz. 5a), zamiast ASUS ProArt PA27JCV 5K. Cena 1 819 zł brutto z oferty podanej przez szkołę. Monitor w pracowni handlowej liczony z VAT 0%: poniesiona zostanie cena netto 1 478,86 zł (1 819 zł brutto w ofercie).",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Nowa pozycja (16.11.2026).",
              "kontroferty": []
            },
            {
              "lp": "3h",
              "kategoria": "Flipchart",
              "produkt": "Flipchart magnetyczny mobilny 70×100 cm + gratisy",
              "parametry": "Na kółkach, suchościeralny, magnetyczny, regulowana wysokość, uchwyt na blok papieru",
              "ilosc": 2,
              "cena_szt_brutto": 285.0,
              "wartosc_brutto": 570.0,
              "sklep": "anytech.pl",
              "dostepnosc": "Dostępny – duża dostępność, wysyłka tego samego dnia (opłacone do 17:00)",
              "dostawa": "Darmowa dostawa od 100 zł",
              "link": "https://anytech.pl/strona-glowna/967-flipchart-magnetyczny-mobilny-70x100-gratisy-5904310264945",
              "uwagi": "Z pozycji 3 wyposażenia maturalnego (podział 8 + 2 szt.). Bez marki (kod TAB_MAG_KOL_70x100). Sklep podaje „dużą dostępność” – potwierdzić 10 szt.",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Nowa pozycja. Najtaniej od ręki.",
              "kontroferty": [
                {
                  "opis": "sklep-allboards.pl – 100×70 srebrny + gratisy (gąbka, 2 markery, magnesy), wysyłka 24h, odroczona płatność dla jednostek budżetowych",
                  "cena_brutto": 319.99,
                  "link": "https://sklep-allboards.pl/pl/p/Flipchart-suchoscieralny-magnetyczny-mobilny-na-kolkach-100x70-cm-srebrny-GRATIS/3001"
                },
                {
                  "opis": "dlabiura24.pl – 2x3 Mobilechart Red, wysyłka 24h, darmowa dostawa",
                  "cena_brutto": 781.44,
                  "link": "https://dlabiura24.pl/tablica-flipchart-2x3-mobilechart-red-na-kolkach"
                }
              ],
              "cena_szt_netto": 231.71,
              "vat": 0.23
            },
            {
              "lp": "4h",
              "kategoria": "Papier do flipcharta",
              "produkt": "Blok INTERDRUK 65×100 cm, 20 kartek, gładki",
              "parametry": "Zapas: 3 bloki na każdy z 10 flipchartów",
              "ilosc": 14,
              "cena_szt_brutto": 27.39,
              "wartosc_brutto": 383.46,
              "sklep": "dlabiura24.pl",
              "dostepnosc": "Dostępny, wysyłka 72h",
              "dostawa": "0 zł – zamówienie > 250 zł",
              "link": "https://dlabiura24.pl/blok-do-flipcharta-interdruk-uniwersalny-65x100cm-20-kartek-gladki",
              "uwagi": "Z pozycji 4 wyposażenia maturalnego (podział 16 + 14 szt.). Same bloki (821,70 zł) przekraczają próg darmowej dostawy 250 zł.",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Nowa pozycja. Najtaniej od ręki.",
              "kontroferty": [
                {
                  "opis": "tableo.eu – MemoBe, duża ilość, wysyłka 24h",
                  "cena_brutto": 33.8,
                  "link": "https://tableo.eu/pl/p/Blok-do-flipchartow-MemoBe-bialy-gladki-20-kartek/492"
                },
                {
                  "opis": "tanietablice.pl – 98 szt. na stanie",
                  "cena_brutto": 39.0,
                  "link": "https://www.tanietablice.pl/flipcharty-2x3-i-nobo/2470-blok-do-flipchart%C3%B3w-bia%C5%82y-g%C5%82adki-20-kartek-65x100-cm.html"
                }
              ],
              "cena_szt_netto": 22.27,
              "vat": 0.23
            },
            {
              "lp": "6h",
              "kategoria": "Markery do flipcharta",
              "produkt": "Toma, komplet 4 szt.",
              "parametry": "1 komplet (4 markery) na każdy z 10 flipchartów",
              "ilosc": 2,
              "cena_szt_brutto": 17.13,
              "wartosc_brutto": 34.26,
              "sklep": "taniaksiazka.pl",
              "dostepnosc": "Dostępny – wysyłka w 24h",
              "dostawa": "Darmowa dostawa DPD Pickup od 159 zł",
              "link": "https://www.taniaksiazka.pl/toma-marker-flipchart-4-szt-p-1078297.html",
              "uwagi": "Z pozycji 6 wyposażenia maturalnego (podział 8 + 2 komplety). Ilość 10 kompletów potwierdzić w sklepie. Tańsze Kamet 10,07 zł (Lobos), ale wysyłka 3–5 dni.",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Nowa pozycja. Najtaniej od ręki.",
              "kontroferty": [
                {
                  "opis": "e-sklep.koh-i-noor.pl – Koh-i-noor 1405, 4 kolory, tylko 2 szt. na stanie",
                  "cena_brutto": 17.87,
                  "link": "https://e-sklep.koh-i-noor.pl/flamastry-markery-i-zakreslacze/889-771405jd02pk1204-kin-marker-1405-flipchart-kpl-4-kol-okragla-koncowka-8593539324423.html"
                },
                {
                  "opis": "biuropaczka.pl – Staedtler Lumocolor 4 kolory, w magazynie, realizacja 2–3 dni",
                  "cena_brutto": 45.46,
                  "link": "https://biuropaczka.pl/marker-do-tablic-flipchart-staedtler-lumocolor-okragly-4-kolory-w-etui"
                }
              ],
              "cena_szt_netto": 13.93,
              "vat": 0.23
            },
            {
              "lp": "2h",
              "kategoria": "Napęd optyczny",
              "produkt": "Hitachi-LG GP57EB40, czarny",
              "parametry": "Zewnętrzna nagrywarka DVD±RW slim, USB 2.0, kabel USB w zestawie",
              "ilosc": 1,
              "cena_szt_brutto": 119.99,
              "wartosc_brutto": 119.99,
              "sklep": "Morele.net (sprzedaje Morele.net)",
              "dostepnosc": "Dostępny – odbiór ok. czw. 19.11",
              "dostawa": "Dostawa od 9,90 zł (darmowa od 399 zł)",
              "link": "https://www.morele.net/naped-lg-hlds-gp57eb40-ahle10b-5809842/",
              "uwagi": "Z pozycji 2 wyposażenia maturalnego (podział 1 + 1 szt.). Kabel USB w zestawie standardowo (wg opinii kupujących) – potwierdzić przy zamówieniu.",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Nowa pozycja. Najtaniej od ręki.",
              "kontroferty": [
                {
                  "opis": "sferis.pl – dostępny, dostawa 17.11, od 14,90 zł",
                  "cena_brutto": 125.0,
                  "link": "https://www.sferis.pl/nagrywarka-lg-gp57eb40-gp57eb40-usb-2-0-zewnetrzna-i171966"
                },
                {
                  "opis": "komputronik.pl – w magazynie, wysyłka 1 dzień, darmowa dostawa",
                  "cena_brutto": 159.9,
                  "link": "https://www.komputronik.pl/product/603159/hitachi-lg-supermulti-dvd-rw-gp57eb40-czarna.html"
                }
              ],
              "cena_szt_netto": 97.55,
              "vat": 0.23
            },
            {
              "lp": "7h",
              "kategoria": "Niszczarka",
              "produkt": "Fellowes Powershred 92Cs",
              "parametry": "P-4, do 18 arkuszy, kosz 25 l",
              "ilosc": 2,
              "cena_szt_brutto": 777.73,
              "wartosc_brutto": 1555.46,
              "sklep": "Media Expert (mediaexpert.pl)",
              "dostepnosc": "Dostępna – u Ciebie dziś/jutro, odbiór w sklepie",
              "dostawa": "Darmowa dostawa",
              "link": "https://www.mediaexpert.pl/komputery-i-tablety/drukarki-i-urzadzenia-biurowe/niszczarki/niszczarka-fellowes-92cs",
              "uwagi": "Przeniesione z wyposażenia maturalnego (obie niszczarki). Wspólne zamówienie z papierem A4 w Media Expert.",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Nowa pozycja (cena sprawdzona 16.11). Najtaniej od ręki.",
              "kontroferty": [
                {
                  "opis": "morele.net – dostępna (14.11)",
                  "cena_brutto": 925.99,
                  "link": "https://www.morele.net/niszczarka-fellowes-92cs-p-4-6295842/"
                },
                {
                  "opis": "niszczarki24.pl – wysyłka 1 dzień, darmowa dostawa (14.11)",
                  "cena_brutto": 930.0,
                  "link": "https://www.niszczarki24.pl/niszczarka-fellowes-92cs-4x38-25l.html"
                }
              ],
              "cena_szt_netto": 632.3,
              "vat": 0.23
            },
            {
              "lp": "12h",
              "kategoria": "Tablica magnetyczna",
              "produkt": "Tablica ścienna magnetyczna 150 × 100 cm – ALLboards",
              "parametry": "Biała, suchościeralna, w aluminiowej ramie PREMIUM EXPO, zestaw akcesoriów",
              "ilosc": 2,
              "cena_szt_brutto": 194.49,
              "wartosc_brutto": 388.98,
              "sklep": "ALLboards (sklep-allboards.pl)",
              "dostepnosc": null,
              "dostawa": null,
              "link": "https://sklep-allboards.pl/pl/p/Tablica-magnetyczna-biala-150x100-cm-suchoscieralna-w-aluminiowej-ramie-PREMIUM-EXPO-zestaw-akcesoriow/113",
              "uwagi": "Do ekspozycji prac uczniów w pracowni handlowej (drugi komplet obok wyposażenia maturalnego, pozycja 12). Dostępność i dostawę potwierdzić w sklepie.",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Nowa pozycja (16.11.2026).",
              "kontroferty": [],
              "cena_szt_netto": 158.12,
              "vat": 0.23
            },
            {
              "lp": "13h",
              "kategoria": "Tablica magnetyczna",
              "produkt": "Tablica ścienna magnetyczna 200 × 100 cm – e-tablica.pl (TSA1020)",
              "parametry": "Suchościeralna, magnetyczna, 200 × 100 cm",
              "ilosc": 2,
              "cena_szt_brutto": 375.0,
              "wartosc_brutto": 750.0,
              "sklep": "e-tablica.pl",
              "dostepnosc": null,
              "dostawa": null,
              "link": "https://e-tablica.pl/pl/p/Tablica-magnetyczna-suchoscieralna-200x100-cm-TSA1020-/36",
              "uwagi": "Do ekspozycji prac uczniów w pracowni handlowej (drugi komplet obok wyposażenia maturalnego, pozycja 13). Dostępność i dostawę potwierdzić w sklepie.",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Nowa pozycja (16.11.2026).",
              "kontroferty": [],
              "cena_szt_netto": 304.88,
              "vat": 0.23
            },
            {
              "lp": "14h",
              "kategoria": "Gablota",
              "produkt": "Zamykana gablota magnetyczna 140 × 100 cm, szkło hartowane – Gabloty.com (GCS)",
              "parametry": "Gablota ogłoszeniowa zamykana, szkło hartowane, 140 × 100 cm",
              "ilosc": 1,
              "cena_szt_brutto": 1560.87,
              "wartosc_brutto": 1560.87,
              "sklep": "Gabloty.com",
              "dostepnosc": null,
              "dostawa": null,
              "link": "https://gabloty.com/gabloty-ogloszeniowe-gcs/8753-gablota-ogloszeniowa-gcs-140x100cm-szklo-hartowane.html",
              "uwagi": "Do ekspozycji prac uczniów w pracowni handlowej (drugi komplet obok wyposażenia maturalnego, pozycja 14). Dostępność i dostawę potwierdzić w sklepie.",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Nowa pozycja (16.11.2026).",
              "kontroferty": [],
              "cena_szt_netto": 1269.0,
              "vat": 0.23
            }
          ]
        },
        {
          "id": "zawodowe",
          "nazwa": "Pracownie zawodowe",
          "pozycje": [
            {
              "lp": 6,
              "kategoria": "Telewizor",
              "produkt": "Xiaomi TV Max 85 2025 85\" QLED 4K",
              "parametry": "85\", QLED 4K 144 Hz, Google TV, HDMI 2.1, Dolby Vision / Atmos",
              "ilosc": 1,
              "cena_szt_netto": 4065.03,
              "vat": 0.23,
              "cena_szt_brutto": 4999.99,
              "wartosc_brutto": 4999.99,
              "sklep": "Media Expert",
              "dostepnosc": "Dostępny, dostawa jutro / odbiór w sklepie jutro",
              "dostawa": "Darmowa",
              "link": "https://www.mediaexpert.pl/telewizory-i-rtv/telewizory/telewizor-xiaomi-max-2025-85-miniled-4k-144hz-google-tv-dolby-atmos-dolby-vision-hdmi-2-1",
              "uwagi": "Cena 4 999,99 zł brutto. Zgodność rozstawu VESA z uchwytem Goldenline (do 600×400, 50 kg) do potwierdzenia w karcie produktu.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "Media Expert – Xiaomi TV S Mini LED 2026 85\"",
                  "cena_netto": 4877.24,
                  "link": "https://www.mediaexpert.pl/telewizory-i-rtv/telewizory/telewizor-xiaomi-s-mini-2026-85-qd-mini-led-4k-144-hz-google-tv-dolby-atmos-dolby-vision-hdmi-2-1"
                }
              ]
            },
            {
              "lp": 7,
              "kategoria": "Uchwyt TV",
              "produkt": "Goldenline TM3790FMUS – uchwyt ścienny 37–90\"",
              "parametry": "Ruchomy (regulacja w pionie i poziomie), VESA do 600×400, udźwig 50 kg",
              "ilosc": 1,
              "cena_szt_netto": 325.2,
              "vat": 0.23,
              "cena_szt_brutto": 400.0,
              "wartosc_brutto": 400.0,
              "sklep": "Media Expert",
              "dostepnosc": "Dostępny",
              "dostawa": "Darmowa dostawa",
              "link": "https://www.mediaexpert.pl/telewizory-i-rtv/uchwyty-do-tv/uchwyty/uchwyt-goldenline-do-tv-37-70-tm3790fmus-pelna-regulacja-super-slim",
              "uwagi": "Pasuje do TCL 85P7L (VESA 600×400, 30,3 kg). Montaż na ścianie nośnej.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "Media Expert – ART AR-92XL 55–120\", ruchomy, 140 kg",
                  "cena_netto": 539.88,
                  "link": "https://www.mediaexpert.pl/telewizory-i-rtv/uchwyty-do-tv/uchwyty/uchwyt-art-do-tv-55-120-cali-ar-92xl-czarny"
                }
              ]
            },
            {
              "lp": 8,
              "kategoria": "Urządzenie wielofunkcyjne A4",
              "produkt": "Epson EcoTank L6570 (kolor, dolewane tusze)",
              "parametry": "A4 kolor, automatyczny druk dwustronny, ADF 50 ark. z dwustronnym skanowaniem, Wi-Fi, LAN, faks",
              "ilosc": 1,
              "cena_szt_netto": 2902.44,
              "vat": 0.23,
              "cena_szt_brutto": 3570.0,
              "wartosc_brutto": 3570.0,
              "sklep": "wmkomputer.pl",
              "dostepnosc": "Dostępne, realizacja 24h",
              "dostawa": "Do potwierdzenia w koszyku",
              "link": "https://www.wmkomputer.pl/epson-ecotank-l6570-urzadzenie-wielofunkcyjne-kolor-a4.html",
              "uwagi": "Tańszy Epson L6550 (3 225 zł brutto) – do sprawdzenia, czy też ma dwustronne skanowanie z ADF. VAT 23% – jeśli szkoła kupuje drukarki z 0%, cena spadnie.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "Media Expert – ten sam model, dostawa jutro",
                  "cena_netto": 3413.82,
                  "link": "https://www.mediaexpert.pl/komputery-i-tablety/drukarki-i-urzadzenia-biurowe/urzadzenia-wielofunkcyjne/urzadzenie-wielofunkcyjne-epson-ecotank-l6570"
                }
              ]
            },
            {
              "lp": 9,
              "kategoria": "Wentylator",
              "produkt": "Velano VELWEPR0007 – wentylator przemysłowy podłogowy 61 cm",
              "parametry": "Śmigło 61 cm, 300 W, przepływ 12 000 m³/h, 1300 obr./min, 3 prędkości, wys. 70 cm, na kółkach; 65 dB(A)",
              "ilosc": 4,
              "cena_szt_netto": 365.04,
              "vat": 0.23,
              "cena_szt_brutto": 449.0,
              "wartosc_brutto": 1796.0,
              "sklep": "Allegro (Tadek_Sprzedawca)",
              "dostepnosc": "80 szt. dostępnych, dostawa pojutrze",
              "dostawa": "Darmowa",
              "link": "https://allegro.pl/produkt/wentylator-podlogowy-velano-velwepr0007-czarny-bd697b16-68a3-46e7-a04a-9cd77fe62176",
              "uwagi": "Największy i najmocniejszy niski wentylator dostępny od ręki (kupowane 4 szt.) Cena 449 zł brutto. Przy tej mocy jest głośniejszy (65 dB).",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "Allegro – wentylator podłogowy cyrkulator metalowy, duży (dostawa ok. 89 dni)",
                  "cena_netto": 460.16,
                  "link": "https://allegro.pl/produkt/wentylator-podlogowy-mocny-duzy-cyrkulator-powietrza-wiatrak-przemyslowy-5a8f1114-824c-49eb-9d71-a4ddc8445f5f"
                },
                {
                  "opis": "Allegro – BVN BSMS 600, wentylator osiowy 612 mm, 8000 m³/h",
                  "cena_netto": 910.52,
                  "link": "https://allegro.pl/produkt/wentylator-osiowy-bvn-bsms-600-612-mm-56215fff-6878-4254-8e60-3f73e3e7df0a"
                }
              ]
            },
            {
              "lp": 10,
              "kategoria": "Szafa",
              "produkt": "Szafa (pozycja budżetowa)",
              "parametry": "Cena 800 zł brutto/szt. – podana przez szkołę",
              "ilosc": 12,
              "cena_szt_netto": 650.41,
              "vat": 0.23,
              "cena_szt_brutto": 800.0,
              "wartosc_brutto": 9600.0,
              "sklep": "Do ustalenia",
              "dostepnosc": null,
              "dostawa": null,
              "link": null,
              "uwagi": null,
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            }
          ]
        },
        {
          "id": "gastronomiczna",
          "nazwa": "Pracownia gastronomiczno-spożywcza",
          "pozycje": [
            {
              "lp": 11,
              "kategoria": "Robot planetarny",
              "produkt": "Kenwood Titanium Chef Patissier XL KWL90.244SI",
              "parametry": "1400 W, dwie misy (7 l i 5 l), wbudowana waga, funkcja podgrzewania misy; bez blendera kielichowego (blender osobno, poz. 11a)",
              "ilosc": 1,
              "cena_szt_netto": 3088.62,
              "vat": 0.23,
              "cena_szt_brutto": 3799.0,
              "wartosc_brutto": 3799.0,
              "sklep": "Media Expert",
              "dostepnosc": "Do potwierdzenia",
              "dostawa": "Do potwierdzenia w koszyku",
              "link": "https://www.mediaexpert.pl/p/2465264",
              "uwagi": "Wybór szkoły 16.11.2026 zamiast gastronomicznego miksera 7 l i domowego Prospero+. Cena 3 799 zł brutto to cena sugerowana z karty Media Expert (z wyszukiwarki), do potwierdzenia. Wariant KWL90.124SI ma wg opisu Morele wbudowany blender kielichowy 1,6 l (patrz kontroferta): jeśli to się potwierdzi, można go kupić zamiast tego robota i osobnego blendera.",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Zmiana 16.11.2026: poprzednio Hendi 222829 7 l (2 324,25 zł netto) i Kenwood Prospero+ 4,3 l.",
              "kontroferty": [
                {
                  "opis": "mediamarkt.pl – Kenwood Titanium Chef Patissier XL KWL90.124SI: waga, podgrzewanie, misy 7 l i 5 l, wg Morele z blenderem kielichowym 1,6 l w zestawie; cena orientacyjna 3 599 zł brutto, potwierdzić zawartość zestawu",
                  "cena_netto": 2926.02,
                  "link": "https://mediamarkt.pl/pl/product/_robot-planetarny-kenwood-chef-patissier-xl-kwl90124si-srebrny-1490897.html"
                }
              ]
            },
            {
              "lp": "11a",
              "kategoria": "Blender kielichowy do robota",
              "produkt": "Kenwood KAH359GL – blender szklany ThermoResist 1,6 l",
              "parametry": "Nakładka blender kielichowy do robotów Kenwood Chef Titanium / Chef XL Titanium (gniazdo szybkich obrotów); szkło ThermoResist do 160 °C, pojemność 1,6 l wg większości sklepów (Coolblue podaje 1,2 l), 4 ostrza",
              "ilosc": 1,
              "cena_szt_netto": 300.0,
              "vat": 0.23,
              "cena_szt_brutto": 369.0,
              "wartosc_brutto": 369.0,
              "sklep": "Kenwood Polska (kenwoodworld.com)",
              "dostepnosc": "W magazynie (wg sklepu)",
              "dostawa": "Darmowa wysyłka powyżej 120 zł",
              "link": "https://www.kenwoodworld.com/pl-pl/blender-thermoresist-kah359gl/p/KAH359GL",
              "uwagi": "Blender kupowany osobno do robota Titanium Chef Patissier XL (1 szt. do 1 robota). Mniejszego kielicha do robotów Kenwood Chef nie znalazłem: nakładki szklane KAH358GL i KAH359GL mają ten sam kielich (ok. 1,6 l). Samodzielny Kenwood Blend-X Compact BLP31 też ma jug 1,6 l, plastikowy, więc nie jest mniejszy. Zgodność z KWL90 potwierdzić w instrukcji lub u producenta. Na części stron cena 379 zł.",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Nowa pozycja (16.11.2026).",
              "kontroferty": [
                {
                  "opis": "komputronik.pl – Kenwood KAH 359GL, chwilowo niedostępny",
                  "cena_netto": 300.0,
                  "link": "https://www.komputronik.pl/product/640502/kenwood-kah-359gl.html"
                }
              ]
            },
            {
              "lp": "11b",
              "kategoria": "Mały robot planetarny",
              "produkt": "Maestro MR-557 – robot planetarny, misa 3 l, 1200 W",
              "parametry": "Najmniejszy robot planetarny, jaki znalazłem: misa ze stali nierdzewnej 3 l, trzy końcówki (ubijanie, mieszanie, wyrabianie); niemarkowy, do małych porcji",
              "ilosc": 1,
              "cena_szt_netto": 192.68,
              "vat": 0.23,
              "cena_szt_brutto": 237.0,
              "wartosc_brutto": 237.0,
              "sklep": "MediaMarkt",
              "dostepnosc": "Do potwierdzenia",
              "dostawa": "Do potwierdzenia",
              "link": "https://mediamarkt.pl/pl/product/_mikser-planetarny-maestro-mr-557-czarny-srebrny-172612739.html",
              "uwagi": "Drugi, dużo mniejszy robot do małych ilości (np. 2 żółtka). Cena 237 zł brutto z wyników wyszukiwarki; promocja MediaMarkt była ważna tylko do 19.07.2026, więc cenę potwierdzić. W Empik ok. 220 zł brutto (bez linku). Przy 2 żółtkach 3 l to nadal dużo: do tak małych porcji lepszy może być ręczny mikser. Inne małe: Bosch MUM Serie 2 MUMS2EB01 (3,8 l, 700 W), cena w PLN do sprawdzenia.",
              "data_sprawdzenia": "2026-11-16",
              "weryfikacja": "Nowa pozycja (16.11.2026).",
              "kontroferty": []
            },
            {
              "lp": 12,
              "kategoria": "Zmywarka",
              "produkt": "Bosch Serie 4 SMS4HVI14E, wolnostojąca 60 cm",
              "parametry": "14 kompletów, 230 V, AquaStop, trzecia szuflada, ExtraDry, HygienePlus",
              "ilosc": 1,
              "cena_szt_netto": 1463.41,
              "vat": 0.23,
              "cena_szt_brutto": 1799.99,
              "wartosc_brutto": 1799.99,
              "sklep": "Media Expert",
              "dostepnosc": "Dostępna – u Ciebie dziś / w sklepie jutro",
              "dostawa": "Darmowa dostawa, odbiór zużytego sprzętu",
              "link": "https://www.mediaexpert.pl/agd/zmywarki-i-akcesoria/zmywarki/zmywarka-bosch-serie-4-sms4hvi14e",
              "uwagi": "Z kodem ME0711-071226 cena 1 699 zł brutto (do 07.12.2026). Alternatywa gastronomiczna na 230 V: Hendi 230220, kosz 50×50, 3,6 kW – potrzebny osobny obwód 16 A i przyłącze wody (tylko jedna, nie zmieści się „podwójna” bez siły).",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "neonet.pl – Bosch SMS4HVW14E (wersja biała), ostatnie sztuki",
                  "cena_netto": 2031.71,
                  "link": "https://www.neonet.pl/p/1475128-zmywarka-bosch-sms4hvw14e.html"
                }
              ]
            },
            {
              "lp": 13,
              "kategoria": "Zastawa – porcelana",
              "produkt": "Lubiana Kaszub/Hel, talerz obiadowy płytki 26,5 cm",
              "parametry": "Porcelana biała, gastronomiczna, do zmywarki i mikrofali",
              "ilosc": 100,
              "cena_szt_netto": 17.07,
              "vat": 0.23,
              "cena_szt_brutto": 21.0,
              "wartosc_brutto": 2099.61,
              "sklep": "Bokono.pl",
              "dostepnosc": "Duża ilość, wysyłka 24h",
              "dostawa": "Do potwierdzenia (duże zamówienie)",
              "link": "https://bokono.pl/pl/c/Lubiana-Kaszub-Hel/1431",
              "uwagi": "Cała porcelana z jednej serii Lubiana Kaszub/Hel. Przy 100 szt. każdej pozycji zapytać Bokono o stan, rabat i koszt wysyłki palety.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 14,
              "kategoria": "Zastawa – porcelana",
              "produkt": "Lubiana Kaszub/Hel, talerz obiadowy głęboki 22,5 cm",
              "parametry": "Porcelana biała",
              "ilosc": 100,
              "cena_szt_netto": 9.76,
              "vat": 0.23,
              "cena_szt_brutto": 12.0,
              "wartosc_brutto": 1200.48,
              "sklep": "Bokono.pl",
              "dostepnosc": "Duża ilość, wysyłka 24h",
              "dostawa": "Jak wyżej",
              "link": "https://bokono.pl/Talerz-gleboki-Kaszub-Hel-Lubiana-22-5-cm/2132",
              "uwagi": null,
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 15,
              "kategoria": "Zastawa – porcelana",
              "produkt": "Lubiana Kaszub/Hel, talerz deserowy 19 cm",
              "parametry": "Porcelana biała",
              "ilosc": 100,
              "cena_szt_netto": 8.86,
              "vat": 0.23,
              "cena_szt_brutto": 10.9,
              "wartosc_brutto": 1089.78,
              "sklep": "Bokono.pl",
              "dostepnosc": "Duża ilość, wysyłka 24h",
              "dostawa": "Jak wyżej",
              "link": "https://bokono.pl/pl/p/LUBIANA-KASZUBHEL-Talerz-Deserowy-Plytki-1-Szt.-Porcelanowy-19-cm-Bialy/2136",
              "uwagi": null,
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 16,
              "kategoria": "Zastawa – porcelana",
              "produkt": "Lubiana Kaszub/Hel, bulionówka 300 ml",
              "parametry": "Porcelana biała",
              "ilosc": 100,
              "cena_szt_netto": 11.3,
              "vat": 0.23,
              "cena_szt_brutto": 13.9,
              "wartosc_brutto": 1389.9,
              "sklep": "Bokono.pl",
              "dostepnosc": "Duża ilość, wysyłka 24h",
              "dostawa": "Jak wyżej",
              "link": "https://bokono.pl/pl/p/LUBIANA-KASZUBHEL-Bulionowka-Flaczarka-Biala-Miska-Miseczka-Do-Zupy-300-ml/2151",
              "uwagi": null,
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 17,
              "kategoria": "Zastawa – porcelana",
              "produkt": "Lubiana Kaszub/Hel, spodek 16 cm do bulionówki 300 ml",
              "parametry": "Porcelana biała",
              "ilosc": 100,
              "cena_szt_netto": 5.94,
              "vat": 0.23,
              "cena_szt_brutto": 7.31,
              "wartosc_brutto": 730.62,
              "sklep": "Casa Mia (sklep.casa-mia.pl)",
              "dostepnosc": "Dostępny online",
              "dostawa": "Darmowa od 200 zł",
              "link": "https://sklep.casa-mia.pl/spodki-porcelanowe/2779-lubiana-kaszubhel-spodek-16-cm-dla-bulionowki-300-ml-5900245002539.html",
              "uwagi": "Bokono nie ma spodków w tej serii.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 18,
              "kategoria": "Zastawa – porcelana",
              "produkt": "Lubiana Kaszub/Hel, filiżanka 200 ml",
              "parametry": "Porcelana biała",
              "ilosc": 100,
              "cena_szt_netto": 9.61,
              "vat": 0.23,
              "cena_szt_brutto": 11.82,
              "wartosc_brutto": 1182.03,
              "sklep": "Bokono.pl",
              "dostepnosc": "Duża ilość, wysyłka 24h",
              "dostawa": "Jak wyżej",
              "link": "https://bokono.pl/pl/p/LUBIANA-KASZUBHEL-Filizanka-Do-Kawy-Herbaty-Porcelana-Biala-Ceramika-200ml/2163",
              "uwagi": null,
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "Casa Mia – filiżanka Kaszub/Hel 0,2 l",
                  "cena_netto": 11.95,
                  "link": "https://sklep.casa-mia.pl/"
                }
              ]
            },
            {
              "lp": 19,
              "kategoria": "Zastawa – porcelana",
              "produkt": "Lubiana Kaszub/Hel, spodek 15 cm pod filiżankę",
              "parametry": "Porcelana biała",
              "ilosc": 100,
              "cena_szt_netto": 6.7,
              "vat": 0.23,
              "cena_szt_brutto": 8.24,
              "wartosc_brutto": 824.1,
              "sklep": "Casa Mia (sklep.casa-mia.pl)",
              "dostepnosc": "Dostępny online",
              "dostawa": "Darmowa od 200 zł",
              "link": "https://sklep.casa-mia.pl/spodki-porcelanowe/203-lubiana-spodek-pod-filizanke-kaszubhel-15-cm-5900245042979.html",
              "uwagi": "Dopasowanie do filiżanki 200 ml potwierdzić ze sklepem.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 20,
              "kategoria": "Zastawa – szkło",
              "produkt": "Krosno Basic, szklanka long drink 300 ml – komplet 6 szt.",
              "parametry": "17 kompletów = 102 szt.; szkło bezołowiowe, do zmywarki",
              "ilosc": 17,
              "cena_szt_netto": 20.24,
              "vat": 0.23,
              "cena_szt_brutto": 24.9,
              "wartosc_brutto": 423.22,
              "sklep": "Krosno (sklep producenta)",
              "dostepnosc": "Wysyłka w dniu zamówienia lub następnym",
              "dostawa": "1–2 dni robocze",
              "link": "https://krosno.com/products/szklanki-long-drink-basic-300ml",
              "uwagi": "Sklep obsługuje też klientów hurtowych – zapytać o rabat.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 21,
              "kategoria": "Zastawa – sztućce",
              "produkt": "Łyżka stołowa Luca 198 mm – op. 12 szt.",
              "parametry": "Stal nierdzewna 18/10, gastronomiczna; 9 op. = 108 szt.",
              "ilosc": 9,
              "cena_szt_netto": 137.44,
              "vat": 0.23,
              "cena_szt_brutto": 169.05,
              "wartosc_brutto": 1521.46,
              "sklep": "Prime Gastro (GGM)",
              "dostepnosc": "W magazynie, realizacja 2–6 dni rob.",
              "dostawa": "Darmowa od 200 zł",
              "link": "https://primegastro.pl/products/12-sztuk-lyzka-stolowa-luca-20-8-cm",
              "uwagi": "Całe sztućce z jednej serii Luca.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 22,
              "kategoria": "Zastawa – sztućce",
              "produkt": "Widelec stołowy Luca 200 mm – op. 12 szt.",
              "parametry": "Stal 18/10; 9 op. = 108 szt.",
              "ilosc": 9,
              "cena_szt_netto": 137.44,
              "vat": 0.23,
              "cena_szt_brutto": 169.05,
              "wartosc_brutto": 1521.46,
              "sklep": "Prime Gastro (GGM)",
              "dostepnosc": "W magazynie, realizacja 2–6 dni rob.",
              "dostawa": "Darmowa od 200 zł",
              "link": "https://primegastro.pl/products/12-sztuk-widelec-stolowy-luca-20-cm",
              "uwagi": null,
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 23,
              "kategoria": "Zastawa – sztućce",
              "produkt": "Nóż stołowy (obiadowy) Luca 244 mm – op. 12 szt.",
              "parametry": "Stal nierdzewna; 9 op. = 108 szt.",
              "ilosc": 9,
              "cena_szt_netto": 167.99,
              "vat": 0.23,
              "cena_szt_brutto": 206.63,
              "wartosc_brutto": 1859.65,
              "sklep": "Prime Gastro (GGM)",
              "dostepnosc": "W magazynie, realizacja 2–6 dni rob.",
              "dostawa": "Darmowa",
              "link": "https://primegastro.pl/en/products/12-sztuk-noz-stolowy-luca-24-4-cm",
              "uwagi": null,
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 24,
              "kategoria": "Zastawa – sztućce",
              "produkt": "Łyżeczka deserowa Luca 140 mm – op. 12 szt.",
              "parametry": "Stal 18/10; 9 op. = 108 szt.",
              "ilosc": 9,
              "cena_szt_netto": 114.52,
              "vat": 0.23,
              "cena_szt_brutto": 140.86,
              "wartosc_brutto": 1267.74,
              "sklep": "Prime Gastro (GGM)",
              "dostepnosc": "W magazynie, realizacja 2–6 dni rob.",
              "dostawa": "Darmowa od 200 zł",
              "link": "https://primegastro.pl/en/products/12-sztuk-lyzeczka-deserowa-luca-14-cm",
              "uwagi": "W serii nie ma osobnej łyżeczki do herbaty – łyżeczka deserowa 14 cm pełni tę rolę.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 25,
              "kategoria": "Zastawa – sztućce",
              "produkt": "Widelczyk deserowy Luca 140 mm – op. 12 szt.",
              "parametry": "Stal 18/10; 9 op. = 108 szt.",
              "ilosc": 9,
              "cena_szt_netto": 114.52,
              "vat": 0.23,
              "cena_szt_brutto": 140.86,
              "wartosc_brutto": 1267.74,
              "sklep": "Prime Gastro (GGM)",
              "dostepnosc": "W magazynie, realizacja 2–6 dni rob.",
              "dostawa": "Darmowa od 200 zł",
              "link": "https://primegastro.pl/en/products/12-sztuk-widelec-deserowy-luca-14-cm",
              "uwagi": null,
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 26,
              "kategoria": "Szafa metalowa",
              "produkt": "Umstahl – szafa metalowa aktowa M 2OLA 1000 MAG (EXPRESS 24H)",
              "parametry": "100 × 42 × 200 cm; drzwi skrzydłowe, zamek z 2 kluczami, ryglowanie 3-punktowe, 4 półki; gwarancja 6 lat",
              "ilosc": 6,
              "cena_szt_netto": 1288.0,
              "vat": 0.23,
              "cena_szt_brutto": 1584.24,
              "wartosc_brutto": 9505.44,
              "sklep": "umstahl.pl",
              "dostepnosc": "41 szt. w magazynie, dostawa 24–48 h",
              "dostawa": "Kurier 196,80 zł brutto",
              "link": "https://umstahl.pl/szafa-metalowa-aktowa-m-2ola-1000-24h,id476.html",
              "uwagi": "Cena 1 584,24 zł brutto. Głębsze szafy (50–60 cm) w rozmiarze ok. 2 × 1 m nie były dostępne od ręki w 6 szt. Na Allegro tańsza Malow SBM 203 (43,5 cm, 1 134 zł netto, dostawa ok. 23.11).",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "umstahl.pl – M 2OLA 1000 (wersja standardowa, bez Express)",
                  "cena_netto": 1400.0,
                  "link": "https://umstahl.pl/szafa-metalowa-aktowa-m-2ola-1000,id53.html"
                },
                {
                  "opis": "umstahl.pl – M 2OLA 1000 + skrytka",
                  "cena_netto": 1560.0,
                  "link": "https://umstahl.pl/szafa-metalowa-aktowa-m-2ola-1000-sk,id54.html"
                }
              ]
            },
            {
              "lp": 27,
              "kategoria": "Podgrzewacz (bemar na pastę)",
              "produkt": "Technica – podgrzewacz gastronomiczny na pastę/paliwo GN 1/1 9 l – zestaw 2 szt.",
              "parametry": "Stal nierdzewna, 605 × 370 × 240 mm; w zestawie 2 pojemniki GN 1/1 65 mm, 2 pokrywy, 4 pojemniki na pastę; 2 zestawy = 4 szt.",
              "ilosc": 2,
              "cena_szt_netto": 213.98,
              "vat": 0.23,
              "cena_szt_brutto": 263.2,
              "wartosc_brutto": 526.39,
              "sklep": "Allegro (Technica – oficjalny sklep)",
              "dostepnosc": "309 szt. dostępnych, dostawa pojutrze",
              "dostawa": "Darmowa",
              "link": "https://allegro.pl/oferta/podgrzewacz-gastronomiczny-na-paste-paliwo-zestaw-2szt-gn-1-1-9l-technica-17464321523",
              "uwagi": "Cena 263,19 zł brutto za zestaw 2 szt. Pasta paliwowa kupowana osobno (np. Hendi 194357, 6 × 200 g, ok. 25 zł).",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "Allegro – 2 × pojedynczy podgrzewacz Technica GN 1/1 9 l (cena za 2 szt.)",
                  "cena_netto": 218.57,
                  "link": "https://allegro.pl/produkt/podgrzewacz-gastronomiczny-technica-9-l-srebrny-model-silver-line-685ad1fd-c705-4bd2-9443-de391b377c9a"
                },
                {
                  "opis": "Allegro – 2 × Hendi podgrzewacz na pastę GN 1/1 9 l (cena za 2 szt.)",
                  "cena_netto": 403.5,
                  "link": "https://allegro.pl/listing?string=hendi%20podgrzewacz%20na%20past%C4%99%20GN%201%2F1"
                }
              ]
            },
            {
              "lp": 28,
              "kategoria": "Patera na ciasto",
              "produkt": "Patera Rita Lubiana 30 cm",
              "parametry": "Porcelana, biała, śr. 30 cm",
              "ilosc": 4,
              "cena_szt_netto": 21.13,
              "vat": 0.23,
              "cena_szt_brutto": 25.99,
              "wartosc_brutto": 103.96,
              "sklep": "Bokono",
              "dostepnosc": "Na wyczerpaniu, wysyłka 24 h",
              "dostawa": "Od 15,99 zł",
              "link": "https://bokono.pl/pl/p/Patera-Rita-Lubiana-30-cm/8891",
              "uwagi": "Status „na wyczerpaniu” – zamówić szybko. Cena 25,99 zł brutto.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "Bokono – patera z falbanką 32 cm Jasło",
                  "cena_netto": 58.53,
                  "link": "https://bokono.pl/pl/p/Patera-z-falbanka-32-cm-Jaslo/6088"
                },
                {
                  "opis": "Allegro – patera na nóżce Wilmax England Diamond 30,5 cm",
                  "cena_netto": 130.07,
                  "link": "https://allegro.pl/oferta/patera-na-ciasto-biala-porcelanowa-na-nozce-30x10cm-wilmax-zloty-rant-dekor-18777435880"
                }
              ]
            },
            {
              "lp": 29,
              "kategoria": "Łopatka do ciasta",
              "produkt": "Łopatka do tortu – spiczasta – 250 mm (THSL)",
              "parametry": "Stal nierdzewna, 250 mm",
              "ilosc": 4,
              "cena_szt_netto": 66.15,
              "vat": 0.23,
              "cena_szt_brutto": 81.36,
              "wartosc_brutto": 325.46,
              "sklep": "Prime Gastro (GGM)",
              "dostepnosc": "W magazynie, realizacja 2–6 dni rob.",
              "dostawa": "Darmowa od 200 zł",
              "link": "https://primegastro.pl/products/serwer-do-ciasta-spiczasty-wzor",
              "uwagi": "Tańsza łopatka Patisse 26 cm (Allegro, 21,79 zł netto) jest dostępna tylko w 1 szt.",
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": [
                {
                  "opis": "Bokono – łopatka do ciasta z suwakiem Zyliss",
                  "cena_netto": 72.36,
                  "link": "https://bokono.pl/pl/p/Lopatka-do-ciasta-z-suwakiem-Zyliss/12622"
                }
              ]
            }
          ]
        },
        {
          "id": "fryzjerska",
          "nazwa": "Pracownia fryzjerska",
          "pozycje": [
            {
              "lp": 30,
              "kategoria": "Pomocnik fryzjerski",
              "produkt": "Pomocnik fryzjerski drewniany",
              "parametry": "Cena 1000 zł brutto/szt. – podana przez szkołę",
              "ilosc": 4,
              "cena_szt_netto": 813.01,
              "vat": 0.23,
              "cena_szt_brutto": 1000.0,
              "wartosc_brutto": 4000.0,
              "sklep": "Do ustalenia",
              "dostepnosc": null,
              "dostawa": null,
              "link": null,
              "uwagi": null,
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            },
            {
              "lp": 31,
              "kategoria": "Suszarka do włosów",
              "produkt": "Suszarka do włosów",
              "parametry": "Cena 500 zł brutto/szt. – podana przez szkołę",
              "ilosc": 6,
              "cena_szt_netto": 406.5,
              "vat": 0.23,
              "cena_szt_brutto": 500.0,
              "wartosc_brutto": 3000.0,
              "sklep": "Do ustalenia",
              "dostepnosc": null,
              "dostawa": null,
              "link": null,
              "uwagi": null,
              "data_sprawdzenia": "2026-11-16",
              "kontroferty": []
            }
          ]
        }
      ]
    }
  ]
};
