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
    { id: 5, name: 'Product 5', price: 30.00 },
    { id: 6, name: 'Product 6', price: 35.00 },
    { id: 7, name: 'Product 7', price: 40.00 },
    { id: 8, name: 'Product 8', price: 45.00 },
    { id: 9, name: 'Product 9', price: 50.00 },
    { id: 10, name: 'Product 10', price: 55.00 }
];

// Cart array to hold selected items
let cart = [];
// Orders array to hold all placed orders
let orders = [];

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

        // Show order list
        displayOrders();
    }
}

// Function to display all orders
function displayOrders() {
    const orderList = document.getElementById('order-list');
    const ordersDiv = document.querySelector('.orders');

    ordersDiv.innerHTML = ''; // Clear previous order list

    orders.forEach((order, orderIndex) => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order');
        orderDiv.innerHTML = `<h3>Order ${orderIndex + 1}</h3>
