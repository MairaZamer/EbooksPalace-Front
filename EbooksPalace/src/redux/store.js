import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { booksReducer, cartReducer, userReducer, } from './reducers';

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  books: booksReducer

});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
