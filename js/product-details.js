document.addEventListener('DOMContentLoaded', function() {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    //localStorage.removeItem('selectedProduct');

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
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        // if(cart.lenght>0){

        // }
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Added ${quantity} units of ${product.title} to cart`);
    });

    document.getElementById('add-to-wishlist').addEventListener('click', function() {
        alert(`${product.title} added to wishlist`);
    });
});



// Set a flag in localStorage indicating the page was unloaded
window.addEventListener('beforeunload', (event) => {
    localStorage.setItem('isPageUnloading', 'true');
});

// Check the flag on page load to determine if the last action was a refresh or navigation away
window.addEventListener('load', (event) => {
    const isPageUnloading = localStorage.getItem('isPageUnloading') === 'true';
    
    // Reset the flag
    localStorage.setItem('isPageUnloading', 'false');
    
    if (isPageUnloading) {
        // The page was reloaded, not navigated away from
        console.log('Page was refreshed');
    } else {
        // The page was navigated away from
        console.log('User is navigating away from the page');
        localStorage.removeItem('selectedProduct');
    }
});



