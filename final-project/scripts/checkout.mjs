import { getCart, totalItems, totalPrice, clearCart } from "./cart.mjs";

export function initCheckout() {
  const items = getCart();

  const container = document.querySelector(".checkout-items");
  if (!container) return;

  container.innerHTML = "";

  items.forEach(i => {
    const div = document.createElement("div");
    div.textContent = `${i.name} x ${i.quantity}`;
    container.appendChild(div);
  });

  document.getElementById("checkout-total-items").textContent = totalItems();
  document.getElementById("checkout-total-amount").textContent = totalPrice();

  const form = document.getElementById("checkout-form");

  form?.addEventListener("submit", e => {
    e.preventDefault();

    alert("Order placed successfully!");
    clearCart();
    location.href = "index.html";
  });
}