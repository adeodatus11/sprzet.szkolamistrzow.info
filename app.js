import {
  dataUpdatedAt,
  defaultRoomId,
  floors,
  kpoDelivery,
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
  kpoTiles: document.querySelector("#kpoTiles"),
  kpoTotal: document.querySelector("#kpoTotal"),
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
};

const PURCHASES_HASH = "#zakupy";
const baseTitle = document.title;

const mobileCatalogQuery = window.matchMedia("(max-width: 980px)");
const catalogToggles = [els.catalogToggle, els.mobileCatalogToggle];
let lastCatalogTrigger = els.catalogToggle;

const roomIdFromHash = () => decodeURIComponent(location.hash.replace("#room-", ""));
const roomExists = (id) => rooms.some((room) => room.id === id);
const viewFromHash = () => (location.hash === PURCHASES_HASH ? "purchases" : "rooms");

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
  room.urgentTasks.join(" "),
  room.tasks.join(" "),
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
        ${room.urgentTasks.length ? section("Pilne zakupy i dostawy", listItems(room.urgentTasks, "checklist"), "is-urgent") : ""}
        ${room.tasks.length ? section("Do zrobienia", listItems(room.tasks, "checklist")) : ""}
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
    ${room.urgentTasks.length ? printSection("Pilne zakupy i dostawy", listItems(room.urgentTasks), "print-urgent") : ""}
    ${room.tasks.length ? printSection("Do zrobienia", listItems(room.tasks)) : ""}
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

const purchaseItemsOf = (tier) => purchaseItems.filter((item) => item.tier === tier.id);
const totalQty = (items) => items.reduce((sum, item) => sum + item.qty, 0);

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
    : `<p class="placeholder">Miejsce do ustalenia</p>`;

  return `
    <article class="purchase-card">
      <header class="purchase-head">
        <h3>${escapeHtml(item.name)}</h3>
        <span class="qty-badge">${item.qty} szt.</span>
      </header>
      <ul class="spec-tags">${item.specs.map((spec) => `<li>${escapeHtml(spec)}</li>`).join("")}</ul>
      ${item.alternative ? `<p class="purchase-note"><strong>Albo:</strong> ${escapeHtml(item.alternative)}</p>` : ""}
      ${item.note ? `<p class="purchase-note">${escapeHtml(item.note)}</p>` : ""}
      ${roomsBlock}
    </article>
  `;
};

const renderPurchaseView = () => {
  els.purchaseSummary.textContent = `Sprzęt, który dobrze byłoby kupić. Pozycje z przypisanymi salami są też na kartach tych sal. Stan z ${dataUpdatedAt}.`;
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
          <span>${items.length} poz. · ${totalQty(items)} szt.</span>
        </div>
        <div class="purchase-grid">${items.map(purchaseCard).join("")}</div>
      </section>
    `;
  }).join("");
};

const purchasePrintLine = (item) => {
  const roomText = purchaseRoomGroups(item).map((group) => {
    const labels = group.ids.map(roomById).filter(Boolean).map((room) => (group.priority ? `${chipLabel(room)} (najpierw)` : chipLabel(room)));
    return labels.join(", ");
  }).join(", ");

  return [
    `${purchaseLabel(item)}, ${item.qty} szt.`,
    item.alternative && `albo ${item.alternative}`,
    item.note,
    roomText ? `sale: ${roomText}` : "miejsce do ustalenia",
  ].filter(Boolean).join("; ");
};

const renderPurchasePrint = () => {
  els.printSheet.innerHTML = `
    <h1>Lista zakupów</h1>
    <div class="print-meta">
      <div><strong>Aktualizacja danych:</strong> ${escapeHtml(dataUpdatedAt)}</div>
    </div>
    ${purchaseTiers.map((tier) => printSection(tier.label, listItems(purchaseItemsOf(tier).map(purchasePrintLine)))).join("")}
  `;
};

const renderViewTabs = () => {
  document.body.dataset.view = state.view;
  document.title = state.view === "purchases" ? `Do zakupu | ${baseTitle}` : baseTitle;
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

const renderKpoDelivery = () => {
  els.kpoTotal.textContent = `${totalQty(kpoDelivery)} szt.`;
  els.kpoTiles.innerHTML = kpoDelivery.map((item) => `
    <li>
      <span class="kpo-qty">${item.qty}</span>
      <span class="kpo-name">${escapeHtml(item.name)}</span>
    </li>
  `).join("");
};

const syncHash = (historyMode = "replace") => {
  const hash = state.view === "purchases" ? PURCHASES_HASH : `#room-${encodeURIComponent(state.activeId)}`;
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
  if (viewFromHash() === "purchases") {
    showView("purchases", { historyMode: "replace" });
    return;
  }
  const nextId = roomIdFromHash();
  if (roomExists(nextId)) showRoom(nextId, { historyMode: "replace", moveFocus: false });
});

mobileCatalogQuery.addEventListener("change", () => setCatalogOpen(false, { restoreFocus: false }));

els.roomsTabCount.textContent = rooms.length;
renderFilters();
renderOpenItems();
renderKpoDelivery();
renderPurchaseView();
render();
setCatalogOpen(false, { restoreFocus: false });
