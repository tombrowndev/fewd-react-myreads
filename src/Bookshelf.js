import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class Bookshelf extends React.Component {
  state = {}

  render() {
    const {shelves} = this.props

    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                {shelves.map(shelf => (
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{shelf.title}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                            {/* Books go here */}
                            <Book />
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
