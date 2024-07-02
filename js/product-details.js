document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the product object from localStorage
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    // Clear the item from localStorage (optional)
    localStorage.removeItem('selectedProduct');

    // Select the element where you want to insert product details
    const productDetailsElement = document.getElementById('product-details');

    // Generate HTML markup for product details
    const productHTML = `
        <h2>${product.title}</h2>
        <img src="${product.thumbnail}" alt="Product Thumbnail">
        <p>Description: ${product.description}</p>
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price}</p>
        <p>Discount: ${product.discountPercentage}%</p>
        <p>Rating: ${product.rating}</p>
        <p>Stock: ${product.stock}</p>
        <p>Tags: ${product.tags.join(', ')}</p>
        <p>Brand: ${product.brand}</p>
        <p>SKU: ${product.sku}</p>
        <p>Weight: ${product.weight} kg</p>
        <p>Dimensions: Width: ${product.dimensions.width} cm, Height: ${product.dimensions.height} cm, Depth: ${product.dimensions.depth} cm</p>
        <p>Warranty: ${product.warrantyInformation}</p>
        <p>Shipping Information: ${product.shippingInformation}</p>
        <p>Availability Status: ${product.availabilityStatus}</p>
    `;

    // Append the generated HTML to the productDetailsElement
    productDetailsElement.innerHTML = productHTML;

    // Display customer reviews if available
    if (product.reviews && product.reviews.length > 0) {
        const reviewsHTML = `
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
        `;
        productDetailsElement.innerHTML += reviewsHTML;
    }

    // Additional sections like return policy, meta information, and additional images can be added similarly
});
