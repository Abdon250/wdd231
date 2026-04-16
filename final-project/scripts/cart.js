export {
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getCart
};

const CART_KEY = 'tech_cart';

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product, quantity = 1) {
    let cart = getCart();
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCart(cart);
    console.log(`${product.name} added to cart.`);
}

function removeFromCart(productName) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== productName);
    saveCart(cart);
    console.log(`${productName} removed from cart.`);
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    console.log('Cart cleared.');
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// CART PAGE UI
document.addEventListener('DOMContentLoaded', () => {
    const totalItemsEl = document.querySelector('.total-items');
    const totalAmountEl = document.querySelector('.total-amount');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const cartContainer = document.querySelector('.cart-items');

    if (totalItemsEl) totalItemsEl.textContent = `Total Items: ${getCartItemCount()}`;
    if (totalAmountEl) totalAmountEl.textContent = `Total Amount: $${getCartTotal().toFixed(2)}`;

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (getCartItemCount() === 0) {
                alert('Your cart is empty. Please add items before checking out.');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }

    if (!cartContainer) return;
    cartContainer.innerHTML = '';
    const cart = getCart();
    cart.forEach(product => {
        const imgSrc = product.images && product.images.length > 0 ? product.images[0] : 'images/default-image.jpg';
        const price = product.price || 0;
        const quantity = product.quantity || 1;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="item-details">
                <img src="${imgSrc}" alt="${product.name}" loading = lazy />
                <h3>${product.name}</h3>
                <p>Price: $${price.toFixed(2)}</p>
                <p>Qty: ${quantity}</p>
                <p>Total: $${(price * quantity).toFixed(2)}</p>
                <button class="remove-btn" data-product-name="${product.name}">Remove</button>
            </div>
        `;
        cartContainer.appendChild(div);

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.dataset.productName;
                removeFromCart(name);
                location.reload();
            });
        });
    });
});
