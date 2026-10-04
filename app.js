import {
  cabinets,
  dataUpdatedAt,
  defaultRoomId,
  floors,
  kpoAllocations,
  kpoDelivery,
  kpoNotes,
  otherAssets,
  purchaseItems,
  purchaseLabel,
  purchaseTiers,
  rooms,
  standardControlTasks,
  statusLabels,
  unresolvedItems,
} from "./equipment-data.js";

const els = {
  stats: document.querySelector("#stats"),
  search: document.querySelector("#search"),
  statusFilter: document.querySelector("#statusFilter"),
  floorJump: document.querySelector("#floorJump"),
  roomList: document.querySelector("#roomList"),
  resultCount: document.querySelector("#resultCount"),
  detail: document.querySelector("#roomDetail"),
  openItems: document.querySelector("#openItems"),
  openItemsCount: document.querySelector("#openItemsCount"),
  resourcesTabCount: document.querySelector("#resourcesTabCount"),
  resourcesSummary: document.querySelector("#resourcesSummary"),
  resourceTotal: document.querySelector("#resourceTotal"),
  resourceCards: document.querySelector("#resourceCards"),
  otherAssets: document.querySelector("#otherAssets"),
  cabinetList: document.querySelector("#cabinetList"),
  resourceNotes: document.querySelector("#resourceNotes"),
  printResources: document.querySelector("#printResources"),
  printSheet: document.querySelector("#printSheet"),
  catalogToggle: document.querySelector("#catalogToggle"),
  mobileCatalogToggle: document.querySelector("#mobileCatalogToggle"),
  catalogClose: document.querySelector("#catalogClose"),
  catalogDrawer: document.querySelector("#catalogDrawer"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  previousRoom: document.querySelector("#previousRoom"),
  nextRoom: document.querySelector("#nextRoom"),
  mobileRoomPosition: document.querySelector("#mobileRoomPosition"),
  viewTabs: document.querySelector("#viewTabs"),
  roomsTab: document.querySelector("#roomsTab"),
  roomsTabCount: document.querySelector("#roomsTabCount"),
  purchasesTabCount: document.querySelector("#purchasesTabCount"),
  purchaseSummary: document.querySelector("#purchaseSummary"),
  purchaseLists: document.querySelector("#purchaseLists"),
  printPurchases: document.querySelector("#printPurchases"),
  calcTotal: document.querySelector("#calcTotal"),
  calcMeta: document.querySelector("#calcMeta"),
  calcBreakdown: document.querySelector("#calcBreakdown"),
  calcWarning: document.querySelector("#calcWarning"),
  calcSelectAll: document.querySelector("#calcSelectAll"),
  calcClear: document.querySelector("#calcClear"),
  calcReset: document.querySelector("#calcReset"),
};

const VIEW_HASHES = { purchases: "#zakupy", resources: "#zasoby" };
const VIEW_TITLES = { purchases: "Do zakupu", resources: "Zasoby" };
const baseTitle = document.title;

const mobileCatalogQuery = window.matchMedia("(max-width: 980px)");
const catalogToggles = [els.catalogToggle, els.mobileCatalogToggle];
let lastCatalogTrigger = els.catalogToggle;

const roomIdFromHash = () => decodeURIComponent(location.hash.replace("#room-", ""));
const roomExists = (id) => rooms.some((room) => room.id === id);
const viewFromHash = () => Object.keys(VIEW_HASHES).find((view) => VIEW_HASHES[view] === location.hash) ?? "rooms";

const state = {
  view: viewFromHash(),
  query: "",
  status: "all",
  activeId: roomExists(roomIdFromHash()) ? roomIdFromHash() : defaultRoomId,
};

const normalize = (value) => String(value)
  .toLowerCase()
  .normalize("NFD")
  .replace(/[̀-ͯ]/g, "")
  .replace(/ł/g, "l");

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
}[char]));

const floorById = (id) => floors.find((floor) => floor.id === id);
const roomById = (id) => rooms.find((room) => room.id === id);
const roomsOnFloor = (floorId) => rooms.filter((room) => room.floor === floorId);
const chipLabel = (room) => room.short || room.name.replace(/^Sala\s+/, "");

const roomPath = (room) => {
  const floor = floorById(room.floor);
  return [floor?.building, floor?.label, room.place].filter(Boolean);
};

const roomSearchText = (room) => normalize([
  room.name,
  roomPath(room).join(" "),
  room.purpose,
  room.teachers.join(" "),
  room.equipment.flatMap((item) => [item.name, ...item.items]).join(" "),
  standardControlTasks.join(" "),
  room.urgentTasks.map((task) => task.text).join(" "),
  room.tasks.map((task) => task.text).join(" "),
  room.decisions.join(" "),
  room.notes.join(" "),
].join(" "));

const searchIndex = new Map(rooms.map((room) => [room.id, roomSearchText(room)]));

const filteredRooms = () => {
  const query = normalize(state.query.trim());
  return rooms.filter((room) => {
    const matchesQuery = !query || searchIndex.get(room.id).includes(query);
    const matchesStatus = state.status === "all" || room.status === state.status;
    return matchesQuery && matchesStatus;
  });
};

const activeRoom = () => roomById(state.activeId) || filteredRooms()[0] || rooms[0];

const listItems = (items, className = "") => {
  if (!items?.length) return "";
  return `<ul${className ? ` class="${className}"` : ""}>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
};

const taskItems = (tasks, className = "") => {
  if (!tasks?.length) return "";
  const items = tasks.map((task) => `<li${task.done ? ' class="is-done"' : ""}>${task.done ? '<span class="visually-hidden">Zrobione: </span>' : ""}${escapeHtml(task.text)}</li>`);
  return `<ul${className ? ` class="${className}"` : ""}>${items.join("")}</ul>`;
};

const taskTitle = (title, tasks) => {
  const doneCount = tasks.filter((task) => task.done).length;
  return doneCount ? `${title} · zrobione ${doneCount} z ${tasks.length}` : title;
};

const statusBadge = (status) => `<span class="badge ${status}">${escapeHtml(statusLabels[status])}</span>`;

const setCatalogOpen = (isOpen, { restoreFocus = true } = {}) => {
  if (!mobileCatalogQuery.matches) isOpen = false;
  document.body.classList.toggle("catalog-open", isOpen);
  document.documentElement.classList.toggle("catalog-open", isOpen);
  els.catalogDrawer.dataset.open = String(isOpen);
  els.catalogDrawer.toggleAttribute("inert", mobileCatalogQuery.matches && !isOpen);
  els.catalogDrawer.setAttribute("aria-hidden", String(mobileCatalogQuery.matches && !isOpen));
  catalogToggles.forEach((toggle) => toggle.setAttribute("aria-expanded", String(isOpen)));
  els.drawerBackdrop.hidden = !isOpen;

  if (isOpen) {
    requestAnimationFrame(() => els.catalogClose.focus());
  } else if (restoreFocus && mobileCatalogQuery.matches) {
    lastCatalogTrigger?.focus();
  }
};

const openCatalog = (trigger) => {
  lastCatalogTrigger = trigger;
  setCatalogOpen(true);
};

const renderStats = () => {
  const counts = rooms.reduce((acc, room) => {
    acc[room.status] = (acc[room.status] || 0) + 1;
    return acc;
  }, {});

  const tiles = [
    ["all", "Wszystkie sale", rooms.length],
    ...["missing", "todo", "decision", "check", "ready"].map((status) => [status, statusLabels[status], counts[status] || 0]),
  ];

  els.stats.innerHTML = tiles.map(([status, label, value]) => `
    <button class="stat ${status}" type="button" data-status="${status}" aria-pressed="${state.status === status}">
      <span class="stat-value">${value}</span>
      <span class="stat-label">${escapeHtml(label)}</span>
    </button>
  `).join("");
};

const renderFilters = () => {
  els.statusFilter.innerHTML += Object.entries(statusLabels)
    .map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`)
    .join("");
};

const renderFloorJump = () => {
  const visibleRooms = filteredRooms();
  const activeFloor = activeRoom().floor;

  els.floorJump.innerHTML = floors.map((floor) => {
    const count = visibleRooms.filter((room) => room.floor === floor.id).length;
    return `
      <button class="floor-chip ${floor.id === activeFloor ? "is-current" : ""}" type="button" data-floor="${escapeHtml(floor.id)}" ${count ? "" : "disabled"}>
        ${escapeHtml(floor.short)}
        <span>${count}</span>
      </button>
    `;
  }).join("");
};

const renderList = () => {
  const visibleRooms = filteredRooms();
  els.resultCount.textContent = visibleRooms.length;

  if (!visibleRooms.length) {
    els.roomList.innerHTML = `<div class="empty-state">Brak sal dla wybranych filtrów.</div>`;
    return;
  }

  els.roomList.innerHTML = floors.map((floor) => {
    const floorRooms = visibleRooms.filter((room) => room.floor === floor.id);
    if (!floorRooms.length) return "";

    return `
      <section class="floor-group" data-floor="${escapeHtml(floor.id)}">
        <h3 class="floor-heading">
          <span>${escapeHtml(floor.label)}</span>
          <span class="floor-count">${floorRooms.length}</span>
        </h3>
        ${floorRooms.map((room) => `
          <button class="room-row ${room.id === state.activeId ? "is-active" : ""}" type="button" data-room-id="${escapeHtml(room.id)}" ${room.id === state.activeId ? 'aria-current="true"' : ""}>
            <span class="row-top">
              <span class="row-title">${escapeHtml(room.name)}</span>
              ${statusBadge(room.status)}
            </span>
            ${room.purpose ? `<span class="row-purpose">${escapeHtml(room.purpose)}</span>` : ""}
          </button>
        `).join("")}
      </section>
    `;
  }).join("");
};

const keepActiveRowVisible = () => {
  const row = els.roomList.querySelector(".room-row.is-active");
  if (!row) return;
  const listRect = els.roomList.getBoundingClientRect();
  const rowRect = row.getBoundingClientRect();
  const headingOffset = 40;
  if (rowRect.top < listRect.top + headingOffset || rowRect.bottom > listRect.bottom) {
    const rowCenter = rowRect.top + rowRect.height / 2;
    const listCenter = listRect.top + listRect.height / 2;
    els.roomList.scrollTop += rowCenter - listCenter;
  }
};

const renderMobileNavigation = () => {
  const visibleRooms = filteredRooms();
  const activeIndex = visibleRooms.findIndex((room) => room.id === state.activeId);
  const hasActiveRoom = activeIndex >= 0;
  const floorLabel = floorById(activeRoom().floor)?.short;

  els.previousRoom.disabled = !hasActiveRoom || activeIndex === 0;
  els.nextRoom.disabled = !hasActiveRoom || activeIndex === visibleRooms.length - 1;
  els.mobileRoomPosition.textContent = `${floorLabel} · ${hasActiveRoom ? activeIndex + 1 : 0} z ${visibleRooms.length}`;
};

const roomLink = (room, { current = false, label = chipLabel(room), extraClass = "" } = {}) => `
  <a class="room-chip ${current ? "is-current" : ""} ${extraClass}" href="#room-${encodeURIComponent(room.id)}" data-room-id="${escapeHtml(room.id)}" title="${escapeHtml(room.name)}" ${current ? 'aria-current="page"' : ""}>${escapeHtml(label)}</a>
`;

const renderSwitcher = (room) => `
  <nav class="room-switcher" aria-label="Przełączanie sal">
    <div class="switcher-row floor-tabs">
      ${floors.map((floor) => {
        const first = roomsOnFloor(floor.id)[0];
        return `<a class="floor-tab ${floor.id === room.floor ? "is-current" : ""}" href="#room-${encodeURIComponent(first.id)}" data-room-id="${escapeHtml(first.id)}" ${floor.id === room.floor ? 'aria-current="true"' : ""}>${escapeHtml(floor.short)}</a>`;
      }).join("")}
    </div>
    <div class="switcher-row room-chips">
      ${roomsOnFloor(room.floor).map((item) => roomLink(item, { current: item.id === room.id })).join("")}
    </div>
  </nav>
`;

const renderPager = () => {
  const visibleRooms = filteredRooms();
  const index = visibleRooms.findIndex((room) => room.id === state.activeId);
  const previous = index > 0 ? visibleRooms[index - 1] : null;
  const next = index >= 0 ? visibleRooms[index + 1] : null;

  const link = (target, direction) => {
    if (!target) return `<span class="pager-link is-empty" aria-hidden="true"></span>`;
    const floor = floorById(target.floor);
    return `
      <a class="pager-link ${direction}" href="#room-${encodeURIComponent(target.id)}" data-room-id="${escapeHtml(target.id)}">
        <span class="pager-hint">${direction === "prev" ? "← Poprzednia" : "Następna →"}</span>
        <strong>${escapeHtml(target.name)}</strong>
        <span class="pager-floor">${escapeHtml(floor.label)}</span>
      </a>
    `;
  };

  return `<nav class="detail-pager" aria-label="Sąsiednie sale">${link(previous, "prev")}${link(next, "next")}</nav>`;
};

const section = (title, body, className = "") => `
  <section class="detail-section ${className}">
    <h3>${escapeHtml(title)}</h3>
    ${body}
  </section>
`;

const renderDetail = () => {
  const room = activeRoom();
  state.activeId = room.id;

  const equipment = room.equipment.length
    ? `<div class="equipment-groups">${room.equipment.map((item) => `
        <div class="equipment-group">
          <h4>${escapeHtml(item.name)}</h4>
          ${listItems(item.items)}
        </div>
      `).join("")}</div>`
    : `<p class="placeholder">Brak wpisanego wyposażenia.</p>`;

  const teachers = room.teachers.length
    ? listItems(room.teachers, "plain-list")
    : `<p class="placeholder">Do uzupełnienia.</p>`;

  const controls = `
    <section class="detail-section control-section">
      <details class="control-details" open>
        <summary>Stała kontrola techniczna</summary>
        ${listItems(standardControlTasks, "checklist")}
      </details>
    </section>
  `;

  els.detail.innerHTML = `
    <header class="detail-header">
      <nav class="breadcrumb" aria-label="Położenie sali">
        ${roomPath(room).map((part) => `<span>${escapeHtml(part)}</span>`).join("")}
      </nav>
      <div class="detail-title">
        <h2 tabindex="-1">${escapeHtml(room.name)}</h2>
        ${statusBadge(room.status)}
      </div>
      ${room.purpose ? `<p class="detail-purpose">${escapeHtml(room.purpose)}</p>` : ""}
      <div class="detail-actions">
        <button class="primary" id="printRoom" type="button">Drukuj kartę</button>
        <a href="https://nawigacja.szkolamistrzow.info/?room=${encodeURIComponent(room.id)}">Pokaż na planie</a>
      </div>
      ${renderSwitcher(room)}
    </header>

    <div class="detail-layout">
      <div class="detail-main">
        ${room.urgentTasks.length ? section(taskTitle("Pilne zakupy i dostawy", room.urgentTasks), taskItems(room.urgentTasks, "checklist"), "is-urgent") : ""}
        ${room.tasks.length ? section(taskTitle("Do zrobienia", room.tasks), taskItems(room.tasks, "checklist")) : ""}
        ${section("Wyposażenie", equipment)}
        ${room.decisions.length ? section("Decyzje", listItems(room.decisions)) : ""}
        ${room.notes.length ? section("Uwagi", listItems(room.notes)) : ""}
      </div>
      <div class="detail-side">
        ${section("Użytkownicy sali", teachers)}
        ${controls}
      </div>
    </div>

    ${renderPager()}
  `;

  document.querySelector("#printRoom")?.addEventListener("click", () => window.print());
  renderPrintSheet(room);
};

const printSection = (title, body, className = "") => `
  <section class="print-section ${className}">
    <h2>${escapeHtml(title)}</h2>
    ${body}
  </section>
`;

const renderPrintSheet = (room) => {
  const equipmentPrint = room.equipment.length
    ? room.equipment.map((item) => printSection(item.name, listItems(item.items))).join("")
    : printSection("Wyposażenie", "<p>Brak wpisanego wyposażenia.</p>");

  els.printSheet.innerHTML = `
    <h1>${escapeHtml(room.name)}</h1>
    <div class="print-meta">
      <div><strong>Lokalizacja:</strong> ${escapeHtml(roomPath(room).join(", "))}</div>
      <div><strong>Status:</strong> ${escapeHtml(statusLabels[room.status])}</div>
      <div><strong>Przeznaczenie:</strong> ${escapeHtml(room.purpose || "Do uzupełnienia")}</div>
      <div><strong>Aktualizacja danych:</strong> ${escapeHtml(dataUpdatedAt)}</div>
    </div>
    ${room.teachers.length ? printSection("Użytkownicy sali", listItems(room.teachers)) : ""}
    ${room.urgentTasks.length ? printSection(taskTitle("Pilne zakupy i dostawy", room.urgentTasks), taskItems(room.urgentTasks), "print-urgent") : ""}
    ${room.tasks.length ? printSection(taskTitle("Do zrobienia", room.tasks), taskItems(room.tasks)) : ""}
    ${equipmentPrint}
    ${room.decisions.length ? printSection("Decyzje", listItems(room.decisions)) : ""}
    ${room.notes.length ? printSection("Uwagi", listItems(room.notes)) : ""}
    ${printSection("Stała kontrola techniczna", listItems(standardControlTasks))}
    ${printSection("Uwagi ręczne", "<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>")}
    <div class="signatures">
      <div class="signature-line">Sprawdził/a</div>
      <div class="signature-line">Data</div>
      <div class="signature-line">Braki przekazane do</div>
      <div class="signature-line">Podpis</div>
    </div>
  `;
};

const purchaseRoomGroups = (item) => {
  const priority = item.priorityRoomIds ?? [];
  const rest = item.roomIds.filter((id) => !priority.includes(id));
  return [
    { label: "Najpierw", ids: priority, priority: true },
    { label: priority.length ? "Potem" : "Sale", ids: rest, priority: false },
  ].filter((group) => group.ids.length);
};

const MAX_QTY = 99;
const PURCHASE_STORAGE_KEY = "sprzet-zakupy-v2";

const purchaseItemsOf = (tier) => purchaseItems.filter((item) => item.tier === tier.id);
const purchaseItemById = (id) => purchaseItems.find((item) => item.id === id);
const totalQty = (items) => items.reduce((sum, item) => sum + item.qty, 0);

// Stan kalkulatora: domyślnie wszystko zaznaczone, ilości z listy; zapamiętywany w przeglądarce.
const defaultPurchaseState = () => Object.fromEntries(
  purchaseItems.map((item) => [item.id, { checked: true, qty: item.qty }]),
);

const loadPurchaseState = () => {
  const saved = defaultPurchaseState();
  try {
    const stored = JSON.parse(localStorage.getItem(PURCHASE_STORAGE_KEY) ?? "{}");
    Object.entries(stored).forEach(([id, entry]) => {
      if (!saved[id] || !entry) return;
      if (typeof entry.checked === "boolean") saved[id].checked = entry.checked;
      if (Number.isInteger(entry.qty) && entry.qty >= 1 && entry.qty <= MAX_QTY) saved[id].qty = entry.qty;
    });
  } catch {
    // Brak dostępu do pamięci przeglądarki: kalkulator działa na wartościach domyślnych.
  }
  return saved;
};

const purchaseState = loadPurchaseState();

const savePurchaseState = () => {
  try {
    localStorage.setItem(PURCHASE_STORAGE_KEY, JSON.stringify(purchaseState));
  } catch {
    // Zapis jest tylko udogodnieniem.
  }
};

const currentQty = (item) => purchaseState[item.id].qty;
const sumQty = (items) => items.reduce((sum, item) => sum + currentQty(item), 0);

const numberFormat = (options) => new Intl.NumberFormat("pl-PL", { useGrouping: "always", ...options });

const formatPrice = ({ amount, vat }) => {
  const number = numberFormat({ minimumFractionDigits: Number.isInteger(amount) ? 0 : 2 }).format(amount);
  return `${number} zł ${vat}`;
};

const formatPrices = (offer) => offer.prices.map(formatPrice).join(" / ");

const formatMoney = (cents) => `${numberFormat({ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cents / 100)} zł`;

const vatNote = (offer) => ({
  true: "VAT 0%",
  false: "brak możliwości VAT 0%",
  unknown: "VAT 0% do potwierdzenia",
}[offer.zeroVat] ?? "");

// Cena jednostkowa do sumy: netto tylko przy pewnym VAT 0%, w pozostałych przypadkach brutto.
const unitPrice = (item) => {
  const offer = item.offers?.[0];
  if (!offer) return null;
  const wanted = offer.zeroVat === true ? "netto" : "brutto";
  const price = offer.prices.find((entry) => entry.vat === wanted) ?? offer.prices[0];
  return { cents: Math.round(price.amount * 100), vat: price.vat };
};

const calcSummary = () => {
  const selected = purchaseItems.filter((item) => purchaseState[item.id].checked);
  const lineCents = (item) => (unitPrice(item)?.cents ?? 0) * currentQty(item);
  const sumCents = (items) => items.reduce((sum, item) => sum + lineCents(item), 0);
  return {
    selected,
    unpriced: selected.filter((item) => !unitPrice(item)),
    total: sumCents(selected),
    tierTotals: purchaseTiers.map((tier) => ({
      tier,
      cents: sumCents(selected.filter((item) => item.tier === tier.id)),
    })),
  };
};

const calcLineText = (item) => {
  const price = unitPrice(item);
  if (!price) return "Brak ceny, pozycja nie wchodzi do sumy";
  const qty = currentQty(item);
  return `Do sumy: ${formatMoney(price.cents)} ${price.vat} × ${qty} = ${formatMoney(price.cents * qty)}`;
};

const offersBlock = (item) => {
  if (!item.offers?.length) return "";
  const checked = [...new Set(item.offers.map((offer) => offer.checkedAt))].join(", ");
  return `
    <div class="purchase-offers">
      <ul>${item.offers.map((offer) => `
        <li>
          <a href="${escapeHtml(offer.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(offer.label)}</a>
          <span class="offer-price">${formatPrices(offer)}</span>
          ${vatNote(offer) ? `<span class="offer-vat">${escapeHtml(vatNote(offer))}</span>` : ""}
          <span class="offer-shop">${escapeHtml(offer.shop)}</span>
        </li>
      `).join("")}</ul>
      <p>Stan cen z ${escapeHtml(checked)}.</p>
    </div>
  `;
};

const placeBlock = (item) => {
  if (!item.place) return `<p class="placeholder">Miejsce do ustalenia</p>`;
  const reference = roomById(item.place.roomId);
  return `
    <p class="purchase-place">
      <strong>Miejsce:</strong> ${escapeHtml(item.place.text)}
      ${reference ? roomLink(reference, { label: reference.name }) : ""}
    </p>
  `;
};

const purchaseCard = (item) => {
  const groups = purchaseRoomGroups(item);
  const roomsBlock = groups.length
    ? `<dl class="purchase-rooms">${groups.map((group) => `
        <div>
          <dt>${group.label}</dt>
          <dd>${group.ids.map(roomById).filter(Boolean).map((room) => roomLink(room, {
            label: room.name,
            extraClass: group.priority ? "is-priority" : "",
          })).join("")}</dd>
        </div>
      `).join("")}</dl>`
    : placeBlock(item);
  const label = escapeHtml(purchaseLabel(item));

  return `
    <article class="purchase-card" data-item-id="${escapeHtml(item.id)}">
      <header class="purchase-head">
        <input class="purchase-check" id="check-${escapeHtml(item.id)}" type="checkbox" data-item-check aria-label="Uwzględnij w kalkulacji: ${label}" />
        <h3><label for="check-${escapeHtml(item.id)}">${escapeHtml(item.name)}</label></h3>
        <div class="qty-control" role="group" aria-label="Ilość: ${label}">
          <button type="button" data-qty-step="-1" aria-label="Zmniejsz ilość">−</button>
          <output class="qty-value" data-qty-value></output>
          <span class="qty-unit">szt.</span>
          <button type="button" data-qty-step="1" aria-label="Zwiększ ilość">+</button>
        </div>
      </header>
      <ul class="spec-tags">${item.specs.map((spec) => `<li>${escapeHtml(spec)}</li>`).join("")}</ul>
      ${item.note ? `<p class="purchase-note">${escapeHtml(item.note)}</p>` : ""}
      ${offersBlock(item)}
      <p class="calc-line" data-calc-line></p>
      ${roomsBlock}
    </article>
  `;
};

const renderCalcSummary = () => {
  const { selected, unpriced, total, tierTotals } = calcSummary();
  els.calcTotal.textContent = formatMoney(total);
  els.calcMeta.textContent = `Zaznaczone: ${selected.length} poz. · ${sumQty(selected)} szt.`;
  els.calcBreakdown.innerHTML = tierTotals.map(({ tier, cents }) => `
    <div><dt>${escapeHtml(tier.label)}</dt><dd>${formatMoney(cents)}</dd></div>
  `).join("");
  els.calcWarning.hidden = !unpriced.length;
  els.calcWarning.textContent = unpriced.length
    ? `Bez ceny, nie wliczono do sumy: ${unpriced.map(purchaseLabel).join("; ")}`
    : "";
};

const syncPurchaseView = () => {
  els.purchaseLists.querySelectorAll(".purchase-card").forEach((card) => {
    const item = purchaseItemById(card.dataset.itemId);
    const entry = purchaseState[item.id];
    card.classList.toggle("is-excluded", !entry.checked);
    card.querySelector("[data-item-check]").checked = entry.checked;
    card.querySelector("[data-qty-value]").textContent = entry.qty;
    card.querySelector('[data-qty-step="-1"]').setAttribute("aria-disabled", String(entry.qty <= 1));
    card.querySelector('[data-qty-step="1"]').setAttribute("aria-disabled", String(entry.qty >= MAX_QTY));
    card.querySelector("[data-calc-line]").textContent = calcLineText(item);
  });
  els.purchaseLists.querySelectorAll("[data-tier-count]").forEach((counter) => {
    const items = purchaseItemsOf({ id: counter.dataset.tierCount });
    counter.textContent = `${items.length} poz. · ${sumQty(items)} szt.`;
  });
  renderCalcSummary();
  if (state.view === "purchases") renderPurchasePrint();
};

const commitPurchaseState = () => {
  savePurchaseState();
  syncPurchaseView();
};

const renderPurchaseView = () => {
  els.purchaseSummary.textContent = `Sprzęt, który dobrze byłoby kupić. Zaznacz pozycje i ustaw ilości, a kalkulator policzy koszt. Pozycje z przypisanymi salami są też na kartach tych sal. Stan z ${dataUpdatedAt}.`;
  els.purchasesTabCount.textContent = purchaseItems.length;

  els.purchaseLists.innerHTML = purchaseTiers.map((tier) => {
    const items = purchaseItemsOf(tier);
    if (!items.length) return "";
    return `
      <section class="purchase-tier" aria-labelledby="tier-${tier.id}">
        <div class="panel-heading">
          <div>
            <h2 id="tier-${tier.id}">${escapeHtml(tier.label)}</h2>
            <p>${escapeHtml(tier.hint)}</p>
          </div>
          <span data-tier-count="${tier.id}"></span>
        </div>
        <div class="purchase-grid">${items.map(purchaseCard).join("")}</div>
      </section>
    `;
  }).join("");

  syncPurchaseView();
};

const placePrintText = (item) => {
  if (!item.place) return "miejsce do ustalenia";
  const reference = roomById(item.place.roomId);
  return `miejsce: ${item.place.text.toLowerCase()}${reference ? ` (${reference.name.toLowerCase()})` : ""}`;
};

const purchasePrintLine = (item) => {
  const roomText = purchaseRoomGroups(item).map((group) => {
    const labels = group.ids.map(roomById).filter(Boolean).map((room) => (group.priority ? `${chipLabel(room)} (najpierw)` : chipLabel(room)));
    return labels.join(", ");
  }).join(", ");

  return [
    `${purchaseLabel(item)}, ${currentQty(item)} szt.`,
    item.note,
    ...(item.offers ?? []).map((offer) => `np. ${offer.label}, ${[formatPrices(offer), vatNote(offer)].filter(Boolean).join(", ")} (${offer.shop})`),
    roomText ? `sale: ${roomText}` : placePrintText(item),
  ].filter(Boolean).join("; ");
};

const calcPrintSection = () => {
  const { selected, unpriced, total } = calcSummary();
  if (!selected.length) return printSection("Kalkulacja (zaznaczone pozycje)", "<p>Nie zaznaczono żadnych pozycji.</p>");

  const lines = selected.map((item) => {
    const price = unitPrice(item);
    const amount = price ? `${formatMoney(price.cents * currentQty(item))} (${price.vat})` : "brak ceny";
    return `${purchaseLabel(item)} × ${currentQty(item)}: ${amount}`;
  });
  return printSection("Kalkulacja (zaznaczone pozycje)", `
    ${listItems(lines)}
    <p><strong>Razem: ${formatMoney(total)}</strong></p>
    ${unpriced.length ? `<p>Nie wliczono pozycji bez ceny: ${escapeHtml(unpriced.map(purchaseLabel).join("; "))}</p>` : ""}
    <p>Ceny netto przy pewnym VAT 0%, w pozostałych przypadkach brutto.</p>
  `);
};

const renderPurchasePrint = () => {
  els.printSheet.innerHTML = `
    <h1>Lista zakupów</h1>
    <div class="print-meta">
      <div><strong>Aktualizacja danych:</strong> ${escapeHtml(dataUpdatedAt)}</div>
    </div>
    ${purchaseTiers.map((tier) => printSection(tier.label, listItems(purchaseItemsOf(tier).map(purchasePrintLine)))).join("")}
    ${calcPrintSection()}
  `;
};

const renderViewTabs = () => {
  document.body.dataset.view = state.view;
  document.title = VIEW_TITLES[state.view] ? `${VIEW_TITLES[state.view]} | ${baseTitle}` : baseTitle;
  els.roomsTab.href = `#room-${encodeURIComponent(state.activeId)}`;
  els.viewTabs.querySelectorAll("[data-view]").forEach((tab) => {
    if (tab.dataset.view === state.view) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  });
};

const renderOpenItems = () => {
  els.openItemsCount.textContent = unresolvedItems.length;
  els.openItems.innerHTML = unresolvedItems.map((item) => {
    const targets = item.roomIds.map(roomById).filter(Boolean);
    const links = targets.length
      ? targets.map((room) => `<a class="item-room" href="#room-${encodeURIComponent(room.id)}" data-room-id="${escapeHtml(room.id)}">${escapeHtml(room.name)}</a>`).join("")
      : `<span class="item-room is-general">Wszystkie sale</span>`;
    return `<li>${links}<span>${escapeHtml(item.text)}</span></li>`;
  }).join("");
};

// Zasoby: sprzęt z KPO, ile jest w salach, ile ma tam trafić, ile leży jeszcze w pudełkach.
const kpoStats = (device) => {
  const entries = kpoAllocations.filter((entry) => entry.deviceId === device.id);
  const byRoom = (state) => {
    const totals = new Map();
    entries.filter((entry) => entry.state === state).forEach((entry) => {
      const key = entry.roomId ?? `@${entry.assignee}`;
      const row = totals.get(key) ?? { roomId: entry.roomId, assignee: entry.assignee, qty: 0 };
      row.qty += entry.qty;
      totals.set(key, row);
    });
    return [...totals.values()];
  };
  const sum = (rows) => rows.reduce((total, row) => total + row.qty, 0);
  const placedRooms = byRoom("placed");
  const plannedRooms = byRoom("planned");
  const movingRooms = byRoom("moving");
  const placed = sum(placedRooms);
  const planned = sum(plannedRooms);
  return {
    placedRooms,
    plannedRooms,
    movingRooms,
    placed,
    planned,
    inBoxes: device.qty - placed,
    free: Math.max(0, device.qty - placed - planned),
  };
};

const kpoTotals = () => {
  const stats = kpoDelivery.map(kpoStats);
  const sum = (key) => stats.reduce((total, item) => total + item[key], 0);
  return {
    delivered: totalQty(kpoDelivery),
    placed: sum("placed"),
    planned: sum("planned"),
    inBoxes: sum("inBoxes"),
  };
};

const percentOf = (part, whole) => (whole ? Math.round((part / whole) * 1000) / 10 : 0);

// Skrót sali w podziale sprzętu: "s.2", "s.05" (bez dopisku "nowa"); pracownie zewnętrzne mają krótkie nazwy.
const allocLabel = (room) => room.short || room.name.replace(/^Sala\s+/, "s.").replace(/\s*\(nowa\)$/, "");

const roomQtyChips = (rows) => {
  if (!rows.length) return `<p class="placeholder">Brak</p>`;
  return `<div class="allocation-chips">${rows.map(({ roomId, assignee, qty }) => {
    const room = roomId ? roomById(roomId) : null;
    const label = room ? allocLabel(room) : roomId ?? assignee;
    const text = `${escapeHtml(label)} <span class="alloc-qty">– <strong>${qty} szt.</strong></span>`;
    const wide = `${label} – ${qty} szt.`.length > 16 ? " is-wide" : "";
    return room
      ? `<a class="room-chip alloc-cell${wide}" href="#room-${encodeURIComponent(room.id)}" data-room-id="${escapeHtml(room.id)}" title="${escapeHtml(room.name)}">${text}</a>`
      : `<span class="room-chip alloc-cell${wide}">${text}</span>`;
  }).join("")}</div>`;
};

const resourceCard = (device) => {
  const stats = kpoStats(device);
  const segments = [
    ["placed", "W salach i u osób", stats.placed],
    ["planned", "Do wstawienia", stats.planned],
    ["free", "Wolne", stats.free],
  ];
  const summary = segments.map(([, label, qty]) => `${label.toLowerCase()} ${qty}`).join(", ");

  return `
    <article class="resource-card" data-device-id="${escapeHtml(device.id)}">
      <header class="resource-head">
        <h3>${escapeHtml(device.name)}</h3>
        <span class="resource-qty">${device.qty} szt.</span>
      </header>
      ${device.note ? `<p class="resource-note">${escapeHtml(device.note)}</p>` : ""}
      <div class="resource-bar" role="img" aria-label="${escapeHtml(`Z ${device.qty} szt.: ${summary}`)}">
        ${segments.map(([key, , qty]) => `<span class="bar-${key}" style="width: ${percentOf(qty, device.qty)}%"></span>`).join("")}
      </div>
      <dl class="resource-numbers">
        <div class="is-placed"><dt>W salach i u osób</dt><dd data-stat="placed">${stats.placed}</dd></div>
        <div><dt>W pudełkach</dt><dd data-stat="inBoxes">${stats.inBoxes}</dd></div>
        <div class="is-sub is-planned"><dt>z tego przydzielone (do wstawienia lub wydania)</dt><dd data-stat="planned">${stats.planned}</dd></div>
        <div class="is-sub is-free"><dt>z tego wolne, bez przydziału</dt><dd data-stat="free">${stats.free}</dd></div>
        <div class="is-total"><dt>Rozdysponowane łącznie (w salach i do wstawienia)</dt><dd data-stat="allocated">${stats.placed + stats.planned}</dd></div>
      </dl>
      <details class="resource-details">
        <summary>Podział na sale i osoby</summary>
        <h4>Już na miejscu</h4>
        ${roomQtyChips(stats.placedRooms)}
        <h4>Do wstawienia lub wydania</h4>
        ${roomQtyChips(stats.plannedRooms)}
      </details>
    </article>
  `;
};

const otherAssetCard = (asset) => {
  const stats = kpoStats(asset);
  const sumRows = (rows) => rows.reduce((total, row) => total + row.qty, 0);
  const lines = [
    ["is-placed", "Teraz w salach i u osób", "placed", stats.placed, stats.placedRooms, "Teraz"],
    ["is-planned", "Do dostarczenia", "planned", stats.planned, stats.plannedRooms, "Do dostarczenia do"],
    ["is-planned", "Do przeniesienia", "moving", sumRows(stats.movingRooms), stats.movingRooms, "Do przeniesienia do"],
  ].filter(([, , key, value]) => key === "placed" || value > 0);
  const boxRows = asset.inBoxes
    ? `<div class="is-free"><dt>W pudełkach (niewykorzystane)</dt><dd data-stat="inBoxes">${asset.inBoxes}</dd></div>
        ${(asset.inBoxesDetails ?? []).map((detail) => `<div class="is-sub"><dt>${escapeHtml(detail.label)}</dt><dd>${detail.qty}</dd></div>`).join("")}`
    : "";

  return `
    <article class="resource-card" data-device-id="${escapeHtml(asset.id)}">
      <header class="resource-head">
        <h3>${escapeHtml(asset.name)}</h3>
        <span class="resource-qty">${asset.qty} szt.</span>
      </header>
      ${asset.note ? `<p class="resource-note">${escapeHtml(asset.note)}</p>` : ""}
      ${asset.plan ? `<p class="resource-note"><strong>Plan:</strong> ${escapeHtml(asset.plan)}</p>` : ""}
      <dl class="resource-numbers">
        ${lines.map(([cls, label, key, value]) => `<div class="${cls}"><dt>${label}</dt><dd data-stat="${key}">${value}</dd></div>`).join("")}
        ${boxRows}
      </dl>
      <details class="resource-details" open>
        <summary>Podział na sale i osoby</summary>
        ${lines.map(([, , , , rows, heading]) => `<h4>${heading}</h4>${roomQtyChips(rows)}`).join("")}
      </details>
    </article>
  `;
};

const cabinetPlace = (place) => {
  if (!place) return "";
  if (place.roomId) {
    const room = roomById(place.roomId);
    return room ? roomLink(room, { label: room.name }) : escapeHtml(place.roomId);
  }
  return escapeHtml(place.text);
};

const cabinetContentQty = (cabinet) => cabinet.contents.reduce((sum, item) => sum + item.qty, 0);

const cabinetCard = (cabinet) => {
  const qty = cabinetContentQty(cabinet);
  const isNew = !cabinet.from;
  const target = roomById(cabinet.toRoomId);
  return `
    <article class="resource-card cabinet-card" data-cabinet-id="${escapeHtml(cabinet.id)}">
      <header class="resource-head">
        <h3>${escapeHtml(cabinet.name)}</h3>
        <span class="badge ${isNew ? "ready" : "todo"}">${isNew ? "Nowa" : "Do przeniesienia"}</span>
      </header>
      <p class="cabinet-route">
        ${isNew ? "" : `<span><strong>Teraz:</strong> ${cabinetPlace(cabinet.from)}</span>`}
        <span><strong>Do sali:</strong> ${target ? roomLink(target, { label: target.name }) : escapeHtml(cabinet.toRoomId)}</span>
      </p>
      <p class="resource-note"><strong>Pojemność:</strong> ${cabinet.capacity} szt.</p>
      <ul class="cabinet-contents">
        ${cabinet.contents.map((item) => `<li>${escapeHtml(item.label)}</li>`).join("")}
      </ul>
      ${qty > cabinet.capacity ? `<p class="cabinet-warning" role="alert">Uwaga: w szafie ma stać ${qty} szt., a mieści się ${cabinet.capacity}${cabinet.knownOverfill ? " (przyjęte świadomie)" : ""}</p>` : ""}
    </article>
  `;
};

const renderResources = () => {
  const totals = kpoTotals();
  els.resourcesTabCount.textContent = totals.delivered;
  els.resourcesSummary.textContent = `Podliczenie sprzętu otrzymanego w ramach KPO: ile jest już w salach, ile ma tam trafić i ile leży jeszcze w pudełkach. Stan z ${dataUpdatedAt}.`;

  const tiles = [
    ["delivered", "Dostarczono z KPO", totals.delivered],
    ["placed", "W salach i u osób", totals.placed],
    ["inBoxes", "W pudełkach", totals.inBoxes],
    ["planned", "Z tego przydzielone", totals.planned],
  ];
  els.resourceTotal.innerHTML = tiles.map(([key, label, value]) => `
    <div class="total-tile" data-total="${key}">
      <span class="total-value">${value}</span>
      <span class="total-label">${escapeHtml(label)}</span>
    </div>
  `).join("");

  els.resourceCards.innerHTML = kpoDelivery.map(resourceCard).join("");
  els.otherAssets.innerHTML = otherAssets.map(otherAssetCard).join("");
  els.cabinetList.innerHTML = cabinets.map(cabinetCard).join("");
  els.resourceNotes.innerHTML = kpoNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("");
};

const roomQtyText = (rows) => (rows.length
  ? rows.map(({ roomId, assignee, qty }) => `${roomById(roomId) ? allocLabel(roomById(roomId)) : roomId ?? assignee} – ${qty} szt.`).join(", ")
  : "brak");

const renderResourcesPrint = () => {
  const totals = kpoTotals();
  els.printSheet.innerHTML = `
    <h1>Zasoby sprzętu</h1>
    <div class="print-meta">
      <div><strong>Dostarczono z KPO:</strong> ${totals.delivered} szt.</div>
      <div><strong>W salach i u osób:</strong> ${totals.placed} szt.</div>
      <div><strong>W pudełkach:</strong> ${totals.inBoxes} szt.</div>
      <div><strong>Aktualizacja danych:</strong> ${escapeHtml(dataUpdatedAt)}</div>
    </div>
    ${kpoDelivery.map((device) => {
      const stats = kpoStats(device);
      return printSection(device.name, listItems([
        `Dostarczono: ${device.qty} szt.`,
        `W salach i u osób: ${stats.placed} szt.`,
        `W pudełkach: ${stats.inBoxes} szt. (przydzielone: ${stats.planned}, wolne: ${stats.free})`,
        `Rozdysponowane łącznie (na miejscu i do wstawienia): ${stats.placed + stats.planned} szt.`,
        `Miejsca, w których już jest: ${roomQtyText(stats.placedRooms)}`,
        `Miejsca, do których ma trafić: ${roomQtyText(stats.plannedRooms)}`,
        device.note,
      ].filter(Boolean)));
    }).join("")}
    ${otherAssets.map((asset) => {
      const stats = kpoStats(asset);
      return printSection(`${asset.name}: inny sprzęt`, listItems([
        `${asset.qty} szt.`,
        asset.note,
        asset.plan && `Plan: ${asset.plan}`,
        `Teraz: ${roomQtyText(stats.placedRooms)}`,
        stats.plannedRooms.length ? `Do dostarczenia do: ${roomQtyText(stats.plannedRooms)}` : "",
        stats.movingRooms.length ? `Do przeniesienia do: ${roomQtyText(stats.movingRooms)}` : "",
        asset.inBoxes ? `W pudełkach (niewykorzystane): ${asset.inBoxes} szt.${(asset.inBoxesDetails ?? []).map((detail) => `, ${detail.label}: ${detail.qty}`).join("")}` : "",
      ].filter(Boolean)));
    }).join("")}
    ${printSection("Szafy na laptopy i iPady", listItems(cabinets.map((cabinet) => {
      const from = cabinet.from?.roomId ? `sala ${chipLabel(roomById(cabinet.from.roomId))}` : cabinet.from?.text;
      const target = roomById(cabinet.toRoomId);
      const qty = cabinetContentQty(cabinet);
      return [
        `${cabinet.name} (pojemność ${cabinet.capacity})`,
        from ? `teraz: ${from}` : "nowa",
        `do sali: ${target ? chipLabel(target) : cabinet.toRoomId}`,
        `w szafie: ${cabinet.contents.map((item) => item.label).join("; ")}`,
        qty > cabinet.capacity ? `uwaga: ${qty} szt. przekracza pojemność${cabinet.knownOverfill ? " (przyjęte świadomie)" : ""}` : "",
      ].filter(Boolean).join(", ");
    })))}
    ${printSection("Założenia zestawienia", listItems(kpoNotes))}
  `;
};

const syncHash = (historyMode = "replace") => {
  const hash = VIEW_HASHES[state.view] ?? `#room-${encodeURIComponent(state.activeId)}`;
  if (location.hash === hash) return;
  const method = historyMode === "push" ? "pushState" : "replaceState";
  history[method](null, "", hash);
};

const render = ({ historyMode = "replace", moveFocus = false } = {}) => {
  const visibleRooms = filteredRooms();
  if (!visibleRooms.some((room) => room.id === state.activeId) && visibleRooms[0]) {
    state.activeId = visibleRooms[0].id;
  }

  renderViewTabs();
  renderStats();
  renderFloorJump();
  renderList();
  renderDetail();
  renderMobileNavigation();
  if (state.view === "purchases") renderPurchasePrint();
  if (state.view === "resources") renderResourcesPrint();
  syncHash(historyMode);
  if (state.view === "rooms") keepActiveRowVisible();

  if (moveFocus) {
    requestAnimationFrame(() => {
      els.detail.scrollIntoView({ behavior: "smooth", block: "start" });
      els.detail.querySelector("h2")?.focus({ preventScroll: true });
    });
  }
};

const resetFilters = () => {
  state.query = "";
  state.status = "all";
  els.search.value = "";
  els.statusFilter.value = "all";
};

const showRoom = (id, { historyMode = "push", moveFocus = true } = {}) => {
  if (!roomExists(id)) return;
  state.view = "rooms";
  state.activeId = id;
  if (!filteredRooms().some((room) => room.id === id)) resetFilters();
  setCatalogOpen(false, { restoreFocus: false });
  render({ historyMode, moveFocus });
};

const showView = (view, { historyMode = "push" } = {}) => {
  state.view = view;
  setCatalogOpen(false, { restoreFocus: false });
  render({ historyMode });
};

const moveToAdjacentRoom = (direction) => {
  if (state.view !== "rooms") return;
  const visibleRooms = filteredRooms();
  const activeIndex = visibleRooms.findIndex((room) => room.id === state.activeId);
  const nextRoom = visibleRooms[activeIndex + direction];
  if (!nextRoom) return;
  showRoom(nextRoom.id);
};

const setStatusFilter = (status) => {
  state.status = status;
  els.statusFilter.value = status;
  render();
};

els.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

els.statusFilter.addEventListener("change", (event) => setStatusFilter(event.target.value));

els.stats.addEventListener("click", (event) => {
  const tile = event.target.closest("[data-status]");
  if (!tile) return;
  const status = tile.dataset.status;
  setStatusFilter(state.status === status ? "all" : status);
});

els.roomList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-room-id]");
  if (button) showRoom(button.dataset.roomId);
});

els.floorJump.addEventListener("click", (event) => {
  const chip = event.target.closest("[data-floor]");
  if (!chip) return;
  const group = [...els.roomList.querySelectorAll(".floor-group")].find((item) => item.dataset.floor === chip.dataset.floor);
  if (!group) return;
  els.roomList.scrollTo({ top: group.offsetTop - els.roomList.offsetTop, behavior: "smooth" });
});

// Linki do sal (przełącznik pięter i sal, pager, sprawy do potwierdzenia).
document.addEventListener("click", (event) => {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
  const viewLink = event.target.closest("a[data-view]");
  if (viewLink) {
    event.preventDefault();
    showView(viewLink.dataset.view);
    return;
  }
  const link = event.target.closest("a[data-room-id]");
  if (!link) return;
  event.preventDefault();
  showRoom(link.dataset.roomId);
});

els.catalogToggle.addEventListener("click", () => openCatalog(els.catalogToggle));
els.mobileCatalogToggle.addEventListener("click", () => openCatalog(els.mobileCatalogToggle));
els.catalogClose.addEventListener("click", () => setCatalogOpen(false));
els.drawerBackdrop.addEventListener("click", () => setCatalogOpen(false));
els.previousRoom.addEventListener("click", () => moveToAdjacentRoom(-1));
els.nextRoom.addEventListener("click", () => moveToAdjacentRoom(1));
els.printPurchases.addEventListener("click", () => window.print());
els.printResources.addEventListener("click", () => window.print());

els.purchaseLists.addEventListener("change", (event) => {
  const box = event.target.closest("[data-item-check]");
  if (!box) return;
  purchaseState[box.closest(".purchase-card").dataset.itemId].checked = box.checked;
  commitPurchaseState();
});

els.purchaseLists.addEventListener("click", (event) => {
  const button = event.target.closest("[data-qty-step]");
  if (!button) return;
  const entry = purchaseState[button.closest(".purchase-card").dataset.itemId];
  entry.qty = Math.min(MAX_QTY, Math.max(1, entry.qty + Number(button.dataset.qtyStep)));
  commitPurchaseState();
});

const setAllChecked = (checked) => {
  purchaseItems.forEach((item) => { purchaseState[item.id].checked = checked; });
  commitPurchaseState();
};

els.calcSelectAll.addEventListener("click", () => setAllChecked(true));
els.calcClear.addEventListener("click", () => setAllChecked(false));
els.calcReset.addEventListener("click", () => {
  Object.assign(purchaseState, defaultPurchaseState());
  commitPurchaseState();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setCatalogOpen(false);
    return;
  }

  const isTyping = event.target.closest("input, select, textarea, [contenteditable]");
  if (isTyping || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "ArrowLeft") moveToAdjacentRoom(-1);
  if (event.key === "ArrowRight") moveToAdjacentRoom(1);
});

window.addEventListener("popstate", () => {
  const hashView = viewFromHash();
  if (hashView !== "rooms") {
    showView(hashView, { historyMode: "replace" });
    return;
  }
  const nextId = roomIdFromHash();
  if (roomExists(nextId)) showRoom(nextId, { historyMode: "replace", moveFocus: false });
});

mobileCatalogQuery.addEventListener("change", () => setCatalogOpen(false, { restoreFocus: false }));

els.roomsTabCount.textContent = rooms.length;
renderFilters();
renderOpenItems();
renderResources();
renderPurchaseView();
render();
setCatalogOpen(false, { restoreFocus: false });
