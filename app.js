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
}
