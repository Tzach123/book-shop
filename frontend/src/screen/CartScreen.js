import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Row, Col, Image, Form, Card, Button } from 'react-bootstrap'
import { addToCart } from '../action/cartAction'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

const CartScreen = ({ history, match }) => {
  const bookId = match.params.id

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (userInfo) {
      if (bookId) {
        dispatch(addToCart(bookId, 1))
      }
    } else {
      history.push('/login')
    }
  }, [history, userInfo])

  const toPurchase = () => {
    history.push('/addressdetailsorder')
  }

  return (
    <>
      <h1>My cart books</h1>
      <Row>
        <Col md={7}>
          {!cartItems.length ? (
            <Message variant='info'>
              Your cart is empty! <Link to='/'>click to list book</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((bookItem) => (
                <ListGroup.Item key={bookItem.book}>
                  <Row>
                    <Col md={4}>
                      <Image
                        src={`/${bookItem.imageLink}`}
                        alt={bookItem.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/book/${bookItem.book}`}>{bookItem.name}</Link>
                    </Col>
                    <Col md={2}>${bookItem.price}</Col>
                    <Col md={3}>
                      {' '}
                      <Form.Control
                        as='select'
                        value={bookItem.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCart(bookItem.book, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(bookItem.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        {!cartItems.length || (
          <Col md={4} className='ml-4'>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <h4>
                    Subtotal{' '}
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                    items
                  </h4>
                  Total price: $
                  {cartItems.reduce((acc, item) => acc + item.price, 0)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className='btn-block' onClick={toPurchase}>
                    To purchase
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        )}
      </Row>
    </>
  )
}

export default CartScreen
