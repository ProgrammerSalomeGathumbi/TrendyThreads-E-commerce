import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// Initialize Firebase
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
// Function to display products in the cart
function displayCartProducts(cart) {
    const cartProductsElement = document.getElementById("cart-products");
    cartProductsElement.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    for (const productId in cart) {
        const product = cart[productId];
        totalItems += product.quantity;
        totalPrice += product.price * product.quantity;

        const productElement = document.createElement("div");
        productElement.classList.add("cart-product");
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="product-details">
                <div>${product.name}</div>
                <div>Quantity: ${product.quantity}</div>
                <div>Price: $${product.price.toFixed(2)}</div>
            </div>
        `;
        cartProductsElement.appendChild(productElement);
    }

    document.getElementById("total-items").textContent = totalItems;
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

// Function to load cart data from Firebase and display it
function loadCartData() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            const cartRef = ref(database, `users/${userId}/cart`);

            get(cartRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const cart = snapshot.val();
                        displayCartProducts(cart);
                    } else {
                        console.log("Cart is empty.");
                    }
                })
                .catch((error) => {
                    console.error("Error loading cart:", error);
                });
        } else {
            console.log("User is not logged in.");
        }
    });
}

// Load cart data when the page loads
window.addEventListener("load", loadCartData);

// Event listener for the checkout button
const checkoutButton = document.getElementById("checkout-btn");
checkoutButton.addEventListener("click", () => {
    // Implement checkout logic here
    // Redirect to a checkout page or perform other actions
    console.log("Checkout button clicked.");
});