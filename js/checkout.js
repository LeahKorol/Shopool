let subtotalElement;
let totalElement;
let subtotal = 0;
let discount = 0;

document.addEventListener('DOMContentLoaded', function () {
    subtotalElement = document.getElementById('subtotal');
    totalElement = document.getElementById('final-total');

    const couponButton = document.getElementById('apply-coupon');
    const couponInput = document.getElementById('coupon-code');
    const couponMessage = document.getElementById('coupon-message');

    const shippingSection = document.getElementById('shipping-section');
    const paymentSection = document.getElementById('payment-section');
    const reviewSection = document.getElementById('review-section');
    const toPaymentBtn = document.getElementById('to-payment-btn');
    const toReviewBtn = document.getElementById('to-review-btn');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const progressBar = document.getElementById('checkout-progress');
    const cvvInput = document.getElementById('cvv');


    shippingSection.style.display = 'block';
    paymentSection.style.display = 'none';
    reviewSection.style.display = 'none';
    updateProgress(1);


    displayCheckoutItems();


    toPaymentBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (validateShippingForm()) {
            shippingSection.style.display = 'none';
            paymentSection.style.display = 'block';
            updateProgress(2);
        }
    });

    toReviewBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (validatePaymentForm()) {
            paymentSection.style.display = 'none';
            reviewSection.style.display = 'block';
            updateOrderReview();
            updateProgress(3);
        }
    });

    placeOrderBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (validatePaymentForm()) {
            saveBill(); // save the bill in the localStorage
            updateProgress(4);

            // Show the toast
            const toast = document.getElementById("toast");
            toast.className = "toast show";

            // After 3 seconds, hide the toast and redirect
            setTimeout(() => {
                toast.className = toast.className.replace("show", "");
                setTimeout(() => {
                    window.location.href = 'bill.html';
                }, 500); // Wait an additional 500ms for the toast to fade out
            }, 3000);
        }
    });



    couponButton.addEventListener('click', function () {
        const couponCode = couponInput.value.trim().toUpperCase();
        if (couponCode === 'DISCOUNT10') {
            discount = subtotal * 0.1; // 10% הנחה
            couponMessage.textContent = 'Coupon applied successfully!';
            couponMessage.style.color = 'green';
        } else if (couponCode === 'DISCOUNT20') {
            discount = subtotal * 0.2; // 20% הנחה
            couponMessage.textContent = 'Coupon applied successfully!';
            couponMessage.style.color = 'green';
        } else {
            discount = 0;
            couponMessage.textContent = 'Invalid coupon code.';
            couponMessage.style.color = 'red';
        }
        updateTotals();
    });


    const zipCodeMask = IMask(document.getElementById('zip-code'), {
        mask: '0000000'
    });

    const cardNumberMask = IMask(document.getElementById('card-number'), {
        mask: '0000 0000 0000 0000'
    });

    const cvvMask = IMask(cvvInput, {
        mask: '000'
    });

    function validateShippingForm() {
        const fullName = document.getElementById('full-name').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const zipCode = document.getElementById('zip-code').value.trim();
        const country = document.getElementById('country').value.trim();

        if (!fullName || !address || !city || !zipCode || !country) {
            alert('Please fill in all shipping details.');
            return false;
        }

        if (fullName.length < 2) {
            alert('Full name should be at least 2 characters long.');
            return false;
        }

        if (zipCode.length !== 7) {
            alert('Please enter a valid zip code (7 digits).');
            return false;
        }

        return true;
    }

    function validatePaymentForm() {
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = cvvMask.unmaskedValue;

        if (!cardNumber || !expiryDate || !cvv) {
            alert('Please fill in all payment details.');
            return false;
        }

        if (cardNumber.length !== 16) {
            alert('Please enter a valid 16-digit card number.');
            return false;
        }

        const now = new Date();
        const expiry = new Date(expiryDate);
        if (expiry < now) {
            alert('The card expiration date is invalid.');
            return false;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            alert('Please enter a valid CVV (3 or 4 digits).');
            return false;
        }

        return true;
    }

    // function isValidCreditCard(number) {
    //     let sum = 0;
    //     let isEven = false;
    //     for (let i = number.length - 1; i >= 0; i--) {
    //         let digit = parseInt(number.charAt(i), 10);
    //         if (isEven) {
    //             digit *= 2;
    //             if (digit > 9) {
    //                 digit -= 9;
    //             }
    //         }
    //         sum += digit;
    //         isEven = !isEven;
    //     }
    //     return (sum % 10) == 0;
    // }

    function validateAllForms() {
        return validateShippingForm() && validatePaymentForm();
    }

    function updateProgress(step) {
        const steps = progressBar.getElementsByTagName('li');
        for (let i = 0; i < steps.length; i++) {
            if (i < step - 1) {
                steps[i].classList.add('completed');
                steps[i].classList.remove('active');
            } else if (i === step - 1) {
                steps[i].classList.add('active');
                steps[i].classList.remove('completed');
            } else {
                steps[i].classList.remove('active', 'completed');
            }
        }
    }

    function updateOrderReview() {
        let reviewHtml = '';

        // Shipping Details
        reviewHtml += `
        <div class="review-section">
            <div class="review-icon"><i class="fas fa-truck-fast"></i></div>
            <div class="review-details">
                <h3>Shipping Details</h3>
                <p><strong>Name:</strong> ${document.getElementById('full-name').value}</p>
                <p><strong>Address:</strong> ${document.getElementById('address').value}, ${document.getElementById('city').value}, ${document.getElementById('country').value}, ${document.getElementById('zip-code').value}</p>
                <p class="free-shipping"><strong>Free Shipping</strong></p>
            </div>
        </div>
    `;

        // Payment Details
        reviewHtml += `
        <div class="review-section">
            <div class="review-icon"><i class="fas fa-credit-card"></i></div>
            <div class="review-details">
                <h3>Payment Details</h3>
                <p><strong>Card Number:</strong> ${document.getElementById('card-number').value}</p>
                <p><strong>Expiry Date:</strong> ${document.getElementById('expiry-date').value}</p>
            </div>
        </div>
    `;

        document.getElementById('order-review-summary').innerHTML = reviewHtml;
    }


    function saveBill() {
        const deleteCart = localStorage.getItem('delete-cart') === 'true';
        const items = deleteCart ? JSON.parse(localStorage.getItem('cart')) || [] : [JSON.parse(localStorage.getItem('selectedProduct'))];
        const billData = {
            shipping: {
                fullName: document.getElementById('full-name').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                zipCode: document.getElementById('zip-code').value,
                country: document.getElementById('country').value
            },
            payment: {
                cardNumber: document.getElementById('card-number').value.slice(-4),
                expiryDate: document.getElementById('expiry-date').value
            },
            subtotal: subtotal,
            discount: discount,
            total: totalElement.textContent,
            items: items
        };

        localStorage.setItem('billData', JSON.stringify(billData));
    }
});

function displayCheckoutItems() {
    const deleteCart = localStorage.getItem('delete-cart') === 'true';
    const items = deleteCart ? JSON.parse(localStorage.getItem('cart')) || [] : [JSON.parse(localStorage.getItem('selectedProduct'))];
    const orderSummary = document.getElementById('order-summary');

    orderSummary.innerHTML = '';
    subtotal = 0;

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('checkout-item');
        itemElement.innerHTML = `
        <div class="item-image">
            <img src="${item.thumbnail}" alt="${item.title}">
        </div>
        <div class="item-details">
            <p>${item.title}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
        </div>
        <div class="item-total">
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
    `;
        orderSummary.appendChild(itemElement);

        subtotal += item.price * item.quantity;
    });

    updateTotals();
}


document.addEventListener('DOMContentLoaded', displayCheckoutItems);


function updateTotals() {
    const allDiscountElements = document.querySelectorAll('.discount');
    const allTotalElements = document.querySelectorAll('.final-total');

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (discount > 0) {
        document.querySelector('.payment-summary-discount').style.display = 'flex';
        allDiscountElements.forEach(function (element) {
            element.textContent = `-$${discount.toFixed(2)}`;
        });
    } else {
        document.querySelector('.payment-summary-discount').style.display = 'none';
    }
    const finalTotal = subtotal - discount;
    allTotalElements.forEach(function (element) {
        element.textContent = `$${finalTotal.toFixed(2)}`;
    });
}