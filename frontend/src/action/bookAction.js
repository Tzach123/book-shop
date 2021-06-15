import axios from 'axios'

import {
  BOOK_LIST_FAIL,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_BY_ID_REQUEST,
  BOOK_BY_ID_SUCCESS,
  BOOK_BY_ID_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
} from '../constants/bookConstant'

export const listBook =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: BOOK_LIST_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.get(`/api/books?keyword=${keyword}`, config)

      dispatch({ type: BOOK_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: BOOK_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getBookById = (bookId) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_BY_ID_REQUEST })

    const { data } = await axios.get(`/api/books/${bookId}`)

    dispatch({ type: BOOK_BY_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: BOOK_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOK_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/books/`, book, config)

    dispatch({ type: BOOK_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateBook = (bookId, book) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOK_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/books/${bookId}`, book, config)

    dispatch({ type: BOOK_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: BOOK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteBook = (bookId) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOK_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/books/${bookId}`, config)

    dispatch({ type: BOOK_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: BOOK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
