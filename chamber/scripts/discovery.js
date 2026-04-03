
import { interests } from '../data/discovery.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("discover-container");
    const messageBox = document.getElementById("visitor-message");
    const modal = document.getElementById("discover-modal");

    
    function setVisitMessage() {
        const msToDays = 86400000; 
        const lastVisit = localStorage.getItem("lastVisitDate");
        const now = Date.now();

        if (!lastVisit) {
            messageBox.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const timeDifference = now - lastVisit;
            const daysSince = Math.floor(timeDifference / msToDays);

            if (timeDifference < msToDays) {
                messageBox.textContent = "Back so soon! Awesome!";
            } else {
                const dayWord = daysSince === 1 ? "day" : "days";
                messageBox.textContent = `You last visited ${daysSince} ${dayWord} ago.`;
            }
        }
        
        localStorage.setItem("lastVisitDate", now);
    }

    function displayInterests() {
        if (!container) return;

        container.innerHTML = interests.map((item, index) => `
            <section class="interest-card card-${index}">
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name}" 
                         loading="lazy" width="300" height="200">
                </figure>
                <address>${item.address}</address>
                <p>${item.description.substring(0, 80)}...</p>
                <button class="learn-more-btn" data-index="${index}">Learn More</button>
            </section>
        `).join('');
    }

 
    if (container) {
        container.addEventListener("click", (event) => {
            if (event.target.classList.contains("learn-more-btn")) {
                const index = event.target.getAttribute("data-index");
                const data = interests[index];

              
                document.getElementById("modal-title").textContent = data.name;
                document.getElementById("modal-desc").textContent = data.description;
                document.getElementById("modal-address").textContent = data.address;

                
                if (modal) {
                    modal.showModal();
                    document.body.style.overflow = "hidden"; 
                }
            }
        });
    }

    if (modal) {
        const closeBtn = modal.querySelector(".close-modal");
        closeBtn.addEventListener("click", () => {
            modal.close();
            document.body.style.overflow = "auto";
        });

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.close();
                document.body.style.overflow = "auto";
            }
        });
    }
    setVisitMessage();
    displayInterests();
});