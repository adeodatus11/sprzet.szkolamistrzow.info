import { rooms, standardControlTasks, statusLabels, unresolvedItems } from "./equipment-data.js";

const els = {
  stats: document.querySelector("#stats"),
  search: document.querySelector("#search"),
  floorFilter: document.querySelector("#floorFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  roomList: document.querySelector("#roomList"),
  resultCount: document.querySelector("#resultCount"),
  detail: document.querySelector("#roomDetail"),
  openItems: document.querySelector("#openItems"),
  openItemsCount: document.querySelector("#openItemsCount"),
  printSheet: document.querySelector("#printSheet"),
  printRoomTop: document.querySelector("#printRoomTop"),
  catalogToggle: document.querySelector("#catalogToggle"),
  mobileCatalogToggle: document.querySelector("#mobileCatalogToggle"),
  catalogClose: document.querySelector("#catalogClose"),
  catalogDrawer: document.querySelector("#catalogDrawer"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  previousRoom: document.querySelector("#previousRoom"),
  nextRoom: document.querySelector("#nextRoom"),
  mobileRoomPosition: document.querySelector("#mobileRoomPosition"),
};

const mobileCatalogQuery = window.matchMedia("(max-width: 980px)");
const catalogToggles = [els.catalogToggle, els.mobileCatalogToggle];
let lastCatalogTrigger = els.catalogToggle;

const state = {
  query: "",
  floor: "all",
  status: "all",
  activeId: location.hash.replace("#room-", "") || rooms[0].id,
};

const normalize = (value) => String(value)
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
}[char]));

const roomSearchText = (room) => normalize([
  room.name,
  room.floor,
  room.location,
  room.purpose,
  room.teachers.join(" "),
  room.equipment.flatMap((item) => [item.name, ...item.items]).join(" "),
  standardControlTasks.join(" "),
  room.urgentTasks.join(" "),
  room.tasks.join(" "),
  room.notes.join(" "),
  room.decisions.join(" "),
].join(" "));

const filteredRooms = () => rooms.filter((room) => {
  const matchesQuery = !state.query || roomSearchText(room).includes(normalize(state.query));
  const matchesFloor = state.floor === "all" || room.floor === state.floor;
  const matchesStatus = state.status === "all" || room.status === state.status;
  return matchesQuery && matchesFloor && matchesStatus;
});

const activeRoom = () => rooms.find((room) => room.id === state.activeId) || filteredRooms()[0] || rooms[0];

const listItems = (items) => {
  if (!items?.length) return "";
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
};

const statusBadge = (status) => `<span class="badge ${status}">${statusLabels[status]}</span>`;

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

  const missingAndTodo = (counts.missing || 0) + (counts.todo || 0) + (counts.decision || 0);

  els.stats.innerHTML = [
    ["Sale w kartotece", rooms.length],
    ["Do działania", missingAndTodo],
    ["Do sprawdzenia", counts.check || 0],
    ["Do decyzji", counts.decision || 0],
  ].map(([label, value]) => `
    <div>
      <dt>${label}</dt>
      <dd>${value}</dd>
    </div>
  `).join("");
};

const renderFilters = () => {
  const floors = [...new Set(rooms.map((room) => room.floor))];
  els.floorFilter.innerHTML += floors
    .map((floor) => `<option value="${escapeHtml(floor)}">${escapeHtml(floor)}</option>`)
    .join("");

  els.statusFilter.innerHTML += Object.entries(statusLabels)
    .map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`)
    .join("");
};

const renderList = () => {
  const visibleRooms = filteredRooms();
  els.resultCount.textContent = visibleRooms.length;

  if (!visibleRooms.length) {
    els.roomList.innerHTML = `<div class="empty-state">Brak sal dla wybranych filtrów.</div>`;
    return;
  }

  els.roomList.innerHTML = visibleRooms.map((room) => `
    <button class="room-row ${room.id === state.activeId ? "is-active" : ""}" type="button" data-room-id="${escapeHtml(room.id)}">
      <span class="row-top">
        <span class="row-title">${escapeHtml(room.name)}</span>
        ${statusBadge(room.status)}
      </span>
      <span class="row-location">${escapeHtml(room.location)}</span>
      ${room.purpose ? `<span class="row-purpose">${escapeHtml(room.purpose)}</span>` : ""}
    </button>
  `).join("");
};

const renderMobileNavigation = () => {
  const visibleRooms = filteredRooms();
  const activeIndex = visibleRooms.findIndex((room) => room.id === state.activeId);
  const hasActiveRoom = activeIndex >= 0;

  els.previousRoom.disabled = !hasActiveRoom || activeIndex === 0;
  els.nextRoom.disabled = !hasActiveRoom || activeIndex === visibleRooms.length - 1;
  els.mobileRoomPosition.textContent = hasActiveRoom ? `${activeIndex + 1} z ${visibleRooms.length}` : `0 z ${visibleRooms.length}`;
};

const renderDetail = () => {
  const room = activeRoom();
  state.activeId = room.id;

  const equipment = room.equipment.length
    ? `<div class="equipment-groups">${room.equipment.map((item) => `
        <section class="equipment-group">
          <h4>${escapeHtml(item.name)}</h4>
          ${listItems(item.items)}
        </section>
      `).join("")}</div>`
    : "<p>Brak wpisanego wyposażenia.</p>";

  els.detail.innerHTML = `
    <header class="detail-header">
      <div class="detail-title">
        <div>
          <div class="detail-meta">
            ${statusBadge(room.status)}
            <span>${escapeHtml(room.location)}</span>
          </div>
          <h2 tabindex="-1">${escapeHtml(room.name)}</h2>
        </div>
        <div class="detail-actions">
          <button class="primary" id="printRoom" type="button">Drukuj kartę</button>
          <a href="https://nawigacja.szkolamistrzow.info/?room=${encodeURIComponent(room.id)}">Pokaż na planie</a>
        </div>
      </div>
      ${room.purpose ? `<p>${escapeHtml(room.purpose)}</p>` : ""}
    </header>
    <div class="detail-grid">
      <section class="detail-section">
        <h3>Nauczyciele / użytkownicy</h3>
        ${room.teachers.length ? listItems(room.teachers) : "<p>Do uzupełnienia.</p>"}
      </section>
      <section class="detail-section">
        <h3>Zadania kontrolne</h3>
        <h4>Stała kontrola techniczna</h4>
        ${listItems(standardControlTasks)}
      </section>
      ${room.urgentTasks.length ? `<section class="detail-section is-urgent"><h3>Pilne zakupy / do doniesienia</h3>${listItems(room.urgentTasks)}</section>` : ""}
      ${room.tasks.length ? `<section class="detail-section"><h3>Rzeczy do zrobienia dla tej sali</h3>${listItems(room.tasks)}</section>` : ""}
      <section class="detail-section is-wide">
        <h3>Wyposażenie</h3>
        ${equipment}
      </section>
      ${room.decisions.length ? `<section class="detail-section"><h3>Decyzje</h3>${listItems(room.decisions)}</section>` : ""}
      ${room.notes.length ? `<section class="detail-section"><h3>Uwagi</h3>${listItems(room.notes)}</section>` : ""}
    </div>
  `;

  document.querySelector("#printRoom")?.addEventListener("click", () => window.print());
  renderPrintSheet(room);
};

const renderPrintSheet = (room) => {
  const equipmentPrint = room.equipment.length
    ? room.equipment.map((item) => `
      <section class="print-section">
        <h2>${escapeHtml(item.name)}</h2>
        ${listItems(item.items)}
      </section>
    `).join("")
    : `<section class="print-section"><h2>Wyposażenie</h2><p>Brak wpisanego wyposażenia.</p></section>`;

  els.printSheet.innerHTML = `
    <h1>${escapeHtml(room.name)}</h1>
    <div class="print-meta">
      <div><strong>Lokalizacja:</strong> ${escapeHtml(room.location)}</div>
      <div><strong>Status:</strong> ${escapeHtml(statusLabels[room.status])}</div>
      <div><strong>Przeznaczenie:</strong> ${escapeHtml(room.purpose || "Do uzupełnienia")}</div>
      <div><strong>Aktualizacja:</strong> 29.07.2026</div>
    </div>
    ${room.teachers.length ? `<section class="print-section"><h2>Nauczyciele / użytkownicy</h2>${listItems(room.teachers)}</section>` : ""}
    ${equipmentPrint}
    <section class="print-section">
      <h2>Zadania kontrolne</h2>
      <h3>Stała kontrola techniczna</h3>
      ${listItems(standardControlTasks)}
    </section>
    ${room.urgentTasks.length ? `<section class="print-section print-urgent"><h2>Pilne zakupy / do doniesienia</h2>${listItems(room.urgentTasks)}</section>` : ""}
    ${room.tasks.length ? `<section class="print-section"><h2>Rzeczy do zrobienia dla tej sali</h2>${listItems(room.tasks)}</section>` : ""}
    ${room.notes.length ? `<section class="print-section"><h2>Uwagi</h2>${listItems(room.notes)}</section>` : ""}
    <section class="print-section">
      <h2>Uwagi ręczne</h2>
      <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
    </section>
    <div class="signatures">
      <div class="signature-line">Sprawdził/a</div>
      <div class="signature-line">Data</div>
      <div class="signature-line">Braki przekazane do</div>
      <div class="signature-line">Podpis</div>
    </div>
  `;
};

const renderOpenItems = () => {
  els.openItemsCount.textContent = unresolvedItems.length;
  els.openItems.innerHTML = unresolvedItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
};

const syncHash = (historyMode = "replace") => {
  const hash = `#room-${state.activeId}`;
  if (location.hash === hash) return;
  const method = historyMode === "push" ? "pushState" : "replaceState";
  history[method](null, "", hash);
};

const render = ({ historyMode = "replace", moveFocus = false } = {}) => {
  const visibleRooms = filteredRooms();
  if (!visibleRooms.some((room) => room.id === state.activeId) && visibleRooms[0]) {
    state.activeId = visibleRooms[0].id;
  }

  renderList();
  renderDetail();
  renderMobileNavigation();
  syncHash(historyMode);

  if (moveFocus) {
    requestAnimationFrame(() => {
      els.detail.scrollIntoView({ behavior: "smooth", block: "start" });
      els.detail.querySelector("h2")?.focus({ preventScroll: true });
    });
  }
};

const moveToAdjacentRoom = (direction) => {
  const visibleRooms = filteredRooms();
  const activeIndex = visibleRooms.findIndex((room) => room.id === state.activeId);
  const nextRoom = visibleRooms[activeIndex + direction];
  if (!nextRoom) return;

  state.activeId = nextRoom.id;
  render({ historyMode: "push", moveFocus: true });
};

els.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

els.floorFilter.addEventListener("change", (event) => {
  state.floor = event.target.value;
  render();
});

els.statusFilter.addEventListener("change", (event) => {
  state.status = event.target.value;
  render();
});

els.roomList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-room-id]");
  if (!button) return;
  state.activeId = button.dataset.roomId;
  setCatalogOpen(false, { restoreFocus: false });
  render({ historyMode: "push", moveFocus: true });
});

els.printRoomTop.addEventListener("click", () => window.print());
els.catalogToggle.addEventListener("click", () => openCatalog(els.catalogToggle));
els.mobileCatalogToggle.addEventListener("click", () => openCatalog(els.mobileCatalogToggle));
els.catalogClose.addEventListener("click", () => setCatalogOpen(false));
els.drawerBackdrop.addEventListener("click", () => setCatalogOpen(false));
els.previousRoom.addEventListener("click", () => moveToAdjacentRoom(-1));
els.nextRoom.addEventListener("click", () => moveToAdjacentRoom(1));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setCatalogOpen(false);
});

window.addEventListener("popstate", () => {
  const nextId = location.hash.replace("#room-", "");
  if (rooms.some((room) => room.id === nextId)) {
    state.activeId = nextId;
    render();
  }
});

mobileCatalogQuery.addEventListener("change", () => setCatalogOpen(false, { restoreFocus: false }));

renderStats();
renderFilters();
renderOpenItems();
render();
setCatalogOpen(false, { restoreFocus: false });
