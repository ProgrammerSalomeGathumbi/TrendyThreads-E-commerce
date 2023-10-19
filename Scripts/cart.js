import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
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
  const auth = getAuth(app);
  const database = getDatabase(app);
  
  document.addEventListener("DOMContentLoaded", async function() {
      const cartItemsContainer = document.getElementById("cart-items");
      const cartTotalElement = document.getElementById("cart-total");
      const checkoutButton = document.getElementById("checkout-button");
  
      // Initialize cart from localStorage or set it to an empty array if not available
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Function to render cart items
      async function renderCart() {
          cartItemsContainer.innerHTML = "";
          let totalPrice = 0;
          let groupedCart = {};
  
          // Group cart items by productId and accumulate prices
          cart.forEach(cartItem => {
              if (!groupedCart[cartItem.productId]) {
                  groupedCart[cartItem.productId] = {
                      ...cartItem,
                      totalPrice: cartItem.quantity * cartItem.productPrice
                  };
              } else {
                  groupedCart[cartItem.productId].quantity += cartItem.quantity;
                  groupedCart[cartItem.productId].totalPrice += cartItem.quantity * cartItem.productPrice;
              }
          });
  
          // Render grouped cart items
          for (const productId in groupedCart) {
              const cartItem = groupedCart[productId];
              const productRef = ref(database, `Products/${productId}`);
              const snapshot = await get(productRef);
              const productData = snapshot.val();
  
              // Check if product data exists and contains necessary properties
              if (productData && productData.productName && productData.productPrice && productData.productImage) {
                  const row = document.createElement("div");
                  row.className = "cart-row";
                  row.innerHTML = `
                  <h3>${productData.productName}</h3>
                      <img src="${productData.productImage}" alt="${productData.productName}" class="cart-item-image">
                      <div class="cart-item-info">
                          
                          <p>$${productData.productPrice} each</p>
                          <p>Quantity: ${cartItem.quantity}</p>
                          
                          <button class="delete-button">Delete</button>
                      </div>
                  `;
                  cartItemsContainer.appendChild(row);
  
                  // Update total price
                totalPrice += productData.productPrice * cartItem.quantity;
              }
          }
  
          // Update total price in the summary section
          cartTotalElement.textContent = totalPrice.toFixed(2);
  
          // Attach event listeners to delete buttons
          const deleteButtons = document.querySelectorAll(".delete-button");
  
          deleteButtons.forEach((button) => {
              button.addEventListener("click", () => {
                  // Find the correct cart item index based on productId and update quantity
                  const productId = button.parentElement.querySelector("h3").textContent;
                  const itemIndex = cart.findIndex(item => item.productId === productId);
                  if (itemIndex !== -1) {
                      cart.splice(itemIndex, 1);
                      updateCart();
                  }
              });
          });
      }
  
      // Function to update cart in localStorage and re-render the cart
      function updateCart() {
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
      }
  
      // Initial rendering of the cart
      renderCart();
  
      // Event listener for the checkout button click
      checkoutButton.addEventListener("click", () => {
          // Redirect to checkout page
          window.location.href = "checkout.html";
      });
  });