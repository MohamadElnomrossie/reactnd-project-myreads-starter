import React, { Component } from "react";
import SetShelf from "./SetShelf"
import {search} from "./BooksAPI"
import {Link} from 'react-router-dom'
class GetAllBooks extends Component {
    state={books:[],
    query:""}
    componentDidMount(){
        
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
      console.log(this.state.books);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >
            Close
          </Link>
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
        addToWantToRead={this.props.addToWantToRead}
        wantToReadList={this.state.books.filter((e)=>{
          return e.shelf==='wantToRead'
        })}
        addToCurrentlyReading={this.props.addToCurrentlyReading}
        // currentlyReadingList={this.state.books.filter((e)=>{
        //   return e.shelf==='currentlyReading'
        // })}
        addToRead={this.props.addToRead}
        ReadList={this.state.books.filter((e)=>{
          return e.shelf==='read'
        })}/>
        </div>
        {/* addToCurrentlyReading={this.addToCurrentlyReading}
    wantToReadList={this.state.books.filter((e)=>{
      return e.shelf==='wantToRead'
    })}
    addToWantToRead={this.addToWantToRead}
    currentlyReadingList={this.state.books.filter((e)=>{
      return e.shelf==='currentlyReading'
    })}
    addToRead={this.addToRead}
    ReadList={this.state.books.filter((e)=>{
      return e.shelf==='read'
    })}
    remove={this.remove} */}


      </div>
    );
  }
}
export default GetAllBooks