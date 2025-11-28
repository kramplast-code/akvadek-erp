import { api } from "./api-config.js";

const content = document.getElementById("page-content");
const title = document.getElementById("page-title");
const buttons = document.querySelectorAll(".menu-item");

buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
        const page = btn.dataset.page;
        title.textContent = btn.textContent.replace(/^[^\wа-я]+/, "");
        loadPage(page);
    });
});

// ---- загрузка страниц ---- //

async function loadPage(page) {
    if (page === "dashboard") return loadDashboard();
    if (page === "materials") return loadMaterials();
    if (page === "production") return loadProduction();
    if (page === "orders") return loadOrders();
    if (page === "finance") return loadFinance();
}

// ---- Dashboard ---- //

async function loadDashboard() {
    const data = await api("dashboard");

    content.innerHTML = `
        <div class="card"><b>📦 Материалы:</b> ${data.materials_count}</div>
        <div class="card"><b>🏭 Производство:</b> ${data.production_count}</div>
        <div class="card"><b>📁 Готовая продукция:</b> ${data.products_count}</div>
        <div class="card"><b>📝 Заказы:</b> ${data.orders_count}</div>
        <div class="card"><b>💳 Продажи:</b> ${data.sales_count}</div>
    `;
}

// ---- Склад ---- //

async function loadMaterials() {
    const list = await api("materials");

    let html = `<div class='card'><h2>Материалы</h2>`;
    html += `<table><tr><th>Название</th><th>Ед.</th><th>Кол-во</th><th>Цена</th><th>Сумма</th></tr>`;

    list.forEach(m => {
        html += `<tr>
            <td>${m.name}</td>
            <td>${m.unit}</td>
            <td>${m.qty}</td>
            <td>${m.price}</td>
            <td>${m.total}</td>
        </tr>`;
    });

    html += `</table></div>`;
    content.innerHTML = html;
}
