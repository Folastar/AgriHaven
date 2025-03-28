import React from 'react'
import { useState,useEffect } from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/userApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'

const Login = () => {
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')

    const dispatch =useDispatch()
    const navigate =useNavigate()

    const [login, {isLoading}] =useLoginMutation()

    const {userInfo}=useSelector((state) => state.auth)
    console.log(userInfo)
    const{search}= useLocation()
    const sp =new URLSearchParams(search);
    const redirect =sp.get("redirect") ||"/"

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])

    const submitHandler=async (e)=>{
        e.preventDefault()
        try{
            const res= await login({email, password}).unwrap()
            dispatch(setCredentials({...res}))
            console.log( ...res)
            navigate(redirect)
            

        }
        catch(error){
            toast.error(error?.data?.message ||error?.message)
        }


    }

 
  return (
    <div>
      <section className='sm:pl-[10rem] flex flex-wrap'>
            <div className='sm:mr-[4rem] sm:mt-10rem] w-[80%] mx-auto'>
                <h1 className="text-2xl text-red-500 font-semibold mb-4">Sign In</h1>
               
                <form onSubmit={submitHandler} className='container max-w-[40rem] '>
                    <div className="my-[2rem]">
                        <label htmlFor="email" className='block text-sm font-medium text-white'>Email Address</label>

                        <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='mt-1 p-2 border rounded w-full' />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="password" className='block text-sm font-medium text-white'>Password</label>

                        <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='mt-1 p-2 border rounded w-full' />
                    </div>
                    <button disabled={isLoading} type='submit' className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] '>{isLoading? "Signing in...":"Sign In"}</button>
                    {isLoading && <Loader/>}
                </form>

                <div className='mt-4'>
                    <p className='text-white'>
                        New Customer ?{" "}
                        <Link to={redirect ? `/register?redirect=${redirect}`: '/register'} className='text-pink-500 hover:underline'>Register</Link>
                    </p>
                </div>
            </div>
      </section>
    </div>
  )
}

export default Login
