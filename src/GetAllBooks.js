import React, { Component } from "react";
import SetShelf from "./SetShelf"
import {search} from "./BooksAPI"
class GetAllBooks extends Component {
    state={books:[],
    query:""}
    componentDidMount(){
        this.setState({books:this.props.books})
    }
    handleSearch=(event)=>{
        event.preventDefault()
        this.setState({query:event.target.value});
        this.bookSearch()
    }

    bookSearch=async()=>{
        if (this.state.query===""){
            this.setState({books:this.props.books})}
        else{
            const books=await search(this.state.query)
            if(books.length>0){
                this.setState({books})
            }
        }
    }

    render() { 
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={this.props.showSearchPage}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text"
            onChange={(event)=>{this.handleSearch(event)}} placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
        <SetShelf target={this.state.books}
        addToCurrentlyReading={this.props.addToCurrentlyReading}/>
        </div>
    
      </div>
    );
  }
}
export default GetAllBooks