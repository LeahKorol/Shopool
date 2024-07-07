document.addEventListener('DOMContentLoaded', () => {
    initializeInvoice();
    displayCustomerInfo();
    displayBill();
    setupPrintButton();
});

// Initialization Functions
function initializeInvoice() {
    const invoiceNumber = generateInvoiceNumber();
    const today = new Date();
    displayInvoiceDetails(invoiceNumber, today);
}

function setupPrintButton() {
    document.querySelector('.print-button').addEventListener('click', () => {
        window.print();
    });
}

// Data Retrieval Functions
function getPayingDetails() {
    return JSON.parse(localStorage.getItem('payingDetails'));
}

function getBillDetails() {
    return JSON.parse(localStorage.getItem('bill')) || [];
}

// Display Functions
function displayCustomerInfo() {
    const payingDetails = getPayingDetails();
    if (payingDetails) {
        document.getElementById('customer-name').innerText = 'John Doe';
        document.getElementById('customer-address').innerText = `${payingDetails.street}, ${payingDetails.city}, ${payingDetails.state}`;
        document.getElementById('credit-card-number').innerText = `**** **** **** ${payingDetails.creditCardLastFour}`;
    }
}

function displayInvoiceDetails(invoiceNumber, date) {
    document.getElementById('invoice-number').innerText = invoiceNumber;
    document.getElementById('invoice-date').innerText = formatDate(date);
}

function displayBill() {
    const bill = getBillDetails();
    displayBillItems(bill);
    displayTotalPrice(bill);
}

function displayBillItems(bill) {
    const itemsList = document.getElementById('items-list');
    bill.forEach(item => {
        const itemRow = document.createElement('tr');
        itemRow.className = 'item';
        itemRow.innerHTML = `<td>${item.title} ${item.sku}</td><td>${item.quantity}</td><td>$${(item.price * item.quantity).toFixed(2)}</td>`;
        itemsList.appendChild(itemRow);
    });
}

function displayTotalPrice(bill) {
    const totalPrice = bill.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Utility Functions
function generateInvoiceNumber() {
    return Math.floor(Math.random() * 1000000);
}

function formatDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
