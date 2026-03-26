
document.addEventListener("DOMContentLoaded", () => {
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    
    const membershipLevels = [
        { btnId: "np-link", modalId: "np-modal" },
        { btnId: "bronze-link", modalId: "bronze-modal" },
        { btnId: "silver-link", modalId: "silver-modal" },
        { btnId: "gold-link", modalId: "gold-modal" }
    ];

    membershipLevels.forEach(level => {
        const openButton = document.getElementById(level.btnId);
        const modal = document.getElementById(level.modalId);
        
        if (openButton && modal) {
            openButton.addEventListener("click", () => {
                modal.showModal();
                document.body.style.overflow = "hidden";
            });

            const closeButton = modal.querySelector(".close-modal");
            if (closeButton) {
                closeButton.addEventListener("click", () => {
                    modal.close();
                    document.body.style.overflow = "auto";
                });
            }

            
            modal.addEventListener("click", (event) => {
                const dialogDimensions = modal.getBoundingClientRect();
                if (
                    event.clientX < dialogDimensions.left ||
                    event.clientX > dialogDimensions.right ||
                    event.clientY < dialogDimensions.top ||
                    event.clientY > dialogDimensions.bottom
                ) {
                    modal.close();
                    document.body.style.overflow = "auto";
                }
            });
        }
    });
});