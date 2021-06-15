import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { CREATE_SHIPPING_ADDRESS } from '../constants/cartConstant'

const AddressDetailsOrder = ({ match, history }) => {
  const bookId = match.params.id

  const [address, setAdsress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))
    if (shippingAddress) {
      setAdsress(shippingAddress.address)
      setCity(shippingAddress.city)
      setPostalCode(shippingAddress.postalCode)
      setCountry(shippingAddress.country)
    }
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ address, city, postalCode, country })
    )
    dispatch({
      type: CREATE_SHIPPING_ADDRESS,
      payload: { address, city, postalCode, country },
    })
    history.push('/placeorder')
  }
  return (
    <div className='w-75 mx-auto'>
      <CheckoutSteps step1 bookId={bookId} />
      <h1>address details of shipping </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAdsress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            type='Number'
            placeholder='Enter postal code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></Form.Control>

          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
        </Form.Group>

        <Button className='btn-block' type='submit' variant='primary'>
          Create Order
        </Button>
      </Form>
    </div>
  )
}

export default AddressDetailsOrder
