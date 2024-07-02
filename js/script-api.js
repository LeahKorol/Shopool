async function getCategoryList() {
    try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        const categories = await response.json();
        return categories; 
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function getAllProducts(){
    try {
        const response = await fetch('https://dummyjson.com/products');
        const categories = await response.json();
        console.log(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function getCategoryProducts(categoryName){
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
        const categories = await response.json();
        console.log(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function searchProducts(query){
    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const categories = await response.json();
        console.log(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function getProductById(id){
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const categories = await response.json();
        console.log(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function showAllCategories() {
    try {
        const categories = await getCategoryList(); // Call the API function
        const categoriesList = document.getElementById('categories-list');
        categoriesList.innerHTML = ''; // Clear previous content
        categories.forEach(category => {
            const categoryItem = document.createElement('a');
            categoryItem.href = '#'; // Set the href as needed
            categoryItem.textContent = category;
            console.log(category);
            categoriesList.appendChild(categoryItem);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

showAllCategories();



