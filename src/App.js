import React from 'react'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import Search from './Search'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelves: [
      {
          title: 'Currently Reading',
          books: []
      },
      {
          title: 'Want to Read',
          books: []
      },
      {
          title: 'Read',
          books: []
      }
    ]
  }

  componentDidMount() {
    
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
