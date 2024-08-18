import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import { VscVmActive } from "react-icons/vsc";
import { apiUrl } from '../../../context/Utils';


function DashInactiveCampaigns({allCampaigns, campaignError}) {
    const [errors, setErrors] = useState(campaignError);
    const [inActiveCampaign, setInactiveCampaign] = useState(allCampaigns)
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const token= localStorage.getItem('token');
    const orgUser= localStorage.getItem('org');

    useEffect(()=>{
        const accessToken = localStorage.getItem('token');
        const config = {
            headers:{
            Authorization: `Bearer ${accessToken}`
            }
        }
        axios.get (`${apiUrl}/api/v1.0/get_inactive`,config)
        .then((res)=>{
            setInactiveCampaign(res.data)   
        })
        .catch ((err)=>{
            const errorMsg = err.response?.data?.error || 'An error occurred';
            setErrors(errorMsg); 
        })
    },[allCampaigns])

    //Filter campaign with the search term to search category, campaign name, amount from campaigns
    useEffect(() => {
        const filtered = inActiveCampaign && inActiveCampaign.filter((campaign) => {
            return(
                (campaign.campaignName && campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (campaign.category && campaign.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (campaign.targetAmount && campaign.targetAmount.toString().includes(searchTerm)) ||
                (campaign.description && campaign.description.toString().includes(searchTerm))
                // (campaign.amountRemaining && campaign.amountRemaining.toString().includes(searchTerm))

            )
        });
        setFilteredCampaigns(filtered);
    },[searchTerm, inActiveCampaign])

    //paginate filtered campaign
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex);

    //Function to handle pagination
    const goToPage = (pageNumber) => {

        setCurrentPage(pageNumber);
    };

    const activateCampaign = async (campaignId)=>{
        try{
            const accessToken = localStorage.getItem('token');
            const config = {
               headers:{
                Authorization: `Bearer ${accessToken}`
               }
            }
            Swal.fire({
                title: 'Are you sure?',
                text: "Activate this campaign!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Activate!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.patch(`${apiUrl}/api/v1.0/activate/campaign/${campaignId}`,{}, config)
                    .then((res)=>{
                        // console.log(res)
                        if(res.status===200){
                            Swal.fire({
                                title: "Activated!",
                                text: `${res.data.campaignName} activated successfully`,
                                icon: "success"
                              }).then((result)=>{
                                if(result.isConfirmed){
                                    window.location.reload();
                                }
                              }); 
                        }
                        else{
                            Swal.fire(
                                'Error!',
                                'The campaign did not activate',
                                'error'
                            )
                        }
                        
                    })
                    .catch((err)=>{
                        const errorMsg = err.response?.data?.error || 'An error occurred';
                        setErrors(errorMsg);
                    })
                    
                }
            })

        }
        catch(err){
            console.log(err)
        }
    }   

    if(!token && !orgUser){
        window.location.href("/org/login")
    }

    return (
        <div className='h-screen lg:h-fit'>
            <div className="text-sm breadcrumbs ml-2">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li> 
                    <li><a href='/org/dashboard/mycampaigns/inactive'>Inactive Campaign</a></li> 
                </ul>
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight ">Inactive Campaigns</h2>
            <hr className='mb-4'/>
            {/* {errors&& <p className='text-red-700'>{errors}</p>} */}
            
            {/* <a href='/org/dashboard/createcampaign' className='text-blue-700 mb-4 text-lg hover:underline'>Add campaign+</a> */}
                {/* <div className='flex justify-between py-1'> */}
                    <div className='grid grid-cols-1 md:grid-cols-2 my-3'>
                        <div>
                            <a href='/org/dashboard/mycampaigns/active'><button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                                Active Campaign
                            </button></a>
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
                    {errors && console.error(errors)}
                    {/* <div>
                        <button title='Download Pdf ' onClick={downloadDonationsPDF}>PDF<FaFilePdf size = {25} style={{ color: 'red' }}/></button>
                    </div> */}
               {inActiveCampaign.length>0 && paginatedCampaigns.length>0
               ?
               (
                <>
                    <div className="my-1 inline-block w-full overflow-x-auto align-middle border-b border-gray-200 sm:rounded-lg">
                        <table className="w-full table-zebra text-xs lg:text-sm overflow-scroll border bg-white">
                            {/* head */}
                            <thead className='text-gray-800 bg-gray-100'>
                                <tr>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>ID</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Campaign Name</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Category</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Start Date</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>End Date</th>   
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Budget</th> 
                                    {/* <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Balance</th>     */}
                                    {/* <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Edit</th>    */}
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Activate</th>                       
                                </tr>
                            </thead>
                            <tbody>
                            {paginatedCampaigns && paginatedCampaigns.map((item) =>{
                                return (
                                    <tr key={item.id}>
                                        <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200 '>{item.id}</td>
                                        <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200 '>{item.campaignName}</td>
                                        <td className='px-6 py-1 whitespace-no-wrap border-b border-gray-200 '>{item.category}</td>
                                        <td className='px-6 py-1 whitespace-no-wrap border-b border-gray-200'>{item.startDate}</td>
                                        <td className='px-6 py-1 whitespace-no-wrap border-b border-gray-200 '>{item.endDate}</td>
                                        <td className='px-6 py-1 whitespace-no-wrap border-b border-gray-200 '>{item.targetAmount}</td>
                                        {/* <td className='px-6 py-1 whitespace-no-wrap border-b border-gray-200'>{walletDetails &&walletDetails[item.id]?.available_balance}</td> */}
                                        {/* <td className='px-6 py-1 whitespace-no-wrap border-b border-gray-200 '><button onClick={()=>handleEditButton(item.id)} className='text-white p-1.5 bg-blue-600 rounded border hover:border-blue-600 hover:bg-transparent hover:text-black'>Edit</button></td> */}
                                        <td className='px-6 py-1 whitespace-no-wrap border-b border-gray-200 '><button onClick={()=>activateCampaign(item.id)} className='bg-blue-600 hover:bg-blue-700 text-lg text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline ml-2 w-full sm:w-auto'><VscVmActive/></button></td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center my-4 join grid-cols-2">
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
            </>
            )
            :
            (
            <div className='grid grid-cols-1 gap-4 mt-3 px-1'>
                <div>
                    <p className='text-red-500'>No Inactive campaigns to display at the moment.</p> 
                </div>
                <div>
                    {/* <a href='/org/dashboard/createcampaign'><button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                        Create Campaign
                    </button></a> */}
                </div>
            </div>
            )
               }
        </div>
    );

}

export default DashInactiveCampaigns