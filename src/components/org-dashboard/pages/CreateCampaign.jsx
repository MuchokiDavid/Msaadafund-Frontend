import React, { useState } from 'react';
import axios from 'axios';
import {toast,Toaster} from 'react-hot-toast'


function CreateCampaign() {
    const [banner, setBanner] = useState(null);
    const [description, setDescription] = useState('');
    const [campaignName, setCampaignName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; 

        if (file && allowedTypes.includes(file.type)) {
            setBanner(file);
            setError('');
        } else {
            setError('Please upload a valid image file (JPEG, PNG, GIF)');
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();

        if (!banner) {
            setError('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('banner', banner);
        formData.append('description', description);
        formData.append('campaignName', campaignName);
        formData.append('startDate', formatDate(startDate)); // Format start date
        formData.append('endDate', formatDate(endDate)); // Format end date
        formData.append('targetAmount', targetAmount);
        formData.append('category', category);

        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        if (!accessToken) {
            console.error('Access token not found');
            return;
        }

        axios.post('/api/v1.0/setCampaign', formData, config)
            .then((res) => {
                console.log(res);
                toast.success('Campaign created successfully!');
                setError('');
                setBanner('');
                setDescription('');
                setCampaignName('');
                setStartDate('');
                setEndDate('');
                setTargetAmount('');
                setCategory('');
            })
            .catch((err) => {
                console.log(err);
                setError('An error occurred during upload.');
            });
    };

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        let month = (1 + dateObject.getMonth()).toString().padStart(2, '0');
        let day = dateObject.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    return (
        <div className='flex items-center justify-center'>
            <div className="mx-auto lg:max-w-screen-lg md:max-w-full sm:max-w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 text-white sm:w-screen">
         {/* <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"> */}

            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div>
            <h1 className="text-2xl font-semibold mb-6">Create Campaign</h1>
            </div>
            <form onSubmit={handleUpload}>
                <div className="mb-4 ">
                    <label htmlFor="campaignName" className="block mb-2 text-sm font-semibold">
                        Campaign Name
                    </label>
                    <input
                        // id="campaignName"
                        type="text"
                        value={campaignName}
                        placeholder="Campaign Name"
                        onChange={(e) => setCampaignName(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="startDate" className="block mb-2 text-sm font-semibold">
                            Start Date
                        </label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block mb-2 text-sm font-semibold">
                            End Date
                        </label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="targetAmount" className="block mb-2 text-sm font-semibold">
                        Budget
                    </label>
                    <input
                        id="targetAmount"
                        type="number"
                        value={targetAmount}
                        placeholder="Budget"
                        onChange={(e) => setTargetAmount(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block mb-2 text-sm font-semibold">
                        Category
                    </label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        placeholder="Category (Health, Water,Food,Education ...)"
                        onChange={(e) => setCategory(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 text-sm font-semibold">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        placeholder="Describe the Campaign "
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600"
                        rows="3"
                        required
                    />
                </div>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white px-6 py-10">
                    <div className="text-center">
                        <div className="mt-4 flex text-sm leading-6">
                        <span className="mr-2">{banner ? banner.name : ''}</span>
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer h-8 px-4 rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload Banner</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={(e) => handleFileUpload(e)}
                                    required
                                />
                            </label>
                        </div>
                        <p className="text-xs leading-5 ">PNG, JPG,JPEG up to 2MB</p>
                    </div>
                </div>

                <div className='mt-4'>
                    <button
                        type="submit"
                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Create
                    </button>
                </div>
            </form>
            <Toaster position="top-right" reverseOrder={false} />
             </div>
        </div>
        
    );
}

export default CreateCampaign;
