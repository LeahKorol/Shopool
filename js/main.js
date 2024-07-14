import { getCategoryList, getCategoryProducts, getDefaultProducts, searchProducts } from '../js/api.js';

async function showAllCategories() {
    try {
        const categories = await getCategoryList();

        const headerCategoriesList = document.getElementById('header-categories-list');
        headerCategoriesList.innerHTML = '';
        categories.forEach(category => {
            const categoryItem = document.createElement('a');
            categoryItem.href = '#'; // Set the href as needed
            categoryItem.textContent = category;
            categoryItem.addEventListener('click', (event) => {
                event.preventDefault();
                showCategoryProducts(category);
                closeDropdown();
            });
            headerCategoriesList.appendChild(categoryItem);
        });

        const footerCategoriesList = document.getElementById('footer-categories-list');
        footerCategoriesList.innerHTML = '';
        categories.forEach(category => {
            const categoryItem = document.createElement('li');
            const categoryLink = document.createElement('a');
            categoryLink.href = '#';
            categoryLink.textContent = category;
            categoryItem.addEventListener('click', (event) => {
                event.preventDefault();
                showCategoryProducts(category);
                closeDropdown();
            });
            categoryItem.appendChild(categoryLink);
            footerCategoriesList.appendChild(categoryItem);
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Function to close the dropdown list
function closeDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content');
    if (dropdownContent) {
        dropdownContent.style.display = 'none';
    }
}

// Function to toggle the dropdown list
function toggleDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content');
    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
    } else {
        dropdownContent.style.display = 'block';
    }
}

// Event listener to show/hide dropdown content
document.addEventListener('DOMContentLoaded', function () {
    const dropbtn = document.querySelector('.dropbtn');
    dropbtn.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleDropdown();
    });

    // Close dropdown if clicked outside of it
    document.addEventListener('click', function (event) {
        const dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent && !dropdownContent.contains(event.target) && !event.target.matches('.dropbtn')) {
            dropdownContent.style.display = 'none';
        }
    });
});

// Function to show products based on selected category
async function showCategoryProducts(categoryName) {
    try {
        const products = await getCategoryProducts(categoryName);
        // Create an object `result` with the categoryName as key and products as value
        const result = {};
        result[categoryName] = products;
        displayProducts(result);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    scrollToProducts();
}

function scrollToProducts() {
    const productList = document.querySelector('#product-list');
    const scrollPosition = productList.offsetTop;

    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
}

function showProductDetails(product) {
    document.querySelector('.search-input').value = ''; ////delete searching filter so user returns to regular page

    localStorage.setItem('selectedProduct', JSON.stringify(product)); // Store the product object in localStorage
    window.location.href = './product-details.html'; // Redirect to product-details page
}

// Function to show default products if no category is chosen
async function showDefaultProducts() {
    try {
        const defaultProducts = await getDefaultProducts();
        if (defaultProducts) {
            displayProducts(defaultProducts);
        } else {
            console.log('Failed to fetch default products.');
        }
    } catch (error) {
        console.error('Error fetching default products:', error);
    }
}

/**
 * Displays products categorized by their respective categories on the UI.
 * @param {Object} productsByCategory - Object containing products categorized by their respective categories.
 *                                      Example: { 'Electronics': [{ product1 }, { product2 }], 'Clothing': [{ product3 }] }
 */
function displayProducts(productsByCategory) {

    const productList = document.getElementById('product-list');

    productList.innerHTML = ''; // Clear previous content

    for (const category in productsByCategory) {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const cateroryTitleCon = document.createElement('div');
        cateroryTitleCon.classList.add('category-title-container');

        const categoryTitle = document.createElement('h2');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = category;
        cateroryTitleCon.appendChild(categoryTitle);

        categoryContainer.appendChild(cateroryTitleCon);

        const productsContainer = document.createElement('div');
        productsContainer.classList.add('products-container');

        productsByCategory[category].forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
                <h3>${product.title}</h3>
                <img src="${product.thumbnail}" alt="product #${product.id} image" />
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating}</p>
                <button class="view-details-btn">View Details</button>
            `;
            // Add click event listener to each product item's button
            const viewDetailsBtn = productItem.querySelector('.view-details-btn');
            viewDetailsBtn.addEventListener('click', () => {
                showProductDetails(product);
            });
            productsContainer.appendChild(productItem);
        });
        categoryContainer.appendChild(productsContainer);
        productList.appendChild(categoryContainer);
    }
    if (!document.querySelector('.product-item')) {
        const categoryContainer = document.createElement('div');
        categoryContainer.innerHTML += `<p>No results for "${Object.keys(productsByCategory)}"</p>`;
        productList.appendChild(categoryContainer);
    }
}

// carousel - of hot sales
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const hotSales = document.querySelector(".hot-sales");

    function adjustLayout() {
        const headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        hotSales.style.height = `calc(100vh - ${headerHeight}px)`;
        main.style.marginTop = `calc(${headerHeight}px)`;
    }

    window.addEventListener("resize", adjustLayout);
    adjustLayout();

    const carousel = document.querySelector(".carousel");
    let index = 0;
    const slides = document.querySelectorAll(".carousel-item");
    const totalSlides = slides.length;

    setInterval(() => {
        index++;
        if (index === totalSlides) {
            index = 1;
            carousel.style.transition = "none";
            carousel.style.transform = `translateX(0)`;
            setTimeout(() => {
                carousel.style.transition = "transform 1s ease";
                carousel.style.transform = `translateX(-${index * 100}vw)`;
            }, 20);
        } else {
            carousel.style.transform = `translateX(-${index * 100}vw)`;
        }
    }, 5000);
});


// icons transform
document.addEventListener("DOMContentLoaded", function () {
    const facebookIcon = document.getElementById("facebook-icon");
    const instagramIcon = document.getElementById("instagram-icon");
    const twitterIcon = document.getElementById("twitter-icon");
    const tiktokIcon = document.getElementById("tiktok-icon");

    // Event listeners for hover effect
    facebookIcon.addEventListener("mouseover", function () {
        facebookIcon.src = facebookIcon.getAttribute("data-src");
    });

    facebookIcon.addEventListener("mouseout", function () {
        facebookIcon.src = "../images/community-icons/facebook-black.png";
    });

    instagramIcon.addEventListener("mouseover", function () {
        instagramIcon.src = instagramIcon.getAttribute("data-src");
    });

    instagramIcon.addEventListener("mouseout", function () {
        instagramIcon.src = "../images/community-icons/instagram-black.png";
    });

    twitterIcon.addEventListener("mouseover", function () {
        twitterIcon.src = twitterIcon.getAttribute("data-src");
    });

    twitterIcon.addEventListener("mouseout", function () {
        twitterIcon.src = "../images/community-icons/twitter-black.png";
    });

    tiktokIcon.addEventListener("mouseover", function() {
        tiktokIcon.src = tiktokIcon.getAttribute("data-src");
    });

    tiktokIcon.addEventListener("mouseout", function() {
        tiktokIcon.src = "../images/community-icons/tiktok-black.png";
    });
});

function handleSearch() {
    const searchContainer = document.querySelector('.search-container');
    const searchSymbol = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input')

    searchContainer.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    searchSymbol.addEventListener('click', () => {
        performSearch();
    });

    searchInput.addEventListener('input', () => { //return default products if user cleared search field
        const query = searchInput.value.trim();
        if (!query)
            showDefaultProducts();
        else
            console.log('Query:', query);
    });

    const performSearch = () => {
        const query = searchInput.value.trim();
        updateContainer(query);
    };

    async function updateContainer(query) {
        if (query) {
            const products = await searchProducts(query);
            // Create an object `result` with the query as key and products as value
            const result = {}
            result[query] = products;
            displayProducts(result);
            scrollToProducts();
        }
        else {
            showDefaultProducts();
        }
    }
}


// loading for load the api
document.addEventListener("DOMContentLoaded", function () {
    function hideLoading() {
        const loadingElement = document.getElementById('loading');
        loadingElement.style.opacity = 0;
        setTimeout(() => {
            loadingElement.style.display = 'none';
            startExistingAnimations();
        }, 500);
    }

    function simulateApiLoading() {
        return new Promise((resolve) => {
            setTimeout(resolve, 3000);
        });
    }

    function startExistingAnimations() {
        const elementsToShow = document.querySelectorAll('header, main, footer');
        elementsToShow.forEach(el => {
            el.classList.remove('hidden');
        });

        const mainElement = document.querySelector('main');
        mainElement.classList.add('animations-start');

        const welcomeAnimation = document.querySelector('.welcome-animation');
        welcomeAnimation.style.opacity = 1;
    }

    simulateApiLoading().then(hideLoading);
});



// change the size of product title
document.addEventListener("DOMContentLoaded", function () {
    var productTitles = document.querySelectorAll('.product-item h3');

    productTitles.forEach(function (title) {
        let fontSize = 16;
        while (title.scrollWidth > title.clientWidth && fontSize > 10) {
            fontSize -= 1;
            title.style.fontSize = fontSize + 'px';
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    showAllCategories();
    showDefaultProducts();
    handleSearch();
    closeDropdown();

    function getCartItemCount() {
        return parseInt(localStorage.getItem('cartItemCount')) || 0;
    }

    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartBadge = document.querySelector('.cart-badge');
        cartBadge.textContent = itemCount;
    }

    function addToCart(count = 1) {
        const currentCount = getCartItemCount();
        localStorage.setItem('cartItemCount', currentCount + count);
        updateCartBadge();
    }

    function removeFromCart(count = 1) {
        let currentCount = getCartItemCount();
        currentCount = Math.max(currentCount - count, 0);
        localStorage.setItem('cartItemCount', currentCount);
        updateCartBadge();
    }

    // reset the cart when we finish an order
    function resetCart() {
        localStorage.setItem('cartItemCount', 0);
        updateCartBadge();
    }
    
});

updateCartBadge();