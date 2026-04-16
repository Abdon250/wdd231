
import { fetchAPI } from './api.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    const { categoryBrands } = await fetchAPI();

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    const title = document.getElementById('category-title');
    const list = document.getElementById('brand-list');

    if (!list) return;
    list.innerHTML = '';

    if (!category) {
        title.textContent = 'Categories';

        for (const cat in categoryBrands) {
            const div = document.createElement('div');
            div.className = 'category-item';

            div.innerHTML = `
                <img src="${categoryBrands[cat][0].image}" alt="${cat}" loading="lazy">
                <p>${cat}</p>
            `;

            div.addEventListener('click', () => {
                window.location.href = `categories.html?category=${cat}`;
            });

            list.appendChild(div);
        }
    } else {
        title.textContent = category.toUpperCase();

        categoryBrands[category].forEach(brand => {
            const div = document.createElement('div');
            div.className = 'category-item';

            div.innerHTML = `
                <img src="${brand.image}" alt="${brand.name}" loading="lazy">
                <p>${brand.name}</p>
            `;

            div.addEventListener('click', () => {
                window.location.href =
                    `products.html?category=${category}&brand=${encodeURIComponent(brand.name)}`;
            });

            list.appendChild(div);
        });
    }
});