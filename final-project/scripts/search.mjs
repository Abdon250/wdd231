import { getProducts } from "./products.mjs";
import { renderProducts } from "./renderProducts.mjs";

export function initSearch() {
  const input = document.getElementById("search-input");
  if (!input) return;

  input.addEventListener("input", async () => {
    const q = input.value.toLowerCase();

    const all = await getProducts();

    const filtered = all.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );

    const container = document.getElementById("product-list");
    container.innerHTML = "";

    filtered.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";

      div.innerHTML = `
        <img src="${p.images[0]}">
        <h3>${p.name}</h3>
        <p>${p.price}</p>
      `;

      container.appendChild(div);
    });
  });
}