
document.addEventListener("DOMContentLoaded", () => {


  const cart = JSON.parse(localStorage.getItem('tech_cart')) || [];

  const checkoutItemsContainer = document.querySelector('.checkout-items');

  if (checkoutItemsContainer) {
    checkoutItemsContainer.innerHTML = '';

    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'checkout-item';
      div.innerHTML = `
        <p>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
      `;
      checkoutItemsContainer.appendChild(div);
    });
  }

  
  const totalItemsEl = document.getElementById('checkout-total-items');
  const totalAmountEl = document.getElementById('checkout-total-amount');

  if (totalItemsEl) {
    totalItemsEl.textContent = cart.reduce((c, i) => c + i.quantity, 0);
  }

  if (totalAmountEl) {
    const total = cart.reduce((t, i) => t + i.price * i.quantity, 0);
    totalAmountEl.textContent = total.toFixed(2);
  }

  const form = document.getElementById("checkout-form");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("address");
  const phoneInput = document.getElementById("phone");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const addressError = document.getElementById("address-error");
  const phoneError = document.getElementById("phone-error");

  function validateName() {
    if (!nameInput.value.trim()) {
      nameError.textContent = "Full name is required.";
      return false;
    }
    nameError.textContent = "";
    return true;
  }

  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required.";
      return false;
    }
    if (!regex.test(emailInput.value.trim())) {
      emailError.textContent = "Enter a valid email.";
      return false;
    }
    emailError.textContent = "";
    return true;
  }

  function validateAddress() {
    if (!addressInput.value.trim()) {
      addressError.textContent = "Address is required.";
      return false;
    }
    addressError.textContent = "";
    return true;
  }

  function validatePhone() {
    const regex = /^[0-9]{8,15}$/;
    if (!phoneInput.value.trim()) {
      phoneError.textContent = "Phone number is required.";
      return false;
    }
    if (!regex.test(phoneInput.value.trim())) {
      phoneError.textContent = "Enter a valid phone number.";
      return false;
    }
    phoneError.textContent = "";
    return true;
  }

  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  addressInput.addEventListener("input", validateAddress);
  phoneInput.addEventListener("input", validatePhone);

  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const valid =
      validateName() &&
      validateEmail() &&
      validateAddress() &&
      validatePhone();

    if (!valid) return;

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const formData = new FormData(form);

    const params = new URLSearchParams({
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      total: totalAmountEl.textContent
    });

    // clear cart
    localStorage.removeItem('tech_cart');

    // redirect
    window.location.href = `confirmation.html?${params.toString()}`;
  });

});