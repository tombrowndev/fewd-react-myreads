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

  handleShelfChange = (book, event) => {
    const value = event.target.value

    if(['currentlyReading', 'wantToRead', 'read', 'none'].indexOf(value) === -1) {
      console.log('Invalid shelf given')
      return
    }

    // Remove a book
    if(value === 'none') {
      BooksAPI.update(book, value)
        .then(() => {
          this.removeBook(book.id)
        })
        .catch((error) => {
          console.log('Can\'t remove book', error)
        })
    } else {
      BooksAPI.update(book, value)
        .then(() => {
          this.changeBookShelf(book.id, value)
        })
        .catch((error) => {
          console.log('Can\'t move book', error)
        })
    }
  }

  addBook = (book) => {
    this.setState((state) => {
      return {books: state.books.push(book)}
    })
  }

  changeBookShelf = (id, shelf) => {
    this.setState((state) => {
      return {books: (() => {
        return state.books.map((book) => {
          if(book.id === id) book.shelf = shelf
          return book
        })
      })()}
    })
  }

  removeBook = (id) => {
    this.setState((state) => {
      return {books: (() => {
        return state.books.filter((book) => {
          if(book.id === id) return false
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
        <Route exact path="/search" component={Search}/>
      </React.Fragment>
    )
  }
}

export default BooksApp
