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
        const displayedProducts = new Set();
    
        const productsRef = ref(database, 'Products');
    
        onValue(productsRef, (snapshot) => {
            // Filter products by category and create an array of product objects
            const products = snapshotToArray(snapshot).filter(product => product.productCategory === category);
    
            // Create a grid container for the category
            const categoryGrid = document.createElement('div');
            categoryGrid.className = 'product-grid';
    
            // Loop through products and create HTML elements dynamically
            products.forEach((product) => {
                // Check if the product is not already displayed
            if (!displayedProducts.has(product.id)) {
                displayedProducts.add(product.id); // Add product ID to the Set
    
                // Create product container
                const productContainer = document.createElement('div');
                productContainer.className = 'product';
    
                // Create product details div
                const productDetails = document.createElement('div');
                productDetails.className = 'product-details';
    
                // Create image element
                const img = document.createElement('img');
                img.src = product.productImage;
                img.alt = product.productName;
    
                // Create name element
                const name = document.createElement('h4');
                name.textContent = product.productName;
    
                // Create price element
                const price = document.createElement('p');
                price.textContent = `$${product.productPrice}`;
    
                // Append image, name, and price to product details
                productDetails.appendChild(img);
                productDetails.appendChild(name);
                productDetails.appendChild(price);
    
                // Append product details to the product container
                productContainer.appendChild(productDetails);
    
                // Append the product container to the category grid
                categoryGrid.appendChild(productContainer);
              }
            });
    
            // Append the category grid to the category section
            categorySection.appendChild(categoryGrid);
        });
    }
    
    // Helper function to convert Firebase snapshot to array of objects
    function snapshotToArray(snapshot) {
        const result = [];
        snapshot.forEach(childSnapshot => {
            const item = childSnapshot.val();
            item.id = childSnapshot.key;
            result.push(item);
        });
        return result;
    }
    
    displayProducts('black-tees', 'black-tees');
    displayProducts('red-tees', 'red-tees');
    displayProducts('hoodies', 'hoodies');
    