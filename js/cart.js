document.addEventListener('DOMContentLoaded', function () {
    function rendercart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const emptyCartDiv = document.getElementById('empty-cart');
        const productsContainer = document.getElementById('products-container');


        if (cart.length === 0) {
            productsContainer.style.display = 'none';
            emptyCartDiv.style.display = 'flex';
            document.querySelector('.total-summary').style.display = 'none';
        }

        else {
            productsContainer.style.display = 'block';
            emptyCartDiv.style.display = 'none';
            document.querySelector('.total-summary').style.display = 'block';

            productsContainer.innerHTML = '';

            let sum = 0;

            cart.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-item-in-list');
                productElement.id = `product-${product.id}`;
                productElement.innerHTML = `
                    <div class="product-link">
                        <div class="choose-item">
                            <input type="checkbox" id="buy-now-${product.id}" name="buy-now" checked>
                        </div>
                        <img class="thumbnail" src="${product.thumbnail}" alt="Product Thumbnail">
                        <div class="product-details"> 
                            <h3 class="product-name">${product.title}</h3>
                            <p>Price: $${product.price}</p>
                            <p>
                                 <button id="decrease-quantity-${product.id}" class="quantity-btn">-</button>
                                 <span class="quantity" id="quantity-${product.id}">${product.quantity}</span>
                                 <button id="increase-quantity-${product.id}" class="quantity-btn">+</button>
                            </p>
                        </div>
                    </div>
                    
                    <div class="product-actions">
                        <i class="fas fa-heart add-to-favorites-icon" title="Add to Favorites" onclick="addToFavorites(${product.id})"></i>
                        <i class="fas fa-trash delete-product-icon" title="Delete" onclick="deleteProduct(${product.id})"></i>
                    </div>
                `;

                productsContainer.appendChild(productElement);

                productElement.querySelector('.product-link').addEventListener('click', function () {
                    localStorage.setItem('selectedProduct', JSON.stringify(product));
                    window.location.href = './product-details.html';
                });

                // Add event listeners to the quantity buttons to prevent event propagation
                productElement.querySelector(`#decrease-quantity-${product.id}`).addEventListener('click', function (e) {
                    e.stopPropagation();
                    decreaseQuantity(product.id);
                });

                productElement.querySelector(`#increase-quantity-${product.id}`).addEventListener('click', function (e) {
                    e.stopPropagation();
                    increaseQuantity(product.id);
                });

                sum += product.price * product.quantity || 0;
            });

            document.getElementById('total').textContent = '$' + sum.toFixed(2);
        }

    }

    window.addToFavorites = function (productId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const productIndex = cart.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            const product = cart[productIndex];

            cart.splice(productIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));

            // Add product to favorites if it's not already there
            if (!favorites.some(fav => fav.id === productId)) {
                favorites.push(product);
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }

            showToast('Product moved to favorites');

            rendercart();

            // Update favorites badge if it exists
            if (typeof updateFavoritesBadge === 'function') {
                updateFavoritesBadge();
            }
        }
    }

    window.deleteProduct = function (productId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            rendercart();
        }
    }

    document.getElementById('checkout-btn').addEventListener('click', function () {
        localStorage.setItem('delete-cart', 'true');
        window.location.href = 'checkout.html';
    });

    // Initial render of the cart
    rendercart();
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

function updateCart(productId, newQuantity, isAdding) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateTotalWithPrice(product.price, isAdding)
    }
}

function updateTotalWithPrice(price, isAdding) {
    // Get the current total price as a number
    let totalElement = document.getElementById('total');
    let currentTotalText = totalElement.textContent;
    let currentTotalPrice = parseFloat(currentTotalText.replace('$', ''));

    let newTotalPrice = isAdding ? currentTotalPrice + price : currentTotalPrice - price;
    totalElement.textContent = '$' + newTotalPrice.toFixed(2);  // Update the total in the document
}

function getProductFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    return cart.find(item => item.id === productId);
}

function decreaseQuantity(productId) {
    const productElement = document.getElementById(`product-${productId}`);
    const quantityElement = productElement.querySelector('.quantity');
    let currentQuantity = parseInt(quantityElement.innerHTML, 10);

    if (currentQuantity > 1) {
        currentQuantity -= 1;
        quantityElement.innerHTML = currentQuantity;
        updateCart(productId, currentQuantity, false);
    } else {
        const confirmation = confirm(`Are you sure you want to remove ${productElement.querySelector('.product-name').innerHTML}?`);
        if (confirmation) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            productElement.remove();
            renderCart();
        }
    }
}

function increaseQuantity(productId) {
    const productElement = document.getElementById(`product-${productId}`);
    const quantityElement = productElement.querySelector('.quantity');
    let currentQuantity = parseInt(quantityElement.innerHTML, 10);

    const product = getProductFromCart(productId);
    if (product) {
        const maxQuantity = product.stock;

        if (currentQuantity < maxQuantity) {
            currentQuantity += 1;
            quantityElement.innerHTML = currentQuantity;
            updateCart(productId, currentQuantity, true);
        } else {
            alert('There are no more products in stock.');
        }
    } else {
        console.error('Product not found in the cart.');
    }
}


document.getElementById('checkout-btn').addEventListener('click', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('checkoutItems', JSON.stringify(cart));
    window.location.href = 'checkout.html';
});