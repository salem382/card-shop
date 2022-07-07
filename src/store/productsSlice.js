
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'


export const getProducts = createAsyncThunk ('products/getProducts',async (_,{rejectWithValue}) => {

    // const {rejec} = thunkAPI;
    try {
        const response = await axios.get ('http://localhost:5000/products');
        return response.data;
    }
    catch (err){
        return rejectWithValue(err.response.data)
    }
    
})






const initialState = {
    items:[],
    status:null,
    laoding: false,
    err:null
}

const products = createSlice ({
    name:'products',
    initialState,
    reducers : {},
    extraReducers : {
        [getProducts.pending] : (state) => {
            state.laoding = true;
        },
        [getProducts.fulfilled] : (state, action) => {
            state.laoding = false;
            state.items = action.payload;
        },[getProducts.rejected] : (state, action) => {
            state.laoding = false;
            state.err = action.payload;
        }
    }
})


export default products.reducer;