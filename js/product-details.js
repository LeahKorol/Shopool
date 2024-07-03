document.addEventListener('DOMContentLoaded', function() {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    localStorage.removeItem('selectedProduct');

    const thumbnailElement = document.getElementById('thumbnail');
    const imagesElement = document.getElementById('images');
    const productTitleElement = document.getElementById('product-title');
    const ratingElement = document.getElementById('rating');
    const stockInfoElement = document.getElementById('stock-info');
    const priceElement = document.getElementById('price');
    const descriptionElement = document.getElementById('description');
    const quantityElement = document.getElementById('quantity');

    thumbnailElement.src = product.thumbnail;

    const imagesHTML = product.images.map(image => `<img src="${image}" alt="Product Image">`).join('');
    imagesElement.innerHTML = imagesHTML;

    productTitleElement.innerHTML = product.title;

    // Display rating stars
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    let ratingStarsHTML = '<span class="star filled">&#9733;</span>'.repeat(fullStars);
    if (hasHalfStar) {
        ratingStarsHTML += '<span class="star half">&#9733;</span>';
    }
    ratingStarsHTML += '<span class="star">&#9733;</span>'.repeat(emptyStars);
    ratingElement.innerHTML = ratingStarsHTML;

    stockInfoElement.innerHTML = product.stock <= 5 ? `Only ${product.stock} items left in stock` : 'In Stock';
    stockInfoElement.style.color = product.stock <= 5 ? 'red' : 'green';

    priceElement.innerHTML = `$${product.price}`;
    descriptionElement.innerHTML = product.description;

    let quantity = 1;

    document.getElementById('increase-quantity').addEventListener('click', function() {
        quantity++;
        quantityElement.innerHTML = quantity;
    });

    document.getElementById('decrease-quantity').addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityElement.innerHTML = quantity;
        }
    });

    document.getElementById('buy-now').addEventListener('click', function() {
        alert(`You have purchased ${quantity} units of ${product.title} for a total of $${(product.price * quantity).toFixed(2)}`);
    });

    document.getElementById('add-to-cart').addEventListener('click', function() {
        alert(`Added ${quantity} units of ${product.title} to cart`);
    });

    document.getElementById('add-to-wishlist').addEventListener('click', function() {
        alert(`${product.title} added to wishlist`);
    });
});