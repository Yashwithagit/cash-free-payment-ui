'use client'
import React,{useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProducts} from '@/redux/product/productSlice'
import { useRouter } from 'next/navigation';
import { API_END_POINT, USERINFO, buttonName } from '@/lib/constant';

import axios from 'axios';
import { resetToken } from '@/redux/auth/authSlice';
import toast, { Toaster } from 'react-hot-toast';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const {LoginOrSignUp,Logout}=buttonName
    const [userData,setUserData]=useState()
    const token = useSelector((state) => state.auth.value)
    const dispatchLogout=useDispatch()
    const [openChart, setOpenChart] = useState(false);
    const dispatch=useDispatch()
    const productData=useSelector((state)=>state.product)
     const cartCount= productData && productData.data && (productData.data.filter((item) => item.cart === 1)).length
     const router=useRouter()
    const productRef=useRef(false)
    useEffect(()=>{
      if(productRef.current===false){
        dispatch(fetchProducts())
      }
    
      return ()=>{productRef.current=true}
  
    },[])
useEffect(()=>{
  getUserInfo()
},[openChart])
    // get userInfo
    const getUserInfo=async()=>{
      try {
        const res=await axios.get(`${API_END_POINT}${USERINFO}`,{
          headers: {
            Authorization: `Bearer ${token}`,
        }
        })
        console.log(res.data)
        if(res.data.error!=='error' ){
          setUserData(res.data.data)
        }
        
       
      }catch(err){
        console.log(err)
      }
    }
    // login or SignUp
    const OnClickLoginOrLogout=()=>{
      if(!token){
        router.push('/login')
      }else {
        dispatchLogout(resetToken())
        toast.success(`${userData.user_name} has been Logout Successfully`)
       
      }
      setOpenChart(!openChart)
    }

    const handleOverlayClick=(event)=> {
        if (event.target == event.currentTarget) {
          setOpenChart(!openChart);
        }
      }

  return (
    <nav className="flex justify-between mx-28 border-b max-sm:border-0 max-sm:mx-5 max-[900px]:p-6">
      <Toaster/>
      <div className="flex items-center gap-12 max-[900px]:gap-5 pointer-events-auto" >
        <img
          src="/images/icon-menu.svg"
          className="hidden max-[900px]:block cursor-pointer"
          alt=""
       
        />
        <h1 className="tracking-tighter cursor-pointer" onClick={()=>router.push('/')}>Shop Fusion</h1>
        <div className="flex gap-7 max-[900px]:hidden">
          <p className="hover:-mb-1 hover:border-b-4 hover:border-orange-400 py-6 cursor-pointer transition duration-300">
            Collections
          </p>
          
          <p className="hover:-mb-1 hover:border-b-4 hover:border-orange-400 py-6 cursor-pointer transition duration-300">
            About
          </p>
          <p className="hover:-mb-1 hover:border-b-4 hover:border-orange-400 py-6 cursor-pointer transition duration-300">
            Contact
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className='flex flex-col items-center'>
      <h2 className='bg-orange-400 rounded-3xl w-6 h-6 flex items-center justify-center text-white'>{cartCount}</h2>
        <img
          src="/images/icon-cart.svg"
          width={30}
          alt="cart icon"
          className="cursor-pointer"
          onClick={() =>router.push('/cart')}
        />
        </div>
       
          <div className='flex flex-col items-center'    onClick={() => setOpenChart(!openChart)} >
          <img
          className="cursor-pointer"
          src="/images/image-avatar.png"
          width={30}
          alt="profile"
        />
        <h1 className='text-xs'>Profile</h1></div>
       
      
        
       
        <div
          onClick={handleOverlayClick}
          style={{ display: openChart ? "block" : "none" }}
          className="hidden absolute z-20 top-0 left-0 w-full h-full"
        >
          <div className="w-80  border bg-white absolute max-sm:left-0 max-sm:right-0 max-sm:mx-auto max-sm:top-[100px] max-sm:w-9/12 h-fit top-[70px] right-[30px] rounded-md">
            <h2 className="border-b p-4 font-bold">Welcome To Shop Fusion</h2>
           
                <div className="flex flex-col p-3">
                  <div className="flex items-start gap-4 flex-col">
                  {
                    token && 
                    <main>
                    <p>{userData?.email}</p>
                    <p>{userData?.user_name}</p>
                    </main>
                  }
                    
                     <button className='bg-orange-500 py-2 px-3 rounded-md shadow-md hover:bg-orange-300' onClick={()=>OnClickLoginOrLogout()}>{token?Logout:LoginOrSignUp}</button>
                    
                  
                   
                  </div>
                 
                </div>
              
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col items-start justify-start group-hover:block fixed inset-0 bg-black bg-opacity-50">
          <div className="w-7/12 bg-white h-screen px-12 py-7">
            <img
              onClick={() => setIsOpen(!isOpen)}
              src="/images/icon-close.svg"
              className="cursor-pointer mb-12"
              alt="close image"
            />
            <ul className="flex flex-col gap-5">
              <li>
                <p className="font-bold text-xl text-very-dark-blue">
                  Collections
                </p>
              </li>
              <li>
                <p className="font-bold text-xl text-very-dark-blue">Men</p>
              </li>
              <li>
                <p className="font-bold text-xl text-very-dark-blue">Women</p>
              </li>
              <li>
                <p className="font-bold text-xl text-very-dark-blue">About</p>
              </li>
              <li>
                <p className="font-bold text-xl text-very-dark-blue">Contact</p>
              </li>
            </ul>
          </div>
        </div>
      )}
      
    </nav>
  )
}

export default Navbar