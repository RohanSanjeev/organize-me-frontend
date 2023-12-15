import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_FAIL,
} from './types';

import ProductService from '../services/product.service';

// Add Product Action
export const addProduct = (id, name, image, description, cost, quantity) => (dispatch) => {
  return ProductService.addProduct(id, name, image, description, cost, quantity)
    .then(response => {
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: { product: response.data },
      });

      // Additional logging
      console.log('Add Product Success:', response);

      return Promise.resolve();
    })
    .catch(error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: ADD_PRODUCT_FAIL,
      });

      // Additional logging
      console.error('Add Product Error:', message);

      return Promise.reject(message);
    });
};

// Delete Product Action
export const deleteProduct = (productId) => (dispatch) => {
  return ProductService.deleteProduct(productId)
    .then(response => {
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: { productId },
      });

      // Additional logging
      console.log('Delete Product Success:', response);

      return Promise.resolve();
    })
    .catch(error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: DELETE_PRODUCT_FAIL,
      });

      // Additional logging
      console.error('Delete Product Error:', message);

      return Promise.reject(message);
    });
};

// Update Product Action
export const updateProduct = (productId, name, image, description, cost, quantity) => (dispatch) => {
  return ProductService.updateProduct(productId, name, image, description, cost, quantity)
    .then(response => {
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: { productId, name, image, description, cost, quantity},
      });

      // Additional logging
      console.log('Update Product Success:', response);

      return Promise.resolve();
    })
    .catch(error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UPDATE_PRODUCT_FAIL,
      });

      // Additional logging
      console.error('Update Product Error:', message);

      return Promise.reject(message);
    });
};

// List All Products Action
export const listAllProducts = () => (dispatch) => {
  return ProductService.listAllProducts()
    .then(response => {
      dispatch({
        type: LIST_PRODUCTS_SUCCESS,
        payload: { products: response.data },
      });

      // Additional logging
      console.log('List Products Success:', response);

      return Promise.resolve();
    })
    .catch(error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LIST_PRODUCTS_FAIL,
      });

      // Additional logging
      console.error('List Products Error:', message);

      return Promise.reject(message);
    });
};