import React from 'react'
import { Link,useParams } from 'react-router-dom'
import { useGetProductsQuery } from './redux/api/productApiSlice'
import Loader from './components/Loader'
import Header from './components/Header'
import Message from './components/Message'
import Product from './pages/Products/Product'
const Home = () => {
    const {keyword}=useParams()
    const {data,isLoading,isError}=useGetProductsQuery({keyword})
    console.log(data)
  return (
    <>
         {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError?.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-center gap-x-16 items-center">
            <h1 className="ml-[20rem] mt-[10rem] sm:text-[3rem] text-lg">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold  rounded-full py-2 sm:px-10  px-5  mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Home
