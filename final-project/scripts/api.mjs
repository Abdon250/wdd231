const API_URL =
  "https://raw.githubusercontent.com/Abdon250/Electronics-API/main/products.json";

let cache = null;

export async function getData() {
  if (cache) return cache;

  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("API failed to load");

  cache = await res.json();
  return cache;
}