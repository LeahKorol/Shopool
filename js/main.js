import { getCategoryList, getCategoryProducts, getDefaultProducts, searchProducts } from '../js/api.js';

async function showAllCategories() {
    try {
        const categories = await getCategoryList();

        const headerCategoriesList = document.getElementById('header-categories-list');
        const mobileCategoriesList = document.getElementById('mobile-categories-list');

        [headerCategoriesList, mobileCategoriesList].forEach(list => {
            list.innerHTML = '';
            categories.forEach(category => {
                const categoryItem = document.createElement('a');
                categoryItem.href = '#';
                categoryItem.textContent = category;
                categoryItem.addEventListener('click', (event) => {
                    event.preventDefault();
                    showCategoryProducts(category);
                    closeDropdown();
                });
                list.appendChild(categoryItem);
            });
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

document.addEventListener('DOMContentLoaded', function () {
    const mobileSearchIcon = document.querySelector('.mobile-search-icon');
    const searchContainer = document.querySelector('.search-container');
    const categoriesButton = document.querySelector('.categories-container .dropbtn');
    const mobileCategoriesIcon = document.querySelector('.mobile-categories-container .dropbtn');
    const mobileCategoriesContent = document.querySelector('.mobile-categories-container .dropdown-content');

    mobileSearchIcon.addEventListener('click', function () {
        searchContainer.classList.toggle('active');
    });

    categoriesButton?.addEventListener('click', async function (event) {
        event.preventDefault();
        await showAllCategories();
        toggleDropdown();
    });

    mobileCategoriesIcon?.addEventListener('click', async function (event) {
        event.preventDefault();
        await showAllCategories();
        mobileCategoriesContent.classList.toggle('active');
    });
});

function closeDropdown() {
    const headerCategoriesList = document.getElementById('header-categories-list');
    const mobileCategoriesList = document.getElementById('mobile-categories-list');
    headerCategoriesList.classList.remove('active');
    mobileCategoriesList.classList.remove('active');
}

function toggleDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.classList.toggle('active');
}

async function showCategoryProducts(categoryName) {
    try {
        const products = await getCategoryProducts(categoryName);
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
    document.querySelector('.search-input').value = '';
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = './html/product-details.html';
}

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

function displayProducts(productsByCategory) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    for (const category in productsByCategory) {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitleCon = document.createElement('div');
        categoryTitleCon.classList.add('category-title-container');

        const categoryTitle = document.createElement('h2');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = category;
        categoryTitleCon.appendChild(categoryTitle);

        categoryContainer.appendChild(categoryTitleCon);

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

document.addEventListener("DOMContentLoaded", function () {
    const socialIcons = {
        facebook: document.getElementById("facebook-icon"),
        instagram: document.getElementById("instagram-icon"),
        twitter: document.getElementById("twitter-icon"),
        tiktok: document.getElementById("tiktok-icon")
    };

    Object.entries(socialIcons).forEach(([platform, icon]) => {
        icon.addEventListener("mouseover", () => {
            icon.src = icon.getAttribute("data-src");
        });

        icon.addEventListener("mouseout", () => {
            icon.src = `../images/community-icons/${platform}-black.png`;
        });
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

    searchInput.addEventListener('input', () => {
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
    updateCartBadge();

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

    function resetCart() {
        localStorage.setItem('cartItemCount', 0);
        updateCartBadge();
    }
    
});

