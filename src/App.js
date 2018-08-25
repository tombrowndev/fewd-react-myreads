import React from 'react'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelves: {}
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((data) => {

        if(data.length > 0) {

          this.setState({
            shelves: this.booksToShelves(data)
          })

        }
        
      }).catch((error) => {
        console.log('Error getting all from BooksAPI', error);
      })
  }

  booksToShelves(books) {
    const newShelves = {}

    books.forEach(book => {
      if(typeof newShelves[book.shelf] === 'undefined') {
        newShelves[book.shelf] = []
      }
      newShelves[book.shelf].push(book)
    });

    return newShelves
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={() => (
          <Bookshelf shelves={this.state.shelves}/>
        )}/>
        <Route exact path="/search" component={Search}/>
      </React.Fragment>
    )
  }
}

export default BooksApp
