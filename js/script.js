fetch('https://dummyjson.com/test')
    .then(res => res.json())
    .then(data => {
        console.log('Test Data:', data);
    })
    .catch(error => console.error('Error fetching test data:', error));


// Import Categories
function getAllCategories() {
    fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(categories => {
        console.log('Categories:');
        categories.forEach(category => {
            console.log(category);
        });
    })
    .catch(error => console.error('Error fetching categories:', error));
}


// Import Products
function getAllProducts() {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        console.log('Products:');
        data.products.forEach((product, index) => {
            console.log(`${index + 1}. Title: ${product.title}`);
            console.log(`   Description: ${product.description}`);
            console.log(`   Price: $${product.price}`);
            console.log(`   Brand: ${product.brand}`);
            console.log(`   Category: ${product.category}`);
            console.log(`   Stock: ${product.stock}`);
            console.log(`   Rating: ${product.rating}`);
            console.log(`   Thumbnail: ${product.thumbnail}`);
            console.log('   Images:', product.images.join(', '));
            console.log('-----------------------------------');
        });
    })
    .catch(error => console.error('Error fetching products:', error));
}

function getAllProductsByCategoryName(categoryName) {
    fetch(`https://dummyjson.com/products/category/${categoryName}`)
    .then(res => res.json())
    .then(data => {
        console.log(`Products in category: ${categoryName}`);
        data.products.forEach((product, index) => {
            console.log(`${index + 1}. Title: ${product.title}`);
            console.log(`   Description: ${product.description}`);
            console.log(`   Price: $${product.price}`);
            console.log(`   Brand: ${product.brand}`);
            console.log(`   Category: ${product.category}`);
            console.log(`   Stock: ${product.stock}`);
            console.log(`   Rating: ${product.rating}`);
            console.log(`   Thumbnail: ${product.thumbnail}`);
            console.log('   Images:', product.images.join(', '));
            // Remove comments printing as it is not part of the provided API data structure
            console.log('-----------------------------------');
        });
    })
    .catch(error => console.error(`Error fetching products for category ${categoryName}:`, error));
}



getAllCategories();
getAllProducts();
getAllProductsByCategoryName('smartphones');