import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { listBook } from '../action/bookAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Book from '../components/Book'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const dispatch = useDispatch()

  const bookList = useSelector((state) => state.bookList)
  const { loading, books, error } = bookList

  useEffect(() => {
    dispatch(listBook(keyword))
  }, [dispatch, keyword])
  return (
    <>
      <h1>Book List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {books &&
              books.map((book) => (
                <Col key={book._id} sm={12} md={6} lg={4}>
                  <Book book={book} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
