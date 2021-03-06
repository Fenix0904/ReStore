import {
    ALL_BOOKS_REMOVED_FROM_CART,
    BOOK_ADDED_TO_CART,
    BOOK_REMOVED_FROM_CART,
    FETCH_BOOKS_FAILURE,
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
} from "./actions";

const booksRequested = () => {
    return {
        type: FETCH_BOOKS_REQUEST
    };
};

const booksLoaded = (newBooks) => {
    return {
        type: FETCH_BOOKS_SUCCESS,
        payload: newBooks
    };
};

const booksError = (error) => {
    return {
        type: FETCH_BOOKS_FAILURE,
        payload: error
    };
};

const fetchBooks = (dispatch, service) => () => {
    dispatch(booksRequested());
    service.getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((err) => dispatch(booksError(err)));
};

const bookAddedToCart = (bookId) => {
    return {
        type: BOOK_ADDED_TO_CART,
        payload: bookId
    }
};

const bookRemovedFromCart = (bookId) => {
    return {
        type: BOOK_REMOVED_FROM_CART,
        payload: bookId
    }
};

const allBooksRemovedFromCart = (bookId) => {
    return {
        type: ALL_BOOKS_REMOVED_FROM_CART,
        payload: bookId
    }
};

export {
    fetchBooks,
    bookAddedToCart,
    allBooksRemovedFromCart,
    bookRemovedFromCart
};