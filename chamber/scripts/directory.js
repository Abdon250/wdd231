// MENU
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

// toggle menu
menu.onclick = () => {
    nav.classList.toggle("open");
};

// close when clicking outside
document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menu.contains(e.target)) {
        nav.classList.remove("open");
    }
});

// MEMBERS
const container = document.getElementById("members");

fetch("data/members.json")
.then(res => res.json())
.then(data => {
    data.forEach(m => {
        const card = document.createElement("section");

        if (m.level === 3) card.style.border = "2px solid gold";
        if (m.level === 2) card.style.border = "2px solid silver";

        card.innerHTML = `
            <img src="images/${m.image}" loading="lazy">
            <div class="info">
                <h3>${m.name}</h3>
                <p>${m.address}</p>
                <p>${m.phone}</p>
                <a href="${m.website}" target="_blank">Visit</a>
            </div>
        `;

        container.appendChild(card);
    });
});

const darkBtn = document.getElementById("darkToggle");

darkBtn.onclick = () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        darkBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
};
// TOGGLE
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

gridBtn.onclick = () => {
    container.classList.remove("list-style");
};

listBtn.onclick = () => {
    container.classList.add("list-style");
};

const events = [
    {
        title: "Business Networking Meetup",
        date: "March 25, 2026",
        location: "Kigali Convention Centre"
    },
    {
        title: "Startup Pitch Night",
        date: "April 2, 2026",
        location: "Innovation Village Kigali"
    },
    {
        title: "Local Trade Fair",
        date: "April 10, 2026",
        location: "Nyamirambo Grounds"
    }
];

const eventsContainer = document.getElementById("events");

events.forEach(event => {
    const li = document.createElement("li");

    li.innerHTML = `
        <i class="fas fa-calendar-day"></i>
        <strong>${event.title}</strong><br>
        <small>${event.date}</small><br>
        <small><i class="fas fa-location-dot"></i> ${event.location}</small>
    `;

    eventsContainer.appendChild(li);
});


// WEATHER (real API)
fetch("https://api.open-meteo.com/v1/forecast?latitude=-1.95&longitude=30.06&current_weather=true")
.then(res=>res.json())
.then(data=>{
    document.getElementById("weather").innerHTML =
        `🌡️ ${data.current_weather.temperature}°C`;
    document.getElementById("forecast").innerHTML =
        `Wind: ${data.current_weather.windspeed} km/h`;
});