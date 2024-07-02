import { getCategoryList, getCategoryProducts, getDefaultProducts} from './api.js';

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

// Function to show products based on selected category
async function showCategoryProducts(categoryName) {
    try {
        const products = await getCategoryProducts(categoryName);

        const productList = document.getElementById('product-list');
        if (!productList) {
            console.error('Product list element not found');
            return;
        }
        productList.innerHTML = ''; // Clear previous content

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            // Display important details of each product
            productItem.innerHTML = `
                <h3>${product.title}</h3>
                <img src="${product.thumbnail}" alt="product #${product.id} image" />
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating}</p>
                <p>Availability: ${product.stock}</p>
                <button class="view-details-btn">View Details</button>
            `;
            // Add click event listener to each product item's button
            const viewDetailsBtn = productItem.querySelector('.view-details-btn');
            viewDetailsBtn.addEventListener('click', () => {
                showProductDetails(product); 
            });
            productList.appendChild(productItem);
        });

        // Scroll to the product list
        productList.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function showProductDetails(product){
     localStorage.setItem('selectedProduct', JSON.stringify(product)); // Store the product object in localStorage
     window.location.href = './product-details.html'; // Redirect to product-details page
}

// Function to show default products if no category is chosen
async function showDefaultProducts() {
    try {
        const defaultProducts = await getDefaultProducts();
        if (defaultProducts) {
            displayDefaultProducts(defaultProducts);
        } else {
            console.log('Failed to fetch default products.');
        }
    } catch (error) {
        console.error('Error fetching default products:', error);
    }
}

// Function to display default products
function displayDefaultProducts(productsByCategory) {
    const productList = document.getElementById('product-list');
    if (!productList) {
        console.error('Product list element not found');
        return;
    }
    productList.innerHTML = ''; // Clear previous content

    for (const category in productsByCategory) {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `<h3>${category}</h3>`;
        productsByCategory[category].forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            // Display important details of each product
            productItem.innerHTML = `
                <h3>${product.title}</h3>
                <img src="${product.thumbnail}" alt="product #${product.id} image" />
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating}</p>
                <p>Availability: ${product.stock}</p>
                <button class="view-details-btn">View Details</button>
            `;
            // Add click event listener to each product item's button
            const viewDetailsBtn = productItem.querySelector('.view-details-btn');
            viewDetailsBtn.addEventListener('click', () => {
                showProductDetails(product); 
            });
            categoryDiv.appendChild(productItem);
        });
        productList.appendChild(categoryDiv);
    }
}


// carousel - of hot sales
document.addEventListener("DOMContentLoaded", function() {
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
document.addEventListener("DOMContentLoaded", function() {
    const facebookIcon = document.getElementById("facebook-icon");
    const instagramIcon = document.getElementById("instagram-icon");
    const twitterIcon = document.getElementById("twitter-icon");
    const tiktokIcon = document.getElementById("tiktok-icon");

    // Event listeners for hover effect
    facebookIcon.addEventListener("mouseover", function() {
        facebookIcon.src = facebookIcon.getAttribute("data-src");
    });

    facebookIcon.addEventListener("mouseout", function() {
        facebookIcon.src = "../images/community-icons/facebook-black.png";
    });

    instagramIcon.addEventListener("mouseover", function() {
        instagramIcon.src = instagramIcon.getAttribute("data-src");
    });

    instagramIcon.addEventListener("mouseout", function() {
        instagramIcon.src = "../images/community-icons/instagram-black.png";
    });

    twitterIcon.addEventListener("mouseover", function() {
        twitterIcon.src = twitterIcon.getAttribute("data-src");
    });

    twitterIcon.addEventListener("mouseout", function() {
        twitterIcon.src = "../images/community-icons/twitter-black.png";
    });

    // tiktokIcon.addEventListener("mouseover", function() {
    //     tiktokIcon.src = tiktokIcon.getAttribute("data-src");
    // });

    // tiktokIcon.addEventListener("mouseout", function() {
    //     tiktokIcon.src = "../images/community-icons/tiktok-black.png";
    // });
});

document.addEventListener('DOMContentLoaded',()=>{
    showAllCategories();
    showDefaultProducts()
});

