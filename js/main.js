document.addEventListener('DOMContentLoaded', function () {
    setupMobileMenu();
    updateCartCount();
    loadProducts();
    loadFeaturedProducts();
    setupCategoryFilter();
});

// ================================
// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function () {
            nav.classList.toggle('active');
        });
    }
}



// ================================
// Load All Products for shop.html
async function loadProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '<p>Loading products...</p>';

    try {
        const response = await fetch('js/products.json');
        const products = await response.json();

        if (!products || products.length === 0) {
            productsGrid.innerHTML = '<p>No products found.</p>';
            return;
        }

        let html = '';

        products.forEach(product => {
            html += createProductCardHTML(product);
        });

        productsGrid.innerHTML = html;

        setupAddToCartButtons('.products-grid .add-to-cart');

    } catch (error) {
        productsGrid.innerHTML = `<p>Error loading products: ${error.message}</p>`;
    }
}

// ================================
// Load Featured Products for homepage
async function loadFeaturedProducts() {
    const featuredGrid = document.querySelector('.featured-products-grid');
    if (!featuredGrid) return;

    try {
        const response = await fetch('js/products.json');
        const products = await response.json();

        const randomProducts = getRandomItems(products, 3);

        randomProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = createProductCardHTML(product);
            featuredGrid.appendChild(card);
        });

        setupAddToCartButtons('.featured-products-grid .add-to-cart');

    } catch (err) {
        console.error('Error loading featured products:', err);
    }
}

// ================================
// Helper: Product card HTML
function createProductCardHTML(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="btn add-to-cart" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-image="${product.image}">Add to Cart</button>
            </div>
        </div>
    `;
}

// ================================
// Add to Cart buttons handler
function setupAddToCartButtons(selector = '.add-to-cart') {
    const buttons = document.querySelectorAll(selector);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const image = button.dataset.image;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingIndex = cart.findIndex(item => item.id === id);
            if (existingIndex !== -1) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push({ id, name, price, image, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showNotification(`${name} added to cart!`);
        });
    });
}

// ================================
// Cart Count Update (header icon)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => el.textContent = total);
}

// ================================
// Toast Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ================================
// Category Filtering
function setupCategoryFilter() {
    const categorySelect = document.getElementById('category-select');
    if (!categorySelect) return;

    categorySelect.addEventListener('change', function () {
        const selectedCategory = this.value;
        const allProducts = document.querySelectorAll('.product-card');

        allProducts.forEach(product => {
            const matches = selectedCategory === 'all' || product.dataset.category === selectedCategory;
            product.style.display = matches ? 'block' : 'none';
        });
    });
}

// ================================
// Randomizer Helper
function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
