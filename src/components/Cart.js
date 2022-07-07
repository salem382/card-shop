import React,{useEffect} from 'react';
import {removeItems, increaseItem,decreaseItem ,clearCart,getTotal} from '../store/cartSlice';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
function Cart() {

  const cart = useSelector (state => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotal())
  },[cart,dispatch])
  const handleRemove = (item)=> {
    dispatch(removeItems(item))
  }
  const handleIncrease = (item) => {
    dispatch(increaseItem(item));
  }
  const handleDecrese = (item) => {
    dispatch(decreaseItem(item));
  }
  return (
    <div className='cart-container'>
      {cart.cartItems.length === 0 ?
       (
        <div className="cart-empty">
        <p>Your cart is currently empty</p>
        <div className="start-shopping">
          <NavLink to={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span>Start Shopping</span>
          </NavLink>
        </div>
      </div>
       ) :
        (
          <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img src={cartItem.image} alt={cartItem.name} />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick = {() => handleRemove (cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${cartItem.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick = {() => handleDecrese(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.quantity}</div>
                    <button onClick = {() => handleIncrease (cartItem)} >+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ${cartItem.price * cartItem.quantity}
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className = 'clear-btn' onClick ={() => dispatch(clearCart ())}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button>Check out</button>
              <div className="continue-shopping">
                <NavLink to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        )}
    </div>
  )
}

export default Cart;