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
    if(this.storageAvailable('localStorage')) {
      const initialState = window.localStorage.getItem('myreads')

      if(initialState === null) {
        window.localStorage.setItem('myreads', JSON.stringify(this.state))
      } else {
        this.setState(JSON.parse(initialState))
      }
      
    }
  }

  storageAvailable(type) {
    try {
      var storage = window[type],
          x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          storage.length !== 0;
    }
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
