import { fetchAPI } from './api.mjs';
import { addToCart } from './cart.js';

document.addEventListener("DOMContentLoaded", async () => {

    const searchInput = document.getElementById("search-input");
    const searchForm = document.getElementById("search-form");
    const container = document.getElementById("product-list");

    if (!searchInput || !searchForm || !container) return;

    let allProducts = [];

    try {
        const data = await fetchAPI();
        allProducts = flatten(data.products);
    } catch (err) {
        console.error("Search load error:", err);
        container.innerHTML = "<p>Failed to load products</p>";
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") || "";

    searchInput.value = initialQuery;
    runSearch(initialQuery);

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        runSearch(searchInput.value);
    });

    searchInput.addEventListener("input", () => {
        runSearch(searchInput.value);
    });

    function runSearch(q) {
        const str = q.trim().toLowerCase();

        const filtered = str
            ? allProducts.filter(p =>
                (p.name || "").toLowerCase().includes(str) ||
                (p.description || "").toLowerCase().includes(str)
            )
            : allProducts;

        render(filtered);
    }

    function render(productsToShow) {
        container.innerHTML = "";

        if (!productsToShow.length) {
            container.innerHTML = "<p>No products found</p>";
            return;
        }

        productsToShow.forEach(product => {

            const div = document.createElement("div");
            div.className = "category-item";

            div.innerHTML = `
                <img src="${product.images?.[0] || ''}" class="product-image" loading="lazy">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price}</p>

                <div class="card-actions">
                    <input type="number" min="1" value="1" class="qty">
                    <button class="add-btn">Add to Cart</button>
                    <button class="view-btn">View</button>
                </div>
            `;

            const qty = div.querySelector(".qty");

            div.querySelector(".add-btn").addEventListener("click", () => {
                addToCart(product, parseInt(qty.value) || 1);
            });

            div.querySelector(".view-btn").addEventListener("click", () => {
                alert(product.name);
            });

            container.appendChild(div);
        });
    }

    function flatten(products) {
        const all = [];
        for (const cat in products) {
            for (const br in products[cat]) {
                all.push(...products[cat][br]);
            }
        }
        return all;
    }
});