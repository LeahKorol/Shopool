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
                    <i class="fas fa-trash delete-product-icon" title="Delete" onclick="deleteProduct(${product.id})"></i>
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

    window.deleteProduct = function (productId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            rendercart();
        }
    }

    // Event listeners for opening and closing the form
    document.getElementById('checkout-btn').addEventListener('click', ()=>{
        document.getElementById('checkout-form').style.display = 'block';
    });
    document.getElementById('closeCheckoutForm').addEventListener('click', ()=>{
        document.getElementById('checkout-form').style.display = 'none';
    });

    // Initial render of the cart
    rendercart();

    document.getElementById('checkout-form').addEventListener('submit', function (event) {
        event.preventDefault();

        alert('Payment successful! Your products are on their way.');
        localStorage.removeItem('cart'); // Clear cart after payment
        rendercart(); // Update cart display
    });

});