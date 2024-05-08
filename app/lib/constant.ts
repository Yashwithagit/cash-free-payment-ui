// API ENDPOINT
export const API_END_POINT='https://mysql2-db-server.onrender.com/' //live
// export const API_END_POINT='http://localhost:8000/' //test

// API paths
export const GET_PRODUCTS='api/products'
export const PAYMENT='payment'
export const VERIFY='verify'


export const currencyList=[
'₹','USD'
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