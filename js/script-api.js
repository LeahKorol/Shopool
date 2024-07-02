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