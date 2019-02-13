import React from 'react';
import './book-list.css';
import BookListItem from "../book-list-item/book-list-item";
import {connect} from "react-redux";
import withBookstoreService from "../hoc/with-bookstore-service";
import {bookAddedToCart, fetchBooks} from "../../actions/action-creators";
import compose from "../../utils/compose";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";

const BookList = ({books, onAddedToCart}) => {
    return (
        <ul className="book-list">
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem
                                onAddedToCart={() => onAddedToCart(book.id)}
                                book={book}
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
};

class BookListContainer extends React.Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const {books, loading, error, onAddedToCart} = this.props;
        if (loading) {
            return <Spinner/>;
        }
        if (error) {
            return <ErrorIndicator/>;
        }

        return <BookList
            onAddedToCart={onAddedToCart}
            books={books}
        />
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.bookList.books,
        loading: state.bookList.loading,
        error: state.bookList.error
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchBooks: fetchBooks(dispatch, ownProps.service),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    }
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);