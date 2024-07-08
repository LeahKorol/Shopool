document.addEventListener('DOMContentLoaded', function () {
    function renderFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoritesGrid = document.getElementById('favorites-grid');
        favoritesGrid.innerHTML = '';

        favorites.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('favorite-item');
            productElement.innerHTML = `
                <img src="${product.thumbnail}" alt="Product Thumbnail">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <div class="buttons">
                    <button class="favorite-btn" onclick="removeFromFavorites(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            `;

            productElement.addEventListener('click', function (event) {
                if (!event.target.closest('.buttons')) {
                    localStorage.setItem('selectedProduct', JSON.stringify(product));
                    window.location.href = './product-details.html';
                }
            });

            favoritesGrid.appendChild(productElement);
        });
    }

    window.removeFromFavorites = function (productId) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(product => product.id !== productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
        showToast('Product removed from favorites');
    };

    window.addToCart = function (productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const product = favorites.find(product => product.id === productId);

        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            favorites = favorites.filter(p => p.id !== productId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
            showToast('Product added to cart');
        }
    };

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

    renderFavorites();
});