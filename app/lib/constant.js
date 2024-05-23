// API ENDPOINT
export const API_END_POINT='https://mysql2-db-server.onrender.com/api/' //live
// export const API_END_POINT='http://localhost:8000/api/' //test

// API paths
export const GET_PRODUCTS='products/'
export const GET_AUTH_PRODUCTS='order/productList'
export const ADD_CART='order/updateOrder'
export const PAYMENT='payment'
export const VERIFY='verify'
export const REGISTER='auth/register'
export const LOGIN='auth/login'
export const USERINFO='auth/userInfo'

// status
export const SUCCESS='success'
export const ERROR='error'
export const currencyList=[
'₹','USD'
]
export const buttonName={
LoginOrSignUp:'Login/SignUp',
Logout:'Logout'
}
export const cartOptions=[
 'Add to Cart','Added to Cart'
]
export const buyOptions=[
  'Add to Cart','Remove from Cart'
 ]

 export const LOGIN_PAGE=0
 export const SIGNUP_PAGE=1
const products = [
    {
      id: 1,
      name: 'iphone XS',
      price: 350,
      imgurl : 'https://cdn.tuk.dev/assets/templates/classified/Bitmap (1).png',
      date : '4 days ago',
      desc : 'The Apple iPhone XS is available in 3 colors with 64GB memory. Shoot amazing videos',
      warranty : '12 months warranty',
      place : 'Bay Area, San Francisco'
      // Add more properties as needed
    },
    {
      id: 2,
     name: 'iphone XS',
      price: 350,
      imgurl : 'https://cdn.tuk.dev/assets/templates/classified/Bitmap (1).png',
      date : '4 days ago',
      desc : 'The Apple iPhone XS is available in 3 colors with 64GB memory. Shoot amazing videos',
      warranty : '12 months warranty',
      place : 'Bay Area, San Francisco'
      // Add more properties as needed
    },
    // Add more product objects
  ];
  
  export default products;