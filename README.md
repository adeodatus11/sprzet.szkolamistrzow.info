# Sprzęt i wyposażenie sal

Statyczna strona dla Zespołu Szkół Zawodowych nr 5 we Wrocławiu. Zawiera roboczą listę wyposażenia sal, zadania do sprawdzenia oraz widok wydruku pojedynczej sali.

## Lokalnie

```bash
npm install
npm start
```

Strona działa pod adresem `http://localhost:8788/`.

## Dane

Dane sal są w pliku `equipment-data.js`. Każda sala ma identyfikator, lokalizację, status, użytkowników, grupy wyposażenia, zadania i uwagi.

## Publikacja

Repozytorium publikuje się przez GitHub Pages z gałęzi `main` i katalogu głównego. Plik `CNAME` ustawia domenę:

```text
sprzet.szkolamistrzow.info
```
