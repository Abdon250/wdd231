
document.addEventListener("DOMContentLoaded", () => {
    

    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    const modalMapping = [
        { btnId: "np-link", modalId: "np_modal" },
        { btnId: "bronze-link", modalId: "bronze_modal" },
        { btnId: "silver-link", modalId: "silver_modal" },
        { btnId: "gold-link", modalId: "gold_modal" }
    ];

    modalMapping.forEach(item => {
        const openBtn = document.getElementById(item.btnId);
        const modal = document.getElementById(item.modalId);
        
        if (openBtn && modal) {
            openBtn.addEventListener("click", () => {
                modal.showModal();
                document.body.style.overflow = "hidden";
            });

            const closeBtn = modal.querySelector(".close-modal");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    modal.close();
                    document.body.style.overflow = "auto";
                });
            }

            modal.addEventListener("click", (event) => {
                const rect = modal.getBoundingClientRect();
                const isInDialog = (
                    event.clientX >= rect.left &&
                    event.clientX <= rect.right &&
                    event.clientY >= rect.top &&
                    event.clientY <= rect.bottom
                );
                if (!isInDialog) {
                    modal.close();
                    document.body.style.overflow = "auto";
                }
            });
        }
    });

    console.log("Join script initialized: Timestamp set and Modal listeners active.");
});