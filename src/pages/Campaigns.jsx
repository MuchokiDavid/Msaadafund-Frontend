import React from 'react'
import ActiveCampaigns from '../components/campaigns/ActiveCampaigns'

function Campaigns() {
  return (
    <div id='campaigns'>
      <div className="text-md breadcrumbs ml-4 mt-16 bg-gray-50">
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li>Campaigns</li>
                </ul>
            </div>
      <ActiveCampaigns/>
    </div>
  )
}

export default Campaigns


// import { useNavigate } from 'react-router-dom';
// import React, { useState, useEffect,useCallback } from 'react';
// import Menus from '../components/reusables/Menus';
// import Footer from '../components/reusables/Footer';
// import moment from 'moment';

// const Campaigns = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [categories, setCategories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const navigate = useNavigate();

//   const fetchCampaigns = useCallback(async () => {
//     try {
//       const response = await fetch(`/api/v1.0/campaigns?page=${currentPage}&category=${selectedCategory}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch campaigns');
//       }
//       const data = await response.json();
//       const mergedCategories = mergeCategories(data.map(campaign => campaign.category.toLowerCase()));
//       setCampaigns(data);
//       setCategories(['All', ...mergedCategories]);
//       const totalPagesFromHeader = Number(response.headers.get('X-Total-Pages'));
//       setTotalPages(totalPagesFromHeader);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }, [currentPage, selectedCategory]);

//   useEffect(() => {
//     fetchCampaigns();
//   }, [currentPage, selectedCategory, fetchCampaigns]); // Include fetchCampaigns in the dependency array


//   const mergeCategories = (categories) => {
//     const uniqueCategories = new Map();
//     categories.forEach(category => {
//       const lowerCaseCategory = category.toLowerCase();
//       const titleCaseCategory = lowerCaseCategory.charAt(0).toUpperCase() + lowerCaseCategory.slice(1);
//       uniqueCategories.set(lowerCaseCategory, titleCaseCategory);
//     });
//     return Array.from(uniqueCategories.values());
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//     setCurrentPage(1); // Reset currentPage when category changes
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); // Reset currentPage when search query changes
//   };

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

 
//   const filterCampaigns = (status) => {
//     const currentDate = new Date();
//     return campaigns.filter(campaign => {
//       const categoryMatch = selectedCategory === 'All' || campaign.category.toLowerCase() === selectedCategory.toLowerCase();
//       const searchMatch = (
//         campaign.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         campaign.category.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//       if (status === 'Upcoming campaigns' && currentDate < new Date(campaign.startDate)) {
//         return categoryMatch && searchMatch;
//       }
//       if (status === 'Ongoing campaigns' && currentDate >= new Date(campaign.startDate) && currentDate <= new Date(campaign.endDate)) {
//         return categoryMatch && searchMatch;
//       }
//       if (status === 'Completed campaigns' && currentDate > new Date(campaign.endDate)) {
//         return categoryMatch && searchMatch;
//       }
//       return false;
//     });
//   };

//   const calculateDaysLeft = (endDate) => {
//     if (!endDate) return null;
//     const endDateObject = new Date(endDate);
//     const currentDate = new Date();
//     const differenceInTime = endDateObject.getTime() - currentDate.getTime();
//     if  (differenceInTime <= 0) return 0;
//     else{
//       return Math.ceil(differenceInTime / (1000 * 3600 * 24));
//     }
//   };
// // fetch organisation // display organisation name on the card
//   const renderCampaignsByStatus = (status) => {
//     const filteredCampaigns = filterCampaigns(status);

//     return (
//       <div key={status} className="mb-8">
//         <h2 className="text-2xl font-bold mb-2">{status}</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
//           {filteredCampaigns.map((campaign) => (
//             <div key={campaign.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//               <img className="w-full rounded-t-lg h-52" src={campaign.banner} alt={campaign.campaignName} />
//               <div className="px-6 py-4 flex-grow">
//                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{campaign.campaignName}</h5>
//                 <p className="mb-0 text-lg font-semibold text-basemb-3 text-gray-700 dark:text-gray-400 ">{campaign.category}</p>
//                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-lg">{campaign.description.slice(0,80)}...</p>
                
//                 {status === 'Ongoing campaigns' && <button onClick={()=> handleCampaign(campaign.id)} class="inline-flex items-center mt-0 mb-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                     Donate now
//                     <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
//                     </svg>
//                 </button>}
//                 {
//                   status === 'Upcoming campaigns' && <button onClick={()=> handleCampaign(campaign.id)} class="inline-flex items-center mt-0 mb-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                       Read more
//                       <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
//                       </svg>
//                   </button>
//                 }
//                 <div className='grid grid-flow-col grid-col-2 divide-x divide-slate-500'>
                  
//                     {
//                       status === 'Ongoing campaigns' && <div className=' px-2'>
//                         <p className="text-black text-base dark:text-white">{calculateDaysLeft(campaign.endDate) }</p>
//                         <h6 className='text-md'>Days left</h6>
//                       </div>
//                     }
//                     {
//                       status === 'Upcoming campaigns' && <div className=' px-2'>
//                       <h6 className='text-md'>Start date</h6>
//                       <p className="text-black text-base dark:text-white">{moment(campaign.startDate).format('MMMM Do YYYY')}</p>
//                     </div>
//                     }
                  
//                   <div className='px-2'>
//                     <h6 className='text-md ml-2'>Budget(Ksh)</h6>
//                      <p className="text-black ml-2 text-base dark:text-white">{campaign.targetAmount}</p>
//                   </div>
//                 </div>

//                 {/* <button onClick={()=> handleCampaign(campaign.id)}>More Details</button> */}
                
//               </div>
//               {/* {status === 'Ongoing campaigns' && (
//                 <div className="px-6 pb-4">
//                   {/* <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
//                     Donate
//                   </button> 
//                   <button onClick={()=> handleCampaign(campaign.id)} class="inline-flex items-center mt-1 px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-emerald-700 dark:hover:bg-emerald-600 dark:focus:ring-emerald-800">
//                       Donate now
//                       <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
//                       </svg>
//                   </button>
//                 </div>
//               )} */}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const handleCampaign = (campaignId) => {
//     navigate(`/campaign/${campaignId}`);
//   };

//   return (
//     <div className='bg-white dark:bg-gray-900'>
//       <Menus/>
//       <div className='flex items-center justify-center mt-6 p-4 shadow-lg'>
//         <div className="mb-4 flex flex-col sm:flex-row items-center ">
//           <select
//             id="categoryFilter"
//             onChange={handleCategoryChange}
//             value={selectedCategory}
//             className="border text-black rounded-md px-4 py-2 h-12 mb-2 sm:mb-0 sm:mr-4 focus:ring focus:border-blue-100 dark:bg-gray-900 dark:border dark:text-white"
//             style={{ minWidth: '150px' }}
//           >
//             {categories.map(category => (
//               <option className='text-lg' key={category} value={category}>{category}</option>
//             ))}
//           </select>
//           <div class="relative flex" data-twe-input-wrapper-init data-twe-input-group-ref>
//             <label className="input input-bordered flex items-center gap-2  dark:bg-gray-900 dark:border dark:border-gray-400">
//               <input type="text" className="grow" onChange={handleSearchChange} placeholder="Search..." />
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
//             </label>
//           </div>
//         </div>
//       </div>
//       <div className="container mx-auto overflow-x-hidden mt-3">
//         {renderCampaignsByStatus('Upcoming campaigns')}
//         {renderCampaignsByStatus('Ongoing campaigns')}
//         {renderCampaignsByStatus('Completed campaigns')}
//       </div>
//       <div className=" flex justify-center mb-4 join grid-cols-2">
//         {/* Previous page button */}
//         <button className="join-item btn btn-outline" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//         {/* Next page button */}
//         <button className="join-item btn btn-outline" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
//       </div>
//       <Footer/>
//     </div>
//   );
// }

// export default Campaigns;
