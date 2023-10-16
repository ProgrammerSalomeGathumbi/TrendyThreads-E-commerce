import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

async function initFirebase() {

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

  // Get the form and add an event listener
  const form = document.getElementById('form');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get input values
    const productName = getInputVal('productName');
    const productPrice = getInputVal('productPrice');
    const productImage = getInputVal('productImage');
    const productCategory = getInputVal('productCategory');

    // Get a reference to the database and save the data
    const productRef = ref(database, 'Products');
    await push(productRef, {
      productName: productName,
      productPrice: productPrice,
      productImage: productImage,
      productCategory: productCategory,
      productDescription: productDescription
    });

    // Reset the form
    form.reset();
  });

  // Helper function to get input values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }
}

// Call the async function to initialize Firebase
initFirebase();