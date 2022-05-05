import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "app/reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { initialState } from "./constants";



const configureStore = (preloadedStore: {}) =>
  createStore(
    rootReducer,
    preloadedStore,
    composeWithDevTools(applyMiddleware(thunk))
  );

const store = configureStore(initialState);

export default store;
