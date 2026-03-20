const weatherField = document.getElementById("weather");
const forecastField = document.getElementById("forecast");
const spotlightContainer = document.getElementById("members");

if (weatherField && spotlightContainer) {
    const membersURL = "data/members.json";
    const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=-1.95&longitude=30.06&current_weather=true&daily=temperature_2m_max&timezone=auto";

    async function initHome() {
        await getWeatherData();
        await getSpotlights();
    }

    async function getWeatherData() {
        try {
            const res = await fetch(weatherURL);
            const data = await res.json();
            
           
            weatherField.innerHTML = `🌡️ ${data.current_weather.temperature}°C<br>Wind: ${data.current_weather.windspeed} km/h`;
            
            
            forecastField.innerHTML = "";
            for (let i = 0; i < 3; i++) {
                const temp = data.daily.temperature_2m_max[i];
                const date = new Date();
                date.setDate(date.getDate() + i);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                forecastField.innerHTML += `<p>${dayName}: ${temp}°C</p>`;
            }
        } catch (e) { console.error(e); }
    }

    async function getSpotlights() {
        try {
            const res = await fetch(membersURL);
            const members = await res.json();
            
           
            const eligible = members.filter(m => m.level === 3 || m.level === 2);
            
            
            const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

            spotlightContainer.innerHTML = "";
            selected.forEach(m => {
                const card = document.createElement("section");
                card.className = "card";
                if (m.level === 3) card.style.border = "2px solid gold";
                if (m.level === 2) card.style.border = "2px solid silver";

                card.innerHTML = `
                    <img src="images/${m.image}" alt="${m.name}" loading="lazy">
                    <div class="info">
                        <h3>${m.name}</h3>
                        <p>${m.phone}</p>
                        <a href="${m.website}" target="_blank">Visit Website</a>
                    </div>
                `;
                spotlightContainer.appendChild(card);
            });
        } catch (e) { console.error(e); }
    }

    initHome();
}