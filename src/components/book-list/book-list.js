import React from 'react';
import './book-list.css';
import BookListItem from "../book-list-item/book-list-item";
import {connect} from "react-redux";
import withBookstoreService from "../hoc/with-bookstore-service";
import {booksError, booksLoaded, booksRequested} from "../../actions";
import compose from "../../utils/compose";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";

class BookList extends React.Component {

    componentDidMount() {
        const {
            service, booksLoaded,
            booksRequested, booksError
        } = this.props;

        booksRequested();
        service.getBooks()
               .then((data) => booksLoaded(data))
               .catch((err) => booksError(err));
    }

    render() {
        const {books, loading, error} = this.props;
        if (loading) {
            return <Spinner/>;
        }
        if (error) {
            return <ErrorIndicator/>;
        }

        return (
            <ul className="book-list">
                {
                    books.map((book) => {
                        return (
                            <li key={book.id}><BookListItem book={book}/></li>
                        )
                    })
                }
            </ul>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        books: state.books,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = {
    booksLoaded,
    booksRequested,
    booksError
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);