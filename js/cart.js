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
                productElement.innerHTML = `
                    <div class="product-link">
                        <div class="choose-item">
                            <input type="checkbox" id="buy-now-${product.id}" name="buy-now" checked>
                        </div>
                        <img class="thumbnail" src="${product.thumbnail}" alt="Product Thumbnail">
                        <div class="product-details"> 
                            <h3>${product.title}</h3>
                            <p>Price: $${product.price}</p>
                            <p>Quantity: ${product.quantity}</p>
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

    document.getElementById('checkout-btn').addEventListener('click', function() {
        window.location.href = 'checkout.html';
    });
    
    document.getElementById('checkout-form').addEventListener('submit', function (event) {
        event.preventDefault();
    
        saveBill();
        localStorage.removeItem('cart');    
        window.location.href = 'bill.html';
    });
    

    document.getElementById('closeCheckoutForm').addEventListener('click', () => {
        document.getElementById('checkout-form').style.display = 'none';
    });

    // Initial render of the cart
    rendercart();

    document.getElementById('checkout-form').addEventListener('submit', function (event) {
        event.preventDefault();

        saveBill();

        localStorage.removeItem('cart'); // Remove cart after payment
        window.location.href = 'bill.html'; //go to bill page
    });

    function saveBill() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Transform the cart items into a bill array
        const bill = cart.map(product => ({
            sku: product.sku,
            title: product.title,
            quantity: product.quantity,
            price: product.price
        }));

        const payingDetails = {
            name: document.querySelector('#customer-name').value,
            street: document.querySelector('#street-address').value,
            city: document.querySelector('#city').value,
            state: document.querySelector('#state').value,
            creditCardLastFour: document.querySelector('#credit-card').value.slice(-4)
        };

        localStorage.setItem('bill', JSON.stringify(bill));
        localStorage.setItem('payingDetails', JSON.stringify(payingDetails));
    }
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
