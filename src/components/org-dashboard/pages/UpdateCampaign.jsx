import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../../assets/msaadaLogo.png'

function UpdateCampaign({getValidYoutubeVideoId}) {
    const { campaignId } = useParams();
    const [originalData, setOriginalData] = useState({});
    const navigate = useNavigate();
    const [campaignData, setCampaignData] = useState({
        campaignName: '',
        category: '',
        targetAmount: '',
        startDate: '',
        endDate: '',
        youtube_link:'',
        description: '',
        banner: null,
    });
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting]=useState(false)
    const [error, setError] = useState(null);
    const urlRegexPattern = /^(?:https?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\\w\-\\s])([\w\-]{11})(?=[^\\w\-]|$)(?![?=&+%\\w]*(?:['"][^<>]*>|<\/a>))[?=&+%\\w]*/i;
    const videoIdRegex = /^[a-zA-Z0-9_-]{11}$/;

    // Fetch campaign details using the campaign ID
    useEffect(() => {
        const fetchCampaignDetails = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/v1.0/campaign/${campaignId}`);
                const data = await response.json();
                if (response.ok) {
                    setOriginalData(data);
                    setCampaignData(data);
                    setLoading(false)
                } else {
                    setError(`Error: ${data.error}`);
                    setLoading(false);
                }                
            } catch (err) {
                setLoading(false);
                setError(`Error: ${err.message}`);
            }
        };

        fetchCampaignDetails();
    }, [campaignId]);

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const file = e.target.files[0];

            // Check if the file type is one of the allowed types
            if (file && allowedTypes.includes(file.type)) {
                setCampaignData({
                    ...campaignData,
                    banner: file,
                });
            } else {
                alert('Please select an image file (JPEG, PNG, or GIF).');
                e.target.value = '';
            }
        } else {
            setCampaignData({
                ...campaignData,
                [name]: value,
            });
        }
    };

    // Check if the form has changes compared to the original data
    const checkFormChanges = () => {
        return JSON.stringify(campaignData) !== JSON.stringify(originalData);
    };

    // Handle form submission
    const patchCampaign = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        // Create a FormData object for handling file uploads and text data
        const formData = new FormData();
        formData.append('description', campaignData.description);
        formData.append('startDate', campaignData.startDate);
        formData.append('endDate', campaignData.endDate);
        formData.append('youtubeLink', getValidYoutubeVideoId(campaignData.youtube_link))

        // Append the banner file if provided
        if (campaignData.banner) {
            formData.append('banner', campaignData.banner);
        }
        if (campaignData.youtube_link &&
            (!campaignData.youtube_link.match(urlRegexPattern) && !campaignData.youtube_link.match(videoIdRegex))
          )  {
            setError('Please ensure your YouTube link is valid')
            setIsSubmitting(false)
        }
        else{
            try {
            const accessToken = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            if (!accessToken) {
                throw new Error('User not authenticated');
            }

            const response = await axios.patch(`/api/v1.0/updatecampaign/${campaignId}`, formData, config);
            
            if (response.status === 200) {
                setOriginalData(response.data);
                setError('')
                setIsSubmitting(false)
                toast.success('Campaign updated successfully');
                setTimeout(() => {
                    navigate('/org/dashboard/mycampaigns/active');
                }, 2000);
            }
        } catch (err) {
            setIsSubmitting(false)
            const errorMsg = err.response?.data?.error || 'An error occurred';
            setError(errorMsg);        
        }
        }
        
    };

    if (loading) {
        return (
            <div aria-label="Loading..." role="status" className="flex justify-center items-center space-x-2  min-h-screen">
                <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                    <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                    <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                    </line>
                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                    <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                    </line>
                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                    <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                    </line>
                </svg>
                <span className="text-4xl font-medium text-gray-500"><img src={logo} alt='Loading...' className='w-1/2 h-1/2'/></span>
        </div>
        )
    }


    return (
        <div className="min-h-screen mx-3">
            <div className="text-sm breadcrumbs mb-4">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li>
                    <li><a href='/org/dashboard/mycampaigns/active'>View Campaign</a></li>
                    <li>{campaignData.campaignName}</li>
                </ul>
            </div>
            <h1 className="mb-1 my-2 text-2xl font-bold leading-tight ">Update Campaign</h1>
            <hr/>
            <div className="mx-auto bg-white p-4">               
                
                <form onSubmit={patchCampaign} className="space-y-4 mt-3">
                    <div className="mb-2">
                        <label htmlFor="campaignName" className="block mb-2 text-sm font-semibold text-slate-600 ">
                        <span className='text-red-500'>*</span> Campaign Name
                        </label>
                        <input
                            value={campaignData.campaignName}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                            <label htmlFor="startDate" className="block mb-2 text-sm font-semibold text-slate-600">
                            <span className='text-red-500'>*</span>Start Date
                            </label>
                            <input
                                name='startDate'
                                type='date'
                                value={campaignData.startDate}
                                // onChange={handleInputChange}
                                disabled
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block mb-2 text-sm font-semibold text-slate-600">
                            <span className='text-red-500'>*</span> End Date
                            </label>
                            <input
                                name='endDate'
                                type='date'
                                value={campaignData.endDate}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            />
                        </div>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="category" className="block mb-2 text-sm font-semibold text-slate-600">
                        <span className='text-red-500'>*</span> Category
                        </label>
                        <input
                            value={campaignData.category}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            disabled
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="targetAmount" className="block mb-2 text-sm font-semibold text-slate-600 ">
                            Video link
                        </label>
                        <input
                            id="youtube"
                            type="text"
                            name='youtube_link'
                            value={campaignData.youtube_link}
                            placeholder="https://youtu.be/JHGUszJv3NI"
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            // required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block font-medium text-gray-700">
                        <span className='text-red-500'>*</span> Description:
                        </label>
                        <textarea
                            name="description"
                            value={campaignData.description}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mt-2 flex justify-center border border-dashed border-gray-300 px-6 py-10 bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5">
                        <label className="relative cursor-pointer h-8 px-4 rounded-md bg-white font-semibold text-indigo-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Change Campaign Banner
                            <input
                                id="banner"
                                type="file"
                                name="banner"
                                accept={allowedTypes.join(',')}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    {error && <p className="text-red-500 mb-2">Error : {error}</p>}

                    <div className="mb-4">
                        <button
                            type="submit"
                            disabled={!checkFormChanges()}
                            className={`py-2 px-4   font-medium text-white rounded-md ${checkFormChanges() ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400'}`}
                        >
                            {isSubmitting ? "Updating...": "Update"}
                        </button>
                    </div>
                </form>
            </div>
            <Toaster position="top-center" reverseOrder={false}/>
        </div>
    );
}

export default UpdateCampaign;
