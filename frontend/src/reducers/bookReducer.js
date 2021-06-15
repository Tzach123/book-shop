import {
  BOOK_LIST_FAIL,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_BY_ID_FAIL,
  BOOK_BY_ID_REQUEST,
  BOOK_BY_ID_SUCCESS,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_RESET,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_DELETE_RESET,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_RESET,
} from '../constants/bookConstant'

export const bookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return { loading: true, ...state }
    case BOOK_LIST_SUCCESS:
      return {
        loading: false,
        books: action.payload.books,
      }
    case BOOK_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bookByIdReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case BOOK_BY_ID_REQUEST:
      return { loading: true, ...state }
    case BOOK_BY_ID_SUCCESS:
      return {
        loading: false,
        book: action.payload.book,
      }
    case BOOK_BY_ID_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bookCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CREATE_REQUEST:
      return { loading: true }
    case BOOK_CREATE_SUCCESS:
      return { loading: false, success: true, message: action.payload }
    case BOOK_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload }
    case BOOK_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const bookUpdateReducer = (state = { newBook: {} }, action) => {
  switch (action.type) {
    case BOOK_UPDATE_REQUEST:
      return { loading: true }
    case BOOK_UPDATE_SUCCESS:
      return { loading: false, success: true, message: action.payload }
    case BOOK_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload }
    case BOOK_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const bookDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DELETE_REQUEST:
      return { loading: true }
    case BOOK_DELETE_SUCCESS:
      return { loading: false, success: true }
    case BOOK_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload }
    case BOOK_DELETE_RESET:
      return {}
    default:
      return state
  }
}
