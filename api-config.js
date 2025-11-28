/* ===============================
   AKVADEK ERP — API CONNECTOR
================================= */

// 🔗 Твой опубликованный Web-App URL
const API_URL = "https://script.google.com/macros/s/AKfycbyyJccjkROWpc_gpjhZVqQHu5yES2f9nvltp7XTd-dIwdyctfC5BNCSToofMepY1Dlz/exec";

/**
 * Универсальный API запрос
 * @param {String} method — метод API (например: "getMaterials")
 * @param {Object} payload — данные (необязательно)
 */
export async function api(method, payload = {}) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                method,
                payload
            })
        });

        const result = await response.json();

        if (!result.success) {
            console.error("API error:", result.error);
            toast("Ошибка API: " + result.error);
            return null;
        }

        return result.data;

    } catch (err) {
        console.error("API request failed:", err);
        toast("Ошибка сети");
        return null;
    }
}
