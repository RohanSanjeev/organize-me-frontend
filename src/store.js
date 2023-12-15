// import { createStore, applyMiddleware, combineReducers } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import authReducer from "./reducers/authReducer"; // Assuming you have an authReducer
// import productReducer from "./reducers/productReducer"; // Your new product reducer

// const rootReducer = combineReducers({
//   auth: authReducer,
//   product: productReducer,
// });

// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;


import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
