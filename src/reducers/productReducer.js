import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_FAIL,
  SET_MESSAGE,
} from "../actions/types"; // Make sure this path is correct

const initialState = {
  products: [],
  message: ""
};

export default function productReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, payload.product],
        message: "Product added successfully" 
      };
    
    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        message: "Failed to add product" 
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(product => product.id !== payload.productId),
        message:  "Product deleted successfully" 
      };

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        message:  "Failed to delete product" 
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map(product => 
          product.id === payload.productId ? { ...product, ...payload } : product
        ),
        message: "Product updated successfully" //  payload.message ||
      };

    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        message:  "Failed to update product" // payload.message ||
      };

    case LIST_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.products,
        message:  "Products listed successfully" // payload.message ||
      };

    case LIST_PRODUCTS_FAIL:
      return {
        ...state,
        message:  "Failed to list products" // payload.message ||
      };

    case SET_MESSAGE:
      return {
        ...state,
        message: payload 
      };

    default:
      return state;
  }
}
