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
                    <button class="eye-btn">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            `;

            const viewDetailsBtn = productElement.querySelector('.eye-btn');
            viewDetailsBtn.addEventListener('click', () => {
                showProductDetails(product);
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

    window.showProductDetails = function (product) {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = './product-details.html';
    
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