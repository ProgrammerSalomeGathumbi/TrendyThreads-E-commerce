import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
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
    const database = getDatabase(app);

    const trendyProductsContainer = document.getElementById("trendy-products-container");

// Function to fetch random products from the database for a specific category
async function fetchRandomProducts(category) {
    const productsRef = ref(database, 'Products');
    const snapshot = await get(productsRef);
    const products = [];

    snapshot.forEach((productSnapshot) => {
        const product = productSnapshot.val();
        if (product.productCategory === category) {
            products.push({ id: productSnapshot.key, ...product });
        }
    });

    // Get a random product from the products array
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    return randomProduct;
}

// Function to render trendy products
async function renderTrendyProducts() {
    // Categories for which you want to display trendy products
    const categories = ['black-tees', 'red-tees', 'hoodies'];

    // Loop through categories and fetch random products for each category
    for (const category of categories) {
        const randomProduct = await fetchRandomProducts(category);

        // Create HTML elements for the random product
        const productCard = document.createElement("div");
        productCard.className = "col-lg-4 col-md-6 mb-4";
        productCard.innerHTML = `
            <div class="card">
                <img src="${randomProduct.productImage}" class="card-img-top" alt="${randomProduct.productName}">
                <div class="card-body">
                    <h5 class="card-title">${randomProduct.productName}</h5>
                    <p>$${randomProduct.productPrice}</p>
                    <a href="product.html?id=${randomProduct.id}" class="btn btn-custom">View Product</a>
                </div>
            </div>
        `;

        // Append the product card to the trendy products container
        trendyProductsContainer.appendChild(productCard);
    }
}

// Call the function to render trendy products
renderTrendyProducts();
  // JavaScript code to show reviews one at a time
const reviews = document.querySelectorAll('.customer-review');
let currentIndex = 0;

function showReview(index) {
    reviews[index].classList.add('show-review');
}

function hideAllReviews() {
    reviews.forEach(review => {
        review.classList.remove('show-review');
    });
}

function nextReview() {
    hideAllReviews();
    currentIndex = (currentIndex + 1) % reviews.length;
    showReview(currentIndex);
}

// Show the first review initially
showReview(currentIndex);

// Set interval to show next review every 5 seconds
setInterval(nextReview, 5000);