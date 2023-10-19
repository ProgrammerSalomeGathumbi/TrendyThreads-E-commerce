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
  const db = firebase.firestore();
  

  
  // Get form elements
  const fullNameInput = document.getElementById('fullName');
  const addressInput = document.getElementById('address');
  const cityInput = document.getElementById('city');
  const cardNumberInput = document.getElementById('cardNumber');
  const expirationDateInput = document.getElementById('expirationDate');
  const cvvInput = document.getElementById('cvv');
  const discountCodeInput = document.getElementById('discount-code');
  

  
  // Handle checkout process
  checkoutButton.addEventListener('click', () => {
    // Get user inputs
    const fullName = fullNameInput.value;
    const address = addressInput.value;
    const city = cityInput.value;
    const cardNumber = cardNumberInput.value;
    const expirationDate = expirationDateInput.value;
    const cvv = cvvInput.value;
    const discountCode = discountCodeInput.value;
  
    
  
    // Save shipping information to user database
    db.collection('users').doc('USER_ID').set({
      fullName: fullName,
      address: address,
      city: city
    }, { merge: true })
    .then(() => {
      console.log('Shipping information saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving shipping information: ', error);
    });
  
    // Save payment information to user database, including the total price
    db.collection('users').doc('USER_ID').collection('paymentMethods').add({
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvv: cvv,
      totalPrice: totalPrice  // Include the total price here
    })
    .then((docRef) => {
      console.log('Payment method saved with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error saving payment method: ', error);
    });
  
    // Handle discount code (you can implement your logic for applying discount here)
    if (discountCode) {
      // Apply discount logic here
      console.log('Discount code applied:', discountCode);
    }
  });