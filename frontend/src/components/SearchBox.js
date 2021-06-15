import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyWord, setKeyWord] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyWord.trim()) {
      history.push(`/search/${keyWord}`)
    } else {
      history.push(`/`)
    }
  }
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyWord(e.target.value)}
        placeholder='Search Books...'
        className='mr-sm-2 ml-sm-5'
      />
      <Button type='submit' variant='btn btn-success' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
