document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productsContainer = document.getElementById('products-container');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const paymentMessage = document.getElementById('payment-message');


    // Function to render cart products
    function rendercart() {

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
        `;
            const deleteButton = createDeleteButton(product.id);
            productElement.appendChild(deleteButton);

            productsContainer.appendChild(productElement);

            productElement.querySelector('.product-link').addEventListener('click', function () {
                localStorage.setItem('selectedProduct', JSON.stringify(product));
                window.location.href = './product-details.html';
            });
            sum += product.price;
        });
        document.querySelector('#total').textContent = sum;
    }
    rendercart();


    function createDeleteButton(productId) {
        const button = document.createElement('button');
        button.className = 'delete-product-btn';
        button.textContent = 'Delete';

        button.addEventListener('click', function () {
            const productIndex = cart.findIndex(product => product.id === productId);
            if (productIndex !== -1) {
                cart.splice(productIndex, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                rendercart();
            }
        });
        return button;
    }


    // Event listener for checkout button
    checkoutBtn.addEventListener('click', function () {
        checkoutForm.style.display = 'block';
    });

    // // Close modal when clicking on the close button
    // modalClose.onclick = function () {
    //     modal.style.display = 'none';
    // };

    // // Close modal when clicking outside the modal content
    // window.onclick = function (event) {
    //     if (event.target == modal) {
    //         modal.style.display = 'none';
    //     }
    // };

    // // Event listener for checkout form submission
    // checkoutForm.addEventListener('submit', function (event) {
    //     event.preventDefault();
    //     const address = document.getElementById('delivery-address').value;
    //     const creditCard = document.getElementById('credit-card').value;

    //     paymentMessage.textContent = 'Payment successful! Your products are on their way.';
    //     localStorage.removeproduct('cart'); // Clear cart after successful payment (simulated)
    //     rendercart(); // Update cart display
    // });
});
