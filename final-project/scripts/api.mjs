export async function fetchAPI() {
    try {
        const res = await fetch('../data/data.json');

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error("API Fetch Error:", err);

        return {
            categoryBrands: {},
            products: {}
        };
    }
}