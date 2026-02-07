import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('wood')

// const {error, loading, products} = customReactQuery('/api/products');

// here we have to look after h cases like if a user search /productsd   thre is d in the last which cause an error
// how to handle this kind of case called Hcases setError in start and in end mean maybe 
// if we try second time the setError should be false then we move further to se futre results 
// on line 15 there is iife function ()() first to define function second to call.
// for iife there is no need of anythiing immediate call function 
// controller.signal  get  all the garbage search value put it inside a catch error block 
  
useEffect(() => {
  const controller = new AbortController()
   ;(async () => {
    try {
     setLoading(true)
     setError(false)
      const response = await axios.get('/api/products?search=' + search, {
        signal: controller.signal
      });
     console.log(response.data);
     setProducts(response.data)
     setLoading(false)
    } catch (error) {
      if(axios.isCancel(error)){
        console.log('Request canceled', error.message)
        return
      }
     setError(true);
     setLoading(false);
    }
   })()
  // cleanup code here
   return () => {
    controller.abort()
   }
  }, [search])
  

  // if there is an error then how the user comes to know it is easy like on line 39
  // if(error){
  //   return <h1>Something went WRONG</h1> 
  // }

  // if(loading) {
  //   return <h1>Loading...wait</h1>
  // }

  return (
    <>
      <h1>Our API's will call and get the res here:</h1>
      <input type="text" placeholder="search.." value={search} onChange={(e) => setSearch(e.target.value)} />

{/* According to conditionally rendering we can handle error and loading state on line 53 */}

      {loading && (<h1>Loading... please wait</h1>)}
      {error && (<h1>Something went wrong</h1>)}

      <h2>number of products: {products.length}</h2>
    </>
  )
}

export default App


// there is second way to do the same thing but in hookk we will make the call happen then supply state 
// get the states and useEffects for an API we used in side this function to craete custom hook


// const customReactQuery = (urlPath) => {
//   const [products, setProducts] = useState([])
//   const [error, setError] = useState(false)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//   ;(async () => {
//    try {
//     setLoading(true)
//     setError(false)
//      const response = await axios.get(urlPath);
//     console.log(response.data);
//     setProducts(response.data)
//     setLoading(false)
//    } catch (error) {
//     setError(true);
//     setLoading(false);
//    }
//   })()
  
//   }, [])

//   return {error, loading, products}
// }

