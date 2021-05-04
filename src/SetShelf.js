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
      this.addToCurrentlyReading(event)
    }
    else if(event.target.value==='read'){
      this.addToRead(event)
    }
    else{
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
                  <select id={book.id} value={book.shelf} onChange={(event)=>{this.handleChange(event)}}>
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading" id={book.id}
                    disabled={(this.props.target.includes(
                      this.props.target.filter((e)=>{
                        return e.id===book.id && e.shelf==='currentlyReading'
                      })[0]
                    ))?1:0}
                     >Currently Reading</option>
                    <option value="wantToRead" id={book.id}
                     disabled={(this.props.target.includes(
                      this.props.target.filter((e)=>{
                        return e.id===book.id && e.shelf==='wantToRead'
                      })[0]
                    ))?1:0}
                    >Want to Read</option>
                    <option value="read" id={book.id} 
                     disabled={(this.props.target.includes(
                      this.props.target.filter((e)=>{
                        return e.id===book.id && e.shelf==='read'
                      })[0]
                    ))?1:0}
                    >Read</option>
                    <option value="none"
                     disabled={(!this.props.target.includes(
                      this.props.target.filter((e)=>{
                        return e.id===book.id
                      })[0]
                    ))?1:0}
                    id={book.id}>None</option>
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
