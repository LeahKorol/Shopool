document.addEventListener('DOMContentLoaded', function() {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    localStorage.removeItem('selectedProduct');

    const productDetailsElement = document.getElementById('product-details');
    const importantDetailsElement = document.getElementById('important-details');
    const moreDetailsElement = document.getElementById('more-details');
    const technicalDetailsElement = document.getElementById('technical-details');
    const reviewsElement = document.getElementById('reviews');
    const imagesElement = document.getElementById('images');

    const importantHTML = `
        <h2>${product.title}</h2>
        <img src="${product.thumbnail}" alt="Product Thumbnail">
        <p>Description: ${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Rating: ${product.rating}</p>
        <p>Stock: ${product.stock}</p>
    `;

    const imagesHTML = product.images.map(image => `<img src="${image}" alt="Product Image">`).join('');

    const moreHTML = `
        <p>Brand: ${product.brand}</p>
        <p>Warranty: ${product.warrantyInformation}</p>
        <p>Shipping Information: ${product.shippingInformation}</p>
        <p>Availability Status: ${product.availabilityStatus}</p>
    `;

    const technicalHTML = `
        <p>SKU: ${product.sku}</p>
        <p>Weight: ${product.weight} kg</p>
        <p>Dimensions: Width: ${product.dimensions.width} cm, Height: ${product.dimensions.height} cm, Depth: ${product.dimensions.depth} cm</p>
    `;

    const reviewsHTML = product.reviews && product.reviews.length > 0 ? `
        <div class="product-reviews">
            <h3>Customer Reviews</h3>
            ${product.reviews.map(review => `
                <div class="review">
                    <p><strong>Rating: ${review.rating}</strong></p>
                    <p>Comment: ${review.comment}</p>
                    <p>Reviewer: ${review.reviewerName} (${review.reviewerEmail})</p>
                    <p>Date: ${new Date(review.date).toLocaleDateString()}</p>
                </div>
            `).join('')}
        </div>
    ` : '<p>No reviews available</p>';

    importantDetailsElement.innerHTML = importantHTML;
    imagesElement.innerHTML = imagesHTML;
    moreDetailsElement.innerHTML = moreHTML;
    technicalDetailsElement.innerHTML = technicalHTML;
    reviewsElement.innerHTML = reviewsHTML;

    document.getElementById('show-more-details').addEventListener('click', function() {
        moreDetailsElement.style.display = 'block';
    });

    document.getElementById('show-technical-details').addEventListener('click', function() {
        technicalDetailsElement.style.display = 'block';
    });

    document.getElementById('show-reviews').addEventListener('click', function() {
        reviewsElement.style.display = 'block';
    });
});
