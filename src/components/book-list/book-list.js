import React from 'react';
import './book-list.css';
import BookListItem from "../book-list-item/book-list-item";
import {connect} from "react-redux";
import withBookstoreService from "../hoc/with-bookstore-service";
import {fetchBooks} from "../../actions/action-creators";
import compose from "../../utils/compose";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";

const BookList = ({books}) => {
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
    )
};

class BookListContainer extends React.Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const {books, loading, error} = this.props;
        if (loading) {
            return <Spinner/>;
        }
        if (error) {
            return <ErrorIndicator/>;
        }

        return <BookList books={books}/>
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchBooks: fetchBooks(dispatch, ownProps.service)
    }
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);