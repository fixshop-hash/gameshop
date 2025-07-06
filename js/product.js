// Product page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        loadProduct(productId);
    } else {
        // Redirect to shop if no product ID
        window.location.href = 'shop.html';
    }
});

function loadProduct(productId) {
    // In a real app, this would fetch from an API
    // For demo, we'll use a simple switch case
    let product;
    
    switch(productId) {
        case '1':
            product = {
                id: '1',
                name: 'Premium Headphones',
                price: 99.99,
                image: 'https://picsum.photos/600/600?random=1',
                description: 'Experience crystal-clear sound with our premium headphones. Featuring noise cancellation technology, these headphones provide an immersive audio experience whether you\'re listening to music, watching movies, or making calls. The ergonomic design ensures comfort during extended use, and the long battery life means you can enjoy your audio all day.',
                category: 'electronics'
            };
            break;
        case '2':
            product = {
                id: '2',
                name: 'Wireless Keyboard',
                price: 49.99,
                image: 'https://picsum.photos/600/600?random=2',
                description: 'Our wireless keyboard offers a comfortable typing experience with responsive keys and ergonomic design. Connect via Bluetooth to your computer, tablet, or smartphone and enjoy the freedom of wireless technology. The long battery life ensures you won\'t need to charge frequently, and the compact design makes it perfect for travel.',
                category: 'electronics'
            };
            break;
        case '3':
            product = {
                id: '3',
                name: 'Smart Watch',
                price: 199.99,
                image: 'https://picsum.photos/600/600?random=3',
                description: 'Stay connected and track your fitness with our advanced smart watch. Monitor your heart rate, count your steps, track your sleep, and receive notifications from your smartphone. The sleek design looks great with any outfit, and the customizable watch faces let you personalize your experience. Water-resistant for swimming and showering.',
                category: 'electronics'
            };
            break;
        case '4':
            product = {
                id: '4',
                name: 'Cotton T-Shirt',
                price: 24.99,
                image: 'https://picsum.photos/600/600?random=4',
                description: 'Made from 100% organic cotton, this t-shirt is soft, breathable, and comfortable for all-day wear. The classic fit works for any body type, and the reinforced stitching ensures durability wash after wash. Available in multiple colors to suit your style. Perfect for casual outings or layering under jackets.',
                category: 'clothing'
            };
            break;
        case '5':
            product = {
                id: '5',
                name: 'Ceramic Mug',
                price: 14.99,
                image: 'https://picsum.photos/600/600?random=5',
                description: 'Handcrafted ceramic mug with a beautiful glaze finish. The perfect size for your morning coffee or tea, holding 12oz of your favorite beverage. Microwave and dishwasher safe for convenience. The comfortable handle makes it easy to hold, and the sturdy base prevents spills. A great addition to your kitchen collection.',
                category: 'home'
            };
            break;
        case '6':
            product = {
                id: '6',
                name: 'Desk Lamp',
                price: 34.99,
                image: 'https://picsum.photos/600/600?random=6',
                description: 'Illuminate your workspace with our adjustable desk lamp. Features multiple brightness levels and color temperatures to reduce eye strain. The flexible neck allows you to direct light exactly where you need it. Energy-efficient LED bulbs last for years and provide consistent, flicker-free light. USB charging port included for your devices.',
                category: 'home'
            };
            break;
        default:
            // Redirect to 404 if product not found
            window.location.href = '404.html';
            return;
    }
    
    displayProduct(product);
}

function displayProduct(product) {
    const productContainer = document.getElementById('product-container');
    
    productContainer.innerHTML = `
        <div class="product-image-large">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info-detail">
            <h1>${product.name}</h1>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p class="description">${product.description}</p>
            <button class="btn add-to-cart" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-image="${product.image}">
                Add to Cart
            </button>
        </div>
    `;
    
    
    // Add event listener to the Add to Cart button
    const addToCartButton = document.querySelector('.product-info-detail .add-to-cart');
    addToCartButton.addEventListener('click', addToCart);
}
