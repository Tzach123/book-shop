import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  bookListReducer,
  bookByIdReducer,
  bookCreateReducer,
  bookDeleteReducer,
  bookUpdateReducer,
} from './reducers/bookReducer'
import {
  userLoginReducer,
  userUpdateProfileReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
} from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
} from './reducers/orderReducer'

const reducer = combineReducers({
  bookList: bookListReducer,
  bookById: bookByIdReducer,
  bookCreate: bookCreateReducer,
  bookUpdate: bookUpdateReducer,
  bookDelete: bookDeleteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddress = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : []

const initState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: { cartItems: cartItems, shippingAddress: shippingAddress },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
