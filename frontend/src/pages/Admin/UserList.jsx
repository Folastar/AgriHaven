import React,{useEffect,useState} from 'react'
import { FaCheck, FaEdit, FaTimes, FaTrash}  from 'react-icons/fa'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { useGetUserDetailsQuery, 
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation, } from '../../redux/api/userApiSlice'
import Message from '../../components/Message'

const UserList = () => {
  const {data:users,refetch, isLoading,error} =useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser]=useUpdateUserMutation()

  const [editableId,setEditableId]= useState(null)
  const [editableUserName, setEditableUserName] = useState("")
  const [editableUserEmail, setEditableUserEmail]= useState("")

  useEffect(()=>{
    refetch()
  },[refetch])

  const deleteHandler=async(id)=>{
    if(window.confirm("Are you sure?")){
      try{
          await deleteUser(id)
      }
      catch(error){
        toast.error(error?.data?.message || error?.message)
      }
    }

  }
  const toggleEdit= (id,username,email)=>{
    setEditableId(id)
    setEditableUserName(username)
    setEditableUserEmail(email)
  }
  const updateHandler= async(id)=>{
    try{
        await updateUser({
            userId:id,
            username:editableUserName,
            email:editableUserEmail,
        })

        setEditableId(null)
        refetch()
    }
    catch(error){
        toast.error(error?.data?.message || error?.error)
    }
}
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Users</h1>
      {isLoading? (<Loader/>):error?(<Message variant="error"> {error?.data?.message || error?.message}</Message>): 
      (<div className='flex flex-col md:flex-row'>

        <table className='w-full md:w-4/5 mx-auto'>
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Id</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Admin</th>
              <th className="px-4 py-2 text-left"></th>

            </tr>
          </thead>
          <tbody>
            {users.map(user=>(
              <tr key={user._id}>
                <td className='px-4 py-2'>{user._id}</td>
                <td className='px-4 py-2'>{editableId===user._id?(
                  <div className='flex items-center'>
                    <input type="text" value={editableUserName} onChange={e=> setEditableUserName(e.target.value)}className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg' />
                    <button onClick={()=> updateHandler(user._id)}>
                      <FaCheck/>

                    </button>

                  </div>
                ): (
                  <div className="flex items-center">
                    {user.username} {' '}
                    <button onClick={()=>toggleEdit(user._id, user.username, user.email)}>
                        <FaEdit className='ml-[1rem]'/>
                    </button>
                  </div>
                )}</td>

                <td className='px-4 py-2'>
                  {editableId === user._id ? (
                    <div className='flex items-center'>
                      <input type="text" value={editableUserEmail} onChange={e=> setEditableUserEmail(e.target.value)} className='w-full p-2 border rounded-lg' />
                      <button onClick={()=>updateHandler(user._id)} className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'>
                        <FaCheck/>
                      </button>
                    </div>
                  ):(
                    <div className='flex items-center'>
                      <p>{user.email}</p>
                      <button onClick={()=>toggleEdit(user._id, user.username, user.email)}>
                        <FaEdit/>
                      </button>

                    </div>
                  )}
                </td>

                <td className='px-4 py-2'>
                  {user.isAdmin? (
                    <FaCheck className='text-green-500'/>
                  ):(
                    <FaCheck className='text-red-500'/>

                  )}
                </td>

                <td className="px-4 py-2">
                  {!user.isAdmin && (<div className='flex'>
                    <button onClick={()=> deleteHandler(user._id)} className='bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded'>
                      <FaTrash></FaTrash>
                    </button>
                  </div>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}
    </div>
  )
}

export default UserList
