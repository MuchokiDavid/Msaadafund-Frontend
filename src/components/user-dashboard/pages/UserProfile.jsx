import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'
// import { IoPencilOutline } from "react-icons/io5";



function UserProfile() {
  const [user, setUser] = useState({
    username:'',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    nationalId: '',
    phoneNumber: '',

  })

// compare previous data with new data
const [originalData, setOriginalData] = useState({});
const [error,setError]= useState('');
const [showConfirmation, setShowConfirmation] = useState(false);  


  // handle authorization 
  const accessToken = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  }
  if (!accessToken) {
    console.log("Access token not found");
}

// fetch usersdata
useEffect(()=>{
  axios.get('/api/v1.0/usersdata',config)
  .then ((res)=>{
    setUser(res.data)
    setOriginalData(res.data)
  })
  .catch((err)=>{
    console.log(err)
    const errorMsg = err.response?.data?.error || 'An error occurred';
    setError(errorMsg);  })
},[])


const handleSubmit = (e)=>{
    e.preventDefault()

    axios.patch('/api/v1.0/usersdata', user, config)
    .then((res)=>{
      // console.log(res)
      setUser(res.data)
      setOriginalData(res.data)
      toast.success('Profile Updated Successfully')
    })
    .catch((err)=>{
      console.log(err)
    })
}

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
        ...user,
        [name]: value
    });
  };

  // Check form change
  const handleData = ()=>{
    return JSON.stringify(user) !== JSON.stringify(originalData)
  }

  // handle disable account
  const handleDisable = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDisable = (confirmation) => {
    setShowConfirmation(false);
    if (confirmation === 'yes') {
      axios.patch('/api/v1.0/usersdata', { disabled: true }, config)
        .then(() => {
          toast.success('Account Disabled');
          // Redirect or perform any necessary actions after disabling the account'
          window.location.href = '/user/login';
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };





  
  return (
    <div>
    <div className="text-md breadcrumbs ml-2">
          <ul>
            <li><a href='/user/dashboard'>Dashboard</a></li> 
            <li><a href='/user/dashboard/profile'>Profile</a></li> 
          </ul>
        </div>
      <div className="container mx-auto h-screen lg:h-fit lg:px-16">

        <h1 className="mb-3 my-2 text-2xl font-bold leading-tight">Personalize your Profile</h1>
        <hr className='mb-2 mt-0'/>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
         <label>First Name</label>
         <input
         type='text'
         name='firstName'
         value={user.firstName}
         className="w-full mt-1 p-2 border border-gray-300 rounded"
         onChange={handleInputChange}
         />
      </div>
      <div>
         <label>Last Name</label>
         <input
         type='text'
         name='lastName'
         value={user.lastName}
         onChange={handleInputChange}
         className="w-full mt-1 p-2 border border-gray-300 rounded"
         />
      </div>
      </div>
      <div>
        <label>Username</label>
          <input 
           type="text"
           name="username" 
           value={user.username} 
           className="w-full mt-1 p-2 border border-gray-300 rounded"
           disabled
          />
      </div>
      <div>
         <label>Email</label>
         <input
         type='text'
         name='email'
         value={user.email} 
         className="w-full mt-1 p-2 border border-gray-300 rounded" 
         disabled       
         />
      </div>
    
      <div>
         <label>Address</label>
         <input
         type='text'
         name='address'
         value={user.address}
         onChange={handleInputChange}
         className="w-full mt-1 p-2 border border-gray-300 rounded"
         />
      </div>
      <div>
         <label>National ID:</label>
        <input
         type='text'
         name='nationalId'
         value={user.nationalId}
         onChange={handleInputChange}
         className="w-full mt-1 p-2 border border-gray-300 rounded" 
         />
      </div>
      <div>
      <label>PhoneNumber</label>
      <input
      type='text'
      name='phoneNumber'
      value={user.phoneNumber}
      onChange= {handleInputChange}
      className="w-full mt-1 p-2 border border-gray-300 rounded"
      />
      </div>
      <div className='mt-4'>
        <button type='submit' 
        disabled = {!handleData()}
        className={`py-2 px-4   font-medium text-white rounded-md ${handleData() ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400'}`}
        >Update</button>
      </div>
      </form>
      <div className="mt-4">
          <button onClick={handleDisable} className="bg-red-500 py-2 px-4 rounded-md">Disable Account</button>
        </div>
        {showConfirmation && (
          <div>
            <p>Are you sure you want to disable your profile?</p>
            <button onClick={() => handleConfirmDisable('yes')}>Yes</button>
            <button onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        )}
    </div>
      <Toaster position="top-right" reverseOrder={false} />
      </div>

     
 
  )
}

export default UserProfile