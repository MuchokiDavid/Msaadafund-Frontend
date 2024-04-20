import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast,Toaster} from 'react-hot-toast'

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

  // Fetch organization data 
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

  return (
    <div >
    <div className="text-md breadcrumbs ml-2">
    <ul>
      <li><a href='/org/dashboard'>Home</a></li> 
      <li><a href='/org/dashboard/profile'>Profile</a></li> 
      {/* <li><a href='/org/dashboard/profile'>Password Reset</a></li>  */}

    </ul>
</div>
    <div className="container mx-auto h-screen lg:h-fit lg:px-16">
  
      <h1 className="mb-3 my-2 text-2xl font-bold leading-tight">Personalize your Organisation</h1>
      <hr className='mb-2 mt-0'/>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-black font-medium">Organization Name</label>
          <input
            name="orgName"
            value={orgData.orgName}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-black font-medium">Email Address</label>
          <input
            value={orgData.orgEmail}
            disabled
            className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-200"
          />
        </div>
        <div>
          <label className="block text-black font-medium">Phone Number</label>
          <input
            name="orgPhoneNumber"
            value={orgData.orgPhoneNumber}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-black font-medium">Address</label>
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            disabled={!checkFormChanges()}
          >
            Update Organization Details
          </button>
        </div>
      </form>
    </div>
    <Toaster position="top-right" reverseOrder={false} />
    </div>

  );
}

export default OrgProfile;
