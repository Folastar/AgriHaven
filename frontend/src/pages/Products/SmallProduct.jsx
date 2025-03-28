import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'
const SmallProduct = ({product}) => {
  return (
    <div className='w-[20rem] ml-8 p-3'>
      <div className="relative">
        <img src={product.image} alt={product.name} className='h-auto rounded' />
        <HeartIcon product={product}/>
        <div className="p-4">
            <Link to={`/product/${product._id}`}>
                <h2 className='flex justify-between items-stretch'>

                    <div>{product.name}</div>
                    <span className="bg-pink-100 rounded-xl text-pink-800 text-sm font-medium mr-2 px-3 py-0.5 dark:bg-pink-900 dark:text-pink-300">
                        ${product.price}
                    </span>
                </h2>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default SmallProduct
