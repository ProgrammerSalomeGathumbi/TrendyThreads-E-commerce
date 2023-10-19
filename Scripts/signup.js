import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"; // corrected import path for Firebase Auth
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

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
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", function() {
    const signUpButton = document.getElementById("signupButton");

    if (signUpButton) {
        signUpButton.addEventListener("click", signUp);
    } else {
        console.error("Signup button not found in the DOM.");
    }

    const googleSignInButton = document.getElementById("googleSignIn");
    if (googleSignInButton) {
        googleSignInButton.addEventListener("click", signInWithGoogle);
    } else {
        console.error("Google Sign-In button not found in the DOM.");
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, redirect to the desired page
            window.location.href = "index.html";
        }
    });

    const passwordInput = document.getElementById("signupPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const togglePasswordButton = document.getElementById("togglePassword");
    const toggleConfirmPasswordButton = document.getElementById("toggleConfirmPassword");

    togglePasswordButton.addEventListener("click", function () {
        togglePasswordVisibility(passwordInput, togglePasswordButton);
    });

    toggleConfirmPasswordButton.addEventListener("click", function () {
        togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordButton);
    });
});

function signUp(event) {
    event.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const fullName = document.getElementById("fullName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=])[A-Za-z\d@$!%*?&=]{8,}$/;
    const errorMessageElement = document.getElementById("error-message");
    const emailErrorElement = document.getElementById("email-error-message");
    const passwordRequirementsMessageElement = document.getElementById("password-requirements-message");
    const passwordMismatchMessageElement = document.getElementById("password-mismatch-message");

    errorMessageElement.innerText = "";
    emailErrorElement.innerText = "";
    passwordRequirementsMessageElement.innerText = "";
    passwordMismatchMessageElement.innerText = "";
    
    if (!isValidEmail(email)) {
        emailErrorElement.innerText = "Invalid email address.";
        emailErrorElement.style.display = "block";
        return;
    }

    if (password !== confirmPassword) {
       passwordMismatchMessageElement.innerText = "Passwords do not match.";
       passwordMismatchMessageElement.style.display = "block";
        return;
    }

    // Validate password requirements
   if (!passwordRegex.test(password)) {
    console.log(/[a-z]/.test(password)); // Check if there is a lowercase letter
    console.log(/[A-Z]/.test(password)); // Check if there is an uppercase letter
    console.log(/\d/.test(password)); // Check if there is a number
    console.log(/[@$!%*?&]/.test(password)); // Check if there is a special character

    passwordRequirementsMessageElement.innerText = "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
    passwordRequirementsMessageElement.style.display = "block";
    return;
}


createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    const user = userCredential.user;

    const usersRef = ref(database, 'users');
    const newUser = {
        email: email,
        fullName: fullName,
        phoneNumber: phoneNumber,
    };

    push(usersRef, newUser)
        .then(() => {
            // window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Database storage error:", error);
        });
})
.catch((error) => {
    if (error.code === "auth/email-already-in-use") {
        // Handle the case where the email is already in use
        const emailErrorElement = document.getElementById("email-error-message");
        emailErrorElement.innerText = "Email is already in use. Please use a different email.";
        emailErrorElement.style.display = "block";
    } else {
        // Handle other authentication errors
        console.error("Signup error:", error.code, error.message);
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.innerText = "Signup failed. Please try again.";
    }
});
}

function signInWithGoogle() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Google Sign-In Error:", error.code, error.message);
        });
}

function togglePasswordVisibility(input, toggleButton) {
    const type = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    toggleButton.classList.toggle("fa-eye-slash");
}

function isValidEmail(email) {
    // You can implement your own email validation logic here
    // For a basic example, you can use a regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}