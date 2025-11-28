const API_URL = "https://script.google.com/macros/s/AKfycby162gWeCtcGIdE83RH7_m0Ct4qDPOKtmfWShoCV3vQ8tCzprl8Xbq8uWImiqbKPg4n/exec";

export async function api(method, payload = {}) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, ...payload })
    });

    return await res.json();
}
