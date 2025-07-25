
const drinks = [
    { id: 1, name: "Coca Cola", price: 1.5 },
    { id: 2, name: "Orange Juice", price: 2.0 },
    { id: 3, name: "Lemonade", price: 1.8 }
];

const snacks = [
    { id: 4, name: "French Fries", price: 3.0 },
    { id: 5, name: "Chicken Nuggets", price: 4.5 },
    { id: 6, name: "Burger", price: 5.0 }
];

let cart = [];

// Function to display products
function displayProducts() {
    const drinksContainer = document.querySelector('#drinks .products');
    const snacksContainer = document.querySelector('#snacks .products');

    // Clear previous
    drinksContainer.innerHTML = "";
    snacksContainer.innerHTML = "";

    // Render drinks
    drinks.forEach(product => {
        const card = createProductCard(product);
        drinksContainer.appendChild(card);
    });

    // Render snacks
    snacks.forEach(product => {
        const card = createProductCard(product);
        snacksContainer.appendChild(card);
    });
}

// Helper to create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const name = document.createElement('h3');
    name.innerText = product.name;
    card.appendChild(name);

    const price = document.createElement('p');
    price.innerText = `$${product.price.toFixed(2)}`;
    card.appendChild(price);

    const btn = document.createElement('button');
    btn.innerText = "Add to Cart";
    btn.className = 'add-btn';
    btn.onclick = () => addToCart(product);
    card.appendChild(btn);

    return card;
}

// Add product to cart
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    alert(`${product.name} added to cart`);
}

// Show specific section
function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(sec => {
        sec.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    // If showing cart, render it
    if (sectionId === 'cart') {
        renderCart();
    }
}

// Render cart items
function renderCart() {
    const cartDiv = document.getElementById('cart-items');
    cartDiv.innerHTML = '';

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    const ul = document.createElement('ul');

    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        ul.appendChild(li);
        total += item.price * item.quantity;
    });

    cartDiv.appendChild(ul);

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartDiv.appendChild(totalDiv);
}

// Show cart view
function showCart() {
    showSection('cart');
}

// Place order
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order!');
    cart = [];
    showSection('drinks');
}

// Initialize
window.onload = () => {
    displayProducts();
    showSection('drinks');
};

