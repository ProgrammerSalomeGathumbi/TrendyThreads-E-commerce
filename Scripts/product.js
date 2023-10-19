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

// Get product ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Reference to the specific product in the database
const productRef = ref(database, `Products/${productId}`);
const productDetailsContainer = document.querySelector('.product-details');

get(productRef).then((snapshot) => {
    if (snapshot.exists()) {
        const product = snapshot.val();
        const productDetailsHTML = `
            <div class="product-grid">
                <div class="product-image">
                    <img src="${product.productImage}" alt="${product.productName}" class="">
                </div>
                <div class="product-info">
                    <div class="product-title">
                        <h2>${product.productName}</h2>
                    </div>
                    <div class="product-price">
                        <p>$${product.productPrice}</p>
                        <p>${product.productDescription}</p>
                    </div>
                    <div class="product-button">
                        <button id="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;

        productDetailsContainer.innerHTML = productDetailsHTML;

        const addToCartButton = document.getElementById('add-to-cart');
        addToCartButton.addEventListener('click', () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is logged in, add product to cart
                    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
                    const existingProduct = cartItems.find(item => item.productId === productId);

                    if (existingProduct) {
                        existingProduct.quantity++;
                    } else {
                        cartItems.push({ productId, quantity: 1 });
                    }

                    localStorage.setItem('cart', JSON.stringify(cartItems));

                    // Update cart count in the UI (if you have a cart count element)
                    const cartCountElement = document.getElementById("cart-count");
                    cartCountElement.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);

                    console.log('Product added to cart:', productId);
                } else {
                    // User is not logged in, redirect to login page
                    alert('Please login to add the product to your cart.');
                    window.location.href = '../HTML/login.html';
                }
            });
        });
    } else {
        console.log('Product not found');
    }
}).catch((error) => {
    console.error('Error fetching product:', error);
});