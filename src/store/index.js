import { configureStore } from "@reduxjs/toolkit";
import products from './productsSlice';
import {productsApi} from './productsapi';
import cart from './cartSlice'

export default configureStore({
    reducer: {
        products,
        cart,
        [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(productsApi.middleware)
})