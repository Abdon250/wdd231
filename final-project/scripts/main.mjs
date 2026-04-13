import { renderProducts } from "./renderProducts.mjs";

console.log("APP LOADED");

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);

  renderProducts(
    params.get("category"),
    params.get("brand")
  );
});