// Run the displayData function when the page loads
window.onload = function () {
    displayData();
};

function submitForm() {
    // Get form values
    const name = document.getElementById('name').value;
    const guests = document.getElementById('guests').value;
    const wishes = document.getElementById('wishes').value;

    // Create an object to store the form data
    const formData = {
        name: name,
        guests: guests,
        wishes: wishes
    };

    // Save the data to local storage
    saveData(formData);

    // Display all stored data
    displayData();
}

function saveData(data) {
    // Check if local storage is supported
    if (typeof(Storage) !== 'undefined') {
        // Retrieve existing data from local storage
        let existingData = localStorage.getItem('formData');
        console.log(existingData);
        // Initialize existingData as an empty array if not already
        existingData = existingData ? JSON.parse(existingData) : [];

        // Ensure existingData is an array
        if (!Array.isArray(existingData)) {
            // Reset local storage if the data is not an array
            existingData = [];
            alert('Resetting local storage. Existing data was not an array.');
        }

        // Add new data to the array
        existingData.push(data);

        // Save the updated array back to local storage
        localStorage.setItem('formData', JSON.stringify(existingData));
    } else {
        alert('Local storage is not supported in your browser.');
    }
}



function displayData() {
    // Retrieve all stored data from local storage
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];

    // Display the data on the page
    const outputDiv = document.getElementById('output');

    if (storedData.length > 0) {
        outputDiv.innerHTML = '<h3>All Stored Data:</h3>';
        storedData.forEach((data, index) => {
            outputDiv.innerHTML += `<p>${index + 1}. Name: ${data.name}, Email: ${data.guests}, Email: ${data.wishes}</p>`;
        });
    } else {
        outputDiv.innerHTML = '<p>No data stored.</p>';
    }
}
