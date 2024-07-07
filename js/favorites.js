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
                    <button class="favorite-btn" onclick="removeFromFavorites(${product.id})">Remove</button>
                    <button class="cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;

            productElement.addEventListener('click', function (event) {
                if (!event.target.classList.contains('favorite-btn') && !event.target.classList.contains('cart-btn')) {
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
    };

    window.addToCart = function (productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const product = favorites.find(product => product.id === productId);
        
        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Product added to cart!');
        }
    };

    renderFavorites();
});

function toggleFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const productIndex = favorites.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        favorites.splice(productIndex, 1); 
    } else {
        const product = getProductById(productId); 
        if (product) {
            favorites.push(product); 
        }
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}