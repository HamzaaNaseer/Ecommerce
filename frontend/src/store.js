import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./reducers/productReducer";

//In this file the store for redux is created.

//used combineReducers because we will have to manage multiple states i.e (users,products...)
const reducer = combineReducers({
  product: productReducer,
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
