const params = new URLSearchParams(window.location.search);

document.getElementById('conf-name').textContent =
    `Name: ${params.get('name')}`;

document.getElementById('conf-email').textContent =
    `Email: ${params.get('email')}`;

document.getElementById('conf-address').textContent =
    `Address: ${params.get('address')}`;

document.getElementById('conf-phone').textContent =
    `Phone: ${params.get('phone')}`;

document.getElementById('conf-total').textContent =
    `Total Paid: $${params.get('total')}`;