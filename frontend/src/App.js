import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from './components/Header'
import HomeScreen from './screen/HomeScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import BookScreen from './screen/BookScreen'
import BookListScreen from './screen/BookListScreen'
import CreateBookScreen from './screen/CreateBookScreen'
import UpdateBookScreen from './screen/UpdateBookScreen'
import ProfileScreen from './screen/ProfileScreen'
import AddressDetailsOrder from './screen/AddressDetailsOrder'
import PlaceOrderScreen from './screen/PlaceOrderScreen'
import OrderScreen from './screen/OrderScreen'
import CartScreen from './screen/CartScreen'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/book/:id' component={BookScreen} />
          <Route path='/admin/booklist' component={BookListScreen} />
          <Route path='/admin/createbook' component={CreateBookScreen} />
          <Route path='/admin/updatebook/:id' component={UpdateBookScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/cart' component={CartScreen} exact />
          <Route path='/cart/:id' component={CartScreen} />
          <Route path='/addressdetailsorder' component={AddressDetailsOrder} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/search/:keyword' component={HomeScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
    </Router>
  )
}

export default App
