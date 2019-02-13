import {BOOK_ADDED_TO_CART, FETCH_BOOKS_FAILURE, FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS} from "../actions/actions";

const initialState = {
    books: [],
    cartItems: [],
    orderTotal: 0,
    loading: true,
    error: null
};

const updateCartItems = (cartItems, item, index) => {
    if (index === -1) {
        return [
            ...cartItems,
            item
        ]
    }

    return [
        ...cartItems.slice(0, index),
        item,
        ...cartItems.slice(index + 1)
    ]
};

const updateCartItem = (book, item = {}) => {

    const {id = book.id, count = 0, title = book.title, total = 0} = item;

    return {
        id,
        title,
        count: count + 1,
        total: total + book.price
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKS_REQUEST:
            return {
                ...state,
                books: [],
                loading: true,
                error: null
            };
        case FETCH_BOOKS_SUCCESS:
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null
            };
        case FETCH_BOOKS_FAILURE:
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload
            };
        case BOOK_ADDED_TO_CART:
            const bookId = action.payload;
            const book = state.books.find((book) => book.id === bookId);
            const itemIndex = state.cartItems.findIndex((item) => item.id === bookId);
            const item = state.cartItems[itemIndex];

            const newItem = updateCartItem(book, item);
            return {
                ...state,
                cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
            };
        default:
            return state;
    }
};

export default reducer;