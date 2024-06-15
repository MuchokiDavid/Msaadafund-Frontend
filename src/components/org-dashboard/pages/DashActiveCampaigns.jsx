import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import { FaEdit } from "react-icons/fa";
import { TbDeviceDesktopCancel } from "react-icons/tb";


function DashActiveCampaigns({ allCampaigns, campaignError }) {
    const [campaigns, setCampaigns] = useState(allCampaigns);
    const token = localStorage.getItem('token');
    const orgUser = localStorage.getItem('org')
    const [walletDetails, setWalletDetails] = useState(null);
    // const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(campaignError);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);

    useEffect(() => {
        setCampaigns(allCampaigns)
    }, [allCampaigns])


    //Filter campaign with the search term to search category, campaign name, amount from campaigns
    useEffect(() => {
        const filtered = campaigns && campaigns.filter((campaign) => {
            return (
                (campaign.campaignName && campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (campaign.category && campaign.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (campaign.targetAmount && campaign.targetAmount.toString().includes(searchTerm)) ||
                (campaign.description && campaign.description.toString().includes(searchTerm))
                // (campaign.amountRemaining && campaign.amountRemaining.toString().includes(searchTerm))

            )
        });
        setFilteredCampaigns(filtered);
    }, [searchTerm, campaigns])

    //paginate filtered campaign
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex);

    //Function to handle pagination
    const goToPage = (pageNumber) => {

        setCurrentPage(pageNumber);
    };

    const navigate = useNavigate()


    useEffect(() => {
        setCampaigns(allCampaigns)
    }, [allCampaigns])

    useEffect(() => {
        setErrors(campaignError)
    }, [campaignError])

    useEffect(() => {
        campaigns && campaigns.forEach(item => handleWallet(item.id));
    }, [campaigns, token]);

    const handleWallet = async (id) => {
        try {
            const response = await fetch(`/api/v1.0/campaign_wallet/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                // setLoading(false)
                setWalletDetails(prevState => ({
                    ...prevState,
                    [id]: data.wallet_details
                }));
            }

        } catch (error) {
            // setLoading(true)
            console.log('Error in fetching wallet details', error);
        }
    };
    // console.log(campaigns)

    // if (loading) {
    //     return (
    //         <div aria-label="Loading..." role="status" className="flex justify-center items-center space-x-2  min-h-screen">
    //             <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
    //                 <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
    //                 <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
    //                     stroke-width="24"></line>
    //                 <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
    //                 </line>
    //                 <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
    //                     stroke-width="24"></line>
    //                 <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
    //                 </line>
    //                 <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
    //                     stroke-width="24"></line>
    //                 <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
    //                 <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
    //                 </line>
    //             </svg>
    //             <span className="text-4xl font-medium text-gray-500">Loading...</span>
    //         </div>
    //     )
    // }
    //Check token and org in localstorage and redirect to login page if not present
    if (!token && !orgUser) {
        window.location.replace("/org/login")
    }

    const handleEditButton = (campaignId) => {
        navigate(`/org/dashboard/campaigns/${campaignId}`)
    }
    const handleDeleteButton = async (campaignId) => {
        try {
            const accessToken = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
            Swal.fire({
                title: 'Are you sure?',
                text: "You will be able to activate this campaign!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, deactivate!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/v1.0/deletecampaign/${campaignId}`, config)
                        .then((res) => {
                            
                                // console.log(res)
                                if (res.status === 200) {
                                    Swal.fire({
                                        title: "Deactivated!",
                                        text: res.data.message,
                                        icon: "success"
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            window.location.reload();
                                        }
                                    });
                                }
                                else {
                                    Swal.fire(
                                        'Error!',
                                        'The campaign did not deactivate',
                                        'error'
                                    )
                                }

                                // window.location.reload();
                            
                        })
                        .catch((err) => {
                            const errorMsg = err.response?.data?.error || 'An error occurred';
                            setErrors(errorMsg);
                        })

                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }


    // console.log(campaigns)
    return (
        <div className='h-screen lg:h-fit'>
            <div className="text-sm breadcrumbs ml-2">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li>
                    <li><a href='/org/dashboard/mycampaigns/active'>Active Campaign</a></li>
                </ul>
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight ">Active Campaigns</h2>
            <hr className='mb-4' />
            {/* {errors&& <p className='text-red-700'>{errors}</p>} */}

            {/* <a href='/org/dashboard/createcampaign' className='text-blue-700 mb-4 text-lg hover:underline'>Add campaign+</a> */}
            {/* <div className='flex justify-between py-1'> */}
            <div className='grid grid-cols-1 md:grid-cols-2 my-3'>
                <div className='flex justify-start gap-3'>
                    <div>
                        <a href='/org/dashboard/createcampaign'><button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                            Create Campaign
                        </button></a>
                    </div>
                    <div>
                        <a href='/org/dashboard/mycampaigns/inactive'><button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                            Inactive Campaign
                        </button></a>
                    </div>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-gray-300 rounded-md bg-white border h-11 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-3/4 p-2.5"
                    />
                </div>
            </div>
            {errors  && <p className='text-red-700'>{errors}</p>}
            {/* <div>
                        <button title='Download Pdf ' onClick={downloadDonationsPDF}>PDF<FaFilePdf size = {25} style={{ color: 'red' }}/></button>
                    </div> */}
            {allCampaigns.length > 0 && paginatedCampaigns.length > 0
                ?
                (<>
                    <div className="my-1 inline-block w-full overflow-scroll align-middle border-b border-gray-200 sm:rounded-lg border">
                        <table className="min-w-full table rounded-lg text-xs bg-white statTable ">
                            {/* head */}
                            <thead className='text-gray-800 bg-gray-100'>
                                <tr>
                                    {/* <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>ID</th> */}
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Campaign Name</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Category</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Start Date</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>End Date</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Budget</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Balance</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Edit</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Deactivate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCampaigns && paginatedCampaigns.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            {/* <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200 '>{item.id}</td> */}
                                            <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200'>{item.campaignName}</td>
                                            <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200'>{item.category}</td>
                                            <td className='px-6 py-1 whitespace-no-wrap border-b border-gray-200'>{item.startDate}</td>
                                            <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200'>{item.endDate}</td>
                                            <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200'>{item.targetAmount}</td>
                                            <td className='px-6 py-1 whitespace-no-wrap border-b border-gray-200'>{walletDetails && walletDetails[item.id]?.available_balance}</td>
                                            <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200'><button onClick={() => handleEditButton(item.id)} className='bg-blue-600 hover:bg-blue-700 text-lg text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline ml-2 w-full sm:w-auto'><FaEdit /></button></td>
                                            <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200'><button onClick={() => handleDeleteButton(item.id)} className='bg-red-600 hover:bg-red-700 text-lg text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline'><TbDeviceDesktopCancel /></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center my-4 join grid-cols-2">
                        {/* Previous page button */}
                        <button className="btn btn-outline h-5 join-item btn-sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>

                        {/* <div className='border border-gray-400 flex justify-center p-2 btn-outline w-fit'>{currentPage} of {totalPages}</div> */}
                        {/* Next page button */}
                        <button
                            className="btn btn-outline join-item btn-sm"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>)
                :
                (
                    <div className='grid grid-cols-1 gap-4 mt-3 px-1'>
                        <div>
                            <p className='text-red-500'>No active campaigns to display. Create campaign to start receiving contributions</p>
                        </div>
                    </div>
                )
            }
            {/* <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:max-w-full"> */}

        </div>
    );
}

export default DashActiveCampaigns;
