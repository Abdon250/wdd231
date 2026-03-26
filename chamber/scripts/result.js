


const urlParams = new URLSearchParams(window.location.search);


const resultsContainer = document.getElementById("results");


function displayResults() {
    if (urlParams.size > 0) {
        
        resultsContainer.innerHTML = `
            <div class="result-item">
                <strong>First Name:</strong> <span>${urlParams.get('fname') || 'N/A'}</span>
            </div>
            <div class="result-item">
                <strong>Last Name:</strong> <span>${urlParams.get('lname') || 'N/A'}</span>
            </div>
            <div class="result-item">
                <strong>Email:</strong> <span>${urlParams.get('email') || 'N/A'}</span>
            </div>
            <div class="result-item">
                <strong>Phone:</strong> <span>${urlParams.get('phone') || 'N/A'}</span>
            </div>
            <div class="result-item">
                <strong>Business Name:</strong> <span>${urlParams.get('orgname') || 'N/A'}</span>
            </div>
            <div class="result-item">
                <strong>Timestamp:</strong> <span>${formatDate(urlParams.get('timestamp'))}</span>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = "<p>No submission data found.</p>";
    }
}


function formatDate(timestamp) {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleString();
}


displayResults();