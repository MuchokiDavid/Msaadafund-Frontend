import React, { useEffect, useState } from 'react';

function Donations({ allCampaigns, campaignError }) {
    const [allDonations, setAllDonations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(campaignError);
    const [campaigns, setCampaigns] = useState(allCampaigns);
    const [donors, setDonors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filteredDonations, setFilteredDonations] = useState([]);

    const token = localStorage.getItem('token');

    // Calculate total pages based on the number of items and items per page
    const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

    // Get paginated subset of donation items
    const paginatedDonations = filteredDonations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Pagination handlers
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const getDonations = async () => {
            try {
                const response = await fetch('/api/v1.0/org_donations', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setLoading(false);
                    console.log("Successful request to get donors");
                    setAllDonations(data);
                } else {
                    setLoading(true);
                    throw new Error(data);
                }
            }
            catch {
                setErrors("Error getting donation data");
            }
        }
        getDonations();
    }, [token]);

    useEffect(() => {
        const getDonors = async () => {
            try {
                const response = await fetch('/api/v1.0/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setLoading(false);
                    console.log("Successful request to get campaigns");
                    setDonors(data);
                } else {
                    setLoading(true);
                    throw new Error(data);
                }
            }
            catch {
                setErrors("Error getting donation data");
            }
        }
        getDonors();

    }, [allDonations, token]);

    useEffect(() => {
        setCampaigns(allCampaigns);
    }, [allCampaigns]);


    useEffect(() => {
        const filtered = allDonations.filter((donation) => {
            const user = donors.find(user => user.id === donation.userId);
            const donorName = user ? `${user.firstName} ${user.lastName}` : "";
            const campaign = campaigns.find(campaign => campaign.id === donation.campaignId);
            const campaignTitle = campaign ? campaign.campaignName : "";
            return donorName.toLowerCase().includes(searchTerm.toLowerCase()) || campaignTitle.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredDonations(filtered);
    }, [allDonations, searchTerm, donors, campaigns]);

    if (!token) {
        window.location = '/org/login';
    }
    if (loading) {
        return <div><span className="loading loading-dots loading-lg"></span></div>;
    }

    return (
        <div className='sm:h-screen'>
            <div className="text-md breadcrumbs ml-2">
                <ul>
                    <li><a href='/org/dashboard'>Home</a></li>
                    <li><a href='/org/dashboard/donations'>Donations</a></li>
                </ul>
            </div>
            <h1 className="mb-3 my-2 text-2xl font-bold leading-tight ">My Donations</h1>
            <hr className='mb-0' />
            {errors && <p className='text-red-700'>{errors}</p>}
            <div className='flex flex-col mt-1'>
                <div className='py-2 -my-2 overflow-x-auto sm:-mx-2 sm:px-6 lg:-mx-2 lg:px-6'>
                    <div className="my-5 inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <input
                            type="text"
                            placeholder="Search by name or campaign"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-2 border-gray-300 rounded-md mb-4 bg-gray-50 border h-11 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <table className="min-w-full table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50 dark:bg-slate-700 dark:text-slate-300'>Campaign</th>
                                    <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50 dark:bg-slate-700 dark:text-slate-300'>Donor</th>
                                    <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50 dark:bg-slate-700 dark:text-slate-300'>Amount</th>
                                    <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50 dark:bg-slate-700 dark:text-slate-300'>Donation Date</th>                            
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedDonations.map((donation) => {
                                    const user = donors.find(user => user.id === donation.userId);
                                    const donorName = user ? `${user.firstName} ${user.lastName}` : "";
                                    const campaign = campaigns.find(campaign => campaign.id === donation.campaignId);
                                    const campaignTitle = campaign ? campaign.campaignName : "";
                                    return (
                                        <tr key={donation._id}>
                                            <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200 dark:border-gray-600'>{campaignTitle}</td>
                                            <td className='px-6 py-2 whitespace-no-wrap border-b border-gray-200 dark:border-gray-600'>{donorName}</td>
                                            <td className='px-6 py-2 whitespace-no-wrap border-b border-gray-200 dark:border-gray-600'>{donation.amount}</td>
                                            <td className='px-6 py-2 whitespace-no-wrap border-b border-gray-200 dark:border-gray-600'>{donation.donationDate}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-4 join grid-cols-2">
                {/* Previous page button */}
                <button className="btn btn-outline join-item" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>

                <div className='border border-gray-400 w-8 flex justify-center p-2 btn-outline w-fit'>{currentPage} of {totalPages}</div>
                {/* Next page button */}
                <button
                    className="btn btn-outline join-item"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Donations;

