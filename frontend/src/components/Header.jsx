import React from 'react'
import { useGetTopProductsQuery } from '../redux/api/productApiSlice'
import Loader from './Loader'
import SmallProduct from '../pages/Products/SmallProduct'
import ProductCarousel from '../pages/Products/ProductCarousel'

const Header = () => {
    const {data,isLoading,error}=useGetTopProductsQuery()
    
        if(isLoading){
            return <Loader/>
        }
        if(error){
            return <h1>error</h1>
        }
    

  return (
    <div className='flex justify-center sm:flex-row flex-col'>
        <div className="sm:hidden xl:block mx-auto lg:hidden md:hidden ">
            <h1 className='text-xl pl-[5rem] text-white'>Products</h1>
            <div className="grid sm:grid-cols-2 w-fit grid-cols-1">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
            </div>
        </div>
      <ProductCarousel className="hidden"/>
    </div>
  )
}

export default Header
