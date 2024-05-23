import {  API_END_POINT, GET_AUTH_PRODUCTS, GET_PRODUCTS, SUCCESS } from '@/lib/constant';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const handleData=(responseData)=>{
    if (responseData.status == SUCCESS && responseData.data) {
        return responseData.data;
    } else if(responseData.status == SUCCESS&& !responseData.data) {
        return responseData.message
    }else{
        throw new Error(responseData.message);
    }
}
export const fetchProducts = createAsyncThunk("product/getProducts", async (token) => {
    try {
      let response;
      if(token){
        response = await axios.get(`${API_END_POINT}${GET_AUTH_PRODUCTS}`,{
          headers: {
            Authorization: `Bearer ${token}`,
        }
        });
      }else{
        response = await axios.get(`${API_END_POINT}${GET_PRODUCTS}`);
      }
   
       const data=  handleData(response.data)
       return data

    } catch (err) {
        throw new Error(`Failed to fetch products`);
    }
});

export const getProductDetailByID = createAsyncThunk("product/getProductById", async (id,thunkAPI) => {
    try {

        const response = await axios.get(`${API_END_POINT}${GET_PRODUCTS}?id=${id}`);
        const data=  handleData(response.data)
       return data

    } catch (err) {
        throw new Error(`Failed to fetch products`);
    }


});

const initialState = {
    isLoading: false,
    data: [],
    isError: false
}
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) => {
              state.isLoading = true;
              state.isError = null; // Reset isError on new request
            }
          )
          .addMatcher(
            (action) => action.type.endsWith('/fulfilled'),
            (state, action) => {
              state.isLoading = false;
              state.data = action.payload;
            }
          )
          .addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
              state.isLoading = true;
              state.isError = action.isError.message; // Set error message
            }
          );
      },
});


export default productSlice.reducer;