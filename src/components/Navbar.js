import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {getTotal} from '../store/cartSlice'

function Navbar() {

  const dispatch = useDispatch();
  const {cartQuantity} = useSelector(state => state.cart);
  useEffect (()=> {
    dispatch(getTotal ());
  },[dispatch])
  return (
    <nav className='nav-bar'>
      <NavLink to={'/'}>
        <h2>Online Shsop</h2>
      </NavLink>
      <NavLink to={'/cart'}>
        <div className='nav-bag'>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-bag-fill" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
          </svg>
          <span className='logo-number'>{cartQuantity}</span>
        </div>
      </NavLink>
    </nav>
  )
}

export default Navbar