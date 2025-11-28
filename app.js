import { api } from "./api-config.js";

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
}async function showAddMaterialForm() {
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
}

async function addMaterial() {
    await api("addMaterial", {
        name: mat_name.value,
        category: mat_cat.value,
        unit: mat_unit.value,
        qty: Number(mat_qty.value),
        price: Number(mat_price.value)
    });

    loadPage("materials");
}

async function moveMaterial(id, action) {
    let qty = prompt("Введите количество:");

    if (!qty) return;

    await api("addMovement", {
        material_id: id,
        qty: Number(qty),
        action
    });

    loadPage("materials");
}

