import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify' ;

const initialState = {
    cartItems: localStorage.getItem('productItem') ?
     JSON.parse(localStorage.getItem('productItem')): [] ,
    cartAmount:0,
    cartQuantity:0
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        AddToCart:(state,action) => {
            const existingIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
              );
            if (existingIndex >= 0) {
                state.cartItems[existingIndex].quantity+= 1;
                toast.info(`increase quantity ${state.cartItems[existingIndex].name} to card`,{
                    position: 'bottom-left'
                });
            } else {
                const tempProduct = {...action.payload, quantity : 1};
                state.cartItems.push (tempProduct);
                toast.success(`${action.payload.name} add to card`,{
                    position: 'bottom-left'
                });
            }
            localStorage.setItem('productItem',JSON.stringify(state.cartItems));
        },
        removeItems : (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            toast.error(`${action.payload.name} removed from card`,{
                position: 'bottom-left'
            });
            localStorage.setItem('productItem',JSON.stringify(state.cartItems));
        },
        increaseItem : (state, action) => {
          const myItemIndex =  state.cartItems.findIndex(item => item.id === action.payload.id);
          state.cartItems[myItemIndex].quantity += 1; 
          localStorage.setItem('productItem',JSON.stringify(state.cartItems)); 
        },
        decreaseItem : (state, action) => {
            
            const myItemIndex =  state.cartItems.findIndex(item => item.id === action.payload.id);
            
            if (state.cartItems[myItemIndex].quantity > 1 ) {
                state.cartItems[myItemIndex].quantity -= 1
            } else {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
                toast.error(`${action.payload.name} removed from card`,{
                    position: 'bottom-left'
                });
                localStorage.setItem('productItem',JSON.stringify(state.cartItems));
            }
     
            localStorage.setItem('productItem',JSON.stringify(state.cartItems)); 
        },
        clearCart : (state) => {
            state.cartItems = [];
            toast.error(`card cleard`,{
                position: 'bottom-left'
            });
            localStorage.setItem('productItem',JSON.stringify(state.cartItems)); 
        },
        getTotal : (state) => {
            
            let {totalAmount, totalQuantity} = state.cartItems.reduce((totalTemp,item) => {
                const total = item.price * item.quantity;
                totalTemp.totalAmount += total;
                totalTemp.totalQuantity += item.quantity;
                return totalTemp;
            },{
                totalAmount : 0,
                totalQuantity : 0
            });
            state.cartAmount = totalAmount;
            state.cartQuantity = totalQuantity;
        }
    }
})

export default cartSlice.reducer;
export const {AddToCart, removeItems, increaseItem,decreaseItem, clearCart, getTotal} = cartSlice.actions;