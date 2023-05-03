// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalOrderCost = 0
      cartList.forEach(eachCartItem => {
        totalOrderCost += eachCartItem.price * eachCartItem.quantity
      })
      return (
        <>
          <div className="order-summary-cont">
            <h1 className="total-order-cost">
              Order Total:
              <span className="total-amount">{` Rs ${totalOrderCost}/-`}</span>
            </h1>
            <p className="total-cart-items">{`${cartList.length} Items in cart`}</p>
            <button type="button" className="check-out-btn">
              Checkout
            </button>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
