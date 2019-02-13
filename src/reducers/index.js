import {
    ALL_BOOKS_REMOVED_FROM_CART,
    BOOK_ADDED_TO_CART, BOOK_REMOVED_FROM_CART,
    FETCH_BOOKS_FAILURE,
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS
} from "../actions/actions";

const initialState = {
    books: [],
    cartItems: [],
    orderTotal: 0,
    loading: true,
    error: null
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
            return updateOrder(state, action.payload, 1);
        case BOOK_REMOVED_FROM_CART:
            return updateOrder(state, action.payload, -1);
        case ALL_BOOKS_REMOVED_FROM_CART:
            const item = state.cartItems.find((book) => book.id === action.payload);
            return updateOrder(state, action.payload, -item.count);
        default:
            return state;
    }
};

const updateOrder = (state, bookId, quantity) => {
    const {books, cartItems} = state;

    const book = books.find((book) => book.id === bookId);
    const itemIndex = cartItems.findIndex((item) => item.id === bookId);
    const item = cartItems[itemIndex];

    const newItem = updateCartItem(book, item, quantity);
    return {
        ...state,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    };
};

const updateCartItem = (book, item = {}, quantity) => {

    const {id = book.id, count = 0, title = book.title, total = 0} = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price
    }
};

const updateCartItems = (cartItems, item, index) => {

    if (item.count === 0) {
        return [
            ...cartItems.slice(0, index),
            ...cartItems.slice(index + 1)
        ]
    }

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

export default reducer;