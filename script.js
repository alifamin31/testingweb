// // Run the displayData function when the page loads
// window.onload = function () {
//     displayData();
// };

// function submitForm() {
//     // Get form values
//     const name = document.getElementById('name').value;
//     const guests = document.getElementById('guests').value;
//     const wishes = document.getElementById('wishes').value;

//     // Create an object to store the form data
//     const formData = {
//         name: name,
//         guests: guests,
//         wishes: wishes
//     };

//     // Save the data to local storage
//     saveData(formData);

//     // Display all stored data
//     displayData();
// }

// function saveData(data) {
//     // Check if local storage is supported
//     if (typeof(Storage) !== 'undefined') {
//         // Retrieve existing data from local storage
//         let existingData = localStorage.getItem('formData');
//         console.log(existingData);
//         // Initialize existingData as an empty array if not already
//         existingData = existingData ? JSON.parse(existingData) : [];

//         // Ensure existingData is an array
//         if (!Array.isArray(existingData)) {
//             // Reset local storage if the data is not an array
//             existingData = [];
//             alert('Resetting local storage. Existing data was not an array.');
//         }

//         // Add new data to the array
//         existingData.push(data);

//         // Save the updated array back to local storage
//         localStorage.setItem('formData', JSON.stringify(existingData));
//     } else {
//         alert('Local storage is not supported in your browser.');
//     }
// }



// function displayData() {
//     // Retrieve all stored data from local storage
//     const storedData = JSON.parse(localStorage.getItem('formData')) || [];

//     // Display the data on the page
//     const outputDiv = document.getElementById('output');

//     if (storedData.length > 0) {
//         outputDiv.innerHTML = '<h3>All Stored Data:</h3>';
//         storedData.forEach((data, index) => {
//             outputDiv.innerHTML += `<p>${index + 1}. Name: ${data.name}, Email: ${data.guests}, Email: ${data.wishes}</p>`;
//         });
//     } else {
//         outputDiv.innerHTML = '<p>No data stored.</p>';
//     }
// }

getWishes();

function getWishes() {
    fetch("https://script.google.com/macros/s/AKfycbyzP2HAbW6uRkNY7nFdfYIXZdLYTplcz0v6rTyLZrgAPpyvgn7janNIEWRv5_dyHCnyiA/exec", {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        $('#totalGuests').html('');

        $('#totalGuests').append('<h2>'+data['totalGuests']+'</h2>');

        $('#wishlists').html('');

        for(var wish in data['wishes']) {
            $('#wishlists').append('<h2>'+data['wishes'][wish]+'</h2>');
        }
        
        console.log(data['wishes']);
    })
    .catch(error => console.error(error));
}

document.getElementById("rsvpForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var form = event.target;
    var formData = new FormData(form);
    
    fetch("https://script.google.com/macros/s/AKfycbyzP2HAbW6uRkNY7nFdfYIXZdLYTplcz0v6rTyLZrgAPpyvgn7janNIEWRv5_dyHCnyiA/exec", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        form.reset();
        getWishes();
    })
    .catch(error => console.error(error));
});

document.addEventListener("DOMContentLoaded", function() {
    var decreaseButton = document.getElementById("decreaseGuests");
    var increaseButton = document.getElementById("increaseGuests");
    var guestsInput = document.getElementById("guests");

    decreaseButton.addEventListener("click", function() {
        var currentGuests = parseInt(guestsInput.value);
        if (currentGuests > 0) {
            guestsInput.value = currentGuests - 1;
        }
    });

    increaseButton.addEventListener("click", function() {
        var currentGuests = parseInt(guestsInput.value);
        if (currentGuests < 5) {
            guestsInput.value = currentGuests + 1;
        }
    });
});

function updateWishes() {
    fetch("https://script.google.com/macros/s/AKfycbyzP2HAbW6uRkNY7nFdfYIXZdLYTplcz0v6rTyLZrgAPpyvgn7janNIEWRv5_dyHCnyiA/exec?action=getWishes")
    .then(response => response.json())
    .then(data => {
        var wishesList = document.getElementById("wishesList");
        wishesList.innerHTML = "";
        data.forEach(wish => {
            var li = document.createElement("li");
            li.textContent = wish;
            wishesList.appendChild(li);
        });
    })
    .catch(error => console.error(error));
}

function updateTotalGuests() {
    fetch("https://script.google.com/macros/s/AKfycbyzP2HAbW6uRkNY7nFdfYIXZdLYTplcz0v6rTyLZrgAPpyvgn7janNIEWRv5_dyHCnyiA/exec?action=getTotalGuests")
    .then(response => response.text())
    .then(data => {
        document.getElementById("totalGuests").textContent = data;
    })
    .catch(error => console.error(error));
}

// $(document).ready(function () {
//     // Increase guests
//     $('#increaseGuests').click(function () {
//         var numGuests = parseInt($('#numGuests').val());
//         if (numGuests < 5) {
//             $('#numGuests').val(numGuests + 1);
//         }
//     });

//     // Decrease guests
//     $('#decreaseGuests').click(function () {
//         var numGuests = parseInt($('#numGuests').val());
//         if (numGuests > 0) {
//             $('#numGuests').val(numGuests - 1);
//         }
//     });

//     // Submit RSVP form
//     $('#rsvpForm').submit(function (e) {
//         e.preventDefault();
//         var formData = $(this).serializeArray();
//         $.ajax({
//             url: 'https://script.google.com/macros/s/AKfycbxY3O1hwHb9GGN14i0jELdpd0OnOmmFZl1FRnXOBWzxjd5hgk95mvGu_MZvRGgNWzIrPQ/exec',
//             method: 'POST',
//             data: formData,
//             success: function (response) {
//                 console.log('RSVP submitted successfully');
//                 $('#output').text('RSVP submitted successfully');
//                 $('#rsvpForm')[0].reset();
//             },
//             error: function (xhr, status, error) {
//                 console.error('Error:', error);
//                 $('#output').text('Error occurred. Please try again.');
//             }
//         });
//     });

//     // Fetch total number of guests
//     $.ajax({
//         url: 'https://script.google.com/macros/s/AKfycbxY3O1hwHb9GGN14i0jELdpd0OnOmmFZl1FRnXOBWzxjd5hgk95mvGu_MZvRGgNWzIrPQ/exec?action=totalGuests',
//         method: 'GET',
//         success: function (response) {
//             $('#totalGuests').text(response);
//         },
//         error: function (xhr, status, error) {
//             console.error('Error:', error);
//         }
//     });

//     // Fetch and display wishes
//     $.ajax({
//         url: 'https://script.google.com/macros/s/AKfycbyOzyZ4eEUElFhBWlcL2jKkyGcGz6FQf_MzUUI/exec?action=wishes',
//         method: 'GET',
//         success: function (response) {
//             var wishesList = response.reverse(); // Reverse to show latest wishes first
//             var wishesHtml = '';
//             wishesList.forEach(function (wish) {
//                 wishesHtml += '<p>' + wish + '</p>';
//             });
//             $('#wishesList').html(wishesHtml);
//         },
//         error: function (xhr, status, error) {
//             console.error('Error:', error);
//         }
//     });
// });