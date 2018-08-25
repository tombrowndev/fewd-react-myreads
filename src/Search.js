import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class Search extends React.Component {
  state = {
    query: '',
    searching: false,
    results: []
  }

  handleQuery = (query) => {
    this.setState({query: query, results: [], searching: true})

    if(query) {
      BooksAPI.search(query)
      .then(results => {
        this.setState({searching: false})
        results = this.addCurrentShelf(results)
        this.setState({results})
      })
    }
    
  }

  addCurrentShelf = (results) => {
    if(!(results instanceof Array) || results.length < 1) {
      return results
    }

    // Create array of current book IDs for each shelf
    const {books} = this.props
    const shelves = this.bookIdsToShelves(books)

    results = results.map(book => {
      if(shelves.currentlyReading.indexOf(book.id) >= 0) {
        book.shelf = 'currentlyReading'
        return book
      }
      if(shelves.wantToRead.indexOf(book.id) >= 0) {
        book.shelf = 'wantToRead'
        return book
      }
      if(shelves.read.indexOf(book.id) >= 0) {
        book.shelf = 'read'
        return book
      }
      book.shelf = 'none'
        return book
    })

    console.log(results)

    return results
  }

  bookIdsToShelves = (books) => {
    const shelves = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }

    if(!(books instanceof Array) || books.length < 1) {
      return shelves
    }

    books.map((book) => {
      shelves[book.shelf] = book.id
    })

    return shelves
  }

  render() {
    const {query, searching, results} = this.state
    const {handleShelfChange} = this.props

    return (
      <div className="app">
          <div className="search-books">
            <div className="search-books-bar">
              <Link to={{pathname: '/'}} className="close-search">Add a book</Link>
              <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  value={query} 
                  onChange={(event) => this.handleQuery(event.target.value)} 
                  placeholder="Search by title or author"
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                { results.length ? (
                  results.map(book => <Book key={book.id} book={book} handleShelfChange={handleShelfChange}/>)
                ) : query && !searching && (
                  <li>No results.</li>
                )
                }
              </ol>
            </div>
          </div>
      </div>
    )
  }
}

export default Search
