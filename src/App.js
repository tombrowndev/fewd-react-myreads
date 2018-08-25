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
        console.log('Error getting all from BooksAPI', error);
      })
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={() => (
          <Bookshelf books={this.state.books}/>
        )}/>
        <Route exact path="/search" component={Search}/>
      </React.Fragment>
    )
  }
}

export default BooksApp
