export function initAuth() {
  const login = document.getElementById("login-form");
  const signup = document.getElementById("signup-form");

  login?.addEventListener("submit", e => {
    e.preventDefault();
    alert("Login success");
  });

  signup?.addEventListener("submit", e => {
    e.preventDefault();
    alert("Account created");
  });
}