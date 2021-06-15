import axios from 'axios'

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstant'

export const addToCart = (bookId, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/books/${bookId}`)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      book: data.book._id,
      name: data.book.name,
      author: data.book.author,
      imageLink: data.book.imageLink,
      language: data.book.language,
      link: data.book.link,
      pages: data.book.pages,
      year: data.book.year,
      price: data.book.price,
      countInStock: data.book.countInStock,
      quantity,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
