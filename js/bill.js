document.addEventListener('DOMContentLoaded', () => {
    displayInvoiceDetails()
    loadBillData();
    setupPrintButton();
});

function loadBillData() {
    const billData = JSON.parse(localStorage.getItem('billData'));
    if (billData) {
        displayCustomerInfo(billData.shipping);
        displayCreditCardInfo(billData.payment);
        displayBillItems(billData.items);
        displayTotalPrice(billData.total);
        displayDiscount(billData.subtotal, billData.discount);

        // Clear the data after loading
        localStorage.removeItem('billData');

        let deleteCart = localStorage.getItem('delete-cart');
        if (deleteCart === 'true') {
            localStorage.removeItem('cart');
        }

    } else {
        console.error('No bill data found');
    }
}

function setupPrintButton() {
    document.querySelector('.print-button').addEventListener('click', () => {
        window.print();
    });
}

function displayCustomerInfo(shipping) {
    document.getElementById('customer-name').textContent = shipping.fullName || '';
    document.getElementById('customer-address').textContent = `${shipping.address || ''}, ${shipping.city || ''}, ${shipping.zipCode || ''}, ${shipping.country || ''}`;
}

function displayCreditCardInfo(payment) {
    document.getElementById('credit-card-number').textContent = `**** **** **** ${payment.cardNumber || ''}`;
}

function displayBillItems(items) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';
    items.forEach(item => {
        const itemRow = document.createElement('tr');
        itemRow.className = 'item';
        itemRow.innerHTML = `
            <td>${item.title} ${item.sku}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        itemsList.appendChild(itemRow);
    });
}

function displayTotalPrice(total) {
    document.getElementById('total-price').textContent = total;
}

function displayDiscount(subtotal, discount){
    if (discount > 0) {
        const subtotalRow = document.getElementById('subtotal-row');
        const discountRow = document.getElementById('discount-row');
        
        document.getElementById('subtotal-price').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('discount-price').textContent = `$${discount.toFixed(2)}`;
        
        // Show rows
        subtotalRow.style.display = '';
        discountRow.style.display = '';
    }
}

//utility functions
function generateInvoiceNumber() {
    return Math.floor(Math.random() * 1000000);
}

function formatDate() {
    const today = new Date();
    return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
}

// Insert data into HTML
function displayInvoiceDetails() {
    document.getElementById('invoice-number').innerText = generateInvoiceNumber();
    document.getElementById('invoice-date').innerText = formatDate();
}