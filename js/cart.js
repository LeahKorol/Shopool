document.addEventListener('DOMContentLoaded', function () {

    function rendercart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        console.log(cart);

        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';

        let sum = 0;

        cart.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');

            productElement.innerHTML = `
                <div class="product-link">
                    <img id="thumbnail" src="${product.thumbnail}" alt="Product Thumbnail">
                    <h3>${product.title}</h3>
                </div>
                <p>Price: $${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <button class="delete-product-btn" onclick="deleteProduct(${product.id})">Delete</button>
            `;
            productsContainer.appendChild(productElement);

            productElement.querySelector('.product-link').addEventListener('click', function () {
                localStorage.setItem('selectedProduct', JSON.stringify(product));
                window.location.href = './product-details.html';
            });
            sum += product.price;
        });
        document.getElementById('total').textContent = sum;
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