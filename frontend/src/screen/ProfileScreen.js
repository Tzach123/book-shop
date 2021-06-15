import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMyOrders } from '../action/orderAction'
import { updateUserProfile, getUserDetails } from '../action/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo, error } = userLogin

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingMyOrders, orders, error: errorMyOrders } = orderListMy

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success: successUpdateProfile } = userUpdateProfile

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || successUpdateProfile) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(listMyOrders())
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, successUpdateProfile])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!password || password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      setMessage('')
      if (window.confirm('Are youe sure?')) {
        dispatch(updateUserProfile({ id: userInfo._id, name, email, password }))
      }
    }
  }
  return (
    <>
      <h2>user id: {userInfo._id}</h2>
      <Row>
        <Col md={3}>
          <h2>User Details</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              {message && <Message variant='danger'>{message}</Message>}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button className='btn-block' type='submit' variant='primary'>
                  Update
                </Button>
              </Form>
            </>
          )}
        </Col>
        <Col md={9}>
          <h2>Orders Details</h2>
          {loadingMyOrders ? (
            <Loader />
          ) : errorMyOrders ? (
            <Message variant='danger'>{errorMyOrders}</Message>
          ) : !orders.length ? (
            <Message>
              Don't have orders! <Link to='/'>To list book</Link>
            </Message>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDeliverd ? (
                        order.deliverdAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen
