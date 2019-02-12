import React from 'react';
import './book-list.css';
import BookListItem from "../book-list-item/book-list-item";
import {connect} from "react-redux";
import withBookstoreService from "../hoc/with-bookstore-service";
import {booksLoaded, booksRequested} from "../../actions";
import compose from "../../utils/compose";
import Spinner from "../spinner/spinner";

class BookList extends React.Component {

    componentDidMount() {
        const {service, booksLoaded, booksRequested} = this.props;
        booksRequested();
        service.getBooks()
               .then((data) => {
                   booksLoaded(data);
               });
    }

    render() {
        const {books, loading} = this.props;
        if (loading) {
            return <Spinner/>;
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
        loading: state.loading
    }
};

const mapDispatchToProps = {
    booksLoaded,
    booksRequested
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);