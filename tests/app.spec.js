import { expect, test } from "@playwright/test";

test("pokazuje listę sal i szczegóły", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Sprzęt i wyposażenie sal" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Sala 37/ })).toBeVisible();
  await page.getByRole("button", { name: /Sala 37/ }).click();
  await expect(page.getByRole("heading", { name: "Sala 37" })).toBeVisible();
  await expect(page.locator("#roomDetail").getByText("24 komputery stacjonarne UNICEF z monitorami dla uczniów")).toBeVisible();
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
  await page.getByLabel("Status").selectOption("decision");
  await expect(page.getByRole("button", { name: /Sala 28/ })).toBeVisible();
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
  await expect(page.locator("#roomDetail")).toContainText("Komputer stacjonarny");
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
  await page.locator("#openItems").getByRole("link", { name: "Sala 34" }).click();
  await expect(page.locator("#roomDetail").getByRole("heading", { name: "Sala 34" })).toBeVisible();
});

test("kafelek statusu filtruje listę", async ({ page }) => {
  await page.goto("/");
  const total = await page.locator(".room-row").count();
  await page.locator(".stat.decision").click();
  await expect(page.locator(".room-row")).toHaveCount(2);
  await page.locator(".stat.decision").click();
  await expect(page.locator(".room-row")).toHaveCount(total);
});

test("pokazuje sprzęt otrzymany z KPO", async ({ page }) => {
  await page.goto("/");
  const panel = page.locator(".kpo-delivery");
  await expect(panel).toContainText("Sprzęt otrzymany z KPO");
  await expect(panel.locator("li").filter({ hasText: "Chromebooki" })).toContainText("46");
  await expect(panel.locator("li").filter({ hasText: "iPad" })).toContainText("96");
  await expect(panel.locator("li").first()).toContainText("160");
  await expect(panel.locator("li").first()).toContainText("Laptopy");
  await expect(page.locator("#kpoTotal")).toHaveText("302 szt.");

  await page.getByRole("link", { name: /^Do zakupu/ }).click();
  await expect(panel).toBeHidden();
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
  await expect(monitors.locator(".qty-value")).toHaveText("8");
  await expect(monitors).toContainText("75 cali");
  const priority = monitors.locator(".purchase-rooms > div", { hasText: "Najpierw" });
  await expect(priority.locator(".room-chip")).toHaveText(["Sala 2", "Sala 18", "Sala 41"]);
  const rest = monitors.locator(".purchase-rooms > div", { hasText: "Potem" });
  await expect(rest.locator(".room-chip")).toHaveText(["Sala 23", "Sala 29", "Sala 30", "Sala 32", "Sala 33"]);

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
  await expect(page.locator(".print-sheet")).toContainText("Monitor interaktywny (75 cali), 8 szt.");

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
  await expect(hdmi.locator(".qty-value")).toHaveText("10");
  await expect(hdmi.locator(".room-chip")).toHaveText(["Sala 2", "Sala 18", "Sala 23", "Sala 29", "Sala 30", "Sala 32", "Sala 33", "Sala 41", "Sala 37", "Sala 38"]);

  const vesaMonitors = card(page, "Stojak do monitora interaktywnego");
  await expect(vesaMonitors).toContainText("VESA 800 × 400");
  await expect(vesaMonitors).toContainText("54,6 kg");
  await expect(vesaMonitors.locator(".qty-value")).toHaveText("8");
  await expect(vesaMonitors.locator(".room-chip")).toHaveCount(8);

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
  await expect(page.locator("#calcTotal")).toHaveText("83 007,74 zł");
  await expect(page.locator("#calcMeta")).toHaveText("Zaznaczone: 10 poz. · 35 szt.");
  await expect(page.locator("#calcBreakdown")).toContainText("Sprzęt");
  await expect(page.locator("#calcBreakdown")).toContainText("77 562,70 zł");
  await expect(page.locator("#calcBreakdown")).toContainText("Zakupy towarzyszące");
  await expect(page.locator("#calcBreakdown")).toContainText("5 445,04 zł");

  const boxes = page.locator(".purchase-check");
  await expect(boxes).toHaveCount(10);
  for (const box of await boxes.all()) await expect(box).toBeChecked();

  await expect(card(page, "Monitor interaktywny").locator(".calc-line")).toHaveText("Do sumy: 7 245,53 zł netto × 8 = 57 964,24 zł");
  await expect(card(page, "85–86 cali").locator(".calc-line")).toHaveText("Do sumy: 2 999,00 zł brutto × 2 = 5 998,00 zł");
  // VAT 0% do potwierdzenia: liczone brutto
  await expect(card(page, "Monitor dotykowy").locator(".calc-line")).toHaveText("Do sumy: 1 840,00 zł brutto × 1 = 1 840,00 zł");
  await expect(card(page, "Monitor wielkoformatowy").locator(".calc-line")).toHaveText("Do sumy: 2 058,00 zł brutto × 1 = 2 058,00 zł");
  await expect(card(page, "Monitor prezentacyjny").locator(".calc-line")).toHaveText("Do sumy: 3 612,00 zł brutto × 1 = 3 612,00 zł");
  // VAT 0% pewny: liczone netto
  await expect(card(page, "Monitor biurowy").locator(".calc-line")).toHaveText("Do sumy: 2 041,46 zł netto × 1 = 2 041,46 zł");

  await expect(card(page, "Uchwyt VESA do telewizora").locator(".calc-line")).toHaveText("Do sumy: 299,97 zł brutto × 2 = 599,94 zł");

  await expect(card(page, "Kabel HDMI światłowodowy").locator(".calc-line")).toHaveText("Do sumy: 189,99 zł brutto × 10 = 1 899,90 zł");

  await expect(card(page, "Stojak do monitora interaktywnego").locator(".calc-line")).toHaveText("Do sumy: 368,15 zł brutto × 8 = 2 945,20 zł");

  // wszystkie pozycje mają ceny: brak ostrzeżenia o pominiętych
  await expect(page.locator("#calcWarning")).toBeHidden();
});

test("kalkulator: odznaczanie pozycji", async ({ page }) => {
  await page.goto("/#zakupy");
  await card(page, "Monitor biurowy").getByRole("checkbox").uncheck();
  await expect(page.locator("#calcTotal")).toHaveText("80 966,28 zł");
  await card(page, "Monitor prezentacyjny").getByRole("checkbox").uncheck();
  await expect(page.locator("#calcTotal")).toHaveText("77 354,28 zł");
  await card(page, "Monitor interaktywny").getByRole("checkbox").uncheck();
  await expect(page.locator("#calcTotal")).toHaveText("19 390,04 zł");
  await expect(page.locator("#calcMeta")).toHaveText("Zaznaczone: 7 poz. · 25 szt.");
  await expect(card(page, "Monitor interaktywny")).toHaveClass(/is-excluded/);

  await card(page, "Kabel HDMI światłowodowy").getByRole("checkbox").uncheck();
  await expect(page.locator("#calcTotal")).toHaveText("17 490,14 zł");

  await card(page, "Monitor interaktywny").getByRole("checkbox").check();
  await expect(page.locator("#calcTotal")).toHaveText("75 454,38 zł");
});

test("kalkulator: zmiana ilości", async ({ page }) => {
  await page.goto("/#zakupy");
  const monitors = card(page, "Monitor interaktywny");
  await monitors.getByRole("button", { name: "Zwiększ ilość" }).click();
  await expect(monitors.locator(".qty-value")).toHaveText("9");
  await expect(monitors.locator(".calc-line")).toHaveText("Do sumy: 7 245,53 zł netto × 9 = 65 209,77 zł");
  await expect(page.locator("#calcTotal")).toHaveText("90 253,27 zł");
  await expect(page.locator("#calcMeta")).toHaveText("Zaznaczone: 10 poz. · 36 szt.");
  await expect(page.locator(".purchase-tier").nth(0)).toContainText("7 poz. · 16 szt.");
  await expect(page.locator(".print-sheet")).toContainText("Monitor interaktywny (75 cali), 9 szt.");

  const minus = monitors.getByRole("button", { name: "Zmniejsz ilość" });
  for (let i = 0; i < 8; i += 1) await minus.click();
  await expect(monitors.locator(".qty-value")).toHaveText("1");
  await expect(minus).toHaveAttribute("aria-disabled", "true");
  await minus.click({ force: true });
  await expect(monitors.locator(".qty-value")).toHaveText("1");
  await expect(page.locator("#calcTotal")).toHaveText("32 289,03 zł");
});

test("kalkulator: zapamiętuje wybór, przyciski zaznaczają, czyszczą i przywracają domyślne", async ({ page }) => {
  await page.goto("/#zakupy");
  await card(page, "Monitor biurowy").getByRole("checkbox").uncheck();
  await card(page, "Komputer all-in-one").getByRole("button", { name: "Zwiększ ilość" }).click();
  await expect(page.locator("#calcTotal")).toHaveText("85 015,28 zł");

  await page.reload();
  await expect(card(page, "Monitor biurowy").getByRole("checkbox")).not.toBeChecked();
  await expect(card(page, "Komputer all-in-one").locator(".qty-value")).toHaveText("2");
  await expect(page.locator("#calcTotal")).toHaveText("85 015,28 zł");

  await page.locator(".calc-details summary").click();
  await page.locator("#calcClear").click();
  await expect(page.locator("#calcTotal")).toHaveText("0,00 zł");
  await expect(page.locator("#calcMeta")).toHaveText("Zaznaczone: 0 poz. · 0 szt.");
  await page.locator("#calcSelectAll").click();
  await expect(page.getByRole("checkbox", { name: /Monitor biurowy/ })).toBeChecked();

  await card(page, "Monitor biurowy").getByRole("checkbox").uncheck();
  await page.locator("#calcReset").click();
  await expect(page.locator("#calcTotal")).toHaveText("83 007,74 zł");
  await expect(card(page, "Komputer all-in-one").locator(".qty-value")).toHaveText("1");
  await expect(card(page, "Monitor biurowy").getByRole("checkbox")).toBeChecked();
});

test("kalkulator trafia na wydruk listy zakupów", async ({ page }) => {
  await page.goto("/#zakupy");
  const sheet = page.locator(".print-sheet");
  await expect(sheet).toContainText("Kalkulacja (zaznaczone pozycje)");
  await expect(sheet).toContainText("Monitor interaktywny (75 cali) × 8: 57 964,24 zł (netto)");
  await expect(sheet).toContainText("Telewizor (4K, 85–86 cali) × 2: 5 998,00 zł (brutto)");
  await expect(sheet).toContainText("Kabel HDMI światłowodowy (25 m) × 10: 1 899,90 zł (brutto)");
  await expect(sheet).toContainText("Stojak do monitora interaktywnego (na kółkach, VESA 800 × 400) × 8: 2 945,20 zł (brutto)");
  await expect(sheet).toContainText("Uchwyt VESA do telewizora (VESA 600 × 400) × 2: 599,94 zł (brutto)");
  await expect(sheet).toContainText("Razem: 83 007,74 zł");
  await expect(sheet).not.toContainText("Nie wliczono pozycji bez ceny");

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
  await expect(monitorMount.locator(".room-chip")).toHaveCount(8);
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
  await expect(page.locator("#calcTotal")).toHaveText("83 007,74 zł");
  await expect(page.locator("#calcWarning")).toBeVisible();
  await expect(page.locator("#calcWarning")).toContainText("Bez ceny, nie wliczono do sumy: Testowy dodatek (bez ceny)");
  await expect(page.locator(".print-sheet")).toContainText("Testowy dodatek (bez ceny) × 3: brak ceny");
  await expect(page.locator(".print-sheet")).toContainText("Nie wliczono pozycji bez ceny: Testowy dodatek (bez ceny)");

  await extra.getByRole("checkbox").uncheck();
  await expect(page.locator("#calcWarning")).toBeHidden();
});
