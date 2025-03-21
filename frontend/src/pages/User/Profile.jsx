import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =useProfileMutation();

    useEffect(()=>{
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    },[userInfo.username, userInfo.email])
    const dispatch = useDispatch();

    const submitHandler = async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error("Password do not match")
        }
        else{
            try{
                const res = await updateProfile({_id:userInfo._id, username,email,password}).unwrap()
                dispatch(setCredentials({...res}))
                toast.success("Profile updated successfuly")

            }
            catch(error){
                toast.error(error?.data?.message || error?.messsage)
            }
        }
    }
  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center items-center md:flex-col md:space-x-4">

        <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

            <form onSubmit={submitHandler}>
            <div className="mb-4">
                <label className="block text-black mb-2">
                Name
                </label>
                <input
                type="text"
                value={username}
                placeholder="enter name"
                className="form-input p-4 rounded-sm w-full"
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-black mb-2">
                Email
                </label>
                <input
                type="email"
                value={email}
                placeholder="enter email"
                className="form-input p-4 rounded-sm w-full"
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-black mb-2">
                Password
                </label>
                <input
                type="password"
                value={password}
                placeholder="enter password"
                className="form-input p-4 rounded-sm w-full"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-black mb-2">
                Confirm Password
                </label>
                <input
                type="password"
                value={confirmPassword}
                placeholder="enter name"
                className="form-input p-4 rounded-sm w-full"
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className="flex justify-between">
                <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">Update</button>

                <Link to={`/user-orders`} className="bg-pink-600 text-black py-2 px-4 rounded hover:bg-pink-800">
                    My Orders
                </Link>
            </div>

            {loadingUpdateProfile && <Loader/>}
            </form>
        
        </div>
      </div>
    </div>
  );
};

export default Profile;
