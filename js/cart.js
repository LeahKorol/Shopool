let cart = {
    products: [],

    addProduct: function (id, title, thumbnail, price, quantity, minQuantity, maxQuantity) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            return false; // product already exists
        }

        let product = {
            id: id,
            title: title,
            thumbnail: thumbnail,
            price: price,
            quantity: quantity,
            minQuantity: minQuantity,
            maxQuantity: maxQuantity,
        };
        this.products.push(product);
        return true;
    },

    removeProduct: function (id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true; //removed successfully
        }
        return false; //product not found
    },

    changeProductQuantity: function (id, quantity) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            return false; // product does not exist
        }
        if (quantity < product.minQuantity || quantity > product.maxQuantity) {
            return false; // quantity out of bounds
        }
        product.quantity = quantity;
        return true;
    }
};


// Test addProduct
console.assert(cart.addProduct(1, 'Product 1', 'thumb1.jpg', 10, 2, 1, 5) === true, 'Test 1 Failed');
console.assert(cart.addProduct(1, 'Product 1', 'thumb1.jpg', 10, 2, 1, 5) === false, 'Test 2 Failed');
console.assert(cart.products.length === 1, 'Test 3 Failed');

// Test removeProduct
console.assert(cart.removeProduct(1) === true, 'Test 4 Failed');
console.assert(cart.removeProduct(1) === false, 'Test 5 Failed');
console.assert(cart.products.length === 0, 'Test 6 Failed');

// Add product again for quantity tests
cart.addProduct(1, 'Product 1', 'thumb1.jpg', 10, 2, 1, 5);

// Test changeQuantity
console.assert(cart.changeProductQuantity(1, 3) === true, 'Test 7 Failed');
console.assert(cart.products[0].quantity === 3, 'Test 8 Failed');
console.assert(cart.changeProductQuantity(1, 6) === false, 'Test 9 Failed'); // greater than maxQuantity
console.assert(cart.changeProductQuantity(1, 0) === false, 'Test 10 Failed'); // less than minQuantity
console.assert(cart.changeProductQuantity(2, 3) === false, 'Test 11 Failed'); // product does not exist

console.log('All tests passed!');


