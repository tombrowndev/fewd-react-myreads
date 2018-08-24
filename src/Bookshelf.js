import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class Bookshelf extends React.Component {
  state = {}

  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <Book/>
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                     
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                     

                    </ol>
                  </div>
                </div>
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
