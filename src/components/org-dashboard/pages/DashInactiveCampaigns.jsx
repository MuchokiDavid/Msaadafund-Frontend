import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import Swal from 'sweetalert2'
import axios from 'axios';

function DashInactiveCampaigns({allCampaigns, campaignError}) {
    const [errors, setErrors] = useState(campaignError);
    const [inActiveCampaign, setInactiveCampaign] = useState([])
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
        axios.get ("/api/v1.0/get_inactive",config)
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
                text: "You will be able to activate this campaign!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, deactivate!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.patch(`/api/v1.0/activate/campaign/${campaignId}`,{}, config)
                    .then((res)=>{{
                        console.log(res)
                        if(res.status===200){
                            Swal.fire(
                                'Activated!',
                                `${res.data.campaignName} activated successfully`,
                                'success'
                            )
                            window.location.reload();
                        }
                        else{
                            Swal.fire(
                                'Error!',
                                'The campaign did not activate',
                                'error'
                            )
                        }
                        
                        // window.location.reload();
                    }})
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
        window.location.replace("/org/login")
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
                            <a href='/org/dashboard/createcampaign'><button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                                Create Campaign
                            </button></a>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-gray-300 rounded-md bg-gray-50 border h-11 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-3/4 p-2.5"
                            />
                        </div>
                    </div>
                    {/* <div>
                        <button title='Download Pdf ' onClick={downloadDonationsPDF}>PDF<FaFilePdf size = {25} style={{ color: 'red' }}/></button>
                    </div> */}
                {/* </div> */}
            {/* <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:max-w-full"> */}
            <div className="my-1 inline-block min-w-full overflow-x-auto align-middle border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full table-zebra text-xs lg:text-sm overflow-scroll">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>ID</th>
                            <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Campaign Name</th>
                            <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Category</th>
                            <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Start Date</th>
                            <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>End Date</th>   
                            <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Budget</th> 
                            {/* <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Balance</th>     */}
                            {/* <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Edit</th>    */}
                            <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Action</th>                       
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
                                <td className='px-6 py-1 whitespace-no-wrap border-b border-gray-200 '><button onClick={()=>activateCampaign(item.id)} className='text-white p-1.5 bg-blue-600 rounded border hover:border-blue-600 hover:bg-transparent hover:text-black'>Activate</button></td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mb-4 join grid-cols-2">
                {/* Previous page button */}
                <button className="btn btn-outline join-item" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>

                {/* <div className='border border-gray-400 flex justify-center p-2 btn-outline w-fit'>{currentPage} of {totalPages}</div> */}
                {/* Next page button */}
                <button
                    className="btn btn-outline join-item"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            
            <Toaster position="top-right" reverseOrder= {false}/>
        </div>
    );
//   return (
//     <div className='mt-4'>
//                 <h1 className='text-2xl'>INACTIVE CAMPAIGNS</h1>
//                 <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:max-w-full">
//                 {inActiveCampaign && inActiveCampaign.map((item)=>{
//                     return(
//                         <div key={item.id} className="m-auto overflow-hidden rounded-lg shadow cursor-pointer h-90 md:w-80 w-full">
//                             <div className='w-full p-4 bg-gray-400'>
//                             <p class="font-medium text-indigo-500 text-md">
//                                     Available balance
//                                 </p>
//                                 {/* <p class="mb-2 text-2xl font-medium text-gray-800 dark:text-white">
//                                     {walletDetails &&walletDetails[item.id]?.currency} {walletDetails &&walletDetails[item.id]?.available_balance}
//                                 </p> */}
//                                 <div className='grid grid-flow-col grid-col-3'>
//                                     <div>
//                                         <h6 className='text-lg text-black'>Campaign</h6>
//                                         <p className='text-black'>{item.campaignName.slice(0,25)}...</p>
//                                         </div>
//                                         <div>
//                                             <h6 className='text-lg text-black'>Budget</h6>
//                                         <p className='text-gray-900'>{item.targetAmount}</p>
//                                     </div>
//                                         </div>
//                             <div class="flex flex-wrap items-center mt-4 justify-between">
//                                 <div class="text-sm mr-2 py-1.5 px-4 text-gray-200 bg-blue-700 rounded font-bold">
//                                     <button onClick={()=>activateCampaign(item.id)}
//                                     className='h-6'>ReActivate
//                                     </button>
//                                 </div>
//                              </div>
//                              </div>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//   )
}

export default DashInactiveCampaigns