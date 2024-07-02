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
        const defaultProductLimit = 2; // Number of products to fetch per category
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

export { getCategoryList, getCategoryProducts, getDefaultProducts};