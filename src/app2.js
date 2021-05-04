import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from "./BooksAPI"
import GetAllBooks from "./GetAllBooks"
import SetShelf from "./SetShelf"
import {Link} from "react-router-dom"
import {Route} from "react-router-dom"
class BooksApp extends React.Component {
  state = (localStorage.getItem('state'))? JSON.parse(localStorage.getItem('state')):{
    showSearchPage: false,
    currentlyReading:[],
    wantToRead:[],
    read:[]

  }

saveState=()=>{
  localStorage.setItem('state', JSON.stringify(this.state))
}

addToWantToRead=(book)=>{
if(this.state.wantToRead.includes(book[0])===false){
  const wantToRead=this.state.wantToRead.concat(book[0])
  this.setState((currentState)=>({
    wantToRead,
      currentlyReading:currentState.currentlyReading.filter((e)=>{
return e.id!==book[0].id}),
read:currentState.read.filter((e)=>{
  return e.id!==book[0].id})}))
this.saveState()
}

}

remove=(book)=>{
     this.setState((currentState)=>({
      currentlyReading:currentState.currentlyReading.filter((e)=>{
        return e.id!==book[0].id}),
                              wantToRead:currentState.wantToRead.filter((e)=>{
                    return e.id!==book[0].id}),
                    read:currentState.read.filter((e)=>{
                      return e.id!==book[0].id})
  }))
  this.saveState()
}

addToCurrentlyReading=(book)=>{
  if(this.state.currentlyReading.includes(book[0])===false){

    const currentlyReading=this.state.currentlyReading.concat(book[0])
    this.setState((currentState)=>({
                            currentlyReading,
                              wantToRead:currentState.wantToRead.filter((e)=>{
                    return e.id!==book[0].id}),
                    read:currentState.read.filter((e)=>{
                      return e.id!==book[0].id})
  }))
  this.saveState()
}
}

addToRead=(book)=>{
  if(this.state.read.includes(book[0])===false){

    const read=this.state.read.concat(book[0])
    this.setState((currentState)=>({
                            read,
                    wantToRead:currentState.wantToRead.filter((e)=>{
                    return e.id!==book[0].id}),
                    currentlyReading:currentState.currentlyReading.filter((e)=>{
                    return e.id!==book[0].id})
  }))
  this.saveState()
}
}
 async componentDidMount(){
  const books= await BooksAPI.getAll()
  this.setState({books})
  }
  shelf=(target)=>{
    return <SetShelf
    target={target}
    addToCurrentlyReading={this.addToCurrentlyReading}
    wantToReadList={this.state.wantToRead}
    addToWantToRead={this.addToWantToRead}
    currentlyReadingList={this.state.currentlyReading}
    addToRead={this.addToRead}
    ReadList={this.state.read}
    remove={this.remove}
   />
  }


  
  render() {
    
    return (
      <div className="app">
        <Route path="/newRead" render={()=>(
          <GetAllBooks 
          showSearchPage={() => this.setState({ showSearchPage: false })} 
          books={this.state.books}
          addToWantToRead={this.addToWantToRead}
          wantToReadList={this.state.wantToRead}
          currentlyReadingList={this.state.currentlyReading}
          addToCurrentlyReading={this.addToCurrentlyReading}
          addToRead={this.addToRead}
          ReadList={this.state.read}
          remove={this.remove}
          /> )}/>
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
                    {this.shelf(this.state.currentlyReading)}
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                  {this.shelf(this.state.wantToRead)}
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                   {this.shelf(this.state.read)}
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
             <Link to="/newRead"><button>sds</button></Link>
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
