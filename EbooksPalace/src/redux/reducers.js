import { ADD_TO_CART, REMOVE_ITEM, EMPTY_CART, SET_USER_PROFILE, FETCH_PAID_BOOKS_REQUEST, FETCH_PAID_BOOKS_SUCCESS, FETCH_PAID_BOOKS_FAILURE } from './actions';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload.book],
      };
    case REMOVE_ITEM:
      const updatedCart = state.cart.filter(item => item.id !== action.payload.bookId);
      return {
        ...state,
        cart: updatedCart,
      };
    case EMPTY_CART:
      return {
        ...state,
        cart: []
      };
    default:
      return state;
  }
};

const initialUserState = {
  userProfile: null
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    default:
      return state;
  }
};

const initialBookState = {
  loading: false,
  books: [],
  error: null
};

const booksReducer = (state = initialBookState, action) => {
  switch (action.type) {
    case FETCH_PAID_BOOKS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PAID_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.payload };
    case FETCH_PAID_BOOKS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export { cartReducer, userReducer, booksReducer };
