import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function UpdateCampaign() {
    const { campaignId } = useParams();
    const [originalData, setOriginalData] = useState({});
    const navigate = useNavigate()
    const [campaignData, setCampaignData] = useState({
        campaignName: '',
        category: '',
        targetAmount: '',
        startDate: '',
        endDate: '',
        description: '',
        banner: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch campaign details using the campaign ID
    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const response = await fetch(`/campaign/${campaignId}`);
                const data = await response.json();
                if (response.ok) {
                    setOriginalData({
                        campaignName: data.campaignName,
                        category: data.category,
                        targetAmount: data.targetAmount,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        description: data.description,
                        banner: null,
                    });
                    setCampaignData({
                        campaignName: data.campaignName,
                        category: data.category,
                        targetAmount: data.targetAmount,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        description: data.description,
                        banner: null,
                    });
                } else {
                    setError(`Error: ${data.error}`);
                }
                setLoading(false);
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
        
        // Check for form changes and do not submit if there are no changes
        if (!checkFormChanges()) {
            alert('No changes to submit.');
            return;
        }

        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        if (!accessToken) {
            window.location.replace('/org/login');
            return;
        }

        // Create a FormData object for handling file uploads and text data
        const formData = new FormData();
        formData.append('description', campaignData.description);

        // Append the banner file if provided
        if (campaignData.banner) {
            formData.append('banner', campaignData.banner);
        }

        try {
            const response = await axios.patch(`/campaign/${campaignId}`, formData, config);
            
            if (response.status === 200) {
                setOriginalData({
                    ...originalData,
                    description: response.data.description,
                    banner: response.data.banner,
                    
                });
                toast.success('Campaign updated successfully');
                setTimeout(()=>{
                    navigate('/org/dashboard/campaigns')
                },2000)
               

            }
        } catch (err) {
            console.log('Error:', err.response?.data || err.message);
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen mx-3">
            <div className="text-sm breadcrumbs mb-4">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li>
                    <li><a href='/org/dashboard/mycampaigns/active'>View Campaign</a></li>
                    <li><a>{campaignData.campaignName}</a></li>
                </ul>
            </div>
            <h1 className="mb-1 my-2 text-2xl font-bold leading-tight ">Update Campaign</h1>
            <hr/>
            <div className="mx-auto">                
                {error && <p className="text-red-500 mb-4">{error}</p>}
                
                <form onSubmit={patchCampaign} className="space-y-4">
                    <div className="mb-2">
                        <label htmlFor="campaignName" className="block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Campaign Name
                        </label>
                        <input
                            value={campaignData.campaignName}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            disabled
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                            <label htmlFor="startDate" className="block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                Start Date
                            </label>
                            <input
                                value={campaignData.startDate}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                disabled
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                End Date
                            </label>
                            <input
                                value={campaignData.endDate}
                                disabled
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="category" className="block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Category
                        </label>
                        <input
                            value={campaignData.category}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            disabled
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block font-medium text-gray-700">
                            Description:
                        </label>
                        <textarea
                            name="description"
                            value={campaignData.description}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mt-2 flex justify-center border border-dashed border-gray-300 dark:border-gray-700 px-6 py-10 bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <label className="relative cursor-pointer h-8 px-4 rounded-md bg-white font-semibold text-indigo-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Change Campaign Banner
                            <input
                                id="banner"
                                type="file"
                                name="banner"
                                accept={allowedTypes.join(',')}
                                onChange={handleInputChange}
                                // className="sr-only"
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            disabled={!checkFormChanges()}
                            className={`py-2 px-4   font-medium text-white rounded-md ${checkFormChanges() ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400'}`}
                        >
                            Update Campaign
                        </button>
                    </div>
                </form>
            </div>
            <Toaster position="top-center" reverseOrder={false}/>
        </div>
    );
}

export default UpdateCampaign;
