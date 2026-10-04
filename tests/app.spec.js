import { expect, test } from "@playwright/test";

test("pokazuje listę sal i szczegóły", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Sprzęt i wyposażenie sal" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Sala 37/ })).toBeVisible();
  await page.getByRole("button", { name: /Sala 37/ }).click();
  await expect(page.getByRole("heading", { name: "Sala 37" })).toBeVisible();
  await expect(page.locator("#roomDetail").getByText("18 komputerów stacjonarnych Dell UNICEF (2022), stanowisko 15 wadliwe")).toBeVisible();
  await expect(page.locator("#roomDetail").getByText("Stała kontrola techniczna")).toBeVisible();
  await expect(page.locator("#roomDetail").getByText("przewody są zamocowane na stałe")).toBeVisible();
});

test("filtruje po wyposażeniu i statusie", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Szukaj").fill("iPad");
  await expect(page.getByRole("button", { name: /Sala 5/ })).toBeVisible();

  await page.getByLabel("Szukaj").fill("KPO");
  await expect(page.getByRole("button", { name: /Sala 17/ })).toBeVisible();

  await page.getByLabel("Szukaj").fill("");
  await page.getByLabel("Status").selectOption("ready");
  await expect(page.getByRole("button", { name: /Sala 3\b/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Sala 41/ })).toHaveCount(0);
});

test("przygotowuje widok wydruku", async ({ page }) => {
  await page.goto("/#room-41");
  await expect(page.locator(".print-sheet")).toContainText("Sala 41");
  await expect(page.locator(".print-sheet")).toContainText("Stała kontrola techniczna");
  await expect(page.locator(".print-sheet")).toContainText("Sprawdził/a");
});

test("pokazuje pilne zakupy w nowej sali 05", async ({ page }) => {
  await page.goto("/#room-05-new");
  await expect(page.locator("#roomDetail")).toContainText("Pilne zakupy i dostawy");
  await expect(page.locator("#roomDetail")).toContainText("Kupić telewizor multimedialny na ścianę");
});

test("pokazuje pracownie zewnętrzne", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Szukaj").fill("gastronomiczna");
  await expect(page.getByRole("button", { name: /Pracownia gastronomiczna/ })).toBeVisible();
  await page.getByRole("button", { name: /Pracownia gastronomiczna/ }).click();
  await expect(page.locator("#roomDetail")).toContainText("Renata Marzec");
  await expect(page.locator("#roomDetail")).toContainText("Laptop KPO (komputer nauczyciela, do wstawienia)");
  await expect(page.locator("#roomDetail")).toContainText("Wstawić laptop KPO jako komputer nauczyciela");
});

test("na telefonie lista sal jest w menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 820 });
  await page.goto("/");
  await expect(page.locator("#roomDetail").getByRole("heading", { name: "Sala 2" })).toBeVisible();
  await expect(page.locator(".mobile-room-nav")).toBeVisible();
  await expect(page.locator("#catalogDrawer")).toHaveAttribute("inert", "");
  await page.locator("#catalogToggle").click();
  await expect(page.locator("body")).toHaveClass(/catalog-open/);
  await expect(page.locator("#catalogDrawer")).not.toHaveAttribute("inert", "");
  await page.getByRole("button", { name: /Sala 44/ }).click();
  await expect(page.locator("body")).not.toHaveClass(/catalog-open/);
  await expect(page.locator("#roomDetail").getByRole("heading", { name: "Sala 44" })).toBeVisible();
});

test("na telefonie przechodzi między salami bez otwierania katalogu", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");

  await page.getByRole("button", { name: "Następna sala" }).click();
  await expect(page.locator("#roomDetail").getByRole("heading", { name: "Sala 3" })).toBeVisible();
  await expect(page.locator("#mobileRoomPosition")).toContainText("Parter · 3 z");

  await page.goBack();
  await expect(page.locator("#roomDetail").getByRole("heading", { name: "Sala 2" })).toBeVisible();

  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(widths.document).toBe(widths.viewport);
});

test("grupuje sale według pięter", async ({ page }) => {
  await page.goto("/");
  const headings = await page.locator(".floor-heading > span:first-child").allTextContents();
  expect(headings).toEqual(["Piwnica", "Parter", "I piętro", "II piętro", "III piętro", "Pracownie zewnętrzne"]);
});

test("przełącznik pięter i sal w karcie sali", async ({ page }) => {
  await page.goto("/#room-26");
  const switcher = page.getByRole("navigation", { name: "Przełączanie sal" });
  await expect(switcher.getByRole("link", { name: "26", exact: true })).toHaveAttribute("aria-current", "page");

  await switcher.getByRole("link", { name: "III piętro" }).click();
  await expect(page.locator("#roomDetail").getByRole("heading", { name: "Sala 37" })).toBeVisible();
  await expect(page).toHaveURL(/#room-37$/);

  await switcher.getByRole("link", { name: "41", exact: true }).click();
  await expect(page.locator("#roomDetail").getByRole("heading", { name: "Sala 41" })).toBeVisible();
});

test("strzałki na klawiaturze przechodzą między salami", async ({ page }) => {
  await page.goto("/#room-3");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#roomDetail").getByRole("heading", { name: "Sala 4" })).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator("#roomDetail").getByRole("heading", { name: "Sala 3" })).toBeVisible();
});

test("sprawa do potwierdzenia prowadzi do sali", async ({ page }) => {
  await page.goto("/#room-2");
  await page.locator("#openItems").getByRole("link", { name: "Sala 37" }).click();
  await expect(page.locator("#roomDetail").getByRole("heading", { name: "Sala 37" })).toBeVisible();
});

test("kafelek statusu filtruje listę", async ({ page }) => {
  await page.goto("/");
  const total = await page.locator(".room-row").count();
  const ready = await page.evaluate(async () => {
    const { rooms } = await import("/equipment-data.js");
    return rooms.filter((room) => room.status === "ready").length;
  });
  expect(ready).toBeGreaterThan(0);
  await page.locator(".stat.ready").click();
  await expect(page.locator(".room-row")).toHaveCount(ready);
  await page.locator(".stat.ready").click();
  await expect(page.locator(".room-row")).toHaveCount(total);
});

test("zakładka Do zakupu pokazuje listy zakupów", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /^Do zakupu/ }).click();
  await expect(page).toHaveURL(/#zakupy$/);
  await expect(page.getByRole("heading", { name: "Sprzęt do zakupu" })).toBeVisible();
  await expect(page.locator(".intro")).toBeHidden();
  await expect(page.locator("#roomDetail")).toBeHidden();

  const tiers = page.locator(".purchase-tier");
  await expect(tiers.nth(0)).toContainText("Sprzęt");
  await expect(tiers.nth(1)).toContainText("Zakupy towarzyszące");

  const monitors = page.locator(".purchase-card", { hasText: "Monitor interaktywny" });
  await expect(monitors.locator(".qty-value")).toHaveText("7");
  await expect(monitors).toContainText("75 cali");
  const priority = monitors.locator(".purchase-rooms > div", { hasText: "Najpierw" });
  await expect(priority.locator(".room-chip")).toHaveText(["Sala 2", "Sala 18", "Sala 41"]);
  const rest = monitors.locator(".purchase-rooms > div", { hasText: "Potem" });
  await expect(rest.locator(".room-chip")).toHaveText(["Sala 23", "Sala 30", "Sala 32", "Sala 33"]);

  await expect(page.locator(".purchase-card", { hasText: "bez ekranu dotykowego" })).toContainText("Sala 37");
  const touch = page.locator(".purchase-card", { hasText: "Monitor dotykowy" });
  await expect(touch).toContainText("27 cali");
  await expect(touch).toContainText("Sala 16");
  await expect(touch).toContainText("Do komputera do zastępstw w pokoju nauczycielskim");
  await expect(page.locator(".purchase-card", { hasText: "Monitor biurowy" })).toHaveCount(1);
  await expect(page.locator(".purchase-card", { hasText: "24 cale" })).toHaveCount(0);
  const substitutions = page.locator(".purchase-card", { hasText: "Do wyświetlania zastępstw" });
  await expect(substitutions).toContainText("Miejsce: Obok pokoju nauczycielskiego");
  await expect(substitutions).not.toContainText("Miejsce do ustalenia");
  await expect(substitutions.getByRole("link", { name: "Sala 16" })).toHaveAttribute("href", "#room-16");
  await expect(page.locator(".print-sheet")).toContainText("miejsce: obok pokoju nauczycielskiego (sala 16)");
});

test("zakładka Do zakupu otwiera się z adresu i wraca do sal", async ({ page }) => {
  await page.goto("/#zakupy");
  await expect(page.getByRole("heading", { name: "Sprzęt do zakupu" })).toBeVisible();
  await expect(page).toHaveURL(/#zakupy$/);
  await expect(page.locator(".print-sheet")).toContainText("Lista zakupów");
  await expect(page.locator(".print-sheet")).toContainText("Monitor interaktywny (75 cali), 7 szt.");

  await page.locator(".purchase-card", { hasText: "Monitor interaktywny" }).getByRole("link", { name: "Sala 41" }).click();
  await expect(page.locator("#roomDetail").getByRole("heading", { name: "Sala 41" })).toBeVisible();
  await expect(page).toHaveURL(/#room-41$/);

  await page.goBack();
  await expect(page.getByRole("heading", { name: "Sprzęt do zakupu" })).toBeVisible();

  await page.getByRole("link", { name: /^Sale/ }).first().click();
  await expect(page.locator("#roomDetail")).toBeVisible();
  await expect(page.locator(".print-sheet")).toContainText("Sala 41");
});

test("zakupy trafiają na karty wskazanych sal", async ({ page }) => {
  await page.goto("/#room-2");
  await expect(page.locator("#roomDetail .is-urgent")).toContainText("Kupić monitor interaktywny (75 cali)");
  await expect(page.locator("#roomDetail")).toContainText("Do zakupu");

  await page.goto("/#room-23");
  await expect(page.locator("#roomDetail")).toContainText("Monitor interaktywny (75 cali)");
  await expect(page.locator("#roomDetail .is-urgent")).toHaveCount(0);

  await page.goto("/#room-37");
  await expect(page.locator("#roomDetail")).toContainText("Telewizor (4K, 85–86 cali)");
  await expect(page.locator("#roomDetail")).toContainText("Komputer all-in-one (bez ekranu dotykowego)");

  await page.goto("/#room-16");
  await expect(page.locator("#roomDetail")).toContainText("Monitor dotykowy (27 cali, IPS)");
  await expect(page.locator("#roomDetail")).not.toContainText("all-in-one z ekranem");

  await page.goto("/#room-38");
  await expect(page.locator("#roomDetail")).toContainText("Telewizor (4K, 85–86 cali)");
});

test("lista zakupów odwołuje się tylko do istniejących sal", async ({ page }) => {
  await page.goto("/");
  const missing = await page.evaluate(async () => {
    const { purchaseItems, rooms } = await import("/equipment-data.js");
    const ids = new Set(rooms.map((room) => room.id));
    return purchaseItems.flatMap((item) => [...item.roomIds, ...(item.priorityRoomIds ?? [])]).filter((id) => !ids.has(id));
  });
  expect(missing).toEqual([]);
});

test("na telefonie lista zakupów mieści się w ekranie", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/#zakupy");
  await expect(page.getByRole("heading", { name: "Sprzęt do zakupu" })).toBeVisible();
  await expect(page.locator(".mobile-room-nav")).toBeHidden();

  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(widths.document).toBe(widths.viewport);
});

test("telewizor 85 cali ma link do sklepu i cenę brutto", async ({ page }) => {
  await page.goto("/#zakupy");
  const card = page.locator(".purchase-card", { hasText: "85–86 cali" });
  const link = card.getByRole("link", { name: "Hisense 85E7Q" });
  await expect(link).toHaveAttribute("href", "https://www.euro.com.pl/telewizory-led-lcd-plazmowe/hisense-telewizor-85e7q.bhtml");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(card).toContainText("2 999 zł brutto");
  await expect(card).toContainText("brak możliwości VAT 0%");
  await expect(card).not.toContainText("orientacyjn");
  await expect(page.locator(".print-sheet")).toContainText("np. Hisense 85E7Q, 2 999 zł brutto, brak możliwości VAT 0% (euro.com.pl)");
});

test("monitor interaktywny ma link do sklepu i cenę netto", async ({ page }) => {
  await page.goto("/#zakupy");
  const card = page.locator(".purchase-card", { hasText: "Monitor interaktywny" });
  const link = card.getByRole("link", { name: "iiyama ProLite TE7515A-B2AG" });
  await expect(link).toHaveAttribute("href", /^https:\/\/iiyama-sklep\.pl\/1866-.*te7515a-b2ag.*\.html$/);
  await expect(card).toContainText("7 245,53 zł netto");
  await expect(card).toContainText("VAT 0%");
  await expect(page.locator(".purchase-card", { hasText: "85–86 cali" })).not.toContainText("netto");
  await expect(page.locator(".print-sheet")).toContainText("np. iiyama ProLite TE7515A-B2AG, 7 245,53 zł netto, VAT 0% (iiyama-sklep.pl)");
});

test("monitor do zastępstw ma link bez śladów reklamowych i obie ceny", async ({ page }) => {
  await page.goto("/#zakupy");
  const card = page.locator(".purchase-card", { hasText: "Do wyświetlania zastępstw" });
  await expect(card).toContainText("Monitor wielkoformatowy");
  await expect(card).toContainText("43 cale");
  await expect(card).toContainText("2 058 zł brutto");
  await expect(card).toContainText("1 673,17 zł netto");
  await expect(card).toContainText("VAT 0% do potwierdzenia");
  const href = await card.getByRole("link", { name: "iiyama ProLite LH4341UHS-B2" }).getAttribute("href");
  expect(href).toMatch(/^https:\/\/iiyama-sklep\.pl\/1208-.*lh4341uhs-b2.*\.html$/);
  expect(href).not.toMatch(/gclid|utm_/);
  await expect(page.locator(".print-sheet")).toContainText("np. iiyama ProLite LH4341UHS-B2, 2 058 zł brutto / 1 673,17 zł netto, VAT 0% do potwierdzenia (iiyama-sklep.pl)");
});

test("monitor dotykowy do pokoju nauczycielskiego ma link i obie ceny", async ({ page }) => {
  await page.goto("/#zakupy");
  const card = page.locator(".purchase-card", { hasText: "Monitor dotykowy" });
  await expect(card.getByRole("link", { name: "iiyama ProLite T2755MSC-B1" })).toHaveAttribute("href", /^https:\/\/iiyama-sklep\.pl\/1182-.*t2755msc-b1.*\.html$/);
  await expect(card).toContainText("1 840 zł brutto / 1 495,93 zł netto");
  await expect(card).toContainText("VAT 0% do potwierdzenia");
  await expect(page.locator(".print-sheet")).toContainText("np. iiyama ProLite T2755MSC-B1, 1 840 zł brutto / 1 495,93 zł netto, VAT 0% do potwierdzenia (iiyama-sklep.pl)");
});

test("komputer all-in-one ma link do sklepu i cenę", async ({ page }) => {
  await page.goto("/#zakupy");
  const card = page.locator(".purchase-card", { hasText: "bez ekranu dotykowego" });
  const link = card.getByRole("link", { name: /Lenovo IdeaCentre AIO 27/ });
  await expect(link).toHaveAttribute("href", /^https:\/\/www\.x-kom\.pl\/p\/1521521-.*\.html$/);
  await expect(card).toContainText("4 049 zł brutto");
  await expect(card).not.toContainText("VAT 0%");
  await expect(page.locator(".print-sheet")).toContainText("np. Lenovo IdeaCentre AIO 27 (Ultra 5 226V, 16 GB, 512 GB), 4 049 zł brutto (x-kom.pl)");
});

test("monitor biurowy ma link i ceny brutto oraz netto", async ({ page }) => {
  await page.goto("/#zakupy");
  const card = page.locator(".purchase-card", { hasText: "Monitor biurowy" });
  await expect(card).toContainText("34 cale");
  await expect(card.getByRole("link", { name: "Philips 5000 Series 34B2U5900C/00" })).toHaveAttribute("href", /^https:\/\/supertech\.pl\/produkt\/philips_5000_series_34b2u5900c_00.*\.html$/);
  await expect(card).toContainText("2 510,99 zł brutto / 2 041,46 zł netto");
  await expect(card).toContainText("VAT 0%");
  await expect(card).not.toContainText("do potwierdzenia");
  await expect(page.locator(".print-sheet")).toContainText("np. Philips 5000 Series 34B2U5900C/00, 2 510,99 zł brutto / 2 041,46 zł netto, VAT 0% (supertech.pl)");
});

const card = (page, text) => page.locator(".purchase-card", { hasText: text });

test("jedna lista: dwie kategorie, powtarzający się produkt ma kilka miejsc", async ({ page }) => {
  await page.goto("/#zakupy");
  const tiers = page.locator(".purchase-tier");
  await expect(tiers).toHaveCount(2);
  await expect(tiers.nth(0)).toContainText("Sprzęt");
  await expect(tiers.nth(1)).toContainText("Zakupy towarzyszące");
  await expect(page.locator("body")).not.toContainText("Lista życzeń");
  await expect(page.locator("body")).not.toContainText("Do kupienia");

  // ten sam telewizor w sali 37 i 38 to jedna karta z dwiema salami
  const tv = card(page, "85–86 cali");
  await expect(page.locator(".purchase-card", { hasText: "85–86 cali" })).toHaveCount(1);
  await expect(tv.locator(".qty-value")).toHaveText("2");
  await expect(tv.locator(".room-chip")).toHaveText(["Sala 37", "Sala 38"]);
  await expect(tv).toContainText("Do sali 38 ma być wersja 86 cali");
  await expect(page.locator(".purchase-card", { hasText: "86 cali" }).filter({ hasNotText: "85–86" })).toHaveCount(0);
});

test("zakupy towarzyszące: kabel HDMI i uchwyty VESA", async ({ page }) => {
  await page.goto("/#zakupy");
  const accessories = page.locator(".purchase-tier").nth(1);
  await expect(accessories.locator(".purchase-card")).toHaveCount(3);

  const hdmi = card(page, "Kabel HDMI światłowodowy");
  await expect(hdmi).toContainText("25 m");
  await expect(hdmi.locator(".qty-value")).toHaveText("9");
  await expect(hdmi.locator(".room-chip")).toHaveText(["Sala 2", "Sala 18", "Sala 23", "Sala 30", "Sala 32", "Sala 33", "Sala 41", "Sala 37", "Sala 38"]);

  const vesaMonitors = card(page, "Stojak do monitora interaktywnego");
  await expect(vesaMonitors).toContainText("VESA 800 × 400");
  await expect(vesaMonitors).toContainText("54,6 kg");
  await expect(vesaMonitors.locator(".qty-value")).toHaveText("7");
  await expect(vesaMonitors.locator(".room-chip")).toHaveCount(7);

  const vesaTv = card(page, "Uchwyt VESA do telewizora");
  await expect(vesaTv).toContainText("VESA 600 × 400");
  await expect(vesaTv.locator(".qty-value")).toHaveText("2");
  await expect(vesaTv.locator(".room-chip")).toHaveText(["Sala 37", "Sala 38"]);

  // monitor dotykowy, all-in-one i pozostałe monitory nie mają akcesoriów
  for (const room of ["16"]) {
    await page.goto(`/#room-${room}`);
    await expect(page.locator("#roomDetail")).not.toContainText("Kabel HDMI");
    await expect(page.locator("#roomDetail")).not.toContainText("Uchwyt VESA");
    await expect(page.locator("#roomDetail")).not.toContainText("Stojak");
  }
  await page.goto("/#room-2");
  await expect(page.locator("#roomDetail")).toContainText("Kabel HDMI światłowodowy (25 m)");
  await expect(page.locator("#roomDetail")).toContainText("Stojak do monitora interaktywnego (na kółkach, VESA 800 × 400)");
  await page.goto("/#room-38");
  await expect(page.locator("#roomDetail")).toContainText("Telewizor (4K, 85–86 cali)");
  await expect(page.locator("#roomDetail")).toContainText("Uchwyt VESA do telewizora (VESA 600 × 400)");
  await expect(page.locator("#roomDetail")).toContainText("Kabel HDMI światłowodowy (25 m)");
});

test("kalkulator: domyślnie liczy wszystkie pozycje", async ({ page }) => {
  await page.goto("/#zakupy");
  // 8 × 7 245,53 (netto, VAT 0%) + 2 × 2 999 + 1 840 + 4 049 + 2 058 + 3 612 (brutto, VAT niepewny) + 2 041,46 (netto, VAT 0%)
  await expect(page.locator("#calcTotal")).toHaveText("75 204,07 zł");
  await expect(page.locator("#calcMeta")).toHaveText("Zaznaczone: 14 poz. · 43 szt.");
  await expect(page.locator("#calcBreakdown")).toContainText("Sprzęt");
  await expect(page.locator("#calcBreakdown")).toContainText("70 317,17 zł");
  await expect(page.locator("#calcBreakdown")).toContainText("Zakupy towarzyszące");
  await expect(page.locator("#calcBreakdown")).toContainText("4 886,90 zł");

  const boxes = page.locator(".purchase-check");
  await expect(boxes).toHaveCount(14);
  for (const box of await boxes.all()) await expect(box).toBeChecked();

  await expect(card(page, "Monitor interaktywny").locator(".calc-line")).toHaveText("Do sumy: 7 245,53 zł netto × 7 = 50 718,71 zł");
  await expect(card(page, "85–86 cali").locator(".calc-line")).toHaveText("Do sumy: 2 999,00 zł brutto × 2 = 5 998,00 zł");
  // VAT 0% do potwierdzenia: liczone brutto
  await expect(card(page, "Monitor dotykowy").locator(".calc-line")).toHaveText("Do sumy: 1 840,00 zł brutto × 1 = 1 840,00 zł");
  await expect(card(page, "Monitor wielkoformatowy").locator(".calc-line")).toHaveText("Do sumy: 2 058,00 zł brutto × 1 = 2 058,00 zł");
  await expect(card(page, "Monitor prezentacyjny").locator(".calc-line")).toHaveText("Do sumy: 3 612,00 zł brutto × 1 = 3 612,00 zł");
  // VAT 0% pewny: liczone netto
  await expect(card(page, "Monitor biurowy").locator(".calc-line")).toHaveText("Do sumy: 2 041,46 zł netto × 1 = 2 041,46 zł");

  await expect(card(page, "Uchwyt VESA do telewizora").locator(".calc-line")).toHaveText("Do sumy: 299,97 zł brutto × 2 = 599,94 zł");

  await expect(card(page, "Kabel HDMI światłowodowy").locator(".calc-line")).toHaveText("Do sumy: 189,99 zł brutto × 9 = 1 709,91 zł");

  await expect(card(page, "Stojak do monitora interaktywnego").locator(".calc-line")).toHaveText("Do sumy: 368,15 zł brutto × 7 = 2 577,05 zł");

  // szafa na iPady nie ma jeszcze ceny: nie wchodzi do sumy, a ostrzeżenie ją wymienia
  await expect(card(page, "Szafa do ładowania iPadów").locator(".calc-line")).toHaveText("Brak ceny, pozycja nie wchodzi do sumy");
  await expect(page.locator("#calcWarning")).toContainText("Bez ceny, nie wliczono do sumy: Szafa do ładowania iPadów (na 26–30 iPadów)");
});

test("kalkulator: odznaczanie pozycji", async ({ page }) => {
  await page.goto("/#zakupy");
  await card(page, "Monitor biurowy").getByRole("checkbox").uncheck();
  await expect(page.locator("#calcTotal")).toHaveText("73 162,61 zł");
  await card(page, "Monitor prezentacyjny").getByRole("checkbox").uncheck();
  await expect(page.locator("#calcTotal")).toHaveText("69 550,61 zł");
  await card(page, "Monitor interaktywny").getByRole("checkbox").uncheck();
  await expect(page.locator("#calcTotal")).toHaveText("18 831,90 zł");
  await expect(page.locator("#calcMeta")).toHaveText("Zaznaczone: 11 poz. · 34 szt.");
  await expect(card(page, "Monitor interaktywny")).toHaveClass(/is-excluded/);

  await card(page, "Kabel HDMI światłowodowy").getByRole("checkbox").uncheck();
  await expect(page.locator("#calcTotal")).toHaveText("17 121,99 zł");

  await card(page, "Monitor interaktywny").getByRole("checkbox").check();
  await expect(page.locator("#calcTotal")).toHaveText("67 840,70 zł");
});

test("kalkulator: zmiana ilości", async ({ page }) => {
  await page.goto("/#zakupy");
  const monitors = card(page, "Monitor interaktywny");
  await monitors.getByRole("button", { name: "Zwiększ ilość" }).click();
  await expect(monitors.locator(".qty-value")).toHaveText("8");
  await expect(monitors.locator(".calc-line")).toHaveText("Do sumy: 7 245,53 zł netto × 8 = 57 964,24 zł");
  await expect(page.locator("#calcTotal")).toHaveText("82 449,60 zł");
  await expect(page.locator("#calcMeta")).toHaveText("Zaznaczone: 14 poz. · 44 szt.");
  await expect(page.locator(".purchase-tier").nth(0)).toContainText("11 poz. · 26 szt.");
  await expect(page.locator(".print-sheet")).toContainText("Monitor interaktywny (75 cali), 8 szt.");

  const minus = monitors.getByRole("button", { name: "Zmniejsz ilość" });
  for (let i = 0; i < 7; i += 1) await minus.click();
  await expect(monitors.locator(".qty-value")).toHaveText("1");
  await expect(minus).toHaveAttribute("aria-disabled", "true");
  await minus.click({ force: true });
  await expect(monitors.locator(".qty-value")).toHaveText("1");
  await expect(page.locator("#calcTotal")).toHaveText("31 730,89 zł");
});

test("kalkulator: zapamiętuje wybór, przyciski zaznaczają, czyszczą i przywracają domyślne", async ({ page }) => {
  await page.goto("/#zakupy");
  await card(page, "Monitor biurowy").getByRole("checkbox").uncheck();
  await card(page, "Komputer all-in-one").getByRole("button", { name: "Zwiększ ilość" }).click();
  await expect(page.locator("#calcTotal")).toHaveText("77 211,61 zł");

  await page.reload();
  await expect(card(page, "Monitor biurowy").getByRole("checkbox")).not.toBeChecked();
  await expect(card(page, "Komputer all-in-one").locator(".qty-value")).toHaveText("2");
  await expect(page.locator("#calcTotal")).toHaveText("77 211,61 zł");

  await page.locator(".calc-details summary").click();
  await page.locator("#calcClear").click();
  await expect(page.locator("#calcTotal")).toHaveText("0,00 zł");
  await expect(page.locator("#calcMeta")).toHaveText("Zaznaczone: 0 poz. · 0 szt.");
  await page.locator("#calcSelectAll").click();
  await expect(page.getByRole("checkbox", { name: /Monitor biurowy/ })).toBeChecked();

  await card(page, "Monitor biurowy").getByRole("checkbox").uncheck();
  await page.locator("#calcReset").click();
  await expect(page.locator("#calcTotal")).toHaveText("75 204,07 zł");
  await expect(card(page, "Komputer all-in-one").locator(".qty-value")).toHaveText("1");
  await expect(card(page, "Monitor biurowy").getByRole("checkbox")).toBeChecked();
});

test("kalkulator trafia na wydruk listy zakupów", async ({ page }) => {
  await page.goto("/#zakupy");
  const sheet = page.locator(".print-sheet");
  await expect(sheet).toContainText("Kalkulacja (zaznaczone pozycje)");
  await expect(sheet).toContainText("Monitor interaktywny (75 cali) × 7: 50 718,71 zł (netto)");
  await expect(sheet).toContainText("Telewizor (4K, 85–86 cali) × 2: 5 998,00 zł (brutto)");
  await expect(sheet).toContainText("Kabel HDMI światłowodowy (25 m) × 9: 1 709,91 zł (brutto)");
  await expect(sheet).toContainText("Stojak do monitora interaktywnego (na kółkach, VESA 800 × 400) × 7: 2 577,05 zł (brutto)");
  await expect(sheet).toContainText("Uchwyt VESA do telewizora (VESA 600 × 400) × 2: 599,94 zł (brutto)");
  await expect(sheet).toContainText("Razem: 75 204,07 zł");
  await expect(sheet).toContainText("Szafa do ładowania iPadów (na 26–30 iPadów) × 1: brak ceny");
  await expect(sheet).toContainText("Nie wliczono pozycji bez ceny: Szafa do ładowania iPadów (na 26–30 iPadów)");

  await page.locator(".calc-details summary").click();
  await page.locator("#calcClear").click();
  await expect(sheet).toContainText("Nie zaznaczono żadnych pozycji.");
});

test("monitor prezentacyjny jako tablica ogłoszeń ma miejsce, link i cenę brutto", async ({ page }) => {
  await page.goto("/#zakupy");
  const signage = card(page, "Monitor prezentacyjny");
  await expect(signage).toContainText("55 cali");
  await expect(signage).toContainText("Tablica ogłoszeń");
  await expect(signage).toContainText("Miejsce: Naprzeciwko portierni");
  await expect(signage).toContainText("3 612 zł brutto / 2 936,59 zł netto");
  await expect(signage).toContainText("VAT 0% do potwierdzenia");
  await expect(signage.getByRole("link", { name: "iiyama LH5564UHS-B1AG" })).toHaveAttribute("href", /^https:\/\/iiyama-sklep\.pl\/1616-.*lh5564uhs-b1ag.*\.html$/);
  await expect(page.locator(".print-sheet")).toContainText("miejsce: naprzeciwko portierni");
});

test("uchwyt VESA do telewizora ma link i cenę, a monitory interaktywne mają stojak na kółkach", async ({ page }) => {
  await page.goto("/#zakupy");
  const mount = card(page, "Uchwyt VESA do telewizora");
  const href = await mount.getByRole("link", { name: "Goldenline TM3770FMS" }).getAttribute("href");
  expect(href).toMatch(/^https:\/\/www\.mediaexpert\.pl\/.*tm3770fms.*$/);
  expect(href).not.toMatch(/gclid|gad_|gbraid/);
  await expect(mount).toContainText("299,97 zł brutto");
  await expect(mount).toContainText("60 kg");
  await expect(page.locator(".print-sheet")).toContainText("np. Goldenline TM3770FMS, 299,97 zł brutto (mediaexpert.pl)");

  const monitorMount = card(page, "Stojak do monitora interaktywnego");
  await expect(monitorMount).toContainText("Mobilny stojak na kółkach, nie uchwyt ścienny");
  await expect(monitorMount).toContainText("na kółkach");
  await expect(monitorMount).not.toContainText("Goldenline");
  await expect(monitorMount.locator(".room-chip")).toHaveCount(7);
});

test("kabel HDMI 25 m ma link bez śladów reklamowych i cenę brutto", async ({ page }) => {
  await page.goto("/#zakupy");
  const hdmi = card(page, "Kabel HDMI światłowodowy");
  const href = await hdmi.getByRole("link", { name: "Unitek kabel HDMI 25 m" }).getAttribute("href");
  expect(href).toMatch(/^https:\/\/www\.mediaexpert\.pl\/.*unitek-25-m$/);
  expect(href).not.toMatch(/gclid|gad_|gbraid/);
  await expect(hdmi).toContainText("189,99 zł brutto");
  await expect(hdmi).toContainText("25 m");
  await expect(hdmi).not.toContainText("20 m");
  await expect(page.locator(".print-sheet")).toContainText("np. Unitek kabel HDMI 25 m, 189,99 zł brutto (mediaexpert.pl)");
});

test("stojak do monitora interaktywnego ma link bez śladów reklamowych i cenę brutto", async ({ page }) => {
  await page.goto("/#zakupy");
  const stand = card(page, "Stojak do monitora interaktywnego");
  const href = await stand.getByRole("link", { name: "ART SD-22" }).getAttribute("href");
  expect(href).toMatch(/^https:\/\/www\.mediaexpert\.pl\/.*stojak-podlogowy-art-do-tv-45-90-cali-sd-22$/);
  expect(href).not.toMatch(/gclid|gad_|gbraid/);
  await expect(stand).toContainText("368,15 zł brutto");
  await expect(stand).toContainText("60 kg");
  await expect(stand).toContainText("pasuje");
  await expect(page.locator(".print-sheet")).toContainText("np. ART SD-22, 368,15 zł brutto (mediaexpert.pl)");
});

test("kalkulator pomija pozycje bez ceny i ostrzega o nich", async ({ page }) => {
  // dodatkowa pozycja bez oferty, żeby sprawdzić zachowanie kalkulatora
  await page.route("**/equipment-data.js", async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace(
      "export const purchaseItems = [",
      "export const purchaseItems = [{ id: 'test-bez-ceny', tier: 'accessories', name: 'Testowy dodatek', specs: ['bez ceny'], qty: 3, roomIds: [] },",
    );
    await route.fulfill({ response, body });
  });
  await page.goto("/#zakupy");

  const extra = card(page, "Testowy dodatek");
  await expect(extra.locator(".calc-line")).toHaveText("Brak ceny, pozycja nie wchodzi do sumy");
  await expect(page.locator("#calcTotal")).toHaveText("75 204,07 zł");
  await expect(page.locator("#calcWarning")).toBeVisible();
  await expect(page.locator("#calcWarning")).toContainText("Bez ceny, nie wliczono do sumy: Testowy dodatek (bez ceny)");
  await expect(page.locator(".print-sheet")).toContainText("Testowy dodatek (bez ceny) × 3: brak ceny");
  await expect(page.locator(".print-sheet")).toContainText("Nie wliczono pozycji bez ceny: Testowy dodatek (bez ceny)");

  await extra.getByRole("checkbox").uncheck();
  await expect(page.locator("#calcWarning")).not.toContainText("Testowy dodatek");
  await expect(page.locator("#calcWarning")).toContainText("Szafa do ładowania iPadów");
});

const doneTasks = (page) => page.locator("#roomDetail .checklist li.is-done");
const todoSection = (page) => page.locator("#roomDetail .detail-section", { has: page.getByRole("heading", { name: /^Do zrobienia/ }) });

test("sala 04 to pokój nauczycielski WF-istów z dokończonymi i otwartymi zadaniami", async ({ page }) => {
  await page.goto("/#room-04");
  const detail = page.locator("#roomDetail");
  await expect(detail.locator(".detail-purpose")).toHaveText("Pokój nauczycielski WF-istów");
  await expect(detail).toContainText("Do zrobienia · zrobione 3 z 6");
  await expect(doneTasks(page)).toHaveText([
    /Zabrać monitor z sali 04/,
    /Kupić nóżki do monitora \(ewentualnie\)/,
    /Przenieść monitor na wejście do szkoły/,
  ]);
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveText([
    "Zweryfikować, czy działa drukarka",
    "Sprawdzić, jakie są tam komputery",
    "Sprawdzić, czy komputery działają dla WF-istów",
  ]);
  await expect(detail.getByRole("heading", { name: "Wyposażenie" })).toBeVisible();
  await expect(detail).not.toContainText("Monitor (wiszący w sali)");
  // przekreślenie widać na wydruku
  await expect(page.locator(".print-sheet li.is-done")).toHaveCount(3);
});

test("sala 2: zadania odhaczone, nowy komputer i bez decyzji, monitor do kupienia", async ({ page }) => {
  await page.goto("/#room-2");
  const detail = page.locator("#roomDetail");
  await expect(doneTasks(page)).toHaveCount(3);
  await expect(detail).toContainText("Do zrobienia · zrobione 3 z 3");
  await expect(detail).toContainText("Laptop KPO (komputer nauczyciela)");
  await expect(detail).toContainText("Rzutnik (nowy)");
  await expect(detail.getByRole("heading", { name: "Decyzje" })).toHaveCount(0);
  await expect(detail.locator(".is-urgent")).toContainText("Kupić monitor interaktywny (75 cali)");
  await expect(detail.locator(".is-urgent li.is-done")).toHaveCount(0);
  await expect(detail.locator(".badge")).toHaveText("Braki");
  await expect(detail).toContainText("Stała kontrola techniczna");
});

test("sale 3, 4 i 6 są zrobione", async ({ page }) => {
  for (const [id, count] of [["3", 2], ["4", 2], ["6", 1]]) {
    await page.goto(`/#room-${id}`);
    await expect(doneTasks(page)).toHaveCount(count);
    await expect(todoSection(page).locator("li:not(.is-done)")).toHaveCount(0);
    await expect(page.locator("#roomDetail .detail-title .badge")).toHaveText("Bez zmian");
  }
  await page.goto("/#room-4");
  await expect(page.locator("#roomDetail")).toContainText("Telewizor dotykowy (65 cali, na ścianie)");
  await expect(page.locator("#roomDetail")).not.toContainText("70 cali");
});

test("sala 7 nie ma osobnego wpisu, sala 6 o niej wspomina", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-room-id="7"]')).toHaveCount(0);
  await expect(page.getByRole("button", { name: /^Sala 7\b/ })).toHaveCount(0);
  await page.goto("/#room-6");
  await expect(page.locator("#roomDetail")).toContainText("razem z salą 7");
  await expect(page.locator("#roomDetail")).toContainText("Sala 7 jest częścią tej pracowni");
});

test("sala 5: zrobione sprawdzenia, otwarte iPady, bez Wi-Fi, szafa do zakupu", async ({ page }) => {
  await page.goto("/#room-5");
  const detail = page.locator("#roomDetail");
  await expect(doneTasks(page)).toHaveText([
    /Sprawdzić telewizor dotykowy Samsung 75 cali/,
    /Sprawdzić drukarkę wielofunkcyjną A3 \(sprawdzić, czy na pewno jest w sali, czy znajduje się aktualnie u Arka Mocarskiego\)/,
  ]);
  await expect(detail).toContainText("Do zrobienia · zrobione 2 z 10");
  await expect(detail).not.toContainText("Wi-Fi");
  await expect(detail).not.toContainText("access point");
  for (const text of [
    "Dostarczyć wszystkie starsze iPady Air kupione pod tę salę",
    "Zebrać iPady Air razem z dostępnymi rysikami",
    "Przygotować iPady Air do pracy",
    "Zalogować iPady i ustawić uniwersalny PIN",
    "Zostawić iPady w sali razem z rysikami",
    "Przygotować szafę zamykaną na klucz",
    "Zapewnić w szafie listwy zasilające",
    "Wstawić do sali szafę na iPady",
  ]) {
    await expect(todoSection(page).locator("li:not(.is-done)", { hasText: text })).toHaveCount(1);
  }
  await expect(detail).toContainText("Szafa do ładowania iPadów (na 26–30 iPadów)");
  await expect(detail.getByRole("heading", { name: "Do zakupu" })).toBeVisible();
  await expect(detail).toContainText("przynieść do sali szafę na laptopy z III piętra i trzymać w niej iPady");
});

test("sala 05 (nowa): zrobione zakupy i wyposażenie bez uwag", async ({ page }) => {
  await page.goto("/#room-05-new");
  const detail = page.locator("#roomDetail");
  await expect(detail.locator(".is-urgent")).toContainText("Pilne zakupy i dostawy · zrobione 3 z 3");
  await expect(detail.locator(".is-urgent li.is-done")).toHaveText([
    /Kupić telewizor multimedialny na ścianę/,
    /Kupić ławki/,
    /Skompletować całe wyposażenie sali lekcyjnej/,
  ]);
  await expect(detail).not.toContainText("all-in-one");
  await expect(detail).not.toContainText("Kupić i zamontować białą tablicę");
  await expect(detail).toContainText("Laptop KPO (komputer nauczyciela)");
  await expect(detail).toContainText("Telewizor multimedialny (na kółkach)");
  await expect(detail).toContainText("Ławki");
  await expect(detail).toContainText("Biała tablica (do potwierdzenia)");
  await expect(detail.getByRole("heading", { name: "Uwagi" })).toHaveCount(0);
  await expect(detail.getByRole("heading", { name: "Do zakupu" })).toHaveCount(0);
  await expect(detail.locator(".badge")).toHaveText("Do zrobienia");
  // szafa na 16 laptopów/iPadów spod sali 36 i 16 laptopów KPO
  await expect(detail.locator(".equipment-group", { hasText: "Meble" })).toContainText("Szafa na 16 laptopów/iPadów (do przeniesienia spod sali 36)");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("16 laptopów KPO w konfiguracji uczniowskiej (do wstawienia do szafy)");
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveText([
    "Przenieść szafę na 16 laptopów/iPadów spod sali 36 do sali 05",
    "Wstawić do szafy 16 laptopów KPO w konfiguracji uczniowskiej",
  ]);
});

test("sala 8 bez zmian: zestaw nadal do sprawdzenia", async ({ page }) => {
  await page.goto("/#room-8");
  await expect(doneTasks(page)).toHaveCount(0);
  await expect(page.locator("#roomDetail")).toContainText("Sprawdzić, czy zestaw działa");
});

test("laptop KPO jest wpisany w salach 3, 4, 5, 05, 6, 17, 18, 19, 22", async ({ page }) => {
  for (const id of ["3", "4", "5", "05-new", "6", "17", "18", "19", "22"]) {
    await page.goto(`/#room-${id}`);
    await expect(page.locator("#roomDetail .equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO");
  }
  await page.goto("/#room-8");
  await expect(page.locator("#roomDetail .equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO (komputer nauczyciela, do wstawienia)");
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveCount(3);
  await expect(todoSection(page).locator("li").first()).toHaveText("Wstawić laptop KPO jako komputer nauczyciela");
});

test("sala 16: laptopy KPO zamiast komputerów UNICEF, pilne drukarki i monitor dotykowy", async ({ page }) => {
  await page.goto("/#room-16");
  const detail = page.locator("#roomDetail");
  await expect(detail).not.toContainText("UNICEF");
  await expect(detail.getByRole("heading", { name: "Wyposażenie" })).toBeVisible();
  await expect(detail.locator(".equipment-group")).toHaveCount(1);
  await expect(detail.locator(".equipment-group")).toContainText("Monitor dotykowy (27 cali, IPS)");

  await expect(detail.locator(".is-urgent li")).toContainText([
    "Kupić drukarkę sieciową (dostępną przez internet)",
    "Podłączyć drukarki przez sieć do 4 lub 5 laptopów w sali",
    "Kupić monitor dotykowy (27 cali, IPS)",
  ]);
  await expect(todoSection(page).locator("li")).toHaveText([
    "Zapewnić 4 sprawne stanowiska komputerowe, każde z dostępem do internetu",
    "Wstawić 4 laptopy KPO przygotowane do pracy nauczycieli, uruchamiane zawsze w trybie incognito (to jest możliwe; przygotowanie: Maciej Najwer)",
    "Sprawdzić, czy drukarki działają",
    "Zdiagnozować usterki drukarek, jeśli nie działają",
    "Zapewnić co najmniej jedną sprawną i szybką drukarkę",
  ]);
  await expect(detail).not.toContainText("Wstawić 4 komputery UNICEF");
  await expect(detail.locator(".badge").first()).toHaveText("Braki");
});

test("sala 17: zamek i zasilacz zrobione, tablety i Wi-Fi do zrobienia", async ({ page }) => {
  await page.goto("/#room-17");
  await expect(doneTasks(page)).toHaveText([
    /Wstawić zamek do jednej ze starych szafek/,
    /Zapewnić w szafce zasilanie do ładowania tabletów – kupiony zasilacz/,
  ]);
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveText([
    "Dostarczyć 32 iPady KPO",
    "Zapewnić szafę na 30 tabletów",
    "Sprawdzić Wi-Fi i internet na tabletach",
  ]);
});

test("sale 2 i 18: monitor interaktywny i stojak w pilnych zakupach", async ({ page }) => {
  for (const id of ["2", "18"]) {
    await page.goto(`/#room-${id}`);
    const urgent = page.locator("#roomDetail .is-urgent");
    await expect(urgent.locator("li")).toHaveText([
      "Kupić monitor interaktywny (75 cali)",
      "Kupić stojak do monitora interaktywnego (na kółkach, VESA 800 × 400)",
    ]);
    await expect(todoSection(page).locator("li:not(.is-done)")).toHaveCount(0);
  }
  await page.goto("/#room-18");
  await expect(doneTasks(page)).toHaveCount(3);
  await expect(page.locator("#roomDetail .detail-title .badge")).toHaveText("Braki");

  // sala 23 nie jest priorytetowa: zakupy bez pilnych
  await page.goto("/#room-23");
  await expect(page.locator("#roomDetail .is-urgent")).toHaveCount(0);
  await expect(page.locator("#roomDetail .equipment-group", { hasText: "Do zakupu" })).toContainText("Monitor interaktywny (75 cali)");
  await expect(page.locator("#roomDetail .equipment-group", { hasText: "Do zakupu" })).toContainText("Stojak do monitora interaktywnego");
});

test("priorytety zakupów: stojak i monitor dotykowy na liście", async ({ page }) => {
  await page.goto("/#zakupy");
  const stand = card(page, "Stojak do monitora interaktywnego");
  await expect(stand.locator(".purchase-rooms > div", { hasText: "Najpierw" }).locator(".room-chip")).toHaveText(["Sala 2", "Sala 18", "Sala 41"]);
  const touch = card(page, "Monitor dotykowy");
  await expect(touch.locator(".purchase-rooms > div", { hasText: "Najpierw" }).locator(".room-chip")).toHaveText(["Sala 16"]);
});

test("sala 19: wszystko zrobione, monitor interaktywny i laptop KPO", async ({ page }) => {
  await page.goto("/#room-19");
  await expect(doneTasks(page)).toHaveCount(4);
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveCount(0);
  await expect(page.locator("#roomDetail")).toContainText("Monitor interaktywny (75 cali, z pracowni AI)");
  await expect(page.locator("#roomDetail")).not.toContainText("obecnie pod salą 36");
  await expect(page.locator("#roomDetail .detail-title .badge")).toHaveText("Bez zmian");
});

test("sala 21: bez komputerów UNICEF, cztery stanowiska w czytelni", async ({ page }) => {
  await page.goto("/#room-21");
  const detail = page.locator("#roomDetail");
  await expect(detail).not.toContainText("UNICEF");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toHaveCount(0);
  await expect(todoSection(page).locator("li")).toHaveText([
    "Przygotować 4 stanowiska komputerowe w czytelni dla uczniów",
    "Podłączyć stanowiska do internetu",
    "Uporządkować i zabezpieczyć przewody przy stanowiskach",
  ]);
});

test("sala 22: zadania zrobione, laptop KPO i BenQ", async ({ page }) => {
  await page.goto("/#room-22");
  await expect(doneTasks(page)).toHaveCount(2);
  await expect(page.locator("#roomDetail")).toContainText("Monitor multimedialny BenQ (75 cali)");
  await expect(page.locator("#roomDetail")).toContainText("Na razie zostawić obecny układ");
  await expect(page.locator("#roomDetail .detail-title .badge")).toHaveText("Bez zmian");
});

test("sala 23: potrzebna szafa na 30 laptopów z zasilaniem, 26 albo 30 Chromebooków do wstawienia", async ({ page }) => {
  await page.goto("/#room-23");
  const detail = page.locator("#roomDetail");
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveText([
    "Zapewnić szafę na 30 laptopów z zasilaniem",
    "Wstawić 26 albo 30 Chromebooków, jeżeli będą dostępne",
  ]);
  await expect(doneTasks(page)).toHaveText([/Sprawdzić, czy nowy rzutnik krótkoogniskowy działa prawidłowo/]);
  await expect(detail.locator(".equipment-group", { hasText: "Docelowo" })).toContainText("26 albo 30 Chromebooków (do wstawienia, jeżeli będą dostępne)");
  await expect(detail.locator(".equipment-group", { hasText: "Do zakupu" })).toContainText("Szafa na laptopy (na 30 laptopów, z zasilaniem)");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO (komputer nauczyciela)");
  await expect(detail.locator(".equipment-group", { hasText: "Meble" })).toHaveCount(0);
  await expect(detail).not.toContainText("30 laptopów (do przygotowania)");
  await expect(detail).not.toContainText("kupiona we wrześniu");
  await expect(detail).not.toContainText("incognito");
  await expect(detail).toContainText("Nowy rzutnik krótkoogniskowy zostaje w sali");
});

test("szafa na 30 laptopów z zasilaniem do sali 23 jest na liście zakupów", async ({ page }) => {
  await page.goto("/#zakupy");
  const cabinet23 = card(page, "Szafa na laptopy");
  await expect(cabinet23.locator(".qty-value")).toHaveText("1");
  await expect(cabinet23).toContainText("na 30 laptopów");
  await expect(cabinet23).toContainText("z zasilaniem");
  await expect(cabinet23).toContainText("Do sali 23, na 26 albo 30 Chromebooków");
  await expect(cabinet23.locator(".room-chip")).toHaveText(["Sala 23"]);
  await expect(cabinet23.locator(".calc-line")).toHaveText("Brak ceny, pozycja nie wchodzi do sumy");
});

test("sala 26: połączenie sprawdzone, laptop KPO jeżeli działa", async ({ page }) => {
  await page.goto("/#room-26");
  await expect(doneTasks(page)).toHaveCount(2);
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveCount(0);
  await expect(page.locator("#roomDetail .equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO (komputer nauczyciela, jeżeli działa)");
  await expect(page.locator("#roomDetail")).toContainText("Telewizor (75 cali, na ścianie)");
  await expect(page.locator("#roomDetail")).not.toContainText("Komputer stacjonarny");
});

test("sala 27: laptop KPO działa, monitor z września i stojak do wstawienia", async ({ page }) => {
  await page.goto("/#room-27");
  const detail = page.locator("#roomDetail");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO (komputer nauczyciela, działa)");
  await expect(detail.locator(".equipment-group", { hasText: "Docelowo" })).toContainText("Monitor interaktywny (75 cali, kupiony we wrześniu 2026)");
  await expect(detail.locator(".equipment-group", { hasText: "Docelowo" })).toContainText("Stojak do monitora (kupiony)");
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveText([
    "Wstawić do sali monitor interaktywny 75 cali kupiony we wrześniu 2026",
    "Wstawić do sali kupiony stojak do monitora",
  ]);
  await expect(detail).not.toContainText("Na razie nie wstawiać żadnego sprzętu");
  await expect(detail.locator(".detail-title .badge")).toHaveText("Do zrobienia");
});

test("sala 28: tablica interaktywna, bez telewizora i rzutnika", async ({ page }) => {
  await page.goto("/#room-28");
  const detail = page.locator("#roomDetail");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO");
  await expect(detail.locator(".equipment-group", { hasText: "Sprzęt multimedialny" })).toHaveText(/Tablica interaktywna \(75 cali\)/);
  await expect(detail).not.toContainText("Telewizor");
  await expect(detail).not.toContainText("Rzutnik");
  await expect(detail.getByRole("heading", { name: "Uwagi" })).toHaveCount(0);
  await expect(doneTasks(page)).toHaveText([/Sprawdzić podłączenie komputera do tablicy interaktywnej/]);
  await expect(detail.locator(".detail-title .badge")).toHaveText("Do zrobienia");
  await expect(page.locator("#openItems")).not.toContainText("telewizor multimedialny, rzutnik");
  await expect(detail.locator(".equipment-group", { hasText: "Meble" })).toContainText("Nowa szafa na 30 komputerów (do wstawienia)");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("30 laptopów KPO w konfiguracji uczniowskiej (do wstawienia do szafy)");
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveText([
    "Wstawić do sali nową szafę na 30 komputerów",
    "Wsadzić do szafy 30 laptopów KPO z konfiguracją uczniowską",
  ]);
});

test("sale 29, 30, 32, 33: laptop KPO i zakupy monitora, stojaka (i kabla)", async ({ page }) => {
  await page.goto("/#room-29");
  let detail = page.locator("#roomDetail");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).not.toContainText("do wstawienia");
  await expect(detail.locator(".equipment-group", { hasText: "Sprzęt multimedialny" })).toContainText("Rzutnik (działa)");
  await expect(doneTasks(page)).toHaveText([/Wstawić laptop KPO/]);
  // monitor interaktywny i stojak są już kupione: tylko montaż, sala poza zapotrzebowaniem
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveText([
    "Zamontować kupiony monitor interaktywny 75 cali na kupionym stojaku",
    "Sprawdzić stabilne połączenie rzutnika z komputerem",
    "Sprawdzić, czy zestaw działa",
  ]);
  await expect(detail.locator(".equipment-group", { hasText: "Docelowo" })).toContainText("Monitor interaktywny (75 cali, kupiony)");
  await expect(detail.locator(".equipment-group", { hasText: "Docelowo" })).toContainText("Stojak do monitora (kupiony)");
  await expect(detail.locator(".equipment-group", { hasText: "Do zakupu" })).toHaveCount(0);
  await expect(detail.locator(".detail-title .badge")).toHaveText("Do zrobienia");

  await page.goto("/#room-30");
  detail = page.locator("#roomDetail");
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveText([
    "Przenieść telewizor 65 cali spod sali 36 do sali 30",
    "Zamontować telewizor wysoko nad tablicą",
    "Sprawdzić podłączenie komputera do telewizora",
  ]);
  await expect(detail).not.toContainText("Sprawdzić podłączenie komputera do rzutnika");
  await expect(detail.locator(".equipment-group", { hasText: "Sprzęt multimedialny" })).toContainText("Rzutnik");
  await expect(detail.locator(".equipment-group", { hasText: "Sprzęt multimedialny" })).not.toContainText("Telewizor");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO");
  await expect(detail.locator(".equipment-group", { hasText: "Do zakupu" })).toContainText("Monitor interaktywny (75 cali)");
  await expect(detail.locator(".equipment-group", { hasText: "Do zakupu" })).toContainText("Stojak do monitora interaktywnego");
  await expect(detail).toContainText("Rzutnik zostaje w sali");

  for (const id of ["32", "33"]) {
    await page.goto(`/#room-${id}`);
    detail = page.locator("#roomDetail");
    await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO");
    await expect(todoSection(page).locator("li:not(.is-done)")).toHaveCount(id === "32" ? 2 : 0);
    const purchases = detail.locator(".equipment-group", { hasText: "Do zakupu" });
    await expect(purchases).toContainText("Monitor interaktywny (75 cali)");
    await expect(purchases).toContainText("Kabel HDMI światłowodowy (25 m)");
    await expect(purchases).toContainText("Stojak do monitora interaktywnego");
    await expect(detail.locator(".detail-title .badge")).toHaveText("Braki");
  }
  await page.goto("/#room-32");
  await expect(doneTasks(page)).toHaveCount(2);
  await expect(page.locator("#roomDetail")).toContainText("Rzutnik (działa)");
  await page.goto("/#room-33");
  await expect(doneTasks(page)).toHaveCount(2);
  await expect(page.locator("#roomDetail")).toContainText("Telewizor (nowy)");
});

test("sala 31: wszystko zrobione, laptop KPO", async ({ page }) => {
  await page.goto("/#room-31");
  await expect(doneTasks(page)).toHaveCount(4);
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveCount(0);
  await expect(page.locator("#roomDetail .equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO");
  await expect(page.locator("#roomDetail")).not.toContainText("Komputer stacjonarny");
  await expect(page.locator("#roomDetail")).toContainText("Monitor z KPO (nowy, na kółkach)");
  await expect(page.locator("#roomDetail .detail-title .badge")).toHaveText("Bez zmian");
});

test("sala 34: laptop KPO podłączony do monitora interaktywnego", async ({ page }) => {
  await page.goto("/#room-34");
  const detail = page.locator("#roomDetail");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO");
  await expect(detail.locator(".equipment-group", { hasText: "Sprzęt multimedialny" })).toContainText("Monitor interaktywny (75 cali)");
  await expect(detail).not.toContainText("Telewizor multimedialny");
  await expect(doneTasks(page)).toHaveText([/Podłączyć laptop KPO do monitora interaktywnego/]);
  await expect(detail.getByRole("heading", { name: "Uwagi" })).toHaveCount(0);
  await expect(detail.locator(".detail-title .badge")).toHaveText("Bez zmian");
  await expect(page.locator("#openItems")).not.toContainText("telewizora multimedialnego");
});

test("sala 37: 18 stanowisk Dell, 6 biurek do dokupienia, telewizor, uchwyt i kabel", async ({ page }) => {
  await page.goto("/#room-37");
  const detail = page.locator("#roomDetail");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("18 komputerów stacjonarnych Dell UNICEF (2022), stanowisko 15 wadliwe");
  await expect(detail).not.toContainText("25 stanowisk");
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveText([
    "Dokupić biurka i dostawić 6 kolejnych stanowisk z komputerami UNICEF Dell",
    "Znaleźć pozostałe 7 komputerów Dell UNICEF (z 25 kupionych w 2022) i dostarczyć je do sali 37",
    "Wymienić komputer na stanowisku 15",
    "Przekazać wadliwy komputer ze stanowiska 15 Maciejowi Najwerowi",
    "Przygotować stanowisko nauczyciela (komputer all-in-one)",
    "Zapewnić internet kablowy na wszystkich stanowiskach",
    "Dodać drukarkę A4, najlepiej z duplexem",
  ]);
  const purchases = detail.locator(".equipment-group", { hasText: "Do zakupu" });
  for (const item of [
    "Telewizor (4K, 85–86 cali)",
    "Komputer all-in-one (bez ekranu dotykowego)",
    "Biurko (pod stanowiska komputerowe)",
    "Kabel HDMI światłowodowy (25 m)",
    "Uchwyt VESA do telewizora (VESA 600 × 400)",
  ]) {
    await expect(purchases).toContainText(item);
  }
});

test("biurka do sali 37 są na liście zakupów", async ({ page }) => {
  await page.goto("/#zakupy");
  const desks = card(page, "Biurko");
  await expect(desks.locator(".qty-value")).toHaveText("6");
  await expect(desks.locator(".room-chip")).toHaveText(["Sala 37"]);
  await expect(desks).toContainText("6 kolejnych stanowisk");
  await expect(desks.locator(".calc-line")).toHaveText("Brak ceny, pozycja nie wchodzi do sumy");
});

test("sala 38: wszystko zrobione", async ({ page }) => {
  await page.goto("/#room-38");
  await expect(doneTasks(page)).toHaveCount(3);
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveCount(0);
  await expect(page.locator("#roomDetail")).toContainText("Komputer nauczyciela zostaje");
});

test("sala 39 bez zmian", async ({ page }) => {
  await page.goto("/#room-39");
  await expect(page.locator("#roomDetail")).toContainText("Na tym etapie bez zmian w wyposażeniu");
});

test("sala 40: laptop KPO nauczyciela, 26 laptopów z sali 41 i konfiguracja incognito", async ({ page }) => {
  await page.goto("/#room-40");
  const detail = page.locator("#roomDetail");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO (komputer nauczyciela)");
  await expect(detail.locator(".equipment-group", { hasText: "Docelowo" })).toContainText("26 laptopów Asus z pracowni handlowej (sala 41), wyczyszczonych i przygotowanych, razem z szafą");
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveText([
    "Zapewnić stabilne podłączenie telewizora multimedialnego do komputera",
    "Sprawdzić, czy zestaw działa",
    "Wstawić do sali 40 wyczyszczone i przygotowane 26 laptopów Asus z sali 41 razem z szafą",
    "Postawić na laptopach konfigurację zmazywalną: uczeń zawsze w trybie incognito (przygotowanie: Maciej Najwer)",
  ]);
});

test("sala 41: nowa szafa na 30, 30 laptopów KPO z Subiektem i Office 2007, zakupy", async ({ page }) => {
  await page.goto("/#room-41");
  const detail = page.locator("#roomDetail");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("30 nowych laptopów KPO (do wstawienia, z zainstalowanym Subiektem i Office 2007)");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO (komputer nauczyciela)");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).not.toContainText("26");
  await expect(detail).not.toContainText("duży telewizor niedotykowy");
  await expect(detail.locator(".equipment-group", { hasText: "Meble" })).toContainText("Nowa szafa na 30 komputerów (do wstawienia); dotychczasowa szafa na 26 komputerów przechodzi do sali 40");
  await expect(todoSection(page).locator("li")).toContainText([
    "Wyczyścić, przygotować i przenieść 26 laptopów Asus z sali 41 do sali 40 razem z szafą",
    "Wstawić do sali nową szafę na 30 komputerów",
    "Wsadzić do szafy 30 komputerów KPO z zainstalowanym Subiektem i Office 2007",
  ]);
  await expect(detail.locator(".is-urgent li")).toHaveText([
    "Kupić monitor interaktywny (75 cali)",
    "Kupić stojak do monitora interaktywnego (na kółkach, VESA 800 × 400)",
  ]);
  await expect(detail.locator(".equipment-group", { hasText: "Do zakupu" })).toContainText("Kabel HDMI światłowodowy (25 m)");
  await expect(page.locator("#openItems")).not.toContainText("Ustalić, w jakiej szafie będzie 30 nowych laptopów");
  await expect(page.locator("#openItems")).not.toContainText("duży telewizor niedotykowy");
});

test("sala 42: 32 laptopy KPO, nowa szafa i konfiguracja incognito", async ({ page }) => {
  await page.goto("/#room-42");
  const detail = page.locator("#roomDetail");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("32 laptopy KPO");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO (komputer nauczyciela)");
  await expect(detail.locator(".equipment-group", { hasText: "Meble" })).toContainText("Nowa szafa na 30 komputerów (do wstawienia); dotychczasowa szafa na 16 laptopów/iPadów przechodzi do sali 44");
  await expect(todoSection(page).locator("li")).toContainText([
    "Przenieść szafę na 16 laptopów/iPadów z sali 42 do sali 44",
    "Wstawić nową szafę na 30 komputerów",
    "Wsadzić do szafy 30 komputerów KPO z zainstalowanym Subiektem i Office 2007",
    "Postawić na laptopach konfigurację zmazywalną: uczeń zawsze w trybie incognito (przygotowanie: Maciej Najwer)",
  ]);
  await expect(detail).not.toContainText("Wstawić 26 laptopów razem z szafą");
  await expect(detail).not.toContainText("Zapewnić nowe i sprawne laptopy");
});

test("sala 43 zrobiona, sala 44: iPady do wstawienia", async ({ page }) => {
  await page.goto("/#room-43");
  await expect(doneTasks(page)).toHaveCount(2);
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveText([
    "Wstawić laptop KPO jako komputer nauczyciela",
    "Zapewnić szafę na 30 urządzeń",
    "Wstawić 20 iPadów z KPO",
  ]);
  await expect(page.locator("#roomDetail .equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO (komputer nauczyciela, do wstawienia)");
  await expect(page.locator("#roomDetail .detail-title .badge")).toHaveText("Do zrobienia");

  await page.goto("/#room-44");
  const detail = page.locator("#roomDetail");
  await expect(detail.locator(".equipment-group", { hasText: "Komputery" })).toContainText("Laptop KPO");
  await expect(detail.locator(".equipment-group", { hasText: "Sprzęt multimedialny" })).toContainText("Monitor interaktywny");
  await expect(detail.locator(".equipment-group", { hasText: "Tablety" })).toContainText("20 iPadów z KPO (do wstawienia)");
  await expect(doneTasks(page)).toHaveCount(2);
  await expect(todoSection(page).locator("li:not(.is-done)")).toHaveText([
    "Przenieść szafę na 16 laptopów/iPadów z sali 42 do sali 44",
    "Wstawić do szafy 20 iPadów z KPO",
    "Przygotować zasilanie dla tabletów",
  ]);
});

const resource = (page, id) => page.locator(`.resource-card[data-device-id="${id}"]`);

test("zakładka Zasoby podlicza sprzęt z KPO: w salach, do wstawienia, w pudełkach", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".kpo-delivery")).toHaveCount(0);
  await page.getByRole("link", { name: /^Zasoby/ }).click();
  await expect(page).toHaveURL(/#zasoby$/);
  await expect(page.getByRole("heading", { name: "Zasoby sprzętu" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sprzęt z KPO" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Inny sprzęt" })).toBeVisible();
  await expect(page.locator(".intro")).toBeHidden();
  await expect(page.locator(".mobile-room-nav")).toBeHidden();
  await expect(page.locator("#resourcesTabCount")).toHaveText("302");

  // razem (tylko KPO): 302 = 57 na miejscu + 245 w pudełkach; 208 przydzielone
  await expect(page.locator('[data-total="delivered"] .total-value')).toHaveText("302");
  await expect(page.locator('[data-total="placed"] .total-value')).toHaveText("57");
  await expect(page.locator('[data-total="inBoxes"] .total-value')).toHaveText("245");
  await expect(page.locator('[data-total="planned"] .total-value')).toHaveText("208");

  // laptopy: 160 = 56 na miejscu + 85 przydzielone + 19 wolne
  await expect(page.locator(".resource-card[data-device-id]")).toHaveCount(6);
  const laptops = resource(page, "laptop");
  await expect(laptops.locator(".resource-qty")).toHaveText("160 szt.");
  await expect(laptops.locator('[data-stat="placed"]')).toHaveText("56");
  await expect(laptops.locator('[data-stat="inBoxes"]')).toHaveText("104");
  await expect(laptops.locator('[data-stat="planned"]')).toHaveText("85");
  await expect(laptops.locator('[data-stat="free"]')).toHaveText("19");
  await expect(laptops.locator('[data-stat="allocated"]')).toHaveText("141");

  // Chromebooki: 1 używany przez Marię Kaszak, 30 przewidziane do sali 23, adnotacja z pytaniem
  const chromebooks = resource(page, "chromebook");
  await expect(chromebooks.locator(".resource-qty")).toHaveText("46 szt.");
  await expect(chromebooks.locator('[data-stat="placed"]')).toHaveText("1");
  await expect(chromebooks.locator('[data-stat="inBoxes"]')).toHaveText("45");
  await expect(chromebooks.locator('[data-stat="planned"]')).toHaveText("30");
  await expect(chromebooks.locator('[data-stat="free"]')).toHaveText("15");
  await expect(chromebooks.locator('[data-stat="allocated"]')).toHaveText("31");
  await expect(chromebooks.locator(".resource-note")).toHaveText("1 używany przez Marię Kaszak. Do sali 23: 26 albo 30, jeżeli będą dostępne (liczone jako 30). Czy inne osoby z pomocy PP też nie mają jeszcze Chromebooków KPO?");
  await chromebooks.locator("summary").click();
  await expect(chromebooks.locator(".allocation-chips").nth(0).locator(".room-chip")).toHaveText(["Maria Kaszak – 1 szt."]);
  await expect(chromebooks.locator(".allocation-chips").nth(1).locator(".room-chip")).toHaveText(["s.23 – 30 szt."]);

  // iPady KPO: 93 przydzielone (sale 17, 44, 43, 32 i Maria Kaszak), 3 wolne; iPady Air z sali 5 nie wchodzą
  const ipads = resource(page, "ipad");
  await expect(ipads.locator(".resource-qty")).toHaveText("96 szt.");
  await expect(ipads.locator('[data-stat="placed"]')).toHaveText("0");
  await expect(ipads.locator('[data-stat="inBoxes"]')).toHaveText("96");
  await expect(ipads.locator('[data-stat="planned"]')).toHaveText("93");
  await expect(ipads.locator('[data-stat="free"]')).toHaveText("3");
  await expect(ipads.locator('[data-stat="allocated"]')).toHaveText("93");
  await ipads.locator("summary").click();
  await expect(ipads.locator(".allocation-chips").first().locator(".room-chip")).toHaveText(["s.17 – 32 szt.", "s.44 – 20 szt.", "s.43 – 20 szt.", "s.32 – 20 szt.", "Maria Kaszak – 1 szt."]);
  await expect(ipads.locator(".resource-details .placeholder")).toHaveText(["Brak"]);
  await expect(page.locator("#resourceNotes")).toContainText("starsze iPady Air z sali 5 nie są z KPO");
  await expect(page.locator("#resourceNotes")).toContainText("w każdej sali lekcyjnej");
  await expect(page.locator("#resourceNotes")).toContainText("W sali 23 nie ma szafy");
});

test("zasoby: laptopy Asus z pracowni handlowej jako inny sprzęt", async ({ page }) => {
  await page.goto("/#zasoby");
  const asus = resource(page, "asus");
  await expect(asus.locator("h3")).toHaveText("Laptopy Asus (pracownia handlowa)");
  await expect(asus.locator(".resource-qty")).toHaveText("26 szt.");
  await expect(asus.locator(".resource-note")).toContainText("Wyczyścić, przygotować i przenieść do sali 40");
  await expect(asus.locator('[data-stat="placed"]')).toHaveText("26");
  await expect(asus.locator('[data-stat="moving"]')).toHaveText("26");
  const chips = asus.locator(".allocation-chips");
  await expect(chips.nth(0).locator(".room-chip")).toHaveText(["s.41 – 26 szt."]);
  await expect(chips.nth(1).locator(".room-chip")).toHaveText(["s.40 – 26 szt."]);
  // nie jest to sprzęt z KPO: nie wchodzi do sum
  await expect(page.locator('[data-total="delivered"] .total-value')).toHaveText("302");
  await expect(page.locator('[data-total="placed"] .total-value')).toHaveText("57");

  await page.goto("/#room-40");
  await expect(page.locator("#roomDetail")).toContainText("26 laptopów Asus");
  await page.goto("/#room-41");
  await expect(page.locator("#roomDetail")).toContainText("Wyczyścić, przygotować i przenieść 26 laptopów Asus z sali 41 do sali 40 razem z szafą");
});

test("zasoby: podział laptopów KPO na sale", async ({ page }) => {
  await page.goto("/#zasoby");
  const laptops = resource(page, "laptop");
  await laptops.locator("summary").click();
  const placed = laptops.locator(".allocation-chips").nth(0).locator(".room-chip");
  await expect(placed).toHaveCount(24);
  await expect(placed.filter({ hasText: "s.42 – 33 szt." })).toHaveCount(1);
  await expect(placed.filter({ hasText: "s.2 – 1 szt." })).toHaveCount(1);
  await expect(placed.filter({ hasText: "s.05 – 1 szt." })).toHaveCount(1);
  const planned = laptops.locator(".allocation-chips").nth(1).locator(".room-chip");
  await expect(planned).toHaveText([
    "s.41 – 30 szt.",
    "s.28 – 30 szt.",
    "s.05 – 16 szt.",
    "s.16 – 4 szt.",
    "s.8 – 1 szt.",
    "s.43 – 1 szt.",
    "Gastronomiczna – 1 szt.",
    "Fryzjerska – teoria – 1 szt.",
    "Fryzjerska – praktyka – 1 szt.",
  ]);

  await planned.filter({ hasText: "s.41" }).click();
  await expect(page.locator("#roomDetail").getByRole("heading", { name: "Sala 41" })).toBeVisible();
  await expect(page).toHaveURL(/#room-41$/);
  await page.goBack();
  await expect(page.getByRole("heading", { name: "Zasoby sprzętu" })).toBeVisible();
});

test("zasoby: przydziały odnoszą się do istniejących sal i nie przekraczają dostawy", async ({ page }) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const { kpoAllocations, kpoDelivery, otherAssets, rooms } = await import("/equipment-data.js");
    const ids = new Set(rooms.map((room) => room.id));
    const devices = [...kpoDelivery, ...otherAssets];
    const missing = kpoAllocations.filter((entry) => entry.roomId && !ids.has(entry.roomId)).map((entry) => entry.roomId);
    const noTarget = kpoAllocations.filter((entry) => !entry.roomId && !entry.assignee).length;
    const over = kpoDelivery.filter((device) => {
      const used = kpoAllocations
        .filter((entry) => entry.deviceId === device.id && entry.state !== "moving")
        .reduce((sum, entry) => sum + entry.qty, 0);
      return used > device.qty;
    }).map((device) => device.id);
    const unknownDevices = kpoAllocations.filter((entry) => !devices.some((device) => device.id === entry.deviceId));
    return { missing, noTarget, over, unknownDevices: unknownDevices.length };
  });
  expect(result).toEqual({ missing: [], noTarget: 0, over: [], unknownDevices: 0 });
});

test("laptop KPO jako komputer nauczyciela w każdej sali lekcyjnej", async ({ page }) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const { rooms } = await import("/equipment-data.js");
    const excluded = new Set(["04", "16", "21", "37", "38", "39"]);
    const without = rooms
      .filter((room) => !excluded.has(room.id))
      .filter((room) => !room.equipment
        .filter((group) => group.name === "Komputery")
        .flatMap((group) => group.items)
        .some((item) => item.startsWith("Laptop KPO (komputer nauczyciela")))
      .map((room) => room.id);
    return without;
  });
  expect(result).toEqual([]);
});

test("zasoby: wydruk zestawienia i brak przewijania poziomego na telefonie", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/#zasoby");
  await expect(page.getByRole("heading", { name: "Zasoby sprzętu" })).toBeVisible();
  const sheet = page.locator(".print-sheet");
  await expect(sheet).toContainText("Zasoby sprzętu");
  await expect(sheet).toContainText("Dostarczono: 160 szt.");
  await expect(sheet).toContainText("W salach i u osób: 56 szt.");
  await expect(sheet).toContainText("W pudełkach: 104 szt. (przydzielone: 85, wolne: 19)");
  await expect(sheet).toContainText("Miejsca, do których ma trafić: s.41 – 30 szt., s.28 – 30 szt., s.05 – 16 szt., s.16 – 4 szt., s.8 – 1 szt., s.43 – 1 szt., Gastronomiczna – 1 szt., Fryzjerska – teoria – 1 szt., Fryzjerska – praktyka – 1 szt.");
  await expect(sheet).toContainText("1 używany przez Marię Kaszak");
  await expect(sheet).toContainText("Laptopy Asus (pracownia handlowa): inny sprzęt");
  await expect(sheet).toContainText("Do przeniesienia do: s.40 – 26 szt.");
  await expect(sheet).toContainText("Założenia zestawienia");

  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(widths.document).toBe(widths.viewport);

  await page.getByRole("link", { name: /^Sale/ }).first().click();
  await expect(page.locator("#roomDetail")).toBeVisible();
  await expect(page.locator(".print-sheet")).toContainText("Sala");
});

test("sala 42: szafa na 30 laptopów a 32 laptopy KPO jest sprawą do potwierdzenia", async ({ page }) => {
  await page.goto("/#room-42");
  await expect(page.locator("#openItems")).toContainText("szafa na 30, laptopów KPO jest 32");
  await expect(page.locator("#openItems").getByRole("link", { name: "Sala 42" })).toBeVisible();
});

test("sala 37: adnotacja o 25 komputerach Dell UNICEF i 25 monitorach AOC z 2022", async ({ page }) => {
  await page.goto("/#room-37");
  const detail = page.locator("#roomDetail");
  await expect(detail.getByRole("heading", { name: "Uwagi" })).toBeVisible();
  await expect(detail).toContainText("W 2022 roku kupiono 25 komputerów Dell UNICEF i 25 monitorów AOC");
  await expect(detail).toContainText("Znaleźć pozostałe 7 komputerów Dell UNICEF (z 25 kupionych w 2022) i dostarczyć je do sali 37");
  await expect(detail).toContainText("Przekazać wadliwy komputer ze stanowiska 15 Maciejowi Najwerowi");
  await expect(detail).not.toContainText("Dell UNICEF z monitorami dla nauczyciela");
});

test("sala 38: 24 laptopy Dell Pro z pracowni AI i komputer all-in-one nauczyciela (2026)", async ({ page }) => {
  await page.goto("/#room-38");
  const computers = page.locator("#roomDetail .equipment-group", { hasText: "Komputery" });
  await expect(computers).toContainText("24 laptopy Dell Pro (z pracowni AI)");
  await expect(computers).toContainText("Komputer all-in-one dla nauczyciela (2026)");
  await expect(computers).not.toContainText("Laptopy z pracowni AI");
  await expect(computers).not.toContainText("Stanowisko nauczyciela (nowy komputer, zostaje)");
  await expect(page.locator("#roomDetail")).toContainText("Komputer nauczyciela zostaje");
});

test("zasoby: komputery Dell UNICEF (2022) i laptopy Dell Pro jako inny sprzęt", async ({ page }) => {
  await page.goto("/#zasoby");
  const unicef = resource(page, "dell-unicef");
  await expect(unicef.locator("h3")).toHaveText("Komputery stacjonarne Dell UNICEF (2022)");
  await expect(unicef.locator(".resource-qty")).toHaveText("25 szt.");
  await expect(unicef).toContainText("W 2022 roku kupiono 25 komputerów Dell UNICEF i 25 monitorów AOC");
  await expect(unicef).toContainText("Znaleźć pozostałe 7 sztuk i dostarczyć do sali 37");
  await expect(unicef.locator('[data-stat="placed"]')).toHaveText("18");
  await expect(unicef.locator('[data-stat="planned"]')).toHaveText("7");
  await expect(unicef.locator('[data-stat="moving"]')).toHaveText("1");
  const chips = unicef.locator(".allocation-chips");
  await expect(chips.nth(0).locator(".room-chip")).toHaveText(["s.37 – 18 szt."]);
  await expect(chips.nth(1).locator(".room-chip")).toHaveText(["s.37 – 7 szt."]);
  await expect(chips.nth(2).locator(".room-chip")).toHaveText(["Maciej Najwer – 1 szt."]);

  const pro = resource(page, "dell-pro");
  await expect(pro.locator("h3")).toHaveText("Laptopy Dell Pro (pracownia AI)");
  await expect(pro.locator(".resource-qty")).toHaveText("32 szt.");
  await expect(pro.locator('[data-stat="placed"]')).toHaveText("24");
  await expect(pro.locator('[data-stat="inBoxes"]')).toHaveText("8");
  await expect(pro.locator(".resource-numbers .is-sub")).toHaveText("z tego mocne, ewentualnie dla nauczyciela2");
  await expect(pro).toContainText("24 wykorzystane w sali 38, 8 niewykorzystanych leży w pudełkach");
  await expect(pro.locator('[data-stat="planned"]')).toHaveCount(0);
  await expect(pro.locator(".allocation-chips .room-chip")).toHaveText(["s.38 – 24 szt."]);
  await expect(page.locator("#resourceNotes")).toContainText("Laptopy Dell Pro z pracowni AI (24 w sali 38, 8 w pudełkach) nie są liczone do KPO");

  // nie wchodzą do sum z KPO
  await expect(page.locator('[data-total="delivered"] .total-value')).toHaveText("302");
  await expect(page.locator('[data-total="placed"] .total-value')).toHaveText("57");

  // wydruk
  const sheet = page.locator(".print-sheet");
  await expect(sheet).toContainText("Komputery stacjonarne Dell UNICEF (2022): inny sprzęt");
  await expect(sheet).toContainText("Do dostarczenia do: s.37 – 7 szt.");
  await expect(sheet).toContainText("Do przeniesienia do: Maciej Najwer – 1 szt.");
  await expect(sheet).toContainText("W pudełkach (niewykorzystane): 8 szt., z tego mocne, ewentualnie dla nauczyciela: 2");
});

test("zasoby: inny sprzęt nie przekracza ilości kupionej", async ({ page }) => {
  await page.goto("/");
  const over = await page.evaluate(async () => {
    const { kpoAllocations, otherAssets } = await import("/equipment-data.js");
    return otherAssets.filter((asset) => {
      const used = kpoAllocations
        .filter((entry) => entry.deviceId === asset.id && entry.state !== "moving")
        .reduce((sum, entry) => sum + entry.qty, 0);
      return used + (asset.inBoxes ?? 0) > asset.qty;
    }).map((asset) => asset.id);
  });
  expect(over).toEqual([]);
});

test("zasoby: szafy na laptopy i iPady", async ({ page }) => {
  await page.goto("/#zasoby");
  await expect(page.getByRole("heading", { name: "Szafy na laptopy i iPady" })).toBeVisible();
  const cards = page.locator(".cabinet-card");
  await expect(cards).toHaveCount(10);

  const cabinet = (id) => page.locator(`.cabinet-card[data-cabinet-id="${id}"]`);

  const c05 = cabinet("cabinet-05");
  await expect(c05).toContainText("Szafa na 16 laptopów/iPadów");
  await expect(c05).toContainText("Do przeniesienia");
  await expect(c05).toContainText("Teraz: pod salą 36");
  await expect(c05.getByRole("link", { name: "Sala 05 (nowa)" })).toHaveAttribute("href", "#room-05-new");
  await expect(c05).toContainText("16 laptopów KPO w konfiguracji uczniowskiej");
  await expect(c05.locator(".cabinet-warning")).toHaveCount(0);

  const c44 = cabinet("cabinet-44");
  await expect(c44).toContainText("Teraz:");
  await expect(c44.getByRole("link", { name: "Sala 42" })).toBeVisible();
  await expect(c44.getByRole("link", { name: "Sala 44" })).toBeVisible();
  await expect(c44).toContainText("20 iPadów KPO");
  await expect(c44.locator(".cabinet-warning")).toHaveText("Uwaga: w szafie ma stać 20 szt., a mieści się 16 (przyjęte świadomie)");

  const c40 = cabinet("cabinet-40");
  await expect(c40).toContainText("Szafa na 26 komputerów");
  await expect(c40.getByRole("link", { name: "Sala 41" })).toBeVisible();
  await expect(c40.getByRole("link", { name: "Sala 40" })).toBeVisible();
  await expect(c40).toContainText("26 laptopów Asus (z sali 41) w konfiguracji uczniowskiej");

  for (const [id, room, contents] of [
    ["cabinet-41", "Sala 41", "30 komputerów KPO z zainstalowanym Subiektem i Office 2007"],
    ["cabinet-42", "Sala 42", "30 komputerów KPO z zainstalowanym Subiektem i Office 2007"],
    ["cabinet-28", "Sala 28", "30 laptopów KPO w konfiguracji uczniowskiej"],
  ]) {
    const c = cabinet(id);
    await expect(c).toContainText("Nowa szafa na 30 komputerów");
    await expect(c.locator(".badge")).toHaveText("Nowa");
    await expect(c).not.toContainText("Teraz:");
    await expect(c.getByRole("link", { name: room })).toBeVisible();
    await expect(c).toContainText(contents);
    await expect(c.locator(".cabinet-warning")).toHaveCount(0);
  }

  for (const [id, room] of [["cabinet-32", "Sala 32"], ["cabinet-43", "Sala 43"]]) {
    const c = cabinet(id);
    await expect(c).toContainText("Szafa na 30 urządzeń");
    await expect(c.locator(".badge")).toHaveText("Potrzebna (do zakupu)");
    await expect(c.getByRole("link", { name: room })).toBeVisible();
    await expect(c).toContainText("20 iPadów KPO");
    await expect(c.locator(".cabinet-warning")).toHaveCount(0);
  }

  const c17 = cabinet("cabinet-17");
  await expect(c17).toContainText("Szafa na 30 tabletów");
  await expect(c17.locator(".badge")).toHaveText("Potrzebna (do zakupu)");
  await expect(c17.getByRole("link", { name: "Sala 17" })).toBeVisible();
  await expect(c17).toContainText("32 iPady KPO");
  // 32 iPady nie mieszczą się w szafie na 30: ostrzeżenie bez dopisku o świadomym przyjęciu
  await expect(c17.locator(".cabinet-warning")).toHaveText("Uwaga: w szafie ma stać 32 szt., a mieści się 30");

  const c23 = cabinet("cabinet-23");
  await expect(c23).toContainText("Szafa na 30 laptopów z zasilaniem");
  await expect(c23.locator(".badge")).toHaveText("Potrzebna (do zakupu)");
  await expect(c23).not.toContainText("Teraz:");
  await expect(c23.getByRole("link", { name: "Sala 23" })).toHaveAttribute("href", "#room-23");
  await expect(c23).toContainText("26 albo 30 Chromebooków (jeżeli będą dostępne)");
  await expect(c23.locator(".cabinet-warning")).toHaveCount(0);

  await expect(page.locator(".print-sheet")).toContainText("Szafy na laptopy i iPady");
  await expect(page.locator(".print-sheet")).toContainText("Szafa na 30 laptopów z zasilaniem (pojemność 30), potrzebna (do zakupu), do sali: 23, w szafie: 26 albo 30 Chromebooków (jeżeli będą dostępne)");
  await expect(page.locator(".print-sheet")).toContainText("Szafa na 16 laptopów/iPadów (pojemność 16), teraz: pod salą 36, do sali: 05 (nowa), w szafie: 16 laptopów KPO w konfiguracji uczniowskiej");
  await expect(page.locator(".print-sheet")).toContainText("uwaga: 20 szt. przekracza pojemność (przyjęte świadomie)");
});

test("szafy: sale docelowe istnieją, zawartość KPO mieści się w bilansie laptopów", async ({ page }) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const { cabinets, kpoAllocations, kpoDelivery, rooms } = await import("/equipment-data.js");
    const ids = new Set(rooms.map((room) => room.id));
    const badRooms = cabinets.flatMap((c) => [c.toRoomId, c.from?.roomId].filter(Boolean)).filter((id) => !ids.has(id));
    const laptop = kpoDelivery.find((device) => device.id === "laptop");
    const used = kpoAllocations.filter((entry) => entry.deviceId === "laptop" && entry.state !== "moving").reduce((sum, entry) => sum + entry.qty, 0);
    return { badRooms, laptopsOver: used > laptop.qty };
  });
  expect(result).toEqual({ badRooms: [], laptopsOver: false });
});

test("sprawy do potwierdzenia: Chromebooki do sali 23, bez wpisu o szafie dla sali 44", async ({ page }) => {
  await page.goto("/");
  const items = page.locator("#openItems");
  await expect(items).toContainText("Potwierdzić, czy do sali 23 będzie dostępnych 26 czy 30 Chromebooków");
  await expect(items.getByRole("link", { name: "Sala 23" })).toBeVisible();
  await expect(items).not.toContainText("do sali 44 ma trafić");
  await expect(items).toContainText("Szafa na 30 tabletów, a do sali 17 ma trafić 32 iPady: sprawdzić pojemność szafy");
  await expect(items.getByRole("link", { name: "Sala 17" })).toBeVisible();
  await expect(items).not.toContainText("skąd jest 30 laptopów");
});

test("sala 29 nie ma już zapotrzebowania na liście zakupów", async ({ page }) => {
  await page.goto("/#zakupy");
  await expect(page.locator(".purchase-card .room-chip", { hasText: /^Sala 29$/ })).toHaveCount(0);
  await expect(card(page, "Monitor interaktywny").locator(".qty-value")).toHaveText("7");
  await expect(card(page, "Stojak do monitora interaktywnego").locator(".qty-value")).toHaveText("7");
  await expect(card(page, "Kabel HDMI światłowodowy").locator(".qty-value")).toHaveText("9");
  await expect(card(page, "Monitor interaktywny").locator(".room-chip")).toHaveText(["Sala 2", "Sala 18", "Sala 41", "Sala 23", "Sala 30", "Sala 32", "Sala 33"]);
  const result = await page.evaluate(async () => {
    const { purchaseItems } = await import("/equipment-data.js");
    return purchaseItems.filter((item) => item.roomIds.includes("29") || item.priorityRoomIds?.includes("29")).map((item) => item.id);
  });
  expect(result).toEqual([]);
});

test("spójność danych: karty sal, przydziały KPO, szafy, zakupy i statusy", async ({ page }) => {
  await page.goto("/");
  const problems = await page.evaluate(async () => {
    const { rooms, purchaseItems, kpoAllocations, kpoDelivery, otherAssets, cabinets } = await import("/equipment-data.js");
    const byId = new Map(rooms.map((room) => [room.id, room]));
    const items = (room, group) => room.equipment.filter((entry) => entry.name === group).flatMap((entry) => entry.items);
    const out = [];

    // laptop KPO jako komputer nauczyciela: karta sali zgodna z przydziałami (w sali / do wstawienia)
    const teacher = { placed: new Set(), planned: new Set() };
    rooms.forEach((room) => items(room, "Komputery").forEach((item) => {
      if (item.startsWith("Laptop KPO (komputer nauczyciela")) teacher[item.includes("do wstawienia") ? "planned" : "placed"].add(room.id);
    }));
    ["placed", "planned"].forEach((state) => {
      const alloc = new Set(kpoAllocations.filter((e) => e.deviceId === "laptop" && e.state === state && e.qty === 1).map((e) => e.roomId));
      teacher[state].forEach((id) => { if (!alloc.has(id)) out.push(`teacher ${state} ${id}: brak w przydziałach`); });
      alloc.forEach((id) => { if (!teacher[state].has(id)) out.push(`przydział ${state} ${id}: brak na karcie`); });
    });

    // liczby z kart zgodne z przydziałami
    const qty = (deviceId, roomId, state) => kpoAllocations.filter((e) => e.deviceId === deviceId && e.roomId === roomId && e.state === state).reduce((sum, e) => sum + e.qty, 0);
    const card = (roomId, group, text) => items(byId.get(roomId), group).some((item) => item.includes(text));
    const checks = [
      [qty("laptop", "42", "placed") === 33 && card("42", "Komputery", "32 laptopy KPO"), "sala 42: 32 laptopy KPO + nauczyciel"],
      [qty("laptop", "41", "planned") === 30 && card("41", "Komputery", "30 nowych laptopów KPO"), "sala 41: 30 laptopów KPO"],
      [qty("laptop", "28", "planned") === 30 && card("28", "Komputery", "30 laptopów KPO"), "sala 28: 30 laptopów KPO"],
      [qty("laptop", "05-new", "planned") === 16 && card("05-new", "Komputery", "16 laptopów KPO"), "sala 05: 16 laptopów KPO"],
      [qty("laptop", "16", "planned") === 4, "sala 16: 4 laptopy KPO"],
      [qty("ipad", "17", "planned") === 32 && card("17", "Tablety", "32 iPady KPO"), "sala 17: 32 iPady"],
      [qty("ipad", "44", "planned") === 20 && card("44", "Tablety", "20 iPadów"), "sala 44: 20 iPadów"],
      [qty("chromebook", "23", "planned") === 30 && card("23", "Docelowo", "26 albo 30 Chromebooków"), "sala 23: Chromebooki"],
      [qty("dell-unicef", "37", "placed") === 18 && card("37", "Komputery", "18 komputerów stacjonarnych Dell UNICEF"), "sala 37: 18 Dell UNICEF"],
      [qty("dell-pro", "38", "placed") === 24 && card("38", "Komputery", "24 laptopy Dell Pro"), "sala 38: 24 Dell Pro"],
      [qty("asus", "41", "placed") === 26 && qty("asus", "40", "moving") === 26, "Asus: 26 w sali 41, do sali 40"],
    ];
    checks.forEach(([ok, label]) => { if (!ok) out.push(label); });

    // szafy: sala docelowa i źródłowa wspominają o szafie; pojemność
    cabinets.forEach((cabinet) => {
      const mentions = (room) => room.equipment.flatMap((g) => g.items).concat(room.tasks.map((t) => t.text)).some((text) => /szaf/i.test(text));
      if (!mentions(byId.get(cabinet.toRoomId))) out.push(`szafa ${cabinet.id}: sala docelowa nie wspomina o szafie`);
      if (cabinet.from?.roomId && !mentions(byId.get(cabinet.from.roomId))) out.push(`szafa ${cabinet.id}: sala źródłowa nie wspomina o szafie`);
    });

    // zakupy: ilość = liczba sal tam, gdzie każda sala dostaje jedną sztukę; grupa Do zakupu zgodna z listą
    purchaseItems.filter((p) => ["interactive-75", "tv-85", "hdmi-20m", "vesa-interactive", "vesa-tv"].includes(p.id)).forEach((p) => {
      if (p.qty !== p.roomIds.length) out.push(`zakup ${p.id}: ilość ${p.qty} != sale ${p.roomIds.length}`);
    });
    rooms.forEach((room) => {
      const expected = purchaseItems.filter((p) => p.roomIds.includes(room.id)).length;
      if (items(room, "Do zakupu").length !== expected) out.push(`sala ${room.id}: grupa Do zakupu niezgodna z listą zakupów`);
    });

    // statusy zgodne z zadaniami
    rooms.forEach((room) => {
      const open = [...room.tasks, ...room.urgentTasks].filter((task) => !task.done);
      if (room.status === "ready" && open.length) out.push(`sala ${room.id}: Bez zmian, a są otwarte zadania`);
      if (room.status === "todo" && !open.length) out.push(`sala ${room.id}: Do zrobienia, a brak otwartych zadań`);
    });

    // sumy zasobów
    kpoDelivery.forEach((device) => {
      const used = kpoAllocations.filter((e) => e.deviceId === device.id && e.state !== "moving").reduce((sum, e) => sum + e.qty, 0);
      if (used > device.qty) out.push(`zasoby ${device.id}: przydzielono ${used} > ${device.qty}`);
    });
    otherAssets.forEach((asset) => {
      const used = kpoAllocations.filter((e) => e.deviceId === asset.id && e.state !== "moving").reduce((sum, e) => sum + e.qty, 0);
      if (used + (asset.inBoxes ?? 0) > asset.qty) out.push(`inny sprzęt ${asset.id}: ${used}+${asset.inBoxes ?? 0} > ${asset.qty}`);
    });

    return { out, overfilled: cabinets.filter((c) => c.contents.reduce((s, i) => s + i.qty, 0) > c.capacity).map((c) => c.id) };
  });
  expect(problems.out).toEqual([]);
  // ostrzeżenia: sala 44 (20 iPadów w szafie na 16, przyjęte świadomie) i sala 17 (32 iPady w szafie na 30, do potwierdzenia)
  expect([...problems.overfilled].sort()).toEqual(["cabinet-17", "cabinet-44"]);
});

test("sale 32 i 43: po 20 iPadów i szafa na 30 urządzeń", async ({ page }) => {
  for (const id of ["32", "43"]) {
    await page.goto(`/#room-${id}`);
    const detail = page.locator("#roomDetail");
    await expect(detail.locator(".equipment-group", { hasText: "Tablety" })).toContainText("20 iPadów z KPO (do wstawienia)");
    await expect(todoSection(page).locator("li:not(.is-done)")).toContainText([
      "Zapewnić szafę na 30 urządzeń",
      "Wstawić 20 iPadów z KPO",
    ]);
    await expect(detail.locator(".equipment-group", { hasText: "Do zakupu" })).toContainText("Szafa na urządzenia (na 30 urządzeń)");
  }

  await page.goto("/#zakupy");
  const cabinets = card(page, "Szafa na urządzenia");
  await expect(cabinets.locator(".qty-value")).toHaveText("3");
  await expect(cabinets.locator(".room-chip")).toHaveText(["Sala 32", "Sala 43", "Sala 17"]);
  await expect(cabinets).toContainText("Po jednej do sal 32 i 43 (na 20 iPadów w każdej) oraz do sali 17 (na tablety)");
  await expect(cabinets.locator(".calc-line")).toHaveText("Brak ceny, pozycja nie wchodzi do sumy");
});

test("sala 17: potrzebna szafa na 30 tabletów", async ({ page }) => {
  await page.goto("/#room-17");
  const detail = page.locator("#roomDetail");
  await expect(todoSection(page).locator("li:not(.is-done)")).toContainText(["Zapewnić szafę na 30 tabletów"]);
  await expect(detail.locator(".equipment-group", { hasText: "Do zakupu" })).toContainText("Szafa na urządzenia (na 30 urządzeń)");
  await expect(detail.locator(".equipment-group", { hasText: "Tablety" })).toContainText("32 iPady KPO");
  await expect(detail.locator(".equipment-group", { hasText: "Tablety" })).toContainText("Szafka z zasilaniem do ładowania tabletów");
});
