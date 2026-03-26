// Set timestamp on page load
document.addEventListener("DOMContentLoaded", () => {
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }
});

// Modal Control
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.showModal();
    }
}