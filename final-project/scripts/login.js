document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");

  function validateUsername() {
    if (!username.value.trim()) {
      usernameError.textContent = "Username is required.";
      return false;
    }
    usernameError.textContent = "";
    return true;
  }

  function validatePassword() {
    if (!password.value.trim()) {
      passwordError.textContent = "Password is required.";
      return false;
    } else if (password.value.trim().length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      return false;
    }
    passwordError.textContent = "";
    return true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const isValid = validateUsername() & validatePassword();
    if (isValid) {
      alert(`Login successful for ${username.value}`);
      form.reset();
    }
  });
});
