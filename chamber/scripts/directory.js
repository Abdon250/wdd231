const directoryContainer = document.getElementById("members");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");


if (directoryContainer && gridBtn && listBtn) {
    
    async function getMembers() {
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();
            displayMembers(data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayMembers(members) {
        directoryContainer.innerHTML = ""; 
        members.forEach(m => {
            const card = document.createElement("section");
            if (m.level === 3) card.classList.add("gold-member");
            if (m.level === 2) card.classList.add("silver-member");

            card.innerHTML = `
                <img src="images/${m.image}" alt="${m.name} logo" loading="lazy">
                <div class="info">
                    <h3>${m.name}</h3>
                    <p>${m.address}</p>
                    <p>${m.phone}</p>
                    <a href="${m.website}" target="_blank">Visit Website</a>
                </div>
            `;
            directoryContainer.appendChild(card);
        });
    }

    gridBtn.onclick = () => {
        directoryContainer.classList.add("grid");
        directoryContainer.classList.remove("list-style");
    };

    listBtn.onclick = () => {
        directoryContainer.classList.add("list-style");
        directoryContainer.classList.remove("grid");
    };

    getMembers();
}