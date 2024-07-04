document.addEventListener('DOMContentLoaded', function () {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));


    function createRatingChart() {
        const ratingCounts = [0, 0, 0, 0, 0];
        const chartElement = document.getElementById('ratingChart');
        
        // Count ratings
        product.reviews.forEach(review => {
            ratingCounts[review.rating - 1]++;
        });

        const totalRatings = ratingCounts.reduce((sum, count) => sum + count, 0);

        // Create and append chart rows
        for (let i = 5; i >= 1; i--) {
            const row = document.createElement('div');
            row.className = 'rating-row';

            const stars = document.createElement('div');
            stars.className = 'stars';
            stars.textContent = '★'.repeat(i) + '☆'.repeat(5 - i);

            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';

            const bar = document.createElement('div');
            bar.className = 'bar';
            const percentage = (ratingCounts[i - 1] / totalRatings) * 100;
            bar.style.width = `${percentage}%`;

            const count = document.createElement('div');
            count.className = 'count';
            count.textContent = ratingCounts[i - 1];

            barContainer.appendChild(bar);
            row.appendChild(stars);
            row.appendChild(barContainer);
            row.appendChild(count);

            chartElement.appendChild(row);
        }
    }

    // Call createRatingChart after loading product data
    createRatingChart();

    const thumbnailElement = document.getElementById('thumbnail');
    const imagesElement = document.getElementById('images');
    const productTitleElement = document.getElementById('product-title');
    const ratingElement = document.getElementById('rating');
    const productSkuElement = document.getElementById('sku');
    const stockInfoElement = document.getElementById('stock-info');
    const priceElement = document.getElementById('price');
    const descriptionElement = document.getElementById('description');
    const quantityElement = document.getElementById('quantity');
    const decreaseQuantityButton = document.getElementById('decrease-quantity');
    const increaseQuantityButton = document.getElementById('increase-quantity');
    const minOrderInfoElement = document.getElementById('min-order-info');
    const addToWishlistButton = document.getElementById('add-to-wishlist');
    const moreProductInformation = document.getElementById('more-product-info');
    const dimenssionContainer = document.getElementById('dimenssion-container');
    const shippingInfo = document.getElementById('shipping-info');
    const returnPolicy = document.getElementById('return-policy');
    const warrantyInformation = document.getElementById('warranty-information');
    const reviewsListElement = document.getElementById('reviews-list');
    


    thumbnailElement.src = product.thumbnail;

    const popup = document.getElementById('image-popup');
    const popupImg = document.getElementById('popup-img');
    const close = document.getElementsByClassName('close')[0];

    thumbnailElement.addEventListener('click', function() {
        popup.style.display = 'block';
        popupImg.src = thumbnailElement.src;
    });

    close.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    const imagesHTML = product.images.map(image => `<img src="${image}" alt="Product Image">`).join('');
    imagesElement.innerHTML = imagesHTML;

    document.querySelectorAll('#images img').forEach(function(imageElement) {
        imageElement.addEventListener('click', function() {
            thumbnailElement.src = imageElement.src;
        });
    });

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
            const percentage = 100 - Math.round(decimalPart * 100);
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


    productSkuElement.innerHTML = `SKU: ${product.sku}`;


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


    decreaseQuantityButton.addEventListener('click', function () {
        if (quantityElement.innerHTML > minOrderQuantity) {
            quantityElement.innerHTML--;
        }
    });

    increaseQuantityButton.addEventListener('click', function () {
        if (quantityElement.innerHTML < maxQuantity) {
            quantityElement.innerHTML++;
        }
    });

    document.getElementById('buy-now').addEventListener('click', function () {
        alert(`You have purchased ${quantity} units of ${product.title} for a total of $${(product.price * quantity).toFixed(2)}`);
    });

    document.getElementById('add-to-cart').addEventListener('click', function () {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const requestedQuantity = parseInt(document.querySelector('#quantity').textContent);
        console.log(document.querySelector('#quantity').textContent);

        const index = cart.findIndex(item => item.id === product.id);
        // Update quantity if product is already in cart
        if (index !== -1) {
            const currentQuantity = cart[index].quantity;
            const newQuantity = currentQuantity + requestedQuantity;
            if (newQuantity > product.stock) {
                if(currentQuantity<product.stock){
                    alert(`Sorry, only ${product.stock - currentQuantity} more units available.`);
                }else{
                    alert('Sorry, product is out of stock');
                }
            
                cart[index].quantity = product.stock; 
            } else {
                cart[index].quantity = newQuantity;
            }
        } else {
            product.quantity = requestedQuantity;
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(JSON.stringify(cart));
    });


    addToWishlistButton.addEventListener('click', function () {
        addToWishlistButton.classList.toggle('active');

        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const index = wishlist.findIndex(item => item.id === product.id);

        if (addToWishlistButton.classList.contains('active')) {
            if (index === -1) {
                wishlist.push(product);
                alert(`${product.title} added to wishlist`);
            }
        } else {
            if (index !== -1) {
                wishlist.splice(index, 1);
                alert(`${product.title} removed from wishlist`);
            }
        }

        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        console.log(localStorage);
    });



    moreProductInformation.innerHTML = '';





    reviewsListElement.innerHTML = '';

    const ratingsCount = [0, 0, 0, 0, 0];

    product.reviews.forEach(review => {
        ratingsCount[review.rating - 1]++;

        const reviewContainer = document.createElement('div');
        reviewContainer.classList.add('review-container');

        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        let starsHTML = '';
        for (let i = 0; i < review.rating; i++) {
            starsHTML += '&#9733;';
        }

        const reviewDate = new Date(review.date).toLocaleDateString();

        reviewElement.innerHTML = `
            <div class="review-top">
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <div class="date">${reviewDate}</div>
            </div>
            <p class="review-comment">${review.comment}</p>
            <div class="review-bottom">
                <img class="avatar" src="../images/user-picture.png" alt="User Icon">
                <div>
                    <h4>${review.reviewerName}</h4>
                    <p class="reviewer-description">${review.reviewerEmail}</p>
                </div>
            </div>
        `;

        reviewContainer.appendChild(reviewElement);
        reviewsListElement.appendChild(reviewContainer);

        const reviewComment = reviewElement.querySelector('.review-comment');

        if (reviewComment.scrollHeight > reviewComment.clientHeight) {
            const readMoreLink = document.createElement('span');
            readMoreLink.classList.add('read-more');
            readMoreLink.textContent = 'read more';

            readMoreLink.addEventListener('click', function () {
                if (reviewComment.style.webkitLineClamp === 'unset') {
                    reviewComment.style.webkitLineClamp = '3';
                    readMoreLink.textContent = 'read more';
                } else {
                    reviewComment.style.webkitLineClamp = 'unset';
                    reviewComment.style.overflow = 'visible';
                    reviewComment.style.textOverflow = 'clip';
                    readMoreLink.textContent = 'hide';
                }
            });

            reviewElement.appendChild(readMoreLink);
        }
    
    });


    console.log(product);

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