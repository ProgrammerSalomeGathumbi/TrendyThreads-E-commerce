import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
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
  

  // Function to handle sign-in, sign-out, and guest mode toggle
  function toggleAuth() {
    const user = auth.currentUser;
    const toggleBtn = document.getElementById('toggle-auth-btn');
    const cartIcon = document.getElementById('cart-info'); // Assuming you have a cart icon element with the ID 'cart-icon'
  
    // Event listener for the cart icon
    cartIcon.addEventListener('click', () => {
        window.location.href = 'cart.html'; // Redirect to cart.html when the cart icon is clicked
    });

    if (user) {
        // User is signed in, show sign out option
        toggleBtn.textContent = 'Sign Out';
        toggleBtn.addEventListener('click', () => {
            auth.signOut().then(() => {
                // Sign-out successful.
                toggleBtn.textContent = 'Guest Mode';
                console.log('User signed out.');
            }).catch((error) => {
                // An error happened.
                console.error(error);
            });
        });
    } else {
        // User is not signed in, show sign in option
        toggleBtn.textContent = 'Guest Mode';
        toggleBtn.addEventListener('click', () => {
            // Implement your guest mode logic here if needed
            console.log('Guest mode activated.');
        });
    }
}

// Call the toggleAuth function to set up the initial state
toggleAuth();