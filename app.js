const pages = {
    dashboard: renderDashboard,
    materials: renderMaterials,
    production: renderProduction,
    products: renderProducts,
    orders: renderOrders,
    sales: renderSales,
    finances: renderFinances,
    settings: renderSettings
};

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".menu-item").forEach(btn => {
        btn.addEventListener("click", () => {
            const page = btn.dataset.page;
            loadPage(page);
        });
    });

    loadPage("dashboard");
});

function loadPage(page) {
    document.getElementById("page-title").innerText = document.querySelector(`.menu-item[data-page="${page}"]`).innerText.trim();
    document.getElementById("page-content").innerHTML = "";

    if (pages[page]) pages[page]();
}

/* ---------------- DASHBOARD ---------------- */
function renderDashboard() {
    const box = document.getElementById("page-content");
    box.innerHTML = `
        <div class="card">Панель находится в разработке...</div>
    `;
}

/* ---------------- MATERIALS ---------------- */
function renderMaterials() {
    const box = document.getElementById("page-content");
    box.innerHTML = `
        <div class="card">Склад материалов будет подключён к Google Sheets API</div>
    `;
}

/* ---------------- PRODUCTION ---------------- */
function renderProduction() {
    const box = document.getElementById("page-content");
    box.innerHTML = `
        <div class="card">Производство: статусы, пайщики, сроки...</div>
    `;
}

/* ---------------- PRODUCTS ---------------- */
function renderProducts() {
    const box = document.getElementById("page-content");
    box.innerHTML = `
        <div class="card">Готовая продукция — инвентарь изделий</div>
    `;
}

/* ---------------- ORDERS ---------------- */
function renderOrders() {
    const box = document.getElementById("page-content");
    box.innerHTML = `
        <div class="card">Заказы — CRM мини, статусы, даты...</div>
    `;
}

/* ---------------- SALES ---------------- */
function renderSales() {
    const box = document.getElementById("page-content");
    box.innerHTML = `
        <div class="card">Продажи — доходы, выручка, маржа...</div>
    `;
}

/* ---------------- FINANCES ---------------- */
function renderFinances() {
    const box = document.getElementById("page-content");
    box.innerHTML = `
        <div class="card">Финансы — НДС, прибыль, логистика...</div>
    `;
}

/* ---------------- SETTINGS ---------------- */
function renderSettings() {
    const box = document.getElementById("page-content");
    box.innerHTML = `
        <div class="card">Настройки системы ERP Akvadek</div>
    `;
}
