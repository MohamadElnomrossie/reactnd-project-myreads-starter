import React,{Component} from "react";
 class SetShelf extends Component {
  addToWantToRead=(event)=>{
    const book=this.props.target.filter(c=>{
      return c.id===event.target.id
    })
    if (book.length>0){

      this.props.addToWantToRead(book)
    }
  } 
  addToCurrentlyReading=(event)=>{
    const book=this.props.target.filter(c=>{
      return c.id===event.target.id
    })
    if (book.length>0){
      this.props.addToCurrentlyReading(book)
    }
  } 
  addToRead=(event)=>{
    const book=this.props.target.filter(c=>{
      return c.id===event.target.id
    })
    if (book.length>0){
      this.props.addToRead(book)
    }

  } 
  remove=(event)=>{
    const book=this.props.target.filter(c=>{
      return c.id===event.target.id
    })
    if (book.length>0){
      this.props.remove(book)
    }
  }
  handleChange=(event)=>{
    if (event.target.value==='wantToRead'){
      this.addToWantToRead(event)
    }
    else if(event.target.value==='currentlyReading'){
      console.log("object");
      this.addToCurrentlyReading(event)
    }
    else if(event.target.value==='read'){
      this.addToRead(event)
    }
    else if(event.target.value==='none'){
      this.remove(event)
    }
  }
   render(){
   return(
    <ol className="books-grid">
      {this.props.target.map((book) => {
        return (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 188,
                    backgroundImage: `url(${(book.imageLinks)?book.imageLinks.thumbnail:""})`,
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select id={book.id} value={book.shelf} selected={book.shelf} >
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading" id={book.id} onClick={(event)=>this.addToCurrentlyReading(event)}>Currently Reading</option>
                    <option value="wantToRead" id={book.id}
                     onClick={(event)=>this.addToWantToRead(event)}
                    >Want to Read</option>
                    <option value="read" id={book.id} 
                     onClick={(event)=>this.addToRead(event)}
                    >Read</option>
                    <option value="none"
                     
                    id={book.id}
                    onClick={(event)=>this.remove(event)}
                    >None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{(book.authors)?book.authors[0]:""}</div>
            </div>
          </li>
        );
      })}
    </ol>
)
}}
export default SetShelf
