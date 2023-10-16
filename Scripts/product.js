import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

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

// Get product ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Reference to the specific product in the database
const productRef = ref(database, `Products/${productId}`);

get(productRef).then((snapshot) => {
    if (snapshot.exists()) {
        const product = snapshot.val();
        const productDetailsContainer = document.querySelector('.product-details');

        // Create product details HTML
        const productDetailsHTML = `
            <img src="${product.productImage}" alt="${product.productName}" class="">
            <h2>${product.productName}</h2>
            <p>${product.productPrice}</p>
            <button id="add-to-cart">Add to Cart</button>
        `;

        // Set product details in the container
        productDetailsContainer.innerHTML = productDetailsHTML;

        // Add event listener for the "Add to Cart" button
        const addToCartButton = document.getElementById('add-to-cart');
        addToCartButton.addEventListener('click', () => {
            // Implement your add to cart functionality here
            // You can use local storage or another method to store the cart items
            console.log('Product added to cart:', product.productName);
        });
    } else {
        console.log('Product not found');
    }
}).catch((error) => {
    console.error('Error fetching product:', error);
});