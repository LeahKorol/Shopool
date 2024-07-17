document.getElementById('card-number').addEventListener('input', function (e) {
    var value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) {
        value = value.slice(0, 16);
    }
    var formattedValue = '';
    for (var i = 0; i < value.length; i += 4) {
        if (i > 0) {
            formattedValue += '-';
        }
        formattedValue += value.substring(i, i + 4);
    }
    e.target.value = formattedValue;
});

// Load order summary from localStorage
const orderSummary = document.getElementById('order-summary');
const products = JSON.parse(localStorage.getItem('cart')) || [];
const orderTotal = document.getElementById('order-total');
let total = 0;

if (products.length === 0) {
    orderSummary.innerHTML = '<p>Your cart is empty.</p>';
} else {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('order-product');
        productDiv.innerHTML = `
            <div class="order-product-details">
                <h4>${product.title}</h4>
                <p>$${product.price} x ${product.quantity}</p>
            </div>
        `;
        orderSummary.appendChild(productDiv);
        total += product.price * product.quantity;
    });
    orderTotal.textContent = `$${total.toFixed(2)}`;
}

// Apply coupon logic
const applyCouponBtn = document.getElementById('apply-coupon');
applyCouponBtn.addEventListener('click', function () {
    const coupon = document.getElementById('coupon').value;
    let discount = 0;
    
    if (coupon === "WELCOME") {
        discount = total * 0.10;
    } else {
        alert('Invalid coupon code');
        return;
    }

    total -= discount;
    orderTotal.textContent = `$${total.toFixed(2)}`;
    alert(`Coupon applied! You saved $${discount.toFixed(2)}`);
});

document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault();

    saveBill();

    localStorage.removeItem('cart'); // Remove cart after payment
    window.location.href = 'bill.html'; // Go to bill page
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
        name: document.querySelector('#email').value,
        street: document.querySelector('#street-address').value,
        city: document.querySelector('#city').value,
        state: document.querySelector('#state').value,
        creditCardLastFour: document.querySelector('#card-number').value.slice(-4)
    };

    localStorage.setItem('bill', JSON.stringify(bill));
    localStorage.setItem('payingDetails', JSON.stringify(payingDetails));
}