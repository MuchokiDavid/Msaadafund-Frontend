import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'
import { apiUrl } from '../../../context/Utils';
// import Swal from 'sweetalert2';
// import { useAuth } from '../../../context/usersContext';

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
// const {logout} = useAuth();

  // to get token for organisation
  const token = localStorage.getItem('token')
  // const userToken = localStorage.getItem('user')
  const org = localStorage.getItem('org')
  const userData = localStorage.getItem('user')
  // const userDataString = localStorage.getItem('userData');
  // const userDetails = userDataString ? JSON.parse(userDataString) : null;
  // console.log(userDetails)

  // const navigate = useNavigate()


// fetch usersdata
useEffect(()=>{

  // handle authorization 
  const accessToken = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  }
  if (!accessToken) {
    // console.log("Access token not found");
    
}
  axios.get(`${apiUrl}/api/v1.0/usersdata`,config)
  .then ((res)=>{
    setUser(res.data)
    setOriginalData(res.data)
  })
  .catch((err)=>{
    // console.log(err)
    const errorMsg = err.response?.data?.error || 'An error occurred';
    setError(errorMsg);  })
},[])

const handleSubmit = (e)=>{
    e.preventDefault()

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

    axios.patch(`${apiUrl}/api/v1.0/usersdata`, user, config)
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


  // const handleConfirmDisable = () => {
  //   const accessToken = localStorage.getItem('token')
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       'Content-Type': 'application/json',
  //     }
  //   }
  //   if (!accessToken) {
  //     console.log("Access token not found");
  // }
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, disable it!'
  //   }).then((result)=>{
  //     if(result.isConfirmed){
  //       axios.delete('https://backend.service.msaadafund.com/home/api/v1.0/usersdata', config)
  //       .then((res)=>{
  //         if (res.status === 200){
  //           Swal.fire(
  //             'Disabled!',
  //             'Your account has been disabled.',
  //             'success'
  //           ).then((result)=>{
  //             if (result.isConfirmed){
  //               logout()
  //               window.location.reload()
              
  //             }
  //           })
  //         }
  //       })

  //     }


  //   })
     
  // };

  if (!token) {
    window.location.replace("/user/login")
  }
  if (org){   
    window.location.replace("/unauthorized")
    return null
  }





  
  return (
    <div>
    <div className="text-md breadcrumbs ml-2">
          <ul>
            <li><a href='/user/dashboard'>Dashboard</a></li> 
            <li><a href='/user/dashboard/profile'>Profile</a></li> 
          </ul>
        </div>
        <div className="container mx-auto h-screen lg:h-fit lg:px-16 sm:px-16">

        <h1 className="mb-3 my-2 text-2xl font-bold leading-tight">Personalize your Profile</h1>
        <hr className='mb-2 mt-0'/>

        <div className="card w-full bg-white p-4 flex-row justify-between border">
            <div className="avatar">
              <div className="w-24">
                <figure className='border rounded-full'>
                  <div className='flex items-center justify-center h-24 w-24 bg-blue-600 text-white border border-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-xs px-1 py-2 text-center'>
                    <p className='lg:text-3xl sm:text-sm'>{userData && userData.charAt(0)}</p>
                  </div>
                </figure>
              </div>
            </div>
            <div className="card-body">
              <h4 className="card-title">{user.firstName} {user.lastName}</h4>
              <p>{user.email}</p>
          </div>
        </div> 

        <div className="card w-full bg-white border p-6 mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
          <label className='block text-black font-medium'>First Name</label>
          <input
          type='text'
          name='firstName'
          value={user.firstName}
          className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100"
          onChange={handleInputChange}
          disabled
          />
        </div>
        <div>
          <label className='block text-black font-medium'>Last Name</label>
          <input
          type='text'
          name='lastName'
          value={user.lastName}
          onChange={handleInputChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100"
          disabled
          />
        </div>
        </div>
        <div>
          <label className='block text-black font-medium'>Username</label>
            <input 
            type="text"
            name="username" 
            value={user.username} 
            className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100"
            disabled
            />
        </div>
        <div>
          <label className='block text-black font-medium'>Email</label>
          <input
          type='text'
          name='email'
          value={user.email} 
          className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100" 
          disabled       
          />
        </div>
      
        <div className='block text-black font-medium'>
          <label>Address</label>
          <input
          type='text'
          name='address'
          value={user.address}
          onChange={handleInputChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div >
          <label className='block text-black font-medium'>National ID:</label>
          <input
          type='text'
          name='nationalId'
          value={user.nationalId}
          onChange={handleInputChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded" 
          />
        </div>
        <div>
        <label className='block text-black font-medium'>PhoneNumber</label>
        <input
        type='text'
        name='phoneNumber'
        value={user.phoneNumber}
        onChange= {handleInputChange}
        className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
        </div>
        <div className='mt-4'>
          <div>
            <button type='submit' 
            disabled = {!handleData()}
            className={`py-2 px-4   font-medium text-white rounded-md ${handleData() ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400'}`}
            >Update</button>
          </div>
          
        </div>
        </form>
      </div>
      <div className="mt-4 flex justify-end">
          {/* <button onClick={handleConfirmDisable} className="bg-red-500 py-2 px-4 rounded-md">Disable Account</button> */}
      </div>
    </div>
      <Toaster position="top-right" reverseOrder={false} />
      </div>

     
 
  )
}

export default UserProfile