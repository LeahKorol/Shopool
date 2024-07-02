async function getCategoryList() {
    try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        const categories = await response.json();
        console.log(categories);
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


