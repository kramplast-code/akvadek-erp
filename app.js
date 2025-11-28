/* ============================
   AKVADEK ERP — FRONTEND CORE
=============================== */

import { api } from "./api-config.js";

/* ====================================
   НАВИГАЦИЯ МЕНЮ
==================================== */

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
            loadPage(btn.dataset.page);
            activateMenu(btn);
        });
    });

    loadPage("dashboard");
});

/* Активный пункт меню */

function activateMenu(btn) {
    document.querySelectorAll(".menu-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

/* Загрузка страницы */

function loadPage(page) {
    document.getElementById("page-title").innerText =
        document.querySelector(`.menu-item[data-page="${page}"]`).innerText;

    document.getElementById("page-content").innerHTML = "";
    if (pages[page]) pages[page]();
}

/* ====================================
   ДАШБОРД
==================================== */

function renderDashboard() {
    const box = document.getElementById("page-content");

    box.innerHTML = `
        <div class="card">
            <h2>Общая информация</h2>
            <p>Раздел находится в разработке...</p>
        </div>

        <div class="card">
            <h2>Статусы</h2>
            <p>Отображение KPI и ключевых показателей ERP будет добавлено позже.</p>
        </div>
    `;
}

/* ====================================
   СКЛАД МАТЕРИАЛОВ
==================================== */

async function renderMaterials() {
    const box = document.getElementById("page-content");
    box.innerHTML = `<h2>📦 Склад материалов</h2><div class="loader">Загрузка...</div>`;

    const data = await api("getMaterials");

    if (!data || !data.length) {
        box.innerHTML = "<div class='card'>Склад пуст</div>";
        return;
    }

    let html = `
        <button id="addMaterialBtn" class="btn">➕ Добавить материал</button>

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Категория</th>
                    <th>Ед.</th>
                    <th>Количество</th>
                    <th>Цена</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(row => {
        html += `
            <tr>
                <td>${row.material_id}</td>
                <td>${row.name}</td>
                <td>${row.category}</td>
                <td>${row.unit}</td>
                <td>${row.qty}</td>
                <td>${row.price}</td>
                <td>
                    <button class="btn-small" onclick="moveMaterial('${row.material_id}', 'plus')">➕</button>
                    <button class="btn-small" onclick="moveMaterial('${row.material_id}', 'minus')">➖</button>
                </td>
            </tr>
        `;
    });

    html += "</tbody></table>";

    box.innerHTML = html;

    document.getElementById("addMaterialBtn").onclick = () => showAddMaterialForm();
}

/* ---- Форма добавления ---- */

window.showAddMaterialForm = function () {
    const box = document.getElementById("page-content");

    box.innerHTML = `
        <h2>➕ Добавить материал</h2>
        <div class="form">
            <input id="mat_name" placeholder="Название" />
            <input id="mat_cat" placeholder="Категория" />
            <input id="mat_unit" placeholder="Ед. изм." />
            <input id="mat_qty" placeholder="Количество" type="number" />
            <input id="mat_price" placeholder="Цена" type="number" />
            <button class="btn" onclick="addMaterial()">Сохранить</button>
        </div>
    `;
};

/* ---- Сохранение нового материала ---- */

window.addMaterial = async function () {
    await api("addMaterial", {
        name: mat_name.value,
        category: mat_cat.value,
        unit: mat_unit.value,
        qty: Number(mat_qty.value),
        price: Number(mat_price.value)
    });

    toast("Материал добавлен");
    loadPage("materials");
};

/* ---- Изменение количества (приход/расход) ---- */

window.moveMaterial = async function (id, action) {
    let qty = prompt("Введите количество:");
    if (!qty) return;

    await api("addMovement", {
        material_id: id,
        qty: Number(qty),
        action
    });

    toast(action === "plus" ? "Приход добавлен" : "Расход списан");
    loadPage("materials");
};

/* ====================================
   ПРОЧИЕ РАЗДЕЛЫ (заглушки)
==================================== */

function renderProduction() {
    document.getElementById("page-content").innerHTML =
        `<div class="card">Раздел «Производство» находится в разработке…</div>`;
}

function renderProducts() {
    document.getElementById("page-content").innerHTML =
        `<div class="card">Раздел «Готовая продукция» находится в разработке…</div>`;
}

function renderOrders() {
    document.getElementById("page-content").innerHTML =
        `<div class="card">Раздел «Заказы» находится в разработке…</div>`;
}

function renderSales() {
    document.getElementById("page-content").innerHTML =
        `<div class="card">Раздел «Продажи» находится в разработке…</div>`;
}

function renderFinances() {
    document.getElementById("page-content").innerHTML =
        `<div class="card">Раздел «Финансы» находится в разработке…</div>`;
}

function renderSettings() {
    document.getElementById("page-content").innerHTML =
        `<div class="card">Раздел «Настройки» находится в разработке…</div>`;
}

/* ====================================
   TOAST — уведомления
==================================== */

window.toast = function (msg) {
    let cont = document.getElementById("toast-container");
    if (!cont) {
        cont = document.createElement("div");
        cont.id = "toast-container";
        document.body.appendChild(cont);
    }

    const t = document.createElement("div");
    t.className = "toast";
    t.innerText = msg;

    cont.appendChild(t);

    setTimeout(() => t.remove(), 3000);
};
