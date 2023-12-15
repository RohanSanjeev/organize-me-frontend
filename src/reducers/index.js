import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import product from "./productReducer"; // import the productReducer
import order from "./orderReducer"
import user from "./userReducer"

export default combineReducers({
  auth,
  message,
  product,
  order,
  user
});
