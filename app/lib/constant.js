// API ENDPOINT
// export const API_END_POINT='https://mysql2-db-server.onrender.com/api/' //live
export const API_END_POINT='http://localhost:8000/api/' //test

// API paths
export const GET_PRODUCTS='products/'
export const ADD_CART='products/addCart'
export const PAYMENT='payment'
export const VERIFY='verify'

// status
export const SUCCESS='success'
export const ERROR='error'
export const currencyList=[
'₹','USD'
]

export const cartOptions=[
 'Add to Cart','Added to Cart'
]
export const buyOptions=[
  'Add to Cart','Remove from Cart'
 ]
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