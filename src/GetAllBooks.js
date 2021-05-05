import React, { Component } from "react";
import SetShelf from "./SetShelf";
import { search } from "./BooksAPI";
import { Link } from "react-router-dom";
class GetAllBooks extends Component {
  state = { books: [], query: "" };
  componentDidMount() {}
  handleSearch = async (event) => {
    event.preventDefault();
    if (event.target.value.trim() === "") {
      this.setState({ query: "", books: [] });
    }
    else if (event.target.value.trim()!=="") {
    this.setState({query:event.target.value.trim()},()=>{

      if(this.state.query.trim()!==""){
         this.bookSearch();
      }
    }); 
    } 
    else {
      this.setState({query:"", books: [] });
    }
  };
  updateQuery=(query)=>{
    this.setState({query})
  }
  bookSearch = async () => {
    if(this.state.query!=="")
    {const books = await search(this.state.query);

    try {
      if (books.length > 0) {
        books.forEach((book) => {
          let v = this.props.books.filter((b) => {
            return b.id === book.id;
          })[0];
          if (v !== undefined) {
            let { shelf } = v;
            book["shelf"] = shelf;
          } else {
            book["shelf"] = "none";
          }
        });
        this.setState({ books });
      }
    } catch {
      this.setState({books:[]})
    }
  }
else{
  this.setState({query:"",books:[]})
}};
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
              {this.state.books.length>0 && 
          (<SetShelf
            target={this.state.books}
            addToWantToRead={this.props.addToWantToRead}
            addToCurrentlyReading={this.props.addToCurrentlyReading}
            addToRead={this.props.addToRead}
            remove={this.props.remove}
          />)}
          {
            (this.state.books.length===0 ||this.state.query==="") && (
              <h1>No Results</h1>
            )
          }
        </div>
      </div>
    );
  }
}
export default GetAllBooks;
