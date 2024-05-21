'use client'
import axios from "axios"
import React,{useState,useEffect,useRef} from 'react'
import { API_END_POINT,currencyList,PAYMENT, VERIFY,ADD_CART,buyOptions} from '@/lib/constant';
import {load} from '@cashfreepayments/cashfree-js'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProducts} from '@/redux/product/productSlice'
import useOnlineStatus from '@/hooks/useOnlineStatus'
import TryAgain from '@/components/TryAgain'
import NoDataFound from '@/components/NoDataFound'
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Cart() {
    let cashfree;
    const initializeSDK=async()=>{
      cashfree=await load({
        mode:'sandbox'
      })
    }
    initializeSDK()
    const [orderId,setOrderId]=useState("")
   
 const dispatch=useDispatch()
 const productData=useSelector((state)=>state.product)
 const token = useSelector((state) => state.auth.value)
 const productRef=useRef(false)
 const isOnline = useOnlineStatus();
 const router=useRouter()
const data=productData && productData.data && (productData.data.filter((item) => item.cart === 1))

    useEffect(()=>{
      if(productRef.current===false){
        getProductDetails()
      }
      return ()=>{productRef.current=true}
  
    },[])
  
   
  const getSessionId=async()=>{
    const totalAmount = data.reduce((accumulator, product) => accumulator + product.amount, 0);
    try {
        const requestOptions={
            amount:totalAmount,
            currency:'INR',
            id:`${Date.now()}`
        }
      const res=await axios.post(`${API_END_POINT}${PAYMENT}`,requestOptions)
  
      if(res.data.data && res.data.data.payment_session_id){
 
        setOrderId(res.data.data.payment_session_id)
       return res.data.data.payment_session_id
      }

    }catch(err){
      console.error(err)
    }
  }

  const verifyPayment=async()=>{

    try {
      const res=await axios.post(`${API_END_POINT}${VERIFY}`,{
        orderId:orderId
      })
      if(res && res.data){
        toast.success('payment verified')
      }
      
    } catch (error) {
      console.error(error)
    }

  }
 const placeOrder=async()=>{
  try {
    const sessionId=await getSessionId()
    const checkoutOption={
      paymentSessionId:sessionId,
      redirectTarget:'_modal'
    }
    cashfree.checkout(checkoutOption).then((res)=>{
      verifyPayment()
    })

  }catch(err){
    toast.error(err)
  }
 }
const getProductDetails=()=>{
  dispatch(fetchProducts())
}

 const handleOnClick=async(product)=>{
  try {
   
    const requestOption={
      id:product.product_id,
      cart:product.cart===1?0:1
    }
    const res=await axios.post(`${API_END_POINT}${ADD_CART}`,requestOption,{
      headers: {
        Authorization: `Bearer ${token}`,
    }
    })
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
     data ?(
        <div>
        <section className="grid grid-cols-2 gap-16 px-36 py-20 max-lg:flex-col max-sm:py-0 max-sm:px-0 mb-10">{
         data.map((product)=>(
          <div className=' w-full min-h-80' key={product.product_id}>
          <div className="flex w-full gap-8">
           <div className="product_item w-full cursor-pointer" onClick={()=>router.push(`product/${product.product_id}`)}><img  src="images/image-product-1-thumbnail.jpg" alt="soda_can" /></div> 
            <div className="flex flex-col gap-4">
              <div className="text-3xl font-bold">{product.name}
                <h2 className="text-2xl">{`${currencyList[product.currency-1]} ${product.amount}`}</h2>
              </div>
              <p className="w-full">{product.product_desc}</p>
              <div className=" cursor-pointer " onClick={()=>handleOnClick(product)} >  <button className={`${product.cart==1?`bg-orange-500 text-white hover:text-orange-800`:'bg-white text-orange-800'} hover:bg-orange-100  font-semibold py-2 px-4 border border-orange-400 rounded shadow`}>{buyOptions[product.cart]}</button></div>
            </div>
            </div>
          
          </div>
      ))}</section>
      {data.length>0 ?(<div className="mb-10 flex w-full justify-center items-center">
       <button
          onClick={placeOrder}
          className={`bg-orange-600 text-white hover:opacity-70 flex items-center justify-center gap-4  w-60 py-3 rounded-lg max-sm:w-full`}
        > 
          
          <span className=" font-bold">Place Order</span>
        </button>
        </div>
         ):<div className="text-center font-bold text-2xl">Add to Item to Cart<div> <button onClick={()=>router.push('/')} className={`mt-2 text-orange-400 hover:bg-orange-100  font-semibold py-2 px-4 border border-orange-400 rounded shadow`}>Home</button></div></div>}
      </div>
     
    ):<NoDataFound/>
  }
     </>  
  )}
 

     
     

  
  
  
  </>
  )
}

export default Cart