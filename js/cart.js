// DOM ready
document.addEventListener('DOMContentLoaded', function () {
  // Add to Cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  updateCartCount();

  // Check if we're on the cart page
  if (document.getElementById('cart-items')) {
    updateCartDisplay();
  }
});

// Add to cart
function addToCart(event) {
  const button = event.target;
  const product = {
    id: button.dataset.id,
    name: button.dataset.name,
    price: parseFloat(button.dataset.price),
    image: button.dataset.image,
    quantity: 1
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showNotification(`${product.name} added to cart`);
}

// Update cart icon count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = count;
}

// Show cart contents on cart.html
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty</p>
        <a href="shop.html" class="btn">Continue Shopping</a>
      </div>
    `;
    cartSummary.style.display = 'none';
    return;
  }

  let itemsHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    itemsHTML += `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p class="cart-item-price">Rs. ${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-quantity">
          <button class="decrease-quantity">-</button>
          <span>${item.quantity}</span>
          <button class="increase-quantity">+</button>
        </div>
        <button class="cart-item-remove">&times;</button>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = itemsHTML;
  document.getElementById('subtotal').textContent = `Rs. ${subtotal.toFixed(2)}`;
  document.getElementById('total').textContent = `Rs. ${subtotal.toFixed(2)}`;
  cartSummary.style.display = 'block';

  // Add event listeners
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', increaseQuantity);
  });

  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', decreaseQuantity);
  });

  document.querySelectorAll('.cart-item-remove').forEach(button => {
    button.addEventListener('click', removeItem);
  });
}

// Increase quantity
function increaseQuantity(event) {
  const itemId = event.target.closest('.cart-item').dataset.id;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const item = cart.find(i => i.id === itemId);
  if (item) {
    item.quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
  }
}

// Decrease quantity
function decreaseQuantity(event) {
  const itemId = event.target.closest('.cart-item').dataset.id;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const item = cart.find(i => i.id === itemId);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart = cart.filter(i => i.id !== itemId);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
  }
}

// Remove item
function removeItem(event) {
  const itemId = event.target.closest('.cart-item').dataset.id;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart = cart.filter(item => item.id !== itemId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  updateCartCount();
  showNotification('Item removed from cart');
}

// Show toast notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}
