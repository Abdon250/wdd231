const KEY = "tech_cart";

export function getCart() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function addToCart(product, qty = 1) {
  const cart = getCart();

  const item = cart.find(i => i.name === product.name);

  if (item) item.quantity += qty;
  else cart.push({ ...product, quantity: qty });

  saveCart(cart);
}

export function removeFromCart(name) {
  const cart = getCart().filter(i => i.name !== name);
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(KEY);
}

export function totalItems() {
  return getCart().reduce((t, i) => t + i.quantity, 0);
}

export function totalPrice() {
  return getCart().reduce((t, i) => t + i.price * i.quantity, 0);
}