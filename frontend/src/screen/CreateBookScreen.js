import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createBook } from '../action/bookAction'
import { BOOK_CREATE_RESET } from '../constants/bookConstant'

const CreateBookScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [imageLink, setImageLink] = useState('')
  const [language, setLanguage] = useState('')
  const [link, setLink] = useState('')
  const [pages, setPages] = useState('')
  const [year, setYear] = useState('')
  const [price, setPrice] = useState('')
  const [countInStock, setCountInStock] = useState('')

  const bookCreate = useSelector((state) => state.bookCreate)
  const { loading, success, error } = bookCreate

  useEffect(() => {
    if (success) {
      dispatch({ type: BOOK_CREATE_RESET })
      history.push('/admin/booklist')
    }
  }, [dispatch, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure?')) {
      const newBook = {
        name,
        author,
        imageLink,
        language,
        link,
        pages,
        year,
        price,
        countInStock,
      }
      dispatch(createBook(newBook))
    }
  }

  return (
    <>
      <Link to='/admin/booklist' className='btn btm-light my-3'>
        Go Back
      </Link>
      <Container>
        <h1>Create new book</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{Message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={6}>
                <Form.Group controlId='name'>
                  <Form.Label>name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='author'>
                  <Form.Label>author</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter author name'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='imageLink'>
                  <Form.Label>image link</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image link'
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='language'>
                  <Form.Label>language</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter language'
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='link'>
                  <Form.Label>link</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter web site link'
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='pages'>
                  <Form.Label>pages</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter pages'
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='year'>
                  <Form.Label>year</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter year'
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                  <Form.Label>price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                  <Form.Label>count in stock</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter count in stock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='m-5 text-center'>
                  <Button
                    type='submit'
                    className='align-items-center w-25'
                    variant='primary'
                  >
                    Create
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </>
  )
}

export default CreateBookScreen
