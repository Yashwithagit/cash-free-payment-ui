import { configureStore } from '@reduxjs/toolkit'
import userReducer from './product/productSlice'

export function makeStore(){
    return configureStore({
        reducer:{
            product:userReducer,
        }
    })
}
export const store=makeStore()