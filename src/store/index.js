import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import home from "./home/reducer";
import info from "./info/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
// combineReducers的作用是将多个reducer文件合并成一个reducer文件
const store = createStore(
  combineReducers({ info ,home }),
  enhancer
);

export default store;