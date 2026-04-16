document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("search-form");
    const input = document.getElementById("search-input");
    const searchBox = document.querySelector(".search");

    if (!form || !input) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const q = input.value.trim();
        if (!q) return;

        window.location.href = `search.html?q=${encodeURIComponent(q)}`;
    });

    if (searchBox && input) {

        searchBox.addEventListener("click", (e) => {
            if (window.innerWidth <= 600) {
                searchBox.classList.add("active");
                setTimeout(() => input.focus(), 100);
            }
        });

        document.addEventListener("click", (e) => {
            if (!searchBox.contains(e.target)) {
                searchBox.classList.remove("active");
            }
        });
    }
});