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
- `kpoDelivery` – sprzęt otrzymany w ramach KPO (nazwa i liczba sztuk), pokazany w panelu pod listą sal,
- `purchaseItems` i `purchaseTiers` – lista zakupów (zakładka „Do zakupu”): pozycje, ilości, sale (`roomIds`), sale priorytetowe (`priorityRoomIds`), podział na „Do kupienia” oraz „Lista życzeń” i opcjonalne `offers` (przykładowy model, link do sklepu, ceny netto/brutto i pole `zeroVat`: `true` – VAT 0% pewny, `false` – niemożliwy, `"unknown"` – do potwierdzenia). Pozycje z przypisanymi salami trafiają automatycznie na karty tych sal, do grupy „Do zakupu”, a w salach priorytetowych także do „Pilnych zakupów i dostaw”.

Zasady opisu (też w komentarzu na początku pliku): zadania i decyzje zaczynają się wielką literą, nie kończą kropką i są zapisane bezokolicznikiem; sprzęt zapisujemy jako „Nazwa (cecha, cecha)”; grupy wyposażenia pochodzą ze stałej listy `G`, więc w każdej sali występują w tej samej kolejności.

## Nawigacja

- zakładki „Sale” i „Do zakupu” nad treścią przełączają widok; lista zakupów ma adres `#zakupy` i własny wydruk,
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
