document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const query = event.target.value;
        console.log('Searching for:', query);
        // Add your search functionality here
    }
});

function getAllCategories() {
    fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(categories => {
            const categoriesList = document.getElementById('categories-list');
            categoriesList.innerHTML = ''; // Clear previous content
            categories.forEach(category => {
                const categoryItem = document.createElement('a');
                categoryItem.href = '#'; // Set the href as needed
                categoryItem.textContent = category;
                categoriesList.appendChild(categoryItem);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}

// Call the function to load categories
getAllCategories();
