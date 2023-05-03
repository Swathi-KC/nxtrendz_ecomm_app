/* eslint-disable no-return-assign */
import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.filter(eachItem => eachItem.id === id)
    const quantity = product[0].quantity + 1
    const filteredCartItems = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity}
      }
      return eachItem
    })
    this.setState({cartList: filteredCartItems})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.filter(eachItem => eachItem.id === id)
    const quantity = product[0].quantity - 1
    if (quantity >= 1) {
      const filteredCartItems = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity}
        }
        return eachItem
      })
      this.setState({cartList: filteredCartItems})
    } else {
      const filteredCartItems = cartList.filter(eachItem => eachItem.id !== id)
      this.setState({cartList: filteredCartItems})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartItems = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filteredCartItems})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const containsProduct = cartList.find(
      eachItem => eachItem.id === product.id,
    )

    if (containsProduct !== undefined) {
      const quantity = product.quantity + containsProduct.quantity
      const filteredCartItems = cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          return {...eachItem, quantity}
        }
        return eachItem
      })
      this.setState({cartList: filteredCartItems})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
