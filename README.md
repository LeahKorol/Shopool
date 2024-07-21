# Product Management System

This project is a simple web-based product management system that uses the DummyJSON API to fetch and display product information. It supports category browsing, product search, and managing favorite items and orders.

## Features

- **Category List**: Retrieve and display product categories.
- **Category Products**: Fetch and display products based on category selection.
- **Product Search**: Search for products using a search query.
- **Favorites Management**: Add, remove, and view favorite products.
- **Order Management**: View, update, and manage orders.
- **Responsive Design**: Adapted for both desktop and mobile views.
- **Dynamic Elements**: Includes a carousel and responsive product listings.

## API Endpoints

The following API endpoints are used in this project:

1. **Get Category List**
   - **Endpoint**: `https://dummyjson.com/products/category-list`
   - **Method**: `GET`
   - **Description**: Retrieves a list of product categories.

2. **Get Products by Category**
   - **Endpoint**: `https://dummyjson.com/products/category/{categoryName}`
   - **Method**: `GET`
   - **Description**: Retrieves a list of products for a specific category.

3. **Search Products**
   - **Endpoint**: `https://dummyjson.com/products/search?q={query}`
   - **Method**: `GET`
   - **Description**: Searches for products based on the query.

4. **Get Default Products**
   - **Endpoint**: `https://dummyjson.com/products/category/{categoryName}?limit={defaultProductLimit}`
   - **Method**: `GET`
   - **Description**: Retrieves a limited number of products for default categories.

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LeahKorol/Shopool.git
