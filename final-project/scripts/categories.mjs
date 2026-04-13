import { getData } from "./api.mjs";

export async function renderCategories() {
  const data = await getData();

  const container = document.getElementById("category-list");
  if (!container) return;

  container.innerHTML = "";

  for (const cat in data.categoryBrands) {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${data.categoryBrands[cat][0].image}">
      <h3>${cat}</h3>
    `;

    div.addEventListener("click", () => {
      location.href = `products.html?category=${cat}`;
    });

    container.appendChild(div);
  }
}