import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class Book extends React.Component {
  state = {}

  render() {
    const { content } = this.props

    return (
        <li>
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url('+ content.imageLinks.thumbnail +')' }}></div>
            <div className="book-shelf-changer">
                <select>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" selected={content.shelf == 'currentlyReading' ? true : false}>Currently Reading</option>
                <option value="wantToRead" selected={content.shelf == 'wantToRead' ? true : false}>Want to Read</option>
                <option value="read" selected={content.shelf == 'read' ? true : false}>Read</option>
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
