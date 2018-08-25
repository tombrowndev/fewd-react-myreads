import React from 'react'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((data) => {
        if(data.length > 0) {

          this.setState({
            books: data
          })
        }
      }).catch((error) => {
        console.log('Error getting all from BooksAPI', error)
      })
  }

  handleShelfChange = (book, value) => {
    // Check the value is valid
    if(['currentlyReading', 'wantToRead', 'read', 'none'].indexOf(value) === -1) {
      console.log('Invalid shelf given')
      return
    }

    BooksAPI.update(book, value)
      .then(() => {
        if(value === 'none') {
          this.removeBook(book)
        } else {
          this.changeBookShelf(book, value)
        }
      })
      .catch((error) => {
        console.log('Can\'t move book', error)
      })
  }

  addBook = (book) => {
    const {books} = this.state
    let bookExists = false

    // Check if book already exists
    if(books.length > 0) {
      books.forEach((_book) => {
        if(_book.id === book.id) bookExists = true
      })
    }
    if(bookExists) return

    books.push(book)
    this.setState({books})
  }

  changeBookShelf = (book, shelf) => {
    // Add the book if it doesnt already exist
    this.addBook(book)

    this.setState((state) => {
      return {books: (() => {
        return state.books.map((_book) => {
          if(_book.id === book.id) _book.shelf = shelf
          return _book
        })
      })()}
    })
  }

  removeBook = (book) => {
    this.setState((state) => {
      return {books: (() => {
        return state.books.filter((_book) => {
          if(_book.id === book.id) return false
          return true
        })
      })()}
    })
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={() => (
          <Bookshelf books={this.state.books} handleShelfChange={this.handleShelfChange}/>
        )}/>
        <Route path="/search" render={() => (
          <Search books={this.state.books} handleShelfChange={this.handleShelfChange}/>
        )}/>
      </React.Fragment>
    )
  }
}

export default BooksApp
