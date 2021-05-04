import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from "./BooksAPI"
import GetAllBooks from "./GetAllBooks"
import SetShelf from "./SetShelf"
import {Link} from "react-router-dom"
import {Route} from "react-router-dom"
class BooksApp extends React.Component {

state={books:[]}

addToWantToRead=(book)=>{
BooksAPI.update(book[0],'wantToRead').then(()=>{})
book[0]['shelf']='wantToRead'
this.setState((currentState)=>({
  books:currentState.books.filter((e)=>{
    return e.id!==book[0].id
  }),
}))
this.setState((currentState)=>({
 books:currentState.books.concat(book[0]) 
}))
}

remove=(book)=>{
  BooksAPI.update(book[0],'')
  book[0]['shelf']=''
  this.setState((currentState)=>({
    books:currentState.books.filter((e)=>{
      return e.id!==book[0].id
    }) 
   }))
}

addToCurrentlyReading=(book)=>{
  BooksAPI.update(book[0],'currentlyReading')
  book[0]['shelf']='currentlyReading'
  this.setState((currentState)=>({
    books:currentState.books.filter((e)=>{
      return e.id!==book[0].id
    }),
  }))
  this.setState((currentState)=>({
    books:currentState.books.concat(book[0]) 
   }))
}
  addToRead=(book)=>{
  BooksAPI.update(book[0],'read')
  book[0]['shelf']='read'
  this.setState((currentState)=>({
    books:currentState.books.filter((e)=>{
      return e.id!==book[0].id
    }),
  }))
  this.setState((currentState)=>({
    books:currentState.books.concat(book[0]) 
   }))
}
 async componentDidMount(){
  const books= await BooksAPI.getAll()
  this.setState({books})
  
  }
  shelf=(target)=>{
    return <SetShelf
    target={target}
    addToCurrentlyReading={this.addToCurrentlyReading}
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
    remove={this.remove}
   />
  }


  
  render() {
    
    return (
      <div className="app">
        <Route path="/search" render={()=>(
          <GetAllBooks 
          books={this.state.books}
          addToWantToRead={this.addToWantToRead}
          wantToReadList={this.state.books.filter((e)=>{
            return e.shelf==='wantToRead'
          })}
          currentlyReadingList={this.state.books.filter((e)=>{
            return e.shelf==='currentlyReading'
          })}
          addToCurrentlyReading={this.addToCurrentlyReading}
          addToRead={this.addToRead}
          ReadList={this.state.books.filter((e)=>{
            return e.shelf==='read'})}
          remove={this.remove}
          /> 
          )}
          />
       <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    {this.shelf(this.state.books.filter((e)=>{
                      return e.shelf==='currentlyReading'
                    }))}
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                  {this.shelf(this.state.books.filter(e=>{
                    return e.shelf==='wantToRead'
                  }))}
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                   {this.shelf(this.state.books.filter(e=>{
                    return e.shelf==='read'
                  }))}
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
             <Link to="/search"><button>sds</button></Link>
              {/* <Link to="/newRead">Add a book</Link> */}
            </div>
          </div>
        )}
        />
      </div>
    )
  }
}

export default BooksApp
