'use client'
import axios from "axios"
import React,{useState,useEffect,useRef} from 'react'
import { API_END_POINT,currencyList,PAYMENT, VERIFY,ADD_CART,cartOptions} from '@/lib/constant';
import {load} from '@cashfreepayments/cashfree-js'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProducts} from '@/redux/product/productSlice'
import useOnlineStatus from '@/hooks/useOnlineStatus'
import TryAgain from './TryAgain'
import NoDataFound from './NoDataFound'
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function ProductList() {
  
   
 const dispatch=useDispatch()
 const productData=useSelector((state)=>state.product)
 const productRef=useRef(false)
 const isOnline = useOnlineStatus();
 const router=useRouter()


    useEffect(()=>{
      if(productRef.current===false){
        getProductDetails()
      }
      return ()=>{productRef.current=true}
  
    },[])
  
const getProductDetails=()=>{
  dispatch(fetchProducts())
}

 const handleOnClick=async(product)=>{
  try {
   
    const requestOption={
      id:product.product_id,
      cart:product.cart===1?0:1
    }
    const res=await axios.post(`${API_END_POINT}${ADD_CART}`,requestOption)
    if(res.data && res.data.message){
      getProductDetails()
      toast.success(res.data.message)
    }
    
   
  }catch(err){
    toast.error(`${err}`)
  }
 }
  return (
    <>
    <div><Toaster/></div>
    {!isOnline  && !productData.data&& <TryAgain handleTryAgainClick={()=>getProductDetails()}/>}
{
  productData.isisLoading ?(
    <div class="loader"></div>
  ):(
    <>
    {
     productData.data ?(
        <section className="grid grid-cols-3 gap-16 px-36 py-20 max-lg:flex-col max-sm:py-0 max-sm:px-0 mb-10">{
         productData.data.map((product)=>(
          <div className='relative w-full min-h-80' key={product.product_id}>
          <div className="main">
           <div className="product__image cursor-pointer" onClick={()=>router.push(`product/${product.product_id}`)}><img  src="images/image-product-1-thumbnail.jpg" alt="soda_can" /></div> 
            <div className="container">
              <div className="title">{product.name}
                <span >{`${currencyList[product.currency-1]} ${product.amount}`}</span>
              </div>
              <p className="desc">{product.product_desc}</p>
            
            </div>
           <div className="absolute bottom-0 left-0 cursor-pointer " onClick={()=>handleOnClick(product)} >  <span >{`${currencyList[product.currency-1]} ${product.amount}`}</span> <button className={`${product.cart==1?`bg-orange-500 text-white hover:text-orange-800`:'bg-white text-orange-800'} hover:bg-orange-100  font-semibold py-2 px-4 border border-orange-400 rounded shadow`}>{cartOptions[product.cart]}</button></div>
            </div>
          </div>
      ))}</section>
    ):<NoDataFound/>
  }
     </>  
  )}
 

     
     

  
  
  
  </>
  )
}

export default ProductList