import {FETCH_BOOKS_FAILURE, FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS} from "../actions/actions";

const initialState = {
    books: [],
    cartItems: [
        {
            id: 1,
            title: "Book 1",
            count: 2,
            total: 250
        },
        {
            id: 2,
            title: "Book 2",
            count: 4,
            total: 450
        },
        {
            id: 3,
            title: "Book 3",
            count: 1,
            total: 50
        },
    ],
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
        default:
            return state;
    }
};

export default reducer;