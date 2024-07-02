//functions to retrieve data from the API

async function getCategoryList() {
    try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function getAllProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function getCategoryProducts(categoryName) {
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return []; // Return an empty array in case of error
    }
}

async function searchProducts(query) {
    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function getProductById(id) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
}

async function getDefaultProducts() {
    try {
        const categories = await getCategoryList();

        // Fetch a few products from each category
        const defaultProductLimit = 3; // Number of products to fetch per category
        const defaultProducts = {};

        for (const category of categories) {
            const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=${defaultProductLimit}`);
            const data = await response.json();
            defaultProducts[category] = data.products;
        }
        return defaultProducts;
    } catch (error) {
        console.error('Error fetching default products:', error);
        return null;
    }
}


//functions to show data on the screen

async function showAllCategories() {
    try {
        const categories = await getCategoryList();
        const categoriesList = document.getElementById('categories-list');
        categoriesList.innerHTML = ''; // Clear previous content
        categories.forEach(category => {
            const categoryItem = document.createElement('a');
            categoryItem.href = '#'; // Set the href as needed
            categoryItem.textContent = category;
            categoryItem.addEventListener('click', (event) => {
                event.preventDefault();
                showCategoryProducts(category);
            });
            categoriesList.appendChild(categoryItem);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

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
                <img src=${product.thumbnail} alt="product #${product.id} image" />
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating}</p>
                <p>Availability: ${product.availabilityStatus}</p>
                <button onclick="showProductDetails('${product.id}')">View Details</button>
            `;
            productList.appendChild(productItem);
        });

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


function showProductDetails(productId) {
    // Redirect to a new page showing all details of the selected product
    window.location.href = `product-details.html?id=${productId}`;
}

// Initialize categories on page load
document.addEventListener('DOMContentLoaded', showAllCategories);









