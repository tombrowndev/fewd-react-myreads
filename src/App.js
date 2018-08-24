import React from 'react'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import Search from './Search'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {}

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Bookshelf}/>
        <Route exact path="/search" component={Search}/>
      </React.Fragment>
    )
  }
}

export default BooksApp
