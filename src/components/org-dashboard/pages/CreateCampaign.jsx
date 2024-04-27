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
    const[loading,setLoading]=useState(false)
    const [otherCategory, setOtherCategory] = useState('');


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
        setLoading(true)
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
        if(category==='Other'){
          formData.append('category',otherCategory)  
        }
        else{
            formData.append('category', category);
        }
        

        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        if (!accessToken) {
            window.location.replace('/org/login')
        }

        axios.post('/api/v1.0/setCampaign', formData, config)
            .then((res) => {
                setLoading(false)
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
                const errorMsg = err.response?.data?.error || 'An error occurred';
                setError(errorMsg);

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
        <div className='flex-grow'>
            <div className="text-sm breadcrumbs ml-2">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li> 
                    <li><a href='/org/dashboard/createcampaign'>Create campaign</a></li> 
                </ul>
            </div>
            <h1 className="text-2xl font-semibold mb-3 text-slate-600 dark:text-slate-300">Create campaign</h1>
            <hr className='mb-0'/>
            <div className='flex items-center justify-center w-full'>
                <div className="mx-auto lg:max-w-screen-lg md:max-w-full sm:max-w-full p-6 rounded-lg bg-transparent text-white sm:w-screen">
            {/* <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"> */}

                {error && <p className="text-red-500 mt-4">{error}</p>}
                <form onSubmit={handleUpload}>
                    <div className="mb-4 ">
                        <label htmlFor="campaignName" className="block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Campaign Name
                        </label>
                        <input
                            // id="campaignName"
                            type="text"
                            value={campaignName}
                            placeholder="Campaign Name"
                            onChange={(e) => setCampaignName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="startDate" className="block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                Start Date
                            </label>
                            <input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                End Date
                            </label>
                            <input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Category
                        </label>
                        <select 
                        className='bg-gray-50 border h-11 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                        onChange={(e)=>setCategory(e.target.value)}>
                        <option className='text-lg' >Select a category</option>
                        <option className='text-lg' value="Education">Education</option>    
                        <option className='text-lg' value="Health">Health</option>
                        <option className='text-lg' value="Food">Food</option>
                        <option className='text-lg' value="Water">Water</option>
                        <option className='text-lg' value="Human Rights">Human Rights</option>
                        <option className='text-lg' value="Environment">Environment</option>
                        <option className='text-lg' value="Community Development">Community Development</option> 
                        <option className='text-lg' value="Animal Welfare">Animal Welfare</option> 
                        <option className='text-lg' value="Arts and Culture">Arts and Culture</option> 
                        <option className='text-lg' value="Disaster">Disaster</option> 
                        <option className='text-lg' value="Other">Other...</option> 
                        </select>
                        {category==='Other'? <input
                            id="category"
                            type="text"
                            value={otherCategory}
                            placeholder="Please specify..."
                            onChange={(e) => setOtherCategory(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
                            required
                        /> : null }
                    </div>
                    <div className="mb-4">
                        <label htmlFor="targetAmount" className="block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Budget
                        </label>
                        <input
                            id="targetAmount"
                            type="number"
                            value={targetAmount}
                            placeholder="Budget"
                            onChange={(e) => setTargetAmount(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            placeholder="Describe the Campaign "
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            rows="3"
                            required
                        />
                    </div>
                    <div className="mt-2 flex justify-center border border-dashed border-gray-300 dark:border-gray-700 px-6 py-10 bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 ">
                            <span className="mr-2">{banner ? banner.name : ''}</span>
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer h-8 px-4 rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span className='text-gray-800'>Upload Banner</span>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                        onChange={handleFileUpload}
                                        required
                                    />
                                </label>
                            </div>
                            <p className="text-xs leading-5 text-gray-700 dark:text-gray-200">PNG, JPG,JPEG up to 2MB</p>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <button
                            type="submit"
                            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {loading?'Loading...': 'Create'}
                        </button>
                    </div>
                </form>
                <Toaster position="top-right" reverseOrder={false} />
                </div>
            </div>
        </div>
        
        
    );
}

export default CreateCampaign;
