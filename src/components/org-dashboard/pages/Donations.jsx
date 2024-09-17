import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaFilePdf } from "react-icons/fa";
import { apiUrl } from '../../../context/Utils';

function Donations({ allCampaigns, campaignError, allDonors }) {
    const [allDonations, setAllDonations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(campaignError);
    const [campaigns, setCampaigns] = useState(allCampaigns);
    const [donors, setDonors] = useState(allDonors);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [filteredDonations, setFilteredDonations] = useState([]);

    const token = localStorage.getItem('token');
    const orgName= localStorage.getItem('org');

    // Calculate total pages based on the number of items and items per page
    const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

    // Get paginated subset of donation items
    const paginatedDonations = filteredDonations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Pagination handlers
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
      setDonors(allDonors)
    }, [allDonors])

    useEffect(()=>{
        setErrors(campaignError)
    }, [campaignError])
    

    useEffect(() => {
        const getDonations = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${apiUrl}/api/v1.0/org_donations`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    if(data.message){
                    //    console.log("Successful request to get donors");
                        setAllDonations(data.message);
                        setLoading(false); 
                    }
                    if(data.error){
                        setLoading(false);
                        setErrors(data.error);
                    }
                    
                } else {
                    // setLoading(true);
                    // throw new Error(data);
                }
            }
            catch {
                // setErrors("No donations found")
                setLoading(false);
            }
        }
        getDonations();
    }, [token, allCampaigns]);

    useEffect(() => {
        setCampaigns(allCampaigns);
    }, [allCampaigns]);


    useEffect(() => {
        const filtered = allDonations && allDonations.filter((donation) => {
            const user = donors.find(user => user.id === donation.userId);
            const donorName = user ? `${user.firstName} ${user.lastName}` : "";
            const campaign = campaigns.find(campaign => campaign.id === donation.campaignId);
            const campaignTitle = campaign ? campaign.campaignName : "";
            return donorName.toLowerCase().includes(searchTerm.toLowerCase()) || campaignTitle.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredDonations(filtered);
    }, [allDonations, searchTerm, donors, campaigns]);

    if (!token && !orgName){
        window.location.href = '/org/login';
    }
    // if (loading){
    //     return (
    //         <div class="flex items-center justify-center h-screen">
    //             <span className="loading loading-spinner loading-lg text-blue-500"></span>
    //         </div>
    //     )
    // }

    // handle pdf route
    // get route from backend
    const downloadDonationsPDF=()=> {
        const token = localStorage.getItem('token');
        const url = `${apiUrl}/api/v1.0/org_donations_pdf`;
    
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/pdf',  // Specify that we expect a PDF file in the response
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to download PDF');
            }
    
            // Convert the response to a Blob (binary data) for the PDF file
            return response.blob();
        })
        .then(blob => {
            // Create a URL for the blob data
            const blobUrl = URL.createObjectURL(blob);
    
            // Create an anchor element for downloading the file
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'donations.pdf';  // Specify the filename for the downloaded file
    
            // Append the link to the document body
            document.body.appendChild(link);
    
            // Programmatically trigger a click on the link to start the download
            link.click();
    
            // Remove the link from the DOM after the download
            document.body.removeChild(link);
    
            // Revoke the blob URL to release memory
            URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            setErrors('Error downloading PDF, Please try again later');
        });
    }

    // console.log(allDonations)


    return (
        <div>
            <div className="text-sm breadcrumbs ml-2">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li>
                    <li><a href='/org/dashboard/donations'>Contributions</a></li>
                </ul>
            </div>
            <h1 className="mb-1 my-2 text-2xl font-bold leading-tight ">Contributions</h1>
            <hr/>
            {errors && <p className='text-red-700'>{errors}</p>}
           {allDonations && allDonations.length>0
                ?
                (
                <div>
                    <div className='flex flex-col mt-1'>
                        <div className='flex justify-between py-2'>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border-gray-300 rounded-md bg-white border h-11 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                            </div>
                            <div className='mr-2'>
                                <button title='Download Pdf ' onClick={downloadDonationsPDF}>PDF<FaFilePdf size = {25} style={{ color: 'red' }}/></button>
                            </div>
                        </div>
                        <div className="my-1 inline-block min-w-full overflow-scroll align-middle border-b border-gray-200 rounded-lg">
                            <table className="table table-xs bg-white">
                                {/* head */}
                                <thead className='text-gray-800 bg-gray-100'>
                                    <tr>
                                        <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>ID</th>
                                        <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Campaign</th>
                                        <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Category</th>
                                        <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Contributor</th>
                                        <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Amount</th>
                                        <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Method</th> 
                                        <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Date</th>   
                                        {/* <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Status</th>                            */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (<span className="loading loading-dots loading-md"></span>) : null}
                                    {paginatedDonations.map((donation) => {
                                        const user = donors.find(user => user.id === donation.userId);
                                        const donorName = user ? `${user.firstName} ${user.lastName}` : `${donation.donor_name}`;
                                        const campaign = campaigns.find(campaign => campaign.id === donation.campaignId);
                                        const campaignTitle = campaign ? campaign.campaignName : "";
                                        return (
                                            <tr key={donation._id}>
                                                <td className='px-2 py-1 whitespace-no-wrap border-b border-gray-200 '>{donation.id}</td>
                                                <td className='px-2 py-1 whitespace-no-wrap border-b border-gray-200 '>{campaignTitle}</td>
                                                <td className='px-2 py-1 whitespace-no-wrap border-b border-gray-200 '>{donation.campaign.category}</td>
                                                <td className='px-2 py-1 whitespace-no-wrap border-b border-gray-200 '>{donorName}</td>
                                                <td className='px-2 py-1 whitespace-no-wrap border-b border-gray-200'>{donation.currency} {donation.amount}</td>
                                                <td className='px-2 py-1 whitespace-no-wrap border-b border-gray-200 '>{donation.method}</td>
                                                <td className='px-2 py-1 whitespace-no-wrap border-b border-gray-200 '>{moment(donation.donationDate).format('dddd Do MMMM, YYYY')}</td>
                                                {/* <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200'>{donation.status}</td> */}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-center mb-4 join grid-cols-2">
                        {/* Previous page button */}
                        <button className="btn btn-outline join-item btn-sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
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
                </div>
            )
            :
            (
                <div className='grid grid-cols-1 gap-4 mt-3 px-4'>
              <div>
                <p className='text-red-500'>No contributions to display. Create campaign to start receiving contributions</p> 
              </div>
              <div>
                <a href='/org/dashboard/createcampaign'><button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                    Create Campaign
                </button></a>
              </div>
            </div>
            )
           }
        </div>
    )
}

export default Donations;
