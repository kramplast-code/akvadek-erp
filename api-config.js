export const API_URL = "https://script.google.com/macros/s/AKfycbyyJccjkROWpc_gpjhZVqQHu5yES2f9nvltp7XTd-dIwdyctfC5BNCSToofMepY1Dlz/exec";

export async function api(method, payload = {}) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, ...payload })
    });
    return await res.json();
}
