const firebaseConfig = {
    apiKey: "AIzaSyB6eNQ9j7n5_a1_beGoOAXQDWkRmdS880I",
    authDomain: "wedding-web-184f4.firebaseapp.com",
    projectId: "wedding-web-184f4",
    storageBucket: "wedding-web-184f4.appspot.com",
    messagingSenderId: "1007028411062",
    appId: "1:1007028411062:web:e3d12e83bc95f80c60e417",
    measurementId: "G-9QZ6PPMNMV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to handle RSVP
function handleRSVP() {
    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;

    // Add RSVP data to Firestore
    db.collection('rsvps').add({
        name: name,
        attendance: attendance
    });
    
    // Clear the form
    document.getElementById('name').value = '';
    document.getElementById('attendance').value = '';
}

// Function to handle guest wishes
function handleWish() {
    const wishText = document.getElementById('wish-text').value;

    // Add wish data to Firestore
    db.collection('wishes').add({
        wishText: wishText
    });

    // Clear the textarea
    document.getElementById('wish-text').value = '';
}

// Function to display wishes
function displayWishes() {
    const wishesList = document.getElementById('wishes-list');

    // Clear existing wishes
    wishesList.innerHTML = '';

    // Get wishes from Firestore and display them
    db.collection('wishes').get().then(snapshot => {
        snapshot.forEach(doc => {
            const wish = doc.data().wishText;
            const wishItem = document.createElement('p');
            wishItem.textContent = wish;
            wishesList.appendChild(wishItem);
        });
    });
}

// Display wishes on page load
displayWishes();