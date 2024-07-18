// document.addEventListener('DOMContentLoaded', () => {
//     loadBillData();
//     setupPrintButton();
// });

// function loadBillData() {
//     const billData = JSON.parse(localStorage.getItem('billData'));
//     if (billData) {
//         displayCustomerInfo(billData.shipping);
//         displayCreditCardInfo(billData.payment);
//         displayBillItems();
//         displayTotalPrice(billData.total);
//     }
// }

// function setupPrintButton() {
//     document.querySelector('.print-button').addEventListener('click', () => {
//         window.print();
//     });
// }

// function displayCustomerInfo(shipping) {
//     document.getElementById('customer-name').innerText = shipping.fullName || '';
//     document.getElementById('customer-address').innerText = `${shipping.address || ''}, ${shipping.city || ''}, ${shipping.country || ''}`;
// }

// function displayCreditCardInfo(payment) {
//     document.getElementById('credit-card-number').innerText = `**** **** **** ${payment.cardNumber || ''}`;
// }

// function displayBillItems() {
//     const billItems = JSON.parse(localStorage.getItem('billItems')) || [];
//     const itemsList = document.getElementById('items-list');
//     itemsList.innerHTML = '';
//     billItems.forEach(item => {
//         const itemRow = document.createElement('tr');
//         itemRow.className = 'item';
//         itemRow.innerHTML = `<td>${item.title} (${item.sku})</td><td>${item.quantity}</td><td>$${(item.price * item.quantity).toFixed(2)}</td>`;
//         itemsList.appendChild(itemRow);
//     });
// }

// function displayTotalPrice(total) {
//     document.getElementById('total-price').innerText = `${total}`;
// }



document.addEventListener('DOMContentLoaded', () => {
    loadBillData();
    setupPrintButton();
});

function loadBillData() {
    const billData = JSON.parse(localStorage.getItem('billData'));
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (billData && cart.length > 0) {
        displayCustomerInfo(billData.shipping);
        displayCreditCardInfo(billData.payment);
        displayBillItems(cart);
        displayTotalPrice(calculateTotal(cart));
    }
}

function setupPrintButton() {
    document.querySelector('.print-button').addEventListener('click', () => {
        window.print();
    });
}

function displayCustomerInfo(shipping) {
    document.getElementById('customer-name').innerText = shipping.fullName || '';
    document.getElementById('customer-address').innerText = `${shipping.address || ''}, ${shipping.city || ''}, ${shipping.country || ''}`;
}

function displayCreditCardInfo(payment) {
    document.getElementById('credit-card-number').innerText = `**** **** **** ${payment.cardNumber.slice(-4) || ''}`;
}

function displayBillItems(items) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';
    items.forEach(item => {
        const itemRow = document.createElement('tr');
        itemRow.className = 'item';
        itemRow.innerHTML = `
            <td>${item.title}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        itemsList.appendChild(itemRow);
    });
}

function calculateTotal(cart) {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function displayTotalPrice(total) {
    document.getElementById('total-price').innerText = total;
}
