import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";


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

  function resetPassword() {
      const email = document.getElementById('reset-email').value;
      const resetMessage = document.getElementById('reset-message');
  
      sendPasswordResetEmail(auth, email)
          .then(() => {
              resetMessage.textContent = 'Password reset email sent. Check your inbox!';
          })
          .catch((error) => {
              resetMessage.textContent = error.message;
          });
  }