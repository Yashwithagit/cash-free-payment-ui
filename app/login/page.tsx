'use client';
import { API_END_POINT, LOGIN, LOGIN_PAGE, REGISTER, SIGNUP_PAGE } from '@/lib/constant';
import { setToken } from '@/redux/auth/authSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function Login() {
  const formRef=useRef(null)
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(LOGIN_PAGE);
  const router = useRouter();

  // handle login
  const handleOnsubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = {
      email: target.email.value,
      password: target.password.value,
      user_name: target.user_name ? target.user_name.value : ''
    };
    try {
      
     const  response = await axios.post(`${API_END_POINT}${isActive===LOGIN_PAGE?LOGIN:REGISTER}`, formData);
     
      if (response.data.status === 'error') {
        toast.error(response.data.message);
      } else {
        console.log(response.data.data);
       
        if(isActive===LOGIN_PAGE){
          dispatch(setToken(response.data.data));
          router.push('/');
        }else{
          setIsActive(LOGIN_PAGE)
        }
       
      }
    } catch (error) {
      // Handle error
      toast.error('An error occurred while logging in.');
    }
  };
  const handleToggleBtn=()=>{
    console.log(formRef.current.reset())
    if(isActive === LOGIN_PAGE){
        setIsActive(SIGNUP_PAGE)

    }else {
        setIsActive(LOGIN_PAGE)
    }
  }

  return (
    <section className="bg-gray-50 h-screen">
    <Toaster/>
      <main className="flex justify-center">
        <button
          className={`${isActive === LOGIN_PAGE ? 'hover:bg-orange-300 bg-orange-400 text-white' : 'border-4 border-orange-500 hover:bg-orange-100'} rounded w-20 py-2 m-4`}
          onClick={() => handleToggleBtn()}
        >
          Login </button>
        <button
          className={`${isActive === SIGNUP_PAGE ? 'hover:bg-orange-300 bg-orange-400 text-white' : 'border-2 border-orange-500 hover:bg-orange-100'} rounded w-20 py-2 m-4`}
          onClick={() => handleToggleBtn()}
        >
          SignUp
        </button>
      </main>
      <div className="flex w-full flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-1/2 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-orange-400">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isActive === LOGIN_PAGE ? 'Sign in' : 'SignUp'} to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleOnsubmit} ref={formRef}>
              {isActive === SIGNUP_PAGE && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {isActive === LOGIN_PAGE && (
                <div className="flex items-end w-full justify-end">
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
              )}
              <main className="flex w-full justify-center">
                <button
                  type="submit"
                  className="shadow-md hover:bg-orange-100 text-black bg-white hover:bg-primary-700 focus:outline-none font-bold rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {isActive === LOGIN_PAGE ? 'SignIn' : 'SignUp'}
                </button>
              </main>
              {isActive === LOGIN_PAGE ? (
                <div className="text-sm font-light text-white flex gap-2">
                  Don’t have an account yet?
                  <aside onClick={() => handleToggleBtn()} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</aside>
                </div>
              ) : (
                <div className="text-sm font-light text-white flex gap-2">
                  Already have an account?
                  <div onClick={() => handleToggleBtn()} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
