// Product data
const products = [
    { id: 1, name: 'Product 1', price: 10.00 },
    { id: 2, name: 'Product 2', price: 15.00 },
    { id: 3, name: 'Product 3', price: 20.00 },
    { id: 4, name: 'Product 4', price: 25.00 },
    { id: 5, name: 'Product 5', price: 30.00 },
    { id: 6, name: 'Product 6', price: 35.00 },
    { id: 7, name: 'Product 7', price: 40.00 },
    { id: 8, name: 'Product 8', price: 45.00 },
    { id: 9, name: 'Product 9', price: 50.00 },
    { id: 10, name: 'Product 10', price: 55.00 }
];

// Cart array to hold selected items
let cart = [];

// Function to display products
function displayProducts() {
    const productList = document.querySelector('.product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    displayCart();
}

// Function to display cart items
function displayCart() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(cartItem);
    });

    // Update total price
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Function to place order
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Thank you for your order!');
        cart = [];
        displayCart();
    }
}

// Initialize the store
document.getElementById('place-order').addEventListener('click', placeOrder);
displayProducts();


// User data (for demonstration purposes, using static data)
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

// Function to handle user login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Successful login
        localStorage.setItem('loggedInUser', username);
        alert('Login successful!');

        // Show main content
        document.getElementById('login-form').style.display = 'none';
        document.querySelector('main').style.display = 'flex';
    } else {
        // Failed login
        alert('Invalid username or password. Please try again.');
    }
}

// Function to check if a user is logged in
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        // User is logged in, show main content
        document.getElementById('login-form').style.display = 'none';
        document.querySelector('main').style.display = 'flex';
    } else {
        // User is not logged in, show login form
        document.getElementById('login-form').style.display = 'block';
        document.querySelector('main').style.display = 'none';
    }
}

// Existing functions...

// Initialize the store and check login status
document.getElementById('place-order').addEventListener('click', placeOrder);
displayProducts();
checkLoginStatus();
