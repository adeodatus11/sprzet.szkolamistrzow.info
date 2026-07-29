import { expect, test } from "@playwright/test";

test("pokazuje listę sal i szczegóły", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Sprzęt i wyposażenie sal" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Sala 37/ })).toBeVisible();
  await page.getByRole("button", { name: /Sala 37/ }).click();
  await expect(page.getByRole("heading", { name: "Sala 37" })).toBeVisible();
  await expect(page.locator("#roomDetail").getByText("24 stanowiska dla uczniów")).toBeVisible();
  await expect(page.locator("#roomDetail").getByText("Stała kontrola techniczna")).toBeVisible();
  await expect(page.locator("#roomDetail").getByText("przewody są zamocowane na stałe")).toBeVisible();
});

test("filtruje po wyposażeniu i statusie", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Szukaj").fill("iPad");
  await expect(page.getByRole("button", { name: /Sala 5/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Sala 17/ })).toBeVisible();

  await page.getByLabel("Szukaj").fill("");
  await page.getByLabel("Status").selectOption("decision");
  await expect(page.getByRole("button", { name: /Sala 23/ })).toBeVisible();
});

test("przygotowuje widok wydruku", async ({ page }) => {
  await page.goto("/#room-41");
  await expect(page.locator(".print-sheet")).toContainText("Sala 41");
  await expect(page.locator(".print-sheet")).toContainText("Stała kontrola techniczna");
  await expect(page.locator(".print-sheet")).toContainText("Sprawdził/a");
});

test("pokazuje pilne zakupy w nowej sali 05", async ({ page }) => {
  await page.goto("/#room-05-new");
  await expect(page.locator("#roomDetail")).toContainText("Pilne zakupy / do doniesienia");
  await expect(page.locator("#roomDetail")).toContainText("Kupić telewizor multimedialny na ścianę");
});
