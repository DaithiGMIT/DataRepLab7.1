import React from "react";
import { BookItem } from './bookItem';

export class Books extends React.Component {
    render() {
        return this.props.books.map(
            (book) => {
                //return <BookItem book={book} key={book.isbn}></BookItem>
                //mongo databases have a unique id for each item
                return <BookItem book={book} key={book._id}></BookItem>

            }
        );
    }
}