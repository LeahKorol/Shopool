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
    const decreaseQuantityButton = document.getElementById('decrease-quantity');
    const increaseQuantityButton = document.getElementById('increase-quantity');
    const minOrderInfoElement = document.getElementById('min-order-info');


    thumbnailElement.src = product.thumbnail;

    const imagesHTML = product.images.map(image => `<img src="${image}" alt="Product Image">`).join('');
    imagesElement.innerHTML = imagesHTML;

    productTitleElement.innerHTML = product.title;

    const ratingStars = parseFloat(product.rating);
    const fullStars = Math.floor(ratingStars);
    const decimalPart = ratingStars - fullStars;

    let ratingStarsHTML = '';

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            ratingStarsHTML += `<span class="star filled">&#9733;</span>`;
        } 
        else if (i === fullStars + 1 && decimalPart > 0) {
            // Calculate the percentage of the last star to fill
            const percentage = 100-Math.round(decimalPart * 100);
            ratingStarsHTML += `<span class="star" style="position: relative;">`;
            ratingStarsHTML += `<span class="star filled secondary-star" style="clip-path: inset(0 ${percentage}% 0 0);">&#9733;</span>`;
            ratingStarsHTML += `&#9733;</span>`;
        } 
        else {
            ratingStarsHTML += `<span class="star">&#9733;</span>`;
        }
    }

    ratingElement.innerHTML = ratingStarsHTML;
    
    const ratingDiv = document.getElementById('rating');
    const ratingTooltipText = `${product.rating} stars`; 

    ratingDiv.classList.add('tooltip');
    ratingDiv.innerHTML += `<span class="tooltiptext">${ratingTooltipText}</span>`;


    stockInfoElement.innerHTML = product.stock <= 5 ? `Only ${product.stock} items left in stock` : 'In Stock';
    stockInfoElement.style.color = product.stock <= 5 ? 'red' : 'green';

    priceElement.innerHTML = `$${product.price}`;
    descriptionElement.innerHTML = product.description;

    let minOrderQuantity = product.minOrderQuantity || 1; 
    let maxQuantity = product.stock; 

    if (minOrderQuantity > 1) {
        minOrderInfoElement.style.display = 'block';
        minOrderInfoElement.innerHTML = `Minimum order quantity: ${minOrderQuantity}`;
    }

    if (quantityElement.innerHTML < minOrderQuantity) {
        quantityElement.innerHTML = minOrderQuantity;
    } else if (quantityElement.innerHTML > maxQuantity) {
        quantityElement.innerHTML = maxQuantity;
    }


    decreaseQuantityButton.addEventListener('click', function() {
        if (quantityElement.innerHTML > minOrderQuantity) {
            quantityElement.innerHTML--;
        }
    });

    increaseQuantityButton.addEventListener('click', function() {
        if (quantityElement.innerHTML < maxQuantity) {
            quantityElement.innerHTML++;
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