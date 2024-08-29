// User data (for demonstration purposes, using static data)
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

// Product data
const products = [
    { id: 1, name: 'Product 1', price: 10.00 },
    { id: 2, name: 'Product 2', price: 15.00 },
    { id: 3, name: 'Product 3', price: 20.00 },
    { id: 4, name: 'Product 4', price: 25.00 },
    { id: 5, name: 'Product 5', price: 30.00 }
];

// Cart array to hold selected items
let cart = [];
// Orders array to hold all placed orders
let orders = [];

// Function to handle login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the user exists
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Hide login form and show dashboard
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        alert('Invalid username or password');
    }
}

// Function to show Create Order section
function showCreateOrder() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('create-order').style.display = 'block';
    displayProducts();
}

// Function to show Order List section
function showOrderList() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('order-list').style.display = 'block';
    displayOrders();
}

// Function to display products
function displayProducts() {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <input type="number" id="quantity-${product.id}" value="1" min="1">
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);

    // Check if the product is already in the cart
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        // Update the quantity if the product is already in the cart
        cartItem.quantity += quantity;
    } else {
        // Add new product to the cart
        cart.push({ ...product, quantity });
    }

    displayCart();
}

// Function to display cart items
function displayCart() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = ''; // Clear previous content

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} 
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    // Update total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
        // Save the current cart as an order
        orders.push([...cart]);

        // Clear the cart
        cart = [];
        displayCart();

        alert('Order placed successfully!');
        // Redirect to dashboard
        document.getElementById('create-order').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    }
}

// Function to display all orders
function displayOrders() {
    const ordersDiv = document.querySelector('.orders');

    ordersDiv.innerHTML = ''; // Clear previous order list

    orders.forEach((order, orderIndex) => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order');
        let orderDetails = `<h3>Order ${orderIndex + 1}</h3>`;
        order.forEach(item => {
            orderDetails += `<p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>`;
        });
        orderDiv.innerHTML = orderDetails;
        ordersDiv.appendChild(orderDiv);
    });

    // Show the order list section
    document.getElementById('order-list').style.display = 'block';
}
