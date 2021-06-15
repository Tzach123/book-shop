import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, bookId }) => {
  return (
    <Nav className='justify-content-center mb-4w'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to={`/addressdetailsorder`}>
            <Nav.Link>Order Details</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Order Details</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to={`/addressdetailsorder`}>
            <Nav.Link>Place order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to={`/order/:id`}>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
