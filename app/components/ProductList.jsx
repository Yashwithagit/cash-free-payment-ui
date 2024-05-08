'use client'
import axios from "axios"
import React,{useState,useEffect} from 'react'
import { API_END_POINT,GET_PRODUCTS ,currencyList,PAYMENT, VERIFY} from '@/lib/constant';
import {load} from '@cashfreepayments/cashfree-js'

function ProductList() {
    let cashfree;
    const initializeSDK=async()=>{
      cashfree=await load({
        mode:'sandbox'
      })
    }
    initializeSDK()
    const [orderId,setOrderId]=useState("")
    const [productLists, setProductLists] = useState([]);
    const getProductDetails=async()=>{
        try {
            const res=await axios.get(`${API_END_POINT}${GET_PRODUCTS}`)
            setProductLists(res.data.data)
            
          } catch (error) {
            console.error(error)
          }
    }
    useEffect(()=>{
   getProductDetails()
    },[])
 
  const getSessionId=async()=>{
    try {
      const res=await axios.get(`${API_END_POINT}${PAYMENT}`)
      if(res.data && res.data.payment_session_id){
        setOrderId(res.data.payment_session_id)
       return res.data.payment_session_id
      }

    }catch(err){
      console.error(err)
    }
  }
  console.log(orderId)
  const verifyPayment=async()=>{
    console.log(orderId,'sad')
    try {
      const res=await axios.post(`${API_END_POINT}${VERIFY}`,{
        orderId:orderId
      })
      if(res && res.data){
        alert('payment verified')
      }
      
    } catch (error) {
      console.error(error)
    }

  }
 const handleOnClick=async()=>{
  try {
    const sessionId=await getSessionId()
    const checkoutOption={
      paymentSessionId:sessionId,
      redirectTarget:'_modal'
    }
    cashfree.checkout(checkoutOption).then((res)=>{
      console.log('payment initialized',res)
      verifyPayment()
    })

  }catch(err){
    console.error(err)
  }
 }
  return (
    <section className="grid grid-cols-3 gap-16 px-36 py-20 max-lg:flex-col max-sm:py-0 max-sm:px-0 mb-10">
        {
            productLists.map((product)=>(
                <div className='relative w-full min-h-80' key={product.id}>
                <div className="main">
                 <div className="product__image"><img  src="images/image-product-1-thumbnail.jpg" alt="soda_can" /></div> 
                  <div className="container">
                    <div className="title">{product.name}
                      <span >{`${currencyList[product.currency-1]} ${product.amount}`}</span>
                    </div>
                    <p className="desc">{product.product_desc}</p>
                  
                  </div>
                 <div className="absolute bottom-0 left-0 cursor-pointer " onClick={handleOnClick} > <button className=' bg-white hover:bg-orange-100 text-orange-800 font-semibold py-2 px-4 border border-orange-400 rounded shadow'>Add to Cart</button></div>
                  </div>
                </div>
            ))
        }

  
  
  {/* <ProductList /> */}
  </section>
  )
}

export default ProductList