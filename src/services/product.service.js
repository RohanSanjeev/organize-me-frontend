import axios from 'axios';

const API_URL = 'https://organizeme-81hv.onrender.com/api/products/';

class ProductService {
  // Add a new product
  addProduct(id, name, image, description, cost, quantity) {
    return axios
        .post(API_URL + 'add', {id, name, image, description, cost, quantity});
  }

  // Delete a product by ID
  deleteProduct(productId) {
    return axios.delete(API_URL + productId);
  }

  // Update a product by ID
  updateProduct(id, name, image, description, cost, quantity) {
    return axios.put(API_URL + "update", {id, name, image, description, cost, quantity});
  }

  // List all products
  listAllProducts() {
    return axios.get(API_URL + 'list');
  }
}

export default new ProductService();
