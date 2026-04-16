import { fetchAPI } from './api.mjs';
import { addToCart } from './cart.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetchAPI();
        const products = data.products;

        const params = new URLSearchParams(window.location.search);

        renderProducts(
            params.get('category'),
            params.get('brand'),
            products
        );

        initModal();

    } catch (error) {
        console.error("Error loading products:", error);

        const container = document.getElementById('product-list');
        if (container) {
            container.innerHTML = "<p>Failed to load products. Try again later.</p>";
        }
    }
});

function renderProducts(category, brand, products) {

    const container = document.getElementById('product-list');
    if (!container) return;

    container.innerHTML = '';

    let productArray = [];

    try {

        if (category && brand && products[category]?.[brand]) {
            productArray = products[category][brand];

        } else if (category && products[category]) {
            for (const br in products[category]) {
                productArray = productArray.concat(products[category][br]);
            }

        } else {
            for (const cat in products) {
                for (const br in products[cat]) {
                    productArray = productArray.concat(products[cat][br]);
                }
            }
        }

        if (productArray.length === 0) {
            container.innerHTML = "<p>No products found.</p>";
            return;
        }

        productArray.forEach(product => {

            const div = document.createElement('div');
            div.className = 'category-item';

            let imgIndex = 0;

            const img = document.createElement('img');
            img.className = 'product-image';
            img.src = product.images?.[0] || '';
            img.alt = product.name;
            img.loading = 'lazy';

            img.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!product.images) return;

                imgIndex = (imgIndex + 1) % product.images.length;
                img.src = product.images[imgIndex];
            });

            div.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price}</p>

                <input type="number" min="1" value="1" class="qty" />

                <div class="card-actions">
                    <button class="add-btn">Add to Cart</button>
                    <button class="view-btn">View Details</button>
                </div>
            `;

            div.prepend(img);

            const qty = div.querySelector('.qty');

            div.querySelector('.add-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(product, parseInt(qty.value) || 1);
                alert(`Added: ${product.name}`);
            });

            div.querySelector('.view-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(product);
            });

            container.appendChild(div);
        });

    } catch (error) {
        console.error("Render error:", error);
        container.innerHTML = "<p>Error displaying products.</p>";
    }
}

function initModal() {
    const dialog = document.getElementById("product-dialog");
    const closeBtn = document.getElementById("close-dialog");

    if (!dialog || !closeBtn) return;

    closeBtn.addEventListener("click", () => dialog.close());

    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
    });
}

function openModal(product) {
    try {
        const dialog = document.getElementById("product-dialog");

        document.getElementById("modal-title").textContent = product.name;

        document.getElementById("modal-desc").textContent =
            product.fullDescription || product.description;

        document.getElementById("modal-price").textContent = `$${product.price}`;

        const ratingEl = document.getElementById("modal-rating");
        if (ratingEl) {
            ratingEl.textContent = `Rating: ⭐ ${product.rating || "N/A"}`;
        }

        const stockEl = document.getElementById("modal-stock");
        if (stockEl) {
            stockEl.textContent = `Stock: ${product.stock ?? "Unknown"}`;
        }

        const specsEl = document.getElementById("modal-specs");
        if (specsEl) {
            specsEl.innerHTML = "";

            (product.specs || []).forEach(spec => {
                const li = document.createElement("li");
                li.textContent = spec;
                specsEl.appendChild(li);
            });
        }

        dialog.showModal();

    } catch (error) {
        console.error("Modal error:", error);
    }
}