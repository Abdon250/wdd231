import { fetchAPI } from './api.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    const { categoryBrands } = await fetchAPI();

    const container = document.getElementById('home-category-list');
    if (!container) return;

    container.innerHTML = '';

    for (const category in categoryBrands) {
        const div = document.createElement('div');
        div.className = 'category-item';

        div.innerHTML = `
            <a href="categories.html?category=${category}">
                <h3>${category}</h3>
                <img src="${categoryBrands[category][0].image}" loading="lazy">
            </a>
        `;

        container.appendChild(div);
    }
});