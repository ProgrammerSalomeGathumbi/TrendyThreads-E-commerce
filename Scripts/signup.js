import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"; // corrected import path for Firebase Auth
import { ref, push } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

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
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

function signUpWithEmail() {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const fullName = document.getElementById("fullName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Regular expression to match a password with at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        document.getElementById("password-message").innerText = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("password-message").innerText = "Passwords do not match.";
        return;
    }

    // Reset password message if requirements are met
    document.getElementById("password-message").innerText = "";


    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed up successfully
            const user = userCredential.user;
            
            // Store additional user data to the database
            const usersRef = ref(database, 'users');
            const newUser = {
                email: email,
                fullName: fullName,
                phoneNumber: phoneNumber,
            };

            // Push the new user data to the database
            push(usersRef, newUser)
                .then(() => {
                    // User data stored successfully
                    // Redirect to the home page
                    window.location.href = "home.html";
                })
                .catch((error) => {
                    // Handle database storage errors
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // Show error messages to the user
                });
        })
        .catch((error) => {
            // Handle signup errors
            const errorCode = error.code;
            const errorMessage = error.message;
            // Show error messages to the user
        });
}

function signInWithGoogle() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // Handle successful Google sign-in, you can redirect or show a success message here
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle errors, you can show error messages to users here
        });
}
