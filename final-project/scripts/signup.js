document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phoneNo");
  const passwordInput = document.getElementById("password");

  const usernameError = document.getElementById("username-error");
  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");
  const passwordError = document.getElementById("password-error");

  function validateUsername() {
    const value = usernameInput.value.trim();
    if (!value) {
      usernameError.textContent = "Username is required.";
      return false;
    }
    usernameError.textContent = "";
    return true;
  }

  
  function validateEmail() {
    const value = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      emailError.textContent = "Email is required.";
      return false;
    }
    if (!regex.test(value)) {
      emailError.textContent = "Enter a valid email.";
      return false;
    }
    emailError.textContent = "";
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    const regex = /^[0-9]{8,15}$/; 
    if (!value) {
      phoneError.textContent = "Phone number is required.";
      return false;
    }
    if (!regex.test(value)) {
      phoneError.textContent = "Enter a valid phone number.";
      return false;
    }
    phoneError.textContent = "";
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value.trim();
    if (!value) {
      passwordError.textContent = "Password is required.";
      return false;
    }
    if (value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      return false;
    }
    passwordError.textContent = "";
    return true;
  }

  usernameInput.addEventListener("input", validateUsername);
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);
  passwordInput.addEventListener("input", validatePassword);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid =
      validateUsername() &&
      validateEmail() &&
      validatePhone() &&
      validatePassword();

    if (!valid) return;

    // Example: process signup
    console.log("Signup info:", {
      username: usernameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      password: passwordInput.value
    });

    alert(`Account created for ${usernameInput.value}`);

    form.reset();
  });
});
