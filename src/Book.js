import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class Book extends React.Component {
  state = {}

  render() {
    const { content, handleShelfChange } = this.props

    return (
        <li>
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url('+ content.imageLinks.thumbnail +')' }}></div>
            <div className="book-shelf-changer">
                <select value={content.shelf} onChange={(event) => {handleShelfChange(content.id, event)}}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
                </select>
            </div>
            </div>
            <div className="book-title">{content.title}</div>
            <div className="book-authors">{content.authors.join(', ')}</div>
        </div>
        </li>
    )
  }
}

export default Book
