
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("modified").textContent = document.lastModified;


const menuBtn = document.getElementById("menu");
const nav = document.getElementById("nav");
const icon = menuBtn.querySelector("i");

menuBtn.onclick = () => {
    nav.classList.toggle("open");
    if (nav.classList.contains("open")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }
};


const darkBtn = document.getElementById("darkToggle");
darkBtn.onclick = () => {
    document.body.classList.toggle("dark");
    darkBtn.innerHTML = document.body.classList.contains("dark") 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
};