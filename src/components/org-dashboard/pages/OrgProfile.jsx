import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

function OrgProfile() {
  const [orgData, setOrgData] = useState({
    orgName: '',
    orgPhoneNumber: '',
    orgAddress: '',
    orgDescription: '',
    orgType: '',
    youtube_link:'',
    website_link:""
  });

  const [originalData, setOriginalData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const org = localStorage.getItem('org');

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios.get('/api/v1.0/organisation', config)
      .then((res) => {
        setOrgData(res.data);
        setOriginalData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrgData({
      ...orgData,
      [name]: value
    });
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size exceeds 1MB');
      return;
    }

    if (file && !allowedTypes.includes(file.type) ) {
    setError('Please upload a valid image file (JPEG, PNG)');
    return;
    }
      setProfileImage(file);
  }
   



  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(true)
    const accessToken = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const formData = new FormData();
    for (const key in orgData) {
      if (orgData[key]) {
        formData.append(key, orgData[key]);
      }
    }

    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    axios.patch('/api/v1.0/organisation', formData, config)
      .then((res) => {
        setOrgData(res.data.Data);
        setOriginalData(res.data.Data);
        toast.success(res.data.message);
        setIsInputVisible(false);
        setIsEditing(false);
      })
      .catch((err) => {
        setIsEditing(false);
        console.log(err);
      });
  };

  const checkFormChanges = () => {
    return JSON.stringify(orgData) !== JSON.stringify(originalData);
  };

  return (
    <div className='px-5'>
      <div className="text-sm breadcrumbs ml-2">
        <ul>
          <li><a href='/org/dashboard'>Dashboard</a></li>
          <li><a href='/org/dashboard/profile'>Profile</a></li>
        </ul>
      </div>
      <div className="container mx-auto min-h-screen lg:h-fit">
        <h1 className="mb-3 my-2 text-2xl font-bold leading-tight">Personalize your Organisation</h1>
        <hr className='mb-2 mt-0' />
        <div>
          <div className="card w-full bg-base-100 p-4 flex-row justify-between border">
            <div className="avatar">
              <div className="w-24">
                <figure className='border rounded-full'>
                  {orgData && orgData.profileImage ? (
                    <img src={orgData.profileImage} alt={orgData && orgData.orgName} className="w-full rounded" />
                  ) : (
                    <div className='flex items-center justify-center h-24 w-24 bg-blue-600 text-white border border-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-xs px-1 py-2 text-center'>
                      <p className='lg:text-3xl sm:text-sm'>{org && org.charAt(0)}</p>
                    </div>
                  )}
                </figure>
              </div>
            </div>
            <div className="card-body">
              <h4 className="card-title">{orgData.orgName.toUpperCase()}</h4>
              <p>{orgData.orgAddress}</p>
            </div>
            <div>
              <label onClick={toggleInputVisibility} className="cursor-pointer text-blue-600 underline">Profile Picture</label>
            </div>
          </div>
          <div className="card w-full bg-base-100 border p-6 mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className='text-red-500'>{error}</p>}
              <h2 className='text-base'>Update your profile information</h2>
                {isInputVisible && (
                <div id='change-input'>
                  <label className="block text-black font-medium mt-4">Profile Image</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                  />
                </div>
              )}
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
                <label className="block text-black font-medium"><span className='text-red-500'>*</span>Organisation Type</label>
                <select
                  name="orgType"
                  value={orgData.orgType}
                  onChange={handleInputChange}
                  className='bg-gray-50 border h-11 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                >
                  <option value="">Select Organisation Structure</option>
                  <option value="NonProfit Organisation">NonProfit Organisation(NPOs)</option>
                  <option value="Profit Organisation">For Profit Organisation</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                  <label className='block text-black font-medium'>Website Link</label>
                  <input
                    name="website_link"
                    value={orgData.website_link}
                    onChange={handleInputChange}
                    className='w-full mt-1 p-2 border border-gray-300 rounded'
                    placeholder='https://..........'
                  />
                </div>
                <div>
                  <label className='block text-black font-medium'>Youtube Link</label>
                  <input
                    name="youtube_link"
                    value={orgData.youtube_link}
                    onChange={handleInputChange}
                    className='w-full mt-1 p-2 border border-gray-300 rounded'
                    placeholder='https://www.youtube.com/.........'
                  />
                </div>
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
                  {isEditing ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default OrgProfile
