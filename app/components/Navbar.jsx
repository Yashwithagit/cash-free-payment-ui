'use client'
import React,{useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProducts} from '@/redux/product/productSlice'
import { useRouter } from 'next/navigation';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
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
    function handleOverlayClick(event) {
        if (event.target == event.currentTarget) {
          setOpenChart(false);
        }
      }

  return (
    <nav className="flex justify-between mx-28 border-b max-sm:border-0 max-sm:mx-5 max-[900px]:p-6">
      <div className="flex items-center gap-12 max-[900px]:gap-5 pointer-events-auto" >
        <img
          src="/images/icon-menu.svg"
          className="hidden max-[900px]:block cursor-pointer"
          alt=""
          onClick={() => setIsOpen(!isOpen)}
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
        <img
          className="cursor-pointer"
          src="/images/image-avatar.png"
          width={35}
          alt="profile"
        />
       
        <div
          onClick={handleOverlayClick}
          style={{ display: openChart ? "block" : "" }}
          className="hidden absolute z-0 top-0 left-0 w-full h-full"
        >
          {/* <div className="w-80 h-48 border bg-white absolute max-sm:left-0 max-sm:right-0 max-sm:mx-auto max-sm:top-[100px] max-sm:w-9/12 h-fit top-[70px] right-[30px] rounded-md"> */}
            {/* <h2 className="border-b p-4 font-bold">Cart</h2> */}
            {/* {true ? (
              <div className="flex items-center justify-center h-36">
                <p className="">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col p-3">
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/image-product-1-thumbnail.jpg"
                      width={50}
                      alt="product image"
                    />
                    <div className="flex flex-col">
                      <p className="text-[14px]">
                        Fall Limited Edition Sneakers
                      </p>
                      <div>
                        <span className="text-dark-grayish-blue">$125.00</span>
                        <span className="text-dark-grayish-blue">
                          {" "}
                          x {count}
                        </span>
                        <span className="font-bold">
                          {" "}
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <img
                      src="/images/icon-delete.svg"
                      width={15}
                      height={15}
                      alt="trash"
                      className="cursor-pointer ml-auto"
                      onClick={remove}
                    />
                  </div>
                  <button className="bg-orange mt-4 text-white font-bold rounded-md h-9">
                    Checkout
                  </button>
                </div>
              </>
            )} */}
          {/* </div> */}
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