import React from 'react'
import { useState,useEffect } from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/userApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../utils/Loader'

const Login = () => {
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')

    const dispatch =useDispatch()
    const navigate =useNavigate()

    const [login, {isLoading}] =useLoginMutation()

    const {userInfo}=useSelector(state=>state.auth)
    const{search}= useLocation()
    const sp =new URLSearchParams(search);
    const redirect =sp.get("redirect") ||"/"

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])


  return (
    <div>
      <section className='pl-[10rem] flex flex-wrap'>
            <div className='mr-[4rem] mt-5rem]'>
                <h1 className="text-2xl text-red-500 font-semibold mb-4">Sign In</h1>
               
                <form action="" className='container w-[40rem] '>
                    <div className="my-[2rem]">
                        <label htmlFor="email" className='block text-sm font-medium text-white'>Email Address</label>

                        <input type="email" id='emial' value={email} onChange={(e)=>setEmail(e.target.value)} className='mt-1 p-2 border rounded w-full' />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="password" className='block text-sm font-medium text-white'>Password</label>

                        <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='mt-1 p-2 border rounded w-full' />
                    </div>
                    <button disabled={isLoading} type='submit' className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] '>{isLoading? "Signing in...":"Sign In"}</button>
                    {isLoading && <Loader/>}
                </form>

                <div className='mt-4'>
                    <p className='text-black'>
                        New Customer ?{" "}
                        <Link to={redirect ? `/register?redirect=${redirect}`: '/register'} className='text-pink-500'>Register</Link>
                    </p>
                </div>
            </div>
      </section>
    </div>
  )
}

export default Login
