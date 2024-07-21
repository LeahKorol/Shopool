document.addEventListener('DOMContentLoaded', function () {
    // function renderFavorites() {
    //     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    //     const favoritesGrid = document.getElementById('favorites-grid');
    //     favoritesGrid.innerHTML = '';

    //     if (favorites.length === 0) {
    //         // Create a message element for empty favorites
    //         const emptyMessage = document.createElement('div');
    //         emptyMessage.classList.add('empty-favorites-message');
    //         emptyMessage.innerHTML = `
    //             <p>Your favorites list is empty.</p>
    //             <p>Add some products to your favorites!</p>
    //         `;
    //         favoritesGrid.appendChild(emptyMessage);
    //     } else {
    //         favorites.forEach(product => {
    //             const productElement = document.createElement('div');
    //             productElement.classList.add('favorite-item');
    //             productElement.innerHTML = `
    //                 <img src="${product.thumbnail}" alt="Product Thumbnail">
    //                 <h3>${product.title}</h3>
    //                 <p>Price: $${product.price}</p>
    //                 <div class="buttons">
    //                     <button class="favorite-btn" onclick="removeFromFavorites(${product.id})">
    //                         <i class="fas fa-trash"></i>
    //                     </button>
    //                     <button class="cart-btn" onclick="showQuantityModal(${product.id})">
    //                         <i class="fas fa-shopping-cart"></i>
    //                     </button>
    //                 </div>
    //             `;

    //             productElement.addEventListener('click', function (event) {
    //                 if (!event.target.closest('.buttons')) {
    //                     localStorage.setItem('selectedProduct', JSON.stringify(product));
    //                     window.location.href = './product-details.html';
    //                 }
    //             });

    //             favoritesGrid.appendChild(productElement);
    //         });
    //     }
    // }

    // window.removeFromFavorites = function (productId) {
    //     let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    //     favorites = favorites.filter(product => product.id !== productId);
    //     localStorage.setItem('favorites', JSON.stringify(favorites));
    //     renderFavorites();
    //     showToast('Product removed from favorites');
    // };

    window.showQuantityModal = function (productId) {
        const modalPlaceholder = document.getElementById('modal-placeholder');
        modalPlaceholder.innerHTML = `
            <div class="quantity-modal">
                <div class="modal-content">
                    <h2>Enter Quantity</h2>
                    <input type="number" id="quantity-input" min="1" value="1">
                    <div class="modal-buttons">
                        <button id="confirm-button">Confirm</button>
                        <button id="cancel-button">Cancel</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('confirm-button').addEventListener('click', function () {
            const quantity = parseInt(document.getElementById('quantity-input').value, 10);
            if (quantity > 0) {
                addToCart(productId, quantity);
            }
            modalPlaceholder.innerHTML = '';
        });

        document.getElementById('cancel-button').addEventListener('click', function () {
            modalPlaceholder.innerHTML = '';
        });
    };

    // window.addToCart = function (productId, quantity) {
    //     let cart = JSON.parse(localStorage.getItem('cart')) || [];
    //     let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    //     const product = favorites.find(product => product.id === productId);

    //     if (product) {
    //         product.quantity = quantity;
    //         cart.push(product);
    //         localStorage.setItem('cart', JSON.stringify(cart));
    //         favorites = favorites.filter(p => p.id !== productId);
    //         localStorage.setItem('favorites', JSON.stringify(favorites));
    //         renderFavorites();
    //         showToast('Product added to cart');
    //     }
    // };

    function showToast(message) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        document.body.appendChild(toast);

        // Force a reflow
        toast.offsetHeight;

        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }


    document.addEventListener('DOMContentLoaded', function () {
        document.body.addEventListener('click', function (event) {
            if (event.target && event.target.id === 'edit-profile') {
                window.location.href = '#settings';
            }
        });

        // renderFavorites();
    });


    renderOrders();
    // renderFavorites();



    function renderOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const orderList = document.querySelector('.order-list');
        orderList.innerHTML = '';
        orderList.classList.add('orders-grid');
    
        if (orders.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.classList.add('empty-orders-message');
            emptyMessage.innerHTML = `
                <p>You have no orders yet.</p>
                <p>Start shopping now to make your first order!</p>
                <a href="./shop.html" class="start-shopping-btn">Start Shopping</a>
            `;
            orderList.appendChild(emptyMessage);
        } else {
            orders.forEach(order => {
                const orderDate = new Date(order.date);
                const currentDate = new Date();
                const daysSinceOrder = Math.floor((currentDate - orderDate) / (1000 * 60 * 60 * 24));
    
                if (daysSinceOrder >= 3 && order.status === 'Pending') {
                    order.status = 'Sent';
                }
    
                const orderElement = document.createElement('div');
                orderElement.classList.add('order-item');
                orderElement.innerHTML = `
                    <h3>Order #${order.id}</h3>
                    <p><strong>Date:</strong> ${order.date}</p>
                    <p><strong>Status:</strong> <span class="order-status">${order.status}</span></p>
                    <p><strong>Total:</strong> ${order.total}</p>
                    <button class="view-details-btn" data-order-id="${order.id}">View Details</button>
                    ${order.status !== 'Received' ? `<button class="receive-order-btn" data-order-id="${order.id}">Mark as Received</button>` : ''}
                `;
    
                if (order.status === 'Received') {
                    orderElement.style.opacity = '0.5';
                }
    
                orderList.appendChild(orderElement);
            });
    
            document.querySelectorAll('.view-details-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const orderId = this.getAttribute('data-order-id');
                    showOrderDetails(orderId);
                });
            });
    
            document.querySelectorAll('.receive-order-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const orderId = this.getAttribute('data-order-id');
                    markOrderAsReceived(orderId);
                });
            });
        }
    }
    

    function markOrderAsReceived(orderId) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        const orderIndex = orders.findIndex(o => o.id.toString() === orderId);

        if (orderIndex !== -1) {
            orders[orderIndex].status = 'Received';
            localStorage.setItem('orders', JSON.stringify(orders));
            renderOrders();
        }
    }

    function showOrderDetails(orderId) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const order = orders.find(o => o.id.toString() === orderId);

        if (order) {
            const total = parseFloat(order.total);
            const formattedTotal = isNaN(total) ? 'N/A' : `$${total.toFixed(2)}`;

            const modalPlaceholder = document.getElementById('modal-placeholder');
            modalPlaceholder.innerHTML = `
            <div class="order-details-modal">
                <div class="modal-content">
                    <h2>Order Details</h2>
                    <div class="order-info">
                        <p><strong>Order ID:</strong> ${order.id}</p>
                        <p><strong>Date:</strong> ${order.date}</p>
                        <p><strong>Status:</strong> <span class="status-${order.status.toLowerCase()}">${order.status}</span></p>
                    </div>
                    <div id="order-items"></div>
                    <div class="order-summary">
                        ${order.subtotal ? `<p><strong>Subtotal:</strong> ${formatCurrency(order.subtotal)}</p>` : ''}
                        ${order.discount ? `<p><strong>Discount:</strong> -${formatCurrency(order.discount)}</p>` : ''}
                        <p><strong>Total:</strong> ${order.total}</p>
                    </div>
                    ${order.shipping ? `
                        <div class="shipping-details">
                            <h3>Shipping Details</h3>
                            <p>${order.shipping.fullName || ''}</p>
                            <p>${order.shipping.address || ''}</p>
                            <p>${order.shipping.city || ''}, ${order.shipping.zipCode || ''}</p>
                            <p>${order.shipping.country || ''}</p>
                        </div>
                    ` : ''}
                    ${order.payment ? `
                        <div class="payment-details">
                            <h3>Payment Details</h3>
                            <p>Card ending in ${order.payment.cardNumber || ''}</p>
                            <p>Expiry: ${order.payment.expiryDate || ''}</p>
                        </div>
                    ` : ''}
                    <button id="close-modal-btn">Close</button>
                </div>
            </div>
        `;

            const orderItemsContainer = document.getElementById('order-items');
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('order-item-detail');
                    itemElement.innerHTML = `
                    <img src="${item.thumbnail || ''}" alt="${item.title || 'Product'}">
                    <div class="item-info">
                        <h4>${item.title || 'Unknown Product'}</h4>
                        <p>Quantity: ${item.quantity || ''}</p>
                        <p>Price: $${item.price ? item.price.toFixed(2) : ''}</p>
                    </div>
                `;
                    orderItemsContainer.appendChild(itemElement);
                });
            } else {
                orderItemsContainer.innerHTML = '<p>No items found for this order.</p>';
            }

            document.getElementById('close-modal-btn').addEventListener('click', function () {
                modalPlaceholder.innerHTML = '';
            });

            modalPlaceholder.addEventListener('click', function (event) {
                if (event.target === modalPlaceholder) {
                    modalPlaceholder.innerHTML = '';
                }
            });
        } else {
            alert("Order details not found. Please try again later.");
        }
    }



    function updateUserProfile(userData) {
        const currentProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        const updatedProfile = { ...currentProfile, ...userData };
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        updateHeaderProfile();
        updateProfileSection();
    }

    function updateHeaderProfile() {
        const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        const headerProfileElement = document.querySelector('.header-profile');
        if (headerProfileElement) {
            headerProfileElement.innerHTML = `
            <img src="${userProfile.avatar || '../images/user-picture.png'}" alt="Profile Picture" class="profile-picture">
            <span class="username">${userProfile.name || 'Guest'}</span>
        `;
        }
    }

    function updateProfileSection() {
        const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        const profileSection = document.querySelector('#profile .profile-details');
        if (profileSection) {
            profileSection.innerHTML = `
            <p><strong>Name: </strong>${userProfile.name || 'N/A'}</p>
            <p><strong>E-mail: </strong>${userProfile.email || 'N/A'}</p>
            <p><strong>Phone: </strong>${userProfile.phone || 'N/A'}</p>
        `;
        }

        const profileImage = document.querySelector('#profile .profile-image img');
        if (profileImage) {
            profileImage.src = userProfile.avatar || '../images/user-picture.png';
        }

        const sidebarProfile = document.querySelector('.sidebar .profile');
        if (sidebarProfile) {
            sidebarProfile.innerHTML = `
            <img src="${userProfile.avatar || '../images/user-picture.png'}" alt="User Avatar">
            <h2>Hello, ${userProfile.name || 'Guest'}</h2>
        `;
        }
    }


    const editForm = document.getElementById('edit-profile-form');
    const avatarInput = document.getElementById('edit-avatar');
    const avatarPreview = document.getElementById('avatar-preview');

    if (avatarInput) {
        avatarInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    avatarPreview.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }

    if (editForm) {
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('edit-name').value;
            const email = document.getElementById('edit-email').value;
            const phone = document.getElementById('edit-phone').value;
            const avatar = avatarPreview.src;

            // Validate email
            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address');
                return;
            }

            // Validate phone number
            if (!isValidPhone(phone)) {
                showToast('Please enter a valid phone number');
                return;
            }

            const userData = {
                name: name,
                email: email,
                phone: phone,
                avatar: avatar
            };

            updateUserProfile(userData);
            showToast('Profile updated successfully');
        });
    }


    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    if (document.getElementById('edit-name')) {
        document.getElementById('edit-name').value = userProfile.name || '';
    }
    if (document.getElementById('edit-email')) {
        document.getElementById('edit-email').value = userProfile.email || '';
    }
    if (document.getElementById('edit-phone')) {
        document.getElementById('edit-phone').value = userProfile.phone || '';
    }
    if (avatarPreview) {
        avatarPreview.src = userProfile.avatar || '../images/user-picture.png';
    }

    updateHeaderProfile();
    updateProfileSection();



    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    }


    function showToast(message) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        }, 100);
    }

});