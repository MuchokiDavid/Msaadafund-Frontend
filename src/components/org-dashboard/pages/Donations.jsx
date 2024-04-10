import React, { useEffect, useState } from 'react';

function Donations({ allCampaigns, campaignError }) {
    const [allDonations, setAllDonations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [donors, setDonors] = useState([]);
    const [itemsPerPage] = useState(10); // Number of items to display per page
    const [errors, setErrors] = useState(campaignError);

    // Calculate total pages based on the number of items and items per page
    const totalPages = Math.ceil(allDonations.length / itemsPerPage);

    // Get paginated subset of donation items
    const paginatedDonations = allDonations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setAllDonations(data);
                } else {
                    throw new Error(data);
                }
            } catch (error) {
                setErrors("Error getting donation data");
            }
        }
        getDonations();
    }, []);

    useEffect(() => {
        const getDonors = async () => {
            try {
                const response = await fetch('/api/v1.0/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setDonors(data);
                } else {
                    throw new Error(data);
                }
            } catch (error) {
                setErrors("Error getting donation data");
            }
        }
        getDonors();
    }, [allDonations]);

    return (
        <div>
            <h1 className="mb-3 my-2 text-2xl font-bold leading-tight ">My Donations</h1>
            <hr className='mb-0' />
            {errors && <p className='text-red-700'>{errors}</p>}
            <div className="overflow-x-auto ml-3">
                <table className="table table-zebra mt-3">
                    <thead>
                        <tr>
                            <th>Campaign</th>
                            <th>Donor</th>
                            <th>Amount</th>
                            <th>Donation Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedDonations.map((donation) => {
                            // Find the user object corresponding to the donation's userId
                            const user = donors.find(user => user.id === donation.userId);
                            const firstName = user ? user.firstName : donation.userId;
                            const lastName = user ? user.lastName : '';

                            //Get campaign name from campaigns using donation campaign id
                            const campaign = allCampaigns.find(campaign => campaign.id === donation.campaignId);
                            const campaignTitle = campaign ? campaign.campaignName : donation.campaignId;

                            return (
                                <tr className="dark:text-gray-200" key={donation._id}>
                                    <th>{campaignTitle}</th>
                                    <td>{firstName} {lastName}</td>
                                    <td>{donation.amount}</td>
                                    <td>{donation.donationDate}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="flex justify-center mb-4 join grid-cols-2 my-4">
                    {/* Previous page button */}
                    <button className="btn btn-outline join-item" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
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
        </div>
    );
}

export default Donations;
