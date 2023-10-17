import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

 // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCjn_0F0y5Sxo7DsoG8nCJ2Q3JIddqzBQA",
    authDomain: "ecommerce-76138.firebaseapp.com",
    projectId: "ecommerce-76138",
    storageBucket: "ecommerce-76138.appspot.com",
    messagingSenderId: "789236452721",
    appId: "1:789236452721:web:aecdde84ef59f12dcafad0",
    measurementId: "G-S0HJ5QC370"
    
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
// DOM elements
const userInfo = document.getElementById("user-info");
const signInBtn = document.getElementById("sign-in-btn");
const signOutBtn = document.getElementById("sign-out-btn");
const cartCountElement = document.getElementById("cart-count");

// Function to update user status and cart count
function updateUserStatus() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            userInfo.textContent = `Welcome, ${user.displayName}!`;
            signInBtn.style.display = "none";
            signOutBtn.style.display = "block";
        } else {
            // User is signed out
            userInfo.textContent = "Guest";
            signInBtn.style.display = "block";
            signOutBtn.style.display = "none";
        }
    });

    // You can fetch the cart count from your database and update cartCountElement
    const cartCount = 0; // Replace this with the actual cart count fetched from the database
    cartCountElement.textContent = cartCount;
}

// Event listener for sign out button
signOutBtn.addEventListener("click", () => {
    // Sign out the user
    signOut(auth).then(() => {
        // User is signed out
        console.log("User signed out");
    }).catch((error) => {
        // Handle errors here
        console.error(error);
    });
});

// Call the function to update user status and cart count
updateUserStatus();
