import React, { Component } from "react";
import SetShelf from "./SetShelf";
import { search } from "./BooksAPI";
import { Link } from "react-router-dom";
class GetAllBooks extends Component {
  state = { books: [], query: "" };
  componentDidMount() {}
  handleSearch = (event) => {
    event.preventDefault();
    if (event.target.value.trim() === "") {
      this.setState({ query: "", books: [] });
    }
    if (event.target.value.trim() !== "") {
      this.setState({ query: event.target.value });
      this.bookSearch();
    } else {
      this.setState({ books: [] });
    }
  };
  bookSearch = async () => {
    const books = await search(this.state.query);

    try {
      console.log(this.props.books);
      if (books.length > 0) {
        books.forEach((book) => {
          let v = this.props.books.filter((b) => {
            return b.id === book.id;
          })[0];
          if (v !== undefined) {
            console.log("this is v", v);
            let { shelf } = v;
            book["shelf"] = shelf;
            console.log(shelf);
          } else {
            book["shelf"] = "none";
          }
        });
      }
      this.setState({ books });
    } catch {}
  };

  render() {
    return (
      <div className="search-books">
        {JSON.stringify(this.state.query)}
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={(event) => {
                this.handleSearch(event);
              }}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <SetShelf
            target={this.state.books}
            addToWantToRead={this.props.addToWantToRead}
            addToCurrentlyReading={this.props.addToCurrentlyReading}
            addToRead={this.props.addToRead}
          />
        </div>
      </div>
    );
  }
}
export default GetAllBooks;
