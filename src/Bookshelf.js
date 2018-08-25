import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class Bookshelf extends React.Component {
  state = {}

  booksToShelves = (books) => {
    const newShelves = {}

    if(books.length > 0) {
      books.forEach(book => {
        if(typeof newShelves[book.shelf] === 'undefined') {
          newShelves[book.shelf] = []
        }
        newShelves[book.shelf].push(book)
      });
    }

    return newShelves
  }

  render() {
    const {books} = this.props
    const shelves = this.booksToShelves(books)
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                {Object.keys(shelves).map(shelf => (
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{
                         shelf === 'currentlyReading' 
                          ? 'Currently Reading' 
                          : shelf === 'wantToRead' 
                            ? 'Want To Read' 
                            : 'Read'
                        }</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                            {shelves[shelf].map((book) => (
                              <Book content={book}/>
                            ))}
                            </ol>
                        </div>
                    </div>
                ))}

              </div>
            </div>
            <div className="open-search">
              <Link to={{pathname: '/search'}}>Add a book</Link>
            </div>
          </div>
      </div>
    )
  }
}

export default Bookshelf
