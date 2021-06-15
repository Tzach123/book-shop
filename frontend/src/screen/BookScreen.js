import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { getBookById } from '../action/bookAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const BookScreen = ({ history, match }) => {
  const bookId = match.params.id
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const bookById = useSelector((state) => state.bookById)
  const { loading, error, book } = bookById

  useEffect(() => {
    dispatch(getBookById(bookId))
  }, [dispatch])

  const toCart = () => {
    if (userInfo) {
      history.push(`/cart/${bookId}`)
    } else {
      history.push(`/login`)
    }
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={4}>
            <Image src={`/${book.imageLink}`} alt={book.name} fluid />
          </Col>
          <Col md={5}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <h3>{book.name}</h3>
                </Row>
                <Row>author: {book.author}</Row>
              </ListGroup.Item>
              <Card>
                <ListGroup.Item>
                  <Row>
                    <Col>language: </Col>
                    <Col>{book.language}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>pages: </Col>
                    <Col>{book.pages}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>year:</Col>
                    <Col>{book.year}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Link:</Col>
                    <Col>{book.year}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>link:</Col>
                    <Col>
                      <a className='btn btn-link' href={book.link}>
                        book website
                      </a>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </Card>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>price:</Col>
                    <Col>${book.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>countInStock:</Col>
                    <Col>{book.countInStock}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    onClick={toCart}
                    disabled={book.countInStock === 0}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default BookScreen
