import { getData } from "./api.mjs";

export async function getProducts(category, brand) {
  const data = await getData();

  let products = [];

  if (category && brand) {
    products = data.products?.[category]?.[brand] || [];
  }

  else if (category) {
    for (const b in data.products?.[category] || {}) {
      products = products.concat(data.products[category][b]);
    }
  }

  else {
    for (const c in data.products) {
      for (const b in data.products[c]) {
        products = products.concat(data.products[c][b]);
      }
    }
  }

  return products;
}