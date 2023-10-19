import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";


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
    const database = getDatabase(app);
    const auth = getAuth(app);
        // Login Function
        function login() {
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const errorMessageElement = document.getElementById('error-message');
      
          // Clear previous error message
          errorMessageElement.textContent = '';
      
          // Sign in user with email and password
          signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  // User is signed in, redirect or do something with the user
                  const user = userCredential.user;
                  console.log('Logged In:', user);
                  window.location.href = "about.html";
              })
              .catch((error) => {
                const errorMessage = error.message;
                errorMessageElement.textContent = errorMessage;
                console.error('login error!');
               
            });
      }
      function signInWithGoogle() {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log('Google Sign-In Successful:', user);
                window.location.href = "about.html";
            })
            .catch((error) => {
                console.error("Google Sign-In Error:", error.code, error.message);
            });
    }
    
    document.getElementById('googleSignIn').addEventListener('click', signInWithGoogle);

 const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');

togglePasswordButton.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});
