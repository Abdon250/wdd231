import { getProducts } from "./products.mjs";
import { addToCart } from "./cart.mjs";

export async function renderProducts(category, brand) {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "<p>Loading...</p>";

  const products = await getProducts(category, brand);

  container.innerHTML = "";

  if (!products.length) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p>$${p.price}</p>
      <input type="number" min="1" value="1" class="qty">
      <button class="add">Add to Cart</button>
    `;

    card.querySelector(".add").addEventListener("click", () => {
      const qty = parseInt(card.querySelector(".qty").value) || 1;
      addToCart(p, qty);
      alert("Added to cart");
    });

    container.appendChild(card);
  });
}