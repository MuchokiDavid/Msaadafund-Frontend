import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast,Toaster} from 'react-hot-toast'
// import DashFooter from '../dash-components/DashFooter';

function OrgProfile() {
  // State to manage organization details
  const [orgData, setOrgData] = useState({
    orgName: '',
    orgPhoneNumber: '',
    orgAddress: '',
    orgDescription: ''
  });

  // State to manage organization details
   const [originalData, setOriginalData] = useState({});
   const user = localStorage.getItem('user')
   const org = localStorage.getItem('org')

  // Use effect hook to fetch organization data
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    if (!accessToken) {
        console.log("Access token not found");
    }

    axios.get('/api/v1.0/organisation', config)
    .then((res) => {
      setOrgData(res.data);
      setOriginalData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrgData({
        ...orgData,
        [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    // Send a PATCH request to the backend
    axios.patch('/api/v1.0/organisation', orgData, config)
    .then((res) => {
      console.log(res.data);
      setOrgData(res.data.Data);
      setOriginalData(res.data.Data);
      toast.success(res.data.message)
    })
    .catch((err) => {
      console.log(err);
    });
  };

    const checkFormChanges = () => {
      return JSON.stringify(orgData) !== JSON.stringify(originalData);
    };

    if (user){   
      window.location.replace("/unauthorized")
      return null
    }

  return (
    <div className='px-5'>
    <div className="text-sm breadcrumbs ml-2">
      <ul>
        <li><a href='/org/dashboard'>Dashboard</a></li> 
        <li><a href='/org/dashboard/profile'>Profile</a></li> 
        {/* <li><a href='/org/dashboard/profile'>Password Reset</a></li>  */}

      </ul>
    </div>
    <div className="container mx-auto min-h-screen lg:h-fit lg:px-16">
  
      <h1 className="mb-3 my-2 text-2xl font-bold leading-tight">Personalize your Organisation</h1>
      <hr className='mb-2 mt-0'/>

      <div>
        <div className="card w-full bg-base-100 p-4 flex-row justify-between">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <figure>
                  {orgData && orgData.profileImage? (<img src={orgData.profileImage} alt={orgData && orgData.orgName} className=" w-full rounded" />): (<div className='flex items-center justify-center h-24 w-24 bg-blue-600 text-white border border-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-xs px-1 py-2 text-center'>
                              <p className='lg:text-3xl sm:text-sm'>{org && org.charAt(0)}</p>
                            </div>)}
                </figure>
              </div>
            </div>
            <div className="card-body">
              <h4 className="card-title">{orgData.orgName}</h4>
              <p>{orgData.orgAddress}</p>
            </div>
          </div> 

          <div className="card w-full bg-base-100 shadow p-4 mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className='text-base'>Update your profile information</h2>
              <div>
                <label className="block text-black font-medium"><span className='text-red-500'>*</span>Organization Name</label>
                <input
                  name="orgName"
                  value={orgData.orgName}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  disabled
                />
              </div>
              <div>
                <label className="block text-black font-medium"><span className='text-red-500'>*</span>Email Address</label>
                <input
                  value={orgData.orgEmail}
                  disabled
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-black font-medium"><span className='text-red-500'>*</span>Phone Number</label>
                <input
                  name="orgPhoneNumber"
                  value={orgData.orgPhoneNumber}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-black font-medium"><span className='text-red-500'>*</span>Address</label>
                <input
                  name="orgAddress"
                  value={orgData.orgAddress}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-black font-medium">About the Organisation</label>
                <textarea
                  name="orgDescription"
                  value={orgData.orgDescription}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded h-24"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                  disabled={!checkFormChanges()}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
      </div>
    </div>
    <Toaster position="top-right" reverseOrder={false} />
    {/* <DashFooter/> */}
    </div>

  );
}

export default OrgProfile;
