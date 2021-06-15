import React from 'react'

import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Book = ({ book }) => {
  const styles = {
    card: {
      backgroundColor: '#B7E0F2',
      borderRadius: 55,
      padding: '3rem',
    },
    cardImage: {
      height: '350px',
    },
  }
  return (
    <Card className='my-3 rounded'>
      <Link to={`/book/${book._id}`}>
        <Card.Img
          className='m-auto'
          src={`/${book.imageLink}`}
          variant='top'
          style={styles.cardImage}
        />
      </Link>
      <Card.Body>
        <Link to={`/book/${book._id}`}>
          <Card.Title as='h4'>{book.name}</Card.Title>
        </Link>
        <Card.Text as='div'>
          <div className='my-3'>author: {book.author}</div>
        </Card.Text>
        <Card.Text as='div'>
          <div className='my-3'>price: ${book.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Book
