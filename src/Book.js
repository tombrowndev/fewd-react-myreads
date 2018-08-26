import React from 'react'
import './App.css'

const Book = (props) => {
    const { book, handleShelfChange } = props

    return (
        <li>
        <div className="book">
            <div className="book-top">
            {typeof book.imageLinks !== 'undefined' ? (
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url('+ book.imageLinks.thumbnail +')' }}></div>
            ) : (
                <div className="book-cover-placeholder">{book.title}</div>
            )}
            <div className="book-shelf-changer">
                <select value={book.shelf} onChange={(event) => {handleShelfChange(book, event.target.value)}}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
                </select>
            </div>
            </div>
            <div className="book-title">{book.title}</div>
            {book.authors && (
                <div className="book-authors">{book.authors.join(', ')}</div>
            )}
        </div>
        </li>
    )
}

export default Book
