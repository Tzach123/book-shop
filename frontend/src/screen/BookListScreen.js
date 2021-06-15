import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listBook, deleteBook } from '../action/bookAction'
import { BOOK_DELETE_RESET } from '../constants/bookConstant'

const BookListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const bookList = useSelector((state) => state.bookList)
  const { loading, books, error } = bookList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const bookCreate = useSelector((state) => state.bookCreate)
  const { success: successCreate } = bookCreate

  const bookDelete = useSelector((state) => state.bookDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = bookDelete

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: BOOK_DELETE_RESET })
      alert('The book deleted!')
    }
    if (userInfo && userInfo.isAdmin) {
      dispatch(listBook())
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo, successDelete])

  const deleteBookHandler = (bookId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteBook(bookId))
    }
  }

  return (
    <>
      <Row className='align-items-center my-3'>
        <Col>
          <h1>Book List</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to='/admin/createbook'>
            <Button>
              <i className='fas fa-plus'></i> Create Book
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : !books.length ? (
        <Message>Don't have books! </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>AUTHOR</th>
              <th>PRICE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>
                  <Link to={`/book/${book._id}`}>{book._id}</Link>
                </td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.price}</td>
                <td className='text-center'>
                  <LinkContainer to={`/admin/updatebook/${book._id}`}>
                    <Button className='btn-sm' variant='light'>
                      <i className='fas fa-edit'></i> Edit
                    </Button>
                  </LinkContainer>{' '}
                  <Button
                    className='btn-sm'
                    variant='danger'
                    onClick={() => deleteBookHandler(book._id)}
                  >
                    <i className='fas fa-trash'></i> delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default BookListScreen
