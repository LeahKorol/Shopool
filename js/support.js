document.addEventListener('DOMContentLoaded', function() {
    const supportForm = document.getElementById('support-form');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('close-popup');

    supportForm.addEventListener('submit', function(e) {
        e.preventDefault();

        console.log('Support request submitted:');
        console.log('Name:', supportForm.name.value);
        console.log('Email:', supportForm.email.value);
        console.log('Order Number:', supportForm['order-number'].value);
        console.log('Subject:', supportForm.subject.value);
        console.log('Message:', supportForm.message.value);

        popup.style.display = 'flex';

        supportForm.reset();
    });

    closePopup.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});
