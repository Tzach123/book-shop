import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CREATE_SHIPPING_ADDRESS,
  RESET_SHIPPING_ADDRESS,
} from '../constants/cartConstant'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const existBook = state.cartItems.find(
        (item) => item.book === action.payload.book
      )
      if (existBook) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.book === existBook.book
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        }
      } else
        return {
          ...state,
          cartItems: [action.payload, ...state.cartItems],
        }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.book !== action.payload.book
        ),
      }
    case CREATE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case RESET_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: {},
      }
    case CART_RESET:
      return { cartItems: [], shippingAddress: {} }
    default:
      return state
  }
}
