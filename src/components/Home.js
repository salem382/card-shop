import React from 'react';
import { useDispatch} from 'react-redux';
import {useGetProductsQuery} from '../store/productsapi';
import {AddToCart} from '../store/cartSlice';
import {useNavigate} from 'react-router-dom'
function Home() {

  const {data , isLoading, error} = useGetProductsQuery ();
  const navigate = useNavigate();
  const dispatch = useDispatch ();

  const handleCart = (product) => {
    navigate('/cart')
    dispatch (AddToCart(product))
  }

  return (
    <div className='home-container'>
      {isLoading ?(
      <p>loading ...</p>
      ): error ?
        (<p>an error occured</p> )
        : 
        (<>
        <h2>New Arrivals</h2>
        <div className='products'>
          {data.map( product => <div className = 'product' key={product.id}>
            <h3>{product.name}</h3>
            <img src={product.image} alt = {product.name}/>
            <div className='details'>
              <span>{product.desc}</span>
              <span className='price'>{product.price}</span>
            </div>
            <button onClick={() => handleCart (product)}>Add To Cart</button>
          </div>)}
        </div>
        </>)
       }
    </div>
  )
}

export default Home