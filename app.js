import { api } from "./api-config.js";

/* ===== ROUTER ===== */
const pages = {
    dashboard,
    materials,
    production,
    products,
    orders,
    sales,
    finances,
    settings
};

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".menu-item").forEach(btn => {
        btn.addEventListener("click", () => loadPage(btn.dataset.page));
    });

    loadPage("dashboard");
});

function loadPage(page) {
    document.getElementById("page-title").innerText =
        document.querySelector(`[data-page="${page}"]`).innerText.trim();

    document.getElementById("page-content").innerHTML = "";

    if (pages[page]) pages[page]();
}

/* ===== TOAST ===== */
export function toast(msg, color = "normal") {
    const box = document.createElement("div");
    box.className = "toast";

    if (color === "success") box.style.borderLeftColor = "var(--success)";
    if (color === "danger") box.style.borderLeftColor = "var(--danger)";

    box.innerText = msg;

    document.getElementById("toast-container").appendChild(box);

    setTimeout(() => box.classList.add("show"), 20);
    setTimeout(() => {
        box.classList.remove("show");
        setTimeout(() => box.remove(), 300);
    }, 3000);
}

/* ===== MODAL SYSTEM ===== */
export function showModal({ title = "", content = "", size = "md", buttons = [] }) {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("modal-overlay");

    modal.className = `modal show ${size}`;
    overlay.classList.remove("hidden");

    document.getElementById("modal-title").innerHTML = title;
    document.getElementById("modal-body").innerHTML = content;

    const footer = document.getElementById("modal-footer");
    footer.innerHTML = "";

    buttons.forEach(btn => {
        const b = document.createElement("button");
        b.innerText = btn.text;
        b.className = "btn";

        if (btn.type === "cancel") b.style.background = "#4b5563";
        if (btn.type === "danger") b.style.background = "var(--danger)";
        if (btn.type === "primary") b.style.background = "var(--accent)";

        b.onclick = () => {
            if (btn.onClick) btn.onClick();
            closeModal();
        };

        footer.appendChild(b);
    });

    document.getElementById("modal-close").onclick = closeModal;
    overlay.onclick = closeModal;
}

export function closeModal() {
    document.getElementById("modal").classList.remove("show");
    document.getElementById("modal-overlay").classList.add("hidden");
}

/* ====== PAGE: DASHBOARD ===== */
function dashboard() {
    document.getElementById("page-content").innerHTML = `
        <div class="card">Добро пожаловать в Akvadek ERP!</div>
    `;
}

/* ===== MATERIALS ===== */
async function materials() {
    const box = document.getElementById("page-content");
    box.innerHTML = `<h2>📦 Склад материалов</h2> Загрузка...`;

    const data = await api("getMaterials");

    let html = `
        <button class="btn" id="addMat">➕ Добавить</button>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Категория</th>
                    <th>Ед.</th>
                    <th>Кол-во</th>
                    <th>Цена</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(r => {
        html += `
            <tr>
                <td>${r.material_id}</td>
                <td>${r.name}</td>
                <td>${r.category}</td>
                <td>${r.unit}</td>
                <td>${r.qty}</td>
                <td>${r.price}</td>
                <td>
                    <button class="btn-small" onclick="changeQty('${r.material_id}', 'plus')">+</button>
                    <button class="btn-small" onclick="changeQty('${r.material_id}', 'minus')">-</button>
                </td>
            </tr>`;
    });

    html += "</tbody></table>";
    box.innerHTML = html;

    document.getElementById("addMat").onclick = addMaterialForm;
}

/* === ADD MATERIAL FORM === */
function addMaterialForm() {
    showModal({
        title: "Добавить материал",
        size: "sm",
        content: `
            <div class="form">
                <input id="mat_name" placeholder="Название" />
                <input id="mat_cat" placeholder="Категория" />
                <input id="mat_unit" placeholder="Ед." />
                <input id="mat_qty" placeholder="Кол-во" type="number" />
                <input id="mat_price" placeholder="Цена" type="number" />
            </div>
        `,
        buttons: [
            { text: "Отмена", type: "cancel" },
            {
                text: "Сохранить",
                type: "primary",
                onClick: async () => {
                    await api("addMaterial", {
                        name: mat_name.value,
                        category: mat_cat.value,
                        unit: mat_unit.value,
                        qty: Number(mat_qty.value),
                        price: Number(mat_price.value)
                    });
                    toast("Материал добавлен", "success");
                    loadPage("materials");
                }
            }
        ]
    });
}

/* === CHANGE QTY === */
window.changeQty = async function (id, action) {
    showModal({
        title: "Изменить количество",
        size: "sm",
        content: `
            <div class="form">
                <input id="qty_input" type="number" placeholder="Количество" />
            </div>
        `,
        buttons: [
            { text: "Отмена", type: "cancel" },
            {
                text: "Изменить",
                type: "primary",
                onClick: async () => {
                    await api("addMovement", {
                        material_id: id,
                        action,
                        qty: Number(qty_input.value)
                    });
                    toast("Количество обновлено", "success");
                    loadPage("materials");
                }
            }
        ]
    });
};

/* === OTHER PAGES === */
function production() { document.getElementById("page-content").innerHTML = `<div class="card">Раздел в разработке</div>`; }
function products()   { document.getElementById("page-content").innerHTML = `<div class="card">Раздел в разработке</div>`; }
function orders()     { document.getElementById("page-content").innerHTML = `<div class="card">Раздел в разработке</div>`; }
function sales()      { document.getElementById("page-content").innerHTML = `<div class="card">Раздел в разработке</div>`; }
function finances()   { document.getElementById("page-content").innerHTML = `<div class="card">Раздел в разработке</div>`; }
function settings()   { document.getElementById("page-content").innerHTML = `<div class="card">Настройки системы</div>`; }
