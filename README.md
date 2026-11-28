# Sprzęt i wyposażenie sal

Statyczna strona dla Zespołu Szkół Zawodowych nr 5 we Wrocławiu. Zawiera roboczą listę wyposażenia sal, zadania do sprawdzenia oraz widok wydruku pojedynczej sali.

## Lokalnie

```bash
npm install
npm start
```

Strona działa pod adresem `http://localhost:8788/`.

## Dane

Dane są w pliku `equipment-data.js`:

- `floors` – kolejność i nazwy pięter (Piwnica, Parter, I–III piętro, pracownie zewnętrzne); sale na liście są grupowane według tej kolejności,
- `rooms` – sale: identyfikator, piętro, przeznaczenie, użytkownicy, status, wyposażenie (grupy), pilne zakupy, zadania, decyzje i uwagi,
- `unresolvedItems` – sprawy do potwierdzenia, każda z odnośnikiem do sali,
- `kpoDelivery`, `kpoAllocations`, `otherAssets` i `kpoNotes` – sprzęt otrzymany w ramach KPO (dostarczone ilości, opcjonalna adnotacja), jego rozdysponowanie po salach (`roomId`) lub osobach (`assignee`) (`state: "placed"` – już na miejscu, `"planned"` – ma tam trafić, `"moving"` – ma zostać przeniesiony), inny sprzęt spoza KPO (np. laptopy Asus do przeniesienia) i założenia zestawienia. Z tego zakładka „Zasoby” liczy, ile sztuk jest w salach, ile przydzielono, a ile leży jeszcze w pudełkach; liczymy tylko sprzęt z KPO,
- `purchaseItems` i `purchaseTiers` – lista zakupów (zakładka „Do zakupu”): pozycje, ilości, sale (`roomIds`), sale priorytetowe (`priorityRoomIds`), podział na „Sprzęt” i „Zakupy towarzyszące” (co ewentualnie trzeba dokupić; ten sam produkt w kilku salach to jedna pozycja z kilkoma salami) i opcjonalne `offers` (przykładowy model, link do sklepu, ceny netto/brutto i pole `zeroVat`: `true` – VAT 0% pewny, `false` – niemożliwy, `"unknown"` – do potwierdzenia). Pozycje z przypisanymi salami trafiają automatycznie na karty tych sal, do grupy „Do zakupu”, a w salach priorytetowych także do „Pilnych zakupów i dostaw”.

Zasady opisu (też w komentarzu na początku pliku): zadania i decyzje zaczynają się wielką literą, nie kończą kropką i są zapisane bezokolicznikiem; sprzęt zapisujemy jako „Nazwa (cecha, cecha)”; grupy wyposażenia pochodzą ze stałej listy `G`, więc w każdej sali występują w tej samej kolejności.

## Nawigacja

- zakładki „Sale”, „Do zakupu”, „Zasoby” i „NIS2. Przepisy” nad treścią przełączają widok; lista zakupów ma adres `#zakupy`, zasoby `#zasoby`, NIS2 `#nis2`, każdy z własnym wydrukiem,
- „Zakupy listopad 2027” (`#zakupy-listopad`) to zestawienie zakupów z arkusza według działów (wyposażenie maturalne i pracownie) z linkami do sklepów, kontrofertami i sumami liczonymi z pozycji; dane są w `zakupy-data.js`, pozycja bez ceny nie wchodzi do sum,
- „Pokój nauczycielski 16” pokazuje listę zakupów do sali 16 (`pokoj16-data.js`) ze zdjęciami produktów i linkami do ofert, a pod nią plan sali wbudowany w stronę: rzut, elewacje, model 3D, kontrola przejść, zestawienie, instalacje i sprawy do ustalenia (`pokoj16-plan.js` i `pokoj16-plan.css`, wczytywane razem z three.js przy pierwszym otwarciu zakładki; przyciski nad listą przewijają do części planu). Stary adres `pn16-r7k2xq/` przekierowuje do zakładki. Zdjęcia leżą w `assets/pokoj16/`, a nowe pobiera komenda `node tools/fetch-product-images.mjs` (czyta og:image ze stron ofert, zmniejsza zdjęcia przez ImageMagick; wymaga internetu i Node 18+, za proxy `NODE_USE_ENV_PROXY=1`); plan dostaje zdjęcia z `pokoj16-data.js` przez app.js,
- „NIS2. Przepisy” to opracowanie ustawy o KSC (NIS2) dla szkoły: terminy z odliczaniem dni (liczonym od dzisiejszej daty), terminy podane przez szkołę, obowiązki stałe, roadmapa z checkboxami (zapamiętywanymi w przeglądarce), Załącznik nr 4, pytania do dalszych badań i źródła. Treść jest w `nis2-data.js`; własne terminy dopisuje się do `nis2SchoolDeadlines` (`{ id, date: "RRRR-MM-DD", title, detail }`),
- w „Do zakupu” checkboxy i przyciski +/− ilości zasilają kalkulator kosztu: cena netto jest liczona tylko przy pewnym VAT 0%, w pozostałych przypadkach brutto, a pozycje bez ceny nie wchodzą do sumy; wybór zapamiętuje przeglądarka i trafia na wydruk,
- lista sal po lewej jest pogrupowana według pięter, z przyciskami skoku do piętra,
- w karcie sali jest przełącznik pięter i sal tego piętra oraz odnośniki do poprzedniej i następnej sali,
- strzałki ← i → na klawiaturze przełączają sąsiednie sale,
- na telefonie dolny pasek ma przyciski „Poprzednia”, „Sale” (katalog) i „Następna”.

## Publikacja

Repozytorium publikuje się przez GitHub Pages z gałęzi `main` i katalogu głównego. Plik `CNAME` ustawia domenę:

```text
sprzet.szkolamistrzow.info
```
