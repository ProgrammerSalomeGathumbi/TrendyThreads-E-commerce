import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";



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

    function displayProducts(category, categoryId) {
    const categorySection = document.getElementById(categoryId);
    const displayedProducts = []; // Array to store displayed product IDs

    const productsRef = ref(database, 'Products');

    onValue(productsRef, (snapshot) => {
        // Loop through products and create HTML elements dynamically
        snapshot.forEach((productSnapshot) => {
            const product = productSnapshot.val();

            // Check if the product belongs to the specified category and is not already displayed
            if (product.productCategory === category && !displayedProducts.includes(productSnapshot.key)) {
                // Add the product ID to the displayed products array
                displayedProducts.push(productSnapshot.key);

                // Create HTML elements for the product
                const productContainer = document.createElement('a');
productContainer.href = `product.html?id=${productSnapshot.key}`; // Dynamically create the product page URL with the product ID
productContainer.className = 'product';
productContainer.innerHTML = `
    <img src="${product.productImage}" alt="${product.productName}">
    <h3>${product.productName}</h3>
    <p>$${product.productPrice}</p>
`;

                // Append the product container to the category section
                categorySection.appendChild(productContainer);
            }
        });
    });
}


displayProducts('black-tees', 'black-tees');
displayProducts('red-tees', 'red-tees');
displayProducts('hoodies', 'hoodies');
