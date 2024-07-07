document.addEventListener('DOMContentLoaded', () => {

    const invoiceNumber = Math.floor(Math.random() * 1000000);
    const today = new Date();

    const customer = {
        name: 'John Doe',
        address: '67890 Street Name, City, State, ZIP'
    };

    const items = JSON.parse(localStorage.getItem('bill')) || [];

    const creditCardNumber = '**** **** **** ' + Math.floor(1000 + Math.random() * 9000);

    // Format date
    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    // Insert data into HTML
    document.getElementById('invoice-number').innerText = invoiceNumber;
    document.getElementById('invoice-date').innerText = formatDate(today);

    document.getElementById('customer-name').innerText = customer.name;
    document.getElementById('customer-address').innerText = customer.address;
    document.getElementById('credit-card-number').innerText = creditCardNumber;

    const itemsList = document.getElementById('items-list');
    let totalPrice = 0;
    items.forEach(item => {
        totalPrice += item.price * item.quantity;
        const itemRow = document.createElement('tr');
        itemRow.className = 'item';
        itemRow.innerHTML = `<td>${item.title}  ${item.sku}</td><td>${item.quantity}</td><td>$${(item.price * item.quantity).toFixed(2)}</td>`;
        itemsList.appendChild(itemRow);
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);

    document.querySelector('.print-button').addEventListener('click', () => {
        window.print();
    });
});

