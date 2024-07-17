document.addEventListener('DOMContentLoaded', function () {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (!product || !product.price || isNaN(parseFloat(product.price))) {
        console.error('Invalid product data');
        return;
    }

    // Update the title of the page like the product title
    document.title = `Shopool | ${product.title}`;

    function getCartItemCount() {
        return parseInt(localStorage.getItem('cartItemCount'), 10) || 0;
    }

    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartBadge = document.querySelector('.cart-badge');
        cartBadge.textContent = itemCount;
    }


    function updateCartDropdown() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="item-details">
                    <div class="item-name">${item.title}</div>
                    <div class="item-quantity">Quantity: ${item.quantity}</div>
                    <div class="item-price">Price: $${item.price}</div>
                </div>
            `;

            cartItem.addEventListener('click', () => {
                window.location.href = `product.html?id=${item.id}`;
            });
            cartItemsContainer.appendChild(cartItem);
        });
    }

    function addToCart(product, requestedQuantity) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cart.findIndex(item => item.id === product.id);

        // Update quantity if product is already in cart
        if (index !== -1) {
            const currentQuantity = cart[index].quantity;
            const newQuantity = currentQuantity + requestedQuantity;
            if (newQuantity > product.stock) {
                if (currentQuantity < product.stock) {
                    alert(`Sorry, only ${product.stock - currentQuantity} more units available.`);
                } else {
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
        updateProductDetails();
        updateCartBadge();
        updateCartDropdown();
        showCartDropdown();
    }

    function showCartDropdown() {
        const cartDropdown = document.querySelector('.cart-dropdown');
        cartDropdown.style.display = 'block';
    }

    function hideCartDropdown() {
        const cartDropdown = document.querySelector('.cart-dropdown');
        cartDropdown.style.display = 'none';
    }

    function handleCartDropdownClick(event) {
        if (!event.target.classList.contains('close-dropdown')) {
            window.location.href = 'cart.html';
        }
    }

    function removeFromCart(count = 1) {
        let currentCount = getCartItemCount();
        currentCount = Math.max(currentCount - count, 0);
        localStorage.setItem('cartItemCount', currentCount);
        updateCartBadge();
    }

    // reset the cart when we finish an order
    function resetCart() {
        localStorage.setItem('cartItemCount', 0);
        updateCartBadge();
    }

    document.querySelector('.close-dropdown').addEventListener('click', hideCartDropdown);

    document.querySelector('.cart-dropdown').addEventListener('click', handleCartDropdownClick);

    updateCartBadge();
    updateCartDropdown();

    function createRatingDisplay() {
        const overallRatingElement = document.getElementById('overallRating');
        if (!overallRatingElement) {
            return;
        }

        const averageRating = product.rating;

        const ratingDisplay = document.createElement('div');
        ratingDisplay.className = 'rating-display';

        const ratingNumber = document.createElement('div');
        ratingNumber.className = 'rating-number';
        ratingNumber.textContent = averageRating.toFixed(2);
        ratingDisplay.appendChild(ratingNumber);

        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = i <= averageRating ? 'star filled' : 'star';
            star.innerHTML = '&#9733;';
            starsContainer.appendChild(star);
        }
        ratingDisplay.appendChild(starsContainer);

        const verificationText = document.createElement('div');
        verificationText.className = 'verification-text';
        let descriptionText, textColor;

        if (averageRating >= 0 && averageRating <= 1.5) {
            descriptionText = 'Poor';
            textColor = 'red';
        } else if (averageRating > 1.5 && averageRating <= 2.5) {
            descriptionText = 'Almost Good';
            textColor = 'orange';
        } else if (averageRating > 2.5 && averageRating <= 3.5) {
            descriptionText = 'Good';
            textColor = 'yellow';
        } else if (averageRating > 3.5 && averageRating <= 4.5) {
            descriptionText = 'Very Good';
            textColor = 'yellowgreen';
        } else {
            descriptionText = 'Excellent';
            textColor = 'green';
        }

        verificationText.textContent = `${descriptionText}`;
        verificationText.style.color = textColor;
        ratingDisplay.appendChild(verificationText);

        overallRatingElement.appendChild(ratingDisplay);
    }

    function createRatingChart() {
        const ratingCounts = [0, 0, 0, 0, 0];
        const chartElement = document.getElementById('ratingChart');

        if (!chartElement) {
            console.error('Rating chart element not found');
            return;
        }

        // Count ratings
        product.reviews.forEach(review => {
            ratingCounts[review.rating - 1]++;
        });

        const totalRatings = ratingCounts.reduce((sum, count) => sum + count, 0);
        const averageRating = product.rating;

        const ratingDisplay = document.createElement('div');
        ratingDisplay.className = 'rating-display';

        chartElement.appendChild(ratingDisplay);

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


    createRatingDisplay();
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
    const reviewsCounter = document.getElementById('reviews-counter');
    const reviewsListElement = document.getElementById('reviews-list');


    thumbnailElement.src = product.thumbnail;

    const popup = document.getElementById('image-popup');
    const popupImg = document.getElementById('popup-img');
    const close = document.getElementsByClassName('close')[0];

    thumbnailElement.addEventListener('click', function () {
        popup.style.display = 'block';
        popupImg.src = thumbnailElement.src;
    });

    close.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    const imagesHTML = product.images.map(image => `<img src="${image}" alt="Product Image">`).join('');
    imagesElement.innerHTML = imagesHTML;

    document.querySelectorAll('#images img').forEach(function (imageElement) {
        imageElement.addEventListener('click', function () {
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


    priceElement.innerHTML = `$${product.price}`;
    descriptionElement.innerHTML = product.description;

    let maxQuantity, minOrderQuantity;
    function updateProductDetails() {
        minOrderQuantity = 1;

        if (product.stock < minOrderQuantity) {
            minOrderQuantity = product.stock;
        }

        maxQuantity = product.stock;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cart.findIndex(item => item.id === product.id);
        if (index != -1) {
            maxQuantity -= cart[index].quantity;
        }

        stockInfoElement.innerHTML = maxQuantity <= 5 ? `Only ${maxQuantity} items left in stock` : 'In Stock';
        stockInfoElement.style.color = maxQuantity <= 5 ? 'red' : 'green';

        if (maxQuantity == 0) {
            const productDetailsButtons = document.querySelectorAll("#right-section button");

            productDetailsButtons.forEach(button => {
                button.disabled = true;
                button.classList.add("disabled");
            });
            stockInfoElement.innerHTML = 'Not In Stock';
            stockInfoElement.style.color = 'red';
        }

        quantityElement.innerHTML = minOrderQuantity;
        if (quantityElement.innerHTML > maxQuantity) {
            quantityElement.innerHTML = maxQuantity;
        }
    }
    updateProductDetails();

    decreaseQuantityButton.addEventListener('click', function () {
        if (quantityElement.innerHTML > minOrderQuantity) {
            quantityElement.innerHTML--;
        }
        updateStockWhileClicking();
    });

    increaseQuantityButton.addEventListener('click', function () {
        if (quantityElement.innerHTML < maxQuantity) {
            quantityElement.innerHTML++;
        }
        if (quantityElement.innerHTML < maxQuantity) {
            updateStockWhileClicking();
        }
        else{
            stockInfoElement.innerHTML = 'There are no more items in stock';
            stockInfoElement.style.color = 'red';
        }
    });

    const updateStockWhileClicking = () => {
        const requestedQuantity = quantityElement.innerHTML;
        stockInfoElement.innerHTML = maxQuantity <= 5 ? `Only ${maxQuantity - requestedQuantity} items left in stock` : 'In Stock';
        stockInfoElement.style.color = maxQuantity <= 5 ? 'red' : 'green';
    }

    document.getElementById('buy-now').addEventListener('click', function () {
        const quantity = parseInt(document.querySelector('#quantity').textContent, 10) || 0;
        const totalPrice = parseFloat(product.price) * quantity;
        alert(`You have purchased ${quantity} units of ${product.title} for a total of $${totalPrice.toFixed(2)}`);
    });


    document.getElementById('add-to-cart').addEventListener('click', function () {
        const requestedQuantity = parseInt(document.querySelector('#quantity').textContent);
        addToCart(product, requestedQuantity);
    
        this.classList.add('clicked');
    
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 3500); 
    });
    


    // wishlist
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const heartIcon = addToWishlistButton.querySelector('i');

    function isFavorite(productId) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.some(fav => fav.id === productId);
    }

    function toggleFavorite(product) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.findIndex(fav => fav.id === product.id);

        if (index === -1) {
            favorites.push(product);
            heartIcon.style.color = 'var(--primary-color)';
            showToast('Product added to favorites');
        } else {
            favorites.splice(index, 1);
            heartIcon.style.color = 'white';
            showToast('Product removed from favorites');
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateWishlistButton();
    }

    function updateWishlistButton() {
        if (isFavorite(product.id)) {
            heartIcon.style.color = 'var(--primary-color)';
        } else {
            heartIcon.style.color = 'white';
        }
    }

    addToWishlistButton.addEventListener('click', function () {
        toggleFavorite(product);
    });

    updateWishlistButton();

    const moreProductInfoHTML = `
        <div id="box" class="dimenssion"> 
            <i class="fas fa-info-circle"></i>
            <div class="info">
                <h3>Product Detail</h3>
                <span>
                    height: ${product.dimensions.height}, width: ${product.dimensions.width}
                </span>
            </div>
        </div>

        <div id="box" class="return-policy"> 
            <i class="fas fa-undo-alt"></i>
            <div class="info">
                <h3>Return Policy</h3>
                <span>${product.returnPolicy}</span>
            </div>
        </div>

        <div id="box" class="shipping"> 
            <i class="fas fa-shipping-fast"></i>
            <div class="info">
                <h3>Shipping Information</h3>
                <span>${product.shippingInformation}</span>
            </div>
        </div>

        <div id="box" class="warranty"> 
            <i class="fas fa-shield-alt"></i>
            <div class="info">
                <h3>Warranty Information</h3>
                <span>${product.warrantyInformation}</span>
            </div>
        </div>
    `;

    moreProductInformation.innerHTML = moreProductInfoHTML;


    reviewsCounter.innerHTML = `${product.reviews.length} reviews`;

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


        console.log(product);
    });
});


function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);

    toast.offsetHeight;

    toast.style.opacity = '1';

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}